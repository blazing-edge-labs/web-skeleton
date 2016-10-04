import store from 'store';
import { PROFILE_UPDATE_SUCCESS } from '../constants/actions';
import { API_URL } from '../constants/application';
import createFormData from '../utils/createFormData';
import parseErrors from '../utils/parseErrors';
import fetch from '../utils/fetch';

const profileUpdateSuccess = user => ({
  type: PROFILE_UPDATE_SUCCESS,
  user,
});

export function profileGetFetch(userId) {
  return dispatch =>
    fetch(`${API_URL}/users/${userId}`).then((resp) => {
      store.set('user', resp);
      return dispatch(profileUpdateSuccess(resp));
    });
}

export function profileUpdateFetch(values, userId) {
  return dispatch =>
    fetch(`${API_URL}/users/${userId}`, {
      method: 'POST',
      body: createFormData(values),
    }).then((resp) => {
      store.set('user', resp);
      return dispatch(profileUpdateSuccess(resp));
    }).catch(err =>
      Promise.reject(parseErrors(err))
    );
}

export function changeEmailFetch(values) {
  return () =>
    fetch(`${API_URL}/changeEmail`, {
      method: 'POST',
      body: JSON.stringify(values),
    }).then(() => {
      const user = store.get('user');
      user.newEmail = values.get('newEmail');
      return store.set('user', user);
    }).catch(err =>
      Promise.reject(parseErrors(err))
    );
}

export function changePasswordFetch(values) {
  return () =>
    fetch(`${API_URL}/changePassword`, {
      method: 'POST',
      body: JSON.stringify(values),
    }).catch(err =>
      Promise.reject(parseErrors(err))
    );
}
