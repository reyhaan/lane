import { fetchCompanies, fetchUsers } from '../../../helpers';

export default async function companies(root, args, { ctx }, info) {
  const users = await fetchUsers();
  const companies = await fetchCompanies(users);
  return companies;
}
