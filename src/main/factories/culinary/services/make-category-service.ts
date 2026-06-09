import { makeAuthHttpClient } from '@infra/base/http/make-auth-http-client';
import { CategoryService } from '@infra/culinary/services/category-service';

export const makeCategoryService = () => {
  return new CategoryService(makeAuthHttpClient());
};
