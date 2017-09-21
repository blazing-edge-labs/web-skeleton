import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

import InlineError from '../InlineError';
import { hasError } from '../../utils/validator';

import ss from './style.local.scss';

const Select = (props) => {
  const { label, input, meta, ...rest } = props;
  const { name } = input;

  const selectProps = {
    ...rest,
    ...input,
    onBlur: () => input.onBlur(input.value),
    inputProps: {
      id: name,
    },
  };

  return (
    <div styleName={`${hasError(meta) ? 'ss.error' : ''}`}>
      <label htmlFor={name}>
        {label}
      </label>
      <ReactSelect {...selectProps} styleName="ss.select" />
      <InlineError meta={meta} />
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  options: PropTypes.array,
};

export default Select;
