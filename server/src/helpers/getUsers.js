import fs from 'fs';
import path from 'path';
import { getUser } from '../helpers';

export default async function getUsers(filter) {
  try {
    const files = fs.readdirSync(path.join(__dirname, '../../data/users'));
    const users = files.map(filename => getUser(filename.replace('.json', '')));
    const data = await Promise.all(users)
    
    if (!filter) {
      return data
    }

    const { name, email } = filter

    let filteredData = []

    if (name) {
      filteredData = data.filter(user => user.name === name)
    }
    
    if (email) {
      filteredData = data.filter(user => user.email === email)
    }

    return filteredData

  } catch(e) {
    throw new Error(e)
  }
}
