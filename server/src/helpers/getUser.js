import fs, { readFileSync } from 'fs';
import util from 'util';
import uuidBase62 from 'uuid-base62';
import { isValidBase16 } from '../Utils/stringUtils';
const readFile = util.promisify(fs.readFile);

export default async function getUser(id) {
  try {
    if (!isValidBase16(id)) {
      id = uuidBase62.decode(id);
    }
    const data = readFileSync(`./data/users/${id}.json`, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    throw new Error(e)
  }
}
