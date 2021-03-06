import { reducer as form } from 'redux-form'
import { combineReducers } from 'redux'
import { LOGOUT_SUCCESS } from 'constants/actions'
import auth from 'reducers/auth'
import user from 'reducers/user'

const appReducer = combineReducers({
  auth,
  form,
  user,
})

const rootReducer = (state, action) => {
  let newState = state
  if (action.type === LOGOUT_SUCCESS) {
    newState = undefined
  }

  return appReducer(newState, action)
}

export default rootReducer
