import { createContext, useContext } from 'react';

type PageTitleContextValue = {
  title?: string;
  setTitle: (title: string) => void;
};

export const PageTitleContext = createContext<PageTitleContextValue | null>(
  null,
);

export const usePageTitle = () => {
  const ctx = useContext(PageTitleContext);

  if (!ctx) {
    throw new Error('PageTitleContext not found');
  }

  return ctx;
};
