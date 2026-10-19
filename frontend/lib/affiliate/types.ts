export interface UnifiedProduct {
  id: string
  title: string
  description?: string
  brand?: string
  price: number
  originalPrice?: number
  currency: 'INR'
  image: string
  images?: string[]
  category: string
  network: AffiliateNetwork
  affiliateUrl: string
  rating?: number
  reviewCount?: number
  inStock: boolean
  tags?: string[]
  fetchedAt: number
}

export type AffiliateNetwork = 'amazon' | 'myntra' | 'flipkart' | 'ajio' | 'meesho' | 'nykaa'

export interface SearchParams {
  query: string
  category?: string
  maxPriceINR?: number
  minPriceINR?: number
  page?: number
  limit?: number
}

export interface SearchResult {
  products: UnifiedProduct[]
  total: number
  network: AffiliateNetwork
}

export interface AffiliateAdapter {
  network: AffiliateNetwork
  search(params: SearchParams): Promise<SearchResult>
  getProduct(id: string): Promise<UnifiedProduct | null>
}
