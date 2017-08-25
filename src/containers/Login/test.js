import React from 'react';
import { shallow } from 'enzyme';
import { LoginComponent, validate } from './';
import * as Actions from '../../actions/auth';

describe('Login component', () => {
  const mockDispatch = jest.fn();
  const mockRouter = {
    push: jest.fn(),
  };
  const wrapper = shallow(
    <LoginComponent
      dispatch={mockDispatch}
      form="Form"
      handleSubmit={() => {}}
      router={mockRouter}
      submitting={false}
    />
  );
  const instance = wrapper.instance();
  Actions.loginFetch = jest.fn((values, cb) => cb());

  it('validate function success', () => {
    const values = {
      email: 'test@email.com',
      password: 'Aa123456',
    };
    const errors = validate(values);

    expect(errors).toEqual({ email: null, password: null });
  });

  it('validate function fail', () => {
    const values = {
      email: 'notAnEmail',
      password: undefined,
    };
    const errors = validate(values);

    expect(errors).toEqual({
      email: 'Invalid e-mail address.',
      password: 'Required field.',
    });
  });

  it('handleLogin method', () => {
    const values = {
      email: 'test@email.com',
      password: 'Aa123456',
    };
    instance.handleLogin(values);

    expect(Actions.loginFetch)
      .toHaveBeenCalledWith(values, jasmine.any(Function));
    expect(mockRouter.push).toHaveBeenCalledWith('/');
    expect(mockDispatch).toHaveBeenCalled();
  });
});
