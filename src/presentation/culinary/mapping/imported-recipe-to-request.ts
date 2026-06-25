import { UpdateRecipeRequest } from '@application/culinary/requests/recipe-request';
import { RecipeImportJson } from '../models/recipe-import-json';
import { recipeDifficulty } from '@domain/culinary/enums/recipe-difficulty';

export const mapImportedRecipeToRequest = (
  data: RecipeImportJson,
): UpdateRecipeRequest => {
  return {
    id: '',
    name: data.title,
    shortDescription: data.shortDescription,
    fullDescription: data.fullDescription,

    sections:
      data.sections.length > 0
        ? data.sections.map((section) => ({
            id: crypto.randomUUID(),
            title: section.title,

            ingredients:
              section.ingredients.length > 0
                ? section.ingredients.map((ingredient) => ({
                    description: ingredient.description,
                  }))
                : [{ description: '' }],

            steps:
              section.steps.length > 0
                ? section.steps.map((step) => ({
                    order: step.order,
                    instruction: step.instruction,
                  }))
                : [{ order: 1, instruction: '' }],
          }))
        : [
            {
              title: '',
              ingredients: [{ description: '' }],
              steps: [{ order: 1, instruction: '' }],
            },
          ],

    notes: data.notes,

    difficulty: recipeDifficulty.numberToEnum(data.difficulty),
    cuisine: data.cuisine,

    prepTime: data.prepTimeMinutes,
    cookTime: data.cookTimeMinutes,
    restTime: data.restTimeMinutes,

    yieldTotal: data.servings,

    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    categoryId: null,
    status: 0,
  };
};
