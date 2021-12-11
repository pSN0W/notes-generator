import React, { useState, useEffect } from 'react';
import { MDBInput } from 'mdbreact';
import './CustomInputBox.css';

function CustomInputBox({ attribute, value, state, setState }) {
	// initializing isNumber as true designating we need to display a number input box
	let isNumber = true;

	// capitalise the first character
	// background Color -> Background Color
	const capitaliseFirstLetter = (word) =>
		word && word[0].toUpperCase() + word.slice(1);

	// converts camelCase to in space form and then capitalises the first letter
	// borderBottomLeftRadius -> Border Bottom Left Radius
	const getInSpacesForm = (attr_name) =>
		capitaliseFirstLetter(attr_name.replace(/[A-Z]/g, ' $&'));

	// get last word from a sentance
	// background Color -> Color
	const getLastWord = (attr_name) => {
		const tmp_arr = attr_name.split(' ');
		return tmp_arr[tmp_arr.length - 1];
	};

	// gets integer attribute value from attribute value in string
	// 10px -> 10
	const getInteger = (valInPx) =>
		Number(valInPx.substring(0, valInPx.length - 2));

	// if last word is Color then set isNumber to false as we need input type color for it
	if (getLastWord(getInSpacesForm(attribute)) === 'Color') {
		isNumber = false;
	}

	// if the input type is number the set value to it's integer value
	if (isNumber) {
		value = getInteger(value);
	}
	const [inputValue, setInputValue] = useState(value);

	// everytime the value of this input box changes update the state of the component
	useEffect(() => {
		if (isNumber) {
			setState({
				...state,
				[attribute]: `${inputValue}px`
			});
		} else {
			setState({ ...state, [attribute]: inputValue });
		}
	}, [inputValue]);

	// return an integer type input box for number
	if (isNumber) {
		return (
			<MDBInput
				type="number"
				label={getInSpacesForm(attribute)}
				size="lg"
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
			/>
		);
	}

	// for colour return an input box of type colour
	return (
		<div className="custominputbox-col-wrap">
			<MDBInput
				label={getInSpacesForm(attribute)}
				size="lg"
				value={inputValue}
				disabled
			/>
			<input
				type="color"
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
			/>
		</div>
	);
}

export default CustomInputBox;
