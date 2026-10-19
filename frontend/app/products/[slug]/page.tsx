import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Star, ShieldCheck, Sparkles, Truck, RefreshCw } from 'lucide-react'
import { MOCK_PRODUCTS, NETWORK_CONFIG } from '@/lib/constants'
import { getProductUrl } from '@/lib/utils'
import { ProductStyleStudioTrigger } from '@/components/product/ProductStyleStudioTrigger'
import { AiProductInsights } from '@/components/ai/AiProductInsights'

interface Props {
  params: Promise<{ slug: string }>
}

function getProductBySlugOrId(paramSlug: string) {
  const match = paramSlug.match(/-([a-zA-Z0-9_]+)$/)
  const idFromSlug = match ? match[1] : null

  return MOCK_PRODUCTS.find(
    (p) =>
      p.slug === paramSlug ||
      (idFromSlug && p.id === idFromSlug) ||
      p.id === paramSlug
  )
}

export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => {
    const slug = product.slug || product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    return {
      slug: `${slug}-${product.id}`,
    }
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlugOrId(slug)

  if (!product) {
    return {
      title: 'Product Not Found | StylePilot',
    }
  }

  const priceFormatted = `₹${(product.price / 100).toLocaleString('en-IN')}`
  const description = product.description || `Buy ${product.title} at best price ${priceFormatted} from ${product.network.toUpperCase()} on StylePilot.`

  return {
    title: `${product.title} - Best Deals & AI Try-On | StylePilot`,
    description,
    openGraph: {
      title: `${product.title} | StylePilot`,
      description,
      images: [{ url: product.image, alt: product.title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description,
      images: [product.image],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlugOrId(slug)

  if (!product) {
    notFound()
  }

  const netConfig = NETWORK_CONFIG[product.network] || {
    displayName: product.network,
    color: '#6366f1',
    bg: 'bg-indigo-100',
    textColor: 'text-indigo-800',
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount || 0

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: (product.price / 100).toFixed(2),
      priceCurrency: product.currency || 'INR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: netConfig.displayName,
      },
    },
    aggregateRating: product.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewCount || 1,
        }
      : undefined,
  }

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumbs for SEO */}
      <nav className="flex items-center text-sm text-neutral-muted mb-6 space-x-2">
        <Link href="/" className="hover:text-primary transition">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-primary transition capitalize"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-neutral-text font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-subtle">
        {/* Left: Product Image & Virtual Try-on Callout */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-page border border-neutral-subtle group">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-error text-error-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow">
                {discount}% OFF
              </span>
            )}
            <span
              className={`absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full border border-neutral-subtle bg-white text-neutral-text`}
            >
              via {netConfig.displayName}
            </span>
          </div>

          {/* Interactive AI Style & Outfit Studio Trigger */}
          <ProductStyleStudioTrigger product={product} />
        </div>

        {/* Right: Product Info & Buy Action */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              {product.brand}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-text leading-snug">
              {product.title}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-warning">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm font-bold text-neutral-text">{product.rating}</span>
                </div>
                {product.reviewCount && (
                  <span className="text-sm text-neutral-muted">
                    ({product.reviewCount.toLocaleString('en-IN')} ratings)
                  </span>
                )}
              </div>
            )}

            {/* Pricing */}
            <div className="pt-2 border-t border-neutral-subtle">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-neutral-text">
                  ₹{(product.price / 100).toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-neutral-muted line-through">
                    ₹{(product.originalPrice / 100).toLocaleString('en-IN')}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-sm font-bold text-success">
                    Save ₹{(((product.originalPrice || product.price) - product.price) / 100).toLocaleString('en-IN')} ({discount}% OFF)
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-muted mt-1">Inclusive of all taxes</p>
            </div>

            {/* Description */}
            <div className="py-4 text-neutral-muted text-sm leading-relaxed border-t border-b border-neutral-subtle">
              {product.description}
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-3 gap-3 py-2">
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-neutral-page border border-neutral-subtle text-neutral-text">
                <Truck className="h-4 w-4 text-primary mb-1" />
                <span className="text-xs font-medium">Fast Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-neutral-page border border-neutral-subtle text-neutral-text">
                <ShieldCheck className="h-4 w-4 text-primary mb-1" />
                <span className="text-xs font-medium">100% Genuine</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-neutral-page border border-neutral-subtle text-neutral-text">
                <RefreshCw className="h-4 w-4 text-primary mb-1" />
                <span className="text-xs font-medium">Easy Returns</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3 pt-6">
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary-pressed text-primary-foreground font-semibold shadow-md transition-all"
            >
              <span>Buy Now on {netConfig.displayName}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <p className="text-center text-xs text-neutral-muted">
              ⚡ Best price tracked across top retailers. Free & safe redirect.
            </p>
          </div>
        </div>
      </div>

      {/* AI Purchase Verdict & Review Synthesis */}
      <div className="mt-8">
        <AiProductInsights product={product} />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-neutral-text mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={getProductUrl(rel)}
                className="group bg-white rounded-xl p-4 border border-neutral-subtle hover:border-neutral-line hover:shadow-md transition"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-neutral-page mb-3">
                  <Image
                    src={rel.image}
                    alt={rel.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <p className="text-xs text-neutral-muted uppercase">{rel.brand}</p>
                <h3 className="font-semibold text-sm text-neutral-text group-hover:text-primary truncate mt-0.5">
                  {rel.title}
                </h3>
                <p className="text-sm font-bold text-neutral-text mt-1">
                  ₹{(rel.price / 100).toLocaleString('en-IN')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
