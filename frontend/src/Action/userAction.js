import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	CREATE_USER_REQUEST,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAIL
} from '../Constants/userConstants';
import axios from 'axios';

export const loginAction = (username, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST
		});
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		};
		const { data } = await axios.post(
			'http://127.0.0.1:8000/api/login/',
			{ username: username, password: password },
			config
		);
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data
		});
		window.location.href = '/';
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const logoutAction = () => async (dispatch) => {
	localStorage.removeItem('userInfo');
	dispatch({
		type: USER_LOGOUT
	});
	window.location.href = '/';
};

export const createUserAction = (userData) => async (dispatch) => {
	try {
		dispatch({
			type: CREATE_USER_REQUEST
		});
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		};
		const { data } = await axios.post(
			'http://127.0.0.1:8000/api/users/create',
			userData,
			config
		);
		dispatch({
			type: CREATE_USER_SUCCESS,
			payload: data
		});
		window.location.href = '/';
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: CREATE_USER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};
