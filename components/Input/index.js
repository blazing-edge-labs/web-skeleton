import React from 'react';
import PropTypes from 'prop-types';

import InlineError from '../InlineError';
import { hasError } from '../../utils/validator';
import css from './style.local.scss';

const Input = (props) => {
  const { label, input, meta, textarea, ...rest } = props;

  const attributes = {
    id: input.name,
    ...input,
    ...rest,
  };

  return (
    <div className={hasError(meta) ? 'error' : ''}>
      <style jsx>{css}</style>
      <label className="label" htmlFor={input.name}>
        {label}
      </label>
      {
        textarea
        ? <textarea rows={4} {...attributes} />
        : <input {...attributes} />
      }
      <InlineError meta={meta} />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  textarea: PropTypes.bool,
};

export default Input;
