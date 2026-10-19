import type { Metadata } from 'next'
import { Cookie } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy | StylePilot',
  description: 'StylePilot policy on cookies, tracking pixels, and affiliate attribution.',
}

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warning-bg text-warning text-xs font-semibold">
          <Cookie className="h-4 w-4" />
          <span>Tracking & Session Cookies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-text tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-neutral-muted text-sm">
          Last updated: October 2026
        </p>
      </div>

      <div className="space-y-8 bg-white border border-neutral-subtle rounded-2xl p-6 sm:p-10 shadow-sm text-neutral-text leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-text">What Are Cookies?</h2>
          <p className="text-sm text-neutral-muted">
            Cookies are small text files placed on your computer or mobile device when you browse websites. They enable websites to remember your preferences and ensure smooth navigation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-text">How StylePilot Uses Cookies</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-muted">
            <li><strong>Essential Cookies:</strong> Required to keep track of your active wishlist, chat state, and interface preferences.</li>
            <li><strong>Affiliate Tracking Cookies:</strong> When you click a deal on StylePilot, an affiliate cookie from the retailer (Amazon, Myntra, Flipkart, etc.) is temporarily set on your browser so the partner network attributes the referral. These cookies usually expire within 24 hours to 30 days.</li>
            <li><strong>Analytics Cookies:</strong> Help us measure which product categories and search queries are most popular.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-text">Managing Cookies</h2>
          <p className="text-sm text-neutral-muted">
            You can configure your browser to reject cookies or notify you when a cookie is placed. Please note that disabling cookies may affect some convenience features like saving products to your wishlist.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-neutral-subtle">
          <p className="text-xs text-neutral-muted">
            For questions about our cookie usage, email <a href="mailto:privacy@stylepilot.com" className="text-primary hover:underline font-medium">privacy@stylepilot.com</a>.
          </p>
        </section>
      </div>
    </div>
  )
}