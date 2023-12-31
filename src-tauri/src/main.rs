// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;

#[allow(non_snake_case)]
#[tauri::command]
fn getCurrentLocation() -> String {
    if let Ok(current_dir) = env::current_dir() {
        if let Some(dir_str) = current_dir.to_str() {
            return dir_str.to_string();
        } else {
            println!("Current directory is not valid UTF-8");
        }
    } else {
        println!("Failed to get the current working directory");
    }
    return "".to_string();
}
#[allow(non_snake_case)]
#[tauri::command]
fn commandParser(input: String) -> String {
    // let commandInput: Vec<str> = input.split(' ').collect();
    return input;
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![getCurrentLocation, commandParser])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

