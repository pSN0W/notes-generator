import React, { useState } from 'react';
import './UserComponent.css';

function UserComponent({ children, text }) {
	const [display, setDisplay] = useState({ display: 'none' });
	{
		/* When mouse enters than display the text */
	}
	return (
		<div className="user-container">
			<button
				className="user-button"
				onMouseEnter={(e) => setDisplay({ display: 'block' })}
				onMouseLeave={(e) => setDisplay({ display: 'none' })}
			>
				{children}
			</button>
			<p style={display} className="user-text">
				{text}
			</p>
		</div>
	);
}

export default UserComponent;
