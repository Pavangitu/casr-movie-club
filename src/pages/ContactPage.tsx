import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Film } from 'lucide-react';
import { sfx } from '../utils/audio';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Campus Screening Collaboration',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClapper();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 font-mono text-xs font-bold uppercase">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
            Connect with CaSR Studio
          </h1>
          <p className="text-sm text-zinc-400">
            For film festival partnerships, event collaborations, audition queries, or screening inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Info Card */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-[#0e0e14] border border-zinc-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center">
                  <Film className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-white">Production Headquarters</h3>
                  <p className="text-xs font-mono text-zinc-400">CaSR Movie Club Media Cell</p>
                </div>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-2 text-red-400 font-bold">
                    <MapPin className="w-4 h-4" />
                    <span>LOCATION</span>
                  </div>
                  <p className="text-zinc-300">Media & Performing Arts Complex, Room 304</p>
                  <p className="text-zinc-500">Central University Campus</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-2 text-red-400 font-bold">
                    <Mail className="w-4 h-4" />
                    <span>EMAIL DESK</span>
                  </div>
                  <p className="text-zinc-300">contact@casrmovieclub.edu</p>
                  <p className="text-zinc-500">production@casrmovieclub.edu</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-2 text-red-400 font-bold">
                    <Phone className="w-4 h-4" />
                    <span>STUDIO HOURS</span>
                  </div>
                  <p className="text-zinc-300">Mon - Fri: 4:30 PM - 8:30 PM</p>
                  <p className="text-zinc-500">Shoot Days: Weekends & Evenings</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-red-950/30 border border-red-900/40 text-xs text-red-200">
              ⚡ Quick Response Guarantee: Inquiries are routed directly to the Overall Coordinator and relevant Zone Head within 24 hours.
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#0e0e14] border border-zinc-800">
            {submitted ? (
              <div className="text-center py-16 space-y-4 animate-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-heading font-bold text-white">Transmission Received</h3>
                <p className="text-xs font-mono text-zinc-400 max-w-md mx-auto">
                  Thank you, {formData.name}. Your message has been forwarded to the CaSR Executive Board.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Campus Screening Collaboration', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold border border-zinc-700"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Ananya Sharma"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g., ananya@casr.edu"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Topic / Intent *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  >
                    <option value="Campus Screening Collaboration">Campus Screening Collaboration</option>
                    <option value="Short Film Auditions Query">Short Film Auditions Query</option>
                    <option value="Festival Submission Request">Festival Submission Request</option>
                    <option value="Equipment & Studio Booking">Equipment & Studio Booking</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Message Details *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your event proposal, audition question, or collaboration scope..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-red-500 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950/60 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Dispatch Message to Board →</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
