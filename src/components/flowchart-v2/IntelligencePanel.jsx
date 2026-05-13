import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Brain, Search, DollarSign, ShoppingCart, Clock, AlertTriangle, TrendingUp, Database, Package } from 'lucide-react';
import './IntelligencePanel.css';

// Tool labels in Portuguese
const toolLabels = {
  memory: 'Busca Memória',
  ecommerce: 'Consulta E-Commerce',
  knowledge: 'Busca Conhecimento',
};

// Tool icons
const toolIcons = {
  memory: <Database size={16} />,
  ecommerce: <Package size={16} />,
  knowledge: <Search size={16} />,
};

// Metrics that update based on conversation progress (following RBBT Sales flow)
function getMetricsForMessage(messageIndex) {
  // Flow stages and their metrics
  // 0-3: Discovery (no cart yet)
  // 5: Product found (R$ 159,90)
  // 7: Cross-sell offered
  // 9+: Checkout process
  // 13+: Cart confirmed
  // 17: Total with shipping (R$ 175,80)
  // 19: PIX with discount (R$ 166,90)

  let ticketMedio = 0;
  let items = 0;
  let churnRisk = 60;
  let purchaseIntent = 15;

  if (messageIndex >= 19) {
    // PIX generated - sale complete
    ticketMedio = 166.90;
    items = 1;
    churnRisk = 5;
    purchaseIntent = 100;
  } else if (messageIndex >= 17) {
    // Payment options shown
    ticketMedio = 175.80;
    items = 1;
    churnRisk = 8;
    purchaseIntent = 95;
  } else if (messageIndex >= 13) {
    // Cart confirmed, shipping calculated
    ticketMedio = 159.90;
    items = 1;
    churnRisk = 12;
    purchaseIntent = 88;
  } else if (messageIndex >= 9) {
    // Cross-sell declined, checkout starting
    ticketMedio = 159.90;
    items = 1;
    churnRisk = 18;
    purchaseIntent = 75;
  } else if (messageIndex >= 7) {
    // Cross-sell offered
    ticketMedio = 319.80;
    items = 2;
    churnRisk = 22;
    purchaseIntent = 70;
  } else if (messageIndex >= 5) {
    // Product found
    ticketMedio = 159.90;
    items = 1;
    churnRisk = 30;
    purchaseIntent = 55;
  } else if (messageIndex >= 3) {
    // Profile classified
    churnRisk = 40;
    purchaseIntent = 35;
  } else if (messageIndex >= 1) {
    // Discovery started
    churnRisk = 50;
    purchaseIntent = 25;
  }

  return {
    ticketMedio,
    itensCarrinho: items,
    riscoChurn: churnRisk,
    propensaoCompra: purchaseIntent,
  };
}

// Event log messages based on conversation progress (following RBBT Sales flow)
function getEventsForMessage(messageIndex) {
  const events = [];
  const now = new Date();

  const addEvent = (offset, message, type = 'info') => {
    const time = new Date(now.getTime() - offset * 1000);
    const timestamp = time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    events.push({ id: `${messageIndex}-${offset}`, timestamp, message, type });
  };

  // Events following the complete RBBT Sales flow
  if (messageIndex >= 0) addEvent(0, 'Cliente indeciso identificado', 'info');
  if (messageIndex >= 1) addEvent(2, 'Discovery iniciado: ocasião', 'info');
  if (messageIndex >= 3) addEvent(4, 'Perfil: Classica/Minimalista', 'success');
  if (messageIndex >= 5) addEvent(6, 'Produto encontrado: Camiseta Egípcio', 'success');
  if (messageIndex >= 7) addEvent(8, 'Cross-sell executado: Camiseta Branca', 'info');
  if (messageIndex >= 9) addEvent(10, 'Checkout iniciado', 'info');
  if (messageIndex >= 11) addEvent(12, 'auth_simple_login_start enviado', 'info');
  if (messageIndex >= 13) addEvent(14, 'Login confirmado: Maria Silva', 'success');
  if (messageIndex >= 13) addEvent(15, 'Carrinho criado: SKU 139359', 'success');
  if (messageIndex >= 15) addEvent(17, 'CEP validado: 01310-100 SP', 'info');
  if (messageIndex >= 15) addEvent(18, 'Frete calculado: PAC/Sedex', 'success');
  if (messageIndex >= 17) addEvent(20, 'Frete selecionado: PAC R$15,90', 'info');
  if (messageIndex >= 19) addEvent(22, 'Pagamento: PIX selecionado', 'success');
  if (messageIndex >= 19) addEvent(23, 'Pedido finalizado! PIX gerado', 'success');

  return events.slice(-6).reverse();
}

export function IntelligencePanel({ phase, currentMessageIndex, activeTool }) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [activeSearches, setActiveSearches] = useState([]);
  const timerRef = useRef(null);
  const searchIdRef = useRef(0);

  // Timer for conversation duration
  const isConversationActive = currentMessageIndex >= 0;
  useEffect(() => {
    if (isConversationActive) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (!isConversationActive) {
        setElapsedTime(0);
        setActiveSearches([]);
      }
    };
  }, [isConversationActive]);

  // Handle active tool changes - add search actions
  useEffect(() => {
    if (activeTool && phase !== 'idle') {
      const newSearch = {
        id: `search-${searchIdRef.current++}`,
        tool: activeTool,
        label: toolLabels[activeTool],
        isActive: true,
        progress: 0,
      };

      setActiveSearches((prev) => {
        // Keep only last 2 searches to fit panel layout
        const updated = [...prev, newSearch].slice(-2);
        return updated;
      });

      // Animate progress
      const progressInterval = setInterval(() => {
        setActiveSearches((prev) =>
          prev.map((s) =>
            s.id === newSearch.id
              ? { ...s, progress: Math.min(100, s.progress + 10) }
              : s
          )
        );
      }, 100);

      // Mark as complete after 1s
      const completeTimeout = setTimeout(() => {
        clearInterval(progressInterval);
        setActiveSearches((prev) =>
          prev.map((s) =>
            s.id === newSearch.id
              ? { ...s, isActive: false, progress: 100 }
              : s
          )
        );
      }, 1000);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(completeTimeout);
      };
    }
  }, [activeTool, phase]);

  const metrics = getMetricsForMessage(currentMessageIndex);
  const events = getEventsForMessage(currentMessageIndex);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isProcessing = phase !== 'idle' && phase !== 'sending';

  return (
    <div className="intelligence-panel">
      {/* Header */}
      <div className="intelligence-header">
        <div className="intelligence-title">
          <Brain size={20} className="intelligence-icon" />
          <span>Inteligência Rbbt</span>
        </div>
        <div className={`intelligence-status ${isProcessing ? 'processing' : ''}`}>
          {isProcessing && <div className="status-spinner" />}
          <span>{isProcessing ? 'Processando...' : 'Pronto'}</span>
        </div>
      </div>

      {/* Search Actions */}
      <div className="intelligence-searches">
        <AnimatePresence mode="popLayout">
          {activeSearches.map((search) => (
            <motion.div
              key={search.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`search-card ${search.isActive ? 'active' : 'completed'}`}
            >
              <div className="search-header">
                <span className="search-icon">{toolIcons[search.tool]}</span>
                <span className="search-label">{search.label}</span>
              </div>
              <div className="search-progress">
                <motion.div
                  className="search-progress-bar"
                  initial={{ width: 0 }}
                  animate={{ width: `${search.progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {activeSearches.length === 0 && (
          <div className="search-placeholder">
            <Search size={16} />
            <span>Aguardando consultas...</span>
          </div>
        )}
      </div>

      {/* Metrics Section */}
      <div className="intelligence-metrics">
        <h3 className="metrics-title">MÉTRICAS EM TEMPO REAL</h3>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <DollarSign size={16} className="metric-icon green" />
              <span>Ticket Médio</span>
            </div>
            <motion.div
              className="metric-value"
              key={metrics.ticketMedio}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
            >
              R$ {metrics.ticketMedio.toFixed(2).replace('.', ',')}
            </motion.div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <ShoppingCart size={16} className="metric-icon purple" />
              <span>Itens no Carrinho</span>
            </div>
            <motion.div
              className="metric-value"
              key={metrics.itensCarrinho}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
            >
              {metrics.itensCarrinho}
            </motion.div>
          </div>

          <div className="metric-card full-width">
            <div className="metric-header">
              <Clock size={16} className="metric-icon blue" />
              <span>Tempo de Conversa</span>
            </div>
            <div className="metric-value">{formatTime(elapsedTime)}</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <AlertTriangle size={16} className="metric-icon yellow" />
              <span>Risco de Churn</span>
            </div>
            <div className="metric-bar-container">
              <motion.div
                className="metric-bar yellow"
                initial={{ width: 0 }}
                animate={{ width: `${metrics.riscoChurn}%` }}
                transition={{ duration: 0.5 }}
              />
              <span className="metric-bar-value">{metrics.riscoChurn}%</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <TrendingUp size={16} className="metric-icon green" />
              <span>Propensão de Compra</span>
            </div>
            <div className="metric-bar-container">
              <motion.div
                className="metric-bar green"
                initial={{ width: 0 }}
                animate={{ width: `${metrics.propensaoCompra}%` }}
                transition={{ duration: 0.5 }}
              />
              <span className="metric-bar-value">{metrics.propensaoCompra}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Log */}
      <div className="intelligence-log">
        <h3 className="log-title">LOG DE EVENTOS</h3>
        <div className="log-entries">
          <AnimatePresence mode="popLayout">
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className={`log-entry ${event.type}`}
              >
                <span className="log-timestamp">{event.timestamp}</span>
                <span className="log-dot" />
                <span className="log-message">{event.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {events.length === 0 && (
            <div className="log-empty">Nenhum evento registrado</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IntelligencePanel;
