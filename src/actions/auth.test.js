import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import store from 'store';
import { fromJS } from 'immutable';
import * as auth from './auth';
import * as parseErrors from '../utils/parseErrors';
import { SIGNUP_LOGIN_SUCCESS, LOGOUT_SUCCESS, EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_FAILED, EMAIL_RESEND_FETCHING, EMAIL_RESEND_SUCCESS,
  EMAIL_RESEND_FAILED } from '../constants/actions';
import { API_URL } from '../constants/application';

describe('auth action creators', () => {
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
  const mockStore = configureMockStore([ thunk ]);
  const mockDispatch = jest.fn();
  const expectedSignupLoginAction = {
    type: SIGNUP_LOGIN_SUCCESS,
    user,
  };
  const expectedLogoutAction = {
    type: LOGOUT_SUCCESS,
  };
  const expectedEmailConfirmAction = {
    type: EMAIL_CONFIRM_SUCCESS,
    user,
  };
  const expectedEmailResendFetchingAction = {
    type: EMAIL_RESEND_FETCHING,
  };
  const expectedEmailResendSuccessAction = {
    type: EMAIL_RESEND_SUCCESS,
  };

  it('should create an action for successful login or signup', () => {
    expect(auth.signupLoginSuccess(user)).toEqual(expectedSignupLoginAction);
  });

  it('should create an action for successful logout', () => {
    expect(auth.logoutSuccess()).toEqual(expectedLogoutAction);
  });

  it('should create an action for successfull email confirmation', () => {
    expect(auth.emailConfirmSuccess(user)).toEqual(expectedEmailConfirmAction);
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
    expect(auth.emailResendFetching())
      .toEqual(expectedEmailResendFetchingAction);
  });

  it('should create an action for successfull email resend', () => {
    expect(auth.emailResendSuccess()).toEqual(expectedEmailResendSuccessAction);
  });

  it('should create an anction for failed email resend', () => {
    const error = 'Resend failed';
    const expectedAction = {
      type: EMAIL_RESEND_FAILED,
      error,
    };

    expect(auth.emailResendFailed(error)).toEqual(expectedAction);
  });

  it('should make successsful authenticate fetch', () => {
    const values = fromJS({
      email: 'test@mail.com',
      password: 'Aa123456',
    });
    store.set = jest.fn();
    const cb = jest.fn();
    const resp = {
      token: 'this.is.token',
      user: user,
    };
    fetchMock.post(`${API_URL}/authenticate`, resp);

    return auth.authenticate(values, mockDispatch, cb).then(() => {
      expect(store.set.mock.calls[0])
        .toEqual(['token', `Bearer ${resp.token}`]);
      expect(store.set).toHaveBeenLastCalledWith('user', resp.user);
      expect(store.set).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith(expectedSignupLoginAction);
      expect(cb).toHaveBeenCalled();
    });
  });

  it('should make successsful signup fetch', () => {
    const values = fromJS({
      email: 'test@mail.com',
      password: 'Aa123456',
    });
    const cb = jest.fn();
    const resp = { message: 'User created' };
    const respAuth = {
      token: 'this.is.token',
      user: user,
    };
    fetchMock.post(`${API_URL}/users`, resp);
    fetchMock.post(`${API_URL}/authenticate`, respAuth);
    const reduxStore = mockStore(fromJS({ user: {} }));

    return reduxStore.dispatch(auth.signupFetch(values, cb)).then(() => {
      expect(fetchMock.lastCall()[0]).toEqual(`${API_URL}/authenticate`);
    });
  });

  it('should fail to make login fetch', () => {
    const values = fromJS({
      email: 'test@mail.com',
      password: 'Aa123456',
    });
    const resp = {
      error: {
        message: 'User already exists',
        status: 404,
      },
      message: 'User already exists',
    };
    fetchMock.post(`${API_URL}/users`, resp);
    const reduxStore = mockStore(fromJS({ user: {} }));
    spyOn(parseErrors, 'default');

    return reduxStore.dispatch(auth.signupFetch(values)).catch(() => {
      expect(parseErrors.default)
          .toHaveBeenCalledWith(new Error('User already exists'));
    });
  });

  it('should fail to make login fetch', () => {
    const values = fromJS({
      email: 'test@mail.com',
      password: 'Aa123456',
    });
    const cb = jest.fn();
    const resp = {
      error: {
        message: 'Wrong password',
        status: 404,
      },
      message: 'Wrong password',
    };
    fetchMock.post(`${API_URL}/authenticate`, resp);
    const reduxStore = mockStore(fromJS({ user: {} }));
    spyOn(parseErrors, 'default');

    return reduxStore.dispatch(auth.loginFetch(values)).catch(() => {
      expect(parseErrors.default)
          .toHaveBeenCalledWith(new Error('Wrong password'));
    });
  });

  it('should make call to logout action', () => {
    store.clear = jest.fn();
    const cb = jest.fn();
    const reduxStore = mockStore(fromJS({ user: {} }));
    reduxStore.dispatch(auth.logoutAction(cb));

    expect(store.clear).toHaveBeenCalled();
    expect(reduxStore.getActions()[0]).toEqual(expectedLogoutAction);
    expect(cb).toHaveBeenCalled();
  });

  it('should fail to make call to forgotPassword fetch', () => {
    const values = fromJS({
      email: 'test@mail.com',
    });
    const resp = {
      error: {
        message: 'Email doesn\'t exist',
        status: 404,
      },
      message: 'Email doesn\'t exist',
    };
    fetchMock.post(`${API_URL}/recoverPassword`, resp);
    const reduxStore = mockStore(fromJS({ auth: {} }));
    spyOn(parseErrors, 'default');

    return reduxStore.dispatch(auth.forgotPasswordFetch(values)).catch(() => {
      expect(parseErrors.default)
          .toHaveBeenCalledWith(new Error('Email doesn\'t exist'));
    });
  });

  it('should make successsful recoverPassword fetch', () => {
    const values = fromJS({
      oldPassword: 'Aa123456',
      newPassword: 'Bb123456',
    });
    const code = 'this.is.code';
    const cb = jest.fn();
    const resp = { message: 'Password changed.' };
    fetchMock.post(`${API_URL}/recoverPassword/${code}`, resp);
    const reduxStore = mockStore(fromJS({ auth: {} }));

    return reduxStore.dispatch(auth.recoverPasswordFetch(values, code, cb))
      .then(() => {
        expect(cb).toHaveBeenCalled();
      });
  });

  it('should fail to make call to recoverPassword fetch', () => {
    const values = fromJS({
      oldPassword: 'Aa123456',
      newPassword: 'Bb123456',
    });
    const code = 'this.is.code';
    const resp = {
      error: {
        message: 'Password doesn\'t exist',
        status: 404,
      },
      message: 'Password doesn\'t exist',
    };
    fetchMock.post(`${API_URL}/recoverPassword/${code}`, resp);
    const reduxStore = mockStore(fromJS({ auth: {} }));
    spyOn(parseErrors, 'default');

    return reduxStore.dispatch(auth.recoverPasswordFetch(values, code))
      .catch(() => {
        expect(parseErrors.default)
            .toHaveBeenCalledWith(new Error('Password doesn\'t exist'));
      });
  });

  it('should make successsful emailConfirm fetch', () => {
    const values = fromJS({
      token: 'this.is.token',
    });
    store.get = jest.fn(() => user);
    store.set = jest.fn();
    const cb = jest.fn();
    const resp = { email: 'new@mail.com' };
    fetchMock.post(`${API_URL}/emailConfirm`, resp);
    const reduxStore = mockStore(fromJS({ auth: {} }));


    return reduxStore.dispatch(auth.emailConfirmFetch(values, cb))
      .then(() => {
        expect(store.get).toHaveBeenCalledWith('user');
        expect(store.set).toHaveBeenCalledWith('user', {
          bio: null,
          confirmed: true,
          createdAt: '2016-10-06T14:55:40.708Z',
          email: 'new@mail.com',
          firstname: null,
          id: 1,
          lastname: null,
          resourceId: 1,
          updatedAt: '2016-10-06T14:55:40.722Z',
        });
        expect(reduxStore.getActions()[0]).toEqual(expectedEmailConfirmAction);
        expect(cb).toHaveBeenCalled();
      });
  });

  it('should fail to make call to emailConfirm fetch', () => {
    const values = fromJS({
      token: 'this.is.token',
    });
    const resp = {
      error: {
        message: 'Wrong code',
        status: 404,
      },
      message: 'Wrong code',
    };
    fetchMock.post(`${API_URL}/emailConfirm`, resp);
    const reduxStore = mockStore(fromJS({ auth: {} }));
    spyOn(parseErrors, 'default');

    return reduxStore.dispatch(auth.emailConfirmFetch(values))
      .catch(() => {
        expect(parseErrors.default)
            .toHaveBeenCalledWith(new Error('Wrong code'));
      });
  });

  it('should make successsful emailResend fetch', () => {
    const userId = 1;
    const resp = { message: 'Email sent again.' };
    fetchMock.post(`${API_URL}/users/${userId}/resendConfirmation`, resp);
    const reduxStore = mockStore(fromJS({ auth: {} }));

    return reduxStore.dispatch(auth.emailResendFetch(userId)).then(() => {
      expect(reduxStore.getActions()[0])
        .toEqual(expectedEmailResendFetchingAction);
      expect(reduxStore.getActions()[1])
        .toEqual(expectedEmailResendSuccessAction);
    });
  });

  it('should fail to make call to emailResend fetch', () => {
    const userId = 1;
    const resp = {
      error: {
        message: 'Resending failed',
        status: 404,
      },
      message: 'Resending failed',
    };
    fetchMock.post(`${API_URL}/users/${userId}/resendConfirmation`, resp);
    const reduxStore = mockStore(fromJS({ auth: {} }));

    return reduxStore.dispatch(auth.emailResendFetch(userId)).then(() => {
      expect(reduxStore.getActions()[0])
        .toEqual(expectedEmailResendFetchingAction);
      expect(reduxStore.getActions()[1]).toEqual({
        type: EMAIL_RESEND_FAILED,
        error: 'Resending failed',
      });
    });
  });
});
