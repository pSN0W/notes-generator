import React, { useState, useEffect } from 'react';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import NavBar from './NavBar/NavBar';
import './FileInfo.css';

function FileInfo() {
	const [fileName, setFileName] = useState('Untitled');
	return (
		<section className="container">
			<MdDriveFileRenameOutline className="logo" />
			<input
				className="input"
				type="text"
				id="fileName"
				name="fileName"
				value={fileName}
				onChange={(e) => setFileName(e.target.value)}
			/>
			<NavBar />
		</section>
	);
}

export default FileInfo;
