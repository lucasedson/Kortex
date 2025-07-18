use std::fs;

#[derive(serde::Serialize, serde::Deserialize, Debug, Clone)]
pub struct DirEntry {
    path: String,
    name: String,
    is_dir: bool,
    children: Option<Vec<DirEntry>>,
}

#[tauri::command]
fn read_dir_recursive(path: &str) -> Result<Vec<DirEntry>, String> {
    let mut entries = vec![];
    let paths = match fs::read_dir(path) {
        Ok(paths) => paths,
        Err(e) => return Err(e.to_string()),
    };

    for path_result in paths {
        let path_entry = match path_result {
            Ok(entry) => entry,
            Err(e) => {
                eprintln!("Failed to process directory entry: {}", e);
                continue;
            }
        };

        let entry_path = path_entry.path();
        if let Some(file_name) = entry_path.file_name() {
            let name = file_name.to_string_lossy();
            if name == ".git" || name == "target" || name == "node_modules" || name.starts_with('.') {
                continue;
            }
        }

        let file_type = match path_entry.file_type() {
            Ok(ft) => ft,
            Err(e) => {
                eprintln!("Failed to get file type for {:?}: {}", path_entry.path(), e);
                continue;
            }
        };

        let is_dir = file_type.is_dir();
        let name = entry_path
            .file_name()
            .unwrap_or_default()
            .to_string_lossy()
            .to_string();

        let children = if is_dir {
            match read_dir_recursive(&entry_path.to_string_lossy()) {
                Ok(children) => Some(children),
                Err(e) => {
                     eprintln!("Failed to read subdirectory {:?}: {}", path_entry.path(), e);
                     None
                }
            }
        } else {
            None
        };

        entries.push(DirEntry {
            path: entry_path.to_string_lossy().to_string(),
            name,
            is_dir,
            children,
        });
    }
    
    entries.sort_by(|a, b| {
        if a.is_dir && !b.is_dir {
            std::cmp::Ordering::Less
        } else if !a.is_dir && b.is_dir {
            std::cmp::Ordering::Greater
        } else {
            a.name.cmp(&b.name)
        }
    });

    Ok(entries)
}


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
        .invoke_handler(tauri::generate_handler![greet, read_dir_recursive])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
