import store from 'store';
import { PROFILE_UPDATE_SUCCESS } from '../constants/actions';
import { API_URL } from '../constants/application';
import parseErrors from '../utils/parseErrors';
import fetch from '../utils/fetch';

function profileUpdateSuccess(user) {
  return {
    type: PROFILE_UPDATE_SUCCESS,
    user,
  };
}

export function profileUpdateFetch(values, userId) {
  return dispatch =>
    fetch(`${API_URL}/users/${userId}`, {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((resp) => {
      store.set('user', resp);
      return dispatch(profileUpdateSuccess(resp));
    }).catch(err =>
      Promise.reject(parseErrors(err))
    );
}


export function changeEmailFetch(values) {
  return dispatch =>
    fetch(`${API_URL}/changeEmail`, {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((resp) => {
      store.set('user', resp);
      return dispatch(changeEmailSuccess(resp));
    }).catch(err =>
      Promise.reject(parseErrors(err))
    );
}
