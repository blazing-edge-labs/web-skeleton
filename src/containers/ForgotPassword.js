import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form';
import { Link } from 'react-router';
import { forgotPasswordFetch } from '../actions/auth';
import { isEmail, isRequired } from '../utils/validator';
import Input from '../components/Input';

const validate = ({ email }) => {
  const errors = {};

  errors.email = isRequired(email) || isEmail(email);
  return errors;
};

@connect()
@reduxForm({
  form: 'ForgotPassword',
  validate,
})
export default class ForgotPassword extends Component {
  static propTypes = {
    ...propTypes,
    dispatch: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onSend = this.onSend.bind(this);
  }

  onSend(values) {
    const { dispatch } = this.props;
    return dispatch(forgotPasswordFetch(values));
  }

  render() {
    const { error, handleSubmit, submitSucceeded, submitting } = this.props;

    return (
      <article>
        <form onSubmit={handleSubmit(this.onSend)} noValidate>
          <Field
            name="email"
            component={Input}
            label="Email"
            type="email"
            placeholder="Email"
          />
          {submitSucceeded && !submitting && <p>Email has been sent.</p>}
          {error && <p>{error}</p>}
          <button type="submit" disabled={submitting}>Send</button>
        </form>
        <Link to="/login">Log in</Link>
      </article>
    );
  }
}
