# StylePilot

StylePilot is an e-commerce aggregator and AI-assisted shopping platform that unifies product search, price comparison, and outfit curation across Amazon, Flipkart, and Myntra into a single interface.

## Overview

Modern e-commerce requires shoppers to manually compare prices, availability, and styles across multiple isolated platforms. StylePilot solves this by normalizing cross-network product catalogs, tracking affiliate click attribution with unique sub-IDs, and offering contextual product recommendations via LLM tool calling against live catalog data.

## Core Features

- Cross-platform search and filtering: Aggregates catalog items across Amazon, Flipkart, and Myntra with unified category, price range, and retailer filters.
- Real-time affiliate attribution: Automatically appends network-specific tracking parameters (Amazon `tag`/`ascsubtag`, Flipkart `affid`/`affExtParam1`, Myntra `subid`) and logs click telemetry to PostgreSQL before redirecting.
- AI shopping assistant: Streaming conversational interface backed by Google Gemini that uses function calling to query the actual product catalog and return interactive in-chat product cards.
- Outfit and style studio: Interactive outfit curation tool that suggests complementary garments and styling recommendations for any selected item.
- Price intelligence: Tracks historical pricing data and highlights genuine discount margins based on prior listing prices.
- Persistent wishlist: Client-side wishlist state with zero-flicker localStorage synchronization via Zustand.

## Tech Stack

- Frontend: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Radix UI
- Backend & Database: Neon Serverless PostgreSQL, Drizzle ORM
- AI Layer: Google Gemini 1.5 Flash (Function Calling, Streaming API)
- State Management: Zustand
- Package Manager: pnpm (Workspaces monorepo)

## System Architecture

```
User (Browser)
  │
  ▼
Next.js 15 App Router (Frontend UI & API Routes)
  ├── /api/ai/chat         ──> Google Gemini (Function Calling) ──> Catalog Query
  ├── /api/affiliate/track ──> Sub-ID Generation ──> Neon PostgreSQL ──> Retailer Redirect
  └── /api/affiliate/stats ──> Aggregated Click Telemetry
```

## Getting Started

### Prerequisites

- Node.js 18.18 or higher
- pnpm 9.x or higher
- A PostgreSQL connection string (Neon or standard Postgres)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akshitravula/stylepilot.git
   cd stylepilot
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables in `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
   GEMINI_API_KEY="your-gemini-api-key"
   AMAZON_ASSOCIATE_TAG="your-amazon-tag"
   FLIPKART_AFFILIATE_ID="your-flipkart-id"
   MYNTRA_PARTNER_ID="your-myntra-id"
   PORT=3001
   ```

4. Push the database schema and seed initial data:
   ```bash
   cd backend
   pnpm run db:push
   pnpm run db:seed
   cd ..
   ```

5. Start the development server:
   ```bash
   pnpm run dev
   ```

The application runs at `http://localhost:3001`.

## Project Structure

```
stylepilot/
├── frontend/
│   ├── app/                      # Next.js App Router (pages and API routes)
│   │   ├── api/affiliate/        # Click tracking and stats endpoints
│   │   ├── api/ai/               # Streaming chat endpoint
│   │   ├── category/[slug]/      # Category listings
│   │   └── products/[slug]/      # Product detail and pricing views
│   ├── components/               # React UI components (AI, product, home, layout)
│   ├── lib/                      # Database clients, affiliate utilities, constants
│   └── store/                    # Zustand stores
├── backend/
│   ├── src/
│   │   ├── affiliate/            # Network deep link builders (Amazon, Flipkart, Myntra)
│   │   ├── ai/                   # Prompt definitions and tool call handlers
│   │   └── db/                   # Drizzle schema definitions and seed data
│   └── drizzle.config.ts         # Drizzle configuration
├── neon.ts                       # Neon project configuration
└── package.json                  # Root monorepo workspace configuration
```

## Database Schema

- `products`: Cached product metadata, network source, price in paise, ratings, and deal flags.
- `users`: User profiles and authentication provider identifiers.
- `wishlists`: Many-to-many relationship linking users to saved products.
- `affiliate_clicks`: Log of affiliate redirects containing sub-IDs, network names, IP addresses, and user agents.
- `price_history`: Periodic price snapshots for tracking markdown trends over time.

## License

MIT
