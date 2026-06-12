import { JSX } from 'react';
import { makeCategoryService } from '../services/make-category-service';
import { CulinaryCategoryCreatePage } from '@presentation/culinary/pages/category/create';

export const CulinaryCategoryCreatePageFactory = (): JSX.Element => {
  return <CulinaryCategoryCreatePage categoryService={makeCategoryService()} />;
};
