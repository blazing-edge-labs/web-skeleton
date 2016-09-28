import validator from 'validator';
import { confirmPasswordMsg, emailMsg, notUsedEmailMsg, passwordMsg,
  requiredMsg, usedEmailMsg } from '../constants/errors';

const isEqual = (value, comparison) =>
  validator.equals(String(value), String(comparison));

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

export function isSamePassword(value, comparison) {
  return isEqual(String(value), String(comparison)) ? null : confirmPasswordMsg;
}

export function isUsedEmail(newEmail, oldEmail, shouldBeUsed) {
  const isEql = isEqual(newEmail, oldEmail);
  if (shouldBeUsed) return isEql ? null : notUsedEmailMsg;
  return isEql ? usedEmailMsg : null;
}
