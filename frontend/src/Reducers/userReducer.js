import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	CREATE_USER_REQUEST,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAIL
} from '../Constants/userConstants';

// reducer to authenticate a user
export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, success: true };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

// reducer to create a new user
export const createUserReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_USER_REQUEST:
			return { loading: true };
		case CREATE_USER_SUCCESS:
			return { loading: false, success: true };
		case CREATE_USER_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};