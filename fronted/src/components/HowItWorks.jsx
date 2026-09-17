import React from 'react';
import { UserPlus, TrendingUp, Radio, Trophy, CheckCircle, ArrowRight } from 'lucide-react';
import { howItWorksSteps } from '../data/mockFeatures';

export default function HowItWorks() {
  const getIcon = (name) => {
    switch (name) {
      case 'UserPlus':
        return <UserPlus className="w-6 h-6 text-cyan-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-blue-400" />;
      case 'Radio':
        return <Radio className="w-6 h-6 text-purple-400" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-amber-400" />;
      default:
        return <CheckCircle className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="how-it-works" className="relative py-24 bg-[#07090e] border-t border-white/5">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            Simple & Transparent Process
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">BidSphere</span> Works
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From entering your first live room to securing delivery with zero friction.
          </p>
        </div>

        {/* 4 Steps Grid with connecting glowing visual line */}
        <div className="relative">
          
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] -translate-y-12 bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-purple-500/40 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {howItWorksSteps.map((step, idx) => (
              <div
                key={step.step}
                className="p-6 rounded-3xl glass-card relative flex flex-col justify-between group"
              >
                <div>
                  {/* Top Step Number + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black font-mono text-white/15 group-hover:text-cyan-400/40 transition-colors">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all">
                      {getIcon(step.icon)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Tag */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-cyan-300">
                    {step.tag}
                  </span>
                  {idx < howItWorksSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* CTA Banner inside How It Works */}
        <div className="mt-16 p-8 rounded-3xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-cyan-950/20 via-slate-900/40 to-purple-950/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold font-display text-white">
              Ready to claim your first premium victory?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Join over 125,000 verified bidders globally. Deposit funds in seconds.
            </p>
          </div>
          <a
            href="#live-auctions"
            className="shrink-0 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 transition-all"
          >
            Browse Active Lots
          </a>
        </div>

      </div>
    </section>
  );
}
