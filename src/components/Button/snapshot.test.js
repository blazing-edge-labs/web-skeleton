import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheet, StyleSheetTestUtils } from 'aphrodite/no-important';
import Button from './';

describe('Button component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders basic required data', () => {
    const tree = renderer.create(<Button>Login</Button>);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders empty button', () => {
    const tree = renderer.create(<Button empty>Login</Button>);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
