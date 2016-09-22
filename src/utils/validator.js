import validator from 'validator';
import { confirmPasswordMsg, emailMsg, passwordMsg, requiredMsg }
 from '../constants/errors';

export function isRequired(value) {
  return value !== undefined ? null : requiredMsg;
}

export function isEmail(value) {
  return validator.isEmail(String(value)) ? null : emailMsg;
}

export function isPassword(value) {
  return value.length >= 8 && (/[A-Z]/).test(value) && (/[a-z]/).test(value) &&
    (/[0-9]/).test(value) ? null : passwordMsg;
}

export function isEqual(value, comparison) {
  return validator.equals(String(value), String(comparison)) ? null :
    confirmPasswordMsg;
}
