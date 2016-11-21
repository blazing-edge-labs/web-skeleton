import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import { LOGOUT_SUCCESS } from '../constants/actions';
import auth from './auth';
import user from './user';

const appReducer = combineReducers(fromJS({
  auth,
  form,
  user,
}));

const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === LOGOUT_SUCCESS) {
    newState = undefined;
  }

  return appReducer(newState, action);
};

export default rootReducer;
