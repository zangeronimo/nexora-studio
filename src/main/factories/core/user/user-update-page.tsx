import { JSX } from 'react';
import { CoreUserUpdatePage } from '@presentation/core/pages/user/update';
import { makeUserService } from '../services/make-user-service';

export const CoreUserUpdatePageFactory = (): JSX.Element => {
  return <CoreUserUpdatePage userService={makeUserService()} />;
};
