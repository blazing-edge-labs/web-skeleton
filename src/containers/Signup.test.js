import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { SignupComponent, validate } from './Signup';
import * as Actions from '../actions/auth';

describe('Signup component', () => {
  const mockDispatch = jest.fn();
  const wrapper = shallow(
    <SignupComponent
      dispatch={mockDispatch}
      handleSubmit={() => {}}
      router={{}}
      submitting={false}
    />
  );
  const instance = wrapper.instance();
  Actions.signupFetch = jest.fn(values => ({}));

  it('validate function success', () => {
    const values = fromJS({
      email: 'test@email.com',
      password: 'Aa123456',
    });
    const errors = validate(values);

    expect(errors).toEqual({ email: null, password: null });
  });

  it('validate function fail', () => {
    const values = fromJS({
      email: 'notAnEmail',
      password: undefined,
    });
    const errors = validate(values);

    expect(errors).toEqual({
      email: 'Invalid e-mail address.',
      password: 'Required field.',
    });
  });

  it('handleSignup method', () => {
    const values = fromJS({
      email: 'test@email.com',
      password: 'Aa123456',
    });
    instance.handleSignup(values);

    expect(Actions.signupFetch).toHaveBeenCalledWith(values, {});
    expect(mockDispatch).toHaveBeenCalledWith({});
  });
});
