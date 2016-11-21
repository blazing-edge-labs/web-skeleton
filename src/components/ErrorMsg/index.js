import React, { PropTypes } from 'react';

const ErrorMsg = ({ children }) =>
  <p>
    <i className="fa fa-exclamation-triangle" />
    {children}
  </p>;

ErrorMsg.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ErrorMsg;
