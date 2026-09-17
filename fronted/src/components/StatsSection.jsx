import React, { useState, useEffect } from 'react';
import { Gavel, Activity, Users, Award, TrendingUp, ShieldCheck } from 'lucide-react';
import { statistics } from '../data/mockFeatures';

export default function StatsSection() {
  // Animated counter hook effect
  const [counts, setCounts] = useState(statistics.map(() => 0));

  useEffect(() => {
    const duration = 1800; // ms
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setCounts(
        statistics.map(stat => {
          const target = stat.value;
          return Number((target * easeProgress).toFixed(target % 1 === 0 ? 0 : 1));
        })
      );

      if (frame >= totalFrames) {
        clearInterval(timer);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, []);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Gavel':
        return <Gavel className="w-6 h-6 text-cyan-400" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-purple-400" />;
      case 'Users':
        return <Users className="w-6 h-6 text-blue-400" />;
      case 'Award':
        return <Award className="w-6 h-6 text-pink-400" />;
      default:
        return <TrendingUp className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="stats" className="relative py-16 -mt-8 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container with glowing background rim */}
        <div className="relative p-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 shadow-[0_10px_50px_rgba(0,0,0,0.6)]">
          
          <div className="relative rounded-[22px] bg-[#090e1a]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-10">
            
            {/* Header / Sub-label */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Real-Time Ecosystem Metrics
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  Engineered for High-Frequency Bidding
                </h2>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Aggregated live stats updated every second</span>
              </div>
            </div>

            {/* Grid of 4 requested statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statistics.map((stat, idx) => {
                const currentCount = counts[idx];
                const displayVal = stat.value % 1 === 0 ? Math.round(currentCount).toLocaleString() : currentCount;

                return (
                  <div
                    key={stat.id}
                    className="relative rounded-2xl p-5 bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300 group"
                  >
                    {/* Top Row: Icon + Growth badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {getIcon(stat.icon)}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        <TrendingUp className="w-3 h-3" />
                        {stat.growth}
                      </span>
                    </div>

                    {/* Value with animated counter */}
                    <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                      {stat.prefix || ''}{displayVal}{stat.suffix || ''}
                    </div>

                    {/* Stat Label */}
                    <h3 className="text-sm font-bold text-slate-200 mt-2 font-display">
                      {stat.label}
                    </h3>

                    {/* Stat Description */}
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {stat.description}
                    </p>

                    {/* Bottom subtle glow line on hover */}
                    <div className="absolute bottom-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-400/50 transition-all duration-500" />
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
