import React from 'react';
import { Clock, ShieldCheck, Sparkles, CheckCircle2, Flame, AlertCircle, ArrowUpRight, Zap } from 'lucide-react';

export default function StepPreviewPublish({ formData, onPublish, onPrev, isPublishing }) {
  const primaryImage = formData.images[0] || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80";
  const startingPrice = Number(formData.startingPrice) || 1000;
  const reservePrice = Number(formData.reservePrice) || Math.round(startingPrice * 1.3);

  return (
    <div className="space-y-8">
      
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Final Review
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
          Real-Time Marketplace Card Preview
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          This is exactly how global buyers will see and compete for your item in the Live Marketplace grid.
        </p>
      </div>

      {/* Centerpiece: Real BidSphere Auction Card Preview */}
      <div className="max-w-md mx-auto">
        <div className="group relative rounded-3xl overflow-hidden glass-card border border-cyan-400/80 shadow-[0_0_40px_rgba(56,189,248,0.3)] ring-1 ring-cyan-400/50 flex flex-col">
          
          {/* Top Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden bg-slate-900/80">
            <img
              src={primaryImage}
              alt={formData.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-transparent to-black/30" />

            {/* Badges on Top */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                {formData.category}
              </span>
              
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono font-medium text-amber-300">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{formData.duration} Remaining</span>
              </div>
            </div>

            {/* Bottom Tag */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-950/80 backdrop-blur-md text-purple-300 border border-purple-500/30 flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-400" />
                New Verified Lot
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            
            <div>
              <h3 className="text-lg font-bold font-display text-white line-clamp-1">
                {formData.name}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                {formData.brand ? `${formData.brand} • ` : ''}{formData.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
                  Starting Bid Floor
                </span>
                <span className="text-2xl font-bold font-mono text-cyan-300">
                  ${startingPrice.toLocaleString()}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
                  Seller
                </span>
                <div className="flex items-center justify-end gap-1 mt-1 text-xs font-bold text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>You (Verified Seller)</span>
                </div>
              </div>
            </div>

            {/* Simulated Action */}
            <div className="grid grid-cols-2 gap-2.5 pt-1 opacity-80 pointer-events-none">
              <div className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-cyan-300 flex items-center justify-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                +${formData.minIncrement} Quick
              </div>
              <div className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-purple-600 flex items-center justify-center gap-1.5">
                <span>Bid Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Verification Checklist */}
      <div className="max-w-md mx-auto p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs text-slate-300">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Automated Escrow Smart Contract Ready</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Anti-Sniping Clock Extension Configured</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Instant Sub-10ms Edge WebSocket Broadcast</span>
        </div>
      </div>

      {/* Bottom Navigation & Publish Button */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10 max-w-2xl mx-auto">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          ← Edit Settings
        </button>

        <button
          type="button"
          disabled={isPublishing}
          onClick={onPublish}
          className="glow-button px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-cyan-200" />
          <span>{isPublishing ? "Publishing to Global Edge..." : "Publish Auction Now"}</span>
        </button>
      </div>

    </div>
  );
}
