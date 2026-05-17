import { ReactNode } from 'react';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <h1>AppLayout</h1>
      {children}
    </main>
  );
};
