// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod commands;
use commands::Command;
use commands::Ls;
use serde::Serialize;
use std::env;

#[derive(Debug, Serialize)] // Import serde's Serialize trait
struct Response {
    is_valid: bool,
    message: String,
    // Add other fields as needed
}

fn convert_to_command(input: &str) -> Option<Box<dyn Command>> {
    match input {
        "ls" => Some(Box::new(Ls)),
        _ => None,
    }
}
#[tauri::command]
fn get_current_location() -> String {
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
#[tauri::command]
fn command_parser(input: &str) -> Response {
    let command_input: Vec<String> = input
        .trim_end_matches('\n')
        .split(' ')
        .map(String::from)
        .collect();
    let command = convert_to_command(&command_input[0]);
    let output;
    match command {
        Some(value) => {
            output = Response {
                is_valid: true,
                message: value.execute_command(),
            }
        }
        None => {
            output = Response {
                is_valid: false,
                message: "Invalid command".to_string(),
            }
        }
    }
    return output;
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_current_location,
            command_parser
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
