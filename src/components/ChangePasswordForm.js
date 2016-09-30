import React, { PropTypes } from 'react';
import { Field, reduxForm, propTypes } from 'redux-form/immutable';
import { changeEmailFormFetch } from '../actions/profile';
import { isPassword, isRequired, isSamePassword } from '../utils/validator';

const ChangePasswordForm = (props) => {
  const { error, handleSubmit, submitSucceeded, submitting } = props;

  return (
    <form onSubmit={handleSubmit(this.handleChangePassword)} noValidate>
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
};

export default ChangePasswordForm;
