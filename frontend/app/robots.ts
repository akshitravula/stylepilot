import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stylepilot.in'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/affiliate/track', '/api/ai/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
