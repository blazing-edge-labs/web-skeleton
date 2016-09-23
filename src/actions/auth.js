import store from 'store';
import { SIGNUP_LOGIN_SUCCESS, LOGOUT_SUCCESS, EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_FAILED } from '../constants/actions';
import { API_URL } from '../constants/application';
import parseErrors from '../utils/parseErrors';
import fetch from '../utils/fetch';

function signupLoginSuccess(user) {
  return {
    type: SIGNUP_LOGIN_SUCCESS,
    user,
  };
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

function emailConfirmSuccess(user) {
  return {
    type: EMAIL_CONFIRM_SUCCESS,
    user,
  };
}

function emailConfirmFailed(error) {
  return {
    type: EMAIL_CONFIRM_FAILED,
    error,
  };
}

function authenticate(values, dispatch, router) {
  return fetch(`${API_URL}/authenticate`, {
    method: 'POST',
    body: JSON.stringify(values),
  }).then((resp) => {
    store.set('token', `Bearer ${resp.token}`);
    store.set('user', resp.user);
    dispatch(signupLoginSuccess(resp.user));
    return router.push('/');
  });
}

export function signupFetch(values, router) {
  return dispatch =>
    fetch(`${API_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(values),
    }).then(() =>
      authenticate(values, dispatch, router)
    ).catch(err =>
      Promise.reject(parseErrors(err))
    );
}

export function loginFetch(values, router) {
  return dispatch =>
    authenticate(values, dispatch, router).catch(err =>
      Promise.reject(parseErrors(err))
    );
}

export function logoutAction(router) {
  return (dispatch) => {
    store.clear();
    dispatch(logoutSuccess());
    return router.push('/login');
  };
}

export function forgotPasswordFetch(values) {
  return () =>
    fetch(`${API_URL}/resetPassword`, {
      method: 'POST',
      body: JSON.stringify(values),
    }).catch(err =>
      Promise.reject(parseErrors(err))
    );
}

export function changePasswordFetch(values, callback) {
  return () =>
    fetch(`${API_URL}/changePassword`, {
      method: 'POST',
      body: JSON.stringify(values),
    }).then(() => {
      if (typeof callback === 'function') callback();
    }).catch(err =>
      Promise.reject(parseErrors(err))
    );
}

export function emailConfirmFetch(values, callback) {
  return dispatch =>
    fetch(`${API_URL}/emailConfirm`, {
      method: 'POST',
      body: JSON.stringify(values),
    }).then(() => {
      const user = store.get('user');
      user.confirmed = true;
      store.set('user', user);
      dispatch(emailConfirmSuccess(user));
      if (typeof callback === 'function') callback();
    }).catch(err =>
      dispatch(emailConfirmFailed(err.message))
    );
}

export function emailResendFetch(values) {
  return () =>
    fetch(`${API_URL}/resendConfirmation`, {
      method: 'POST',
      body: JSON.stringify(values),
    });
}
