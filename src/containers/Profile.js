import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form/immutable';
import profileUpdateFetch from '../actions/profile';
import Input from '../components/Input';
import Textarea from '../components/Textarea';

@connect(state => ({
  initialValues: {
    bio: state.getIn(['user', 'bio']),
    firstname: state.getIn(['user', 'firstname']),
    lastname: state.getIn(['user', 'lastname']),
  },
  user: state.get('user'),
}))
@reduxForm({
  form: 'Profile',
})
export default class Profile extends Component {
  static propTypes = {
    ...propTypes,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.onProfileUpdate = this.onProfileUpdate.bind(this);
  }

  onProfileUpdate(values) {
    const { dispatch, user } = this.props;
    return dispatch(profileUpdateFetch(values, user.get('id')));
  }

  render() {
    const { error, handleSubmit, submitSucceeded, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onProfileUpdate)} noValidate>
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
  }
}
