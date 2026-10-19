import { type Product } from '@/types/product'
import { ProductCard } from './ProductCard'
import { cn } from '@/lib/utils'

interface ProductGridProps {
  products: Product[]
  className?: string
  columns?: 2 | 3 | 4 | 5
}

export function ProductGrid({ products, className, columns = 4 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-5xl">🔍</p>
        <h3 className="mt-4 text-lg font-semibold text-gray-700">No products found</h3>
        <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or search query.</p>
      </div>
    )
  }

  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  }[columns]

  return (
    <div className={cn('grid gap-4', colClass, className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
