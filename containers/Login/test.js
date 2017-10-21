import React from 'react'
import { shallow } from 'enzyme'
import { LoginComponent, validate } from 'containers/Login'
import * as Actions from 'actions/auth'
import { Router } from 'routes'

describe('Login component', () => {
  const mockDispatch = jest.fn(z => z)
  Router.pushRoute = jest.fn()

  const wrapper = shallow(
    <LoginComponent
      dispatch={mockDispatch}
      form="Form"
      handleSubmit={() => {}}
      submitting={false}
    />
  )
  const instance = wrapper.instance()
  Actions.loginFetch = jest.fn(() => Promise.resolve())

  it('validate function success', () => {
    const values = {
      email: 'test@email.com',
      password: 'Aa123456',
    }
    const errors = validate(values)

    expect(errors).toEqual({ email: null, password: null })
  })

  it('validate function fail', () => {
    const values = {
      email: 'notAnEmail',
      password: undefined,
    }
    const errors = validate(values)

    expect(errors).toEqual({
      email: 'Invalid e-mail address.',
      password: 'Required field.',
    })
  })

  it('handleLogin method', () => {
    const values = {
      email: 'test@email.com',
      password: 'Aa123456',
    }
    instance.handleLogin(values)

    expect(Actions.loginFetch).toHaveBeenCalledWith(values)
    expect(mockDispatch).toHaveBeenCalled()

    return mockDispatch.mock.calls[0][0].then(() => {
      expect(Router.pushRoute).toHaveBeenCalledWith('/')
    })
  })
})
