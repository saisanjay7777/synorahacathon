import React, { useState } from 'react';
import { X, Wallet, ArrowDownLeft, ShieldCheck, CheckCircle2, CreditCard, Landmark, Coins } from 'lucide-react';
import { useAuction } from '../context/AuctionContext';

export default function WalletModal() {
  const { walletModalOpen, setWalletModalOpen, userBalance, depositFunds } = useAuction();
  const [amount, setAmount] = useState(1000);
  const [method, setMethod] = useState('card');
  const [success, setSuccess] = useState(false);

  if (!walletModalOpen) return null;

  const handleDeposit = (e) => {
    e.preventDefault();
    if (amount <= 0) return;

    depositFunds(Number(amount));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setWalletModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-3xl glass-panel p-6 sm:p-8 border border-cyan-500/30 shadow-[0_0_50px_rgba(56,189,248,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setWalletModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] mx-auto mb-3 shadow-lg shadow-cyan-500/30">
            <div className="w-full h-full bg-[#0a0f1d] rounded-[15px] flex items-center justify-center">
              <Wallet className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-display text-white">
            BidSphere Escrow Wallet
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Deposit funds instantly to place leading bids on high-value lots.
          </p>
        </div>

        {/* Current Balance Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-purple-950/40 border border-white/10 mb-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
              Available Escrow Balance
            </span>
            <span className="text-3xl font-extrabold font-mono text-white">
              ${userBalance.toLocaleString()}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
            <ArrowDownLeft className="w-5 h-5" />
          </div>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-white">Deposit Successful!</h4>
            <p className="text-xs text-slate-400">
              ${Number(amount).toLocaleString()} has been credited to your bidding balance.
            </p>
          </div>
        ) : (
          <form onSubmit={handleDeposit} className="space-y-4">
            
            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  method === 'card'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-[10px] font-semibold">Card / Apple</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('wire')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  method === 'wire'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Landmark className="w-4 h-4" />
                <span className="text-[10px] font-semibold">Bank Wire</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('crypto')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  method === 'crypto'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Coins className="w-4 h-4" />
                <span className="text-[10px] font-semibold">USDC / Crypto</span>
              </button>
            </div>

            {/* Deposit Input */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Deposit Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">$</span>
                <input
                  type="number"
                  min="50"
                  step="50"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 rounded-xl glass-input text-lg font-mono font-bold text-white"
                />
              </div>
            </div>

            {/* Quick Amounts */}
            <div className="grid grid-cols-4 gap-2">
              {[500, 1000, 2500, 5000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className={`py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                    amount === preset
                      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-300'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  +${preset}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Unused deposit funds are 100% refundable at any time.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30 transition-all cursor-pointer"
            >
              Deposit ${amount.toLocaleString()} Instantly
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
