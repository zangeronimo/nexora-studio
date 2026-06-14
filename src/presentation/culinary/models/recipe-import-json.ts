export interface RecipeImportJson {
  title: string;
  shortDescription: string;
  fullDescription: string;

  sections: {
    title: string;
    ingredients: {
      description: string;
    }[];
    steps: {
      order: number;
      instruction: string;
    }[];
  }[];

  notes: string[];

  difficulty: number;

  cuisine: string;

  prepTimeMinutes: number;
  cookTimeMinutes: number;
  restTimeMinutes: number;

  servings: string;

  metaTitle: string;
  metaDescription: string;
}
