use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use std::process::{Child, Command};
use std::sync::Mutex;
use tauri::{AppHandle, Manager, State};
use uuid::Uuid;

pub struct RunningGames(pub Mutex<HashMap<String, Child>>);

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Game {
    pub id: String,
    pub name: String,
    pub game_path: String,
    pub trainer_path: String,
}

fn get_games_path(app: &AppHandle) -> PathBuf {
    let data_dir = app
        .path()
        .app_data_dir()
        .expect("failed to resolve app data dir");
    fs::create_dir_all(&data_dir).ok();
    data_dir.join("games.json")
}

fn load_games_from_path(path: &PathBuf) -> Vec<Game> {
    if path.exists() {
        fs::read_to_string(path)
            .ok()
            .and_then(|c| serde_json::from_str(&c).ok())
            .unwrap_or_default()
    } else {
        vec![]
    }
}

#[tauri::command]
fn load_games(app: AppHandle) -> Result<Vec<Game>, String> {
    let path = get_games_path(&app);
    if path.exists() {
        let content = fs::read_to_string(&path).map_err(|e| e.to_string())?;
        serde_json::from_str(&content).map_err(|e| e.to_string())
    } else {
        Ok(vec![])
    }
}

#[tauri::command]
fn save_games(app: AppHandle, games: Vec<Game>) -> Result<(), String> {
    let path = get_games_path(&app);
    let content = serde_json::to_string_pretty(&games).map_err(|e| e.to_string())?;
    fs::write(path, content).map_err(|e| e.to_string())
}

#[tauri::command]
fn generate_id() -> String {
    Uuid::new_v4().to_string()
}

#[tauri::command]
fn launch_game(
    game_id: String,
    game_path: String,
    trainer_path: String,
    running_games: State<RunningGames>,
) -> Result<(), String> {
    let child = Command::new(&game_path)
        .spawn()
        .map_err(|e| format!("Failed to launch game: {e}"))?;

    Command::new(&trainer_path)
        .spawn()
        .map_err(|e| format!("Failed to launch trainer: {e}"))?;

    running_games
        .0
        .lock()
        .map_err(|e| e.to_string())?
        .insert(game_id, child);

    Ok(())
}

#[tauri::command]
fn get_running_games(running_games: State<RunningGames>) -> Result<Vec<String>, String> {
    let mut map = running_games.0.lock().map_err(|e| e.to_string())?;
    map.retain(|_, child| child.try_wait().map(|s| s.is_none()).unwrap_or(false));
    Ok(map.keys().cloned().collect())
}

/// Returns the full command string to use when adding a game as a non-Steam shortcut.
/// The returned string can be used directly as the Steam "Target" field.
#[tauri::command]
fn get_steam_launch_command(game_id: String) -> Result<String, String> {
    let exe = std::env::current_exe().map_err(|e| e.to_string())?;
    Ok(format!("\"{}\" --launch {}", exe.display(), game_id))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(RunningGames(Mutex::new(HashMap::new())))
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            let args: Vec<String> = std::env::args().collect();

            // Check for `--launch <game-id>` argument (e.g. when triggered from a Steam shortcut)
            if let Some(pos) = args.iter().position(|a| a == "--launch") {
                if let Some(game_id) = args.get(pos + 1) {
                    let games_path = get_games_path(&app.handle());
                    let games = load_games_from_path(&games_path);
                    if let Some(game) = games.iter().find(|g| g.id == *game_id) {
                        let _ = Command::new(&game.game_path).spawn();
                        let _ = Command::new(&game.trainer_path).spawn();
                    }
                }
                // Exit without showing the window, regardless of whether the game was found.
                app.handle().exit(0);
                return Ok(());
            }

            // Normal startup: show the main window.
            if let Some(window) = app.get_webview_window("main") {
                window.show().ok();
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            load_games,
            save_games,
            generate_id,
            launch_game,
            get_running_games,
            get_steam_launch_command,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
