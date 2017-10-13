import React from 'react'
import { shallow } from 'enzyme'
import { EditProfileComponent } from './'
import * as Actions from '../../actions/profile'

describe('EditProfile component', () => {
  const mockDispatch = jest.fn(z => z)
  const wrapper = shallow(
    <EditProfileComponent userId={1} dispatch={mockDispatch} />
  )
  const instance = wrapper.instance()
  Actions.profileUpdateFetch = jest.fn(() => ({}))
  Actions.changeEmailFetch = jest.fn(() => ({}))
  Actions.changePasswordFetch = jest.fn(() => ({}))

  it('handleProfileUpdate method', () => {
    const values = {
      firstname: 'John',
      lastname: 'Doe',
    }
    instance.handleProfileUpdate(values)

    expect(Actions.profileUpdateFetch).toHaveBeenCalledWith(values, 1)
    expect(mockDispatch).toHaveBeenCalled()
  })

  it('handleChangeEmail method', () => {
    const values = {
      newEmail: 'new@email.com',
      password: 'Aa123456',
    }
    instance.handleChangeEmail(values)

    expect(Actions.changeEmailFetch).toHaveBeenCalledWith(values, 1)
    expect(mockDispatch).toHaveBeenCalled()
  })

  it('handleChangePassword method', () => {
    const values = {
      oldPassword: 'Aa123456',
      newPassword: 'Bb123456',
      confirmation: 'Bb123456',
    }
    const expected = { ...values, confirmation: undefined }
    instance.handleChangePassword(values)

    expect(Actions.changePasswordFetch).toHaveBeenCalledWith(expected, 1)
    expect(mockDispatch).toHaveBeenCalled()
  })
})
