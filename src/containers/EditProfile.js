import React from 'react';
import { Link } from 'react-router';
import ProfileForm from '../containers/ProfileForm';
import ChangeEmailForm from '../containers/ChangeEmailForm';

const EditProfile = () =>
  <section>
    <ProfileForm />
    <ChangeEmailForm />
    <Link to="/profile">View Profile</Link>
  </section>;

export default EditProfile;
