import cookies from 'utils/cookies'
import { SIGNUP_LOGIN_SUCCESS, LOGOUT_SUCCESS, EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_FAILED, EMAIL_RESEND_FETCHING, EMAIL_RESEND_SUCCESS,
  EMAIL_RESEND_FAILED } from 'constants/actions'
import api from 'utils/api'

export const signupLoginSuccess = () => ({
  type: SIGNUP_LOGIN_SUCCESS,
})

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
})

export const emailConfirmSuccess = user => ({
  type: EMAIL_CONFIRM_SUCCESS,
  user,
})

export const emailConfirmFailed = error => ({
  type: EMAIL_CONFIRM_FAILED,
  error,
})

export const emailResendFetching = () => ({
  type: EMAIL_RESEND_FETCHING,
})

export const emailResendSuccess = () => ({
  type: EMAIL_RESEND_SUCCESS,
})

export const emailResendFailed = error => ({
  type: EMAIL_RESEND_FAILED,
  error,
})

export const authenticate = values =>
  (dispatch) => {
    return api.post('auth', values)
    .then((data) => {
      cookies.set('token', data.token, { path: '/', secure: true })
      dispatch(signupLoginSuccess())
    })
  }

export const signupFetch = values =>
  (dispatch) => {
    return api.post('register', values)
    .then(() => {
      return dispatch(authenticate(values))
    })
  }

export const loginFetch = authenticate

export const logoutAction = () =>
  (dispatch) => {
    cookies.remove('token')
    dispatch(logoutSuccess())
    return Promise.resolve()
  }

export const forgotPasswordFetch = values =>
  () => {
    return api.post('recoverPassword', values)
  }

export const recoverPasswordFetch = (values, token) =>
  () => {
    return api.post('changePassword', { ...values, token })
  }
