import fs from 'fs';
import util from 'util';
import { handleError } from '../Utils/errorUtils';
import { errors } from '../Utils/enumUtils';
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

export default async function setUser(user) {
  let data; 
  
  try {
    data = await readFile(`./data/users/${user.id}.json`, 'utf8');
  } catch (e) {
    handleError(e, errors.UserNotFound)
  }

  data = JSON.parse(data)

  Object.keys(user).map(key => {
    data[key] = user[key]
    return true
  })
  return writeFile(`./data/users/${user.id}.json`, JSON.stringify(data));
}
