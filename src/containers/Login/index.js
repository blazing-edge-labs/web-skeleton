import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router';
import { loginFetch } from '../../actions/auth';
import { isEmail, isRequired } from '../../utils/validator';
import Input from '../../components/Input';
import ErrorMsg from '../../components/ErrorMsg';
import Button from '../../components/Button';

export const validate = (values) => {
  const errors = {};
  const { email, password } = values;

  errors.email = isRequired(email) || isEmail(email);
  errors.password = isRequired(password);
  return errors;
};

export class LoginComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    form: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(values) {
    const { dispatch, router } = this.props;
    return dispatch(loginFetch(values)).then(() => router.push('/'));
  }

  render() {
    const { error, form, handleSubmit, submitting } = this.props;

    return (
      <main>
        <form onSubmit={handleSubmit(this.handleLogin)} noValidate>
          <Field
            name="email"
            component={Input}
            id={form}
            label="Email"
            type="email"
            placeholder="Email"
          />
          <Field
            name="password"
            component={Input}
            id={form}
            label="Password"
            type="password"
            placeholder="Password"
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <Button type="submit" disabled={submitting}>Login</Button>
        </form>
        <Link to="/forgotPassword">Forgot Password?</Link>
        <Link to="/signup">Sign up here</Link>
      </main>
    );
  }
}

export default connect()(withRouter(
  reduxForm({
    form: 'Login',
    validate,
  })(LoginComponent),
));
