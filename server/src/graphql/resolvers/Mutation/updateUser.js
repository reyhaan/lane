import { setUser } from '../../../helpers';

export default async function User(root, { user }, { ctx }, info) {
  // #### DONE_todo: 1 this throws a unfriendly (and potentially unsafe) error if a non-existnant user ID is entered.
  // how can we check for a non-existing user id and throw a more friendly error.

  // #### DONE_todo: 2 why is this update overwriting existing user data? Need to fix this so that just data input is
  // updated rather than overwritting all the data.

  // user.id = baseConverter.decode(user.id)

  await setUser(user);

  return user;
}
