import { toast as sonnerToast } from 'sonner';
import { Toast, type ToastProps } from '../../components/Toast';

export function toast(toast: Omit<ToastProps, 'id'>) {
    return sonnerToast.custom((id) => <Toast id={id} {...toast} />);
}
