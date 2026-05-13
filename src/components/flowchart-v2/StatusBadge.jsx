import { Loader2 } from 'lucide-react';
import './StatusBadge.css';

/**
 * StatusBadge - Shows status text below active nodes during AI processing
 * Features purple styling, optional spinner, and scale+fade entrance animation
 */
export function StatusBadge({
  text,
  showSpinner = true,
  className = '',
}) {
  return (
    <div className={`status-badge ${className}`}>
      {showSpinner && (
        <Loader2 size={14} className="status-badge__spinner" strokeWidth={2} />
      )}
      <span className="status-badge__text">{text}</span>
    </div>
  );
}

export default StatusBadge;
