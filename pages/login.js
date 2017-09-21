import React from 'react';
import { connectPage, IncludePageCSS } from '../utils/page';
import Login from '../containers/Login';

const LoginPage = () => (
  <div>
    <IncludePageCSS />
    <Login />
  </div>
);

export default connectPage()(LoginPage);
