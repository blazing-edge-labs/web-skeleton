import React from 'react'
import { connectPage } from 'utils/page'
import App from 'containers/App'
import Profile from 'containers/Profile'

import { profileGetFetch } from 'actions/profile'

const ProfilePage = () => (
  <App>
    <Profile />
  </App>
)

ProfilePage.getInitialProps = async ({ store, isServer }) => {
  await store.dispatch(profileGetFetch())
  return { isServer }
}

export default connectPage()(ProfilePage)
