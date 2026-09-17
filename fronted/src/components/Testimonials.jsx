import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { testimonials } from '../data/mockFeatures';

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 bg-[#07090e] border-t border-white/5 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
            Verified Collector Reviews
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Enthusiasts Worldwide</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            See how collectors, developers, and studios win top-tier lots through our low-latency auction engine.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl glass-card flex flex-col justify-between relative group"
            >
              <div>
                {/* Star rating & Quote icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-white/10 group-hover:text-cyan-400/30 transition-colors" />
                </div>

                {/* Quote text */}
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* User Bio and Won Item */}
              <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-cyan-500/30 group-hover:ring-cyan-400 transition-all"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.name}
                      </h4>
                      {item.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" title="Verified Bidder" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{item.role}</p>
                  </div>
                </div>

                <div className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-cyan-300 font-mono">
                  Won: {item.wonItem}
                </div>
              </div>

              {/* Top rim highlight */}
              <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-400/40 transition-all duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
