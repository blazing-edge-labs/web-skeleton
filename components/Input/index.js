import React from 'react';
import PropTypes from 'prop-types';

import InlineError from '../InlineError';
import { hasError } from '../../utils/validator';
import './style.local.scss';

const Input = (props) => {
  const { label, input, meta, textarea, ...rest } = props;

  const attributes = {
    id: input.name,
    ...input,
    ...rest,
  };

  const styleName = hasError(meta) ? 'error' : '';

  return (
    <div styleName={styleName}>
      <label className="label" htmlFor={input.name}>
        {label}
      </label>
      {
        textarea
        ? <textarea rows={4} {...attributes} styleName="input" />
        : <input {...attributes} styleName="input" />
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
