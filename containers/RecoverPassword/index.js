import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link, Router } from 'routes'
import { recoverPasswordFetch } from 'actions/auth'
import { isPassword, isRequired, isSamePassword } from 'utils/validator'
import { REDIRECTION } from 'constants/application'
import Input from 'components/Input'
import ErrorMsg from 'components/ErrorMsg'
import Button from 'components/Button'

export const validate = (values) => {
  const errors = {}
  const { password, confirmation } = values

  errors.password = isRequired(password) || isPassword(password)
  errors.confirmation = isRequired(confirmation) || isPassword(confirmation) ||
    isSamePassword(confirmation, password)
  return errors
}

export class RecoverPasswordComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    form: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  constructor() {
    super()
    this.handleRecoverPassword = this.handleRecoverPassword.bind(this)
  }

  handleRecoverPassword(values) {
    const { dispatch, params: { code } } = this.props

    const newValues = { ...values, confirmation: undefined }

    return dispatch(recoverPasswordFetch(newValues, code, () =>
      setTimeout(() => Router.pushRoute('/login'), REDIRECTION),
    ))
  }

  render() {
    const { error, form, handleSubmit, submitSucceeded, submitting } =
      this.props

    return (
      <main>
        <form onSubmit={handleSubmit(this.handleRecoverPassword)} noValidate>
          <Field
            name="password"
            component={Input}
            id={form}
            label="New Password"
            type="password"
            placeholder="New Password"
          />
          <Field
            name="confirmation"
            component={Input}
            id={form}
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
          />
          {submitSucceeded && <p>Password Changed. Redirecting...</p>}
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <Button type="submit" disabled={submitting}>Change</Button>
        </form>
        <Link to="/login"><a>Log In</a></Link>
      </main>
    )
  }
}

export default connect()(
  reduxForm({
    form: 'ChangePassword',
    validate,
  })(RecoverPasswordComponent),
)
