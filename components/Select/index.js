import React from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'

import selectStyle from 'react-select/dist/react-select.css'
import s from 'components/Select/style.scss'
import applyStyles from 'next-style-loader/applyStyles'

import InlineError from 'components/InlineError'
import { hasError } from 'utils/validator'


const Select = (props) => {
  const { label, input, meta, ...rest } = props
  const { name } = input

  const selectProps = {
    ...rest,
    ...input,
    onBlur: () => input.onBlur(input.value),
    inputProps: {
      id: name,
    },
  }

  return (
    <div className={`${s.root} ${hasError(meta) ? s.error : ''}`}>
      <label htmlFor={name}>
        {label}
      </label>
      <ReactSelect {...selectProps} />
      <InlineError meta={meta} />
    </div>
  )
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  options: PropTypes.array,
}

export default applyStyles([selectStyle, s])(Select)
