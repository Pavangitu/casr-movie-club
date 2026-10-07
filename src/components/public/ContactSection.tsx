import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Instagram, Youtube, Clapperboard } from 'lucide-react';
import { sfx } from '../../utils/audio';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playSubtleChime();
    setSent(true);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-mono font-bold tracking-widest uppercase mb-3">
          REACH OUT & COLLABORATE
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
          Connect with CaSR Movie Club
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
          Have an idea for a script collaboration, festival sponsorship, campus screening request, or general inquiry? Get in touch with our leadership board.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info Col */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-2xl bg-[#111116] border border-zinc-800 space-y-4">
            <h3 className="text-lg font-heading font-bold text-white">Direct Channels</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 text-zinc-300">
                <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-800/40 flex items-center justify-center text-red-400 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-zinc-500 uppercase">OFFICIAL EMAIL</p>
                  <a href="mailto:pavandattagedila@gmail.com" className="hover:text-red-400 font-semibold transition-colors">
                    pavandattagedila@gmail.com
                  </a>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Overall Coordinator Desk</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-zinc-300">
                <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-zinc-500 uppercase">STUDIO & EDITING LAB</p>
                  <p className="font-semibold text-zinc-200">Media Studio Lab 204 & Audio Suites</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Central Campus Building</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-zinc-300">
                <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <Clapperboard className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-zinc-500 uppercase">EXECUTIVE HOURS</p>
                  <p className="font-semibold text-zinc-200">Mon - Sat: 4:30 PM - 7:30 PM</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Post-lecture production slots</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950/30 to-zinc-950 border border-red-900/30">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 mb-2">
              EMERGENCY SHOOT / PRODUCTION HOTLINE
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              If you require emergency equipment access or urgent faculty permit sign-offs for an active weekend shoot, contact your respective Zone Coordinator or Overall Coordinator directly.
            </p>
          </div>

        </div>

        {/* Contact Form Col */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#111116] border border-zinc-800">
          {sent ? (
            <div className="py-16 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-xl font-heading font-black text-white">Message Dispatched!</h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Thank you, {name}. Your inquiry has been routed to the executive coordinators. We will reply via email shortly.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 text-xs font-bold text-zinc-200 hover:bg-zinc-700"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-heading font-bold text-white mb-2">Send an Inquiry</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyadarshi Dash"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Subject / Area of Inquiry *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Script Collaboration / Festival Screening Question"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Message *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Type your message, proposal, or inquiry here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-4 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950/50 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Message to Coordinators</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </section>
  );
};
