import { type NextRequest, NextResponse } from 'next/server'
import { db, affiliateClicks, products } from '@/lib/db'
import { eq } from 'drizzle-orm'

function generateSubId(): string {
  const ts = Date.now().toString(36)
  const rand = Math.random().toString(36).substring(2, 7)
  return `sp_${ts}_${rand}`
}

function buildAffiliateDestinationUrl({
  destination,
  network,
  subId,
}: {
  destination: string
  network: string
  subId: string
}): string {
  try {
    const url = new URL(destination)

    switch (network.toLowerCase()) {
      case 'amazon': {
        const associateTag = process.env.AMAZON_ASSOCIATE_TAG || 'stylepilot-21'
        url.searchParams.set('tag', associateTag)
        url.searchParams.set('ascsubtag', subId)
        return url.toString()
      }
      case 'flipkart': {
        const flipkartId = process.env.FLIPKART_AFFILIATE_ID || 'stylepilot'
        url.searchParams.set('affid', flipkartId)
        url.searchParams.set('affExtParam1', subId)
        return url.toString()
      }
      case 'myntra':
      case 'ajio':
      case 'nykaa':
      case 'meesho': {
        const cuelinksPubId = process.env.CUELINKS_PUB_ID
        if (cuelinksPubId) {
          return `https://linksredirect.com/?cid=${cuelinksPubId}&subid=${encodeURIComponent(subId)}&url=${encodeURIComponent(destination)}`
        }
        url.searchParams.set('subid', subId)
        return url.toString()
      }
      default: {
        url.searchParams.set('ref', 'stylepilot')
        url.searchParams.set('subid', subId)
        return url.toString()
      }
    }
  } catch {
    return destination
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const productId = searchParams.get('id')
  const network = searchParams.get('network') || 'direct'
  const destination = searchParams.get('dest')

  if (!destination) {
    return NextResponse.json({ error: 'Missing destination URL' }, { status: 400 })
  }

  // 1. Generate unique Sub-ID for affiliate commission attribution
  const subId = generateSubId()

  // 2. Build final target URL with affiliate tracking parameters
  const finalRedirectUrl = buildAffiliateDestinationUrl({
    destination,
    network,
    subId,
  })

  // 3. Extract visitor details
  const forwardedFor = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || '127.0.0.1'
  const userAgent = req.headers.get('user-agent') || 'unknown'

  // 4. Log the click asynchronously to Neon PostgreSQL
  try {
    if (process.env.DATABASE_URL) {
      let validProductId: string | null = null

      if (productId) {
        // Validate product exists to satisfy foreign key constraint
        const [existing] = await db
          .select({ id: products.id })
          .from(products)
          .where(eq(products.id, productId))
          .limit(1)

        if (existing) {
          validProductId = existing.id
        }
      }

      await db.insert(affiliateClicks).values({
        productId: validProductId,
        network,
        subId,
        destinationUrl: finalRedirectUrl,
        ip,
        userAgent,
        clickedAt: new Date(),
      })

      console.log(`[Affiliate Click Tracked] SubId: ${subId} | Net: ${network} | Prod: ${productId || 'none'}`)
    }
  } catch (error) {
    console.error('[Affiliate Track] DB insert error:', error)
  }

  // 5. Seamlessly redirect user to partner retailer
  return NextResponse.redirect(finalRedirectUrl, { status: 302 })
}
