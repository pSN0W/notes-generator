import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MDBInput } from 'mdbreact';

import FileInfo from './FileInfo/FileInfo';
import NoNotes from './NoNotes';
import SendToLogin from './SendToLogin';
import Loader from '../Loader/Loader';

import './FileBox.css';
import { listNotes, createNotes } from '../../../Action/notesAction';

/*
	This component display all the file associated with the user
*/
function FileBox({ setVisible, activeIndex }) {
	const dispatch = useDispatch();
	const isAuthenticated = localStorage.getItem('userInfo');

	// states for creating notes
	const {
		loading: createLoading,
		success: createSuccess,
		createdProduct: createdProduct
	} = useSelector((state) => state['notesCreate']);

	// states for getting notes list
	const { error, loading, notes } = useSelector(
		(state) => state['notesList']
	);

	// the index of tab which is currently open
	const [value, setValue] = useState(activeIndex);

	// the value of the inputbox
	const [input, setInput] = useState('');

	// list of files that will be rendered
	const [data, setData] = useState([]);

	// options for the tab
	const options = ['Recent', 'Favourites', 'Shared', 'Global'];

	// once note has been created successfully redirect to that page
	useEffect(() => {
		if (createSuccess) {
			window.location.href = `/notes/${createdProduct.id}`;
		}
	}, [createSuccess]);

	// get the list of notes from the api when this component is rendered
	useEffect(() => {
		dispatch(listNotes());
	}, []);

	// If user is authenticated dispatch creating new notes without any data
	// else redirect the user to login page
	const handleCreateNew = () => {
		if (isAuthenticated) {
			dispatch(createNotes({}));
		} else {
			window.location.href = '/login';
		}
	};

	useEffect(() => {
		let newData;
		// setting newData based on the opened tab
		switch (value) {
			case 0:
				newData = notes?.own;
				break;
			case 1:
				newData = notes?.own?.filter((file) => file.favourite);
				break;
			case 2:
				newData = notes?.shared;
				break;
			case 3:
				newData = notes?.global;
				break;
			default:
				setData(data);
				break;
		}

		// filtering the newData based on the input in the search box
		const finData = newData?.filter((file) =>
			file.title.toLowerCase().includes(input.toLowerCase())
		);

		// setting data as finData so that the file in that specific tab filtered by
		// the search box is displayed
		setData(finData);
	}, [value, input, notes, loading]);

	if (error && !notes) {
		return <h1>{error}</h1>;
	}

	return (
		<div className="filebox-wrapper">
			{loading && <Loader />}
			{createLoading && <Loader />}
			<div className="filebox-container">
				<div className="filebox-button-container">
					{/* Iterate over the options dict and create a button for each value */}
					{options.map((option, index) => (
						<button
							key={index}
							onClick={() => setValue(index)}
							className={`filebox-option-btn ${
								index === value && 'filebox-active-option-btn'
							}`}
						>
							{option}
						</button>
					))}
				</div>
				<div className="filebox-search">
					<MDBInput
						label="Filter Notes"
						value={input}
						onChange={(e) => {
							setInput(e.target.value);
						}}
					/>
				</div>
				{/*If data is not than loop over it and display it 
					If data is empty and user is authenticated or is on global tab display No Notes else display the user to login
				*/}
				{data && data.length ? (
					<div>
						{/* The heading for displaying notes */}
						<FileInfo
							value={value}
							title="Title"
							owner_name="Owner"
							last_modified="Last Modified"
							created_on="Created On"
							isHeading={true}
						/>
						{/* Map over the notes in data and create a FileInfo component for each of them */}
						<div className="filebox-file-info">
							{data?.map((file) => (
								<FileInfo
									value={value}
									{...file}
									key={file.id}
								/>
							))}
						</div>
						{console.log(data)}
					</div>
				) : isAuthenticated || value === 3 ? (
					<NoNotes />
				) : (
					<SendToLogin />
				)}
				<div className="filebox-footer">
					<div
						className="filebox-footer-btn"
						onClick={handleCreateNew}
					>
						Create Notes
					</div>
					<div
						onClick={() => setVisible(false)}
						className="filebox-footer-btn"
					>
						Cancel
					</div>
				</div>
			</div>
		</div>
	);
}

export default FileBox;
