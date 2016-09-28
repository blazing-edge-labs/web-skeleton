import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import auth from './auth';
import user from './user';

const rootReducer = combineReducers(fromJS({
  auth,
  form,
  user,
}));

export default rootReducer;
