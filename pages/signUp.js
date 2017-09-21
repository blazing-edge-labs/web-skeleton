import React from 'react';
import { connectPage, IncludePageCSS } from '../utils/page';
import Signup from '../containers/Signup';

const SignupPage = () => (
  <div>
    <IncludePageCSS />
    <Signup />
  </div>
);

export default connectPage()(SignupPage);
