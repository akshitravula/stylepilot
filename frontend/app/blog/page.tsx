import type { Metadata } from 'next'
import { BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'StylePilot Blog | Fashion, Tech & Shopping Insights',
  description: 'Shopping guides, deal breakdowns, fashion trends, and AI technology.',
}

const ARTICLES = [
  {
    slug: 'top-earbuds-under-2000',
    title: 'The Best Bluetooth TWS Earbuds Under ₹2,000 (Tested & Compared)',
    excerpt: 'We compared battery life, soundstage, and call clarity on the top budget earbuds on Amazon & Flipkart.',
    category: 'Tech & Audio',
    date: 'October 2, 2026',
    readTime: '4 min read',
  },
  {
    slug: 'capsule-wardrobe-guide',
    title: 'How to Build a 10-Piece Minimalist Capsule Wardrobe',
    excerpt: 'Simplify your daily outfits with versatile denim, tees, and footwear that pair seamlessly.',
    category: 'Fashion Trends',
    date: 'September 28, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'ai-shopping-future',
    title: 'How Agentic AI is Changing How We Buy Online',
    excerpt: 'From real-time deal alerts to automated virtual try-ons, here is where smart commerce is heading.',
    category: 'AI & Tech',
    date: 'September 20, 2026',
    readTime: '5 min read',
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-bg text-primary text-xs font-semibold">
          <BookOpen className="h-4 w-4" />
          <span>StylePilot Journal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-text tracking-tight">
          Shopping Guides & Style Insights
        </h1>
        <p className="text-neutral-muted text-sm">
          Hand-picked comparisons, trend reviews, and shopping hacks from our editorial team.
        </p>
      </div>

      <div className="space-y-6">
        {ARTICLES.map((article) => (
          <article
            key={article.slug}
            className="p-6 rounded-2xl bg-white border border-neutral-subtle shadow-sm hover:border-primary transition-all group"
          >
            <div className="flex items-center gap-3 text-xs text-neutral-muted mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-primary-bg text-primary font-semibold">
                {article.category}
              </span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            <h2 className="text-xl font-bold text-neutral-text group-hover:text-primary transition-colors">
              {article.title}
            </h2>
            <p className="text-sm text-neutral-muted mt-2 leading-relaxed">
              {article.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2 transition-all">
              <span>Read Guide</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}