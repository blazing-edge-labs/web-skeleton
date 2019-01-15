import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'routes'

export class ProfileComponent extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    const { user } = this.props
    const { email, image } = user

    return (
      <main>
        <dl>
          {image && <dt>Profile Image</dt>}
          {image && (
            <dd>
              <img src={image} alt="Personal Profile" />
            </dd>
          )}
          <dt>Email</dt>
          <dd>{email}</dd>
        </dl>
        <Link to="/editProfile"><a>Edit Profile</a></Link>
      </main>
    )
  }
}

export default connect(state => ({
  user: state.user,
}))(ProfileComponent)
