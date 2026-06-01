export const system = {
  role: {
    title: 'Roles',
    description: 'Roles description',
    datagrid: {
      name: 'Name',
      status: 'Status',
      created_at: 'Created at',
    },
    create: {
      title: 'Create role',
      description: 'Register a new role in the platform.',
    },
    update: {
      title: 'Update role',
      description: 'Update data about this role in the platform.',
    },
    fields: {
      name: 'Name',
      status: 'Status',
    },
    delete: {
      title: 'Delete role',
      description:
        'This action will permanently remove the role and cannot be undone.',
    },
    buttons: {
      permission: 'Manager role permissions',
    },
  },

  user_company: {
    title: 'Company users',
    description: 'Company users description',
    datagrid: {
      user: 'User Data',
      nickname: 'Nickname',
      status: 'Status',
      last_access: 'Last access at',
    },
    create: {
      title: 'Create Company User',
      description: 'Register a new company user in the platform.',
    },
    update: {
      title: 'Update Company User',
      description: 'Update data about this company user in the platform.',
    },
    fields: {
      nickname: 'Nickname',
      status: 'Status',
    },
    delete: {
      title: 'Delete company user',
      description:
        'This action will permanently remove the company user and cannot be undone.',
    },
    buttons: {
      modules: 'Manager company user modules',
    },
  },
};
