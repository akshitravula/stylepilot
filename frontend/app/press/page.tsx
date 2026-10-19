import type { Metadata } from 'next'
import { Newspaper, Mail, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Press & Media Kit | StylePilot',
  description: 'StylePilot press releases, media resources, brand assets, and news.',
}

export default function PressPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-bg text-primary text-xs font-semibold">
          <Newspaper className="h-4 w-4" />
          <span>Press Room</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-text tracking-tight">
          Press & Brand Resources
        </h1>
        <p className="text-neutral-muted text-sm max-w-xl">
          Find official StylePilot announcements, executive bios, and brand assets for media publication.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 rounded-2xl bg-white border border-neutral-subtle shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-neutral-text">Media Inquiries</h2>
          <p className="text-sm text-neutral-muted leading-relaxed">
            Journalists, analysts, and content creators can reach our press relations team directly for commentary on AI in commerce and consumer trends.
          </p>
          <a href="mailto:press@stylepilot.com" className="inline-block">
            <Button size="sm" variant="default" className="gap-2 font-semibold">
              <Mail className="h-4 w-4" />
              press@stylepilot.com
            </Button>
          </a>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-neutral-subtle shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-neutral-text">Brand & Logo Assets</h2>
          <p className="text-sm text-neutral-muted leading-relaxed">
            Download high-resolution StylePilot SVG/PNG logos, brand color tokens, and approved screenshot mockups.
          </p>
          <Button size="sm" variant="outline" className="gap-2 font-semibold">
            <Download className="h-4 w-4" />
            Download Media Kit (.ZIP)
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-text">Recent Highlights</h2>
        <div className="p-6 rounded-2xl bg-white border border-neutral-subtle shadow-sm space-y-2">
          <span className="text-xs font-semibold text-primary">Press Release • October 2026</span>
          <h3 className="text-base font-bold text-neutral-text">
            StylePilot Announces Next-Gen Multi-Retailer Affiliate Search Engine with Integrated AI Stylist
          </h3>
          <p className="text-sm text-neutral-muted">
            Combining instant deal discovery across top brands with conversational shopping assistance and interactive styling recommendations.
          </p>
        </div>
      </div>
    </div>
  )
}