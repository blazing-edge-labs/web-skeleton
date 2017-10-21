import React from 'react'
import { connectPage } from 'utils/page'
import App from 'containers/App'
import Profile from 'containers/Profile'

const HomePage = () => (
  <App>
    <Profile />
  </App>
)

export default connectPage()(HomePage)
