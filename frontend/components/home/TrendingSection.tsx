import { MOCK_PRODUCTS } from '@/lib/constants'
import { ProductCard } from '@/components/product/ProductCard'

export function TrendingSection() {
  const trending = MOCK_PRODUCTS.slice(0, 6)

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {trending.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
