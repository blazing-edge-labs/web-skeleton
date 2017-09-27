import React from 'react';
import { connectPage } from '../utils/page';
import Signup from '../containers/Signup';

const SignupPage = () => (
  <Signup />
);

export default connectPage()(SignupPage);
