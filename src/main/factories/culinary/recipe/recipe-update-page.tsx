import { JSX } from 'react';
import { makeRecipeService } from '../services/make-recipe-service';
import { CulinaryRecipeUpdatePage } from '@presentation/culinary/pages/recipe/update';
import { makeCategoryService } from '../services/make-category-service';

export const CulinaryRecipeUpdatePageFactory = (): JSX.Element => {
  return (
    <CulinaryRecipeUpdatePage
      recipeService={makeRecipeService()}
      categoryService={makeCategoryService()}
    />
  );
};
