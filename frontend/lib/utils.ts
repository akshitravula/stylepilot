import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildAffiliateUrl(productId: string, network: string, destination: string): string {
  const params = new URLSearchParams({ id: productId, network, dest: destination })
  return `/api/affiliate/track?${params.toString()}`
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

export function shortId(): string {
  return Math.random().toString(36).slice(2, 9)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getProductUrl(product: { id: string; slug?: string; title: string }): string {
  const slug = product.slug || slugify(product.title)
  return `/products/${slug}-${product.id}`
}

