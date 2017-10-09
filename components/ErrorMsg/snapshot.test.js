import React from 'react';
import renderer from 'react-test-renderer';
import ErrorMsg from './';

describe('ErrorMsg component snapshot', () => {
  it('renders basic required data', () => {
    const tree = renderer.create(<ErrorMsg>Something went wrong.</ErrorMsg>);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
