import React, { useState } from 'react';
import { Video, Plus, CheckCircle2, TrendingUp, Instagram, Youtube, Sparkles, ArrowRight, Eye, Heart, Share2 } from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { ReelStage, ReelItem } from '../../../types';
import { sfx } from '../../../utils/audio';

const REEL_STAGES: ReelStage[] = ['IDEA', 'SCRIPT', 'SHOOT', 'EDITING', 'REVIEW', 'APPROVED', 'POSTED'];

export const ReelsTrackerView: React.FC = () => {
  const { reels, addReel, advanceReelStage, users } = useClub();
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    concept: '',
    creatorId: users[0]?.id || '',
    creatorName: users[0]?.name || '',
    platform: 'Instagram' as 'Instagram' | 'YouTube Shorts' | 'Both',
    trendingAudio: 'Hans Zimmer Time (Remix)',
    hookText: ''
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClapper();
    const creator = users.find(u => u.id === formData.creatorId) || users[0];

    addReel({
      title: formData.title,
      concept: formData.concept,
      stage: 'IDEA',
      creatorId: creator.id,
      creatorName: creator.name,
      platform: formData.platform,
      trendingAudio: formData.trendingAudio,
      hookText: formData.hookText,
      postedDate: 'Pending Release',
      views: '0',
      likes: '0',
      shares: '0'
    });

    setIsAdding(false);
    setFormData({
      title: '',
      concept: '',
      creatorId: users[0]?.id || '',
      creatorName: users[0]?.name || '',
      platform: 'Instagram',
      trendingAudio: 'Hans Zimmer Time (Remix)',
      hookText: ''
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800">
        <div>
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-purple-400" />
            <span>Zone 03 — Viral Reels & Shorts Lifecycle</span>
          </h3>
          <p className="text-xs font-mono text-zinc-400">7-stage vertical video production engine</p>
        </div>

        <button
          onClick={() => {
            sfx.playClapper();
            setIsAdding(!isAdding);
          }}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-950/60"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Pitch Viral Reel Hook</span>
        </button>
      </div>

      {/* Add Reel Form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="p-6 rounded-3xl bg-[#0e0e14] border border-purple-900/50 space-y-4 animate-in fade-in">
          <h4 className="text-sm font-mono font-bold text-purple-400 uppercase">New Viral Reel Concept</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Reel Title / Working Topic *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., POV: Camera Gaffer on Day 3 of Night Shoot"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Target Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
              >
                <option value="Instagram">Instagram Reels</option>
                <option value="YouTube Shorts">YouTube Shorts</option>
                <option value="Both">Both Platforms</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">3-Second Hook Text (On-screen)</label>
              <input
                type="text"
                value={formData.hookText}
                onChange={(e) => setFormData({ ...formData, hookText: e.target.value })}
                placeholder="e.g., You won't believe how we lit this scene with a ₹200 torch..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Trending Audio / Score</label>
              <input
                type="text"
                value={formData.trendingAudio}
                onChange={(e) => setFormData({ ...formData, trendingAudio: e.target.value })}
                placeholder="e.g., Interstellar Theme x Drill Beat"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold"
            >
              Queue Reel in Pipeline →
            </button>
          </div>
        </form>
      )}

      {/* Reel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reels.map((reel) => {
          const currentStageIndex = REEL_STAGES.indexOf(reel.stage);

          return (
            <div
              key={reel.id}
              className="p-6 rounded-3xl bg-[#0e0e14] border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-purple-500/40 transition-all shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-[10px] font-bold uppercase">
                    Stage: {reel.stage}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                    {reel.platform === 'Instagram' ? <Instagram className="w-3.5 h-3.5 text-pink-400" /> : <Youtube className="w-3.5 h-3.5 text-red-500" />}
                    {reel.platform}
                  </span>
                </div>

                <h4 className="text-base font-heading font-bold text-white">
                  {reel.title}
                </h4>

                {reel.hookText && (
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs font-mono text-amber-300">
                    <span className="text-[10px] text-zinc-500 block uppercase">3s Screen Hook:</span>
                    "{reel.hookText}"
                  </div>
                )}

                <div className="text-[11px] font-mono text-zinc-400 space-y-1">
                  <p>🎵 Audio: {reel.trendingAudio}</p>
                  <p>👤 Lead: {reel.creatorName}</p>
                </div>

                {/* Metrics if posted */}
                {reel.stage === 'POSTED' && (
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800 text-center font-mono text-xs">
                    <div className="p-2 rounded-lg bg-zinc-950">
                      <span className="text-zinc-500 block text-[9px]">VIEWS</span>
                      <span className="text-white font-bold">{reel.views}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-950">
                      <span className="text-zinc-500 block text-[9px]">LIKES</span>
                      <span className="text-pink-400 font-bold">{reel.likes}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-950">
                      <span className="text-zinc-500 block text-[9px]">SHARES</span>
                      <span className="text-purple-400 font-bold">{reel.shares}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Stage progression action */}
              <div className="pt-3 border-t border-zinc-800/80">
                {currentStageIndex < REEL_STAGES.length - 1 ? (
                  <button
                    onClick={() => advanceReelStage(reel.id, REEL_STAGES[currentStageIndex + 1])}
                    className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-purple-300 border border-zinc-700 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Move to {REEL_STAGES[currentStageIndex + 1]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="py-2 text-center text-xs font-mono text-emerald-400 font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Published & Archiving Telemetry</span>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
