import React, { PropTypes } from 'react';
import { Field, reduxForm, propTypes } from 'redux-form/immutable';
import { isEmail, isPassword, isRequired } from '../utils/validator';
import getImmutableData from '../utils/getImmutableData';
import Input from './Input';

const validate = (values) => {
  const errors = {};
  const { oldEmail, newEmail, password } = getImmutableData(values,
    ['oldEmail', 'newEmail', 'password']);

  errors.oldEmail = isRequired(oldEmail) || isEmail(oldEmail);
  errors.newEmail = isRequired(newEmail) || isEmail(newEmail);
  errors.password = isRequired(password) || isPassword(password);
  return errors;
};

const ChangeEmailForm = (props) => {
  const { error, handleSubmit, onChangeEmail, submitSucceeded, submitting } =
    props;

  return (
    <form onSubmit={handleSubmit(onChangeEmail)} noValidate>
      <Field
        name="oldEmail"
        component={Input}
        label="Old Email"
        type="email"
        placeholder="Old Email"
      />
      <Field
        name="newEmail"
        component={Input}
        label="New Email"
        type="email"
        placeholder="New Email"
      />
      <Field
        name="password"
        component={Input}
        label="Password"
        type="password"
        placeholder="Password"
      />
      {submitSucceeded && !submitting && <p>Open new email and confirm!</p>}
      {error && <p>{error}</p>}
      <button type="submit" disabled={submitting}>Change</button>
    </form>
  );
};

ChangeEmailForm.propTypes = {
  ...propTypes,
  onChangeEmail: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'ChangeEmailForm',
  validate,
})(ChangeEmailForm);
