import validator from 'validator';
import { CONFIRM_PASSWORD_MSG, EMAIL_MSG, PASSWORD_MSG, REQUIRED_MSG,
  USED_EMAIL_MSG } from '../constants/errors';

export const isEqual = (value, comparison) =>
  validator.equals(String(value), String(comparison));

export function isRequired(value) {
  return value !== undefined ? null : REQUIRED_MSG;
}

export function isEmail(value) {
  return validator.isEmail(String(value)) ? null : EMAIL_MSG;
}

export function isPassword(value) {
  return value.length >= 8 && (/[A-Z]/).test(value) && (/[a-z]/).test(value) &&
    (/[0-9]/).test(value) ? null : PASSWORD_MSG;
}

export function isSamePassword(value, comparison) {
  return isEqual(String(value), String(comparison)) ? null :
    CONFIRM_PASSWORD_MSG;
}

export function isUsedEmail(newEmail, currentEmail) {
  const isEql = isEqual(newEmail, currentEmail);
  return isEql ? USED_EMAIL_MSG : null;
}
