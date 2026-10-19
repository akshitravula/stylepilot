import { Bot, User, ExternalLink, Star } from 'lucide-react'
import type { Message } from 'ai'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ChatMessageProps {
  message: Message
}

interface ProductItem {
  id: string
  title: string
  image?: string
  price: string
  originalPrice?: string | null
  discount?: string | null
  rating?: number | null
  network: string
  url: string
  affiliateUrl?: string
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  // Extract products from tool calls if present
  const toolProducts: ProductItem[] = []
  if (message.toolInvocations) {
    for (const invocation of message.toolInvocations) {
      if (invocation.state === 'result' && invocation.result) {
        if (Array.isArray(invocation.result.products)) {
          toolProducts.push(...invocation.result.products)
        } else if (Array.isArray(invocation.result.pieces)) {
          toolProducts.push(...invocation.result.pieces)
        }
      }
    }
  }

  // Format simple markdown lines (bold, links, bullet points)
  function renderFormattedText(text: string) {
    // Regex for [Title](url)
    const linkRegex = /\[(.*?)\]\((.*?)\)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }
      parts.push(
        <Link
          key={match.index}
          href={match[2]}
          className="font-semibold text-primary underline underline-offset-2 hover:text-primary-hover"
        >
          {match[1]}
        </Link>
      )
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts
  }

  return (
    <div className={cn('mb-4 flex gap-3', isUser && 'flex-row-reverse')}>
      <div
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs shadow-sm',
          isUser
            ? 'bg-primary-bg text-primary border border-neutral-subtle'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-accent-cyan" />}
      </div>

      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed border space-y-2',
          isUser
            ? 'rounded-tr-sm bg-primary text-primary-foreground border-primary-hover shadow-sm'
            : 'rounded-tl-sm bg-white text-neutral-text border-neutral-subtle shadow-sm'
        )}
      >
        {message.content.split('\n').map((line, i) => {
          if (!line.trim()) return <div key={i} className="h-1.5" />

          // Header
          if (line.startsWith('### ')) {
            return (
              <h4 key={i} className="font-bold text-sm text-neutral-text pt-1">
                {line.replace('### ', '')}
              </h4>
            )
          }

          // Blockquote tip
          if (line.startsWith('> ')) {
            return (
              <div
                key={i}
                className="my-1.5 rounded-lg border border-primary/20 bg-primary-bg/50 px-3 py-1.5 text-xs text-primary font-medium"
              >
                {line.replace('> ', '')}
              </div>
            )
          }

          return (
            <p key={i} className="leading-relaxed">
              {renderFormattedText(line)}
            </p>
          )
        })}

        {/* Rich Product Cards rendered when AI returns tool results */}
        {toolProducts.length > 0 && (
          <div className="mt-3 space-y-2 pt-2 border-t border-neutral-subtle">
            <span className="text-[11px] font-bold text-neutral-muted uppercase tracking-wider">
              Matched Items:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {toolProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 rounded-xl border border-neutral-subtle bg-neutral-page/60 p-2.5 hover:border-primary transition-all group"
                >
                  {p.image && (
                    <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-white border border-neutral-subtle">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <Link
                      href={p.url}
                      className="block truncate font-semibold text-xs text-neutral-text group-hover:text-primary transition-colors"
                    >
                      {p.title}
                    </Link>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs font-bold text-neutral-text">{p.price}</span>
                      {p.discount && (
                        <span className="text-[10px] font-bold text-success bg-success-bg px-1.5 py-0.2 rounded">
                          {p.discount}
                        </span>
                      )}
                      <span className="text-[10px] font-medium text-neutral-muted uppercase">
                        via {p.network}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={p.affiliateUrl || p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-1.5 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
                    aria-label={`Buy ${p.title}`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
