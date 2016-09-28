import { fromJS } from 'immutable';
import { NEW_EMAIL_CONFIRM_SUCCESS, EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_FAILED } from '../constants/actions';

const initialState = fromJS({
  emailConfirmationError: null,
  emailConfirmationSuccess: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CONFIRM_SUCCESS:
    case NEW_EMAIL_CONFIRM_SUCCESS:
      return state.merge(fromJS({
        emailConfirmationError: null,
        emailConfirmationSuccess: true,
      }));
    case EMAIL_CONFIRM_FAILED:
      return state.merge(fromJS({
        emailConfirmationError: action.error,
        emailConfirmationSuccess: false,
      }));
    default:
      return state;
  }
};
