import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { RecoverPasswordComponent, validate } from './';
import * as Actions from '../../actions/auth';

describe('RecoverPassword component', () => {
  const mockDispatch = jest.fn();
  const mockRouter = {
    push: jest.fn(),
  };
  const wrapper = shallow(
    <RecoverPasswordComponent
      dispatch={mockDispatch}
      handleSubmit={() => {}}
      params={{ code: 'this.is.code' }}
      router={mockRouter}
      submitSucceeded={false}
      submitting={false}
    />
  );
  const instance = wrapper.instance();
  Actions.recoverPasswordFetch = jest.fn((values, cb) => { cb(); return {}; });

  it('validate function success', () => {
    const values = fromJS({
      password: 'Aa123456',
      confirmation: 'Aa123456',
    });
    const errors = validate(values);

    expect(errors).toEqual({ password: null, confirmation: null });
  });

  it('validate function fail', () => {
    const values = fromJS({
      password: 'wrong',
      confirmation: 'Bb123456',
    });
    const errors = validate(values);

    expect(errors).toEqual({
      password: 'Password has to be at least 8 characters long and contain at' +
        ' least one uppercase, lowercase and numeric character.',
      confirmation: 'Confirmation Password has to be equal.',
    });
  });

  it('handleChangePassword method', () => {
    const values = fromJS({
      password: 'Aa123456',
      confirmation: 'Aa123456',
    });
    const expected = {
      password: 'Aa123456',
      token: 'this.is.code',
    };
    instance.handleRecoverPassword(values);

    jest.runAllTimers();
    expect(Actions.recoverPasswordFetch)
      .toHaveBeenCalledWith(expected, jasmine.any(Function));
    expect(mockDispatch).toHaveBeenCalledWith({});
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });
});
