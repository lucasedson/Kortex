#[tauri::command]
pub fn hello() -> String {
    "Hello from Rust!!!".to_string()
}
#[cfg(test)]
mod tests {
    #[test]
    fn hello_test() {
        println!("{}", super::hello());
        assert_eq!(super::hello(), "Hello from Rust!".to_string());

    }

}
