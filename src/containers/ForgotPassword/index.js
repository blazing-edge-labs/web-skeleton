import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link } from 'react-router';
import { forgotPasswordFetch } from '../../actions/auth';
import { isEmail, isRequired } from '../../utils/validator';
import Input from '../../components/Input';
import ErrorMsg from '../../components/ErrorMsg';
import Button from '../../components/Button';

export const validate = (values) => {
  const errors = {};
  const email = values.get('email');

  errors.email = isRequired(email) || isEmail(email);
  return errors;
};

export class ForgotPasswordComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    form: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  constructor() {
    super();
    this.handleSend = this.handleSend.bind(this);
  }

  handleSend(values) {
    const { dispatch } = this.props;
    return dispatch(forgotPasswordFetch(values));
  }

  render() {
    const { error, form, handleSubmit, submitSucceeded, submitting } =
      this.props;

    return (
      <main>
        <form onSubmit={handleSubmit(this.handleSend)} noValidate>
          <Field
            name="email"
            component={Input}
            id={form}
            label="Email"
            type="email"
            placeholder="Email"
          />
          {submitSucceeded && !submitting && <p>Email has been sent.</p>}
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <Button type="submit" disabled={submitting}>Send</Button>
        </form>
        <Link to="/login">Log in</Link>
      </main>
    );
  }
}

export default connect()(reduxForm({
  form: 'ForgotPassword',
  validate,
})(ForgotPasswordComponent));
