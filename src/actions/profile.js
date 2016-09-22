import store from 'store';
import { SubmissionError } from 'redux-form';
import { PROFILE_UPDATE_SUCCESS } from '../constants/actions';
import { API_URL } from '../constants/application';
import fetch from '../utils/fetch';

function profileUpdateSuccess(user) {
  return {
    type: PROFILE_UPDATE_SUCCESS,
    user,
  };
}

export default function profileUpdateFetch(values, userId) {
  return dispatch =>
    fetch(`${API_URL}/users/${userId}`, {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((resp) => {
      store.set('user', resp);
      return dispatch(profileUpdateSuccess(resp));
    }).catch(err =>
      Promise.reject(new SubmissionError({ _error: err.message }))
    );
}
