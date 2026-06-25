export const culinary = {
  category: {
    title: 'Categories',
    description:
      'Structure your recipe collection with custom categories for consistent and scalable organization.',
    datagrid: {
      slug: 'Slug',
      name: 'Name',
      status: 'Status',
      created_at: 'Created at',
    },
    create: {
      title: 'Create Category',
      description:
        'Create a new category to organize recipes and keep your culinary content well structured.',
    },
    update: {
      title: 'Update Category',
      description:
        'Edit category details to maintain organization and consistency across your recipe collection.',
    },
    fields: {
      name: 'Name',
      description: 'Description',
      parent: 'Parents',
      displayOrder: 'Display order',
      status: 'Status',
      metaTitle: 'Meta title',
      metaDescription: 'Meta description',
    },
    delete: {
      title: 'Delete Category',
      description:
        'Permanently remove this category from the culinary catalog. This action cannot be undone.',
    },
  },

  tag: {
    title: 'Tags',
    description:
      'Structure your recipe collection with custom tags for consistent and scalable organization.',
    datagrid: {
      slug: 'Slug',
      name: 'Name',
      status: 'Status',
      created_at: 'Created at',
    },
    create: {
      title: 'Create Tag',
      description:
        'Create a new tag to organize recipes and keep your culinary content well structured.',
    },
    update: {
      title: 'Update Tag',
      description:
        'Edit tag details to maintain organization and consistency across your recipe collection.',
    },
    fields: {
      name: 'Name',
      description: 'Description',
      status: 'Status',
    },
    delete: {
      title: 'Delete Tag',
      description:
        'Permanently remove this tag from the culinary catalog. This action cannot be undone.',
    },
  },

  recipe: {
    title: 'Recipes',
    description: 'Structure your recipe collection.',
    dareciperid: {
      slug: 'Slug',
      name: 'Name',
      status: 'Status',
      created_at: 'Created at',
    },
    create: {
      title: 'Create Recipe',
      description:
        'Create a new recipe to your culinary content well structured.',
    },
    update: {
      title: 'Update Recipe',
      description:
        'Edit recipe details to maintain organization and consistency across your collection.',
    },
    fields: {
      name: 'Name',
      shortDescription: 'Short description',
      fullDescription: 'Full description',
      ingredients: 'Ingredients',
      steps: 'Steps',
      notes: 'Notes',
      prepTime: 'Preparation time',
      cookTime: 'Cook time',
      restTime: 'Rest time',
      yieldTotal: 'Yield',
      difficulty: 'Difficulty',
      cuisine: 'Cuisine',
      metaTitle: 'Meta title',
      metaDescription: 'Meta desription',
      category: 'Category',
      status: 'Status',
    },
    delete: {
      title: 'Delete Recipe',
      description:
        'Permanently remove this recipe from the culinary catalog. This action cannot be undone.',
    },
  },
};
