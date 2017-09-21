import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import store from 'store';
import * as auth from './auth';
import { SIGNUP_LOGIN_SUCCESS, LOGOUT_SUCCESS, EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_FAILED, EMAIL_RESEND_FETCHING, EMAIL_RESEND_SUCCESS,
  EMAIL_RESEND_FAILED } from '../constants/actions';
import { API_URL } from '../constants/application';

describe('auth action creators', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  const user = {
    createdAt: '2016-10-06T14:55:40.708Z',
    email: 'test@email.com',
    id: 1,
    updatedAt: '2016-10-06T14:55:40.722Z',
  };
  const mockStore = configureMockStore([thunk]);
  const mockDispatch = jest.fn(z => z);
  const expectedSignupLoginAction = {
    type: SIGNUP_LOGIN_SUCCESS,
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
    expect(auth.signupLoginSuccess()).toEqual(expectedSignupLoginAction);
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
    const values = {
      email: 'test@mail.com',
      password: 'Aa123456',
    };
    store.set = jest.fn();
    const data = {
      token: 'this.is.token',
    };
    fetchMock.post(`${API_URL}/auth`, { data });

    return auth.authenticate(values)(mockDispatch).then(() => {
      expect(store.set.mock.calls[0])
        .toEqual(['token', `Bearer ${data.token}`]);
      expect(store.set).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(expectedSignupLoginAction);
    });
  });

  it('should make successsful signup fetch', () => {
    const values = {
      email: 'test@mail.com',
      password: 'Aa123456',
    };
    const data = { message: 'User created' };
    const authData = {
      token: 'this.is.token',
      user,
    };
    fetchMock.post(`${API_URL}/register`, { data });
    fetchMock.post(`${API_URL}/auth`, { data: authData });
    const reduxStore = mockStore({ user: {} });

    return reduxStore.dispatch(auth.signupFetch(values)).then(() => {
      expect(fetchMock.lastCall()[0]).toEqual(`${API_URL}/auth`);
    });
  });

  it('should fail to make login fetch', () => {
    const values = {
      email: 'test@mail.com',
      password: 'Aa123456',
    };
    const error = {
      message: 'User already exists',
      status: 404,
    };
    fetchMock.post(`${API_URL}/register`, { error });
    const reduxStore = mockStore({ user: {} });

    return reduxStore.dispatch(auth.signupFetch(values))
    .then(fail, (reason) => {
      expect(reason).toEqual(new Error('User already exists'));
    });
  });

  it('should fail to make login fetch', () => {
    const values = {
      email: 'test@mail.com',
      password: 'Aa123456',
    };
    const error = {
      message: 'Wrong password',
      status: 404,
    };
    fetchMock.post(`${API_URL}/auth`, { error });
    const reduxStore = mockStore({ user: {} });

    return reduxStore.dispatch(auth.loginFetch(values))
    .then(fail, (reason) => {
      expect(reason).toEqual(new Error('Wrong password'));
    });
  });

  it('should make call to logout action', () => {
    store.clear = jest.fn();
    const reduxStore = mockStore({ user: {} });
    reduxStore.dispatch(auth.logoutAction());

    expect(store.clear).toHaveBeenCalled();
    expect(reduxStore.getActions()[0]).toEqual(expectedLogoutAction);
  });

  it('should fail to make call to forgotPassword fetch', () => {
    const error = {
      message: 'Email doesn\'t exist',
      status: 404,
    };

    fetchMock.post(`${API_URL}/recoverPassword`, { error });

    return mockStore({}).dispatch(auth.forgotPasswordFetch({}))
    .then(fail, (reason) => {
      expect(reason).toEqual(new Error('Email doesn\'t exist'));
    });
  });

  it('should make successsful recoverPassword fetch', () => {
    const values = {
      oldPassword: 'Aa123456',
      newPassword: 'Bb123456',
    };
    const code = 'this.is.code';
    const data = { message: 'Password changed.' };
    fetchMock.post(`${API_URL}/changePassword`, { data });
    const reduxStore = mockStore({ auth: {} });

    return reduxStore.dispatch(auth.recoverPasswordFetch(values, code));
  });

  it('should fail to make call to recoverPassword fetch', () => {
    const values = {
      oldPassword: 'Aa123456',
      newPassword: 'Bb123456',
    };
    const code = 'this.is.code';
    const error = {
      message: 'Password doesn\'t exist',
      status: 404,
    };
    fetchMock.post(`${API_URL}/changePassword`, { error });
    const reduxStore = mockStore({ auth: {} });

    return reduxStore.dispatch(auth.recoverPasswordFetch(values, code))
    .then(fail, (reason) => {
      expect(reason).toEqual(new Error('Password doesn\'t exist'));
    });
  });
});
