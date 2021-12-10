import React, { useState, useEffect } from 'react';
import { MDBInput } from 'mdbreact';
import { useDispatch } from 'react-redux';

import './ProfilePageComponent.css';

function ProfilePageComponent() {
    const dispatch = useDispatch();

    // states to deal with various data user might want to update
	const [userName, setUserName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [imagePath, setImagePath] = useState('');

    // set all the states by using the data available in local storage
    // content will also be updated if localStorage changes
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('userInfo'));
		setUserName(user?.username);
		setFirstName(user?.first_name);
		setLastName(user?.last_name);
		setImagePath(user?.image);
	}, [localStorage]);

    // if user hasn't logged in redirect them to login page
	if (!localStorage.getItem('userInfo')) {
		window.location.href = '/login';
	}
	return (
		<div className="profile-page-wrapper">
			<img
				src={`http://127.0.0.1:8000${imagePath}`}
				alt="user-image"
				className="profile-page-img"
			/>
			{/* Input box for username password first name and last name
				text-left classname is used to display the icon left of the input box */}
			<div className="profile-page-container text-left">
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
				<div className="profile-page-button-container">
					<button className="profile-page-btn">Update User</button>
					<button className="profile-page-btn">Log Out</button>
				</div>
			</div>
		</div>
	);
}

export default ProfilePageComponent;
