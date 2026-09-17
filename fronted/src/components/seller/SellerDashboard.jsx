import React, { useState, useEffect } from 'react';
import { 
  Gavel, 
  DollarSign, 
  TrendingUp, 
  Users, 
  PlusCircle, 
  ExternalLink, 
  Clock, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAuction } from '../../context/AuctionContext';
import SellerLiveActivity from './SellerLiveActivity';

export default function SellerDashboard({ onCreateNew }) {
  const { sellerAuctions, setCurrentView, setSelectedAuctionId } = useAuction();

  // Metric targets
  const activeAuctionsCount = sellerAuctions.length;
  const totalRevenue = sellerAuctions.reduce((sum, a) => sum + a.currentBid, 0);
  const highestBid = Math.max(...sellerAuctions.map(a => a.currentBid), 0);
  const totalParticipants = sellerAuctions.reduce((sum, a) => sum + (a.bidCount || 0), 0) + 42;

  // Animated counters state
  const [counts, setCounts] = useState({
    active: 0,
    revenue: 0,
    highest: 0,
    participants: 0
  });

  useEffect(() => {
    const duration = 1500;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        active: Math.round(activeAuctionsCount * ease),
        revenue: Math.round(totalRevenue * ease),
        highest: Math.round(highestBid * ease),
        participants: Math.round(totalParticipants * ease)
      });

      if (frame >= totalFrames) clearInterval(timer);
    }, frameRate);

    return () => clearInterval(timer);
  }, [activeAuctionsCount, totalRevenue, highestBid, totalParticipants]);

  const handleViewInMarketplace = (id) => {
    setSelectedAuctionId(id);
    setCurrentView('marketplace');
    setTimeout(() => {
      const el = document.getElementById('bidding-panel');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="space-y-10">
      
      {/* 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Active Auctions */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Gavel className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              ● Live Now
            </span>
          </div>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white group-hover:text-cyan-300 transition-colors">
            {counts.active}
          </span>
          <h4 className="text-sm font-bold font-display text-slate-300 mt-2">
            Active Listed Auctions
          </h4>
          <p className="text-xs text-slate-400 mt-1">Currently accepting live bids</p>
        </div>

        {/* Card 2: Total Revenue */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              +38.5% MoM
            </span>
          </div>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white group-hover:text-purple-300 transition-colors">
            ${counts.revenue.toLocaleString()}
          </span>
          <h4 className="text-sm font-bold font-display text-slate-300 mt-2">
            Gross Pipeline Value
          </h4>
          <p className="text-xs text-slate-400 mt-1">Escrow held upon final closure</p>
        </div>

        {/* Card 3: Current Highest Bid */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
              Peak Lot
            </span>
          </div>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white group-hover:text-cyan-300 transition-colors">
            ${counts.highest.toLocaleString()}
          </span>
          <h4 className="text-sm font-bold font-display text-slate-300 mt-2">
            Current Highest Bid
          </h4>
          <p className="text-xs text-slate-400 mt-1">Across all your active lots</p>
        </div>

        {/* Card 4: Total Participants */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/30">
              KYC Verified
            </span>
          </div>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white group-hover:text-pink-300 transition-colors">
            {counts.participants}
          </span>
          <h4 className="text-sm font-bold font-display text-slate-300 mt-2">
            Total Active Bidders
          </h4>
          <p className="text-xs text-slate-400 mt-1">Competing in your live rooms</p>
        </div>

      </div>

      {/* 2-Column: Your Active Listed Auctions (8 cols) + Live Activity Stream (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Active Listed Auctions List (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-xl font-bold font-display text-white">
                Your Active Listed Auctions
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time tracking of bids, countdowns, and room activity.
              </p>
            </div>

            <button
              type="button"
              onClick={onCreateNew}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/25 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Launch Another Lot</span>
            </button>
          </div>

          <div className="space-y-4">
            {sellerAuctions.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover ring-1 ring-white/10 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.bidCount} Bids placed
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      Reserve: <span className="text-slate-200 font-mono">${item.reservePrice?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                {/* Right price and actions */}
                <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-5 pt-2 sm:pt-0 border-t border-white/5 sm:border-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                      Current Highest
                    </span>
                    <span className="text-lg sm:text-xl font-bold font-mono text-cyan-300">
                      ${item.currentBid.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleViewInMarketplace(item.id)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="View live in marketplace bidding arena"
                  >
                    <span>View Room</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Live Activity Feed (4 cols) */}
        <div className="lg:col-span-4">
          <SellerLiveActivity />
        </div>

      </div>

    </div>
  );
}
