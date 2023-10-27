import http from 'k6/http';
import init from './init.js';

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
		console.log("ERROR:", signInResponse)
	}

	return signInResponse;
}
