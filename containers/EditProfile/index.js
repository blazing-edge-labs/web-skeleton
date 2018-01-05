import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { profileUpdateFetch, changeEmailFetch, changePasswordFetch }
  from 'actions/profile'
import ProfileForm from 'components/ProfileForm'
import ChangeEmailForm from 'components/ChangeEmailForm'
import ChangePasswordForm from 'components/ChangePasswordForm'

export class EditProfileComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor() {
    super()
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
  }

  handleProfileUpdate(values) {
    const { dispatch } = this.props
    return dispatch(profileUpdateFetch(values))
  }

  handleChangeEmail(values) {
    const { dispatch } = this.props
    return dispatch(changeEmailFetch(values))
  }

  handleChangePassword(values) {
    const { dispatch } = this.props

    const newValues = { ...values, confirmation: undefined }
    return dispatch(changePasswordFetch(newValues))
  }

  render() {
    return (
      <main>
        <ProfileForm handleProfileUpdate={this.handleProfileUpdate} />
        <ChangeEmailForm handleChangeEmail={this.handleChangeEmail} />
        <ChangePasswordForm handleChangePassword={this.handleChangePassword} />
      </main>
    )
  }
}

export default connect()(EditProfileComponent)
