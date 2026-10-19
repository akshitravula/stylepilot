import { tool } from 'ai'
import { z } from 'zod'
import { MOCK_PRODUCTS } from '../constants'
import type { Product } from '../types/product'

export const searchProductsTool = tool({
  description:
    'Search for products in the StylePilot catalog. Returns matching products with prices, ratings, and affiliate links.',
  parameters: z.object({
    query: z.string().describe('Search query, e.g. "wireless earbuds under 2000"'),
    category: z
      .enum(['electronics', 'fashion', 'footwear', 'home', 'beauty', 'sports', 'books', 'toys'])
      .optional()
      .describe('Product category to filter by'),
    maxPrice: z.number().optional().describe('Maximum price in INR (not paise)'),
    minPrice: z.number().optional().describe('Minimum price in INR (not paise)'),
    network: z
      .enum(['amazon', 'myntra', 'flipkart', 'ajio', 'meesho', 'nykaa'])
      .optional()
      .describe('Specific affiliate store to search in'),
  }),
  execute: async ({ query, category, maxPrice, minPrice, network }) => {
    const filtered = MOCK_PRODUCTS.filter((p: Product) => {
      const priceInRupees = p.price / 100
      const matchQuery = p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.brand?.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      const matchCategory = !category || p.category === category
      const matchMax = !maxPrice || priceInRupees <= maxPrice
      const matchMin = !minPrice || priceInRupees >= minPrice
      const matchNetwork = !network || p.network === network

      return matchQuery && matchCategory && matchMax && matchMin && matchNetwork
    })

    return {
      products: filtered.slice(0, 5).map((p: Product) => ({
        id: p.id,
        title: p.title,
        brand: p.brand,
        price: `₹${(p.price / 100).toLocaleString('en-IN')}`,
        originalPrice: p.originalPrice
          ? `₹${(p.originalPrice / 100).toLocaleString('en-IN')}`
          : null,
        discount: p.discount ? `${p.discount}% off` : null,
        rating: p.rating,
        reviews: p.reviewCount,
        network: p.network,
        url: `https://stylepilot.in/product/${p.id}`,
      })),
      total: filtered.length,
    }
  },
})

export const getProductDetailsTool = tool({
  description: 'Get detailed information about a specific product by its ID.',
  parameters: z.object({
    productId: z.string().describe('The product ID'),
  }),
  execute: async ({ productId }) => {
    const product = MOCK_PRODUCTS.find((p: Product) => p.id === productId)
    if (!product) return { error: 'Product not found' }

    return {
      id: product.id,
      title: product.title,
      brand: product.brand,
      description: product.description,
      price: `₹${(product.price / 100).toLocaleString('en-IN')}`,
      rating: product.rating,
      reviewCount: product.reviewCount,
      network: product.network,
      category: product.category,
      inStock: product.inStock,
      affiliateUrl: `https://stylepilot.in/product/${product.id}`,
    }
  },
})

export const AI_TOOLS = {
  searchProducts: searchProductsTool,
  getProductDetails: getProductDetailsTool,
}
