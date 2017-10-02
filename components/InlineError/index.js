import React from 'react';
import PropTypes from 'prop-types';

import { hasError } from '../../utils/validator';
import css from './style.scss';

const ErrorMsg = ({ meta, error }) =>
  <div className="inlineError">
    <style jsx>{css}</style>
    {error || (meta && hasError(meta) && meta.error)}
  </div>;

ErrorMsg.propTypes = {
  meta: PropTypes.object,
  error: PropTypes.string,
};

export default ErrorMsg;
