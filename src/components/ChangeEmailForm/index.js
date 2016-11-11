import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { isEmail, isPassword, isRequired, isUsedEmail }
  from '../../utils/validator';
import Input from '../Input';
import ErrorMsg from '../ErrorMsg';
import Button from '../Button';

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
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Button type="submit" disabled={submitting}>Change</Button>
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

export default connect(state => ({
  initialValues: {
    oldEmail: state.getIn(['user', 'email']),
  },
}))(reduxForm({
  form: 'ChangeEmailForm',
  validate,
})(ChangeEmailFormComponent));
