import React, { useState } from 'react';
import { motion } from 'motion/react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  delay?: number;
}

export const ImageReveal: React.FC<Props> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-video',
  delay = 0.2
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {/* Underlying Image */}
      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        initial={{ scale: 1.08, filter: 'blur(4px)' }}
        whileInView={{ scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full object-cover"
      />

      {/* Cinematic Reveal Mask Curtain */}
      <motion.div
        initial={{ x: 0 }}
        whileInView={{ x: '102%' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.75, delay, ease: [0.77, 0, 0.175, 1] }}
        className="absolute inset-0 bg-[#0d0d12] z-10 origin-left"
      />

      {/* Ambient Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
