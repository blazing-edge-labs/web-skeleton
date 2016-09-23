import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutablejs';
import auth from './auth';
import user from './user';

const rootReducer = combineReducers({
  auth,
  form,
  user,
});

export default rootReducer;
