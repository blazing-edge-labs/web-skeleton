import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form/immutable';
import { withRouter } from 'react-router';
import { changePasswordFetch } from '../actions/auth';
import { isPassword, isRequired, isSamePassword } from '../utils/validator';
import { REDIRECTION } from '../constants/application';
import getImmutableData from '../utils/getImmutableData';
import Input from '../components/Input';

const validate = (values) => {
  const errors = {};
  const { password, confirmation } = getImmutableData(values,
    ['password', 'confirmation']);

  errors.password = isRequired(password) || isPassword(password);
  errors.confirmation = isRequired(confirmation) || isPassword(confirmation) ||
    isSamePassword(confirmation, password);
  return errors;
};

@connect()
@withRouter
@reduxForm({
  form: 'ChangePassword',
  validate,
})
export default class ChangePassword extends Component {
  static propTypes = {
    ...propTypes,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangePassword(values) {
    const { dispatch, params, router } = this.props;
    const fetchParams = {
      password: values.get('password'),
      token: params.code,
    };

    return dispatch(changePasswordFetch(fetchParams, () =>
      setTimeout(() => router.push('/login'), REDIRECTION)
    ));
  }

  render() {
    const { error, handleSubmit, submitSucceeded, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleChangePassword)} noValidate>
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
        {error && <p>{error}</p>}
        <button type="submit" disabled={submitting}>Change</button>
      </form>
    );
  }
}
