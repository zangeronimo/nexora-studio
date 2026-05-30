import { JSX } from 'react';
import { makeUserService } from '../services/make-user-service';
import { makeAuthorizationProvider } from '@infra/base/provider/make-authorization-provider';
import { CoreUserPage } from '@presentation/core/pages/user';

export const UserPageFactory = (): JSX.Element => {
  return (
    <CoreUserPage
      userService={makeUserService()}
      authorizationProvider={makeAuthorizationProvider()}
    />
  );
};
