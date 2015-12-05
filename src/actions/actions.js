/**
 * File contains actions. Every simple action is a payload carrying type and some data
 * Async actions are in separate file
 */
import { SAMPLE_ACTION, REQUEST_CHAT, RECIEVE_CHATS, SELECT_FIELD, SELECT_FILE } from "./types";

/**
 * Sample action containing data(any)
 * in our case this sample action is called to add text to the front-end
 * 
 */
export function sampleAction(data) {
	return {
		type: SAMPLE_ACTION,
		chatObj: data
	};
}

/**
 * request/recieve actions are called from async function when api is called
 * 
 */
export function requestChats() {
	return {
		type: REQUEST_CHAT
	};
}

export function recieveChats(chats) {
	return {
		type: RECIEVE_CHATS,
		chats: chats
	};
}

export function selectField(gid,eid) {
	return {
		type: SELECT_FIELD,
		gid: gid,
		eid: eid
	};
}

export function selectFile(gid) {
	return {
		type: SELECT_FILE,
		gid: gid
	};
}