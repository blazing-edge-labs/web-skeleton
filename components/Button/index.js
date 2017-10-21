import React from 'react'
import PropTypes from 'prop-types'

import applyStyles from 'next-style-loader/applyStyles'
import s from 'components/Button/style.scss'

const Button = ({ children, className, ...rest }) =>
  <button
    className={`${s.button} ${className || ''}`}
    {...rest}
  >
    {children}
  </button>

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
}

export default applyStyles(s)(Button)
