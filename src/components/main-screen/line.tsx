import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./line.css";
import {
	checkForCommand,
	getPath,
	useAutosizeTextArea,
} from "../../libs/helperMethods";
const Line: React.FC = () => {
	let [path, setPath] = useState("");
	let [input, setTextAreaInput] = useState("");
	let [history, setTextAreaHistory] = useState("");
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const historyRef = useRef<HTMLTextAreaElement>(null);
	useAutosizeTextArea(textAreaRef.current, input);
	useAutosizeTextArea(historyRef.current, history);

	useEffect(() => {
		getPath(setPath);
	});

	const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
		checkForCommand(event, setTextAreaInput, setTextAreaHistory);
	};
	return (
		<div>
			<textarea
				value={history}
				style={{ width: "100%", resize: "none", height: "auto" }}
				ref={historyRef}
				readOnly
			></textarea>
			<div
				style={{ display: "flex", flexDirection: "row", width: "100%" }}
			>
				<label style={{ flex: "0 0 auto", marginRight: "10px" }}>
					{`${path} > `}{" "}
				</label>
				<textarea
					value={input}
					style={{ width: "100%", resize: "none", height: "auto" }}
					onChange={handleInput}
					ref={textAreaRef}
				></textarea>
			</div>
		</div>
	);
};
export default Line;
