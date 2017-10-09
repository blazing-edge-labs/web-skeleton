import React from 'react'
import renderer from 'react-test-renderer'
import { AppComponent } from 'containers/App'

describe('App component snapshot', () => {
  it('renders', () => {
    const children = <div>Test</div>
    const tree = renderer.create(
      <AppComponent
        dispatch={() => {}}
      >
        {children}
      </AppComponent>
    )

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
