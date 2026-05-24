import { Search } from 'lucide-react';
import { Button } from '../../button';

type Props = {
  onClick: () => void;

  loading?: boolean;

  disabled?: boolean;

  visible?: boolean;

  title?: string;
};

export function FilterButton({
  onClick,
  loading,
  disabled,
  visible = true,
  title = 'Search',
}: Props) {
  if (!visible) return null;

  return (
    <Button
      type="button"
      size="icon"
      variant="primary"
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      aria-label={title}
      title={title}
    >
      <Search />
    </Button>
  );
}
