import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  real,
  primaryKey,
  serial,
  index,
} from 'drizzle-orm/pg-core'

// ---------------------------------------------------------------------------
// Products — cached affiliate product data
// ---------------------------------------------------------------------------
export const products = pgTable(
  'products',
  {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    brand: text('brand'),
    price: integer('price').notNull(), // in paise
    originalPrice: integer('original_price'),
    currency: text('currency').default('INR').notNull(),
    image: text('image').notNull(),
    category: text('category').notNull(),
    network: text('network').notNull(), // 'amazon' | 'myntra' | 'flipkart' | etc.
    affiliateUrl: text('affiliate_url').notNull(),
    rating: real('rating'),
    reviewCount: integer('review_count'),
    inStock: boolean('in_stock').default(true).notNull(),
    discount: integer('discount'),
    isFeatured: boolean('is_featured').default(false),
    isDeal: boolean('is_deal').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => [
    index('products_category_idx').on(t.category),
    index('products_network_idx').on(t.network),
  ]
)

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name'),
  image: text('image'),
  provider: text('provider'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ---------------------------------------------------------------------------
// Wishlists
// ---------------------------------------------------------------------------
export const wishlists = pgTable(
  'wishlists',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    addedAt: timestamp('added_at').defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.productId] })]
)

// ---------------------------------------------------------------------------
// Affiliate clicks
// ---------------------------------------------------------------------------
export const affiliateClicks = pgTable('affiliate_clicks', {
  id: serial('id').primaryKey(),
  productId: text('product_id').references(() => products.id),
  userId: text('user_id').references(() => users.id),
  network: text('network').notNull(),
  subId: text('sub_id'),
  destinationUrl: text('destination_url'),
  ip: text('ip'),
  userAgent: text('user_agent'),
  clickedAt: timestamp('clicked_at').defaultNow().notNull(),
})

// ---------------------------------------------------------------------------
// Price history
// ---------------------------------------------------------------------------
export const priceHistory = pgTable('price_history', {
  id: serial('id').primaryKey(),
  productId: text('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  price: integer('price').notNull(), // in paise
  capturedAt: timestamp('captured_at').defaultNow().notNull(),
})
