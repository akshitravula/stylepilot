import type { AffiliateAdapter, SearchParams, SearchResult, UnifiedProduct } from './types'

export class MyntraAdapter implements AffiliateAdapter {
  readonly network = 'myntra' as const

  private readonly affiliateSubId: string

  constructor(config: { affiliateSubId: string }) {
    this.affiliateSubId = config.affiliateSubId
  }

  async search(params: SearchParams): Promise<SearchResult> {
    console.log('[MyntraAdapter] search:', params)
    return { products: [], total: 0, network: 'myntra' }
  }

  async getProduct(productId: string): Promise<UnifiedProduct | null> {
    console.log('[MyntraAdapter] getProduct:', productId)
    return null
  }

  buildAffiliateUrl(productUrl: string): string {
    return `https://www.vcommission.com/track?url=${encodeURIComponent(productUrl)}&sub=${this.affiliateSubId}`
  }
}
