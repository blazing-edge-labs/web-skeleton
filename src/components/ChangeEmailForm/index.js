import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { withProps } from 'recompose';
import { isEmail, isPassword, isRequired, isUsedEmail }
  from '../../utils/validator';
import Input from '../Input';

export const validate = (values, { initialValues }) => {
  const { oldEmail, newEmail, password } = values.toJS();
  const currentEmail = initialValues.get('oldEmail');
  const errors = {};

  errors.oldEmail = isRequired(oldEmail) || isEmail(oldEmail) ||
    isUsedEmail(oldEmail, currentEmail, true);
  errors.newEmail = isRequired(newEmail) || isEmail(newEmail) ||
    isUsedEmail(newEmail, currentEmail, false);
  errors.password = isRequired(password) || isPassword(password);
  return errors;
};

export const ChangeEmailFormComponent = (props) => {
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

ChangeEmailFormComponent.propTypes = {
  error: PropTypes.string,
  handleChangeEmail: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default withProps(({ user }) => ({
  initialValues: {
    oldEmail: user.get('email'),
  },
}))(reduxForm({
  form: 'ChangeEmailForm',
  validate,
})(ChangeEmailFormComponent));
