import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { isPassword, isRequired, isSamePassword } from '../../utils/validator';
import Input from '../Input';
import ErrorMsg from '../ErrorMsg';
import Button from '../Button';

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
  const { error, form, handleChangePassword, handleSubmit, submitSucceeded,
    submitting } = props;

  return (
    <form onSubmit={handleSubmit(handleChangePassword)} noValidate>
      <Field
        name="oldPassword"
        component={Input}
        id={form}
        label="Current Password"
        type="password"
        placeholder="Current Password"
      />
      <Field
        name="newPassword"
        component={Input}
        id={form}
        label="New Password"
        type="password"
        placeholder="New Password"
      />
      <Field
        name="confirmation"
        component={Input}
        id={form}
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
      />
      {submitSucceeded && <p>Password Changed.</p>}
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Button type="submit" disabled={submitting}>Change</Button>
    </form>
  );
};

ChangePasswordFormComponent.propTypes = {
  error: PropTypes.string,
  form: PropTypes.string.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'ChangePasswordForm',
  validate,
})(ChangePasswordFormComponent);
