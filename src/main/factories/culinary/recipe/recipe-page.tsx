import { CulinaryRecipePage } from '@presentation/culinary/pages/recipe';
import { JSX } from 'react';
import { makeRecipeService } from '../services/make-recipe-service';
import { makeAuthorizationProvider } from '@infra/base/provider/make-authorization-provider';

export const CulinaryRecipePageFactory = (): JSX.Element => {
  return (
    <CulinaryRecipePage
      recipeService={makeRecipeService()}
      authorizationProvider={makeAuthorizationProvider()}
    />
  );
};
