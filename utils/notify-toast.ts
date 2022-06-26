import { toast, ToastOptions } from 'react-toastify';

const notify = (message: string, options: ToastOptions) =>
  toast(message, options);

export const notifySuccess = (message: string) =>
  notify(message, { type: 'success' });
export const notifyError = (message: string) =>
  notify(message, { type: 'error' });
