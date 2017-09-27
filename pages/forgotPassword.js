import React from 'react';
import { connectPage } from '../utils/page';
import ForgotPassword from '../containers/ForgotPassword';

const ForgotPasswordPage = () => (
  <ForgotPassword />
);

export default connectPage()(ForgotPasswordPage);
