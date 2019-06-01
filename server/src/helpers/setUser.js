import fs from 'fs';
import util from 'util';
import { handleError } from '../Utils/errorUtils';
import { errors } from '../Utils/enumUtils';
import uuidBase62 from 'uuid-base62';
import { isValidBase16 } from '../Utils/stringUtils';
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

export default async function setUser(user) {
  let data, id, decoded_id; 
  if (!isValidBase16(user.id)) {
    decoded_id = uuidBase62.decode(user.id);
  }
  id = decoded_id

  try {
    data = await readFile(`./data/users/${id}.json`, 'utf8');
  } catch (e) {
    handleError(e, errors.UserNotFound);
  }
  
  data = JSON.parse(data);

  user.id = id

  data =  { ...data, ...user };
  
  try {
    return await writeFile(`./data/users/${id}.json`, JSON.stringify(data));
  } catch (e) {
    handleError(e, errors.GeneralIOError)
  }
}
