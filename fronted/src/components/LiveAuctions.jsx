import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Flame, Radio, Sparkles } from 'lucide-react';
import { useAuction } from '../context/AuctionContext';
import AuctionCard from './AuctionCard';

export default function LiveAuctions() {
  const { auctions } = useAuction();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('endingSoon'); // 'endingSoon' | 'highestBid' | 'mostBids'

  const categories = ['All', 'Gaming', 'Electronics', 'Luxury', 'Cameras', 'Collectibles'];

  const filteredAuctions = useMemo(() => {
    return auctions
      .filter((auction) => {
        const matchesCategory = selectedCategory === 'All' || auction.category === selectedCategory;
        const matchesSearch =
          auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          auction.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          auction.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'endingSoon') return a.secondsRemaining - b.secondsRemaining;
        if (sortBy === 'highestBid') return b.currentBid - a.currentBid;
        if (sortBy === 'mostBids') return b.bidCount - a.bidCount;
        return 0;
      });
  }, [auctions, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="live-auctions" className="relative py-20 bg-[#07090e]">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              Live Auction Marketplace
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Live Auctions</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Real-time synchronized bidding on authenticated luxury gear, rare electronics, and flagship hardware.
            </p>
          </div>

          {/* Search Bar & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gaming laptops, watches..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-medium focus:ring-1 focus:ring-cyan-400 placeholder:text-slate-500"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto pl-3 pr-8 py-2.5 rounded-xl glass-input text-xs font-medium appearance-none cursor-pointer focus:ring-1 focus:ring-cyan-400"
              >
                <option value="endingSoon" className="bg-[#0b101d] text-white">Ending Soonest</option>
                <option value="highestBid" className="bg-[#0b101d] text-white">Highest Bid</option>
                <option value="mostBids" className="bg-[#0b101d] text-white">Most Active Bids</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_18px_rgba(56,189,248,0.35)]'
                    : 'glass-pill text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat === 'All' && <Sparkles className="w-3.5 h-3.5 inline mr-1.5 text-cyan-200" />}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Auction Cards Grid */}
        {filteredAuctions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl glass-panel border border-white/10 space-y-3">
            <Search className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No auctions found</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your search query or switching to another category.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-2 text-xs font-semibold text-cyan-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
