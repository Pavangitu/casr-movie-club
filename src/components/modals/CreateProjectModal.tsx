import React, { useState } from 'react';
import { X, Clapperboard, Film, User, Calendar, Image as ImageIcon } from 'lucide-react';
import { useClub } from '../../context/ClubContext';
import { ZoneId, Project } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultZoneId?: ZoneId;
}

export const CreateProjectModal: React.FC<Props> = ({ isOpen, onClose, defaultZoneId }) => {
  const { zones, currentUser, createProject } = useClub();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<Project['type']>('Short Film');
  const [zoneId, setZoneId] = useState<ZoneId>(defaultZoneId || 'zone-shortfilm');
  const [synopsis, setSynopsis] = useState('');
  const [concept, setConcept] = useState('');
  const [director, setDirector] = useState(currentUser.name);
  const [cinematographer, setCinematographer] = useState('Aman Baidya');
  const [editor, setEditor] = useState('Subham Rout');
  const [budget, setBudget] = useState('₹15,000');
  const [location, setLocation] = useState('Central Campus & Library');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [deadline, setDeadline] = useState(new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10));
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createProject({
      title,
      type,
      zoneId,
      description: synopsis,
      concept,
      synopsis,
      status: 'Active',
      startDate,
      deadline,
      director,
      productionLead: currentUser.name,
      cinematographer,
      editor,
      soundDesigner: 'Tejaswini Ghosh',
      cast: ['Student Actor 1', 'Student Actor 2'],
      crew: [
        { userId: currentUser.id, name: currentUser.name, role: 'Executive Producer' },
        { userId: 'u2', name: director, role: 'Director' },
        { userId: 'u3', name: cinematographer, role: 'Cinematographer' }
      ],
      coverImage,
      budget,
      location
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0e0e13] border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-red-950/80 via-zinc-900 to-black border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-950 border border-red-800/60 flex items-center justify-center">
              <Clapperboard className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="text-base font-heading font-black text-white">
                Greenlight New Production
              </h3>
              <p className="text-[10px] font-mono text-zinc-400">
                Initializes 9-Stage Film Lifecycle from Idea to Release
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                Project / Movie Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Echoes of Midnight"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                Production Format
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as Project['type'])}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
              >
                <option value="Short Film">Short Film</option>
                <option value="Movie">Feature / Mid-Length</option>
                <option value="Reel Series">Reel Series</option>
                <option value="Social Media Campaign">Social Campaign</option>
                <option value="Event">Event Film</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                Zone *
              </label>
              <select
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value as ZoneId)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
              >
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.number} — {z.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                Director
              </label>
              <input
                type="text"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">
              Logline & Core Concept *
            </label>
            <input
              type="text"
              required
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="One sentence compelling hook..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">
              Story Synopsis & Treatment
            </label>
            <textarea
              rows={3}
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              placeholder="Outline the narrative arc, visual tone, and target audience emotion..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                Cinematographer
              </label>
              <input
                type="text"
                value={cinematographer}
                onChange={(e) => setCinematographer(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                Estimated Budget
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                Primary Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                Target Release Date
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                Cover Poster Image URL
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold font-mono shadow-lg shadow-red-950/60"
            >
              Greenlight Film Project →
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
