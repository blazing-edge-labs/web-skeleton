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
    const { bio, firstname, lastname } = getImmutableData(user, ['bio',
      'firstname', 'lastname']);

    return (
      <section>
        {bio || firstname || lastname ?
          <dl>
            {bio && <dt>Bio</dt>}
            {bio && <dd>{bio}</dd>}
            {firstname && <dt>Bio</dt>}
            {firstname && <dd>{firstname}</dd>}
            {lastname && <dt>Bio</dt>}
            {lastname && <dd>{lastname}</dd>}
          </dl> :
          <p>No info to show.</p>
        }
        <Link to="/editProfile">Edit Profile</Link>
      </section>
    );
  }
}
