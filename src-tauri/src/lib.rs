use std::fs;
use std::path::PathBuf;
use std::process::Command;
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};
use uuid::Uuid;

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
fn launch_game(game_path: String, trainer_path: String) -> Result<(), String> {
    Command::new(&game_path)
        .spawn()
        .map_err(|e| format!("Failed to launch game: {e}"))?;

    Command::new(&trainer_path)
        .spawn()
        .map_err(|e| format!("Failed to launch trainer: {e}"))?;

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            load_games,
            save_games,
            generate_id,
            launch_game,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
