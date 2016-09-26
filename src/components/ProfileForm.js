import React, { PropTypes } from 'react';
import { Field, reduxForm, propTypes } from 'redux-form/immutable';
import Input from './Input';
import Textarea from './Textarea';

const ProfileForm = (props) => {
  const { error, handleSubmit, onProfileUpdate, submitSucceeded, submitting } =
    props;

  return (
    <form onSubmit={handleSubmit(onProfileUpdate)} noValidate>
      <Field
        name="firstname"
        component={Input}
        label="First Name"
        type="text"
        placeholder="First Name"
        maxLength="30"
      />
      <Field
        name="lastname"
        component={Input}
        label="Last Name"
        type="text"
        placeholder="Last Name"
        maxLength="30"
      />
      <Field
        name="bio"
        component={Textarea}
        label="Bio"
        placeholder="Bio"
        maxLength="1000"
      />
      {submitSucceeded && !submitting && <p>Profile Updated</p>}
      {error && <p>{error}</p>}
      <button type="submit" disabled={submitting}>Update</button>
    </form>
  );
};

ProfileForm.propTypes = {
  ...propTypes,
  onProfileUpdate: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'ProfileForm',
})(ProfileForm);
