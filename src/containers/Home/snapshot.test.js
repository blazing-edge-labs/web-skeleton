import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import { HomeComponent } from './';

describe('Home component snapshot', () => {
  it('render without confirm message', () => {
    const tree = renderer.create(
      <HomeComponent
        auth={fromJS({ emailResendError: null, emailResendSuccess: false })}
        dispatch={() => {}}
        user={fromJS({ confirmed: true })}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render with confirm message', () => {
    const tree = renderer.create(
      <HomeComponent
        auth={fromJS({ emailResendError: null, emailResendSuccess: false })}
        dispatch={() => {}}
        user={fromJS({ confirmed: false })}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render with confirm message and email resent', () => {
    const tree = renderer.create(
      <HomeComponent
        auth={fromJS({ emailResendError: null, emailResendSuccess: true })}
        dispatch={() => {}}
        user={fromJS({ confirmed: false })}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render with confirm message and email resend error', () => {
    const error = 'Something went wrong';
    const tree = renderer.create(
      <HomeComponent
        auth={fromJS({ emailResendError: error, emailResendSuccess: false })}
        dispatch={() => {}}
        user={fromJS({ confirmed: false })}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
