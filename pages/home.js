import React from 'react';
import { connectPage, IncludePageCSS } from '../utils/page';
import App from '../containers/App';
import Home from '../containers/Home';

const HomePage = () => (
  <App>
    <div>
      <IncludePageCSS />
      <Home />
    </div>
  </App>
);

export default connectPage()(HomePage);
