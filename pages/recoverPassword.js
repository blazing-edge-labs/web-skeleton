import React from 'react';
import PropTypes from 'prop-types';
import { connectPage, IncludePageCSS } from '../utils/page';
import RecoverPassword from '../containers/RecoverPassword';

const RecoverPasswordPage = ({ url }) => (
  <div>
    <IncludePageCSS />
    <RecoverPassword params={url.query} />
  </div>
);

RecoverPasswordPage.propTypes = {
  url: PropTypes.shape({
    query: PropTypes.object.isRequired,
  }).isRequired,
};

export default connectPage()(RecoverPasswordPage);
