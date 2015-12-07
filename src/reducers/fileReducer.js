/**
 * Sub-reducer handling file data. Contain sub-reducers for business and technical metadata
 */

import { combineReducers } from 'redux';
import { API_UPDATE_COLUMNS, API_UPDATE_MASKS, API_UPDATE_DISTINCT, API_UPDATE_FILE, API_UPDATE_NULLCOUNT, API_UPDATE_FREQ } from '../actions/asyncTypes';

function technicalMetadata(state={info:{}, source:{}, columns: []}, action) {
	switch(action.type) {
		case API_UPDATE_COLUMNS:
			if(state.info.gid !== 'undefined' && action.gid == state.info.gid) {
				return Object.assign({},state,{columns: action.payload});
			}
		default:
			return state;
	}
}

function businessMetadata(state = {info: {}, elements:[]}, action) {
	switch(action.type) {
		case API_UPDATE_NULLCOUNT:
			if(action.gid == state.gid) {
				return Object.assign({},
					state, 
					{
						elements: state.elements.map((element,index)=>
							Object.assign({}, element, action.payload[index])
							) 
					});
			}

		case API_UPDATE_FREQ:
			if(action.gid == state.gid) {
				return Object.assign({},
					state, 
					{
						elements: state.elements.map((element,index)=>
							Object.assign({}, element, action.payload[index])
							) 
					});
			}
		case API_UPDATE_MASKS:
			if(action.gid == state.gid) {
				return Object.assign({},
					state, 
					{
						elements: state.elements.map((element,index)=>
							Object.assign({}, element, action.payload[index])
							) 
					});
			}
		case API_UPDATE_DISTINCT:
			if(action.gid == state.gid) {
				return Object.assign({},
					state, 
					{
						elements: state.elements.map((element,index)=>
							Object.assign({}, element, {distinctCount: action.payload[index]})
							) 
					});
			}
		default:
			return state;
	}
}

function _id(state=null, action) {
	return state;
};

function stateInfo(state={fetching: false}, action) {
	switch(action.type) {
		default:
			return state;
	}
}

/**
 * default reducer composition
 * 
 */
const fileReducerFunction =  combineReducers({
	_id,
	technicalMetadata,
	businessMetadata,
	stateInfo}
	);

const fileReducer = function(state, action) {
	switch(action.type) {
		//in case we are updating the action, we will just update whole state
		case API_UPDATE_FILE :
			return Object.assign({}, state, action.payload);
		default: 
			return fileReducerFunction(state,action);
	}
};

export default fileReducer;
