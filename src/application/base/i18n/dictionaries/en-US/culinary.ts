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
      canonicalUrl: 'Canonical url',
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
};
