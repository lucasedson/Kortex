mod commands;
use crate::commands::hello::hello; 
use crate::commands::read_dir_recursive::read_dir_recursive;
use crate::commands::read_file_content::read_file_content;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![hello, greet, read_dir_recursive, read_file_content])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
