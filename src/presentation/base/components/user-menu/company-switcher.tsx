import { useMemo, useState } from 'react';

import { Select } from '../select';
import { ConfirmModal } from '../confirm-modal';
import { AuthSession } from '@domain/base/entities/auth-session';

type Props = {
  session: AuthSession;
  switchCompany: (companyId: string) => Promise<void>;
  onCompleted: () => void;
};

export function CompanySwitcher({
  session,
  switchCompany,
  onCompleted,
}: Props) {
  const [pendingCompanyId, setPendingCompanyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const currentCompanyId = session?.userCompany.companyId;

  const companies = session?.companies ?? [];

  const options = useMemo(() => {
    return companies.map((c) => ({
      label: c.name,
      value: c.id,
    }));
  }, [companies]);

  const selectedCompany = companies.find((c) => c.id === pendingCompanyId);

  const handleChange = (companyId: string) => {
    if (companyId === currentCompanyId) return;
    setPendingCompanyId(companyId);
  };

  const handleConfirm = async () => {
    if (!pendingCompanyId) return;

    try {
      setLoading(true);
      await switchCompany(pendingCompanyId);
      setPendingCompanyId(null);
    } finally {
      setLoading(false);
      onCompleted();
    }
  };

  const handleClose = () => {
    setPendingCompanyId(null);
  };

  return (
    <>
      <Select
        value={currentCompanyId ?? ''}
        options={options}
        onChange={handleChange}
        disabled={loading}
      />

      <ConfirmModal
        open={!!pendingCompanyId}
        title="Trocar de empresa"
        description={
          selectedCompany
            ? `Você será redirecionado para "${selectedCompany.name}".`
            : 'Você deseja trocar de empresa?'
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
