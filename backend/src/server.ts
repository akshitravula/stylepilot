import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { MOCK_PRODUCTS, CATEGORIES } from './constants'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

import { db, products as productsTable } from './db'
import { eq } from 'drizzle-orm'

// Health check & DB status
app.get('/api/health', async (req, res) => {
  try {
    const dbCount = await db.select().from(productsTable)
    res.json({
      status: 'ok',
      db: 'connected',
      project: 'StylePilot (Neon)',
      productCount: dbCount.length,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    res.json({
      status: 'ok',
      db: 'disconnected',
      error: String(err),
      timestamp: new Date().toISOString(),
    })
  }
})

// Categories endpoint
app.get('/api/categories', (req, res) => {
  res.json(CATEGORIES)
})

// Products endpoint with search and filter
app.get('/api/products', async (req, res) => {
  const { category, search, network } = req.query

  try {
    let results = await db.select().from(productsTable)

    if (category) {
      results = results.filter(
        (p) => p.category.toLowerCase() === String(category).toLowerCase()
      )
    }

    if (network) {
      results = results.filter(
        (p) => p.network.toLowerCase() === String(network).toLowerCase()
      )
    }

    if (search) {
      const q = String(search).toLowerCase()
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
      )
    }

    res.json({
      total: results.length,
      source: 'neon_postgres',
      products: results,
    })
  } catch (err) {
    // Fallback to in-memory mock products if DB query fails
    let results = [...MOCK_PRODUCTS]
    if (category) results = results.filter((p) => p.category.toLowerCase() === String(category).toLowerCase())
    if (network) results = results.filter((p) => p.network.toLowerCase() === String(network).toLowerCase())
    if (search) {
      const q = String(search).toLowerCase()
      results = results.filter((p) => p.title.toLowerCase().includes(q))
    }
    res.json({
      total: results.length,
      source: 'mock_fallback',
      products: results,
    })
  }
})

// Product details by ID or Slug
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params

  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id))

    if (product) {
      res.json(product)
      return
    }
  } catch {
    // fallback
  }

  const product = MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id)
  if (!product) {
    res.status(404).json({ error: 'Product not found' })
    return
  }

  res.json(product)
})

app.listen(PORT, () => {
  console.log(`[Backend API] Server running on http://localhost:${PORT}`)
})