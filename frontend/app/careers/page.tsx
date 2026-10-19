import type { Metadata } from 'next'
import { MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Careers at StylePilot | Build the Future of AI Shopping',
  description: 'Join our team building agentic AI, recommendation engines, and e-commerce aggregators.',
}

const OPENINGS = [
  {
    title: 'Full Stack Engineer (Next.js & TypeScript)',
    team: 'Product Engineering',
    location: 'Remote / Bengaluru, India',
    type: 'Full-time',
  },
  {
    title: 'AI / ML Engineer (Agentic Workflows & Vision)',
    team: 'AI Research & Try-On',
    location: 'Remote / Bengaluru, India',
    type: 'Full-time',
  },
  {
    title: 'Growth & Affiliate Partnerships Lead',
    team: 'Business Development',
    location: 'Remote / Mumbai, India',
    type: 'Full-time',
  },
]

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-bg text-primary text-xs font-semibold">
          <Sparkles className="h-4 w-4 text-accent" />
          <span>We Are Hiring!</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-text tracking-tight">
          Build the Future of AI Shopping with Us
        </h1>
        <p className="text-neutral-muted text-sm max-w-xl">
          We’re designing intelligent, high-velocity consumer experiences that help millions of shoppers find what they love at the best possible price.
        </p>
      </div>

      <div className="space-y-4 mb-10">
        <h2 className="text-xl font-bold text-neutral-text">Current Open Positions</h2>
        {OPENINGS.map((job) => (
          <div
            key={job.title}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-white border border-neutral-subtle shadow-sm gap-4 hover:border-primary transition-all"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                <span>{job.team}</span>
                <span>•</span>
                <span className="text-neutral-muted">{job.type}</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-text">{job.title}</h3>
              <div className="flex items-center gap-1.5 text-xs text-neutral-muted">
                <MapPin className="h-3.5 w-3.5" />
                <span>{job.location}</span>
              </div>
            </div>
            <a href="mailto:careers@stylepilot.com">
              <Button size="sm" className="w-full sm:w-auto font-semibold">
                Apply Now
              </Button>
            </a>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-neutral-page border border-neutral-subtle text-center space-y-2">
        <h3 className="font-bold text-neutral-text">Don&apos;t see a role that fits?</h3>
        <p className="text-xs text-neutral-muted">
          We’re always looking for talented engineers and creators. Send your resume and portfolio to <a href="mailto:careers@stylepilot.com" className="text-primary font-semibold hover:underline">careers@stylepilot.com</a>.
        </p>
      </div>
    </div>
  )
}