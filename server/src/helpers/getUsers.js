import fs from 'fs';
import util from 'util';
import path from 'path';
import { getUser } from '../helpers';

const readDir = util.promisify(fs.readdir);

export default async function getUsers(filter) {
  try {
    const files = await readDir(path.join(__dirname, '../../data/users'));
    const users = files.map(filename => getUser(filename.replace('.json', '')));
    const data = await Promise.all(users)
    
    if (!filter) {
      return data
    }

    const { name, email, companyId } = filter

    let filteredData = []

    if (name) {
      filteredData = data.filter(user => user.name === name)
    }
    
    if (email) {
      filteredData = data.filter(user => user.email === email)
    }

    if (companyId) {
      filteredData = data.filter(user => user.company === companyId)
    }

    return filteredData

  } catch(e) {
    throw new Error(e)
  }
}
