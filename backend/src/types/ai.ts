export type AIRole = 'user' | 'assistant' | 'system'

export type AIAgentType = 'shopping-assistant' | 'style-advisor' | 'deal-hunter'

export interface ChatMessage {
  id: string
  role: AIRole
  content: string
  createdAt?: Date
  products?: import('./product').Product[]
}

export interface AIToolCall {
  toolName: string
  args: Record<string, unknown>
  result?: unknown
}
