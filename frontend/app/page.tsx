import { HeroBanner } from '@/components/home/HeroBanner'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { DealOfTheDay } from '@/components/home/DealOfTheDay'
import { TrendingSection } from '@/components/home/TrendingSection'
import { RecommendationStrip } from '@/components/ai/RecommendationStrip'

export default function HomePage() {
  return (
    <div className="space-y-8 pb-12">
      <HeroBanner />

      <section className="container mx-auto px-4">
        <h2 className="mb-4 text-xl font-bold text-neutral-text">Shop by Category</h2>
        <CategoryGrid />
      </section>

      <section className="bg-warning-bg/60 border-y border-neutral-subtle py-8">
        <div className="container mx-auto px-4">
          <DealOfTheDay />
        </div>
      </section>

      <section className="container mx-auto px-4">
        <RecommendationStrip />
      </section>

      <section className="container mx-auto px-4">
        <h2 className="mb-4 text-xl font-bold text-neutral-text">Trending Now</h2>
        <TrendingSection />
      </section>
    </div>
  )
}
