import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { FaGreaterThan } from 'react-icons/fa';
import { FaLessThan } from 'react-icons/fa';

import './InputArea.css';
import { updateContent } from '../../../../Action/notesAction';

function InputArea() {
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(true);
	const [inputValue, setInputValue] = useState('');

	// getting notes detail from the store
	const { loading, notesDetail } = useSelector(
		(state) => state['notesDetail']
	);

	// set content to the content provided from backend
	useEffect(() => {
		setInputValue(notesDetail?.content);
	}, [loading, notesDetail]);

	// update the global content value each time the content is updated
	useEffect(() => {
		dispatch(updateContent(inputValue));
	}, [inputValue]);
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
			/>

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
