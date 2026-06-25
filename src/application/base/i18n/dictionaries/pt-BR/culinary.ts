export const culinary = {
  category: {
    title: 'Categorias',
    description:
      'Estruture seu acervo de receitas com categorias personalizadas para uma organização consistente e escalável.',
    datagrid: {
      slug: 'Slug',
      name: 'Nome',
      status: 'Situação',
      created_at: 'Criado em',
    },
    create: {
      title: 'Criar Categoria',
      description:
        'Crie uma nova categoria para organizar receitas e manter seu conteúdo culinário estruturado.',
    },
    update: {
      title: 'Atualizar Categoria',
      description:
        'Edite as informações da categoria para manter a organização e a consistência do seu catálogo de receitas.',
    },
    fields: {
      name: 'Nome',
      description: 'Descrição',
      parent: 'Grupo',
      displayOrder: 'Ordem de exibição',
      status: 'Situação',
      metaTitle: 'Meta título',
      metaDescription: 'Meta descrição',
    },
    delete: {
      title: 'Excluir Categoria',
      description:
        'Remova permanentemente esta categoria do catálogo culinário. Esta ação não poderá ser desfeita.',
    },
  },

  tag: {
    title: 'Tags',
    description:
      'Estruture seu acervo de receitas com tags personalizadas para uma organização consistente e escalável.',
    datagrid: {
      slug: 'Slug',
      name: 'Nome',
      status: 'Situação',
      created_at: 'Criado em',
    },
    create: {
      title: 'Criar Tag',
      description:
        'Crie uma nova tag para organizar receitas e manter seu conteúdo culinário estruturado.',
    },
    update: {
      title: 'Atualizar Tag',
      description:
        'Edite as informações da tag para manter a organização e a consistência do seu catálogo de receitas.',
    },
    fields: {
      name: 'Nome',
      description: 'Descrição',
      status: 'Situação',
    },
    delete: {
      title: 'Excluir Tag',
      description:
        'Remova permanentemente esta tag do catálogo culinário. Esta ação não poderá ser desfeita.',
    },
  },

  recipe: {
    title: 'Receitas',
    description: 'Estruture seu acervo de receitas.',
    datagrid: {
      slug: 'Slug',
      name: 'Nome',
      status: 'Situação',
      created_at: 'Criado em',
    },
    create: {
      title: 'Criar Receita',
      description:
        'Crie uma nova receita para organizar seu conteúdo culinário estruturado.',
    },
    update: {
      title: 'Atualizar Receita',
      description:
        'Edite as informações da receita para manter a organização e a consistência do seu catálogo.',
    },
    fields: {
      name: 'Nome',
      shortDescription: 'Descrição curta',
      fullDescription: 'Descrição longa',
      ingredients: 'Ingredientes',
      steps: 'Passos',
      notes: 'Dicas do chef',
      prepTime: 'Tempo de preparo',
      cookTime: 'Tempo de cozimento',
      restTime: 'Tempo de descanso',
      yieldTotal: 'Rendimento',
      difficulty: 'Dificuldade',
      cuisine: 'Tipo de cozinha',
      metaTitle: 'Título meta',
      metaDescription: 'Descrição meta',
      category: 'Categoria',
      status: 'Situação',
    },
    delete: {
      title: 'Excluir Receita',
      description:
        'Remova permanentemente esta receita do catálogo culinário. Esta ação não poderá ser desfeita.',
    },
  },
};
