import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { withRouter, Link } from 'react-router';
import { recoverPasswordFetch } from '../../actions/auth';
import { isPassword, isRequired, isSamePassword } from '../../utils/validator';
import { REDIRECTION } from '../../constants/application';
import Input from '../../components/Input';
import ErrorMsg from '../../components/ErrorMsg';
import Button from '../../components/Button';

export const validate = (values) => {
  const errors = {};
  const { password, confirmation } = values.toJS();

  errors.password = isRequired(password) || isPassword(password);
  errors.confirmation = isRequired(confirmation) || isPassword(confirmation) ||
    isSamePassword(confirmation, password);
  return errors;
};

export class RecoverPasswordComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  constructor() {
    super();
    this.handleRecoverPassword = this.handleRecoverPassword.bind(this);
  }

  handleRecoverPassword(values) {
    const { dispatch, params: { code }, router } = this.props;

    const newValues = values.delete('confirmation');
    return dispatch(recoverPasswordFetch(newValues, code, () =>
      setTimeout(() => router.push('/login'), REDIRECTION),
    ));
  }

  render() {
    const { error, handleSubmit, submitSucceeded, submitting } = this.props;

    return (
      <main>
        <form onSubmit={handleSubmit(this.handleRecoverPassword)} noValidate>
          <Field
            name="password"
            component={Input}
            label="New Password"
            type="password"
            placeholder="New Email"
          />
          <Field
            name="confirmation"
            component={Input}
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
          />
          {submitSucceeded && <p>Password Changed. Redirecting...</p>}
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <Button type="submit" disabled={submitting}>Change</Button>
        </form>
        <Link to="/login">Log In</Link>
      </main>
    );
  }
}

export default connect()(withRouter(
  reduxForm({
    form: 'ChangePassword',
    validate,
  })(RecoverPasswordComponent),
));
