import React from 'react'
import { shallow } from 'enzyme'
import { AppComponent } from 'containers/App'
import * as Actions from 'actions/auth'
import { Router } from 'routes'

describe('App component', () => {
  const children = <div>Test</div>
  const mockDispatch = jest.fn(z => z)
  Router.pushRoute = jest.fn()

  const wrapper = shallow(
    <AppComponent
      dispatch={mockDispatch}
    >{children}</AppComponent>
  )
  const instance = wrapper.instance()
  Actions.logoutAction = jest.fn(() => Promise.resolve())

  it('handleLogout method', () => {
    const mockPreventDefault = jest.fn()
    const event = {
      preventDefault: mockPreventDefault,
    }
    instance.handleLogout(event)

    expect(mockPreventDefault).toHaveBeenCalledTimes(1)
    expect(Actions.logoutAction).toHaveBeenCalled()
    expect(mockDispatch).toHaveBeenCalled()

    return mockDispatch.mock.calls[0][0].then(() => {
      expect(Router.pushRoute).toHaveBeenCalledWith('/login')
    })
  })
})
