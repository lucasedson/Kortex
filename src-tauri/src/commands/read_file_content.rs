use std::fs;
#[tauri::command]
pub fn read_file_content(path: &str) -> Result<String, String> {
    fs::read_to_string(path).map_err(|e| e.to_string())
}
