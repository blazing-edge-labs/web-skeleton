import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Router, Link } from 'routes'
import { loginFetch } from 'actions/auth'
import { isEmail, isRequired } from 'utils/validator'
import Input from 'components/Input'
import ErrorMsg from 'components/ErrorMsg'
import Button from 'components/Button'

export const validate = (values) => {
  const errors = {}
  const { email, password } = values

  errors.email = isRequired(email) || isEmail(email)
  errors.password = isRequired(password)
  return errors
}

export class LoginComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  constructor() {
    super()
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(values) {
    const { dispatch } = this.props
    return dispatch(loginFetch(values)).then(() => Router.pushRoute('/'))
  }

  render() {
    const { error, handleSubmit, submitting } = this.props

    return (
      <main>
        <form onSubmit={handleSubmit(this.handleLogin)} noValidate>
          <Field
            name="email"
            component={Input}
            label="Email"
            type="email"
            placeholder="Email"
          />
          <Field
            name="password"
            component={Input}
            label="Password"
            type="password"
            placeholder="Password"
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <Button type="submit" disabled={submitting}>Login</Button>
        </form>
        <Link to="/forgotPassword"><a>Forgot Password?</a></Link>
        <Link to="/signup"><a>Sign up here</a></Link>
      </main>
    )
  }
}

export default connect()(
  reduxForm({
    form: 'Login',
    validate,
  })(LoginComponent),
)
