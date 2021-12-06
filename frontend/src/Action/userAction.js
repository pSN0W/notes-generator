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

// action to deal with user authentication
// takes username and password as argument
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
		// send the username and password for authentication
		const { data } = await axios.post(
			'http://127.0.0.1:8000/api/login/',
			{ username: username, password: password },
			config
		);
		
		// if success then dispatch login successe
		dispatch({
			type: USER_LOGIN_SUCCESS,
		});

		// redirect to the home page
		window.location.href = '/';

		// store the userInfo in local storage
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		// in case of error return the error message
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message
		});
	}
};

// action to deal with user logout
export const logoutAction = () => async (dispatch) => {
	// remove user info from local sorage
	localStorage.removeItem('userInfo');
	dispatch({
		type: USER_LOGOUT
	});
	// redirect to the home page
	window.location.href = '/';
};

// action to deal with the creation of new user
// takes userData which contains username, password, firstname, lastname
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
		// make a post request with the user data
		const { data } = await axios.post(
			'http://127.0.0.1:8000/api/users/create',
			userData,
			config
		);
		dispatch({
			type: CREATE_USER_SUCCESS,
		});

		// in case of success redirect the user to home page
		window.location.href = '/';

		// set the user data in local storage
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		// in case of error return the error message
		dispatch({
			type: CREATE_USER_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message
		});
	}
};
