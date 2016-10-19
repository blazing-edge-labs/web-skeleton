import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { isPassword, isRequired, isSamePassword } from '../../utils/validator';
import Input from '../Input';

export const validate = (values) => {
  const { oldPassword, newPassword, confirmation } = values.toJS();
  const errors = {};

  errors.oldPassword = isRequired(oldPassword) || isPassword(oldPassword);
  errors.newPassword = isRequired(newPassword) || isPassword(newPassword);
  errors.confirmation = isRequired(confirmation) || isPassword(confirmation) ||
    isSamePassword(confirmation, newPassword);
  return errors;
};

export const ChangePasswordFormComponent = (props) => {
  const { error, handleChangePassword, handleSubmit, submitSucceeded,
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

ChangePasswordFormComponent.propTypes = {
  error: PropTypes.string,
  handleChangePassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'ChangePasswordForm',
  validate,
})(ChangePasswordFormComponent);
