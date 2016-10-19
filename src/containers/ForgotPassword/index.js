import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link } from 'react-router';
import { forgotPasswordFetch } from '../../actions/auth';
import { isEmail, isRequired } from '../../utils/validator';
import Input from '../../components/Input';

export const validate = (values) => {
  const errors = {};
  const { email } = values.toJS();

  errors.email = isRequired(email) || isEmail(email);
  return errors;
};

export class ForgotPasswordComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
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
    const { error, handleSubmit, submitSucceeded, submitting } = this.props;

    return (
      <article>
        <form onSubmit={handleSubmit(this.handleSend)} noValidate>
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

export default connect()(reduxForm({
  form: 'ForgotPassword',
  validate,
})(ForgotPasswordComponent));
