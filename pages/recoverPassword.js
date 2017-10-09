import React from 'react'
import PropTypes from 'prop-types'
import { connectPage } from 'utils/page'
import RecoverPassword from 'containers/RecoverPassword'

const RecoverPasswordPage = ({ url }) => (
  <RecoverPassword params={url.query} />
)

RecoverPasswordPage.propTypes = {
  url: PropTypes.shape({
    query: PropTypes.object.isRequired,
  }).isRequired,
}

export default connectPage()(RecoverPasswordPage)
