import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	CREATE_USER_REQUEST,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAIL,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL
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
		default:
			return state;
	}
};

// reducer to update a new user
export const updateUserReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_USER_REQUEST: 
			return { loading: true };
		case UPDATE_USER_SUCCESS:
			return { loading: false, success: true };
		case UPDATE_USER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// reducer to deal with getting list of user
export const userListReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return { loading: true };
		case USER_LIST_SUCCESS:
			return { loading: false, userList: action.payload };
		case USER_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
