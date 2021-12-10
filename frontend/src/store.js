import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { notesListReducer } from './Reducers/notesReducer';
import { notesDetailReducer } from './Reducers/notesReducer';
import { notesValueUpdateReducer } from './Reducers/notesReducer';
import { notesUpdateReducer } from './Reducers/notesReducer';
import { notesCreateReducer } from './Reducers/notesReducer';
import { userLoginReducer } from './Reducers/userReducer';
import { userListReducer } from './Reducers/userReducer';
import { createUserReducer } from './Reducers/userReducer';
import { updateUserReducer } from './Reducers/userReducer';

const reducer = combineReducers({
	notesList: notesListReducer,
	notesDetail: notesDetailReducer,
	notesValue: notesValueUpdateReducer,
	notesUpdate: notesUpdateReducer,
	notesCreate: notesCreateReducer,
	userLogin: userLoginReducer,
	userList: userListReducer,
	userCreate: createUserReducer,
	userUpdate: updateUserReducer
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
