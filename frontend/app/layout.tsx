import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CategoryNav } from '@/components/layout/CategoryNav'
import { ChatBubble } from '@/components/ai/ChatBubble'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'StylePilot — AI-Powered Shopping',
    template: '%s | StylePilot',
  },
  description:
    'Discover the best deals across Amazon, Myntra, Flipkart and more. Ask our AI to find exactly what you need.',
  keywords: ['affiliate', 'shopping', 'deals', 'fashion', 'AI shopping assistant'],
  openGraph: {
    title: 'StylePilot — AI-Powered Shopping',
    description: 'AI-powered affiliate shopping aggregator',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <CategoryNav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <ChatBubble />
        <Toaster />
      </body>
    </html>
  )
}
