import type { Metadata } from 'next'
import { ShieldCheck, Info, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | StylePilot',
  description: 'StylePilot affiliate disclosure, commission policy, and transparency statement.',
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-info-bg text-info text-xs font-semibold">
          <Info className="h-4 w-4" />
          <span>Transparency & FTC Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-text tracking-tight">
          Affiliate Disclosure
        </h1>
        <p className="text-neutral-muted text-sm">
          Last updated: October 2026
        </p>
      </div>

      <div className="space-y-8 bg-white border border-neutral-subtle rounded-2xl p-6 sm:p-10 shadow-sm text-neutral-text leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-text">How StylePilot Works</h2>
          <p className="text-sm text-neutral-muted">
            StylePilot is an AI-powered shopping discovery and price comparison platform. We help users find verified deals, compare prices across major retail networks (such as Amazon, Myntra, Flipkart, Ajio, Nykaa, and Meesho), and explore outfits via our AI stylist assistant.
          </p>
        </section>

        <section className="space-y-3 p-5 rounded-xl bg-primary-bg/50 border border-primary/20">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-6 w-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-neutral-text text-base">Our Commitment to You</h3>
              <p className="text-sm text-neutral-muted mt-1">
                Clicking an affiliate link and purchasing a product on a partner retailer website does <strong>NOT</strong> increase your price. You pay the exact same price (often discounted) as you normally would.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-text">Affiliate Partnerships</h2>
          <p className="text-sm text-neutral-muted">
            We participate in various affiliate marketing programs, which are designed to provide a means for websites to earn advertising and referral fees:
          </p>
          <ul className="space-y-2 text-sm text-neutral-muted mt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span><strong>Amazon Associates Program:</strong> An affiliate advertising program designed to provide fees by linking to Amazon.in and affiliated sites.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span><strong>Retail Aggregator Networks:</strong> Partnerships via CueLinks, EarnKaro, Impact, and direct brand campaigns for Myntra, Flipkart, Nykaa, and Ajio.</span>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-text">Editorial Independence</h2>
          <p className="text-sm text-neutral-muted">
            Our AI recommendations and search algorithms rank items based on relevance, pricing drops, ratings, and user query context. Retailers cannot pay us to rank lower-quality items as top picks.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-neutral-subtle">
          <p className="text-xs text-neutral-muted">
            Questions regarding our affiliate program? Contact our team at <a href="mailto:affiliates@stylepilot.com" className="text-primary hover:underline font-medium">affiliates@stylepilot.com</a>.
          </p>
        </section>
      </div>
    </div>
  )
}