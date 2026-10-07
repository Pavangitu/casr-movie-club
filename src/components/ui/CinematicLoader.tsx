import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clapperboard } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  onComplete?: () => void;
}

export const CinematicLoader: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Fast, crisp cinematic progress
    const startTime = Date.now();
    const duration = 1100; // ~1.1s total

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          onComplete?.();
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 bg-[#070709] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Top Letterbox bar */}
          <motion.div
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
            className="absolute top-0 left-0 right-0 h-10 bg-black border-b border-zinc-900 origin-top"
          />

          {/* Center Brand Core */}
          <div className="flex flex-col items-center text-center space-y-5 relative z-10 px-6">
            {/* Logo icon with gentle snap motion */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-20 h-20 rounded-3xl bg-black border border-white/20 p-2 flex items-center justify-center shadow-2xl shadow-red-950/60"
            >
              <img
                src="/logo.png"
                alt="Frame Era Movie Club"
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="space-y-1"
            >
              <h2 className="text-2xl font-heading font-black text-white tracking-widest">
                FRAME ERA
              </h2>
              <p className="text-[11px] font-mono font-bold text-red-500 tracking-[0.3em] uppercase">
                CASR MOVIE CLUB
              </p>
            </motion.div>

            {/* Minimal Progress Bar */}
            <div className="w-48 h-0.5 bg-zinc-900 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              Creating your experience...
            </p>
          </div>

          {/* Bottom Letterbox bar */}
          <motion.div
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
            className="absolute bottom-0 left-0 right-0 h-10 bg-black border-t border-zinc-900 origin-bottom"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
