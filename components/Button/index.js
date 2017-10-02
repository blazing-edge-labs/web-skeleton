import React from 'react';
import PropTypes from 'prop-types';

import css from './style.scss';

const Button = ({ children, ...rest }) =>
  <button
    className="button"
    {...rest}
  >
    <style jsx>{css}</style>
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
