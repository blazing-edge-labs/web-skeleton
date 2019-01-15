import React from 'react'
import { shallow } from 'enzyme'
import { RecoverPasswordComponent, validate } from 'containers/RecoverPassword'
import * as Actions from 'actions/auth'
import { Router } from 'routes'

describe('RecoverPassword component', () => {
  const mockDispatch = jest.fn(z => z)
  Router.pushRoute = jest.fn()

  const wrapper = shallow(
    <RecoverPasswordComponent
      dispatch={mockDispatch}
      form="Form"
      handleSubmit={() => {}}
      params={{ code: 'this.is.code' }}
      submitSucceeded={false}
      submitting={false}
    />
  )
  const instance = wrapper.instance()
  Actions.recoverPasswordFetch = jest.fn((values, code, cb) => cb())

  it('validate function success', () => {
    const values = {
      password: 'Aa123456',
      confirmation: 'Aa123456',
    }
    const errors = validate(values)

    expect(errors).toEqual({ password: null, confirmation: null })
  })

  it('validate function fail', () => {
    const values = {
      password: 'wrong',
      confirmation: 'Bb123456',
    }
    const errors = validate(values)

    expect(errors).toEqual({
      password: 'Password has to be at least 8 characters long and contain at'
        + ' least one uppercase, lowercase and numeric character.',
      confirmation: 'Confirmation Password has to be equal.',
    })
  })

  it('handleChangePassword method', () => {
    const values = {
      password: 'Aa123456',
      confirmation: 'Aa123456',
    }
    const expected = { ...values, confirmation: undefined }
    instance.handleRecoverPassword(values)

    jest.runAllTimers()
    expect(Actions.recoverPasswordFetch)
      .toHaveBeenCalledWith(expected, 'this.is.code', jasmine.any(Function))
    expect(Router.pushRoute).toHaveBeenCalledWith('/login')
    expect(mockDispatch).toHaveBeenCalled()
  })
})
