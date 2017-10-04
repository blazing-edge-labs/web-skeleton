import React from 'react';
import PropTypes from 'prop-types';

import { hasError } from '../../utils/validator';

import applyStyles from '../../next-style-loader/applyStyles';
import s from './style.scss';

const ErrorMsg = ({ meta, error }) =>
  <div className={s.inlineError}>
    {error || (meta && hasError(meta) && meta.error)}
  </div>;

ErrorMsg.propTypes = {
  meta: PropTypes.object,
  error: PropTypes.string,
};

export default applyStyles(s)(ErrorMsg);
