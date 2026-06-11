import { JSX } from 'react';
import { makeCategoryService } from '../services/make-category-service';
import { CulinaryCategoryUpdatePage } from '@presentation/culinary/pages/category/update';

export const CulinaryCategoryUpdatePageFactory = (): JSX.Element => {
  return <CulinaryCategoryUpdatePage categoryService={makeCategoryService()} />;
};
