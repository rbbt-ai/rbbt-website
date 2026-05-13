import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import './TypingIndicator.css';

export function TypingIndicator() {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -4 },
  };

  const dotTransition = {
    duration: 0.4,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  };

  return (
    <div className="typing-indicator-wrapper">
      <div className="typing-indicator">
        <div className="typing-indicator__tail" />
        <div className="typing-indicator__dots">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="typing-indicator__dot"
              variants={dotVariants}
              initial="initial"
              animate="animate"
              transition={{
                ...dotTransition,
                delay: index * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
