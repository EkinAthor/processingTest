/**
 * Reducers handling application state. Don't combine data + state, rather have it in separate reducer
 * 
 */

import { combineReducers } from 'redux';
import { SELECT_FIELD, SELECT_FILE } from '../actions/types';



function files(state={}, action) {
	switch(action.type) {
		case SELECT_FIELD:
		//check if state object for the file exists. If not, create. if yes, update
			if(state[action.gid] !== 'undefined') {
				return Object.assign({}, state, {[action.gid]: fileStateReducer(state[action.gid],action)});
			} else {
				return Object.assign({}, state, {[action.gid]: fileStateReducer({},action)});
			}
		default:
			return state;
	}
}

function fileStateReducer(state={fetching: false, activeColumn: null}, action) {
	switch(action.type) {
		case SELECT_FIELD:
			return Object.assign({},state,{activeColumn: action.eid});
		default: 
			return state;
	}
}

function app(state={activeFile: '1234567890'}, action ) {
	switch(action.type) {
		case SELECT_FILE:
			return Object.assign({},state, {activeFile: action.gid});
		default: 
			return state;
	}
}

export default combineReducers({
	files,
	app
});