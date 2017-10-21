import React from 'react'
import renderer from 'react-test-renderer'
import InlineStyleControls from 'components/InlineStyleControls'

describe('InlineStyleControls component snapshot', () => {
  it('renders basic required data', () => {
    const tree = renderer.create(
      <InlineStyleControls
        editorState={{
          getCurrentInlineStyle: () => null,
        }}
        onToggle={() => {}}
      />
    )

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
