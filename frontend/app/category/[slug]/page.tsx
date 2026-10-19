import { ProductGrid } from '@/components/product/ProductGrid'
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/constants'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = CATEGORIES.find((c) => c.slug === slug)

  if (!category) return { title: 'Category Not Found | StylePilot' }

  return {
    title: `Best ${category.label} Deals & Offers | StylePilot`,
    description: `Shop top-rated ${category.label.toLowerCase()} from Amazon, Myntra, Flipkart, and more. Compare verified deals on StylePilot.`,
    openGraph: {
      title: `${category.label} - Latest Price Drops & Trends`,
      description: `Explore top-rated products in ${category.label}.`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = CATEGORIES.find((c) => c.slug === slug)

  if (!category) notFound()

  const products = MOCK_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === slug.toLowerCase()
  )

  return (
    <div className="container mx-auto px-4 py-6">
      {/* SEO Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1 text-xs text-neutral-muted">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 text-neutral-subtle" />
        <span className="font-medium text-neutral-text">{category.label}</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-text">{category.label}</h1>
        <p className="mt-1 text-sm text-neutral-muted">
          Showing {products.length} hand-picked deals from verified stores
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  )
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }))
}
