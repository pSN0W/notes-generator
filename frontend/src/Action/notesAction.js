import axios from 'axios';

import {
	NOTES_LIST_REQUEST,
	NOTES_LIST_SUCCESS,
	NOTES_LIST_FAIL,
	NOTES_DETAIL_REQUEST,
	NOTES_DETAIL_SUCCESS,
	NOTES_DETAIL_FAIL,
	NOTES_UPDATE_INPUTBOX,
	NOTES_UPDATE_FILENAME,
	NOTES_UPDATE_FAVOURITE,
	NOTES_UPDATE_REQUEST,
	NOTES_UPDATE_SUCCESS,
	NOTES_UPDATE_FAIL,
	NOTES_CREATE_REQUEST,
	NOTES_CREATE_SUCCESS,
	NOTES_CREATE_FAIL
} from '../Constants/notesConstants';

// action to list all the notes related to a user
export const listNotes = () => async (dispatch) => {
	try {
		dispatch({ type: NOTES_LIST_REQUEST });

		// get userInfo from local storage
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		let dataFinal = null;

		// if user info exist then make a get request with auth token
		if (userInfo) {
			const config = {
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`
				}
			};
			const { data } = await axios.get(
				'http://127.0.0.1:8000/api/notes/',
				config
			);
			dataFinal = data;
		} else {
			// if user info does not exist then make a get request without any token
			const { data } = await axios.get(
				'http://127.0.0.1:8000/api/notes/'
			);
			dataFinal = data;
		}
		dispatch({
			type: NOTES_LIST_SUCCESS,
			payload: dataFinal
		});
	} catch (error) {
		dispatch({
			// in case of error return error message
			type: NOTES_LIST_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message
		});
	}
};

// action to list detail of a note
// takes the notes id as parameter
export const detailNotes = (id) => async (dispatch) => {
	try {
		dispatch({ type: NOTES_DETAIL_REQUEST });
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		let dataFinal = null;
		// if user info exist then make a get request with auth token
		if (userInfo) {
			const config = {
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`
				}
			};
			const { data } = await axios.get(
				`http://127.0.0.1:8000/api/notes/${id}`,
				config
			);
			dataFinal = data;
		} else {
			// if user info does not exist then make a get request without any token
			const { data } = await axios.get(
				`http://127.0.0.1:8000/api/notes/${id}`
			);
			dataFinal = data;
		}
		dispatch({
			type: NOTES_DETAIL_SUCCESS,
			payload: dataFinal
		});
	} catch (error) {
		dispatch({
			// in case of error return error message
			type: NOTES_DETAIL_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message
		});
	}
};

// this action updates the content (the text in text area)
export const updateContent = (data) => async (dispatch) => {
	dispatch({
		type: NOTES_UPDATE_INPUTBOX,
		payload: data
	});
};

// this action deals with updating file name
export const updateFileName = (data) => async (dispatch) => {
	dispatch({
		type: NOTES_UPDATE_FILENAME,
		payload: data
	});
};

// this action deals with updation of favourite
export const updateFavourite = (data) => async (dispatch) => {
	dispatch({
		type: NOTES_UPDATE_FAVOURITE,
		payload: data
	});
};

// this action deals with updating the notes
// the arguments are the id of the note to be updated and the data with which note should be updated
export const updateNotes = (id, userData) => async (dispatch) => {
	try {
		dispatch({ type: NOTES_UPDATE_REQUEST });

		// get the user info from local storage and then make a patch request for data
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		};
		const { data } = await axios.patch(
			`http://127.0.0.1:8000/api/notes/${id}`,
			userData,
			config
		);
		dispatch({
			type: NOTES_UPDATE_SUCCESS
		});

		// update the content of the notes with the new content
		dispatch({
			type: NOTES_DETAIL_SUCCESS,
			payload: data
		});
	} catch (error) {
		// in case of error display error message
		dispatch({
			type: NOTES_UPDATE_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message
		});
	}
};

// this action deals with creating new note
// userData is the data with which we create the note
export const createNotes = (userData) => async (dispatch) => {
	try {
		dispatch({ type: NOTES_CREATE_REQUEST });

		// get user info and make a post request with the data
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		};
		const { data } = await axios.post(
			'http://127.0.0.1:8000/api/notes/create',
			userData,
			config
		);
		dispatch({
			type: NOTES_CREATE_SUCCESS,
			payload: data
		});
	} catch (error) {
		// in case of error display the error message
		dispatch({
			type: NOTES_CREATE_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message
		});
	}
};
