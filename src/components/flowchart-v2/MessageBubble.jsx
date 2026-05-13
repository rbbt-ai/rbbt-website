import './MessageBubble.css';

export function MessageBubble({ message, sender, timestamp }) {
  return (
    <div className={`message-bubble-wrapper message-bubble-wrapper--${sender}`}>
      <div className={`message-bubble message-bubble--${sender}`}>
        <span className="message-bubble__text">{message}</span>
        <span className="message-bubble__timestamp">{timestamp}</span>
        <div className={`message-bubble__tail message-bubble__tail--${sender}`} />
      </div>
    </div>
  );
}

export default MessageBubble;
