import reducer from './auth';
import { EMAIL_CONFIRM_SUCCESS, EMAIL_CONFIRM_FAILED, EMAIL_RESEND_FETCHING,
  EMAIL_RESEND_SUCCESS, EMAIL_RESEND_FAILED } from '../constants/actions';

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      emailConfirmationError: null,
      emailConfirmationSuccess: false,
      emailResendError: null,
      emailResendSuccess: false,
    });
  });

  it('should handle EMAIL_CONFIRM_SUCCESS', () => {
    expect(reducer(undefined, {
      type: EMAIL_CONFIRM_SUCCESS,
    })).toEqual({
      emailConfirmationError: null,
      emailConfirmationSuccess: true,
      emailResendError: null,
      emailResendSuccess: false,
    });
  });

  it('should handle EMAIL_CONFIRM_FAILED', () => {
    const error = 'Confirmation Failed';

    expect(reducer(undefined, {
      type: EMAIL_CONFIRM_FAILED,
      error,
    })).toEqual({
      emailConfirmationError: error,
      emailConfirmationSuccess: false,
      emailResendError: null,
      emailResendSuccess: false,
    });
  });

  it('should handle EMAIL_RESEND_FETCHING', () => {
    expect(reducer(undefined, {
      type: EMAIL_RESEND_FETCHING,
    })).toEqual({
      emailConfirmationError: null,
      emailConfirmationSuccess: false,
      emailResendError: null,
      emailResendSuccess: false,
    });
  });

  it('should handle EMAIL_RESEND_SUCCESS', () => {
    expect(reducer(undefined, {
      type: EMAIL_RESEND_SUCCESS,
    })).toEqual({
      emailConfirmationError: null,
      emailConfirmationSuccess: false,
      emailResendError: null,
      emailResendSuccess: true,
    });
  });

  it('should handle EMAIL_RESEND_FAILED', () => {
    const error = 'Resend Failed';

    expect(reducer(undefined, {
      type: EMAIL_RESEND_FAILED,
      error,
    })).toEqual({
      emailConfirmationError: null,
      emailConfirmationSuccess: false,
      emailResendError: error,
      emailResendSuccess: false,
    });
  });
});
