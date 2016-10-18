import React from 'react';
import { shallow } from 'enzyme';
import { ProfileFormComponent } from './';

describe('ProfileForm component', () => {
  it('renders and submits on click', () => {
    const reduxFormProps = {
      error: null,
      handleProfileUpdate: jest.fn(),
      handleSubmit: jest.fn(cb => cb()),
      submitSucceeded: false,
      submitting: false,
    };
    const wrapper = shallow(
      <ProfileFormComponent {...reduxFormProps} />
    );
    wrapper.find('button').simulate('click');

    expect(reduxFormProps.handleSubmit)
      .toHaveBeenCalledWith(reduxFormProps.handleProfileUpdate);
    expect(reduxFormProps.handleProfileUpdate).toHaveBeenCalled();
  });
});
