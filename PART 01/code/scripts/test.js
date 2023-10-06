import http from 'k6/http';

export let options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '1m', target: 20 },
    { duration: '1m', target: 0 } 
  ],
};

export function setup() {
  const res = http.get('https://httpbin.test.k6.io/get');
  return { data: res.json() };
}

export function teardown(data) {
  console.log(JSON.stringify(data));
}

export default function (data) {
  console.log(JSON.stringify(data));
}
