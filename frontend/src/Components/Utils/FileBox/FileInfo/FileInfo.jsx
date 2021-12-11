import React from 'react';
import { IoMdOpen } from 'react-icons/io';
import './FileInfo.css';
import LogoGIF from '../../../../pen-writing.gif';

function FileInfo({
	value,
	id,
	title,
	owner_name,
	last_modified,
	created_on,
	isHeading = false
}) {
	// this function converts the UTC data into a form that can be read by human
	// 2021-12-05T15:33:37.732950Z -> 5 Dec 2021
	const convertToHumanReadable = (dateTime) => {
		// create a date time object
		const date = new Date(dateTime);
		// return date in form of day-month-year
		return `${date.getDate()} ${date.toLocaleString('default', {
			month: 'short'
		})} ${date.getFullYear()}`;
	};

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
					<div>
						{isHeading ? (
							title
						) : (
							<a href={`/notes/${id}`}>{title}</a>
						)}
					</div>
				</div>
				<div className="fileinfo-fileinfo">
					{value > 1 && <div>{owner_name}</div>}
					<div>
						{isHeading
							? 'Last Modified'
							: convertToHumanReadable(last_modified)}
					</div>
					<div>
						{isHeading
							? 'Created On'
							: convertToHumanReadable(created_on)}
					</div>
					{/* if it is heading then leave it empty else put the new tab icon */}
					{isHeading ? (
						<div className="fileinfo-empty" />
					) : (
						<a href={`/notes/${id}`} target="_blank">
							<IoMdOpen />
						</a>
					)}
				</div>
			</div>
			<div className="fileinfo-line" />
		</>
	);
}

export default FileInfo;
