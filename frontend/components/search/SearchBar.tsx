'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  className?: string
  placeholder?: string
}

export function SearchBar({ className, placeholder = 'Search products, brands...' }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex w-full overflow-hidden rounded-md', className)}
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-white px-4 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400"
        aria-label="Search"
      />
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center bg-accent hover:bg-accent-hover active:bg-accent-pressed px-4 text-white transition-colors"
        aria-label="Submit search"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  )
}
