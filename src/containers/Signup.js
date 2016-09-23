import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form/immutable';
import { Link, withRouter } from 'react-router';
import { signupFetch } from '../actions/auth';
import { isEmail, isPassword, isRequired } from '../utils/validator';
import getImmutableData from '../utils/getImmutableData';
import Input from '../components/Input';

const validate = (values) => {
  const errors = {};
  const { email, password } = getImmutableData(values, ['email', 'password']);

  errors.email = isRequired(email) || isEmail(email);
  errors.password = isRequired(password) || isPassword(password);
  return errors;
};

@connect()
@withRouter
@reduxForm({
  form: 'Signup',
  validate,
})
export default class Signup extends Component {
  static propTypes = {
    ...propTypes,
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.onSignup = this.onSignup.bind(this);
  }

  onSignup(values) {
    const { dispatch, router } = this.props;
    return dispatch(signupFetch(values, router));
  }

  render() {
    const { error, handleSubmit, submitting } = this.props;

    return (
      <article>
        <form onSubmit={handleSubmit(this.onSignup)} noValidate>
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
          {error && <p>{error}</p>}
          <button type="submit" disabled={submitting}>Signup</button>
        </form>
        <p>Already have an account? <Link to="/login">Log in here</Link></p>
      </article>
    );
  }
}
