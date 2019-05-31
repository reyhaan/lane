import fs from 'fs';
import util from 'util';
const readFile = util.promisify(fs.readFile);

export default async function getCompany(id, users = null) {
  const data = await readFile(`./data/companies/${id}.json`, 'utf8');
  const company = JSON.parse(data);

  if (users) {
    company.employees = users
  }

  return company

}
