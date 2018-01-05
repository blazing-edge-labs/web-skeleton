import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Input from 'components/Input'
import ErrorMsg from 'components/ErrorMsg'
import Button from 'components/Button'

export const ProfileFormComponent = (props) => {
  const { error, handleProfileUpdate, handleSubmit, submitSucceeded,
    submitting } = props

  return (
    <form onSubmit={handleSubmit(handleProfileUpdate)} noValidate>
      <Field
        name="image"
        component={Input}
        label="Profile Image"
        type="file"
      />
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
        component={Input}
        label="Bio"
        placeholder="Bio"
        maxLength="1000"
        textarea
      />
      {submitSucceeded && !submitting && <p>Profile Updated</p>}
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Button type="submit" disabled={submitting}>Update</Button>
    </form>
  )
}

ProfileFormComponent.propTypes = {
  error: PropTypes.string,
  handleProfileUpdate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default connect(state => ({
  initialValues: {
    firstname: state.user.firstname,
    lastname: state.user.lastname,
  },
}))(reduxForm({
  enableReinitialize: true,
  form: 'ProfileForm',
})(ProfileFormComponent))
