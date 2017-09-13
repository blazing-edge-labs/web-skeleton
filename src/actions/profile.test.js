import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as profile from './profile';
import { PROFILE_UPDATE_SUCCESS } from '../constants/actions';
import { API_URL } from '../constants/application';

describe('profile action creators', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  const user = {
    createdAt: '2016-10-06T14:55:40.708Z',
    email: 'test@email.com',
    id: 1,
    updatedAt: '2016-10-06T14:55:40.722Z',
  };
  const userId = 1;
  const mockStore = configureMockStore([thunk]);
  const expectedAction = {
    type: PROFILE_UPDATE_SUCCESS,
    user,
  };

  it('should create an action for successful profile update', () => {
    expect(profile.profileUpdateSuccess(user)).toEqual(expectedAction);
  });

  it('should make successful profile get fetch', () => {
    const data = { ...user };
    fetchMock.get(`${API_URL}/self`, { data });
    const reduxStore = mockStore({ user: {} });

    return reduxStore.dispatch(profile.profileGetFetch(userId)).then(() => {
      expect(reduxStore.getActions()[0]).toEqual(expectedAction);
    });
  });

  it('should make successful profileUpdate fetch', () => {
    const values = {
      firstname: 'John',
      lastname: 'Doe',
    };
    const data = { ...user };
    fetchMock.put(`${API_URL}/self`, { data });
    const reduxStore = mockStore({ user: {} });

    return reduxStore.dispatch(profile.profileUpdateFetch(values))
      .then(() => {
        expect(reduxStore.getActions()[0]).toEqual(expectedAction);
      });
  });

  it('should fail to make profileUpdate fetch', () => {
    const values = {
      firstname: 'John',
      lastname: 'Doe',
    };
    const error = {
      message: 'Something went wrong',
      status: 404,
    };
    fetchMock.put(`${API_URL}/self`, { error });
    const reduxStore = mockStore({ user: {} });

    return reduxStore.dispatch(profile.profileUpdateFetch(values))
    .then(fail, (reason) => {
      expect(reason).toEqual(new Error('Something went wrong'));
    });
  });

  it('should fail to make changePassword fetch', () => {
    const values = {
      oldPassword: 'Aa123456',
      newPassword: 'Bb123456',
    };
    const error = {
      message: 'Wrong password',
      status: 404,
    };
    fetchMock.put(`${API_URL}/self/password`, { error });
    const reduxStore = mockStore({ user: {} });

    return reduxStore.dispatch(profile.changePasswordFetch(values, userId))
    .then(fail, (reason) => {
      expect(reason).toEqual(new Error('Wrong password'));
    });
  });
});
