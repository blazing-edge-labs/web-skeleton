import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import { EmailConfirmComponent } from './EmailConfirm';

describe('EmailConfirm component snapshot', () => {
  it('renders with pending request', () => {
    const tree = renderer.create(
      <EmailConfirmComponent
        auth={fromJS({
          emailConfirmationSuccess: false,
          emailConfirmationError: false,
        })}
        dispatch={() => {}}
        params={{}}
        router={{}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with success', () => {
    const tree = renderer.create(
      <EmailConfirmComponent
        auth={fromJS({
          emailConfirmationSuccess: true,
          emailConfirmationError: false,
        })}
        dispatch={() => {}}
        params={{}}
        router={{}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with error', () => {
    const tree = renderer.create(
      <EmailConfirmComponent
        auth={fromJS({
          emailConfirmationSuccess: false,
          emailConfirmationError: 'Token not found',
        })}
        dispatch={() => {}}
        params={{}}
        router={{}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
