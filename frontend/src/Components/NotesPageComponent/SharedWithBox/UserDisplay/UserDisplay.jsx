import React from 'react';
import './UserDisplay.css';

function UserDisplay({ username, full_name, image, handleAdd }) {
	return (
		<div
			className="user-display-wrapper"
			onClick={() => handleAdd(username)}
		>
			<img
				src={`http://127.0.0.1:8000${image}`}
				alt="user image"
				className="user-display-image"
			/>
			<div className="user-display-info">
				<h5>{username}</h5>
				<p>{full_name}</p>
			</div>
		</div>
	);
}

export default UserDisplay;
