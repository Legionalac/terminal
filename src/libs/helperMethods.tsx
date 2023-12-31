import { invoke } from "@tauri-apps/api/tauri";
import { ChangeEvent, useEffect } from "react";

const useAutosizeTextArea = (
	textAreaRef: HTMLTextAreaElement | null,
	value: string
) => {
	useEffect(() => {
		if (textAreaRef) {
			// We need to reset the height momentarily to get the correct scrollHeight for the textarea
			textAreaRef.style.height = "0px";
			const scrollHeight = textAreaRef.scrollHeight;

			// We then set the height directly, outside of the render loop
			// Trying to set this with state or a ref will product an incorrect value.
			textAreaRef.style.height = scrollHeight + "px";
		}
	}, [textAreaRef, value]);
};

const parseCommand = async (input: String) => {
	let response = await invoke("command_parser", { input: input });
	return response;
};

const checkForCommand = async (
	event: ChangeEvent<HTMLTextAreaElement>,
	setTextAreaInput: (value: string) => void,
	setTextAreaHistory: (value: string) => void
) => {
	setTextAreaInput(event.target.value);
	let input = event.target.value;
	if (input.charAt(input.length - 1) === "\n") {
		setTextAreaInput("");
		let response: any = await parseCommand(input);
		setTextAreaHistory(response.message);
	}
};

const getPath = async (setPath: (value: string) => void) => {
	setPath(await invoke("get_current_location"));
};
export { getPath, checkForCommand, useAutosizeTextArea };
