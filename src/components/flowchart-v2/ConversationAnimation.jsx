import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

// Conversation data following the complete Rbbt Sales flow for "Cliente Indeciso"
// Flow: Discovery -> Profile -> Search -> Decision -> Cross-sell -> Email -> Login -> Checkout -> PIX
export const conversationData = [
  // Scene 1: Discovery (Cliente Indeciso)
  {
    id: '1',
    text: 'Oi! Preciso de uma roupa nova mas não sei o que comprar, pode me ajudar?',
    sender: 'client',
    timestamp: '10:30',
  },
  {
    id: '2',
    text: 'Oi! Claro que sim! Me conta, é pra qual ocasião? Trabalho, dia a dia ou algum evento?',
    sender: 'agent',
    timestamp: '10:30',
  },
  {
    id: '3',
    text: 'Dia a dia mesmo, algo versátil. Uma camiseta de qualidade',
    sender: 'client',
    timestamp: '10:31',
  },
  {
    id: '4',
    text: 'Entendi! Você tem cara de quem valoriza qualidade e praticidade. Sobre cor, tem preferência?',
    sender: 'agent',
    timestamp: '10:31',
  },
  // Scene 2: Profile Classification + Product Search
  {
    id: '5',
    text: 'Preto, combina com tudo',
    sender: 'client',
    timestamp: '10:32',
  },
  {
    id: '6',
    text: 'Achei perfeita! Camiseta Algodão Egípcio Camys - super macia e durável. R$ 159,90. Qual seu tamanho?',
    sender: 'agent',
    timestamp: '10:32',
  },
  // Scene 3: Size + Purchase Intent
  {
    id: '7',
    text: 'M. Gostei muito! Vou querer!',
    sender: 'client',
    timestamp: '10:33',
  },
  {
    id: '8',
    text: 'Ótima escolha! Ah, temos a mesma em branco - muita gente leva as duas pq combinam com tudo! R$ 319,80 o par. Quer incluir?',
    sender: 'agent',
    timestamp: '10:33',
  },
  // Scene 4: Cross-sell Decision + Email Collection
  {
    id: '9',
    text: 'Hmm, vou levar só a preta por enquanto',
    sender: 'client',
    timestamp: '10:34',
  },
  {
    id: '10',
    text: 'Combinado! Pra continuar, preciso do seu email pra login',
    sender: 'agent',
    timestamp: '10:34',
  },
  // Scene 5: Email + Login Code
  {
    id: '11',
    text: 'maria.silva@email.com',
    sender: 'client',
    timestamp: '10:35',
  },
  {
    id: '12',
    text: 'Enviei um código de 6 dígitos pro seu email! Me passa quando chegar',
    sender: 'agent',
    timestamp: '10:35',
  },
  // Scene 6: Code Verification + Cart + CEP
  {
    id: '13',
    text: '847291',
    sender: 'client',
    timestamp: '10:36',
  },
  {
    id: '14',
    text: 'Login confirmado, Maria! Carrinho criado: Camiseta Egípcio Preta M - R$ 159,90. Qual seu CEP pro frete?',
    sender: 'agent',
    timestamp: '10:36',
  },
  // Scene 7: CEP + Shipping Options
  {
    id: '15',
    text: '01310-100',
    sender: 'client',
    timestamp: '10:37',
  },
  {
    id: '16',
    text: 'Frete calculado! PAC R$ 15,90 (5-7 dias) ou Sedex R$ 25,90 (2-3 dias). Qual prefere?',
    sender: 'agent',
    timestamp: '10:37',
  },
  // Scene 8: Shipping Selection + Payment Options
  {
    id: '17',
    text: 'PAC tá bom',
    sender: 'client',
    timestamp: '10:38',
  },
  {
    id: '18',
    text: 'Perfeito! Total: R$ 175,80. Como quer pagar? PIX com 5% off (R$ 166,90), Cartão em até 3x, ou Boleto?',
    sender: 'agent',
    timestamp: '10:38',
  },
  // Scene 9: Payment Selection + PIX Code
  {
    id: '19',
    text: 'PIX',
    sender: 'client',
    timestamp: '10:39',
  },
  {
    id: '20',
    text: 'Aqui está seu código PIX!\n\nValor: R$ 166,90\nValidade: 30 minutos\n\nAssim que confirmar o pagamento, envio o código de rastreio! Obrigada por comprar na Camys',
    sender: 'agent',
    timestamp: '10:39',
  },
];

// Animation timing constants
const TYPING_DURATION = 1500; // 1.5s typing indicator
const MESSAGE_DELAY = 2500; // 2.5s between exchanges
const LOOP_RESTART_DELAY = 5000; // 5s pause before loop restart

// Animation variants for messages
const messageVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export function ConversationAnimation({
  onComplete,
  loop = true,
  onMessageEvent,
  isPaused = false,
  restartRef,
}) {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationCycle, setAnimationCycle] = useState(0);

  // Use refs to track timers for cleanup and prevent memory leaks
  const timerRef = useRef(null);
  const isAnimatingRef = useRef(true);

  // Cleanup function for timers
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Reset animation to beginning
  const resetAnimation = useCallback(() => {
    clearTimer();
    onMessageEvent?.({ type: 'reset', messageIndex: -1, messageId: '' });
    setVisibleMessages([]);
    setShowTyping(false);
    setCurrentIndex(0);
    setAnimationCycle((prev) => prev + 1);
  }, [onMessageEvent, clearTimer]);

  // Expose restart function to parent via ref
  useEffect(() => {
    if (restartRef) {
      restartRef.current = resetAnimation;
    }
    return () => {
      if (restartRef) restartRef.current = null;
    };
  }, [restartRef, resetAnimation]);

  const addNextMessage = useCallback(() => {
    if (!isAnimatingRef.current) return;

    const nextMessage = conversationData[currentIndex];

    if (nextMessage.sender === 'agent') {
      onMessageEvent?.({
        type: 'agent_typing',
        messageIndex: currentIndex,
        messageId: nextMessage.id,
      });

      setShowTyping(true);
      clearTimer();
      timerRef.current = setTimeout(() => {
        if (!isAnimatingRef.current) return;

        onMessageEvent?.({
          type: 'agent_message',
          messageIndex: currentIndex,
          messageId: nextMessage.id,
        });

        setShowTyping(false);
        setVisibleMessages((prev) => [...prev, nextMessage]);
        setCurrentIndex((prev) => prev + 1);
      }, TYPING_DURATION);
    } else {
      onMessageEvent?.({
        type: 'client_message',
        messageIndex: currentIndex,
        messageId: nextMessage.id,
      });

      setVisibleMessages((prev) => [...prev, nextMessage]);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, clearTimer, onMessageEvent]);

  // Cleanup on unmount
  useEffect(() => {
    isAnimatingRef.current = true;
    return () => {
      isAnimatingRef.current = false;
      clearTimer();
    };
  }, [clearTimer]);

  // Main scheduling effect
  useEffect(() => {
    if (isPaused) {
      clearTimer();
      return;
    }

    // Start: first message
    if (currentIndex === 0 && visibleMessages.length === 0) {
      clearTimer();
      timerRef.current = setTimeout(addNextMessage, 500);
      return () => clearTimer();
    }

    // Middle: next message
    if (currentIndex > 0 && currentIndex < conversationData.length) {
      clearTimer();
      timerRef.current = setTimeout(addNextMessage, MESSAGE_DELAY);
      return () => clearTimer();
    }

    // End: loop restart after delay
    if (currentIndex >= conversationData.length && loop) {
      onComplete?.();
      clearTimer();
      timerRef.current = setTimeout(() => {
        resetAnimation();
      }, LOOP_RESTART_DELAY);
      return () => clearTimer();
    }
  }, [currentIndex, addNextMessage, clearTimer, visibleMessages.length, animationCycle, isPaused, loop, onComplete, resetAnimation]);

  return (
    <>
      <AnimatePresence mode="sync">
        {visibleMessages.map((message) => (
          <motion.div
            key={`${animationCycle}-${message.id}`}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <MessageBubble
              message={message.text}
              sender={message.sender}
              timestamp={message.timestamp}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <AnimatePresence>
        {showTyping && (
          <motion.div
            key={`typing-${animationCycle}`}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <TypingIndicator />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ConversationAnimation;
