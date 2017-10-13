import React from 'react'
import renderer from 'react-test-renderer'
import BlockStyleControls from './'

describe('BlockStyleControls component snapshot', () => {
  it('renders basic required data', () => {
    const func = () => ({ getBlockForKey: () => ({ getType: () => {} }) })
    const tree = renderer.create(
      <BlockStyleControls
        editorState={{
          getCurrentContent: func,
          getSelection: () => ({ getStartKey: () => {} }),
        }}
        onToggle={() => {}}
      />
    )

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
