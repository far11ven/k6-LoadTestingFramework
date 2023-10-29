import http from 'k6/http';
import init from './init.js';
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

// get config details
const config =  init.getActiveConfig().CONTENT
const baseUrl = config.baseUrl;

// returns an authentication token
export function login( userName, password) {

	let body = {
		"userName": userName, 
		"password": password,
		"rememberMe": true
	}

	console.log(JSON.stringify(body.userName))

	let signInResponse = http.get(`${baseUrl}/basic-auth/${userName}/${password}`, {
		headers: {
			'Content-Type': 'application/json'
		},
	})

	if(signInResponse.status !== 200){
		//console.log("ERROR:", signInResponse)
	}

	expect(signInResponse.status, `Sign in response status ${signInResponse.status}`).to.eq(200);

	return signInResponse;
}
