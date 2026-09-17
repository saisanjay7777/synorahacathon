import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuction } from '../context/AuctionContext';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode } = useAuction();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setAuthModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-md rounded-3xl glass-panel p-6 sm:p-8 border border-cyan-500/30 shadow-[0_0_50px_rgba(56,189,248,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] mx-auto mb-3 shadow-lg shadow-cyan-500/30">
            <div className="w-full h-full bg-[#0a0f1d] rounded-[15px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-display text-white">
            {authMode === 'login' ? 'Welcome to BidSphere' : 'Create Bidder Account'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {authMode === 'login'
              ? 'Enter your credentials to manage active bids and wallet'
              : 'Join over 125,000 verified bidders globally with escrow protection'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-white/5 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              authMode === 'login'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              authMode === 'signup'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {isSuccess ? (
          <div className="py-10 text-center space-y-3 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-white">
              {authMode === 'login' ? 'Authenticated Successfully!' : 'Account Created!'}
            </h4>
            <p className="text-xs text-slate-400">Loading your real-time bidder environment...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {authMode === 'signup' && (
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alexander Vance"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded bg-slate-900 border-white/20 text-cyan-500" />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-cyan-400 hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{authMode === 'login' ? 'Sign In to Live Platform' : 'Create Free Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
