import { EMAIL_CONFIRM_SUCCESS, EMAIL_CONFIRM_FAILED }
  from '../constants/actions';

const initialState = {
  emailConfirmationError: null,
  emailConfirmationSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CONFIRM_SUCCESS:
      return Object.assign({}, state, {
        emailConfirmationError: null,
        emailConfirmationSuccess: true,
      });
    case EMAIL_CONFIRM_FAILED:
      return Object.assign({}, state, {
        emailConfirmationError: action.error,
        emailConfirmationSuccess: false,
      });
    default:
      return state;
  }
};
