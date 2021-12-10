import React, { useState,useEffect } from 'react';
import { MDBInput } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../Utils/Loader/Loader';
import MessageComponent from '../../Utils/MessageComponent/MessageComponent';

import LogoGIF from '../../../pen-writing.gif';
import './signup.css';
import { createUserAction } from '../../../Action/userAction';

function SignUp() {
	const dispatch = useDispatch();

	// state related to input box
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	// state of message box component
	const [message, setMessage] = useState('');
	const [classname, setClassname] = useState('danger');
	const [reRender, setReRender] = useState(true);

	// state related to login of user
	const { loading, error } = useSelector((state) => state['userLogin']);

	// display error message in casse of error
	useEffect(() => {
		setMessage(error);
		setClassname('danger');
		setReRender(!reRender);
	}, [error]);

	// take all the data and send it to backend
	const handleSubmit = function (e) {
		e.preventDefault();
		const data = {
			username: userName,
			password: password,
			first_name: firstName,
			last_name: lastName
		};
		dispatch(createUserAction(data));
	};
	return (
		<div className="signup-wrapper">
			{loading && <Loader />}
			<MessageComponent
				message={message}
				classname={classname}
				reRender={reRender}
			/>
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
