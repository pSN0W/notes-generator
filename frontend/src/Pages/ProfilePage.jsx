import React from 'react';

import ProfilePageComponent from '../Components/ProfilePageComponent/ProfilePageComponent';

import { logoutAction } from '../Action/userAction';

function ProfilePage() {
	const dispatch = useDispatch();
	const handleLogOut = () => {
		dispatch(logoutAction());
	};
	return (
		<div>
			<ProfilePageComponent />
		</div>
	);
}

export default ProfilePage;
