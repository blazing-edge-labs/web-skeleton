import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { HomeComponent } from './';
import * as Actions from '../../actions/auth';

describe('Home component', () => {
  const mockDispatch = jest.fn();
  const wrapper = shallow(
    <HomeComponent
      auth={fromJS({ emailResendSuccess: false, emailResendError: null })}
      dispatch={mockDispatch}
      user={fromJS({ id: 5, confirmed: true, email: 'test@email.com' })}
    />
  );
  const instance = wrapper.instance();
  Actions.emailResendFetch = jest.fn(() => ({}));

  it('handleEmailResend method', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    instance.handleEmailResend(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(Actions.emailResendFetch)
      .toHaveBeenCalledWith(5);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
