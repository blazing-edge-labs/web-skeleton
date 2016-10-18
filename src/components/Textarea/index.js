import React, { PropTypes } from 'react';

const Textarea = (props) => {
  const { label, input, meta: { active, touched, error }, ...other } = props;

  return (
    <div>
      <label htmlFor={input.name}>
        {label}
        <textarea id={input.name} {...input} {...other} />
      </label>
      {!active && touched && error && <p>{error}</p>}
    </div>
  );
};

Textarea.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default Textarea;
