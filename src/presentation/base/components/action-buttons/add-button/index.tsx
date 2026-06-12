import { Plus } from 'lucide-react';

import { Button } from '../../button';

type Props = {
  title?: string;

  onClick: () => void;

  visible?: boolean;

  loading?: boolean;

  disabled?: boolean;

  className?: string;
};

export function AddButton({
  title = 'Add',
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
      leftIcon={<Plus size={16} />}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      className={className}
    >
      {title.toUpperCase()}
    </Button>
  );
}
