import http from 'k6/http';

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
  const res = http.get('https://httpbin.test.k6.io/get');
  return { data: res.json() };
}

// actual tests code (run by VUs)
export default function testSuite(data) {
  console.log(JSON.stringify(data));
}

// teardown code
export function teardown(data) {
  console.log(JSON.stringify(data));
}