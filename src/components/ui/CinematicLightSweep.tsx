import React from 'react';

interface Props {
  className?: string;
  opacity?: number;
}

export const CinematicLightSweep: React.FC<Props> = ({ className = '', opacity = 0.6 }) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      {/* Sweeping studio beam */}
      <div className="absolute -top-[50%] -bottom-[50%] w-[350px] animate-light-sweep bg-gradient-to-r from-transparent via-red-500/15 to-transparent blur-[50px]" />
      
      {/* Ambient soft warm studio spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-b from-red-600/10 via-amber-600/5 to-transparent blur-[120px] rounded-full animate-spotlight-pulse pointer-events-none" />
    </div>
  );
};
