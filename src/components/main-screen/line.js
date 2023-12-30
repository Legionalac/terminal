import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./line.css";
function Line() {
	let [path, setPath] = useState("");
	let [inputSize, setInputSize] = useState(1);
	let [input, setTextAreaInput] = useState("");

	// FUNCTIONS FOR GETTING PATH
	const getPath = async () => {
		path = await invoke("getCurrentLocation");
		setPath(path);
	};
	const parseCommand = async (input) => {
		let response = await invoke("commandParser", { input: input });
		return response;
	};
	useEffect(() => {
		getPath();
	});

	const checkForCommand = async (event) => {
		setTextAreaInput(event.target.value);
		let input = event.target.value;
		if (input.charAt(input.length - 1) === "\n") {
			setTextAreaInput("");
			let response = await parseCommand(input);
			console.log(response);
		}
	};
	return (
		<div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
			<label style={{ flex: "0 0 auto", marginRight: "10px" }}>
				{`${path} > `}{" "}
			</label>
			<textarea
				value={input}
				style={{ width: "100%", resize: "none" }}
				rows={inputSize}
				onChange={checkForCommand}
			></textarea>
		</div>
	);
}
export default Line;
