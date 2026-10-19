'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

const ChatDrawer = dynamic(() => import('./ChatDrawer').then((mod) => mod.ChatDrawer), {
  ssr: false,
})

export function ChatBubble() {
  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  function handleOpen() {
    setHasOpened(true)
    setOpen(true)
  }

  return (
    <>
      <button
        id="chat"
        onClick={handleOpen}
        aria-label="Open AI Shopping Assistant"
        className={cn(
          'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl border border-primary-hover transition-all duration-300 hover:scale-105 hover:bg-primary-hover active:bg-primary-pressed hover:shadow-2xl',
          open && 'scale-0'
        )}
      >
        <Bot className="h-7 w-7 text-primary-foreground" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-warning text-[10px] font-bold text-white shadow-sm">
          AI
        </span>
      </button>

      {hasOpened && <ChatDrawer open={open} onClose={() => setOpen(false)} />}
    </>
  )
}
