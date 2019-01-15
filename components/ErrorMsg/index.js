import React from 'react'
import PropTypes from 'prop-types'

const ErrorMsg = ({ children }) => (
  <p>
    <i className="fa fa-exclamation-triangle" />
    {children}
  </p>
)

ErrorMsg.propTypes = {
  children: PropTypes.string.isRequired,
}

export default ErrorMsg
