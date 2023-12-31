use std::{fs, process::Output};
pub trait Command {
    fn execute_command(&self) -> String;
}

pub struct Ls;

impl Command for Ls {
    fn execute_command(&self) -> String {
        let mut output: String = "".to_string();
        if let Ok(entries) = fs::read_dir(".") {
            for entry in entries {
                if let Ok(entry) = entry {
                    let file_name: String = entry.file_name().to_str().unwrap().to_string();
                    output = format!("{}{}\n", output, file_name)
                }
            }
        }
        return output;
    }
}
