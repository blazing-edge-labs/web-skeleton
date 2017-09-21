import React from 'react';
import { connectPage, IncludePageCSS } from '../utils/page';
import ForgotPassword from '../containers/ForgotPassword';

const ForgotPasswordPage = () => (
  <div>
    <IncludePageCSS />
    <ForgotPassword />
  </div>
);

export default connectPage()(ForgotPasswordPage);
