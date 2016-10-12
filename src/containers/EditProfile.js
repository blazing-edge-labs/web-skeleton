import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { profileUpdateFetch, changeEmailFetch, changePasswordFetch }
  from '../actions/profile';
import ProfileForm from '../components/ProfileForm';
import ChangeEmailForm from '../components/ChangeEmailForm';
import ChangePasswordForm from '../components/ChangePasswordForm';

export class EditProfileComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleProfileUpdate(values) {
    const { dispatch, user } = this.props;
    return dispatch(profileUpdateFetch(values, user.get('id')));
  }

  handleChangeEmail(values) {
    const { dispatch } = this.props;
    return dispatch(changeEmailFetch(values));
  }

  handleChangePassword(values) {
    const { dispatch } = this.props;
    const newValues = values.delete('confirmation');
    return dispatch(changePasswordFetch(newValues));
  }

  render() {
    const { user } = this.props;

    return (
      <section>
        <ProfileForm
          handleProfileUpdate={this.handleProfileUpdate}
          user={user}
        />
        <ChangeEmailForm
          handleChangeEmail={this.handleChangeEmail}
          user={user}
        />
        <ChangePasswordForm handleChangePassword={this.handleChangePassword} />
        <Link to="/profile">View Profile</Link>
      </section>
    );
  }
}

export default connect(state => ({
  user: state.get('user'),
}))(EditProfileComponent);
