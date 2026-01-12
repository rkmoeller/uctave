import { Input as BaseInput } from '@base-ui/react/input';
import { cn } from '../helpers/cn';
import type { ReactElement } from 'react';

interface InputProps extends BaseInput.Props {
    icon?: ReactElement;
}

export const Input = (props: InputProps) => {
    return (
        <div className="relative">
            <BaseInput
                {...props}
                className={cn(
                    'text-sm border font-light leading-none border-zinc-100/10 rounded-md text-zinc-100 px-2 py-1.5 focus:border-zinc-600 outline-none transition-all',
                    props.className
                )}
            />
            {props.icon && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">{props.icon}</div>
            )}
        </div>
    );
};
