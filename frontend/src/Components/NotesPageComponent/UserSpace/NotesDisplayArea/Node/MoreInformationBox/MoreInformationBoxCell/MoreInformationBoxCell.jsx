import React, { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { TiMinus } from 'react-icons/ti';
import './MoreInformationBoxCell.css';

function MoreInformationBoxCell({ info }) {
	// whether we want to display detail of info
	const [show, setShow] = useState(false);
	console.log(info);
	return (
		<div className="more-info-box-cell-content">
			<div className="more-info-box-cell-header">
				<div className="more-info-box-cell-title">
					{info.getTitle()}
				</div>
				{/* Button to show and hide detail */}
				<button
					onClick={() => setShow(!show)}
					className="more-info-box-cell-btn"
				>
					{show ? <TiMinus /> : <GoPlus />}
				</button>
			</div>
			{/* If show is true then show detail */}
			{show && (
				<div className="more-info-box-cell-footer">
					{info.getDetails()}
				</div>
			)}
		</div>
	);
}

export default MoreInformationBoxCell;
