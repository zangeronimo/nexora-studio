import { useState } from 'react';

import { ToastContext } from '../context/toast-context';

import { Toast, ToastType } from '../types/toast';

import { ToastContainer } from '../components/toast-container';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

type Props = {
  children: React.ReactNode;
};

export function ToastProvider({ children }: Props) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const { t } = useTranslation();

  const remove = (id: string) => {
    setToasts((old) => old.filter((x) => x.id !== id));
  };

  const createToast = (type: ToastType, title: string, message: string) => {
    const id = crypto.randomUUID();

    setToasts((old) => [
      ...old,
      {
        id,
        type,
        title,
        message,
      },
    ]);

    setTimeout(() => remove(id), 4000);
  };

  const success = (message: string) => {
    createToast('success', t('common.toast.success.title'), message);
  };

  const error = (message: string) => {
    createToast('error', t('common.toast.error.title'), message);
  };

  const info = (message: string) => {
    createToast('info', t('common.toast.info.title'), message);
  };

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}

      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
}
