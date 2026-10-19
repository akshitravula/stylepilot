import { NextResponse } from 'next/server'
import { db, affiliateClicks } from '@/lib/db'
import { desc, sql } from 'drizzle-orm'

export async function GET() {
  try {
    const recent = await db
      .select()
      .from(affiliateClicks)
      .orderBy(desc(affiliateClicks.clickedAt))
      .limit(20)

    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(affiliateClicks)

    return NextResponse.json({
      status: 'ok',
      totalClicks: countResult?.count || 0,
      recentClicks: recent,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: String(error),
      },
      { status: 500 }
    )
  }
}
