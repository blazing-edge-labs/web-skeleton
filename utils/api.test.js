import store from 'store';
import { Router } from '../routes';
import createFormData from './createFormData';
import api from './api';

const { API_URL } = process.env;

function fakeResponseWithBody(body, response = {}) {
  return Promise.resolve({
    ...response,
    json: () => Promise.resolve(body),
  });
}

describe('fetchApi util', () => {
  afterEach(() => {
    delete global.fetch;
  });

  const storeGet = store.get;
  store.get = jest.fn(() => 'Bearer this.is.token');

  afterAll(() => {
    store.get = storeGet;
  });

  it('Call with json content', () => {
    const body = {
      bio: 'This is my bio.',
      firstname: 'John',
      lastname: 'Doe',
    };

    global.fetch = jest.fn(() => fakeResponseWithBody({}));

    const check = method =>
      expect(global.fetch).toHaveBeenLastCalledWith(`${API_URL}/test`, {
        method,
        body: '{"bio":"This is my bio.","firstname":"John","lastname":"Doe"}',
        headers: {
          Authorization: 'Bearer this.is.token',
          'Content-Type': 'application/json',
        },
      });

    api.fetch('/test', { method: 'POST', body });
    check('POST');
    api.post('/test', body);
    check('POST');

    api.fetch('/test', { method: 'PUT', body });
    check('PUT');
    api.put('/test', body);
    check('PUT');

    api.fetch('/test', { method: 'DELETE', body });
    check('DELETE');
    api.delete('/test', body);
    check('DELETE');
  });

  it('Call with FormData', () => {
    const formData = createFormData({
      bio: 'This is my bio.',
      firstname: 'John',
      lastname: 'Doe',
    });

    global.fetch = jest.fn(() => fakeResponseWithBody({}));

    const check = () =>
      expect(global.fetch).toHaveBeenLastCalledWith(`${API_URL}/test`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer this.is.token',
        },
      });

    api.fetch('test', { method: 'POST', body: formData });
    check();

    api.post('test', formData);
    check();
  });

  it('api.fetch API data', () => {
    const data = { test: 123 };
    global.fetch = jest.fn(() => fakeResponseWithBody({ data }));

    const expectedUrl = `${API_URL}/self?flag=true&s=Hello%20world%21`;

    const check = () =>
      expect(global.fetch).toHaveBeenLastCalledWith(expectedUrl, {
        headers: {
          Authorization: 'Bearer this.is.token',
        },
      });

    const p1 = api.fetch('/self', { query: { flag: true, s: 'Hello world!' } })
    .then((fetchedData) => {
      expect(fetchedData).toEqual(data);
    });
    check();

    const p2 = api.get('/self?flag=true', { s: 'Hello world!' })
    .then((fetchedData) => {
      expect(fetchedData).toEqual(data);
    });
    check();

    const p3 = api.get('/self', { flag: true, s: 'Hello world!' })
    .then((fetchedData) => {
      expect(fetchedData).toEqual(data);
    });
    check();

    return Promise.all([p1, p2, p3]);
  });

  it('api.fetch API with 401 error', () => {
    global.fetch = jest.fn(() => fakeResponseWithBody({ error: 'foo', status: 401 }));
    Router.pushRoute = jest.fn();

    return api.fetch('/self', {}).then(fail, (reason) => {
      expect(reason.status).toEqual(401);
      expect(Router.pushRoute).toHaveBeenCalledWith('/login');
    });
  });

  it('api.fetch with no response', () => {
    const error = { status: 404 };
    global.fetch = jest.fn(() => Promise.reject(error));

    return api.fetch('/self', {}).then(fail, (reason) => {
      expect(reason).toEqual(error);
    });
  });
});
