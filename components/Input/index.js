import React from 'react'
import PropTypes from 'prop-types'

import InlineError from 'components/InlineError'
import { hasError } from 'utils/validator'

import s from 'components/Input/style.scss'

const Input = (props) => {
  const { label, input, meta, textarea, className, ...rest } = props

  const attributes = {
    id: input.name,
    className: `${s.input} ${className || ''}`,
    ...input,
    ...rest,
  }

  return (
    <div className={hasError(meta) ? s.error : ''}>
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
  )
}

Input.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  textarea: PropTypes.bool,
}

export default Input
