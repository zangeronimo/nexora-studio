export type ToastType = 'success' | 'error' | 'info';

export type Toast = {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
};
