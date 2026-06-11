import { CulinaryTagPage } from '@presentation/culinary/pages/tag';
import { JSX } from 'react';
import { makeTagService } from '../services/make-tag-service';
import { makeAuthorizationProvider } from '@infra/base/provider/make-authorization-provider';

export const CulinaryTagPageFactory = (): JSX.Element => {
  return (
    <CulinaryTagPage
      tagService={makeTagService()}
      authorizationProvider={makeAuthorizationProvider()}
    />
  );
};
