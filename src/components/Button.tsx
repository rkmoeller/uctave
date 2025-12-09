import type { PropsWithChildren } from 'react'
import { cn } from '../helpers/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
    'rounded-md cursor-pointer transition-all font-semibold',
    {
        variants: {
            intent: {
                primary: 'bg-primary hover:opacity-95 text-white',
                secondary: 'bg-white text-gray-800 border-gray-400',
            },
            size: {
                extrasmall: ['text-xs', 'py-0.5', 'px-1'],
                small: 'text-sm py-1 px-2',
                medium: 'text-base py-2 px-6',
            },
            disabled: {
                false: null,
                true: 'opacity-50 cursor-not-allowed',
            },
        },
        defaultVariants: {
            intent: 'primary',
            size: 'medium',
            disabled: false,
        },
    }
)

type ButtonVariantProps = VariantProps<typeof buttonVariants>

interface ButtonProps extends ButtonVariantProps {
    className?: string
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
    const { children, className, size } = props

    return (
        <button className={cn(buttonVariants({ size: size }), className)}>
            {children}
        </button>
    )
}

export default Button
