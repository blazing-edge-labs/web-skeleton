import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { ProfileComponent } from './';
import * as Actions from '../../actions/profile';

describe('Profile component', () => {
  const mockDispatch = jest.fn();
  const wrapper = shallow(
    <ProfileComponent dispatch={mockDispatch} user={fromJS({ id: 1 })} />
  );
  const instance = wrapper.instance();
  Actions.profileGetFetch = jest.fn(() => ({}));

  it('componentDidMount method', () => {
    instance.componentDidMount();

    expect(Actions.profileGetFetch).toHaveBeenCalledWith(1);
    expect(mockDispatch).toHaveBeenCalledWith({});
  });
});
