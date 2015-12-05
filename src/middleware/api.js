/**
 * SAMPLE middleware. 
 * For every action that has MIDAPI configuration, do the fetch
 */

import fetch from 'isomorphic-fetch';

const API_ROOT = 'http://localhost:9999';

export const MIDAPI = Symbol('middleware api');


/**
 * very basic implementation. It gets url, beforeAction and afterAction attributes and returns actions when needed.
 */

export default store => next => action => {
	const apiCall = action[MIDAPI];
	//check if my action is api call and if not, pass through this middleware
	if(typeof apiCall === 'undefined') {
		return next(action);
	}
	next(apiCall.beforeAction(apiCall.payload));
	let payload = apiCall.payload || {};
	payload = JSON.stringify(payload);
	fetch(API_ROOT+"/"+apiCall.url, {
		method: apiCall.method || "get",
		body: payload,
		headers: {
					        'Content-type': 'application/json'
					    }
	}).then(response => {
		//next(apiCall.afterAction(response));
	});


};