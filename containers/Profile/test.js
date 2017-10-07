import React from 'react'
import { shallow } from 'enzyme'
import { ProfileComponent } from './'
import * as Actions from '../../actions/profile'

describe('Profile component', () => {
  const mockDispatch = jest.fn(z => z)
  const wrapper = shallow(
    <ProfileComponent dispatch={mockDispatch} user={{ id: 1 }} />
  )
  const instance = wrapper.instance()
  Actions.profileGetFetch = jest.fn(() => ({}))

  it('componentDidMount method', () => {
    instance.componentDidMount()

    expect(Actions.profileGetFetch).toHaveBeenCalledWith()
    expect(mockDispatch).toHaveBeenCalledWith({})
  })
})
