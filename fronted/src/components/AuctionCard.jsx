import React, { useState, useEffect } from 'react';
import { Clock, Users, ArrowUpRight, Zap, Shield, Flame, CheckCircle2 } from 'lucide-react';
import { useAuction } from '../context/AuctionContext';

export default function AuctionCard({ auction }) {
  const { selectedAuctionId, setSelectedAuctionId, placeBid } = useAuction();
  const isSelected = selectedAuctionId === auction.id;
  const [flash, setFlash] = useState(false);

  // Flash card when current bid changes
  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 800);
    return () => clearTimeout(t);
  }, [auction.currentBid]);

  const formatTimer = (seconds) => {
    if (seconds <= 0) return "Ended";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAndScroll = () => {
    setSelectedAuctionId(auction.id);
    const el = document.getElementById('bidding-panel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickBid = (e) => {
    e.stopPropagation();
    placeBid(auction.id, auction.currentBid + 50);
  };

  return (
    <div
      onClick={handleSelectAndScroll}
      className={`group relative rounded-2xl overflow-hidden glass-card transition-all duration-300 flex flex-col cursor-pointer ${
        isSelected
          ? 'border-cyan-400/80 shadow-[0_0_30px_rgba(56,189,248,0.25)] ring-1 ring-cyan-400/50'
          : 'border-white/10 hover:border-purple-500/40'
      } ${flash ? 'animate-bid-flash' : ''}`}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900/60">
        <img
          src={auction.image}
          alt={auction.title}
          className="w-full h-full object-cover object-center group-hover:scale-107 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
            {auction.category}
          </span>
          
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono font-medium text-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{formatTimer(auction.secondsRemaining)}</span>
          </div>
        </div>

        {/* Tag on bottom of image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-950/80 backdrop-blur-md text-purple-300 border border-purple-500/30 flex items-center gap-1">
            <Flame className="w-3 h-3 text-orange-400" />
            {auction.tag}
          </span>
          {isSelected && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              Active Focus
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          <h3 className="text-base font-bold font-display text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
            {auction.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1">
            {auction.subtitle}
          </p>
        </div>

        {/* Current Bid & Bidders Section */}
        <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
              Current Highest Bid
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                ${auction.currentBid.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                (Live)
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
              Bidders
            </span>
            <div className="flex items-center justify-end gap-1.5 mt-1">
              <div className="flex -space-x-2 overflow-hidden">
                {auction.bidders.slice(0, 3).map((b, i) => (
                  <img
                    key={i}
                    src={b.avatar}
                    alt={b.name}
                    className="inline-block h-5 w-5 rounded-full ring-1 ring-[#090e1a] object-cover"
                  />
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-slate-300">
                {auction.bidCount}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleQuickBid}
            className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-cyan-300 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            title="Place instant +$50 bid"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            +$50 Quick
          </button>

          <button
            type="button"
            onClick={handleSelectAndScroll}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold text-white transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer ${
              isSelected
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                : 'bg-gradient-to-r from-cyan-600/80 via-blue-600/80 to-purple-600/80 hover:from-cyan-500 hover:to-purple-500'
            }`}
          >
            <span>Bid Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
