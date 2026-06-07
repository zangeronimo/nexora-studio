import { useState } from 'react';

import { Select } from '../select';
import { ConfirmModal } from '../confirm-modal';
import { Locale } from '@application/base/i18n/locale';

type Props = {
  current: Locale;
  switchLocale: (locale: Locale) => void;
  onCompleted: () => void;
};

export function LocaleSwitcher({ switchLocale, current, onCompleted }: Props) {
  const [loading, setLoading] = useState(false);
  const [pendingLocaleId, setPendingLocaleId] = useState<Locale | null>(null);

  const options = [
    {
      label: Locale.EN_US,
      value: Locale.EN_US,
    },
    {
      label: Locale.PT_BR,
      value: Locale.PT_BR,
    },
  ];

  const handleChange = (locale: Locale) => {
    if (locale === current) return;
    setPendingLocaleId(locale);
  };

  const handleConfirm = async () => {
    if (!pendingLocaleId) return;

    try {
      setLoading(true);
      await switchLocale(pendingLocaleId);
      setPendingLocaleId(null);
    } finally {
      setLoading(false);
      onCompleted();
    }
  };

  const handleClose = () => {
    setPendingLocaleId(null);
  };

  return (
    <>
      <Select
        value={current ?? ''}
        options={options}
        onChange={handleChange}
        disabled={loading}
      />

      <ConfirmModal
        open={!!pendingLocaleId}
        title="Trocar de idioma"
        description={
          current
            ? `Você será redirecionado para "${current}".`
            : 'Você deseja trocar de idioma?'
        }
        confirmLabel="Trocar"
        cancelLabel="Cancelar"
        loading={loading}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </>
  );
}
