import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router';
import { signupFetch } from '../../actions/auth';
import { isEmail, isPassword, isRequired } from '../../utils/validator';
import Input from '../../components/Input';
import ErrorMsg from '../../components/ErrorMsg';
import Button from '../../components/Button';

export const validate = (values) => {
  const errors = {};
  const { email, password } = values;

  errors.email = isRequired(email) || isEmail(email);
  errors.password = isRequired(password) || isPassword(password);
  return errors;
};

export class SignupComponent extends Component {
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
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup(values) {
    const { dispatch, router } = this.props;
    return dispatch(signupFetch(values, () => router.push('/')));
  }

  render() {
    const { error, form, handleSubmit, submitting } = this.props;

    return (
      <main>
        <form onSubmit={handleSubmit(this.handleSignup)} noValidate>
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
          <Button type="submit" disabled={submitting}>Signup</Button>
        </form>
        <p>Already have an account? <Link to="/login">Log in here</Link></p>
      </main>
    );
  }
}

export default connect()(withRouter(
  reduxForm({
    form: 'Signup',
    validate,
  })(SignupComponent),
));
