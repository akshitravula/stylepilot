'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const BANNERS = [
  {
    id: 1,
    title: 'Curated Deals & Super Drops',
    subtitle: 'Price drops verified across Amazon, Myntra, Flipkart & more',
    cta: 'Explore Deals',
    href: '/category/electronics',
    bg: 'bg-primary text-primary-foreground border-b border-primary-hover',
    badge: 'Verified Deals',
    emoji: '⚡',
  },
  {
    id: 2,
    title: 'Fashion Forward Looks',
    subtitle: 'Trending streetwear, designer picks & curated wardrobes',
    cta: 'Explore Fashion',
    href: '/category/fashion',
    bg: 'bg-accent text-accent-foreground border-b border-accent-hover',
    badge: 'Trending Drops',
    emoji: '✨',
  },
  {
    id: 3,
    title: 'StylePilot AI Stylist',
    subtitle: 'Interactive AI shopping assistant — ask questions & Try Your Look',
    cta: 'Launch AI Stylist',
    href: '#chat',
    bg: 'bg-dark text-white border-b border-dark/30',
    badge: 'AI Assistant',
    emoji: '🤖',
  },
]

export function HeroBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % BANNERS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const banner = BANNERS[current]

  return (
    <div className="relative overflow-hidden">
      <div
        className={cn(
          'flex min-h-[260px] items-center justify-center px-8 py-16 text-center transition-all duration-700 sm:min-h-[340px]',
          banner.bg
        )}
      >
        <div className="max-w-xl">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm text-neutral-subtle">
            <span>{banner.emoji}</span>
            <span>{banner.badge}</span>
          </div>
          <h1 className="mb-2 text-3xl font-extrabold sm:text-4xl text-primary-foreground tracking-tight">{banner.title}</h1>
          <p className="mb-6 text-base text-neutral-subtle opacity-90">{banner.subtitle}</p>
          <Link
            href={banner.href}
            className="inline-block rounded-full bg-primary-bg px-8 py-3 text-sm font-bold text-primary shadow-md transition-all hover:bg-white hover:shadow-lg active:bg-neutral-subtle"
          >
            {banner.cta}
          </Link>
        </div>
      </div>

      <button
        onClick={() => setCurrent((c) => (c - 1 + BANNERS.length) % BANNERS.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % BANNERS.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'h-2 rounded-full transition-all',
              i === current ? 'w-6 bg-white' : 'w-2 bg-white/50'
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
