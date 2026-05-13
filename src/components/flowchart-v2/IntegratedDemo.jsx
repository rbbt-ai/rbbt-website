import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, X } from 'lucide-react';
import { WhatsAppDemo } from './WhatsAppDemo';
import { ConversationAnimation, conversationData } from './ConversationAnimation';
import { AgentFlowGraph } from './AgentFlowGraph';
import { IntelligencePanel } from './IntelligencePanel';
import { useSyncedAnimation } from './useSyncedAnimation';
import './IntegratedDemo.css';

// Status text mapping for each phase (in Portuguese)
const phaseStatusText = {
  idle: 'Aguardando mensagem...',
  receiving: 'Recebendo mensagem do cliente...',
  processing: 'Agente IA processando...',
  memory: 'Consultando memória de conversas...',
  ecommerce: 'Verificando estoque e preços...',
  knowledge: 'Pesquisando base de conhecimento...',
  responding: 'Preparando resposta...',
  sending: 'Enviando resposta ao cliente...',
};

const TOTAL_MESSAGES = conversationData.length;
const MOBILE_BREAKPOINT = 768;

function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

/**
 * DemoContent - The actual demo layout (shared between inline desktop and fullscreen modal)
 */
function DemoContent({ nodes, connections, handleMessageEvent, isVisible, restartRef, phase, currentMessageIndex, activeTool, activeDotIndex, handleRestart }) {
  return (
    <>
      <div className="integrated-demo-content">
        <div className="integrated-demo-whatsapp">
          <WhatsAppDemo>
            <ConversationAnimation
              onMessageEvent={handleMessageEvent}
              isPaused={!isVisible}
              restartRef={restartRef}
              loop
            />
          </WhatsAppDemo>
        </div>

        <div
          className={`integrated-demo-connector ${phase === 'receiving' ? 'connector--receiving' : ''} ${phase === 'sending' ? 'connector--sending' : ''}`}
          aria-hidden="true"
        >
          <svg className="connector-svg" viewBox="0 0 60 20" preserveAspectRatio="none">
            <line x1="0" y1="10" x2="60" y2="10" className="connector-line" />
            {(phase === 'receiving' || phase === 'sending') && (
              <circle r="4" className={`connector-dot connector-dot--${phase}`}>
                <animateMotion
                  dur="0.6s"
                  repeatCount="indefinite"
                  path={phase === 'receiving' ? 'M 0 10 L 60 10' : 'M 60 10 L 0 10'}
                />
              </circle>
            )}
          </svg>
        </div>

        <div className="integrated-demo-flow">
          <AgentFlowGraph nodes={nodes} connections={connections} />
        </div>

        <div className="integrated-demo-intelligence">
          <IntelligencePanel
            phase={phase}
            currentMessageIndex={currentMessageIndex}
            activeTool={activeTool}
          />
        </div>
      </div>

      <div className="integrated-demo-controls">
        <div className="integrated-demo-progress">
          {Array.from({ length: TOTAL_MESSAGES }, (_, i) => (
            <div
              key={i}
              className={`progress-dot ${i === activeDotIndex ? 'active' : ''} ${i < activeDotIndex ? 'completed' : ''}`}
              aria-label={`Mensagem ${i + 1} de ${TOTAL_MESSAGES}`}
            />
          ))}
        </div>

        <button
          className="restart-button"
          onClick={handleRestart}
          aria-label="Reiniciar"
        >
          Reiniciar
        </button>

        <div className="integrated-demo-status">
          {phaseStatusText[phase] || phaseStatusText.idle}
        </div>
      </div>
    </>
  );
}

/**
 * Virtual desktop viewport dimensions that the demo content is designed for.
 * The scaler transform shrinks/rotates this to fit any screen.
 */
const VIEWPORT_W = 1200;
const VIEWPORT_H = 680;

/**
 * FullscreenModal - Portal-based fullscreen overlay for mobile demo viewing.
 * Uses JavaScript-calculated transform instead of CSS min()/vh/vw which are
 * unreliable on iOS Safari (100vh includes area behind the URL bar).
 */
function FullscreenModal({ onClose, children }) {
  const [scalerStyle, setScalerStyle] = useState({});

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Attempt to lock orientation to landscape (usually fails on iOS Safari)
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch(() => {});
    }

    function computeTransform() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isPortrait = h > w;

      if (isPortrait) {
        // Phone is portrait: rotate 90deg so content appears landscape.
        // After rotation, available space is h (width) x w (height).
        const scale = Math.min(h / VIEWPORT_W, w / VIEWPORT_H) * 0.95;
        setScalerStyle({
          transform: `rotate(90deg) scale(${scale})`,
          transformOrigin: 'center center',
        });
      } else {
        // Phone is landscape or desktop: just scale to fit
        const scale = Math.min(w / VIEWPORT_W, h / VIEWPORT_H) * 0.95;
        setScalerStyle({
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        });
      }
    }

    computeTransform();
    window.addEventListener('resize', computeTransform);

    // Also listen for orientation change (iOS fires this before resize settles)
    const handleOrientationChange = () => {
      setTimeout(computeTransform, 150); // delay for Safari to update dimensions
    };
    window.addEventListener('orientationchange', handleOrientationChange);

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = '';
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
      window.removeEventListener('resize', computeTransform);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <div className="integrated-demo-modal-overlay" role="dialog" aria-modal="true" aria-label="Demonstracao do agente Cami em tela cheia">
      <button
        className="integrated-demo-modal-close"
        onClick={onClose}
        aria-label="Fechar"
      >
        <X size={20} />
      </button>
      <div className="integrated-demo-modal-scaler" style={scalerStyle}>
        <div className="integrated-demo-modal-viewport">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

/**
 * IntegratedDemo - Combined WhatsApp mockup with Agent Flow visualization.
 * On mobile (<768px), shows a CTA button that opens a fullscreen landscape modal.
 * On desktop, renders the full demo inline as before.
 */
export function IntegratedDemo() {
  const { nodes, connections, handleMessageEvent, currentMessageIndex, phase, reset } = useSyncedAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);
  const restartRef = useRef(null);
  const isMobile = useIsMobile();

  // IntersectionObserver: pause animation when component is off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // When modal opens on mobile, consider it visible for animation purposes
  const effectiveIsVisible = isModalOpen || isVisible;

  const handleRestart = () => {
    reset();
    restartRef.current?.();
  };

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Calculate which message dot should be active (0-based index)
  const activeDotIndex = currentMessageIndex >= 0 ? currentMessageIndex : -1;

  // Derive active tool from phase
  const activeTool =
    phase === 'memory' ? 'memory' :
    phase === 'ecommerce' ? 'ecommerce' :
    phase === 'knowledge' ? 'knowledge' :
    null;

  const demoContentProps = {
    nodes,
    connections,
    handleMessageEvent,
    isVisible: effectiveIsVisible,
    restartRef,
    phase,
    currentMessageIndex,
    activeTool,
    activeDotIndex,
    handleRestart,
  };

  return (
    <div className="integrated-demo" ref={containerRef}>
      <h2 className="integrated-demo-title">
        <span>RBBT Sales</span> — Agent Flow
      </h2>

      {isMobile ? (
        /* Mobile: show CTA button that opens fullscreen modal */
        <div className="integrated-demo-mobile-cta">
          <button
            className="integrated-demo-cta-button"
            onClick={openModal}
            aria-label="Abrir demonstracao da Cami em tela cheia"
          >
            <Maximize2 size={22} strokeWidth={2.5} className="cta-icon" />
            <span className="cta-text">Veja a Cami atendendo</span>
          </button>
          <p className="integrated-demo-cta-hint">
            Toque para ver em tela cheia
          </p>
        </div>
      ) : (
        /* Desktop: render the full demo inline */
        <DemoContent {...demoContentProps} />
      )}

      {/* Fullscreen modal (renders via portal) */}
      {isModalOpen && (
        <FullscreenModal onClose={closeModal}>
          <DemoContent {...demoContentProps} />
        </FullscreenModal>
      )}
    </div>
  );
}

export default IntegratedDemo;
