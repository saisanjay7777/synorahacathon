import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Scale, 
  BellRing, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { features } from '../data/mockFeatures';

export default function FeaturesSection() {
  const getIcon = (name) => {
    switch (name) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-cyan-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-blue-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-purple-400" />;
      case 'Scale':
        return <Scale className="w-6 h-6 text-amber-400" />;
      case 'BellRing':
        return <BellRing className="w-6 h-6 text-emerald-400" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-violet-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="features" className="relative py-24 bg-[#07090e] overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Cutting-Edge Infrastructure
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Pure Performance</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every transaction, bid increment, and auction closure is safeguarded by high-throughput real-time protocols and anti-sniping guarantees.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat) => (
            <div
              key={feat.id}
              className="relative p-7 rounded-3xl glass-card group flex flex-col justify-between"
            >
              {/* Top Row: Icon + Glow */}
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all duration-300">
                  {getIcon(feat.icon)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {/* Bottom Subtle Accent */}
              <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                <span className="font-semibold tracking-wider uppercase text-[11px]">Enterprise Grade</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Hover Corner Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
