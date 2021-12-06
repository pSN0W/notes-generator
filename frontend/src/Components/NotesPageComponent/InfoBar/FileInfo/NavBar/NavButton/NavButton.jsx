import React, { useState } from 'react';
import './NavButton.css';

function NavButton({ children, text }) {
	const [display, setDisplay] = useState({ display: 'none' });
	return (
		<div className="button-container">
			{/* Whenever the mouse enters this button display the text */}
			<button
				className="nav-button"
				onMouseEnter={(e) => setDisplay({ display: 'block' })}
				onMouseLeave={(e) => setDisplay({ display: 'none' })}
			>
				{children}
			</button>
			<p style={display} className="nav-text">
				{text}
			</p>
		</div>
	);
}

export default NavButton;
