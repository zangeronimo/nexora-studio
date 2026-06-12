import { JSX } from 'react';
import { makeRecipeService } from '../services/make-recipe-service';
import { CulinaryRecipeCreatePage } from '@presentation/culinary/pages/recipe/create';
import { makeCategoryService } from '../services/make-category-service';

export const CulinaryRecipeCreatePageFactory = (): JSX.Element => {
  return (
    <CulinaryRecipeCreatePage
      recipeService={makeRecipeService()}
      categoryService={makeCategoryService()}
    />
  );
};
