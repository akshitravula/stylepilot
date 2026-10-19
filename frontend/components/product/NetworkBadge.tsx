import { NETWORK_CONFIG } from '@/lib/constants'
import type { AffiliateNetwork } from '@/types/product'
import { cn } from '@/lib/utils'

interface NetworkBadgeProps {
  network: AffiliateNetwork
  size?: 'sm' | 'md'
  className?: string
}

export function NetworkBadge({ network, size = 'md', className }: NetworkBadgeProps) {
  const config = NETWORK_CONFIG[network]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded font-semibold',
        config.bg,
        config.textColor,
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs',
        className
      )}
    >
      {config.displayName}
    </span>
  )
}
