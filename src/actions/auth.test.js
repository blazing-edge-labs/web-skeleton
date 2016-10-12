import * as auth from './auth';
import { SIGNUP_LOGIN_SUCCESS, LOGOUT_SUCCESS, NEW_EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_SUCCESS, EMAIL_CONFIRM_FAILED } from '../constants/actions';

jest.mock('../utils/fetch');
import fetch from '../utils/fetch';

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

describe('auth action creators', () => {
  it('should create an action for successful login or signup', () => {
    const expectedAction = {
      type: SIGNUP_LOGIN_SUCCESS,
      user,
    };

    expect(auth.signupLoginSuccess(user)).toEqual(expectedAction);
  });

  it('should create an action for successful logout', () => {
    const expectedAction = {
      type: LOGOUT_SUCCESS,
    };

    expect(auth.logoutSuccess()).toEqual(expectedAction);
  });

  it('should create an action for successful new email confirmation', () => {
    const deleteKey = 'newEmail';
    const expectedAction = {
      type: NEW_EMAIL_CONFIRM_SUCCESS,
      user,
      deleteKey,
    };

    expect(auth.newEmailConfirmSuccess(user, deleteKey))
      .toEqual(expectedAction);
  });

  it('should create an action for successfull email confirmation', () => {
    const expectedAction = {
      type: EMAIL_CONFIRM_SUCCESS,
      user,
    };

    expect(auth.emailConfirmSuccess(user)).toEqual(expectedAction);
  });

  it('should create an anction for failed email confirmation', () => {
    const error = 'Confirmation failed';
    const expectedAction = {
      type: EMAIL_CONFIRM_FAILED,
      error,
    };

    expect(auth.emailConfirmFailed(error)).toEqual(expectedAction);
  });

  it('should authenticate successfully', () => {
    console.log(auth.authenticate({}, () => {}, {}).then);
    return auth.authenticate({}, () => {}, {}).then(() => {
      console.log('hey');
    });
  });
});
