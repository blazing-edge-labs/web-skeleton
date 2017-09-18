import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { profileGetFetch } from '../../actions/profile';

export class ProfileComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    return dispatch(profileGetFetch());
  }

  render() {
    const { user } = this.props;
    const { bio, email, firstname, image, lastname } = user;

    return (
      <main>
        <dl>
          {image && <dt>Profile Image</dt>}
          {image &&
            <dd>
              <img src={image} alt="Personal Profile" />
            </dd>
          }
          <dt>Email</dt>
          <dd>{email}</dd>
          {firstname && <dt>First Name</dt>}
          {firstname && <dd>{firstname}</dd>}
          {lastname && <dt>Last Name</dt>}
          {lastname && <dd>{lastname}</dd>}
          {bio && <dt>Bio</dt>}
          {bio && <dd>{bio}</dd>}
        </dl>
        <Link to="/editProfile">Edit Profile</Link>
      </main>
    );
  }
}

export default connect(state => ({
  user: state.user,
}))(ProfileComponent);
