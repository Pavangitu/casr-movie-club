import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Zone } from '../../types';
import { sfx } from '../../utils/audio';

interface Props {
  zones: Zone[];
}

export const HorizontalZoneScroller: React.FC<Props> = ({ zones }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    sfx.playSubtleChime();
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div>
          <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 font-mono text-xs font-bold uppercase">
            CINEMATIC FILMSTRIP
          </span>
          <h3 className="text-xl sm:text-2xl font-heading font-black text-white mt-1">
            Browse All 5 Production Cells
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 flex items-center justify-center transition-colors"
            title="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 flex items-center justify-center transition-colors"
            title="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filmstrip scrollable container */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-5 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {zones.map((zone) => (
          <div
            key={zone.id}
            data-cursor-text="ZONE"
            className="w-[320px] sm:w-[360px] flex-shrink-0 snap-start rounded-3xl bg-[#0e0e14] border border-zinc-800/90 hover:border-red-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-950/40 group relative overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/10 blur-[50px] rounded-full group-hover:bg-red-600/20 transition-all pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-xl bg-red-950 border border-red-800/60 font-mono text-xs font-bold text-red-300">
                  {zone.number}
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  {zone.activeProjectsCount} ACTIVE
                </span>
              </div>

              <h4 className="text-xl font-heading font-black text-white group-hover:text-red-400 transition-colors">
                {zone.name}
              </h4>

              <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                {zone.description}
              </p>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 space-y-1">
                <p className="text-[10px] font-mono text-zinc-500 uppercase">Coordinator</p>
                <p className="text-xs font-bold text-zinc-200">{zone.coordinator}</p>
              </div>
            </div>

            <div className="pt-5 mt-4">
              <Link
                to={`/zones/${zone.id}`}
                onClick={() => sfx.playClapper()}
                className="w-full py-2.5 rounded-xl bg-zinc-900 group-hover:bg-red-600 text-zinc-200 group-hover:text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <span>EXPLORE ZONE</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
