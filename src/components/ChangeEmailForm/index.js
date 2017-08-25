import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { isEmail, isPassword, isRequired, isUsedEmail }
  from '../../utils/validator';
import Input from '../Input';
import ErrorMsg from '../ErrorMsg';
import Button from '../Button';

export const validate = (values, { currentEmail }) => {
  const { newEmail, password } = values;
  const errors = {};

  errors.newEmail = isRequired(newEmail) || isEmail(newEmail) ||
    isUsedEmail(newEmail, currentEmail);
  errors.password = isRequired(password) || isPassword(password);
  return errors;
};

export const ChangeEmailFormComponent = (props) => {
  const { error, form, handleChangeEmail, handleSubmit, submitSucceeded,
    submitting } = props;

  return (
    <form onSubmit={handleSubmit(handleChangeEmail)} noValidate>
      <Field
        name="newEmail"
        component={Input}
        id={form}
        label="New Email"
        type="email"
        placeholder="New Email"
      />
      <Field
        name="password"
        component={Input}
        id={form}
        label="Password"
        type="password"
        placeholder="Password"
      />
      {submitSucceeded && !submitting && <p>Open new email and confirm!</p>}
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Button type="submit" disabled={submitting}>Change</Button>
    </form>
  );
};

ChangeEmailFormComponent.propTypes = {
  error: PropTypes.string,
  form: PropTypes.string.isRequired,
  handleChangeEmail: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default connect(state => ({
  currentEmail: state.getIn(['user', 'email']),
}))(reduxForm({
  form: 'ChangeEmailForm',
  validate,
})(ChangeEmailFormComponent));
