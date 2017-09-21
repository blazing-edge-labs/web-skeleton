import React from 'react';
import { connectPage, IncludePageCSS } from '../utils/page';
import App from '../containers/App';
import EditProfile from '../containers/EditProfile';

const EditProfilePage = () => (
  <App>
    <div>
      <IncludePageCSS />
      <EditProfile />
    </div>
  </App>
);

export default connectPage()(EditProfilePage);
