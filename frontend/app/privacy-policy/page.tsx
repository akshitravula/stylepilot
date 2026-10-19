import type { Metadata } from 'next'
import { Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | StylePilot',
  description: 'StylePilot privacy policy: how we collect, use, and protect your personal data.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-bg text-primary text-xs font-semibold">
          <Lock className="h-4 w-4" />
          <span>Data Protection & Privacy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-text tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-neutral-muted text-sm">
          Effective Date: October 2026
        </p>
      </div>

      <div className="space-y-8 bg-white border border-neutral-subtle rounded-2xl p-6 sm:p-10 shadow-sm text-neutral-text leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-text">1. Information We Collect</h2>
          <p className="text-sm text-neutral-muted">
            When you visit StylePilot, we collect information necessary to deliver personalized search and shopping assistance:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-muted">
            <li><strong>Usage Information:</strong> Searches performed, categories browsed, products clicked, and affiliate redirection events.</li>
            <li><strong>AI Interaction Data:</strong> Prompts, questions, and styling preferences you share with our AI Assistant to generate tailored outfit ideas.</li>
            <li><strong>Device & Analytics:</strong> IP address, browser type, operating system, and referral source.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-text">2. How We Use Your Information</h2>
          <p className="text-sm text-neutral-muted">
            We do <strong>not</strong> sell your personal data. We use collected information strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-muted">
            <li>Provide search results, price comparisons, and deal notifications.</li>
            <li>Generate contextual styling suggestions via LLM endpoints.</li>
            <li>Track affiliate clicks for attribution when you navigate to retailer partners.</li>
            <li>Prevent fraud and maintain platform integrity.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-text">3. Third-Party Retailers</h2>
          <p className="text-sm text-neutral-muted">
            When you click &quot;Buy Now&quot; and navigate to an external retailer (Amazon, Myntra, Flipkart, etc.), their respective privacy policies and terms apply. We encourage you to review their terms before completing transactions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-text">4. Security & Retention</h2>
          <p className="text-sm text-neutral-muted">
            We employ modern encryption standards (TLS/HTTPS) and store persistent data within secure serverless infrastructure.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-neutral-subtle">
          <p className="text-xs text-neutral-muted">
            If you wish to request data deletion, contact <a href="mailto:privacy@stylepilot.com" className="text-primary hover:underline font-medium">privacy@stylepilot.com</a>.
          </p>
        </section>
      </div>
    </div>
  )
}