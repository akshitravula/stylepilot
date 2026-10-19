'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { CATEGORIES, NETWORK_CONFIG } from '@/lib/constants'
import { Separator } from '@/components/ui/separator'

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  const activeCategory = searchParams.get('category') ?? ''
  const activeNetwork = searchParams.get('network') ?? ''

  return (
    <div className="space-y-6 rounded-xl border bg-white p-4 shadow-sm">
      <div>
        <h3 className="mb-3 font-semibold text-gray-800">Category</h3>
        <ul className="space-y-1.5">
          <li>
            <button
              onClick={() => updateParam('category', '')}
              className={`text-sm transition-colors hover:text-blue-600 ${
                !activeCategory ? 'font-semibold text-blue-600' : 'text-gray-600'
              }`}
            >
              All Categories
            </button>
          </li>
          {CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => updateParam('category', cat.slug)}
                className={`flex items-center gap-1 text-sm transition-colors hover:text-blue-600 ${
                  activeCategory === cat.slug ? 'font-semibold text-blue-600' : 'text-gray-600'
                }`}
              >
                <span>{cat.icon}</span> {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-semibold text-gray-800">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full rounded border px-2 py-1 text-sm"
            defaultValue={searchParams.get('min') ?? ''}
            onBlur={(e) => updateParam('min', e.target.value)}
          />
          <span className="self-center text-gray-400">–</span>
          <input
            type="number"
            placeholder="Max"
            className="w-full rounded border px-2 py-1 text-sm"
            defaultValue={searchParams.get('max') ?? ''}
            onBlur={(e) => updateParam('max', e.target.value)}
          />
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-semibold text-gray-800">Store</h3>
        <ul className="space-y-1.5">
          <li>
            <button
              onClick={() => updateParam('network', '')}
              className={`text-sm transition-colors hover:text-blue-600 ${
                !activeNetwork ? 'font-semibold text-blue-600' : 'text-gray-600'
              }`}
            >
              All Stores
            </button>
          </li>
          {Object.entries(NETWORK_CONFIG).map(([key, config]) => (
            <li key={key}>
              <button
                onClick={() => updateParam('network', key)}
                className={`text-sm transition-colors hover:text-blue-600 ${
                  activeNetwork === key ? 'font-semibold text-blue-600' : 'text-gray-600'
                }`}
              >
                {config.displayName}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
