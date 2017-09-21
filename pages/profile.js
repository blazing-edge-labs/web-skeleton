import React from 'react';
import { connectPage, IncludePageCSS } from '../utils/page';
import App from '../containers/App';
import Profile from '../containers/Profile';

const HomePage = () => (
  <App>
    <div>
      <IncludePageCSS />
      <Profile />
    </div>
  </App>
);

export default connectPage()(HomePage);
