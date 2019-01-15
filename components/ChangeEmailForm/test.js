import React from 'react'
import { shallow } from 'enzyme'
import { ChangeEmailFormComponent, validate } from 'components/ChangeEmailForm'

describe('ChangeEmailForm component', () => {
  it('validate function success', () => {
    const values = {
      newEmail: 'new@email.com',
      password: 'Aa123456',
    }
    const props = {
      currentEmail: 'old@email.com',
    }
    const errors = validate(values, props)

    expect(errors).toEqual({ newEmail: null, password: null })
  })

  it('validate function fails', () => {
    const values = {
      newEmail: 'old@email.com',
      password: 'wrong',
    }
    const props = {
      currentEmail: 'old@email.com',
    }
    const errors = validate(values, props)

    expect(errors).toEqual({
      newEmail: 'You are already using this email.',
      password: 'Password has to be at least 8 characters long and contain at'
        + ' least one uppercase, lowercase and numeric character.',
    })
  })

  it('renders and submits on click', () => {
    const reduxFormProps = {
      error: null,
      form: 'Form',
      handleChangeEmail: jest.fn(),
      handleSubmit: jest.fn(cb => cb()),
      submitSucceeded: false,
      submitting: false,
    }
    const wrapper = shallow(
      <ChangeEmailFormComponent {...reduxFormProps} />
    )
    wrapper.find('form').simulate('submit')

    expect(reduxFormProps.handleSubmit)
      .toHaveBeenCalledWith(reduxFormProps.handleChangeEmail)
    expect(reduxFormProps.handleChangeEmail).toHaveBeenCalled()
  })
})
