import { motion } from 'motion/react';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${sizes[size]} relative flex items-center justify-center`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="logoGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        
        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#logoGradient)"
          strokeWidth="3"
          fill="none"
        />
        
        {/* Indian Rupee symbol inspired design */}
        {/* Top horizontal line */}
        <path
          d="M25 30 L75 30"
          stroke="url(#logoGradient2)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Second horizontal line */}
        <path
          d="M25 40 L70 40"
          stroke="url(#logoGradient2)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Vertical line forming P */}
        <path
          d="M30 30 L30 75"
          stroke="url(#logoGradient2)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Curve for P and W integration */}
        <path
          d="M30 40 Q50 40, 50 50 T30 60"
          stroke="url(#logoGradient2)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Diagonal line (rupee symbol) */}
        <path
          d="M35 60 L75 75"
          stroke="url(#logoGradient2)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        
        {/* W shape integrated */}
        <path
          d="M50 50 L55 70 L60 55 L65 70 L70 50"
          stroke="url(#logoGradient2)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Accent dots for price comparison theme */}
        <circle cx="20" cy="50" r="2.5" fill="url(#logoGradient)" />
        <circle cx="80" cy="50" r="2.5" fill="url(#logoGradient)" />
        <circle cx="50" cy="20" r="2.5" fill="url(#logoGradient)" />
      </svg>
    </motion.div>
  );
}
