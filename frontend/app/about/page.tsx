import type { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles, Bot, Zap, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Us | StylePilot',
  description: 'StylePilot is the next-generation AI shopping assistant and multi-store affiliate aggregator.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-bg text-primary text-xs font-semibold">
          <Sparkles className="h-4 w-4 text-accent" />
          <span>The Next Generation of Shopping</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-text tracking-tight">
          Shopping, Supercharged with <span className="text-primary">AI</span>
        </h1>
        <p className="text-neutral-muted text-base max-w-2xl mx-auto">
          StylePilot unites real-time price comparison with agentic AI styling, giving you one unified destination to discover deals, try looks, and buy from India’s best retailers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 rounded-2xl bg-white border border-neutral-subtle shadow-sm space-y-3">
          <div className="p-2.5 rounded-xl bg-primary-bg text-primary w-fit">
            <Bot className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-neutral-text">Conversational AI Assistant</h2>
          <p className="text-sm text-neutral-muted leading-relaxed">
            Ask natural questions like &quot;Find me water-resistant earbuds under ₹2,000&quot; or &quot;What outfit should I wear to a beach party?&quot; and receive personalized, verified recommendations instantly.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-neutral-subtle shadow-sm space-y-3">
          <div className="p-2.5 rounded-xl bg-accent-bg text-accent w-fit">
            <Zap className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-neutral-text">Real-time Cross-Store Feeds</h2>
          <p className="text-sm text-neutral-muted leading-relaxed">
            We continuously aggregate deals and price drops from Amazon, Myntra, Flipkart, Nykaa, and Ajio to ensure you never overpay.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-neutral-subtle shadow-sm space-y-3">
          <div className="p-2.5 rounded-xl bg-info-bg text-info w-fit">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-neutral-text">Virtual Look Preview</h2>
          <p className="text-sm text-neutral-muted leading-relaxed">
            Experiment with clothing styles, color palettes, and complementary accessories before you decide to buy.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-neutral-subtle shadow-sm space-y-3">
          <div className="p-2.5 rounded-xl bg-success-bg text-success w-fit">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-neutral-text">100% Free & Transparent</h2>
          <p className="text-sm text-neutral-muted leading-relaxed">
            StylePilot is completely free for shoppers. We earn a small commission from partner stores when you make a purchase through our verified links, at zero extra cost to you.
          </p>
        </div>
      </div>

      <div className="text-center p-8 rounded-2xl bg-primary text-primary-foreground space-y-4">
        <h2 className="text-2xl font-bold">Ready to experience smart shopping?</h2>
        <p className="text-sm text-neutral-subtle max-w-md mx-auto">
          Explore today’s trending deals or chat with the AI assistant in the bottom right corner.
        </p>
        <Link href="/" className="inline-block">
          <Button variant="secondary" size="lg" className="font-bold shadow-md">
            Start Exploring Deals
          </Button>
        </Link>
      </div>
    </div>
  )
}