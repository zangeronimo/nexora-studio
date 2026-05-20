import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Page = ({ children }: Props) => {
  return <section>{children}</section>;
};
