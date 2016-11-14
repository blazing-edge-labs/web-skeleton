import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import store from 'store';
import { fromJS } from 'immutable';
import * as profile from './profile';
import * as parseErrors from '../utils/parseErrors';
import * as createFormData from '../utils/createFormData';
import { PROFILE_UPDATE_SUCCESS } from '../constants/actions';
import { API_URL } from '../constants/application';

describe('profile action creators', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  const user = {
    bio: null,
    confirmed: false,
    createdAt: '2016-10-06T14:55:40.708Z',
    email: 'test@email.com',
    firstname: null,
    id: 1,
    lastname: null,
    resourceId: 1,
    updatedAt: '2016-10-06T14:55:40.722Z',
  };
  const userId = 1;
  const mockStore = configureMockStore([ thunk ]);
  const expectedAction = {
    type: PROFILE_UPDATE_SUCCESS,
    user,
  };

  it('should create an action for successful profile update', () => {
    expect(profile.profileUpdateSuccess(user)).toEqual(expectedAction);
  });

  it('should make successful profile get fetch', () => {
    const resp = { ...user };
    store.set = jest.fn();
    fetchMock.get(`${API_URL}/users/${userId}`, resp);
    const reduxStore = mockStore(fromJS({ user: {} }));

    return reduxStore.dispatch(profile.profileGetFetch(userId)).then(() => {
      expect(store.set).toHaveBeenCalledWith('user', resp);
      expect(reduxStore.getActions()[0]).toEqual(expectedAction);
    });
  });

  it('should make successful profileUpdate fetch', () => {
    const values = fromJS({
      firstname: 'John',
      lastname: 'Doe',
    });
    const resp = { ...user };
    store.set = jest.fn();
    fetchMock.post(`${API_URL}/users/${userId}`, resp);
    const reduxStore = mockStore(fromJS({ user: {} }));
    spyOn(createFormData, 'default');

    return reduxStore.dispatch(profile.profileUpdateFetch(values, userId))
      .then(() => {
        expect(createFormData.default).toHaveBeenCalledWith(values);
        expect(store.set).toHaveBeenCalledWith('user', resp);
        expect(reduxStore.getActions()[0]).toEqual(expectedAction);
      });
  });

  it('should fail to make profileUpdate fetch', () => {
    const values = fromJS({
      firstname: 'John',
      lastname: 'Doe',
    });
    const resp = {
      error: {
        message: 'Something went wrong',
        status: 404,
      },
      message: 'Something went wrong',
    };
    fetchMock.post(`${API_URL}/users/${userId}`, resp);
    const reduxStore = mockStore(fromJS({ user: {} }));
    spyOn(createFormData, 'default');
    spyOn(parseErrors, 'default');

    return reduxStore.dispatch(profile.profileUpdateFetch(values, userId))
      .catch(() => {
        expect(createFormData.default).toHaveBeenCalledWith(values);
        expect(parseErrors.default)
          .toHaveBeenCalledWith(new Error('Something went wrong'));
      });
  });

  it('should fail to make changeEmail fetch', () => {
    const values = fromJS({
      email: 'test@mail.com',
      password: 'Aa123456',
    });
    const resp = {
      error: {
        message: 'Email not found',
        status: 404,
      },
      message: 'Email not found',
    };
    fetchMock.post(`${API_URL}/users/${userId}/changeEmail`, resp);
    const reduxStore = mockStore(fromJS({ user: {} }));
    spyOn(parseErrors, 'default');

    return reduxStore.dispatch(profile.changeEmailFetch(values, userId))
      .catch(() => {
        expect(parseErrors.default)
          .toHaveBeenCalledWith(new Error('Email not found'));
      });
  });

  it('should fail to make changePassword fetch', () => {
    const values = fromJS({
      oldPassword: 'Aa123456',
      newPassword: 'Bb123456',
    });
    const resp = {
      error: {
        message: 'Wrong password',
        status: 404,
      },
      message: 'Wrong password',
    };
    fetchMock.post(`${API_URL}/users/${userId}/changePassword`, resp);
    const reduxStore = mockStore(fromJS({ user: {} }));
    spyOn(parseErrors, 'default');

    return reduxStore.dispatch(profile.changePasswordFetch(values, userId))
      .catch(() => {
        expect(parseErrors.default)
          .toHaveBeenCalledWith(new Error('Wrong password'));
      });
  });
});
