import reducer from './user'
import { SIGNUP_LOGIN_SUCCESS, EMAIL_CONFIRM_SUCCESS, PROFILE_UPDATE_SUCCESS }
  from '../constants/actions'

const defaultUser = {
  bio: null,
  confirmed: false,
  createdAt: '2016-10-06T14:55:40.708Z',
  email: 'test@email.com',
  firstname: null,
  id: 1,
  lastname: null,
  resourceId: null,
  updatedAt: '2016-10-06T14:55:40.722Z',
}

describe('user reducer', () => {
  it('should return empty initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should return initial state', () => {
    expect(reducer(defaultUser, {})).toEqual({
      bio: null,
      confirmed: false,
      createdAt: '2016-10-06T14:55:40.708Z',
      email: 'test@email.com',
      firstname: null,
      id: 1,
      lastname: null,
      resourceId: null,
      updatedAt: '2016-10-06T14:55:40.722Z',
    })
  })

  it('should handle SIGNUP_LOGIN_SUCCESS', () => {
    expect(reducer(undefined, {
      type: SIGNUP_LOGIN_SUCCESS,
      user: defaultUser,
    })).toEqual({
      bio: null,
      confirmed: false,
      createdAt: '2016-10-06T14:55:40.708Z',
      email: 'test@email.com',
      firstname: null,
      id: 1,
      lastname: null,
      resourceId: null,
      updatedAt: '2016-10-06T14:55:40.722Z',
    })
  })

  it('should handle EMAIL_CONFIRM_SUCCESS', () => {
    const user = { ...defaultUser, confirmed: true }

    expect(reducer(undefined, {
      type: EMAIL_CONFIRM_SUCCESS,
      user,
    })).toEqual({
      bio: null,
      confirmed: true,
      createdAt: '2016-10-06T14:55:40.708Z',
      email: 'test@email.com',
      firstname: null,
      id: 1,
      lastname: null,
      resourceId: null,
      updatedAt: '2016-10-06T14:55:40.722Z',
    })
  })

  it('should handle PROFILE_UPDATE_SUCCESS', () => {
    const user = {
      ...defaultUser,
      bio: 'This is my bio',
      confirmed: true,
      firstname: 'John',
      image: 'link.to.image',
      lastname: 'Doe',
      resourceId: 1,
    }

    expect(reducer(undefined, {
      type: PROFILE_UPDATE_SUCCESS,
      user,
    })).toEqual({
      bio: 'This is my bio',
      confirmed: true,
      createdAt: '2016-10-06T14:55:40.708Z',
      email: 'test@email.com',
      firstname: 'John',
      id: 1,
      image: 'link.to.image',
      lastname: 'Doe',
      resourceId: 1,
      updatedAt: '2016-10-06T14:55:40.722Z',
    })
  })
})
