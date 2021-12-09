import React from 'react';
import { Link } from 'react-router-dom';

function SendToLogin() {
	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				height: '60vh',
				alignItems: 'center',
				justifyContent: 'center',
				color: 'white'
			}}
		>
			<h5>
				Go to 
				<Link to="/login"> Login </Link>
				Page
			</h5>
		</div>
	);
}

export default SendToLogin;
