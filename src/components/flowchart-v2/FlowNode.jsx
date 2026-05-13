import './FlowNode.css';

const sizeConfig = {
  small: { width: 82, height: 56, iconSize: 16, fontSize: 10 },
  medium: { width: 85, height: 60, iconSize: 20, fontSize: 11 },
  large: { width: 100, height: 68, iconSize: 22, fontSize: 12 },
};

/**
 * FlowNode - A premium rectangular node box for agent flow visualization
 * Features rounded corners, icon above label, and animated active state
 */
export function FlowNode({
  icon: Icon, // eslint-disable-line no-unused-vars
  label,
  isActive = false,
  size = 'medium',
  className = '',
}) {
  const config = sizeConfig[size];

  return (
    <div
      className={`flow-node ${isActive ? 'flow-node--active' : ''} ${className}`}
      style={{
        width: config.width,
        height: config.height,
      }}
    >
      <Icon
        size={config.iconSize}
        className="flow-node__icon"
        strokeWidth={1.5}
      />
      <span
        className="flow-node__label"
        style={{ fontSize: config.fontSize }}
      >
        {label}
      </span>
    </div>
  );
}

export default FlowNode;
