import { EMAIL_CONFIRM_SUCCESS, EMAIL_CONFIRM_FAILED, EMAIL_RESEND_FETCHING,
  EMAIL_RESEND_SUCCESS, EMAIL_RESEND_FAILED } from 'constants/actions'

const initialState = {
  emailConfirmationError: null,
  emailConfirmationSuccess: false,
  emailResendError: null,
  emailResendSuccess: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CONFIRM_SUCCESS:
      return {
        ...state,
        emailConfirmationError: null,
        emailConfirmationSuccess: true,
      }
    case EMAIL_CONFIRM_FAILED:
      return {
        ...state,
        emailConfirmationError: action.error,
        emailConfirmationSuccess: false,
      }
    case EMAIL_RESEND_FETCHING:
      return initialState
    case EMAIL_RESEND_SUCCESS:
      return {
        ...state,
        emailResendError: null,
        emailResendSuccess: true,
      }
    case EMAIL_RESEND_FAILED:
      return {
        ...state,
        emailResendError: action.error,
        emailResendSuccess: false,
      }
    default:
      return state
  }
}
