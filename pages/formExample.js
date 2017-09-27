import React from 'react';
import { connectPage, IncludePageCSS } from '../utils/page';
import App from '../containers/App';
import FormExample from '../containers/FormExample';

const FormExamplePage = () => (
  <App>
    <div>
      <IncludePageCSS />
      <FormExample />
    </div>
  </App>
);

export default connectPage()(FormExamplePage);
