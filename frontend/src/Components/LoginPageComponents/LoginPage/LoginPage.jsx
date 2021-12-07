import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MDBInput } from 'mdbreact';

import LogoGIF from '../../../pen-writing.gif';
import './LoginPage.css';
import { loginAction } from '../../../Action/userAction';

function LoginPage() {
	const dispatch = useDispatch();
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	// send the user data to backend for authentication
	const handleSubmit = function (e) {
		e.preventDefault();
		dispatch(loginAction(userName, password));
	};
	return (
		<div className="login-page-wrapper">
			<img src={LogoGIF} alt="logo" className="login-page-img" />
			<div className="login-page-container text-left">
				{/* Input box for username and password 
					text-left classname is used to display the icon left of the input box */}
				<MDBInput
					label="Username"
					size="lg"
					icon="user"
					onChange={(e) => setUserName(e.target.value)}
					value={userName}
				/>
				<MDBInput
					type="password"
					label="Password"
					icon="lock"
					size="lg"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				{/* Button to submit the data */}
				<button
					onClick={(e) => {
						handleSubmit(e);
					}}
					className="login-page-btn"
				>
					Login
				</button>
				{/* Take unregistered user to sign up page */}
				<p className="login-page-signup">New User? Sign Up</p>
			</div>
		</div>
	);
}

export default LoginPage;
