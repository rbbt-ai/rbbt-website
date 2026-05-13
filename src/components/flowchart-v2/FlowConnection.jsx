import './FlowConnection.css';

/**
 * Calculates a bezier curve path between two points
 * Automatically determines if connection is more vertical or horizontal
 * and creates appropriate control points
 */
function calculateBezierPath(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Determine if connection is more horizontal or vertical
  const isHorizontal = Math.abs(dx) > Math.abs(dy);

  let cx1, cy1, cx2, cy2;

  if (isHorizontal) {
    // Horizontal connection: control points extend horizontally
    const offset = dx * 0.5;
    cx1 = x1 + offset;
    cy1 = y1;
    cx2 = x2 - offset;
    cy2 = y2;
  } else {
    // Vertical connection: control points extend vertically
    const offset = dy * 0.5;
    cx1 = x1;
    cy1 = y1 + offset;
    cx2 = x2;
    cy2 = y2 - offset;
  }

  return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
}

/**
 * FlowConnection - An animated SVG connection between flow nodes
 * Features bezier curves with traveling dot animation when active
 */
export function FlowConnection({
  x1,
  y1,
  x2,
  y2,
  isActive = false,
  className = '',
}) {
  const path = calculateBezierPath(x1, y1, x2, y2);

  return (
    <g className={`flow-connection ${isActive ? 'flow-connection--active' : ''} ${className}`}>
      {/* Background path (always visible) */}
      <path
        d={path}
        fill="none"
        className="flow-connection__path"
      />

      {/* Active state: dashed line overlay */}
      {isActive && (
        <path
          d={path}
          fill="none"
          className="flow-connection__path-active"
        />
      )}

      {/* Traveling dot animation when active */}
      {isActive && (
        <circle
          r="4"
          className="flow-connection__dot"
        >
          <animateMotion
            dur="1.5s"
            repeatCount="indefinite"
            path={path}
          />
        </circle>
      )}
    </g>
  );
}

export default FlowConnection;
