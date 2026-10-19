import { MOCK_PRODUCTS } from '@/lib/constants'
import { ProductCard } from '@/components/product/ProductCard'
import { Clock } from 'lucide-react'

export function DealOfTheDay() {
  const deals = MOCK_PRODUCTS.filter((p) => p.isDeal)

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <Clock className="h-6 w-6 text-warning" />
        <h2 className="text-2xl font-bold tracking-tight text-neutral-text">Deal of the Day</h2>
        <span className="rounded-full bg-warning/15 px-3 py-0.5 text-xs font-semibold text-warning">
          Limited time offers
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {deals.map((product) => (
          <ProductCard key={product.id} product={product} className="bg-white" />
        ))}
      </div>
    </div>
  )
}
