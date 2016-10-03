import React, { PropTypes } from 'react';
import { Field, reduxForm, propTypes } from 'redux-form/immutable';
import { withProps } from 'recompose';
import Input from '../components/Input';
import Textarea from '../components/Textarea';

const ProfileForm = (props) => {
  const { error, handleProfileUpdate, handleSubmit, submitSucceeded,
    submitting } = props;

  return (
    <form onSubmit={handleSubmit(handleProfileUpdate)} noValidate>
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
  handleProfileUpdate: PropTypes.func.isRequired,
};

export default withProps(({ user }) => ({
  initialValues: {
    bio: user.get('bio'),
    firstname: user.get('firstname'),
    lastname: user.get('lastname'),
  },
}))(reduxForm({
  form: 'ProfileForm',
})(ProfileForm));
