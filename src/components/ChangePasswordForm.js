import React, { PropTypes } from 'react';
import { Field, reduxForm, propTypes } from 'redux-form/immutable';
import { isPassword, isRequired, isSamePassword } from '../utils/validator';
import getImmutableData from '../utils/getImmutableData';
import Input from './Input';

const validate = (values) => {
  const { oldPassword, newPassword, confirmation } = getImmutableData(values,
    ['oldPassword', 'newPassword', 'confirmation']);
  const errors = {};

  errors.oldPassword = isRequired(oldPassword) || isPassword(oldPassword);
  errors.newPassword = isRequired(newPassword) || isPassword(newPassword);
  errors.confirmation = isRequired(confirmation) || isPassword(confirmation) ||
    isSamePassword(confirmation, newPassword);
  return errors;
};

const ChangePasswordForm = (props) => {
  const { error, handleSubmit, handleChangePassword, submitSucceeded,
    submitting } = props;

  return (
    <form onSubmit={handleSubmit(handleChangePassword)} noValidate>
      <Field
        name="oldPassword"
        component={Input}
        label="Current Password"
        type="password"
        placeholder="Current Password"
      />
      <Field
        name="newPassword"
        component={Input}
        label="New Password"
        type="password"
        placeholder="New Password"
      />
      <Field
        name="confirmation"
        component={Input}
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
      />
      {submitSucceeded && <p>Password Changed.</p>}
      {error && <p>{error}</p>}
      <button type="submit" disabled={submitting}>Change</button>
    </form>
  );
};

ChangePasswordForm.propTypes = {
  ...propTypes,
  handleChangePassword: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'ChangePasswordForm',
  validate,
})(ChangePasswordForm);
