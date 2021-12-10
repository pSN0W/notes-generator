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

// reducer to get the list of note related to a user
export const notesListReducer = (state = { notes: {} }, action) => {
	switch (action.type) {
		case NOTES_LIST_REQUEST:
			return { loading: true, notes: {} };
		case NOTES_LIST_SUCCESS:
			return { loading: false, notes: action.payload };
		case NOTES_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// reducer to get details of a specific note
export const notesDetailReducer = (
	state = { notesDetail: { settings: {} } },
	action
) => {
	switch (action.type) {
		case NOTES_DETAIL_REQUEST:
			return { loading: true, notesDetail: {} };
		case NOTES_DETAIL_SUCCESS:
			return { loading: false, notesDetail: action.payload };
		case NOTES_DETAIL_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// reducer to update different value related to note
export const notesValueUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case NOTES_UPDATE_INPUTBOX:
			return { ...state, content: action.payload };
		case NOTES_UPDATE_FILENAME:
			return { ...state, title: action.payload };
		case NOTES_UPDATE_FAVOURITE:
			return { ...state, favourite: action.payload };
		default:
			return state;
	}
};

// reducer to update the note in the database
export const notesUpdateReducer = ( 
	state = {},
	action
) => {
	switch (action.type) {
		case NOTES_UPDATE_REQUEST:
			return { loading: true };
		case NOTES_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case NOTES_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// reducer to create new note
export const notesCreateReducer = (
	state = { notesDetail: { settings: {} } },
	action
) => {
	switch (action.type) {
		case NOTES_CREATE_REQUEST:
			return { loading: true };
		case NOTES_CREATE_SUCCESS:
			return {
				loading: false,
				createdProduct: action.payload,
				success: true
			};
		case NOTES_CREATE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};
