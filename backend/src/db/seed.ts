import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { products, priceHistory } from './schema'
import { MOCK_PRODUCTS } from '../constants'

async function seed() {
  const connectionUrl = process.env.DATABASE_URL
  if (!connectionUrl) {
    throw new Error('DATABASE_URL is not set')
  }

  const sql = neon(connectionUrl)
  const db = drizzle(sql)

  console.log('Seeding products to Neon PostgreSQL...')

  for (const item of MOCK_PRODUCTS) {
    await db
      .insert(products)
      .values({
        id: item.id,
        title: item.title,
        description: item.description || '',
        brand: item.brand || '',
        price: item.price,
        originalPrice: item.originalPrice || null,
        currency: item.currency || 'INR',
        image: item.image,
        category: item.category,
        network: item.network,
        affiliateUrl: item.affiliateUrl,
        rating: item.rating || null,
        reviewCount: item.reviewCount || null,
        inStock: item.inStock ?? true,
        discount: item.discount || null,
        isFeatured: item.isFeatured ?? false,
        isDeal: item.isDeal ?? false,
      })
      .onConflictDoUpdate({
        target: products.id,
        set: {
          price: item.price,
          originalPrice: item.originalPrice || null,
          inStock: item.inStock ?? true,
          updatedAt: new Date(),
        },
      })

    // Also record initial price history
    await db.insert(priceHistory).values({
      productId: item.id,
      price: item.price,
    })
  }

  console.log(`Successfully seeded ${MOCK_PRODUCTS.length} products to Neon database!`)
}

seed().catch((err) => {
  console.error('Seeding error:', err)
  process.exit(1)
})
