import React from 'react'
import PropTypes from 'prop-types'

import { hasError } from 'utils/validator'

import s from 'components/InlineError/style.scss'

const ErrorMsg = ({ meta, error }) => (
  <div className={s.inlineError}>
    {error || (meta && hasError(meta) && meta.error)}
  </div>
)

ErrorMsg.propTypes = {
  meta: PropTypes.object,
  error: PropTypes.string,
}

export default ErrorMsg
