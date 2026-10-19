'use client'

import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NETWORK_CONFIG } from '@/lib/constants'
import type { AffiliateNetwork } from '@/types/product'
import { cn } from '@/lib/utils'

interface AffiliateBuyButtonProps {
  affiliateUrl: string
  network: AffiliateNetwork
  productId: string
  size?: 'sm' | 'default' | 'lg'
  className?: string
}

export function AffiliateBuyButton({
  affiliateUrl,
  network,
  productId,
  size = 'default',
  className,
}: AffiliateBuyButtonProps) {
  const config = NETWORK_CONFIG[network]

  function handleClick() {
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <Button
      size={size}
      onClick={handleClick}
      className={cn(
        'gap-1.5 font-semibold bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed shadow-sm transition-colors',
        className
      )}
    >
      Buy on {config.displayName}
      <ExternalLink className="h-3.5 w-3.5 opacity-80" />
    </Button>
  )
}
