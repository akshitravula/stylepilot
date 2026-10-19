'use client'

import Link from 'next/link'
import { ShoppingBag, Heart, User, Menu, X } from 'lucide-react'
import { useState, Suspense } from 'react'
import { SearchBar } from '@/components/search/SearchBar'
import { Button } from '@/components/ui/button'
import { useWishlistStore } from '@/store/wishlist'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const wishlistCount = useWishlistStore((s) => s.items.length)

  return (
    <header className="sticky top-0 z-50 w-full bg-primary border-b border-primary-hover shadow-sm text-primary-foreground">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <ShoppingBag className="h-7 w-7 text-accent" />
          <span className="hidden text-xl font-bold tracking-tight text-primary-foreground sm:block">
            Style<span className="text-accent">Pilot</span>
          </span>
        </Link>

        <div className="flex-1">
          <Suspense fallback={<div className="h-9 rounded-md bg-primary-hover/50" />}>
            <SearchBar />
          </Suspense>
        </div>

        <nav className="hidden items-center gap-1 sm:flex">
          <Link href="/account">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground active:bg-primary-pressed">
              <User className="mr-1 h-4 w-4" />
              <span className="hidden lg:inline">Account</span>
            </Button>
          </Link>
          <Link href="/wishlist">
            <Button
              variant="ghost"
              size="sm"
              className="relative text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground active:bg-primary-pressed"
            >
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Button>
          </Link>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed sm:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-primary-hover bg-primary px-4 py-3 sm:hidden">
          <Suspense fallback={<div className="h-9 rounded-md bg-primary-hover/50" />}>
            <SearchBar />
          </Suspense>
          <div className="mt-3 flex gap-3">
            <Link href="/account" className="flex items-center gap-1 text-sm text-white">
              <User className="h-4 w-4" /> Account
            </Link>
            <Link href="/wishlist" className="flex items-center gap-1 text-sm text-white">
              <Heart className="h-4 w-4" /> Wishlist{' '}
              {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
