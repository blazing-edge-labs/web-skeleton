import React from 'react';
import { shallow } from 'enzyme';
import { AppComponent } from './App';
import * as Actions from '../actions/auth';

describe('App component', () => {
  const children = <div>Test</div>;
  const mockDispatch = jest.fn();
  const wrapper = shallow(
    <AppComponent
      children={children}
      dispatch={mockDispatch}
      router={{}}
    />
  );
  const instance = wrapper.instance();
  Actions.logoutAction = jest.fn(router => ({}));

  it('handleLogout method', () => {
    const mockPreventDefault = jest.fn();
    const event = {
      preventDefault: mockPreventDefault,
    };
    instance.handleLogout(event);

    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    expect(Actions.logoutAction).toHaveBeenCalledWith({});
    expect(mockDispatch).toHaveBeenCalledWith({});
  });
});
