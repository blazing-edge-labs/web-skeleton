import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeEmailFetch, profileUpdateFetch } from '../actions/profile';
import ProfileForm from '../components/ProfileForm';
import ChangeEmailForm from '../components/ChangeEmailForm';

@connect(state => ({
  initialValues: {
    bio: state.getIn(['user', 'bio']),
    firstname: state.getIn(['user', 'firstname']),
    lastname: state.getIn(['user', 'lastname']),
  },
  user: state.get('user'),
}))
export default class Profile extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onProfileUpdate = this.onProfileUpdate.bind(this);
  }

  onChangeEmail(values) {
    const { dispatch } = this.props;
    return dispatch(changeEmailFetch(values));
  }

  onProfileUpdate(values) {
    const { dispatch, user } = this.props;
    return dispatch(profileUpdateFetch(values, user.get('id')));
  }

  render() {
    return (
      <section>
        <ProfileForm onProfileUpdate={this.onProfileUpdate} />
        <ChangeEmailForm onChangeEmail={this.onChangeEmail} />
      </section>
    );
  }
}
