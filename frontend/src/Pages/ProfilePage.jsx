import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../Action/userAction';

function ProfilePage() {
	const dispatch = useDispatch();
	const handleLogOut = () => {
		dispatch(logoutAction());
	};
	return (
		<div>
			<button onClick={handleLogOut}>Log Out</button>
		</div>
	);
}

export default ProfilePage;
