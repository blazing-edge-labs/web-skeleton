import React from 'react'
import { connectPage } from '../utils/page'
import App from '../containers/App'
import EditProfile from '../containers/EditProfile'

const EditProfilePage = () => (
  <App>
    <EditProfile />
  </App>
)

export default connectPage()(EditProfilePage)
