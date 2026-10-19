import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { CATEGORIES } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-dark/20 bg-dark text-neutral-subtle">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-accent-cyan" />
              <span className="text-lg font-bold text-white tracking-tight">
                Style<span className="text-accent-cyan">Pilot</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-subtle/80">
              AI-powered shopping aggregator. Find the best deals across Amazon, Myntra, Flipkart
              and more.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="transition-colors hover:text-primary-foreground"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Blog', href: '/blog' },
                { label: 'Careers', href: '/careers' },
                { label: 'Press', href: '/press' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-primary-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms of Service', href: '/terms-of-service' },
                { label: 'Cookie Policy', href: '/cookie-policy' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-primary-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} StylePilot. All rights reserved.</p>
          <p className="text-neutral-subtle/70">
            StylePilot is an affiliate site. We earn commissions from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  )
}
