export type AffiliateNetwork = 'amazon' | 'myntra' | 'flipkart' | 'ajio' | 'meesho' | 'nykaa'

export interface Product {
  id: string
  slug?: string
  title: string
  description?: string
  price: number          // in INR paise (₹ × 100)
  originalPrice?: number
  currency: 'INR'
  image: string
  images?: string[]
  category: string
  subCategory?: string
  brand?: string
  network: AffiliateNetwork
  affiliateUrl: string   // tracked redirect URL
  rating: number         // 0–5
  reviewCount?: number
  inStock: boolean
  tags?: string[]
  discount?: number      // percentage
  isFeatured?: boolean
  isDeal?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ProductSearchParams {
  query?: string
  category?: string
  network?: AffiliateNetwork
  minPrice?: number
  maxPrice?: number
  sort?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'relevance'
  page?: number
  limit?: number
}

export interface ProductSearchResult {
  products: Product[]
  total: number
  page: number
  totalPages: number
}

export interface ProductCardProps {
  product: Product
  className?: string
  showNetwork?: boolean
}
