import { PROFILE_UPDATE_SUCCESS } from 'constants/actions'
import api from 'utils/api'

export const profileUpdateSuccess = user => ({
  type: PROFILE_UPDATE_SUCCESS,
  user,
})

export const profileGetFetch = () =>
  (dispatch) => {
    return api.get('self')
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
    return api.put('self/emai', values)
  }

export const changePasswordFetch = values =>
  () => {
    return api.put('self/password', values)
  }
