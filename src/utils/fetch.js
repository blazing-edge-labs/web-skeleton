import 'whatwg-fetch';
import store from 'store';
import { browserHistory } from 'react-router';

const parseJSON = res => res.json();

const checkStatus = (res) => {
  if (!res.error) return res;

  const error = new Error(res.message);
  error.response = res;
  return Promise.reject(error);
};

export default function (url, options) {
  return fetch(url, Object.assign({}, {
    headers: {
      Authorization: store.get('token') || '',
      'Content-Type': 'application/json',
    } }, options))
    .then(parseJSON)
    .then(checkStatus)
    .catch((err) => {
      const { response } = err;

      switch (response.error.status) {
        case 401:
          return browserHistory.push('/login');
        default:
          return Promise.reject(err);
      }
    });
}
