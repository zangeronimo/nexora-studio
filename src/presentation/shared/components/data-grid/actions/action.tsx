import { Pencil, Trash2, LucideIcon } from 'lucide-react';

import { Button } from '../../button';

type ActionType = 'edit' | 'delete' | 'custom';

type Props = {
  type: ActionType;

  icon?: LucideIcon;

  label: string;

  onClick?: () => void;

  disabled?: boolean;

  loading?: boolean;

  visible?: boolean; // 👈 novo
};

const typeConfig: Record<
  Exclude<ActionType, 'custom'>,
  {
    icon: LucideIcon;
    variant: 'ghost' | 'danger';
  }
> = {
  edit: {
    icon: Pencil,
    variant: 'ghost',
  },

  delete: {
    icon: Trash2,
    variant: 'danger',
  },
};

export function DataGridAction({
  type,
  icon,
  label,
  onClick,
  disabled,
  loading,
  visible = true,
}: Props) {
  if (!visible) return null;

  const isCustom = type === 'custom';

  const config = !isCustom ? typeConfig[type] : undefined;

  const Icon = icon ?? config?.icon;

  const variant = config?.variant ?? 'ghost';

  if (!Icon) return null;

  return (
    <Button
      type="button"
      size="icon"
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      aria-label={label}
      title={label}
    >
      <Icon size={16} />
    </Button>
  );
}
