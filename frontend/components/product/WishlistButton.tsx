'use client'

import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useWishlistStore } from '@/store/wishlist'
import type { Product } from '@/types/product'
import { cn } from '@/lib/utils'

interface WishlistButtonProps {
  product: Product
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'icon' | 'icon-sm'
  className?: string
}

export function WishlistButton({
  product,
  variant = 'ghost',
  size = 'icon',
  className,
}: WishlistButtonProps) {
  const { items, addItem, removeItem } = useWishlistStore()
  const isWishlisted = items.some((i) => i.id === product.id)

  function toggle() {
    if (isWishlisted) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  return (
    <Button
      variant={variant}
      size={size === 'icon-sm' ? 'icon' : size}
      onClick={toggle}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      className={cn(
        'rounded-full bg-white shadow-sm border border-neutral-subtle',
        isWishlisted ? 'text-accent hover:text-accent-hover' : 'text-neutral-muted hover:text-accent',
        size === 'icon-sm' && 'h-7 w-7',
        className
      )}
    >
      <Heart
        className={cn('h-4 w-4', isWishlisted && 'fill-error text-error')}
      />
    </Button>
  )
}
