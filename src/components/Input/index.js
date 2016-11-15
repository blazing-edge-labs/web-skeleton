import React, { PropTypes } from 'react';
import ErrorMsg from '../ErrorMsg';

const Input = (props) => {
  const { id, label, input, meta: { active, touched, error }, textarea,
    ...rest } = props;
  const attributes = {
    ...input,
    ...rest,
    id: `${id}-${input.name}`,
  };

  return (
    <div>
      <label htmlFor={`${id}-${input.name}`}>
        {label}
      </label>
      {textarea ? <textarea {...attributes} /> : <input {...attributes} />}
      {!active && touched && error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  textarea: PropTypes.bool,
};

export default Input;
