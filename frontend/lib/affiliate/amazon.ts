import type { AffiliateAdapter, SearchParams, SearchResult, UnifiedProduct } from './types'

export class AmazonAdapter implements AffiliateAdapter {
  readonly network = 'amazon' as const

  private readonly associateTag: string
  private readonly clientId: string
  private readonly clientSecret: string
  private readonly marketplace: string

  constructor(config: {
    associateTag: string
    clientId: string
    clientSecret: string
    marketplace?: string
  }) {
    this.associateTag = config.associateTag
    this.clientId = config.clientId
    this.clientSecret = config.clientSecret
    this.marketplace = config.marketplace ?? 'www.amazon.in'
  }

  async search(params: SearchParams): Promise<SearchResult> {
    console.log('[AmazonAdapter] search:', params)
    return { products: [], total: 0, network: 'amazon' }
  }

  async getProduct(asin: string): Promise<UnifiedProduct | null> {
    console.log('[AmazonAdapter] getProduct:', asin)
    return null
  }

  buildAffiliateUrl(asin: string): string {
    return `https://${this.marketplace}/dp/${asin}?tag=${this.associateTag}`
  }
}
