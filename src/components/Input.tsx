import { Input as BaseInput } from '@base-ui/react/input';
import { cn } from '../helpers/cn';
import type { RefObject } from 'react';

interface Props extends BaseInput.Props {
    ref?: RefObject<HTMLInputElement | null>;
}

export const Input = (props: Props) => {
    return (
        <BaseInput
            {...props}
            className={cn(
                'text-sm border border-zinc-100/10 rounded-md text-zinc-100 px-2 py-1 outline-1 ',
                props.className
            )}
        />
    );
};
