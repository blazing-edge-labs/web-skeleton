import { fromJS } from 'immutable';
import reducer from './auth';
import { NEW_EMAIL_CONFIRM_SUCCESS, EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_FAILED } from '../constants/actions';

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({
      emailConfirmationError: null,
      emailConfirmationSuccess: false,
    }));
  });

  it('should handle EMAIL_CONFIRM_SUCCESS', () => {
    expect(reducer(undefined, {
      type: EMAIL_CONFIRM_SUCCESS,
    })).toEqual(fromJS({
      emailConfirmationError: null,
      emailConfirmationSuccess: true,
    }));
  });

  it('should handle NEW_EMAIL_CONFIRM_SUCCESS', () => {
    expect(reducer(undefined, {
      type: NEW_EMAIL_CONFIRM_SUCCESS,
    })).toEqual(fromJS({
      emailConfirmationError: null,
      emailConfirmationSuccess: true,
    }));
  });

  it('should handle EMAIL_CONFIRM_FAILED', () => {
    const error = 'Confirmation Failed';

    expect(reducer(undefined, {
      type: EMAIL_CONFIRM_FAILED,
      error,
    })).toEqual(fromJS({
      emailConfirmationError: error,
      emailConfirmationSuccess: false,
    }));
  });
});
