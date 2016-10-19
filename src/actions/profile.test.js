import * as profile from './profile';
import { PROFILE_UPDATE_SUCCESS } from '../constants/actions';

const user = {
  bio: null,
  confirmed: false,
  createdAt: '2016-10-06T14:55:40.708Z',
  email: 'test@email.com',
  firstname: null,
  id: 1,
  lastname: null,
  resourceId: 1,
  updatedAt: '2016-10-06T14:55:40.722Z',
};

describe('profile action creators', () => {
  it('should create an action for successful profile update', () => {
    const expectedAction = {
      type: PROFILE_UPDATE_SUCCESS,
      user,
    };

    expect(profile.profileUpdateSuccess(user)).toEqual(expectedAction);
  });
});
