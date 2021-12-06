import React, { useState, useEffect } from 'react';
import { FaGreaterThan } from 'react-icons/fa';
import { FaLessThan } from 'react-icons/fa';
import './InputArea.css';

function InputArea() {
	const [visible, setVisible] = useState(true);
	const [inputValue, setInputValue] = useState('');
	return (
		<aside className="inp-area-container">
			{/* Create a text area to input the text */}
			<textarea
				className={`inp-area-input-box ${!visible && 'hide-input-box'}`}
				name="input-box"
				id="input-box"
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
			></textarea>
			{/* Create something like arrow to display or hide the textbox */}
			<div
				className="inp-area-btn-wrapper"
				onClick={() => setVisible(!visible)}
			>
				{visible ? <FaLessThan /> : <FaGreaterThan />}
			</div>
		</aside>
	);
}

export default InputArea;
