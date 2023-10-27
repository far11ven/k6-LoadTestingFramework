import http from 'k6/http';
import init from '../common/init.js';
import { login } from '../common/client.js';

// get config details
const config = init.getActiveConfig().CONTENT

const baseUrl = config.baseUrl;
const userInfo = config.user_info

// ** Init block starts ** //
// k6 options is part of init block
export let options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '1m', target: 20 },
    { duration: '1m', target: 0 } 
  ],
};
// ** Init block ends ** //

// set-up code
export function setup() {
  const res = http.get(`${baseUrl}/get`);
  return { data: res.json() };
}

// actual tests code (run by VUs)
export default function testSuite() {

  login( userInfo.email, userInfo.password) 
  let data = { name: 'Bert' };

  // Using a JSON string as body
  let res = http.post(`${baseUrl}/post`, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });

  //log the name from api response
  console.log(res.json().json.name); // Bert

}

// teardown code
export function teardown(data) {
  //data from setUp step can be used to teardown
  console.log(JSON.stringify(data));
}