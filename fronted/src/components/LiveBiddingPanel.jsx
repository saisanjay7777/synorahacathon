import React, { useState, useEffect } from 'react';
import { 
  Gavel, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  CheckCircle, 
  TrendingUp, 
  Flame, 
  Play, 
  Pause, 
  History,
  AlertCircle
} from 'lucide-react';
import { useAuction } from '../context/AuctionContext';

export default function LiveBiddingPanel() {
  const { 
    auctions, 
    selectedAuction, 
    setSelectedAuctionId, 
    placeBid, 
    userBalance,
    isSimulationActive,
    setIsSimulationActive 
  } = useAuction();

  const minBidIncrement = 50;
  const minRequiredBid = selectedAuction.currentBid + minBidIncrement;
  
  const [bidAmount, setBidAmount] = useState(minRequiredBid);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update input when currentBid changes
  useEffect(() => {
    setBidAmount(selectedAuction.currentBid + minBidIncrement);
    setErrorMsg('');
  }, [selectedAuction.id, selectedAuction.currentBid]);

  const handlePresetAdd = (amount) => {
    setBidAmount(prev => Math.max(minRequiredBid, prev + amount));
    setErrorMsg('');
  };

  const handlePlaceBid = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const numericBid = Number(bidAmount);
    if (isNaN(numericBid) || numericBid <= selectedAuction.currentBid) {
      setErrorMsg(`Bid must be at least $${minRequiredBid.toLocaleString()}`);
      return;
    }

    if (numericBid > userBalance) {
      setErrorMsg(`Insufficient funds. Your wallet has $${userBalance.toLocaleString()}`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = placeBid(selectedAuction.id, numericBid);
      setIsSubmitting(false);
      if (!res.success) {
        setErrorMsg(res.error);
      }
    }, 250);
  };

  const formatTimer = (seconds) => {
    if (seconds <= 0) return "AUCTION ENDED";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const highestBidder = selectedAuction.bidHistory[0] || {
    bidder: "Sarah K.",
    amount: selectedAuction.currentBid,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
  };

  return (
    <section id="bidding-panel" className="relative py-20 bg-[#07090e] border-y border-white/5">
      
      {/* Background Neon Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-cyan-600/10 via-purple-600/10 to-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Live Bidding Arena & Control Panel
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
              Real-Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Bid Room</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select any live item below, monitor the real-time bid feed, and submit instant authenticated bids.
            </p>
          </div>

          {/* Controls: Active Simulation Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSimulationActive(!isSimulationActive)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                isSimulationActive
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300 hover:border-emerald-400'
                  : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Toggle simulated competitor bids"
            >
              {isSimulationActive ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <Pause className="w-3.5 h-3.5" />
                  <span>Simulation: ON</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulation: Paused</span>
                </>
              )}
            </button>

            {/* Anti-Sniping Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Anti-Sniping 60s</span>
            </div>
          </div>
        </div>

        {/* Quick Item Switcher Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2 shrink-0">
            Switch Item:
          </span>
          {auctions.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedAuctionId(a.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                a.id === selectedAuction.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{a.title.split(' ')[0]} {a.title.split(' ')[1]}</span>
              <span className="font-mono text-[11px] opacity-80">${a.currentBid.toLocaleString()}</span>
            </button>
          ))}
        </div>

        {/* Main Live Bidding Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (5 cols): Item Showcase & Seller Info */}
          <div className="lg:col-span-5 rounded-3xl glass-panel p-6 border border-white/10 space-y-6">
            
            {/* Top Product Card */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/11] bg-black/40">
              <img
                src={selectedAuction.image}
                alt={selectedAuction.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-black/20" />
              
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                  {selectedAuction.category}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-purple-950/80 backdrop-blur-md text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  {selectedAuction.tag}
                </span>
              </div>

              {/* Countdown badge inside image */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono font-bold text-cyan-300 shadow-lg">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{formatTimer(selectedAuction.secondsRemaining)}</span>
                </div>
                <div className="text-xs bg-black/70 px-2.5 py-1 rounded-lg text-slate-300 font-medium">
                  {selectedAuction.bidCount} Total Bids
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                {selectedAuction.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {selectedAuction.subtitle}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                {selectedAuction.description}
              </p>
            </div>

            {/* Seller Verified Information */}
            <div className="p-3.5 rounded-2xl bg-white/[0.025] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
                  <div className="w-full h-full bg-[#0d1424] rounded-[11px] flex items-center justify-center font-bold text-sm text-cyan-300">
                    {selectedAuction.seller.name.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">{selectedAuction.seller.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Rating: <span className="text-amber-400 font-semibold">{selectedAuction.seller.rating}★</span> ({selectedAuction.seller.salesCount} sales)
                  </p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                Verified Seller
              </span>
            </div>

          </div>

          {/* Right Column (7 cols): Real-Time Bidding Control & Live Feed */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Stat Card: Current Highest Bid & Leader */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-purple-950/30 border border-cyan-500/30 shadow-[0_0_40px_rgba(56,189,248,0.12)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                
                {/* Highest Bid Stat */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Current Highest Bid
                    </span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white mt-2 flex items-baseline gap-2">
                    <span>${selectedAuction.currentBid.toLocaleString()}</span>
                    <span className="text-xs font-sans font-medium text-slate-400">USD</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Reserve price: <span className="text-slate-200 font-mono">${selectedAuction.reservePrice.toLocaleString()} (Met)</span>
                  </p>
                </div>

                {/* Highest Bidder Details */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 sm:border-l sm:border-white/10">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block mb-2">
                    Current Bid Leader
                  </span>
                  <div className="flex items-center gap-3">
                    <img
                      src={highestBidder.avatar}
                      alt={highestBidder.bidder}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-400/50"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white">{highestBidder.bidder}</span>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <span className="text-xs font-mono text-cyan-300 font-semibold">
                        Lead Bid: ${highestBidder.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bidding Action Form */}
            <form onSubmit={handlePlaceBid} className="p-6 rounded-3xl glass-panel border border-white/10 space-y-5">
              
              <div className="flex items-center justify-between">
                <label htmlFor="bid-input" className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Gavel className="w-4 h-4 text-cyan-400" />
                  Enter Your Bid Amount
                </label>
                <div className="text-xs text-slate-400">
                  Min bid: <span className="font-mono font-bold text-cyan-300">${minRequiredBid.toLocaleString()}</span>
                </div>
              </div>

              {/* Input Group with Currency Symbol & Place Bid button */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 text-lg font-bold font-mono">$</span>
                </div>
                <input
                  id="bid-input"
                  type="number"
                  min={minRequiredBid}
                  step="25"
                  value={bidAmount}
                  onChange={(e) => {
                    setBidAmount(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full pl-9 pr-36 py-4 rounded-2xl glass-input text-xl font-mono font-bold text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-400"
                  placeholder={minRequiredBid.toString()}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-2 top-2 bottom-2 px-6 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30 transition-all duration-200 active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  {isSubmitting ? "Placing..." : "Place Bid"}
                </button>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="flex items-center gap-2 text-xs font-medium text-rose-400 bg-rose-950/40 p-2.5 rounded-xl border border-rose-500/30">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Preset Increments */}
              <div className="space-y-2">
                <span className="text-[11px] text-slate-400 font-medium">Quick Bid Increments:</span>
                <div className="grid grid-cols-4 gap-2">
                  {[50, 100, 250, 500].map((inc) => (
                    <button
                      key={inc}
                      type="button"
                      onClick={() => handlePresetAdd(inc)}
                      className="py-2 rounded-xl text-xs font-mono font-bold bg-white/5 hover:bg-white/10 hover:border-cyan-500/40 border border-white/10 text-cyan-300 transition-all active:scale-95 cursor-pointer"
                    >
                      +${inc}
                    </button>
                  ))}
                </div>
              </div>

              {/* User Balance & Safety Note */}
              <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
                <div>
                  Your available balance: <span className="text-white font-mono font-bold">${userBalance.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Funds held in secure escrow only if leading
                </div>
              </div>

            </form>

            {/* Real-Time Bid History Feed */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-bold font-display text-white">
                    Live Bid History Feed
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Stream Active</span>
                </div>
              </div>

              {/* Bid Feed List */}
              <div className="mt-4 space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {selectedAuction.bidHistory.map((bid, index) => {
                  const isFirst = index === 0;
                  return (
                    <div
                      key={bid.id}
                      className={`p-3 rounded-xl flex items-center justify-between transition-all duration-300 ${
                        isFirst
                          ? 'bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/40 text-cyan-200'
                          : 'bg-white/[0.02] border border-white/5 text-slate-300 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={bid.avatar}
                          alt={bid.bidder}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-white/10"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">
                              {bid.bidder}
                            </span>
                            {isFirst && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                Leading
                              </span>
                            )}
                            {bid.isUser && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                You
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {bid.time}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-mono font-bold text-white block">
                          ${bid.amount.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-medium">
                          Verified
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
