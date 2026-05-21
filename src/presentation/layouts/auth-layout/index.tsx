import { ReactNode } from 'react';

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <h1>AuthLayout</h1>
      {children}
    </main>
  );
};
