import { setUser } from '../../../helpers';
import { handleError } from '../../../Utils/errorUtils';
import { errors } from '../../../Utils/enumUtils';

export default async function User(root, { user }, { ctx }, info) {
  // #### DONE_todo: 1 this throws a unfriendly (and potentially unsafe) error if a non-existnant user ID is entered.
  // how can we check for a non-existing user id and throw a more friendly error.

  // #### DONE_todo: 2 why is this update overwriting existing user data? Need to fix this so that just data input is
  // updated rather than overwritting all the data.

  await setUser(user);

  return true;
}
