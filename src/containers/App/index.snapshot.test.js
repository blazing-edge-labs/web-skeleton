import React from 'react';
import renderer from 'react-test-renderer';
import { AppComponent } from './';

describe('App component snapshot', () => {
  it('renders', () => {
    const children = <div>Test</div>;
    const tree = renderer.create(
      <AppComponent
        children={children}
        dispatch={() => {}}
        router={{}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
