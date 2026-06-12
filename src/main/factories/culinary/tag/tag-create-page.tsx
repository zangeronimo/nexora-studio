import { JSX } from 'react';
import { makeTagService } from '../services/make-tag-service';
import { CulinaryTagCreatePage } from '@presentation/culinary/pages/tag/create';

export const CulinaryTagCreatePageFactory = (): JSX.Element => {
  return <CulinaryTagCreatePage tagService={makeTagService()} />;
};
