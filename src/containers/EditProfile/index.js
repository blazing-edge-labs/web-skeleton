import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { profileUpdateFetch, changeEmailFetch, changePasswordFetch }
  from '../../actions/profile';
import ProfileForm from '../../components/ProfileForm';
import ChangeEmailForm from '../../components/ChangeEmailForm';
import ChangePasswordForm from '../../components/ChangePasswordForm';

export class EditProfileComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleProfileUpdate(values) {
    const { dispatch, userId } = this.props;
    return dispatch(profileUpdateFetch(values, userId));
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
    return (
      <main>
        <ProfileForm handleProfileUpdate={this.handleProfileUpdate} />
        <ChangeEmailForm handleChangeEmail={this.handleChangeEmail} />
        <ChangePasswordForm handleChangePassword={this.handleChangePassword} />
        <Link to="/profile">View Profile</Link>
      </main>
    );
  }
}

export default connect(state => ({
  userId: state.getIn(['user', 'id']),
}))(EditProfileComponent);
