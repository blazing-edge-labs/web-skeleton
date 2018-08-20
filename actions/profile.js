import { PROFILE_UPDATE_SUCCESS } from 'constants/actions'
import api from 'utils/api'

export const profileUpdateSuccess = user => ({
  type: PROFILE_UPDATE_SUCCESS,
  user,
})

export const profileGetFetch = ctx =>
  (dispatch) => {
    return api.get('self', null, { ctx })
    .then((user) => {
      return dispatch(profileUpdateSuccess(user))
    })
  }

export const profileUpdateFetch = values =>
  (dispatch) => {
    return api.put('self', values)
    .then((user) => {
      return dispatch(profileUpdateSuccess(user))
    })
  }

export const changeEmailFetch = values =>
  () => {
    return api.put('self/email', values)
  }

export const changePasswordFetch = values =>
  () => {
    return api.put('self/password', values)
  }
