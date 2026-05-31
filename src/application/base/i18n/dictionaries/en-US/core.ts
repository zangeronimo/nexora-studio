export const core = {
  company: {
    title: 'Companies',
    description: 'Companies description',
    datagrid: {
      name: 'Name',
      status: 'Status',
      created_at: 'Created at',
    },
    create: {
      title: 'Create company',
      description: 'Register a new company in the platform.',
    },
    update: {
      title: 'Update company',
      description: 'Update data about this company in the platform.',
    },
    fields: {
      name: 'Name',
      status: 'Status',
    },
    modules: {
      description: 'Select which modules the company has access to.',
    },
    delete: {
      title: 'Delete company',
      description:
        'This action will permanently remove the company and cannot be undone.',
    },
    buttons: {
      module: 'Manager company modules',
    },
  },
  module: {
    title: 'Modules',
    description: 'Modules description',
    datagrid: {
      name: 'Name',
      status: 'Status',
      created_at: 'Created at',
    },
    create: {
      title: 'Create module',
      description: 'Register a new module in the platform.',
    },
    update: {
      title: 'Update module',
      description: 'Update data about this module in the platform.',
    },
    fields: {
      name: 'Name',
      status: 'Status',
    },
    delete: {
      title: 'Delete module',
      description:
        'This action will permanently remove the module and cannot be undone.',
    },
    permissions: {
      title: 'Manager permissions to this module',
      create: {
        title: 'Create permission',
      },
      update: {
        title: 'Update permission',
      },
      fields: {
        code: 'Code',
        label: 'Label',
        status: 'Status',
      },
    },
  },
  user: {
    title: 'Users',
    description: 'Users description',
    datagrid: {
      name: 'Name',
      email: 'E-mail',
      status: 'Status',
      created_at: 'Created at',
    },
    create: {
      title: 'Create user',
      description: 'Register a new user in the platform.',
    },
    update: {
      title: 'Update user',
      description: 'Update data about this user in the platform.',
    },
    fields: {
      name: 'Name',
      email: 'E-mail',
      password: 'Password',
      status: 'Status',
    },
    delete: {
      title: 'Delete user',
      description:
        'This action will permanently remove the user and cannot be undone.',
    },
  },
};
