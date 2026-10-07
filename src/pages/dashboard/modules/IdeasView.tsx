import React, { useState } from 'react';
import { Sparkles, Plus, CheckCircle2, Clock, Lightbulb, User, ArrowRight, Tag } from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { sfx } from '../../../utils/audio';

export const IdeasView: React.FC = () => {
  const { ideas, submitIdea, currentUser, zones } = useClub();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [zoneId, setZoneId] = useState('zone-movie');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    sfx.playClapper();
    submitIdea({
      title,
      description,
      submittedBy: currentUser.name,
      submittedById: currentUser.id,
      category: 'Concept Pitch',
      zoneId: zoneId as any
    });

    setTitle('');
    setDescription('');
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800">
        <div>
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Creative Pitches & Concept Lab</span>
          </h3>
          <p className="text-xs font-mono text-zinc-400">Propose film concepts, script ideas, and viral reel pitches</p>
        </div>

        <button
          onClick={() => {
            sfx.playClapper();
            setIsSubmitting(!isSubmitting);
          }}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-950/60"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Pitch New Concept</span>
        </button>
      </div>

      {/* New Idea Form */}
      {isSubmitting && (
        <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-[#0e0e14] border border-amber-900/50 space-y-4 animate-in fade-in">
          <h4 className="text-sm font-mono font-bold text-amber-400 uppercase">Submit Pitch Dossier</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Concept Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Sci-Fi Thriller Short: Memory Nexus"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Target Zone *</label>
              <select
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
              >
                {zones.map(z => (
                  <option key={z.id} value={z.id}>{z.number} — {z.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Synopsis & Creative Vision</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the core plot, visual style, character dynamics, and why it fits CaSR Studio..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsSubmitting(false)}
              className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold"
            >
              Submit Pitch →
            </button>
          </div>
        </form>
      )}

      {/* Ideas List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="p-6 rounded-3xl bg-[#0e0e14] border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-[10px] font-bold uppercase">
                  {idea.status || 'Submitted'}
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  {idea.submittedBy}
                </span>
              </div>

              <h4 className="text-xl font-heading font-bold text-white">
                {idea.title}
              </h4>

              <p className="text-xs text-zinc-300">
                {idea.description}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                {idea.zoneId?.replace('zone-', '') || 'Zone Concept'}
              </span>

              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-400 font-mono text-[10px]">
                {idea.category || 'Concept Pitch'}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
