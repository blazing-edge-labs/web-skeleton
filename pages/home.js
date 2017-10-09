import React from 'react';
import { connectPage } from '../utils/page';
import App from '../containers/App';
import Home from '../containers/Home';

const HomePage = () => (
  <App>
    <Home />
  </App>
);

export default connectPage()(HomePage);
