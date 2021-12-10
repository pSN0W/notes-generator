import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { MdDriveFileRenameOutline } from 'react-icons/md';

import NavBar from './NavBar/NavBar';
import './FileInfo.css';
import { updateFileName } from '../../../../Action/notesAction';

function FileInfo() {
	const [fileName, setFileName] = useState('');
	const dispatch = useDispatch();

	// getting notes detail from the store
	const { loading, notesDetail } = useSelector(
		(state) => state['notesDetail']
	);

	// Update the filename when done loading
	useEffect(() => {
		setFileName(notesDetail?.title);
	}, [loading, notesDetail]);

	// Update the global data whenever filename changes
	useEffect(() => {
		dispatch(updateFileName(fileName));
	}, [fileName, dispatch]);
	return (
		<section className="container">
			<MdDriveFileRenameOutline className="logo" />
			<input
				className="input"
				type="text"
				id="fileName"
				name="fileName"
				value={fileName || ''}
				onChange={(e) => setFileName(e.target.value)}
			/>
			<NavBar />
		</section>
	);
}

export default FileInfo;
