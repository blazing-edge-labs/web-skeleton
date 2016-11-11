import * as auth from './auth';
import { SIGNUP_LOGIN_SUCCESS, LOGOUT_SUCCESS, EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_FAILED, EMAIL_RESEND_FETCHING, EMAIL_RESEND_SUCCESS,
  EMAIL_RESEND_FAILED } from '../constants/actions';

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

  it('should create an action for email resend fetching', () => {
    const expectedAction = {
      type: EMAIL_RESEND_FETCHING,
    };

    expect(auth.emailResendFetching()).toEqual(expectedAction);
  });

  it('should create an action for successfull email resend', () => {
    const expectedAction = {
      type: EMAIL_RESEND_SUCCESS,
    };

    expect(auth.emailResendSuccess()).toEqual(expectedAction);
  });

  it('should create an anction for failed email resend', () => {
    const error = 'Resend failed';
    const expectedAction = {
      type: EMAIL_RESEND_FAILED,
      error,
    };

    expect(auth.emailResendFailed(error)).toEqual(expectedAction);
  });
});
