import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import { HomeComponent } from './';

describe('Home component snapshot', () => {
  it('render with confirm message', () => {
    const tree = renderer.create(
      <HomeComponent
        dispatch={() => {}}
        user={fromJS({ confirmed: false })}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render without confirm message', () => {
    const tree = renderer.create(
      <HomeComponent
        dispatch={() => {}}
        user={fromJS({ confirmed: true })}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
