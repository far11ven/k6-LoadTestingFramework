import http from 'k6/http';
import init from '../common/init.js';
import { login } from '../common/client.js';

import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import { Trend } from 'k6/metrics';

// custom metrics
let fileUploadStartTime;
let fileUploadEndTime;

const fileUploadTime = new Trend('file_upload_time', true)

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

// actual test code (run by VUs)
export default function testSuite() {

  describe('Login', () => {
    login(userInfo.email, userInfo.password);
  })

  describe('POST request', () => {
    let data = { name: "Bert" };
  
    // Using a JSON string as body
    let res = http.post(`${baseUrl}/post`, JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });

    expect(res.status).to.eq(200)
    expect(res.json().json.name).to.have.string('Bert')
  })

  describe('file upload', () => {
    //file upload
    let newFile = init.getARandomFile();

    // requestBody for fileUpload
    const requestBody = {
      file: http.file(newFile.file, newFile.name),
    };

    fileUploadStartTime = new Date().getTime() // file upload start time

    const fileUploadResponse = http.post(`${baseUrl}/upload`,
      requestBody
    )
    fileUploadEndTime = new Date().getTime() // file upload end time

    fileUploadTime.add(fileUploadEndTime - fileUploadStartTime)
    
    expect(fileUploadResponse.status).to.not.eq(200)
  })
}

// teardown code
export function teardown(data) {
  //data from setUp step can be used to teardown
  console.log(JSON.stringify(data));
}