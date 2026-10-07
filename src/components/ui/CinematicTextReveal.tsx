import React from 'react';
import { motion } from 'motion/react';

interface Props {
  lines: string[];
  className?: string;
  delay?: number;
  lineClassName?: string;
}

export const CinematicTextReveal: React.FC<Props> = ({
  lines,
  className = '',
  delay = 0.9,
  lineClassName = ''
}) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden py-0.5">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: delay + index * 0.22,
              ease: [0.16, 1, 0.3, 1] // smooth cinematic bezier
            }}
            className={lineClassName}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
};
