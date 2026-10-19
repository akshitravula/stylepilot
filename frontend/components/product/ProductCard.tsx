import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { type Product } from '@/types/product'
import { NetworkBadge } from './NetworkBadge'
import { PriceTag } from './PriceTag'
import { WishlistButton } from './WishlistButton'
import { AffiliateBuyButton } from './AffiliateBuyButton'
import { cn, getProductUrl } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-neutral-subtle bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-neutral-line',
        className
      )}
    >
      {product.discount && product.discount > 0 && (
        <div className="absolute left-2 top-2 z-10">
          <Badge variant="destructive" className="font-bold">
            -{product.discount}%
          </Badge>
        </div>
      )}

      <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <WishlistButton product={product} size="icon-sm" />
      </div>

      <Link href={getProductUrl(product)} className="block overflow-hidden bg-primary-bg/50">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <NetworkBadge network={product.network} size="sm" />

        <Link href={getProductUrl(product)}>
          <h3 className="line-clamp-2 text-sm font-medium text-neutral-text hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="text-xs text-neutral-muted">
            {product.rating}
            {product.reviewCount && (
              <span className="text-neutral-subtle"> ({product.reviewCount.toLocaleString()})</span>
            )}
          </span>
        </div>

        <PriceTag price={product.price} originalPrice={product.originalPrice} />

        <AffiliateBuyButton
          affiliateUrl={product.affiliateUrl}
          network={product.network}
          productId={product.id}
          size="sm"
          className="mt-auto w-full"
        />
      </div>
    </div>
  )
}
