import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { EmailConfirmComponent } from './';
import * as Actions from '../../actions/auth';

describe('EmailConfirm component', () => {
  const mockDispatch = jest.fn();
  const mockRouter = {
    push: jest.fn(),
  };
  const wrapper = shallow(
    <EmailConfirmComponent
      auth={fromJS({
        emailConfirmationSuccess: false,
        emailConfirmationError: false,
      })}
      dispatch={mockDispatch}
      params={{ code: 'this.is.code' }}
      router={mockRouter}
    />
  );
  const instance = wrapper.instance();
  Actions.emailConfirmFetch = jest.fn((values, cb) => cb());

  it('componentDidMount method', () => {
    instance.componentDidMount();

    jest.runAllTimers();
    expect(mockRouter.push).toHaveBeenCalledWith('/');
    expect(Actions.emailConfirmFetch)
      .toHaveBeenCalledWith({ token: 'this.is.code' }, jasmine.any(Function));
    expect(mockDispatch).toHaveBeenCalled();
  });
});
