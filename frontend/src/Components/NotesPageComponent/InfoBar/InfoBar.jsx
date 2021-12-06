import React from 'react';
import UserInfo from './UserInfo/UserInfo';
import FileInfo from './FileInfo/FileInfo';
import './InfoBar.css';

function InfoBar() {
	return (
		<header>
			<div className="info-bar-container">
				<FileInfo />
				<UserInfo />
			</div>
			<div className="top-line"/>
		</header>
	);
}

export default InfoBar;
