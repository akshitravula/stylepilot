import type { AffiliateNetwork } from './product'

export interface AffiliateNetworkConfig {
  name: AffiliateNetwork
  displayName: string
  color: string
  bgColor: string
  baseUrl: string
}

export interface AmazonProduct {
  ASIN: string
  ItemInfo: {
    Title: { DisplayValue: string }
    ByLineInfo?: { Brand?: { DisplayValue: string } }
    Classifications?: { ProductGroup?: { DisplayValue: string } }
  }
  Offers?: {
    Listings?: Array<{
      Price?: { Amount: number; Currency: string; DisplayAmount: string }
      SavingBasis?: { Amount: number }
      DeliveryInfo?: { IsAmazonFulfilled: boolean }
    }>
  }
  Images?: {
    Primary?: {
      Large?: { URL: string; Width: number; Height: number }
    }
  }
  DetailPageURL: string
  CustomerReviews?: { StarRating?: { Value: number }; Count?: number }
}

export interface FlipkartProduct {
  productId: string
  title: string
  productUrl: string
  imageUrls: { 200: string; 400?: string }
  productBaseInfoV1?: {
    categoryPath?: string
    flipkartSpecialPrice?: number
    mrp?: number
    brandName?: string
  }
  ratingInfo?: { averageRating: number; slNo?: number }
}
