import type { ComponentProps, PropsWithChildren } from 'react';
import { cn } from '../helpers/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('rounded-md cursor-pointer transition-all font-semibold flex gap-2 items-center', {
    variants: {
        intent: {
            primary: 'bg-primary hover:bg-primary-hover text-zinc-800',
            secondary: 'bg-zinc-100 text-gray-800 border-zinc-400',
            tertiary: 'bg-zinc-100/10 hover:bg-zinc-100/20 text-zinc-100 border-zinc-400',
        },
        size: {
            extrasmall: ['text-xs', 'py-1', 'px-3'],
            small: 'text-sm py-1.5 px-4',
            medium: 'text-base py-2 px-6',
        },
        disable: {
            false: null,
            true: 'opacity-30 cursor-not-allowed',
        },
    },
    defaultVariants: {
        intent: 'primary',
        size: 'medium',
        disable: false,
    },
});

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface ButtonProps extends ButtonVariantProps, ComponentProps<'button'> {
    className?: string;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
    const { children, className, size, intent, disabled } = props;

    return (
        <button {...props} className={cn(buttonVariants({ size: size, intent: intent, disable: disabled }), className)}>
            {children}
        </button>
    );
};

export default Button;
