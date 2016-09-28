import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form/immutable';
import { changeEmailFetch } from '../actions/profile';
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

@connect(state => ({
  initialValues: {
    oldEmail: state.getIn(['user', 'email']),
  },
}))
@reduxForm({
  form: 'ChangeEmailForm',
  validate,
})
export default class ChangeEmailForm extends Component {
  static propTypes = {
    ...propTypes,
    dispatch: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }

  handleChangeEmail(values) {
    const { dispatch } = this.props;
    return dispatch(changeEmailFetch(values));
  }

  render() {
    const { error, handleSubmit, submitSucceeded, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleChangeEmail)} noValidate>
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
  }
}
