import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import InfoBar from '../Components/NotesPageComponent/InfoBar/InfoBar';
import UserSpace from '../Components/NotesPageComponent/UserSpace/UserSpace';

function NotesPage() {
	return (
		<>
			<InfoBar />
			<UserSpace />
		</>
	);
}

export default NotesPage;
