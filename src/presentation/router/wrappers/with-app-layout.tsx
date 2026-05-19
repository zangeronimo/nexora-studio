import { ReactElement } from 'react';
import { AppLayout } from '@presentation/layouts/app-layout';

export function withAppLayout(element: ReactElement) {
  return <AppLayout>{element}</AppLayout>;
}
