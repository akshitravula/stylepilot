import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed shadow-sm',
        destructive:
          'bg-error text-error-foreground hover:bg-error-hover active:bg-error-pressed shadow-sm',
        outline:
          'border border-neutral-subtle bg-primary-bg text-neutral-text hover:bg-primary-hover hover:text-primary-foreground active:bg-primary-pressed',
        secondary:
          'bg-white text-primary border border-neutral-subtle hover:bg-primary-bg active:bg-neutral-subtle',
        success:
          'bg-success text-success-foreground hover:bg-success-hover active:bg-success-pressed shadow-sm',
        warning:
          'bg-warning text-warning-foreground hover:bg-warning-hover active:bg-warning-pressed shadow-sm',
        info:
          'bg-info text-info-foreground hover:bg-info-hover active:bg-info-pressed shadow-sm',
        ghost:
          'text-neutral-text hover:bg-neutral-subtle/30 hover:text-primary active:bg-neutral-subtle/60',
        link:
          'text-primary underline-offset-4 hover:underline hover:text-primary-hover',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
