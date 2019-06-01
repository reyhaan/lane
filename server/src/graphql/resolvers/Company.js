import { getUsers } from '../../helpers';

export default {
  count: async (root, args, { ctx }, info) => {
    if (root.employees) {
      const filteredUsers = root.employees.filter(
        user => user.company === root.id
      );
      return filteredUsers.length;
    } else {
      let users = await getUsers({ companyId: root.id });
      return users.length;
    }
  },
  employees: async (root, args, { ctx }, info) => {
    if (root.employees) {
      const filteredUsers = root.employees.filter(
        user => user.company === root.id
      );
      return filteredUsers;
    } else {
      let users = await getUsers({ companyId: root.id });
      console.log("NOT FILTERESD", root.id,  users)
      return users;
    }
  },
};
 