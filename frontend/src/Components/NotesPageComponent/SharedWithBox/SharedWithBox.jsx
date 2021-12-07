import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { listUsers } from '../../../Action/userAction';

function SharedWithBox({ setVisible }) {
	const dispatch = useDispatch();
	// all the users in the database
	const [allUserList, setAllUserList] = useState([]);

	// users with whom this note is shared
	const [sharedWithUserList, setSharedWithUserList] = useState([]);

	// states for user list
	const {
		loading: userListLoading,
		userList,
		error
	} = useSelector((state) => state['userList']);

	// notesDetail from the store
	const { loading, notesDetail } = useSelector(
		(state) => state['notesDetail']
	);

	// get list of user as soon as soon as component is rendered
	useEffect(() => {
		dispatch(listUsers());
	}, []);

    // once done loading update the shared with user list
	useEffect(() => {
		setSharedWithUserList(notesDetail?.shared_with);
	}, [loading, notesDetail]);

    // update the userlist after data has been fetched from backend
	useEffect(() => {
		setAllUserList(userList);
	}, [userList, userListLoading]);
	return (
		<div className="shared-box-wrapper">
			<div className="shared-box-all-user"></div>
			<div className="shared-box-shared-user"></div>
			<div className="shared-box-link"></div>
			<div className="shared-box-optns"></div>
		</div>
	);
}

export default SharedWithBox;
