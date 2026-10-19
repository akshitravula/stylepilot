import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants'

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/category/${cat.slug}`}
          className="flex flex-col items-center gap-2 rounded-xl p-3.5 text-center transition-all duration-200 bg-white border border-neutral-subtle hover:-translate-y-0.5 hover:shadow-sm hover:border-neutral-line group"
        >
          <span className="text-3xl transition-transform group-hover:scale-110">{cat.icon}</span>
          <span className="text-xs font-medium text-neutral-text group-hover:text-primary">{cat.label}</span>
        </Link>
      ))}
    </div>
  )
}
