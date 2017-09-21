import React from 'react';
import PropTypes from 'prop-types';

import './style.local.scss';

const Button = ({ children, ...rest }) =>
  <button
    styleName="button"
    {...rest}
  >
    {children}
  </button>;

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
};

export default Button;
