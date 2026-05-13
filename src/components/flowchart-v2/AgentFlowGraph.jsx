import { Bot, Brain, ShoppingCart, Database, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FlowNode } from './FlowNode';
import { FlowConnection } from './FlowConnection';
import { StatusBadge } from './StatusBadge';
import './AgentFlowGraph.css';

// Animation variants for status badges - smooth enter/exit
const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -4 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.8, y: 4, transition: { duration: 0.15, ease: 'easeIn' } },
};

// Layout constants
const GRAPH_WIDTH = 380;
const GRAPH_HEIGHT = 310;

// Node positions (center points) - scaled ~0.78x
const NODE_POSITIONS = {
  agent: { x: 94, y: 155 },
  memoria: { x: 94, y: 46 },
  ecommerce: { x: 250, y: 78 },
  conhecimento: { x: 250, y: 232 },
  response: { x: 94, y: 264 },
};

// Node sizes for calculating connection points
const NODE_SIZES = {
  small: { width: 82, height: 56 },
  medium: { width: 85, height: 60 },
  large: { width: 100, height: 68 },
};

/**
 * AgentFlowGraph - Complete layout of the AI agent flow visualization
 * Shows WhatsApp (external) -> AI Agent -> Memoria/E-Commerce/Conhecimento/Response flow
 * Cliente node removed - WhatsApp mockup replaces it in IntegratedDemo
 */
export function AgentFlowGraph({
  nodes = {},
  connections = {},
  className = '',
}) {
  const {
    agent = { isActive: false },
    memoria = { isActive: false },
    ecommerce = { isActive: false },
    conhecimento = { isActive: false },
    response = { isActive: false },
  } = nodes;

  const {
    whatsappToAgent = { isActive: false },
    agentToMemoria = { isActive: false },
    agentToEcommerce = { isActive: false },
    agentToConhecimento = { isActive: false },
    agentToResponse = { isActive: false },
    responseToWhatsapp = { isActive: false },
  } = connections;

  // Calculate connection endpoints based on node positions and sizes
  // WhatsApp (external, off-canvas left) -> Agent (large): horizontal from left edge
  const connWhatsappToAgent = {
    x1: 0,
    y1: NODE_POSITIONS.agent.y,
    x2: NODE_POSITIONS.agent.x - NODE_SIZES.large.width / 2,
    y2: NODE_POSITIONS.agent.y,
  };

  // Agent (large) -> Memoria (small): vertical up
  const connAgentToMemoria = {
    x1: NODE_POSITIONS.agent.x,
    y1: NODE_POSITIONS.agent.y - NODE_SIZES.large.height / 2,
    x2: NODE_POSITIONS.memoria.x,
    y2: NODE_POSITIONS.memoria.y + NODE_SIZES.small.height / 2,
  };

  // Agent (large) -> E-Commerce (small): diagonal to top-right
  const connAgentToEcommerce = {
    x1: NODE_POSITIONS.agent.x + NODE_SIZES.large.width / 2,
    y1: NODE_POSITIONS.agent.y - NODE_SIZES.large.height / 4,
    x2: NODE_POSITIONS.ecommerce.x - NODE_SIZES.small.width / 2,
    y2: NODE_POSITIONS.ecommerce.y,
  };

  // Agent (large) -> Conhecimento (small): diagonal to bottom-right
  const connAgentToConhecimento = {
    x1: NODE_POSITIONS.agent.x + NODE_SIZES.large.width / 2,
    y1: NODE_POSITIONS.agent.y + NODE_SIZES.large.height / 4,
    x2: NODE_POSITIONS.conhecimento.x - NODE_SIZES.small.width / 2,
    y2: NODE_POSITIONS.conhecimento.y,
  };

  // Agent (large) -> Response (small): vertical down
  const connAgentToResponse = {
    x1: NODE_POSITIONS.agent.x,
    y1: NODE_POSITIONS.agent.y + NODE_SIZES.large.height / 2,
    x2: NODE_POSITIONS.response.x,
    y2: NODE_POSITIONS.response.y - NODE_SIZES.small.height / 2,
  };

  // Response (small) -> WhatsApp (external, off-canvas left): horizontal to left edge
  const connResponseToWhatsapp = {
    x1: NODE_POSITIONS.response.x - NODE_SIZES.small.width / 2,
    y1: NODE_POSITIONS.response.y,
    x2: 0,
    y2: NODE_POSITIONS.response.y,
  };

  return (
    <div
      className={`agent-flow-graph ${className}`}
      style={{
        position: 'relative',
        width: GRAPH_WIDTH,
        height: GRAPH_HEIGHT,
        background: '#0a0a0b',
      }}
    >
      {/* SVG connections layer */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <FlowConnection {...connWhatsappToAgent} isActive={whatsappToAgent.isActive} id="conn-whatsapp-agent" />
        <FlowConnection {...connAgentToMemoria} isActive={agentToMemoria.isActive} id="conn-agent-memoria" />
        <FlowConnection {...connAgentToEcommerce} isActive={agentToEcommerce.isActive} id="conn-agent-ecommerce" />
        <FlowConnection {...connAgentToConhecimento} isActive={agentToConhecimento.isActive} id="conn-agent-conhecimento" />
        <FlowConnection {...connAgentToResponse} isActive={agentToResponse.isActive} id="conn-agent-response" />
        <FlowConnection {...connResponseToWhatsapp} isActive={responseToWhatsapp.isActive} id="conn-response-whatsapp" />
      </svg>

      {/* Nodes layer */}
      {/* AI Agent - left side (large) */}
      <div
        style={{
          position: 'absolute',
          left: NODE_POSITIONS.agent.x - NODE_SIZES.large.width / 2,
          top: NODE_POSITIONS.agent.y - NODE_SIZES.large.height / 2,
        }}
      >
        <FlowNode icon={Bot} label="AI Agent" size="large" isActive={agent.isActive} />
        <AnimatePresence>
          {agent.isActive && agent.statusText && (
            <motion.div
              key="agent-badge"
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' }}
            >
              <StatusBadge text={agent.statusText} showSpinner />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Memoria - top of Agent */}
      <div
        style={{
          position: 'absolute',
          left: NODE_POSITIONS.memoria.x - NODE_SIZES.small.width / 2,
          top: NODE_POSITIONS.memoria.y - NODE_SIZES.small.height / 2,
        }}
      >
        <FlowNode icon={Brain} label="Memória" size="small" isActive={memoria.isActive} />
        <AnimatePresence>
          {memoria.isActive && memoria.statusText && (
            <motion.div
              key="memoria-badge"
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' }}
            >
              <StatusBadge text={memoria.statusText} showSpinner />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* E-Commerce - top-right */}
      <div
        style={{
          position: 'absolute',
          left: NODE_POSITIONS.ecommerce.x - NODE_SIZES.small.width / 2,
          top: NODE_POSITIONS.ecommerce.y - NODE_SIZES.small.height / 2,
        }}
      >
        <FlowNode icon={ShoppingCart} label="E-Commerce" size="small" isActive={ecommerce.isActive} />
        <AnimatePresence>
          {ecommerce.isActive && ecommerce.statusText && (
            <motion.div
              key="ecommerce-badge"
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' }}
            >
              <StatusBadge text={ecommerce.statusText} showSpinner />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Conhecimento - bottom-right */}
      <div
        style={{
          position: 'absolute',
          left: NODE_POSITIONS.conhecimento.x - NODE_SIZES.small.width / 2,
          top: NODE_POSITIONS.conhecimento.y - NODE_SIZES.small.height / 2,
        }}
      >
        <FlowNode icon={Database} label="Conhecimento" size="small" isActive={conhecimento.isActive} />
        <AnimatePresence>
          {conhecimento.isActive && conhecimento.statusText && (
            <motion.div
              key="conhecimento-badge"
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' }}
            >
              <StatusBadge text={conhecimento.statusText} showSpinner />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Response - bottom of Agent */}
      <div
        style={{
          position: 'absolute',
          left: NODE_POSITIONS.response.x - NODE_SIZES.small.width / 2,
          top: NODE_POSITIONS.response.y - NODE_SIZES.small.height / 2,
        }}
      >
        <FlowNode icon={MessageCircle} label="Response" size="small" isActive={response.isActive} />
        <AnimatePresence>
          {response.isActive && response.statusText && (
            <motion.div
              key="response-badge"
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' }}
            >
              <StatusBadge text={response.statusText} showSpinner />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AgentFlowGraph;
