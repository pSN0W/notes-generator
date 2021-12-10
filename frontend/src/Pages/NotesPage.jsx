import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import InfoBar from '../Components/NotesPageComponent/InfoBar/InfoBar';
import UserSpace from '../Components/NotesPageComponent/UserSpace/UserSpace';
import MessageComponent from '../Components/Utils/MessageComponent/MessageComponent';
import Loader from '../Components/Utils/Loader/Loader';
import PageDNE from '../Components/NotesPageComponent/PageDNE/PageDNE';

import { detailNotes } from '../Action/notesAction';

// new context to update message box
export const MessageContext = React.createContext();

function NotesPage() {
	const dispatch = useDispatch();
	const id = useParams().id;

	// states to deal with the message box
	const [message, setMessage] = useState('');
	const [classname, setClassname] = useState('');
	const [reRender, setReRender] = useState(true);

	// Function to deal with updating message box
	// msg -> new message to update message box with
	// clName -> new classname of the message box
	const updateMessageBox = (msg, clName) => {
		setReRender(!reRender);
		setMessage(msg);
		setClassname(clName);
	};

	// getting the notes detail from store
	const { loading, notesDetail, error } = useSelector(
		(state) => state['notesDetail']
	);

	// as soon as the page gets rendered get the notes detail from database
	useEffect(() => {
		dispatch(detailNotes(id));
	}, []);
	return (
		<MessageContext.Provider value={updateMessageBox}>
			<div>
				{error && <PageDNE />}
				{loading && <Loader />}
				{notesDetail && (
					<div
						style={{
							backgroundColor: '#121212',
							height: '100vh',
							overflow: 'hidden'
						}}
					>
						<MessageComponent
							message={message}
							classname={classname}
							reRender={reRender}
						/>
						<InfoBar />
						<UserSpace />
					</div>
				)}
			</div>
		</MessageContext.Provider>
	);
}

export default NotesPage;
