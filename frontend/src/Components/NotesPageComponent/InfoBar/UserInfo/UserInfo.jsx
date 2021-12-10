import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { AiFillSetting } from 'react-icons/ai';
import { BsFillPersonPlusFill } from 'react-icons/bs';

import SharedWithBox from '../../SharedWithBox/SharedWithBox';
import CustomizationBox from '../../CustomizationBox/CustomizationBox';
import UserComponent from './UserComponent/UserComponent';
import './UserInfo.css';

function UserInfo() {
	// whether or not to show the customization box
	const [visible, setVisible] = useState(false);
	const [sharedWithBoxVisible, setSharedWithBoxVisible] = useState(false);
	const user = JSON.parse(localStorage.getItem('userInfo'));
	return (
		<>
			{/* Show shared with box when user is authenticated and sharedWithBoxVisible is set to true */}
			{user && sharedWithBoxVisible && (
				<SharedWithBox setVisible={setSharedWithBoxVisible} />
			)}
			{visible && <CustomizationBox setVisible={setVisible} />}
			<section className="usr-container">
				<UserComponent text="Share">
					<BsFillPersonPlusFill
						size="30px"
						onClick={() => setSharedWithBoxVisible(true)}
					/>
				</UserComponent>
				{/* Display customization box when clicked */}
				<UserComponent text="Customize">
					<AiFillSetting
						size="30px"
						onClick={() => setVisible(true)}
					/>
				</UserComponent>
				{/* If user is authenticated then take them to profile page. 
					Else take them to login page */}
				<Link to={user ? '/profile' : '/login'}>
					<UserComponent text={user ? 'Profile' : 'Login'}>
						{/* If user is authenticated show it's image else show default image */}
						<img
							src={`http://127.0.0.1:8000${
								user ? user.image : '/images/default.jpg'
							}`}
							alt="image"
							className="user-info-image"
						/>
					</UserComponent>
				</Link>
			</section>
		</>
	);
}

export default UserInfo;
