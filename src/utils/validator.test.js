import { isEqual, isRequired, isEmail, isPassword, isSamePassword,
  isUsedEmail } from './validator';

describe('validator util', () => {
  it('isEqual method returns true', () => {
    expect(isEqual('test@email.com', 'test@email.com')).toBeTruthy();
  });

  it('isEqual method returns false', () => {
    expect(isEqual('test@email.com', 'test2@email.com')).toBeFalsy();
  });

  it('isRequired method returns no error', () => {
    expect(isRequired('test@email.com')).toBeNull();
  });

  it('isRequired method returns error', () => {
    expect(isRequired(undefined)).toBe('Required field.');
  });

  it('isEmail method returns no error', () => {
    expect(isEmail('test@email.com')).toBeNull();
  });

  it('isEmail method returns error', () => {
    expect(isEmail('notemail.com')).toBe('Invalid e-mail address.');
  });

  it('isPassword method returns no error', () => {
    expect(isPassword('Aa123456')).toBeNull();
  });

  it('isPassword method returns error', () => {
    const error = 'Password has to be at least 8 characters long and contain ' +
      'at least one uppercase, lowercase and numeric character.';

    expect(isPassword('Aa12345')).toBe(error);
    expect(isPassword('aa123456')).toBe(error);
    expect(isPassword('AA12345')).toBe(error);
    expect(isPassword('AaAaAaAa')).toBe(error);
  });

  it('isSamePassword method returns no error', () => {
    expect(isSamePassword('Aa123456', 'Aa123456')).toBeNull();
  });

  it('isSamePassword method returns error', () => {
    expect(isSamePassword('Aa123456', 'Bb123456'))
      .toBe('Confirmation Password has to be equal.');
  });

  it('isUsedEmail method returns no error', () => {
    expect(isUsedEmail('test2@email.com', 'test@email.com', false)).toBeNull();
    expect(isUsedEmail('test@email.com', 'test@email.com', true)).toBeNull();
  });

  it('isUsedEmail method returns error', () => {
    expect(isUsedEmail('test2@email.com', 'test@email.com', true))
      .toBe('This is not your current email.');
    expect(isUsedEmail('test@email.com', 'test@email.com', false))
      .toBe('You are already using this email.');
  });
});
