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

export const listNotes = () => async (dispatch) => {
	try {
		dispatch({ type: NOTES_LIST_REQUEST });
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		let dataFinal = null;
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
			type: NOTES_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const detailNotes = (id) => async (dispatch) => {
	try {
		dispatch({ type: NOTES_DETAIL_REQUEST });
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		let dataFinal = null;
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
			type: NOTES_DETAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const updateContent = (data) => async (dispatch) => {
	dispatch({
		type: NOTES_UPDATE_INPUTBOX,
		payload: data
	});
};

export const updateFileName = (data) => async (dispatch) => {
	dispatch({
		type: NOTES_UPDATE_FILENAME,
		payload: data
	});
};

export const updateFavourite = (data) => async (dispatch) => {
	dispatch({
		type: NOTES_UPDATE_FAVOURITE,
		payload: data
	});
};

export const updateNotes = (id, userData) => async (dispatch) => {
	try {
		dispatch({ type: NOTES_UPDATE_REQUEST });
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		let dataFinal = null;
		if (userInfo) {
			const config = {
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`
				}
			};
			const { data } = await axios.patch(
				`http://127.0.0.1:8000/api/notes/${id}`,
				userData,
				config
			);
			dataFinal = data;
		} else {
			const { data } = await axios.patch(
				`http://127.0.0.1:8000/api/notes/${id}`,
				userData
			);
			dataFinal = data;
		}
		dispatch({
			type: NOTES_UPDATE_SUCCESS
		});
		dispatch({
			type: NOTES_DETAIL_SUCCESS,
			payload: dataFinal
		});
	} catch (error) {
		dispatch({
			type: NOTES_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const createNotes = (userData) => async (dispatch) => {
	try {
		dispatch({ type: NOTES_CREATE_REQUEST });
		let dataFinal = null;
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo) {
			const config = {
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`
				}
			};
			const { data } = await axios.post(
				'http://127.0.0.1:8000/api/notes/create',
				userData,
				config
			);
			dataFinal = data;
		}
		dispatch({
			type: NOTES_CREATE_SUCCESS,
			payload: dataFinal
		});
	} catch (error) {
		dispatch({
			type: NOTES_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};
