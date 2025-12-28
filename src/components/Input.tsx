import { Input as BaseInput } from '@base-ui/react/input';
import { cn } from '../helpers/cn';

export const Input = (props: BaseInput.Props) => {
    return (
        <BaseInput
            {...props}
            className={cn('text-sm border border-zinc-100/10 rounded-md text-zinc-100 px-2 py-1', props.className)}
        />
    );
};
