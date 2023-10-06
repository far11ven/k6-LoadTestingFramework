import http from 'k6/http';

export let options = {
  stages: [
    { duration: '10m', target: 50 },
    { duration: '10m', target: 100 },
    { duration: '10m', target: 0 } 
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
