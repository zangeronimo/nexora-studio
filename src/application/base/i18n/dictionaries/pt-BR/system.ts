export const system = {
  role: {
    title: 'Papés',
    description: 'Papés descrição',
    datagrid: {
      name: 'Nome',
      status: 'Situação',
      created_at: 'Criado em',
    },
    create: {
      title: 'Criar papel',
      description: 'Cadastre um novo papel na plataforma.',
    },
    update: {
      title: 'Atualizar papel',
      description: 'Atualize os dados deste papel na plataforma.',
    },
    fields: {
      name: 'Nome',
      status: 'Situação',
    },
    delete: {
      title: 'Remover papel',
      description:
        'Esta ação removerá permanentemente o papel e não poderá ser desfeita.',
    },
  },

  user_company: {
    title: 'Usuários da empresa',
    description: 'Usuários da empresa descrição',
    datagrid: {
      user: 'Dados do usuário',
      nickname: 'Apelido',
      status: 'Situação',
      last_access: 'Último acesso em',
    },
    create: {
      title: 'Criar Usuário da empresa',
      description: 'Cadastre um novo usuário da empresa na plataforma.',
    },
    update: {
      title: 'Atualizar usuário da empresa',
      description: 'Atualize os dados deste usuário da empresa na plataforma.',
    },
    fields: {
      nickname: 'Apelido',
      status: 'Situação',
    },
    delete: {
      title: 'Remover usuário da empresa',
      description:
        'Esta ação removerá permanentemente o usuário da empresa e não poderá ser desfeita.',
    },
    buttons: {
      modules: 'Gerencie módulos do usuário da empresa',
    },
  },
};
