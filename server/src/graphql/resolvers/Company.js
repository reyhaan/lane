import { getUsers } from '../../helpers';

export default {
  employees: async (root, args, { ctx }, info) => {
    // console.log("===========", root.employees)
    if (root.employees) {
      const filteredUsers = root.employees.filter(
        user => user.company === root.id
      );
      return filteredUsers;
    } else {
      let users = await getUsers({ company: root.id });
      return users;
    }
  },
};
 