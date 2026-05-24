import { X } from 'lucide-react';
import { Button } from '../../button';

type Props = {
  onClick: () => void;

  disabled?: boolean;

  visible?: boolean;

  title?: string;
};

export function ClearFilterButton({
  onClick,
  disabled,
  visible = true,
  title = 'Clear filters',
}: Props) {
  if (!visible) return null;

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      aria-label={title}
      title={title}
    >
      <X />
    </Button>
  );
}
