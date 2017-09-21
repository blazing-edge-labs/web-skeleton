import React from 'react';
import PropTypes from 'prop-types';

import { hasError } from '../../utils/validator';
import './style.local.scss';

const ErrorMsg = ({ meta, error }) =>
  <div styleName="inlineError">
    {error || (meta && hasError(meta) && meta.error)}
  </div>;

ErrorMsg.propTypes = {
  meta: PropTypes.object,
  error: PropTypes.string,
};

export default ErrorMsg;
