import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import applyStyles from '../../next-style-loader/applyStyles'

import s from './style.scss'

const HomeComponent = () => {
  return (
    <main>
      <p className={s.test}>Home Page!</p>
    </main>
  )
}

// export default HomeComponent;

HomeComponent.propTypes = {
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default connect(state => ({
  auth: state.auth,
  user: state.user,
}))(applyStyles(s)(HomeComponent))
