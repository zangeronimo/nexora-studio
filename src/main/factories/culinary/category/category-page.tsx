import { CulinaryCategoryPage } from '@presentation/culinary/pages/category';
import { JSX } from 'react';
import { makeCategoryService } from '../services/make-category-service';
import { makeAuthorizationProvider } from '@infra/base/provider/make-authorization-provider';

export const CulinaryCategoryPageFactory = (): JSX.Element => {
  return (
    <CulinaryCategoryPage
      categoryService={makeCategoryService()}
      authorizationProvider={makeAuthorizationProvider()}
    />
  );
};
