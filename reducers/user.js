import { SIGNUP_LOGIN_SUCCESS, EMAIL_CONFIRM_SUCCESS, PROFILE_UPDATE_SUCCESS }
  from '../constants/actions'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_LOGIN_SUCCESS:
    case EMAIL_CONFIRM_SUCCESS:
    case PROFILE_UPDATE_SUCCESS:
      return { ...state, ...action.user }
    default:
      return state
  }
}
