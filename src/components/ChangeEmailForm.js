import React, { PropTypes } from 'react';
import { Field, reduxForm, propTypes } from 'redux-form/immutable';
import { withProps } from 'recompose';
import { isEmail, isPassword, isRequired, isUsedEmail }
  from '../utils/validator';
import getImmutableData from '../utils/getImmutableData';
import Input from '../components/Input';

const validate = (values, { initialValues }) => {
  const { oldEmail, newEmail, password } = getImmutableData(values,
    ['oldEmail', 'newEmail', 'password']);
  const currentEmail = initialValues.get('oldEmail');
  const errors = {};

  errors.oldEmail = isRequired(oldEmail) || isEmail(oldEmail) ||
    isUsedEmail(oldEmail, currentEmail, true);
  errors.newEmail = isRequired(newEmail) || isEmail(newEmail) ||
    isUsedEmail(newEmail, currentEmail, false);
  errors.password = isRequired(password) || isPassword(password);
  return errors;
};

const ChangeEmailForm = (props) => {
  const { error, handleChangeEmail, handleSubmit, submitSucceeded,
    submitting } = props;

  return (
    <form onSubmit={handleSubmit(handleChangeEmail)} noValidate>
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
  handleChangeEmail: PropTypes.func.isRequired,
};

export default withProps(({ user }) => ({
  initialValues: {
    oldEmail: user.get('email'),
  },
}))(reduxForm({
  form: 'ChangeEmailForm',
  validate,
})(ChangeEmailForm));
