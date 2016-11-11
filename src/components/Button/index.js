import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import styles from './styles';

const Button = ({ children, empty, ...rest }) =>
  <button
    className={css(empty && styles.empty)}
    {...rest}
  >{children}</button>;

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  empty: PropTypes.bool,
};

export default Button;
