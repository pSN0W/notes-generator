import React, { useState, useEffect } from 'react';
import MoreInformationBoxCell from './MoreInformationBoxCell/MoreInformationBoxCell';
import { convertToListOfInfo } from './ConvrtToListOfInfo';
import './MoreInformationBox.css';

function MoreInformationBox({ content }) {
	const [information, setInformation] = useState([]);

	// pass the content to convertToListOfInfo function and get data desired form
	useEffect(() => {
		setInformation(convertToListOfInfo(content));
	}, [content]);
	return (
		<div className="more-info-box-wrapper">
			{/* Iterate through the information and display each info */}
			{information.map((info, index) => (
				<MoreInformationBoxCell info={info} key={index} />
			))}
		</div>
	);
}

export default MoreInformationBox;
