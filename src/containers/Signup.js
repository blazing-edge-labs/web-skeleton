import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link, withRouter } from 'react-router';
import { signupFetch } from '../actions/auth';
import { isEmail, isPassword, isRequired } from '../utils/validator';
import Input from '../components/Input';

export const validate = (values) => {
  const errors = {};
  const { email, password } = values.toJS();

  errors.email = isRequired(email) || isEmail(email);
  errors.password = isRequired(password) || isPassword(password);
  return errors;
};

export class SignupComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  constructor() {
    super();
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup(values) {
    const { dispatch, router } = this.props;
    return dispatch(signupFetch(values, router));
  }

  render() {
    const { error, handleSubmit, submitting } = this.props;

    return (
      <article>
        <form onSubmit={handleSubmit(this.handleSignup)} noValidate>
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

export default connect()(withRouter(
  reduxForm({
    form: 'Signup',
    validate,
  })(SignupComponent)
));
