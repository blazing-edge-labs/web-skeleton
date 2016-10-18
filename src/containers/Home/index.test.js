import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { HomeComponent } from './';
import * as Actions from '../../actions/auth';

describe('Home component', () => {
  const mockDispatch = jest.fn();
  const wrapper = shallow(
    <HomeComponent
      dispatch={mockDispatch}
      user={fromJS({ confirmed: true, email: 'test@email.com' })}
    />
  );
  const instance = wrapper.instance();
  Actions.emailResendFetch = jest.fn(values => ({}));

  it('handleEmailResend method', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    instance.handleEmailResend(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(Actions.emailResendFetch)
      .toHaveBeenCalledWith({ email: 'test@email.com' });
    expect(mockDispatch).toHaveBeenCalledWith({});
  });
});
