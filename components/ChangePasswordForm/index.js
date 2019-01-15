import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { isPassword, isRequired, isSamePassword } from 'utils/validator'
import Input from 'components/Input'
import ErrorMsg from 'components/ErrorMsg'
import Button from 'components/Button'

export const validate = (values) => {
  const { oldPassword, newPassword, confirmation } = values
  const errors = {}

  errors.oldPassword = isRequired(oldPassword) || isPassword(oldPassword)
  errors.newPassword = isRequired(newPassword) || isPassword(newPassword)
  errors.confirmation = isRequired(confirmation) || isPassword(confirmation)
    || isSamePassword(confirmation, newPassword)
  return errors
}

export const ChangePasswordFormComponent = (props) => {
  const { error, handleChangePassword, handleSubmit, submitSucceeded,
    submitting } = props

  return (
    <form onSubmit={handleSubmit(handleChangePassword)} noValidate>
      <Field
        name="oldPassword"
        component={Input}
        label="Current Password"
        type="password"
        placeholder="Current Password"
      />
      <Field
        name="newPassword"
        component={Input}
        label="New Password"
        type="password"
        placeholder="New Password"
      />
      <Field
        name="confirmation"
        component={Input}
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
      />
      {submitSucceeded && <p>Password Changed.</p>}
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Button type="submit" disabled={submitting}>Change</Button>
    </form>
  )
}

ChangePasswordFormComponent.propTypes = {
  error: PropTypes.string,
  handleChangePassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'ChangePasswordForm',
  validate,
})(ChangePasswordFormComponent)
