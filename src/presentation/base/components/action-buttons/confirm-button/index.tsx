import { Check } from 'lucide-react';

import { Button } from '../../button';

type Props = {
  title?: string;
  onClick: () => void;
  visible?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  confirmVariant?: 'primary' | 'danger';
};

export function ConfirmButton({
  title = 'Confirm',
  onClick,
  visible = true,
  loading,
  disabled,
  className,
  confirmVariant,
}: Props) {
  if (!visible) return null;

  return (
    <Button
      type="button"
      variant={confirmVariant}
      leftIcon={<Check size={16} />}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      className={className}
    >
      {title.toUpperCase()}
    </Button>
  );
}
