'use client'

import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export function CategoryNav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-16 z-40 w-full overflow-x-auto bg-primary-hover border-b border-primary-pressed shadow-sm">
      <div className="container mx-auto flex h-10 items-center gap-1 px-4">
        <Link
          href="/"
          className={cn(
            'shrink-0 rounded px-3 py-1 text-xs font-medium text-neutral-subtle transition-colors hover:bg-primary-pressed hover:text-primary-foreground',
            pathname === '/' && 'bg-primary-pressed text-primary-foreground font-semibold'
          )}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={cn(
              'flex shrink-0 items-center gap-1 whitespace-nowrap rounded px-3 py-1 text-xs font-medium text-neutral-subtle transition-colors hover:bg-primary-pressed hover:text-primary-foreground',
              pathname === `/category/${cat.slug}` && 'bg-primary-pressed text-primary-foreground font-semibold'
            )}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
