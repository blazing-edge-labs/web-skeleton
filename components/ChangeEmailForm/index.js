import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { isEmail, isPassword, isRequired, isUsedEmail }
  from 'utils/validator'
import Input from 'components/Input'
import ErrorMsg from 'components/ErrorMsg'
import Button from 'components/Button'

export const validate = (values, { currentEmail }) => {
  const { newEmail, password } = values
  const errors = {}

  errors.newEmail = isRequired(newEmail) || isEmail(newEmail) ||
    isUsedEmail(newEmail, currentEmail)
  errors.password = isRequired(password) || isPassword(password)
  return errors
}

export const ChangeEmailFormComponent = (props) => {
  const { error, handleChangeEmail, handleSubmit, submitSucceeded,
    submitting } = props

  return (
    <form onSubmit={handleSubmit(handleChangeEmail)} noValidate>
      <Field
        name="newEmail"
        component={Input}
        label="New Email"
        type="email"
        placeholder="New Email"
      />
      <Field
        name="password"
        component={Input}
        label="Password"
        type="password"
        placeholder="Password"
      />
      {submitSucceeded && !submitting && <p>Open new email and confirm!</p>}
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Button type="submit" disabled={submitting}>Change</Button>
    </form>
  )
}

ChangeEmailFormComponent.propTypes = {
  error: PropTypes.string,
  handleChangeEmail: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default connect(state => ({
  currentEmail: state.user.email,
}))(reduxForm({
  form: 'ChangeEmailForm',
  validate,
})(ChangeEmailFormComponent))
