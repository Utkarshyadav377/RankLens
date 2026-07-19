import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', onClick, hoverGlow = true, delay = 0 }) => {
  const isClickable = typeof onClick === 'function';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={
        isClickable || hoverGlow
          ? {
              y: -3,
              borderColor: 'rgba(16, 185, 129, 0.25)',
              boxShadow: '0 20px 40px -15px rgba(16, 185, 129, 0.18), 0 0 24px -4px rgba(34, 211, 238, 0.1)',
            }
          : {}
      }
      whileTap={isClickable ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl border border-white/[0.06]
        bg-[#0d1f35]/50 backdrop-blur-xl p-6 transition-all duration-300
        ${isClickable ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {hoverGlow && (
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
