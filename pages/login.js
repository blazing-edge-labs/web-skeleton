import React from 'react';
import { connectPage } from '../utils/page';
import Login from '../containers/Login';

const LoginPage = () => (
  <Login />
);

export default connectPage()(LoginPage);
