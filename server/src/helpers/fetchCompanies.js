import fs from 'fs';
import util from 'util';
import { getCompany } from '../helpers';

const readDir = util.promisify(fs.readdir);

export default async function fetchCompanies(users) {
  const files = await readDir('./data/companies');
  let companies = files
    .filter(filename => filename.includes('.json'))
    .map(filename => getCompany(filename.replace('.json', ''), users));

  companies = await Promise.all(companies);
  return companies;
}
