import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Share2, Plus, Calendar, Instagram, Youtube, CheckCircle2, Clock, AlertCircle, Globe } from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { SocialPost } from '../../../types';
import { sfx } from '../../../utils/audio';

export const SocialCalendarView: React.FC = () => {
  const { socialPosts, addSocialPost, updateSocialStatus, socialAccounts } = useClub();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);

  const basePath = location.pathname.startsWith('/admin') ? '/admin' : 
                   location.pathname.startsWith('/coordinator') ? '/coordinator' : '/dashboard';

  const [formData, setFormData] = useState({
    title: '',
    postType: 'Official Poster' as const,
    platform: 'Instagram' as const,
    scheduledDate: '2026-03-20',
    scheduledTime: '18:00',
    caption: '',
    hashtags: ['#CaSRMovieClub', '#Filmmaking', '#CampusCinema']
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClapper();
    addSocialPost({
      title: formData.title,
      postType: formData.postType,
      platform: formData.platform,
      scheduledDate: formData.scheduledDate,
      scheduledTime: formData.scheduledTime,
      caption: formData.caption,
      hashtags: formData.hashtags,
      status: 'Draft'
    });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800">
        <div>
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-pink-500" />
            <span>Zone 04 — Social Media & Content Calendar</span>
          </h3>
          <p className="text-xs font-mono text-zinc-400">Post schedule, creative captions, teaser releases & approvals</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sfx.playSubtleChime();
              navigate(`${basePath}/social-accounts`);
            }}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <Globe className="w-3.5 h-3.5 text-pink-400" />
            <span>Official Accounts ({socialAccounts.length})</span>
          </button>

          <button
            onClick={() => {
              sfx.playClapper();
              setIsAdding(!isAdding);
            }}
            className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-pink-950/60"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Campaign Post</span>
          </button>
        </div>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="p-6 rounded-3xl bg-[#0e0e14] border border-pink-900/50 space-y-4 animate-in fade-in">
          <h4 className="text-sm font-mono font-bold text-pink-400 uppercase">New Content Asset Draft</h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Campaign Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Official Cast Announcement Post"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-pink-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Post Type</label>
              <select
                value={formData.postType}
                onChange={(e) => setFormData({ ...formData, postType: e.target.value as any })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-pink-500"
              >
                <option value="Official Poster">Official Poster</option>
                <option value="BTS Carousel">BTS Carousel</option>
                <option value="Teaser Drop">Teaser Drop</option>
                <option value="Story Countdowns">Story Countdowns</option>
                <option value="Member Spotlight">Member Spotlight</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Schedule Date & Time</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
                <input
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                  className="w-24 bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Caption Copy</label>
            <textarea
              rows={3}
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              placeholder="Write the full Instagram/YouTube description and tag relevant cast members..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-pink-500"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold"
            >
              Save to Content Schedule →
            </button>
          </div>
        </form>
      )}

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialPosts.map((post) => (
          <div
            key={post.id}
            className="p-6 rounded-3xl bg-[#0e0e14] border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-pink-500/40 transition-all shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-pink-950/80 border border-pink-800 text-pink-300 font-mono text-[10px] font-bold uppercase">
                  {post.postType || post.contentType || 'Social Post'}
                </span>

                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-pink-400" />
                  {post.scheduledDate} • {post.scheduledTime}
                </span>
              </div>

              <h4 className="text-base font-heading font-bold text-white">
                {post.title || post.topic || 'Social Asset'}
              </h4>

              <p className="text-xs text-zinc-300 line-clamp-3 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                {post.caption}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {(post.hashtags || post.tags || []).map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono text-pink-400/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between font-mono text-xs">
              <span className="text-zinc-500">Status:</span>

              <select
                value={post.status || post.approvalStatus || 'Draft'}
                onChange={(e) => updateSocialStatus(post.id, e.target.value as any)}
                className="bg-zinc-900 border border-zinc-700 text-pink-400 font-bold rounded-lg px-2.5 py-1 text-xs focus:outline-none"
              >
                <option value="Draft">Draft</option>
                <option value="Approved">Approved</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
