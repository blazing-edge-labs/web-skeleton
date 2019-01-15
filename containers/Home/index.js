import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import applyStyles from 'next-style-loader/applyStyles'

import s from 'containers/Home/style.scss'

const HomeComponent = () => {
  return (
    <main>
      <p className={s.test}>Home Page!</p>
    </main>
  )
}

// export default HomeComponent;

// HomeComponent.propTypes = {
//   auth: PropTypes.object.isRequired,
//   dispatch: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
// }

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
})

export default compose(
  connect(mapStateToProps),
  applyStyles(s)
)(HomeComponent)
