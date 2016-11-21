import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import InlineStyleControls from './';

describe('InlineStyleControls component snapshot', () => {
  it('renders basic required data', () => {
    const tree = renderer.create(
      <InlineStyleControls
        editorState={{
          getCurrentInlineStyle: () => fromJS({}),
        }}
        onToggle={() => {}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
