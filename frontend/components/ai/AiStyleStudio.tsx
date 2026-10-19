'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, X, Check, ExternalLink, RefreshCw, Shirt, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Product } from '@/types/product'
import { MOCK_PRODUCTS } from '@/lib/constants'
import { getProductUrl } from '@/lib/utils'

interface AiStyleStudioProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

const OCCASIONS = [
  { id: 'casual', label: 'Casual Outing', icon: '☕', harmonyScore: 94 },
  { id: 'office', label: 'Smart Work', icon: '💼', harmonyScore: 91 },
  { id: 'date', label: 'Evening & Date', icon: '🌙', harmonyScore: 96 },
  { id: 'active', label: 'Streetwear & Active', icon: '⚡', harmonyScore: 89 },
]

export function AiStyleStudio({ product, isOpen, onClose }: AiStyleStudioProps) {
  const [selectedOccasion, setSelectedOccasion] = useState(OCCASIONS[0].id)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  if (!isOpen) return null

  const activeOccasion = OCCASIONS.find((o) => o.id === selectedOccasion)!

  // Pick complementary products from catalog with different categories
  const complementary = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category !== product.category
  ).slice(0, 3)

  const activeItemIds = [product.id, ...selectedItems]
  const allLookItems = [product, ...complementary.filter((c) => selectedItems.includes(c.id))]
  const totalPaise = allLookItems.reduce((sum, item) => sum + item.price, 0)

  function toggleItem(id: string) {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-subtle overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-primary to-accent-cyan text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">AI Look & Style Studio</h3>
              <p className="text-xs text-white/80">Coordinated pairings & color harmony matching</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Occasion Selector */}
          <div>
            <label className="block text-xs font-bold text-neutral-muted uppercase tracking-wider mb-2.5">
              Select Occasion
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {OCCASIONS.map((occ) => (
                <button
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    selectedOccasion === occ.id
                      ? 'bg-primary-bg border-primary text-primary shadow-sm ring-1 ring-primary'
                      : 'bg-neutral-page border-neutral-subtle text-neutral-text hover:border-primary'
                  }`}
                >
                  <span>{occ.icon}</span>
                  <span>{occ.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Style Synergy Score Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-primary-bg via-accent-cyan/10 to-primary-bg border border-primary/20 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Style Harmony Score
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-success-bg text-success">
                  High Synergy
                </span>
              </div>
              <p className="text-xs text-neutral-muted leading-relaxed">
                Color balance and silhouette synergy for <strong>{activeOccasion.label}</strong>.
                Versatile neutral undertones pair seamlessly.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center shrink-0 w-16 h-16 rounded-2xl bg-white shadow-sm border border-neutral-subtle">
              <span className="text-xl font-extrabold text-primary">{activeOccasion.harmonyScore}%</span>
              <span className="text-[10px] font-semibold text-neutral-muted uppercase">Match</span>
            </div>
          </div>

          {/* The Look: Main Piece + Complementary Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-muted uppercase tracking-wider">
                Curated Outfit Pieces
              </label>
              <span className="text-xs text-primary font-semibold">
                {allLookItems.length} items selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Anchor Product (Always Included) */}
              <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-primary bg-primary-bg/30">
                <div className="relative h-14 w-14 rounded-lg bg-white overflow-hidden shrink-0 border border-neutral-subtle">
                  <Image src={product.image} alt={product.title} fill className="object-contain p-1" sizes="56px" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase text-primary">Main Anchor</span>
                  <h4 className="text-xs font-bold text-neutral-text truncate">{product.title}</h4>
                  <p className="text-xs font-bold text-neutral-text mt-0.5">₹{(product.price / 100).toLocaleString('en-IN')}</p>
                </div>
                <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Complementary Add-ons */}
              {complementary.map((comp) => {
                const isSelected = selectedItems.includes(comp.id)
                return (
                  <div
                    key={comp.id}
                    onClick={() => toggleItem(comp.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-accent-cyan bg-accent-cyan/10 shadow-sm'
                        : 'border-neutral-subtle bg-white hover:border-neutral-line'
                    }`}
                  >
                    <div className="relative h-14 w-14 rounded-lg bg-neutral-page overflow-hidden shrink-0 border border-neutral-subtle">
                      <Image src={comp.image} alt={comp.title} fill className="object-contain p-1" sizes="56px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-semibold uppercase text-neutral-muted">
                        AI Recommended Pair
                      </span>
                      <h4 className="text-xs font-semibold text-neutral-text truncate">{comp.title}</h4>
                      <p className="text-xs font-bold text-neutral-text mt-0.5">
                        ₹{(comp.price / 100).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                        isSelected
                          ? 'bg-accent-cyan text-white border-accent-cyan'
                          : 'border-neutral-subtle text-transparent'
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer with Checkout CTA */}
        <div className="p-4 sm:p-5 border-t border-neutral-subtle bg-neutral-page flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-xs text-neutral-muted">Total Bundle Price</span>
            <div className="text-xl font-extrabold text-neutral-text">
              ₹{(totalPaise / 100).toLocaleString('en-IN')}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="flex-1 sm:flex-none font-semibold"
            >
              Close
            </Button>
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none"
            >
              <Button size="sm" className="w-full gap-2 font-bold shadow-md">
                <span>Buy Anchor Piece</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
