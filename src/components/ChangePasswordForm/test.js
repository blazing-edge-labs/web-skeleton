import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { ChangePasswordFormComponent, validate } from './';

describe('ChangePasswordForm component', () => {
  it('validate function success', () => {
    const values = fromJS({
      oldPassword: 'Aa123456',
      newPassword: 'Bb123456',
      confirmation: 'Bb123456',
    });
    const errors = validate(values);

    expect(errors).toEqual({
      oldPassword: null, newPassword: null, confirmation: null,
    });
  });

  it('validate function failed', () => {
    const values = fromJS({
      oldPassword: 'wrong',
      newPassword: undefined,
      confirmation: 'Cc123456',
    });
    const errors = validate(values);

    expect(errors).toEqual({
      oldPassword: 'Password has to be at least 8 characters long and contain' +
        ' at least one uppercase, lowercase and numeric character.',
      newPassword: 'Required field.',
      confirmation: 'Confirmation Password has to be equal.',
    });
  });

  it('renders and submits on click', () => {
    const reduxFormProps = {
      error: null,
      handleChangePassword: jest.fn(),
      handleSubmit: jest.fn(cb => cb()),
      submitSucceeded: false,
      submitting: false,
    };
    const wrapper = shallow(
      <ChangePasswordFormComponent {...reduxFormProps} />
    );
    wrapper.find('button').simulate('click');

    expect(reduxFormProps.handleSubmit)
      .toHaveBeenCalledWith(reduxFormProps.handleChangePassword);
    expect(reduxFormProps.handleChangePassword).toHaveBeenCalled();
  });
});
