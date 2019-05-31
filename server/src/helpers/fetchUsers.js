import fs from 'fs';
import util from 'util';
import { getUser } from '../helpers';

const readDir = util.promisify(fs.readdir);

export default async function fetchUsers() {
  const files = await readDir('./data/users');
  let users = files
    .filter(filename => filename.includes('.json'))
    .map(filename => getUser(filename.replace('.json', '')));

  users = await Promise.all(users);
  return users;
}