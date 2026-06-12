import { makeAuthHttpClient } from '@infra/base/http/make-auth-http-client';
import { RecipeService } from '@infra/culinary/services/recipe-service';

export const makeRecipeService = () => {
  return new RecipeService(makeAuthHttpClient());
};
