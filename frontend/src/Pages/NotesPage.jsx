import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import InfoBar from '../Components/NotesPageComponent/InfoBar/InfoBar';
import UserSpace from '../Components/NotesPageComponent/UserSpace/UserSpace';
import { detailNotes } from '../Action/notesAction';

function NotesPage() {
	const dispatch = useDispatch();
	const id = useParams().id;

	// getting the notes detail from store
	const { loading, notesDetail, error } = useSelector(
		(state) => state['notesDetail']
	);

	// as soon as the page gets rendered get the notes detail from database
	useEffect(() => {
		dispatch(detailNotes(id));
	}, []);
	return (
		<div
			style={{
				backgroundColor: '#121212',
				height: '100vh',
				overflow: 'hidden'
			}}
		>
			<InfoBar />
			<UserSpace />
		</div>
	);
}

export default NotesPage;
