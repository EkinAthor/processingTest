/**
 * this contains reducers. Reducers, if initialized should return empty representation of the store tree
 * store tree looks like this:
 * {
 * 		chatMessages: [
 * 			{
 * 				text: "lorem ipsum",
 * 				time: timestamp
 * 			},
 * 			{
 * 				text: "dolor sit amet",
 * 				time: timestamp
 * 			}
 * 		],
 * 		lastMessage: {
 * 			text: "dolor sit amet",
 * 			time: "timestamp"
 * 		}
 * }
 */

import { combineReducers } from 'redux';
import { SAMPLE_ACTION, RECIEVE_CHATS } from '../actions/types';
import { API_INIT_STORE, API_UPDATE_FILES, API_ADD_FILE } from '../actions/asyncTypes';
import fileReducer from './fileReducer';
import appState from './appStateReducer';


/**
 * sub-reducer handling the chat1 part of the store tree (see sample data tree)
 * note: setting up default state in the constructor 
 *
 * PURE FUNCTION, no mutating, returning new object ich change occured
 */

function chatMessages(state = [], action) {
	switch (action.type) {
		//always return full state, if action does not concern us, just pass through
		case SAMPLE_ACTION:
			//returning state as NEW OBJECT. no mutating
			return [
				...state,
				action.chatObj
			];
		case RECIEVE_CHATS: 
			return action.chats;
		default: 
			return state;
	}
}

/**
 * sub-reducer handling the lastMessage portion of the store tree
 * note: in this case we are storing an object and will be changing the attribute "last updated"
 * this is here mainly as an example of Object.assign
 */
function lastMsg(state = {lastMessage: null, time: null}, action) {
	switch (action.type) {
		case SAMPLE_ACTION:
			return Object.assign({}, state, action.chatObj);
		default: 
			return state;
	}
}

function files(state = [], action) {
	switch(action.type) {
		case API_ADD_FILE:
			return [
				...state,
				action.payload
			];
		default:
			return state.map(file => fileReducer(file, action));
	}
	
}




/**
 * combine reducers to create the representation of the store tree
 * 
 */
const appReducerFunction = combineReducers({
	chatMessages,
	lastMessage: lastMsg,
	files,
	appState
});

const appReducer = function(state, action) {
	switch(action.type) {
		case API_UPDATE_FILES: 
			return Object.assign({}, state, {files: action.payload});
		case API_INIT_STORE:
			return action.payload;
		default: 
			return appReducerFunction(state, action);
	}
};




export default appReducer;

