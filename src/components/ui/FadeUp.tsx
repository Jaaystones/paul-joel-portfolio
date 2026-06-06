import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Wraps children in a fade-up entrance animation that triggers when the
 * element scrolls into view. Respects the OS "reduce motion" preference.
 */
const FadeUp = ({ children, delay = 0, className }: FadeUpProps) => {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.5,
        delay: shouldReduce ? 0 : delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;
