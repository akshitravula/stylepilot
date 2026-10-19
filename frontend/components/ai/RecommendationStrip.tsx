import { Sparkles } from 'lucide-react'
import { MOCK_PRODUCTS } from '@/lib/constants'
import { ProductCard } from '@/components/product/ProductCard'

export function RecommendationStrip() {
  const aiPicks = MOCK_PRODUCTS.filter((p) => p.isFeatured)

  if (aiPicks.length === 0) return null

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-neutral-text">AI Picks for You</h2>
        <span className="rounded-full bg-primary-bg px-2.5 py-0.5 text-xs font-semibold text-primary border border-primary/20">
          Powered by StylePilot AI
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {aiPicks.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
