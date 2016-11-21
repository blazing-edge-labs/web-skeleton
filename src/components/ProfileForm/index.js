import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Input from '../Input';
import ErrorMsg from '../ErrorMsg';
import Button from '../Button';

export const ProfileFormComponent = (props) => {
  const { error, form, handleProfileUpdate, handleSubmit, submitSucceeded,
    submitting } = props;

  return (
    <form onSubmit={handleSubmit(handleProfileUpdate)} noValidate>
      <Field
        name="image"
        component={Input}
        id={form}
        label="Profile Image"
        type="file"
      />
      <Field
        name="firstname"
        component={Input}
        id={form}
        label="First Name"
        type="text"
        placeholder="First Name"
        maxLength="30"
      />
      <Field
        name="lastname"
        component={Input}
        id={form}
        label="Last Name"
        type="text"
        placeholder="Last Name"
        maxLength="30"
      />
      <Field
        name="bio"
        component={Input}
        id={form}
        label="Bio"
        placeholder="Bio"
        maxLength="1000"
        textarea
      />
      {submitSucceeded && !submitting && <p>Profile Updated</p>}
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Button type="submit" disabled={submitting}>Update</Button>
    </form>
  );
};

ProfileFormComponent.propTypes = {
  error: PropTypes.string,
  form: PropTypes.string.isRequired,
  handleProfileUpdate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default connect(state => ({
  initialValues: {
    bio: state.getIn(['user', 'bio']),
    firstname: state.getIn(['user', 'firstname']),
    lastname: state.getIn(['user', 'lastname']),
  },
}))(reduxForm({
  enableReinitialize: true,
  form: 'ProfileForm',
})(ProfileFormComponent));
