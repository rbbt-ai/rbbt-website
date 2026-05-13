/**
 * Ambient type declarations para os componentes flowchart-v2 (JSX).
 * Esses componentes vieram do projeto rbbt-investor-pitch como JSX puro.
 * Em vez de converter pra TSX, declaramos os tipos básicos aqui.
 */

declare module '@/components/flowchart-v2/IntegratedDemo' {
  import type { FC } from 'react'
  export const IntegratedDemo: FC
  export default IntegratedDemo
}

declare module '@/components/flowchart-v2/WhatsAppDemo' {
  import type { FC, ReactNode } from 'react'
  export const WhatsAppDemo: FC<{ children?: ReactNode }>
}

declare module '@/components/flowchart-v2/ConversationAnimation' {
  import type { FC } from 'react'
  export const ConversationAnimation: FC<{
    onMessageEvent?: (event: unknown) => void
    isPaused?: boolean
    restartRef?: unknown
    loop?: boolean
  }>
  export const conversationData: Array<unknown>
}

declare module '@/components/flowchart-v2/AgentFlowGraph' {
  import type { FC } from 'react'
  export const AgentFlowGraph: FC<{ nodes?: unknown; connections?: unknown }>
}

declare module '@/components/flowchart-v2/IntelligencePanel' {
  import type { FC } from 'react'
  export const IntelligencePanel: FC<{
    phase?: string
    currentMessageIndex?: number
    activeTool?: string
  }>
}

declare module '@/components/flowchart-v2/useSyncedAnimation' {
  export function useSyncedAnimation(...args: unknown[]): unknown
}

declare module '@/components/flowchart-v2/FlowConnection' {
  import type { FC } from 'react'
  export const FlowConnection: FC<Record<string, unknown>>
}

declare module '@/components/flowchart-v2/FlowNode' {
  import type { FC } from 'react'
  export const FlowNode: FC<Record<string, unknown>>
}

declare module '@/components/flowchart-v2/StatusBadge' {
  import type { FC } from 'react'
  export const StatusBadge: FC<Record<string, unknown>>
}

declare module '@/components/flowchart-v2/MessageBubble' {
  import type { FC } from 'react'
  export const MessageBubble: FC<Record<string, unknown>>
}

declare module '@/components/flowchart-v2/TypingIndicator' {
  import type { FC } from 'react'
  export const TypingIndicator: FC<Record<string, unknown>>
}
