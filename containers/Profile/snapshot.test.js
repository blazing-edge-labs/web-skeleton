import React from 'react'
import renderer from 'react-test-renderer'
import { ProfileComponent } from 'containers/Profile'

describe('Profile component snapshot', () => {
  it('render all data', () => {
    const tree = renderer.create(
      <ProfileComponent
        dispatch={() => {}}
        user={{
          bio: 'My bio',
          email: 'test@email.com',
          firstname: 'John',
          image: 'http://linkToImage',
          lastname: 'Doe',
        }}
      />
    )

    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('render only required email', () => {
    const tree = renderer.create(
      <ProfileComponent
        dispatch={() => {}}
        user={{ email: 'test@email.com' }}
      />
    )

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
