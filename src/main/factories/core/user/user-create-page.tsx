import { JSX } from 'react';
import { CoreUserCreatePage } from '@presentation/core/pages/user/create';
import { makeUserService } from '../services/make-user-service';

export const CoreUserCreatePageFactory = (): JSX.Element => {
  return <CoreUserCreatePage userService={makeUserService()} />;
};
