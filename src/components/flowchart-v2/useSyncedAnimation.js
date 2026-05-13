import { useState, useCallback, useRef, useEffect } from 'react';

// Animation phase durations (ms) - slower for viewers to follow the logic
const PHASE_DURATIONS = {
  receiving: 600,      // WhatsApp -> Agent connection time
  processing: 800,     // Agent analyzing time
  memory: 1000,        // Memory lookup time
  ecommerce: 1000,     // E-commerce query time
  knowledge: 1000,     // Knowledge search time
  responding: 800,     // Response preparation time
  sending: 600,        // Response -> WhatsApp time
};

// Helper to create default inactive state
const createInactiveNode = () => ({ isActive: false });
const createInactiveConnection = () => ({ isActive: false });

// Initial state
const createInitialState = () => ({
  nodes: {
    agent: createInactiveNode(),
    memoria: createInactiveNode(),
    ecommerce: createInactiveNode(),
    conhecimento: createInactiveNode(),
    response: createInactiveNode(),
  },
  connections: {
    whatsappToAgent: createInactiveConnection(),
    agentToMemoria: createInactiveConnection(),
    agentToEcommerce: createInactiveConnection(),
    agentToConhecimento: createInactiveConnection(),
    agentToResponse: createInactiveConnection(),
    responseToWhatsapp: createInactiveConnection(),
  },
  currentMessageIndex: -1,
  phase: 'idle',
});

/**
 * Determines which tools to activate based on message content/context
 * Following the complete Rbbt Sales flow for "Cliente Indeciso"
 *
 * Tool responsibilities:
 * - Memory: nome da cliente, historico de compras, lembrancas do chat, contexto
 * - E-Commerce: precos, descricao de produto, checkout, auth, shipping, payment
 * - Knowledge: perfil da marca, tom de voz, fluxo de atendimento, tecnicas de venda
 */
function getToolsForMessage(messageIndex) {
  switch (messageIndex) {
    // === DISCOVERY PHASE ===
    case 1:
      // Msg 2: "Oi! Claro que sim! Me conta, e pra qual ocasiao?"
      // Knowledge: tom de voz, fluxo de discovery (perguntar ocasiao)
      return ['knowledge'];

    case 3:
      // Msg 4: "Entendi! Voce tem cara de quem valoriza qualidade..."
      // Memory: comecar a construir perfil
      // Knowledge: classificacao de perfil, cascade 8 steps
      return ['memory', 'knowledge'];

    // === SEARCH PHASE ===
    case 5:
      // Msg 6: "Achei perfeita! Camiseta Algodao Egipcio Camys..."
      // E-Commerce: wake_search_products
      // Knowledge: informacoes do produto
      return ['ecommerce', 'knowledge'];

    // === CROSS-SELL PHASE (OBRIGATORIO) ===
    case 7:
      // Msg 8: "Otima escolha! Ah, temos a mesma em branco..."
      // Memory: lembrar tamanho M que cliente pediu
      // E-Commerce: SKU da camiseta branca cross-sell
      // Knowledge: tecnica de cross-sell
      return ['memory', 'ecommerce', 'knowledge'];

    // === EMAIL COLLECTION PHASE ===
    case 9:
      // Msg 10: "Combinado! Pra continuar, preciso do seu email..."
      // Memory: salvar preferencia (so preta)
      // Knowledge: protocolo de checkout
      return ['memory', 'knowledge'];

    // === AUTH PHASE ===
    case 11:
      // Msg 12: "Enviei um codigo de 6 digitos..."
      // E-Commerce: auth_simple_login_start
      return ['ecommerce'];

    // === CART CREATION PHASE ===
    case 13:
      // Msg 14: "Login confirmado, Maria! Carrinho criado..."
      // Memory: buscar nome do cliente
      // E-Commerce: verify code, checkout_create_checkout, checkout_add_to_checkout
      return ['memory', 'ecommerce'];

    // === SHIPPING PHASE ===
    case 15:
      // Msg 16: "Frete calculado! PAC R$ 15,90..."
      // E-Commerce: lookup_cep, get_shipping_quotes
      return ['ecommerce'];

    // === PAYMENT OPTIONS PHASE ===
    case 17:
      // Msg 18: "Perfeito! Total: R$ 175,80. Como quer pagar?"
      // E-Commerce: select_shipping, get_payment_methods
      return ['ecommerce'];

    // === PIX GENERATION PHASE ===
    case 19:
      // Msg 20: "Aqui esta seu codigo PIX!"
      // E-Commerce: select_payment, complete_checkout
      return ['ecommerce'];

    default:
      // Client messages (even indexes) - shouldn't reach here
      return ['knowledge'];
  }
}

/**
 * Hook to synchronize Agent Flow visualization with WhatsApp conversation animation
 *
 * Flow for each message exchange:
 * 1. Client message: WhatsApp -> Agent connection activates
 * 2. Agent typing starts: Agent node active with "Processando..."
 * 3. Tools activated sequentially based on message context
 * 4. Response node activates with "Enviando..."
 * 5. Agent message appears: Response -> WhatsApp connection activates
 */
export function useSyncedAnimation() {
  const [state, setState] = useState(createInitialState);
  const timersRef = useRef([]);

  // Clear all pending timers
  const clearTimers = useCallback(() => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const reset = useCallback(() => {
    clearTimers();
    setState(createInitialState());
  }, [clearTimers]);

  const handleMessageEvent = useCallback((event) => {
    clearTimers();

    switch (event.type) {
      case 'reset':
        reset();
        break;

      case 'client_message': {
        // Phase 1: Client message received - activate WhatsApp -> Agent connection
        setState(prev => ({
          ...prev,
          currentMessageIndex: event.messageIndex,
          phase: 'receiving',
          connections: {
            ...createInitialState().connections,
            whatsappToAgent: { isActive: true },
          },
          nodes: createInitialState().nodes,
        }));

        // Transition to agent processing after delay
        const t1 = setTimeout(() => {
          setState(prev => ({
            ...prev,
            phase: 'processing',
            connections: {
              ...createInitialState().connections,
            },
            nodes: {
              ...createInitialState().nodes,
              agent: { isActive: true },
            },
          }));
        }, PHASE_DURATIONS.receiving);
        timersRef.current.push(t1);
        break;
      }

      case 'agent_typing': {
        // Agent is typing - run through the processing phases
        const tools = getToolsForMessage(event.messageIndex);
        let delay = 0;

        // Phase 2: Processing (already showing from client_message, but reinforce)
        setState(prev => ({
          ...prev,
          phase: 'processing',
          nodes: {
            ...createInitialState().nodes,
            agent: { isActive: true },
          },
          connections: createInitialState().connections,
        }));
        delay += PHASE_DURATIONS.processing;

        // Phase 3: Memory lookup (always happens first)
        if (tools.includes('memory')) {
          const t1 = setTimeout(() => {
            setState(prev => ({
              ...prev,
              phase: 'memory',
              nodes: {
                ...createInitialState().nodes,
                agent: { isActive: true },
                memoria: { isActive: true },
              },
              connections: {
                ...createInitialState().connections,
                agentToMemoria: { isActive: true },
              },
            }));
          }, delay);
          timersRef.current.push(t1);
          delay += PHASE_DURATIONS.memory;
        }

        // Phase 4: E-commerce query
        if (tools.includes('ecommerce')) {
          const t2 = setTimeout(() => {
            setState(prev => ({
              ...prev,
              phase: 'ecommerce',
              nodes: {
                ...createInitialState().nodes,
                agent: { isActive: true },
                ecommerce: { isActive: true },
              },
              connections: {
                ...createInitialState().connections,
                agentToEcommerce: { isActive: true },
              },
            }));
          }, delay);
          timersRef.current.push(t2);
          delay += PHASE_DURATIONS.ecommerce;
        }

        // Phase 5: Knowledge search
        if (tools.includes('knowledge')) {
          const t3 = setTimeout(() => {
            setState(prev => ({
              ...prev,
              phase: 'knowledge',
              nodes: {
                ...createInitialState().nodes,
                agent: { isActive: true },
                conhecimento: { isActive: true },
              },
              connections: {
                ...createInitialState().connections,
                agentToConhecimento: { isActive: true },
              },
            }));
          }, delay);
          timersRef.current.push(t3);
          delay += PHASE_DURATIONS.knowledge;
        }

        // Phase 6: Response preparation
        const t4 = setTimeout(() => {
          setState(prev => ({
            ...prev,
            phase: 'responding',
            nodes: {
              ...createInitialState().nodes,
              agent: { isActive: true },
              response: { isActive: true },
            },
            connections: {
              ...createInitialState().connections,
              agentToResponse: { isActive: true },
            },
          }));
        }, delay);
        timersRef.current.push(t4);
        break;
      }

      case 'agent_message': {
        // Phase 7: Response sent - activate Response -> WhatsApp connection
        setState(prev => ({
          ...prev,
          phase: 'sending',
          nodes: {
            ...createInitialState().nodes,
            response: { isActive: true },
          },
          connections: {
            ...createInitialState().connections,
            responseToWhatsapp: { isActive: true },
          },
        }));

        // Return to idle after sending completes
        const t1 = setTimeout(() => {
          setState(prev => ({
            ...prev,
            phase: 'idle',
            nodes: createInitialState().nodes,
            connections: createInitialState().connections,
          }));
        }, PHASE_DURATIONS.sending);
        timersRef.current.push(t1);
        break;
      }
    }
  }, [clearTimers, reset]);

  return {
    ...state,
    handleMessageEvent,
    reset,
  };
}

export default useSyncedAnimation;
