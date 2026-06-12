import { JSX } from 'react';
import { makeTagService } from '../services/make-tag-service';
import { CulinaryTagUpdatePage } from '@presentation/culinary/pages/tag/update';

export const CulinaryTagUpdatePageFactory = (): JSX.Element => {
  return <CulinaryTagUpdatePage tagService={makeTagService()} />;
};
