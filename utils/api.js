import 'whatwg-fetch';
import store from 'store';
import { browserHistory } from 'react-router';
import { API_URL } from '../constants/application';

const encodeComponent = str =>
  encodeURIComponent(str)
  .replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

export const buildQuery = params =>
  Object.keys(params)
  .map(key => `${encodeComponent(key)}=${encodeComponent(params[key])}`)
  .join('&');


const getApiUrl = (path, query) => {
  let queryPrefix = '';
  let queryStr = '';

  if (query) {
    queryStr = buildQuery(query);
  }

  if (queryStr && !/[&?]$/.test(path)) {
    queryPrefix = !/\?/.test(path) ? '?' : '&';
  }

  const fixedPath = (path[0] === '/') ? path.slice(1) : path;

  return `${API_URL}/${fixedPath}${queryPrefix}${queryStr}`;
};

const getOptions = (options) => {
  const defaultHeaders = {
    Authorization: store.get('token') || '',
  };

  let { body } = options;

  const isJSON = body != null
    && typeof body === 'object'
    && !(body instanceof FormData);

  if (isJSON) {
    defaultHeaders['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }

  return {
    ...options,
    body,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
};

const jsonParser = response =>
  response.json()
  .then(body => ({ response, body }));


const handler = ({ response, body = {} }) => {
  if (body.error) {
    throw new Error(body.error);
  }

  if (response.status < 200 || response.status >= 300) {
    const error = new Error(response.statusText);
    error.status = response.status;
    throw error;
  }

  return body.data;
};

const handle401 = (error) => {
  if (error && error.status === 401) {
    browserHistory.push('/login');
  }
  throw error;
};

function fetchApi(path, options = {}) {
  const { query, ...opts } = options;

  return fetch(getApiUrl(path, query), getOptions(opts))
    .then(jsonParser)
    .then(handler)
    .catch(handle401);
}

const getApi = (path, query, options) =>
  fetchApi(path, { query, ...options });

const fetchWithBody = method => (path, body, options) =>
  fetchApi(path, { method, body, ...options });

export default {
  fetch: fetchApi,
  get: getApi,
  post: fetchWithBody('POST'),
  put: fetchWithBody('PUT'),
  delete: fetchWithBody('DELETE'),
};
