import React from 'react';
import { connectPage } from '../utils/page';
import App from '../containers/App';
import FormExample from '../containers/FormExample';

const FormExamplePage = () => (
  <App>
    <FormExample />
  </App>
);

export default connectPage()(FormExamplePage);
