import React from 'react'
import { shallow } from 'enzyme'
import { ChangePasswordFormComponent, validate } from 'components/ChangePasswordForm'

describe('ChangePasswordForm component', () => {
  it('validate function success', () => {
    const values = {
      oldPassword: 'Aa123456',
      newPassword: 'Bb123456',
      confirmation: 'Bb123456',
    }
    const errors = validate(values)

    expect(errors).toEqual({
      oldPassword: null, newPassword: null, confirmation: null,
    })
  })

  it('validate function failed', () => {
    const values = {
      oldPassword: 'wrong',
      newPassword: undefined,
      confirmation: 'Cc123456',
    }
    const errors = validate(values)

    expect(errors).toEqual({
      oldPassword: 'Password has to be at least 8 characters long and contain'
        + ' at least one uppercase, lowercase and numeric character.',
      newPassword: 'Required field.',
      confirmation: 'Confirmation Password has to be equal.',
    })
  })

  it('renders and submits on click', () => {
    const reduxFormProps = {
      error: null,
      form: 'Form',
      handleChangePassword: jest.fn(),
      handleSubmit: jest.fn(cb => cb()),
      submitSucceeded: false,
      submitting: false,
    }
    const wrapper = shallow(
      <ChangePasswordFormComponent {...reduxFormProps} />
    )
    wrapper.find('form').simulate('submit')

    expect(reduxFormProps.handleSubmit)
      .toHaveBeenCalledWith(reduxFormProps.handleChangePassword)
    expect(reduxFormProps.handleChangePassword).toHaveBeenCalled()
  })
})
