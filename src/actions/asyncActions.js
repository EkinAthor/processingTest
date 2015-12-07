/**
 * asynchronous action that fetches the data from server and saves the data to server
 * Uses thunk middleware so action can return function instead of object
 */

import fetch from 'isomorphic-fetch';
import {requestChats,recieveChats,sampleAction} from './actions';
import {API_UPDATE_COLUMNS, API_UPDATE_MASKS, API_UPDATE_DISTINCT, API_INIT_STORE, API_UPDATE_FILE, API_UPDATE_FILES, API_UPDATE_NULLCOUNT, API_ADD_FILE, API_UPDATE_FREQ } from './asyncTypes';

//let baseUrl = 'http://localhost:8080/';
let baseUrl = location.origin+"/";

export function updateFile(payload) {
	return {
		type: API_UPDATE_FILE,
		payload: payload
	};
}

export function updateFiles(payload) {
	return {
		type: API_UPDATE_FILES,
		payload: payload
	};
}

/**
 * get chats from the server. Inform UI that you are fetching
 * 
 */
export function fetchChats() {
	return function(dispatch) {
		dispatch(requestChats());
		return fetch(baseUrl+'chat')
				.then(response => response.json())
				.then(json => dispatch(recieveChats(json)));
	};
}

export function initializeStore() {
	return function(dispatch) {
		return fetch(baseUrl+'store')
				.then(response => response.json())
				.then(json => dispatch(initStore(json)));
	};
}

export function initializeFiles() {
	return function(dispatch) {
		return fetch(baseUrl+'files')
				.then(response => response.json())
				.then(json => dispatch(updateFiles(json)));
	};
};

export function saveStore(store) {
	return function(dispatch) {
		return fetch(baseUrl+'store', {
			method: "post",
			headers: {
					        'Content-type': 'application/json'
					    },
			body: JSON.stringify(store)
		}).then(response=>console.log('store saved'));
	};
}

export function saveFile(file) {
	return function(dispatch) {
		return fetch(baseUrl+'file', {
			method: "post",
			headers: {
					        'Content-type': 'application/json'
					    },
			body: JSON.stringify(file)
		}).then(response=>console.log('file saved'));
	};
}

export function initStore(payload) {
	return {
		type: API_INIT_STORE,
		payload: payload
	};
}

//action for adding chat directly using thunk middleware
export function addChat(text) {
	let chatObj = {
					text: text,
					time: Date.now().toString()
				};
	return function(dispatch) {
		dispatch(sampleAction(chatObj));
		return fetch(baseUrl+'chat', 
				{
					method: "post",
					headers: {
					        'Content-type': 'application/json'
					    },
					body: JSON.stringify(chatObj)
				})
				.then(response => console.log('chat saved'))
				.catch(error => console.log(error));
	};
}

function logAction(text) {
	console.log('msg saved');
}


export function updateNullCount(gid, newCounts) {
	return {
		type: API_UPDATE_NULLCOUNT,
		payload: newCounts,
		gid: gid
	};
}

export function updateColumns(gid, newColumns) {
		return {
			type: API_UPDATE_COLUMNS,
			payload: newColumns,
			gid: gid
		};
}

export function updateDistinct(gid, newCounts) {
	return {
		type: API_UPDATE_DISTINCT,
		payload: newCounts,
		gid: gid
	};
}
export function updateFreq(gid, newCounts) {
	return {
		type: API_UPDATE_FREQ,
		payload: newCounts,
		gid: gid
	};
}
export function updateMasks(gid, newCounts) {
	return {
		type: API_UPDATE_MASKS,
		payload: newCounts,
		gid: gid
	};
}

//action for adding chat line through custom middleware
import { MIDAPI } from '../middleware/api';

export function addChatMiddleware(text) {
	return {
    [MIDAPI]: {
      method: 'post',
      beforeAction: sampleAction,
      afterAction: logAction,
      url: "chat",
      payload: {
					text: text,
					time: Date.now().toString()
				}
    }
  };
}

/*
export function updateFiles(files) {
	return {
		type: API_UPDATE_FILES,
		payload: files
	};
}
*/

export function addFile(file) {
	return {
		type: API_ADD_FILE,
		payload: file
	};
}