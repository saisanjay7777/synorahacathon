import React from 'react';
import { DollarSign, Clock, TrendingUp, ShieldCheck, HelpCircle } from 'lucide-react';

export default function StepAuctionSettings({ formData, setFormData, onNext, onPrev }) {
  const durations = ['1h', '6h', '12h', '24h', '3 days', '7 days'];

  const handlePriceChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const startingPrice = Number(formData.startingPrice) || 0;
  const reservePrice = Number(formData.reservePrice) || 0;
  const minIncrement = Number(formData.minIncrement) || 50;

  const isSettingsValid = startingPrice > 0 && minIncrement > 0;

  return (
    <div className="space-y-6">
      
      {/* 2-Column Grid: Form on Left, Live Insights & Examples on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Form Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Starting Price */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                Starting Price (USD) <span className="text-rose-400">*</span>
              </span>
              <span className="text-[11px] font-normal text-slate-400">Opening bid floor</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold text-base">$</span>
              <input
                type="number"
                min="10"
                step="10"
                required
                value={formData.startingPrice}
                onChange={(e) => handlePriceChange('startingPrice', e.target.value)}
                placeholder="1500"
                className="w-full pl-8 pr-4 py-3.5 rounded-2xl glass-input text-base font-mono font-bold focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>

          {/* Minimum Bid Increment */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                Minimum Bid Increment <span className="text-rose-400">*</span>
              </span>
              <span className="text-[11px] font-normal text-slate-400">Recommended: $50 - $100</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold text-base">$</span>
              <input
                type="number"
                min="10"
                step="10"
                required
                value={formData.minIncrement}
                onChange={(e) => handlePriceChange('minIncrement', e.target.value)}
                placeholder="50"
                className="w-full pl-8 pr-4 py-3.5 rounded-2xl glass-input text-base font-mono font-bold focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>

          {/* Auction Duration */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Auction Duration <span className="text-rose-400">*</span>
              </span>
              <span className="text-[11px] font-mono text-cyan-400">Anti-sniping auto-protect</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {durations.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setFormData({ ...formData, duration: d })}
                  className={`py-2.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                    formData.duration === d
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border-transparent'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Reserve Price (Optional) */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Reserve Price (Optional)
              </span>
              <span className="text-[11px] font-normal text-slate-400">Hidden floor price</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold text-base">$</span>
              <input
                type="number"
                min={startingPrice}
                step="50"
                value={formData.reservePrice}
                onChange={(e) => handlePriceChange('reservePrice', e.target.value)}
                placeholder={startingPrice ? (startingPrice * 1.3).toString() : "2000"}
                className="w-full pl-8 pr-4 py-3.5 rounded-2xl glass-input text-base font-mono font-bold focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Live Examples & Mathematical Helpers (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl glass-panel border border-cyan-500/30 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            Live Marketplace Simulator
          </div>

          {/* Simulated Example Calculations */}
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-slate-400 block font-medium">Opening First Bid:</span>
              <span className="text-base font-mono font-bold text-white">
                ${startingPrice ? startingPrice.toLocaleString() : "0"} USD
              </span>
              <p className="text-[11px] text-slate-400">
                Example: Buyer 1 enters room and places starting bid.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-slate-400 block font-medium">Next Minimum Valid Bid:</span>
              <span className="text-base font-mono font-bold text-cyan-300">
                ${(startingPrice + minIncrement).toLocaleString()} USD
              </span>
              <p className="text-[11px] text-slate-400">
                Example: Buyer 2 must bid at least +${minIncrement}.
              </p>
            </div>

            {reservePrice > 0 && (
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-1">
                <span className="text-purple-300 block font-medium">Reserve Met Threshold:</span>
                <span className="text-base font-mono font-bold text-purple-200">
                  ${reservePrice.toLocaleString()} USD
                </span>
                <p className="text-[11px] text-slate-400">
                  Auction will only settle if final bid exceeds this hidden threshold.
                </p>
              </div>
            )}

            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 text-[11px] space-y-1">
              <p className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Anti-Sniping Engine Activated:
              </p>
              <p className="text-slate-300">
                Any bid submitted in the final 60 seconds of this {formData.duration} auction automatically extends the countdown by 45 seconds to prevent bot sniping.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          ← Back to Images
        </button>

        <button
          type="button"
          disabled={!isSettingsValid}
          onClick={onNext}
          className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Next: Preview & Publish →
        </button>
      </div>

    </div>
  );
}
