import React, { useState } from 'react';
import { MDBInput } from 'mdbreact';
import LogoGIF from '../../../pen-writing.gif';
import './signup.css';

function SignUp() {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const handleSubmit = function (e) {
		e.preventDefault();
		console.log(userName);
		console.log(password);
	};
	return (
		<div className="signup-wrapper">
			<img src={LogoGIF} alt="logo" className="login-page-img" />
			{/* Input box for username password first name and last name
				text-left classname is used to display the icon left of the input box */}
			<div className="signup-container text-left">
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
				<MDBInput
					label="First Name"
					size="lg"
					icon="address-card"
					onChange={(e) => setFirstName(e.target.value)}
					value={firstName}
				/>
				<MDBInput
					label="Last Name"
					size="lg"
					icon="address-card"
					onChange={(e) => setLastName(e.target.value)}
					value={lastName}
				/>

				{/* Button to submit the information */}
				<button
					onClick={(e) => {
						handleSubmit(e);
					}}
					className="signup-btn"
				>
					Sign Up
				</button>
			</div>
		</div>
	);
}

export default SignUp;
