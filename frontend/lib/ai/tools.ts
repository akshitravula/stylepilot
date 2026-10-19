import { tool } from 'ai'
import { z } from 'zod'
import { MOCK_PRODUCTS } from '@/lib/constants'
import { getProductUrl } from '@/lib/utils'
import { db, products as productsTable } from '@/lib/db'

// Helper to get catalog (Live Neon DB with fallback to MOCK_PRODUCTS)
async function getCatalog() {
  try {
    if (process.env.DATABASE_URL) {
      const live = await db.select().from(productsTable)
      if (live && live.length > 0) {
        return live
      }
    }
  } catch (err) {
    console.warn('[AI Tools] DB fetch fallback to mock products:', err)
  }
  return MOCK_PRODUCTS
}

export const searchProductsTool = tool({
  description:
    'Search for products in the StylePilot catalog across Amazon, Myntra, Flipkart, Nykaa, and more. Returns matching products with images, prices, ratings, and affiliate links.',
  parameters: z.object({
    query: z.string().describe('Search keyword or product name, e.g. "wireless earbuds", "running shoes", "jeans"'),
    category: z
      .enum(['electronics', 'fashion', 'footwear', 'home', 'beauty', 'sports', 'books', 'toys'])
      .optional()
      .describe('Product category to filter by'),
    maxPrice: z.number().optional().describe('Maximum price in INR (e.g. 2000 for ₹2,000)'),
    minPrice: z.number().optional().describe('Minimum price in INR (e.g. 500 for ₹500)'),
    network: z
      .enum(['amazon', 'myntra', 'flipkart', 'ajio', 'meesho', 'nykaa'])
      .optional()
      .describe('Specific store to search in'),
  }),
  execute: async ({ query, category, maxPrice, minPrice, network }) => {
    const catalog = await getCatalog()

    const filtered = catalog.filter((p) => {
      const priceInRupees = p.price / 100
      const q = query.toLowerCase()
      const matchQuery =
        p.title.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)

      const matchCategory = !category || p.category.toLowerCase() === category.toLowerCase()
      const matchMax = !maxPrice || priceInRupees <= maxPrice
      const matchMin = !minPrice || priceInRupees >= minPrice
      const matchNetwork = !network || p.network.toLowerCase() === network.toLowerCase()

      return matchQuery && matchCategory && matchMax && matchMin && matchNetwork
    })

    return {
      products: filtered.slice(0, 4).map((p) => ({
        id: p.id,
        title: p.title,
        brand: p.brand,
        image: p.image,
        price: `₹${(p.price / 100).toLocaleString('en-IN')}`,
        rawPrice: p.price / 100,
        originalPrice: p.originalPrice ? `₹${(p.originalPrice / 100).toLocaleString('en-IN')}` : null,
        discount: p.discount ? `${p.discount}% off` : null,
        rating: p.rating,
        reviews: p.reviewCount,
        network: p.network,
        url: getProductUrl(p),
        affiliateUrl: p.affiliateUrl,
      })),
      total: filtered.length,
    }
  },
})

export const getProductDetailsTool = tool({
  description: 'Get detailed specs, pricing, and affiliate information about a specific product by its ID.',
  parameters: z.object({
    productId: z.string().describe('The product ID (e.g. "prod_001")'),
  }),
  execute: async ({ productId }) => {
    const catalog = await getCatalog()
    const product = catalog.find((p) => p.id === productId || ('slug' in p && (p as { slug?: string }).slug === productId))
    if (!product) return { error: 'Product not found' }

    return {
      id: product.id,
      title: product.title,
      brand: product.brand,
      description: product.description,
      image: product.image,
      price: `₹${(product.price / 100).toLocaleString('en-IN')}`,
      rawPrice: product.price / 100,
      originalPrice: product.originalPrice ? `₹${(product.originalPrice / 100).toLocaleString('en-IN')}` : null,
      discount: product.discount ? `${product.discount}% off` : null,
      rating: product.rating,
      reviewCount: product.reviewCount,
      network: product.network,
      category: product.category,
      inStock: product.inStock,
      url: getProductUrl(product),
      affiliateUrl: product.affiliateUrl,
    }
  },
})

export const suggestOutfitTool = tool({
  description:
    'Curate a complete coordinated outfit pairing complementary items (clothing, footwear, accessories) based on occasion and budget.',
  parameters: z.object({
    occasion: z.string().describe('Occasion, e.g. "beach party", "office meeting", "casual weekend", "date night"'),
    gender: z.enum(['men', 'women', 'unisex']).optional().describe('Target gender styling'),
    maxBudget: z.number().optional().describe('Total outfit budget in INR'),
  }),
  execute: async ({ occasion, maxBudget }) => {
    const catalog = await getCatalog()

    // Find fashion, footwear, beauty items
    const fashion = catalog.filter((p) => p.category === 'fashion')
    const footwear = catalog.filter((p) => p.category === 'footwear')
    const accessories = catalog.filter((p) => p.category === 'beauty' || p.category === 'electronics')

    const outfitPieces = [
      fashion[0],
      footwear[0],
      accessories[0],
    ].filter(Boolean)

    const totalPaise = outfitPieces.reduce((acc, p) => acc + (p?.price || 0), 0)
    const totalPriceInRupees = totalPaise / 100

    return {
      occasion,
      totalPrice: `₹${totalPriceInRupees.toLocaleString('en-IN')}`,
      fitsBudget: !maxBudget || totalPriceInRupees <= maxBudget,
      pieces: outfitPieces.map((p) => ({
        id: p.id,
        category: p.category,
        title: p.title,
        brand: p.brand,
        image: p.image,
        price: `₹${(p.price / 100).toLocaleString('en-IN')}`,
        network: p.network,
        url: getProductUrl(p),
        affiliateUrl: p.affiliateUrl,
      })),
      styleTip: `For a ${occasion}, balance relaxed silhouettes with tailored footwear for an effortless, contemporary look.`,
    }
  },
})

export const AI_TOOLS = {
  searchProducts: searchProductsTool,
  getProductDetails: getProductDetailsTool,
  suggestOutfit: suggestOutfitTool,
}
