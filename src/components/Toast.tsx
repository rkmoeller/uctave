import { CircleCheck, CircleX, Trash } from 'lucide-react';
import { toast } from 'sonner';

export interface ToastProps {
    id: string | number;
    title: string;
    description?: string;
    button?: {
        label: string;
        onClick?: () => void;
        dismiss?: boolean;
    };
    type?: 'default' | 'success' | 'error' | 'delete';
}

export const Toast = (props: ToastProps) => {
    const { title, description, button, id, type } = props;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CircleCheck size={20} className="text-green-400" />;
            case 'error':
                return <CircleX size={20} className="text-rose-400" />;
            case 'delete':
                return <Trash size={20} className="text-rose-400" />;
            default:
                return null;
        }
    };

    return (
        <div className="flex rounded-xl bg-zinc-900 shadow-lg border border-zinc-800 gap-5 ring-1 ring-black/5 md:max-w-[364px] items-center px-4 py-3 w-auto">
            <div className="flex gap-3 items-center">
                {getIcon()}
                <div className="flex flex-1 items-center">
                    <div className="w-full">
                        <p className="text-sm font-semibold text-zinc-100">{title}</p>
                        {description && <p className="mt-1 text-sm text-zinc-400">{description}</p>}
                    </div>
                </div>
            </div>
            {button && (
                <button
                    className=" bg-zinc-800 px-3 py-1 text-sm font-semibold rounded-full text-zinc-100 hover:bg-zinc-700/50 cursor-pointer"
                    onClick={() => (button.dismiss ? toast.dismiss(id) : button.onClick?.())}
                >
                    {button.label}
                </button>
            )}
        </div>
    );
};
