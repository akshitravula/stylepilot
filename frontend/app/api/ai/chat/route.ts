import { google } from '@ai-sdk/google'
import { streamText, createDataStreamResponse, formatDataStreamPart } from 'ai'
import { type NextRequest, NextResponse } from 'next/server'
import { SYSTEM_PROMPTS } from '@/lib/ai/system-prompts'
import { AI_TOOLS, searchProductsTool, suggestOutfitTool } from '@/lib/ai/tools'
import type { AIAgentType } from '@/types/ai'

export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const agentType = (req.nextUrl.searchParams.get('agent') ?? 'shopping') as string

    const agentMap: Record<string, AIAgentType> = {
      shopping: 'shopping-assistant',
      style: 'style-advisor',
      deal: 'deal-hunter',
    }
    const agent: AIAgentType = agentMap[agentType] ?? 'shopping-assistant'

    const apiKey =
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.GEMINI_API_KEY

    // If API key is available, use real Gemini 1.5 Flash with tool calling
    if (apiKey) {
      const result = streamText({
        model: google('gemini-1.5-flash'),
        system: SYSTEM_PROMPTS[agent],
        messages,
        tools: AI_TOOLS,
        maxSteps: 5,
        temperature: 0.7,
      })

      return result.toDataStreamResponse()
    }

    // Heuristic AI engine when no Gemini API key is configured yet
    const lastUserMessage = messages[messages.length - 1]?.content || ''
    const userPrompt = lastUserMessage.toLowerCase()

    return createDataStreamResponse({
      execute: async (dataStream) => {
        dataStream.writeData({ status: 'analyzing', message: 'Analyzing live catalog deals...' })

        let aiReply = ''

        if (agent === 'style-advisor' || userPrompt.includes('outfit') || userPrompt.includes('wear') || userPrompt.includes('style')) {
          const outfit = await suggestOutfitTool.execute({
            occasion: userPrompt.replace(/outfit for|what to wear to|style/g, '').trim() || 'smart casual outing',
          }, { toolCallId: 'call_outfit_1', messages })

          aiReply = `### ✨ StylePilot Curated Look for "${outfit.occasion}"\n\n`
          aiReply += `${outfit.styleTip}\n\n`
          aiReply += `**Estimated Total Look:** ${outfit.totalPrice}\n\n`

          outfit.pieces.forEach((piece, idx) => {
            aiReply += `${idx + 1}. **[${piece.title}](${piece.url})** — **${piece.price}** on *${piece.network.toUpperCase()}*\n`
          })

          aiReply += `\n> 💡 *All items can be purchased with verified deal tracking.*`
        } else {
          // Search products
          const searchRes = await searchProductsTool.execute({
            query: userPrompt.replace(/find me|search|looking for|under \d+/g, '').trim() || 'trending',
          }, { toolCallId: 'call_search_1', messages })

          if (searchRes.products.length > 0) {
            aiReply = `I found **${searchRes.products.length} verified deals** matching your request:\n\n`
            searchRes.products.forEach((p) => {
              const discountText = p.discount ? ` (${p.discount})` : ''
              aiReply += `• **[${p.title}](${p.url})**\n  **${p.price}**${discountText} via *${p.network.toUpperCase()}* • ⭐ ${p.rating ?? '4.2'}/5\n\n`
            })
            aiReply += `> ⚡ *Click any link above to view specs, live price drops, or buy with verified affiliate tracking.*`
          } else {
            aiReply = `I checked our multi-store catalog across Amazon, Myntra, and Flipkart, but couldn't find an exact match for "${lastUserMessage}".\n\nTry asking for:\n- *"Earbuds under ₹2000"*\n- *"Casual jeans for men"*\n- *"Nike running shoes"*\n- *"Curate an outfit for office"*`
          }
        }

        // Stream reply chunk by chunk for natural real-time streaming effect
        const words = aiReply.split(' ')
        for (let i = 0; i < words.length; i += 3) {
          const chunk = words.slice(i, i + 3).join(' ') + ' '
          dataStream.write(formatDataStreamPart('text', chunk))
          await new Promise((resolve) => setTimeout(resolve, 35))
        }
      },
    })
  } catch (error) {
    console.error('[AI Chat Error]', error)
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 })
  }
}
