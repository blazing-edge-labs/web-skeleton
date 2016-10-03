import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { profileGetFetch } from '../actions/profile';
import getImmutableData from '../utils/getImmutableData';

@connect(state => ({
  user: state.get('user'),
}))
export default class Profile extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { dispatch, user } = this.props;
    return dispatch(profileGetFetch(user.get('id')));
  }

  render() {
    const { user } = this.props;
    const { bio, email, firstname, lastname } = getImmutableData(user, ['bio',
      'email', 'firstname', 'lastname']);

    return (
      <section>
        <dl>
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
      </section>
    );
  }
}
