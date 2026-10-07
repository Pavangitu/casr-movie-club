import React, { useState } from 'react';
import { CreativeIdea, ZoneId, User } from '../../types';
import { X, Sparkles, Film, Lightbulb } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  defaultZoneId?: ZoneId;
  onSubmitIdea: (idea: CreativeIdea) => void;
}

export const SubmitIdeaModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUser,
  defaultZoneId = 'zone-shortfilm',
  onSubmitIdea
}) => {
  const [title, setTitle] = useState('');
  const [zoneId, setZoneId] = useState<ZoneId>(defaultZoneId);
  const [category, setCategory] = useState('Short Story Concept');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClapper();

    const newIdea: CreativeIdea = {
      id: `idea-${Date.now()}`,
      title,
      description,
      zoneId,
      category,
      submittedBy: currentUser.name,
      submittedById: currentUser.id,
      submittedDate: new Date().toISOString().slice(0, 10),
      status: 'Submitted',
      notes
    };

    onSubmitIdea(newIdea);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="w-full max-w-xl bg-[#111116] border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-500">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white">Pitch a Creative Idea</h3>
              <p className="text-xs text-zinc-400 font-mono">Submit to Zone Coordinators for Table Read</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Concept Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Midnight Run: One-Shot Campus Race"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Target Zone *</label>
              <select
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value as ZoneId)}
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="zone-movie">Zone 01: Movie Making</option>
                <option value="zone-shortfilm">Zone 02: Short Film</option>
                <option value="zone-reels">Zone 03: Reels & Viral</option>
                <option value="zone-social">Zone 04: Social & Branding</option>
                <option value="zone-events">Zone 05: Event Management</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Idea Format</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Short Story Concept">Short Narrative Script</option>
                <option value="Feature Movie Logline">Feature Movie Logline</option>
                <option value="Viral Comedy Reel">Viral Comedy Reel</option>
                <option value="Event Interactive Concept">Event Theme / Game</option>
                <option value="Social Campaign Concept">Social Media Campaign</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Detailed Synopsis & Hook *</label>
            <textarea
              rows={4}
              required
              placeholder="Describe the main conflict, twist, characters, visual style, and why it will resonate with student audiences..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Production Notes (Estimated cast, props, location)</label>
            <input
              type="text"
              placeholder="e.g. Needs 2 actors, shootable in single classroom after 5 PM."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-[11px] font-mono text-zinc-500">Submitted as: {currentUser.name}</span>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-950/50"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit Concept Pitch</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
