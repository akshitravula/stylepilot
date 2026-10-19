import { Suspense } from 'react'
import { SearchFilters } from '@/components/search/SearchFilters'
import { ProductGrid } from '@/components/product/ProductGrid'
import { SearchResultsHeader } from '@/components/search/SearchResultsHeader'
import { SortDropdown } from '@/components/search/SortDropdown'
import { Skeleton } from '@/components/ui/skeleton'
import { MOCK_PRODUCTS } from '@/lib/constants'

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    min?: string
    max?: string
    network?: string
    sort?: string
    page?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q ?? ''

  const products = MOCK_PRODUCTS.filter((p) =>
    query ? p.title.toLowerCase().includes(query.toLowerCase()) : true
  )

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex gap-6">
        <aside className="hidden w-64 shrink-0 lg:block">
          <Suspense fallback={<div className="space-y-4"><Skeleton className="h-8 w-full" /><Skeleton className="h-64 w-full" /></div>}>
            <SearchFilters />
          </Suspense>
        </aside>

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <SearchResultsHeader query={query} count={products.length} />
            <Suspense fallback={<Skeleton className="h-9 w-40" />}>
              <SortDropdown />
            </Suspense>
          </div>
          <Suspense
            fallback={
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className="h-72 w-full rounded-lg" />
                ))}
              </div>
            }
          >
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
