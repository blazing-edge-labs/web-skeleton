import React from 'react';
import renderer from 'react-test-renderer';
import { HomeComponent } from './';

describe('Home component snapshot', () => {
  it('render without confirm message', () => {
    const tree = renderer.create(
      <HomeComponent
        auth={{ emailResendError: null, emailResendSuccess: false }}
        dispatch={() => {}}
        user={{ confirmed: true }}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render with confirm message', () => {
    const tree = renderer.create(
      <HomeComponent
        auth={{ emailResendError: null, emailResendSuccess: false }}
        dispatch={() => {}}
        user={{ confirmed: false }}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render with confirm message and email resent', () => {
    const tree = renderer.create(
      <HomeComponent
        auth={{ emailResendError: null, emailResendSuccess: true }}
        dispatch={() => {}}
        user={{ confirmed: false }}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render with confirm message and email resend error', () => {
    const error = 'Something went wrong';
    const tree = renderer.create(
      <HomeComponent
        auth={{ emailResendError: error, emailResendSuccess: false }}
        dispatch={() => {}}
        user={{ confirmed: false }}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
