import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

import selectCSS from 'react-select/dist/react-select.css';
import css from './style.scss';

import InlineError from '../InlineError';
import { hasError } from '../../utils/validator';


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
    <div className={`root ${hasError(meta) ? 'error' : ''}`}>
      <style jsx global>{selectCSS}</style>
      <style jsx>{css}</style>
      <label htmlFor={name}>
        {label}
      </label>
      <ReactSelect {...selectProps} />
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
