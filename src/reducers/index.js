import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';

const rootReducer = combineReducers({
  auth,
  form,
  user,
});

export default rootReducer;
