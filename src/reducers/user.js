import store from 'store';
import { fromJS } from 'immutable';
import { SIGNUP_LOGIN_SUCCESS, LOGOUT_SUCCESS, NEW_EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_SUCCESS, PROFILE_UPDATE_SUCCESS } from '../constants/actions';

const initialState = () => fromJS(store.get('user')) || fromJS({});

export default (state = initialState(), action) => {
  switch (action.type) {
    case SIGNUP_LOGIN_SUCCESS:
    case EMAIL_CONFIRM_SUCCESS:
    case PROFILE_UPDATE_SUCCESS:
      return state.merge(fromJS(action.user));
    case NEW_EMAIL_CONFIRM_SUCCESS:
      return state.merge(fromJS(action.user)).delete(action.deleteKey);
    case LOGOUT_SUCCESS:
      return initialState();
    default:
      return state;
  }
};
