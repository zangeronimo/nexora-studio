import { Trash } from 'lucide-react';

import { Button } from '../../button';

type Props = {
  title?: string;

  onClick: () => void;

  visible?: boolean;

  loading?: boolean;

  disabled?: boolean;

  className?: string;
};

export function DeleteButton({
  title = 'Delete',
  onClick,
  visible = true,
  loading,
  disabled,
  className,
}: Props) {
  if (!visible) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      leftIcon={<Trash size={16} />}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      className={className}
    >
      {title.toUpperCase()}
    </Button>
  );
}
