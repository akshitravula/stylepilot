'use client'

import { useState } from 'react'
import { Sparkles, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AiStyleStudio } from '@/components/ai/AiStyleStudio'
import type { Product } from '@/types/product'

interface ProductStyleStudioTriggerProps {
  product: Product
}

export function ProductStyleStudioTrigger({ product }: ProductStyleStudioTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="p-4 rounded-xl bg-gradient-to-r from-primary-bg via-white to-primary-bg border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-primary text-white rounded-xl shrink-0 shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-neutral-text text-sm">AI Style & Outfit Studio</p>
            <p className="text-xs text-neutral-muted">
              Preview coordinated pairings & check style compatibility
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={() => setIsOpen(true)}
          className="gap-2 font-bold bg-primary text-white hover:bg-primary-hover shadow-sm shrink-0"
        >
          <Wand2 className="h-4 w-4 text-accent-cyan" />
          <span>Try Your Look</span>
        </Button>
      </div>

      <AiStyleStudio product={product} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
