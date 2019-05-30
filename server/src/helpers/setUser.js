import fs from 'fs';
import util from 'util';
import { handleError } from '../Utils/errorUtils';
import { errors } from '../Utils/enumUtils';
import uuidBase62 from 'uuid-base62';
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

export default async function setUser(user) {
  let data; 
  const id = uuidBase62.encode(user.id);

  try {
    data = await readFile(`./data/users/${id}.json`, 'utf8');
  } catch (e) {
    handleError(e, errors.UserNotFound);
  }

  data = JSON.parse(data);
  data =  { ...data, ...user };
  
  try {
    return writeFile(`./data/users/${id}.json`, JSON.stringify(data));
  } catch (e) {
    handleError(e, errors.GeneralIOError)
  }
}
