import type { AffiliateAdapter, SearchParams, SearchResult, UnifiedProduct } from './types'

export class FlipkartAdapter implements AffiliateAdapter {
  readonly network = 'flipkart' as const

  private readonly affiliateId: string
  private readonly affiliateToken: string

  constructor(config: { affiliateId: string; affiliateToken: string }) {
    this.affiliateId = config.affiliateId
    this.affiliateToken = config.affiliateToken
  }

  async search(params: SearchParams): Promise<SearchResult> {
    console.log('[FlipkartAdapter] search:', params)
    return { products: [], total: 0, network: 'flipkart' }
  }

  async getProduct(productId: string): Promise<UnifiedProduct | null> {
    console.log('[FlipkartAdapter] getProduct:', productId)
    return null
  }
}
