import { createStore } from 'redux'
import { LOGOUT_SUCCESS } from 'constants/actions'
import rootReducer from 'reducers'

describe('root reducer', () => {
  const initialState = {
    auth: {
      emailConfirmationError: null,
      emailConfirmationSuccess: false,
      emailResendError: null,
      emailResendSuccess: false,
    },
    form: {},
    user: {},
  }

  it('should return initial state for combined reducers', () => {
    const store = createStore(rootReducer)
    expect(store.getState()).toEqual(initialState)
  })

  it('should return initial state for logout action', () => {
    const newState = {
      auth: {
        emailConfirmationError: 'Token doesn\'t exist',
        emailConfirmationSuccess: false,
        emailResendError: null,
        emailResendSuccess: true,
      },
      form: {
        Login: {},
      },
      user: {
        lastname: 'lastname4',
        bio: null,
        resourceId: 2,
        updatedAt: '2016-11-08T18:08:25.000Z',
        id: 5,
        createdAt: '2016-11-08T18:08:25.000Z',
        firstname: 'firstname4',
        image: 'https://link-to-s3.jpg',
        email: 'firstname4.lastname4@mail.com',
        confirmed: true,
      },
    }
    expect(rootReducer(newState, { type: LOGOUT_SUCCESS }))
      .toEqual(initialState)
  })
})
