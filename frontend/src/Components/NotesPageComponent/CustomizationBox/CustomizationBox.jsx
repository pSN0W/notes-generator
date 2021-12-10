import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import CustomInputBox from './CustomInputBox/CustomInputBox';

import { updateNotes } from '../../../Action/notesAction';
import './CustomizationBox.css';

/*
	This function displays the customization box displayed when clicked on customize
*/
function CustomizationBox({ setVisible }) {
	const dispatch = useDispatch();
	const id = useParams().id;

	// getting the notes detail from store
	const { loading, notesDetail } = useSelector(
		(state) => state['notesDetail']
	);


	// The tab which is opened
	const [value, setValue] = useState(0);

	// Data for different components
	const [settings, setSettings] = useState({});
	const [screen, setScreen] = useState({});
	const [box, setBox] = useState({});
	const [line, setLine] = useState({});
	const [text, setText] = useState({});

	// getting all the key of setting except line-hz
	const settingsKeys = Object.keys(settings)?.filter(
		(component) => component !== 'line-hz'
	);

	// puttings the states and functions in a list so that they
	// can be referred by their index
	const stateFunctions = [setScreen, setBox, setLine, setText];
	const states = [screen, box, line, text];

	// once loaded then update the value of all the components
	useEffect(() => {
		setSettings(notesDetail?.settings);
		setScreen(notesDetail?.settings?.screen);
		setBox(notesDetail?.settings?.box);
		setLine(notesDetail?.settings?.line);
		setText(notesDetail?.settings?.text);
	}, [loading, notesDetail]);

	// update the new data in backend once the user hit save
	const handleSave = () => {
		const data = {
			settings: {
				screen: screen,
				box: box,
				line: line,
				text: text
			}
		};
		dispatch(updateNotes(id, data));
		// no need to deal with state of update as they are already dealt in navbar
	};


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
					<div
						className="customization-box-footer-btn"
						onClick={handleSave}
					>
						Save
					</div>
				</div>
			</div>
		</div>
	);
}

export default CustomizationBox;
