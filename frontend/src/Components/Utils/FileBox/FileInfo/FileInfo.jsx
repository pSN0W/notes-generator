import React from 'react';
import { IoMdOpen } from 'react-icons/io';
import './FileInfo.css';
import LogoGIF from '../../../../pen-writing.gif';

function FileInfo({
	value,
	id,
	title,
	owner,
	last_modified,
	created_on,
	isHeading = false
}) {
	return (
		<>
			{/* If it is not heading then give it hover property */}
			<div
				className={`fileinfo-structure ${
					!isHeading && 'fileinfo-structure-hover'
				}`}
			>
				<div className="fileinfo-filename">
					{/* if it is heading then leave it empty else put the logo image */}
					{isHeading ? (
						<div className="fileinfo-empty" />
					) : (
						<img
							src={LogoGIF}
							alt="logoImage"
							className="fileinfo-image"
						/>
					)}
					<div>{title}</div>
				</div>
				<div className="fileinfo-fileinfo">
					{value > 1 && <div>{owner}</div>}
					<div>{last_modified}</div>
					<div>{created_on}</div>
					{/* if it is heading then leave it empty else put the new tab icon */}
					{isHeading ? (
						<div className="fileinfo-empty" />
					) : (
						<IoMdOpen />
					)}
				</div>
			</div>
			<div className="fileinfo-line" />
		</>
	);
}

export default FileInfo;
