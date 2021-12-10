import React, { useState, useEffect } from 'react';
import { MDBInput } from 'mdbreact';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { logoutAction } from '../../Action/userAction';
import { updateUser } from '../../Action/userAction';
import { updateImage } from '../../Action/userAction';

import Loader from '../Utils/Loader/Loader';
import MessageComponent from '../Utils/MessageComponent/MessageComponent';

import './ProfilePageComponent.css';

function ProfilePageComponent() {
	const dispatch = useDispatch();

	// states to deal with various data user might want to update
	const [userName, setUserName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [imagePath, setImagePath] = useState('');

	// states for message box
	const [message, setMessage] = useState('');
	const [classname, setClassname] = useState('success');
	const [reRender, setReRender] = useState(true);

	const { loading, success, error } = useSelector(
		(state) => state['userUpdate']
	);

	// set all the states by using the data available in local storage
	// content will also be updated if when loading is done
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('userInfo'));
		setUserName(user?.username);
		setFirstName(user?.first_name);
		setLastName(user?.last_name);
		setImagePath(user?.image);

		// if succeded then display in the message box
		if (success) {
			setMessage('Updated Successfully');
			setClassname('success');
			setReRender(!reRender);
		}
	}, [loading, success]);

	// display the error message in message box when error happens
	useEffect(() => {
		if (error) {
			setMessage(error);
			setClassname('danger');
			setReRender(!reRender);
		}
	}, [error]);

	// function to handle log out
	const handleLogOut = () => {
		dispatch(logoutAction());
	};

	// function to update the userInfo
	const handleUpdate = () => {
		const data = {
			username: userName,
			password: password,
			first_name: firstName,
			last_name: lastName
		};
		dispatch(updateUser(data));
	};

	// function to update user image
	const handleImageUpload = (e) => {
		// get the file
		const file = e.target.files[0];

		// create an object of form data and put file in it
		const formData = new FormData();
		formData.append('image', file);

		// send the form data to update in the backend
		dispatch(updateImage(formData));
	};

	// if user hasn't logged in redirect them to login page
	if (!localStorage.getItem('userInfo')) {
		window.location.href = '/login';
	}
	return (
		<div className="profile-page-wrapper">
			{loading && <Loader />}
			<MessageComponent
				message={message}
				classname={classname}
				reRender={reRender}
			/>
			<div className="profile-page-img-container">
				<img
					src={`http://127.0.0.1:8000${imagePath}`}
					alt="user-image"
					className="profile-page-img"
				/>
				<input
					type="file"
					multiple={false}
					accept=".jpg, .jpeg, .png, .gif"
					onChange={handleImageUpload}
				/>
			</div>
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
					<button className="profile-page-btn" onClick={handleUpdate}>
						Update User
					</button>
					<button className="profile-page-btn" onClick={handleLogOut}>
						Log Out
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProfilePageComponent;
