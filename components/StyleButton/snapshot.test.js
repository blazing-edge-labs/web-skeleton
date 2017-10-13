import React from 'react'
import renderer from 'react-test-renderer'
import StyleButton from './'

describe('StyleButton component snapshot', () => {
  it('renders basic required data', () => {
    const tree = renderer.create(
      <StyleButton
        label="H1"
        onToggle={() => {}}
        style="header-one"
      />
    )

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
