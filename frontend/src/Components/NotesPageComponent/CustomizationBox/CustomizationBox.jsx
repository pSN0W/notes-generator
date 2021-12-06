import React, { useState } from 'react';
import { fileData } from '../Data/fileData';
import CustomInputBox from './CustomInputBox/CustomInputBox';
import './CustomizationBox.css';

/*
	This function displays the customization box displayed when clicked on customize
*/
function CustomizationBox({ setVisible }) {
	const settings = fileData.settings;
	const settingsKeys = Object.keys(settings);

	// The tab which is opened
	const [value, setValue] = useState(0);

	// Data for different components
	const [screen, setScreen] = useState(settings.screen);
	const [box, setBox] = useState(settings.box);
	const [line, setLine] = useState(settings.line);
	const [text, setText] = useState(settings.text);

	// puttings the states and functions in a list so that they
	// can be referred by their index
	const stateFunctions = [setScreen, setBox, setLine, setText];
	const states = [screen, box, line, text];
	return (
		<div className="customization-box-wrapper">
			<div className="customization-box-container">
				<div className="customization-box-header">Customizations</div>
				<div className="customization-box-content">
					<div className="customization-box-nav-btns">
						{/* Iterate through the settingeKeys and display the 
						keys as button for tab */}
						{settingsKeys.map((option, index) => (
							<button
								key={index}
								onClick={() => setValue(index)}
								className={`customization-box-option-btn ${
									index === value &&
									'customization-box-active-option-btn'
								}`}
							>
								{option}
							</button>
						))}
					</div>
					<div className="customization-box-content-options">
						{/* Create a Input Box for each attributes 
						states are also passed so that they can be updated in the input box
						*/}
						{Object.entries(states[value]).map(([k, v]) => (
							<CustomInputBox
								key={`${settingsKeys[value]}${k}`}
								attribute={k}
								value={v}
								state={states[value]}
								setState={stateFunctions[value]}
							/>
						))}
					</div>
				</div>
				{/* Create buttons to close and save the box */}
				<div className="customization-box-footer">
					<div
						onClick={() => setVisible(false)}
						className="customization-box-footer-btn"
					>
						Cancel
					</div>
					<div className="customization-box-footer-btn">Save</div>
				</div>
			</div>
		</div>
	);
}

export default CustomizationBox;
