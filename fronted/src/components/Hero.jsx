import React from 'react';
import { ArrowRight, Zap, Shield, Sparkles, TrendingUp, Clock, Flame, CheckCircle } from 'lucide-react';
import { useAuction } from '../context/AuctionContext';

export default function Hero() {
  const { selectedAuction, setSelectedAuctionId, placeBid } = useAuction();

  const handleQuickBidHero = () => {
    if (selectedAuction) {
      placeBid(selectedAuction.id, selectedAuction.currentBid + 50);
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-gradient">
      
      {/* Background Animated Glow Spheres & Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/20 to-purple-600/25 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07090e] to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines and CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">
            
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill border-cyan-500/30 shadow-[0_0_20px_rgba(56,189,248,0.15)] animate-in fade-in slide-in-from-top-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                Live Edge Consensus • Sub-10ms Latency
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-300 font-medium">99.99% Uptime</span>
            </div>

            {/* Main Heading requested by user */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.08]">
              <span className="text-white">Real-Time</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                Auction System
              </span>
            </h1>

            {/* Subheading requested by user */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Experience lightning-fast bidding with live updates and fair competition.
              Bid on verified luxury electronics, timepieces, and exclusive collectibles with cryptographic escrow certainty.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#bidding-panel"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02]"
              >
                <span>Start Bidding</span>
                <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#live-auctions"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-sm sm:text-base text-slate-200 glass-card hover:bg-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Explore Auctions</span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Instant Sync</p>
                  <p className="text-[11px] text-slate-400">Zero Refresh</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Insured Escrow</p>
                  <p className="text-[11px] text-slate-400">100% Protection</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Fair Clock</p>
                  <p className="text-[11px] text-slate-400">Anti-Sniping</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Live Interactive Card Preview */}
          <div className="lg:col-span-5 relative">
            
            {/* Ambient Background Glow for Card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-purple-600/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition duration-1000 -z-10" />

            {/* Featured Live Card */}
            <div className="relative rounded-3xl glass-panel p-6 border border-white/15 shadow-2xl overflow-hidden">
              
              {/* Top Banner inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    Live Bidding Highlight
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{formatTime(selectedAuction.secondsRemaining)}</span>
                </div>
              </div>

              {/* Product Image & Badges */}
              <div className="relative my-4 rounded-2xl overflow-hidden aspect-[16/10] group bg-black/40">
                <img
                  src={selectedAuction.image}
                  alt={selectedAuction.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-black/20" />
                
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-500/40">
                    {selectedAuction.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-purple-950/80 backdrop-blur-md text-purple-300 border border-purple-500/40 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" />
                    {selectedAuction.tag}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium truncate drop-shadow-md">
                    Seller: <span className="text-white font-semibold">{selectedAuction.seller.name}</span>
                  </span>
                  <span className="text-cyan-300 font-mono bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                    {selectedAuction.bidCount} bids placed
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold font-display text-white leading-snug truncate">
                  {selectedAuction.title}
                </h2>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {selectedAuction.subtitle}
                </p>
              </div>

              {/* Live Bid Pricing Box */}
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-purple-950/40 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                    Current Highest Bid
                  </p>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300">
                      ${selectedAuction.currentBid.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center">
                      <TrendingUp className="w-3 h-3 mr-0.5" /> +$50
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                    Leading Bidder
                  </p>
                  <p className="text-xs font-bold text-cyan-300 mt-1 flex items-center justify-end gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    {selectedAuction.bidHistory[0]?.bidder || "Sarah K."}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={handleQuickBidHero}
                  className="py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-200" />
                  Quick Bid +$50
                </button>

                <a
                  href="#bidding-panel"
                  onClick={() => setSelectedAuctionId(selectedAuction.id)}
                  className="py-3 px-4 rounded-xl text-xs font-bold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 flex items-center justify-center gap-1.5 text-center"
                >
                  Enter Live Room
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

            </div>

            {/* Floating Glass Indicator Pill Bottom Left */}
            <div className="hidden sm:flex absolute -bottom-5 -left-6 px-4 py-2.5 rounded-2xl glass-panel border-cyan-500/40 shadow-xl items-center gap-3 animate-float">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-md">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white">High Demand</p>
                <p className="text-[10px] text-cyan-300 font-mono">14 Bids/min on this lot</p>
              </div>
            </div>

            {/* Floating Glass Indicator Pill Top Right */}
            <div className="hidden sm:flex absolute -top-4 -right-4 px-3.5 py-2 rounded-xl glass-panel border-purple-500/40 shadow-xl items-center gap-2 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-slate-200">100% Escrow Verified</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
