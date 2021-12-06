import React, { useState } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import CustomInputBox from '../../CustomizationBox/CustomInputBox/CustomInputBox';
import UserComponent from './UserComponent/UserComponent';
import './UserInfo.css';

function UserInfo() {
	// whether or not to show the customization box
	const [visible, setVisible] = useState(false);
	const isAuthenticated = true;
	return (
		<>
			{visible && <CustomizationBox setVisible={setVisible} />}
			<section className="usr-container">
				<UserComponent text="Share">
					<BsFillPersonPlusFill size="30px" />
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
				<UserComponent text={isAuthenticated ? 'Profile' : 'Login'}>
					<img
						src="https://previews.123rf.com/images/yacobchuk/yacobchuk2004/yacobchuk200400387/143834115-pleasant-emotions-charming-blonde-female-person-keeping-smile-on-her-face-while-doing-beauty-procedu.jpg"
						alt="image"
						className="user-info-image"
					/>
				</UserComponent>
			</section>
		</>
	);
}

export default UserInfo;
