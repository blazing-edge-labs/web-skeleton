import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { ChangeEmailFormComponent, validate } from './ChangeEmailForm';

describe('ChangeEmailForm component', () => {
  it('validate function success', () => {
    const values = fromJS({
      oldEmail: 'old@email.com',
      newEmail: 'new@email.com',
      password: 'Aa123456',
    });
    const initialValues = fromJS({
      oldEmail: 'old@email.com',
    });
    const errors = validate(values, { initialValues });

    expect(errors).toEqual({ oldEmail: null, newEmail: null, password: null, });
  });

  it('validate function fails', () => {
    const values = fromJS({
      oldEmail: 'new@email.com',
      newEmail: 'old@email.com',
      password: 'wrong',
    });
    const initialValues = fromJS({
      oldEmail: 'old@email.com',
    });
    const errors = validate(values, { initialValues });

    expect(errors).toEqual({
      oldEmail: 'This is not your current email.',
      newEmail: 'You are already using this email.',
      password: 'Password has to be at least 8 characters long and contain at' +
        ' least one uppercase, lowercase and numeric character.',
    });
  });

  it('renders and submits on click', () => {
    const reduxFormProps = {
      error: null,
      handleChangeEmail: jest.fn(),
      handleSubmit: jest.fn(cb => cb()),
      submitSucceeded: false,
      submitting: false,
    };
    const wrapper = shallow(
      <ChangeEmailFormComponent {...reduxFormProps} />
    );
    wrapper.find('button').simulate('click');

    expect(reduxFormProps.handleSubmit)
      .toHaveBeenCalledWith(reduxFormProps.handleChangeEmail);
    expect(reduxFormProps.handleChangeEmail).toHaveBeenCalled();
  });
});
