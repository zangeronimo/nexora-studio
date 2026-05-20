import { ReactNode } from 'react';

type Props = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export const PageHeader = ({ title, description, actions }: Props) => {
  return (
    <header>
      <div>
        <h1>{title}</h1>

        {!!description && <small>{description}</small>}
      </div>

      {actions}
    </header>
  );
};
