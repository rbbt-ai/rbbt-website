import { useRef, useEffect } from 'react';
import './WhatsAppDemo.css';

function ChatHeader({ name, avatarUrl, isOnline = true }) {
  return (
    <div className="whatsapp-header">
      <div className="header-left">
        <button className="back-button" aria-label="Go back">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
        <div className="avatar-container">
          {avatarUrl ? (
            <img src={avatarUrl} alt={`${name}'s avatar`} className="avatar" />
          ) : (
            <div className="avatar avatar-placeholder">
              <svg viewBox="0 0 212 212" width="40" height="40">
                <path fill="#DFE5E7" d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.251,212C47.846,212,0.5,164.654,0.5,106.25S47.846,0.5,106.251,0.5z" />
                <path fill="#FFFFFF" d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c24.897,25.793,59.747,41.895,98.252,41.895 c38.505,0,73.354-16.102,98.252-41.895c-0.031-0.055-0.071-0.118-0.105-0.174C174.594,173.238,174.117,172.463,173.561,171.615z" />
                <circle fill="#FFFFFF" cx="106.002" cy="77.21" r="36.71" />
              </svg>
            </div>
          )}
        </div>
        <div className="contact-info">
          <span className="contact-name">{name}</span>
          <span className="contact-status">
            {isOnline ? 'online' : 'last seen recently'}
          </span>
        </div>
      </div>
      <div className="header-right">
        <button className="header-action" aria-label="Video call">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
          </svg>
        </button>
        <button className="header-action" aria-label="Voice call">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </button>
        <button className="header-action" aria-label="More options">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function WhatsAppDemo({ children }) {
  const chatAreaRef = useRef(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    const el = chatAreaRef.current;
    if (!el) return;

    const observer = new MutationObserver(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    });

    observer.observe(el, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="whatsapp-container">
      <ChatHeader name="Cami | Camys" avatarUrl="/cami_avatar_whapp.png" isOnline={true} />
      <div className="whatsapp-chat-area" ref={chatAreaRef}>
        {children}
      </div>
      <div className="whatsapp-input-area">
        <button className="input-action" aria-label="Emoji">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
        </button>
        <button className="input-action" aria-label="Attach">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" />
          </svg>
        </button>
        <div className="message-input-container">
          <input
            type="text"
            className="message-input"
            placeholder="Type a message"
            readOnly
          />
        </div>
        <button className="input-action mic-button" aria-label="Voice message">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default WhatsAppDemo;
