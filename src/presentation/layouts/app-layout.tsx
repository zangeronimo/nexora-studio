import { Header } from '@presentation/components/header';
import { ReactNode } from 'react';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      <h1>AppLayout</h1>
      {children}
    </main>
  );
};
