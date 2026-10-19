'use client'

import { useEffect, useRef, useState } from 'react'
import { Bot, X, Send } from 'lucide-react'
import { useChat } from 'ai/react'
import { ChatMessage } from './ChatMessage'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type AgentTab = 'shopping' | 'style'

const AGENT_TABS: { id: AgentTab; label: string; icon: string; hint: string }[] = [
  {
    id: 'shopping',
    label: 'Shopping Assistant',
    icon: '🛍️',
    hint: 'Ask me to find products, compare prices, or hunt for deals!',
  },
  {
    id: 'style',
    label: 'Style Advisor',
    icon: '✨',
    hint: 'Describe your style, occasion, or body type and I\'ll suggest outfits!',
  },
]

interface ChatDrawerProps {
  open: boolean
  onClose: () => void
}

export function ChatDrawer({ open, onClose }: ChatDrawerProps) {
  const [activeTab, setActiveTab] = useState<AgentTab>('shopping')
  const endRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: `/api/ai/chat?agent=${activeTab}`,
  })

  useEffect(() => {
    setMessages([])
  }, [activeTab, setMessages])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const activeAgent = AGENT_TABS.find((t) => t.id === activeTab)!

  return (
    <div
      className={cn(
        'fixed bottom-0 right-0 z-50 flex h-[600px] w-full flex-col rounded-t-2xl border bg-white shadow-2xl transition-all duration-300 sm:bottom-6 sm:right-6 sm:h-[600px] sm:w-[400px] sm:rounded-2xl',
        open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      )}
    >
      <div className="flex items-center justify-between rounded-t-2xl bg-primary px-4 py-3 text-primary-foreground border-b border-primary-hover">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-accent-cyan" />
          <span className="font-bold text-primary-foreground">StylePilot AI</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-7 w-7 text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex border-b border-neutral-subtle bg-neutral-page">
        {AGENT_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex flex-1 items-center justify-center gap-1 px-3 py-2.5 text-xs font-semibold transition-colors',
              activeTab === tab.id
                ? 'border-b-2 border-primary text-primary bg-white'
                : 'text-neutral-muted hover:text-neutral-text'
            )}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-primary-bg/30">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-3 text-4xl">{activeAgent.icon}</div>
            <p className="text-sm font-medium text-neutral-text">{activeAgent.hint}</p>
            <div className="mt-4 flex flex-col gap-2 w-full">
              {activeTab === 'shopping' ? (
                <>
                  <SuggestionChip text="Find me earbuds under ₹2000" onSubmit={handleSubmit} onInput={handleInputChange} />
                  <SuggestionChip text="Compare iPhone 16 vs Samsung S25" onSubmit={handleSubmit} onInput={handleInputChange} />
                  <SuggestionChip text="Best laptop deals today" onSubmit={handleSubmit} onInput={handleInputChange} />
                </>
              ) : (
                <>
                  <SuggestionChip text="Outfit for a beach wedding" onSubmit={handleSubmit} onInput={handleInputChange} />
                  <SuggestionChip text="Capsule wardrobe for office" onSubmit={handleSubmit} onInput={handleInputChange} />
                  <SuggestionChip text="Casual summer look on a budget" onSubmit={handleSubmit} onInput={handleInputChange} />
                </>
              )}
            </div>
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 py-2 text-sm text-neutral-muted">
            <div className="flex gap-1 text-primary">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce [animation-delay:0.1s]">●</span>
              <span className="animate-bounce [animation-delay:0.2s]">●</span>
            </div>
            AI is searching and analyzing…
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-neutral-subtle p-3 bg-white">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder={`Ask ${activeAgent.label}…`}
          className="flex-1 rounded-lg border border-neutral-subtle px-3 py-2 text-sm text-neutral-text placeholder:text-neutral-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          className="bg-primary hover:bg-primary-hover active:bg-primary-pressed text-primary-foreground"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}

function SuggestionChip({
  text,
  onSubmit,
  onInput,
}: {
  text: string
  onSubmit: (e: React.FormEvent) => void
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  function handleClick() {
    const syntheticInput = { target: { value: text } } as React.ChangeEvent<HTMLInputElement>
    onInput(syntheticInput)
    setTimeout(() => {
      const syntheticForm = { preventDefault: () => {} } as React.FormEvent
      onSubmit(syntheticForm)
    }, 50)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-lg border border-neutral-subtle bg-primary-bg px-3 py-2 text-left text-xs text-primary font-medium transition-colors hover:bg-primary hover:text-white"
    >
      {text}
    </button>
  )
}
