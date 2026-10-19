import { formatPrice, calcDiscount } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface PriceTagProps {
  price: number
  originalPrice?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PriceTag({ price, originalPrice, size = 'md', className }: PriceTagProps) {
  const discount = originalPrice ? calcDiscount(price, originalPrice) : 0

  const priceSize = { sm: 'text-sm', md: 'text-base', lg: 'text-2xl' }[size]
  const originalSize = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }[size]

  return (
    <div className={cn('flex flex-wrap items-baseline gap-1.5', className)}>
      <span className={cn('font-bold text-neutral-text', priceSize)}>{formatPrice(price)}</span>
      {originalPrice && originalPrice > price && (
        <>
          <span className={cn('text-neutral-muted line-through', originalSize)}>
            {formatPrice(originalPrice)}
          </span>
          {size !== 'sm' && (
            <span className={cn('font-semibold text-success', originalSize)}>
              {discount}% off
            </span>
          )}
        </>
      )}
    </div>
  )
}
