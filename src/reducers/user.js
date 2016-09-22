import store from 'store';
import { SIGNUP_LOGIN_SUCCESS, LOGOUT_SUCCESS, PROFILE_UPDATE_SUCCESS }
  from '../constants/actions';

const initialState = () => store.get('user') || {};

export default (state = initialState(), action) => {
  switch (action.type) {
    case SIGNUP_LOGIN_SUCCESS:
    case PROFILE_UPDATE_SUCCESS:
      return Object.assign({}, state, action.user);
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, initialState());
    default:
      return state;
  }
};
