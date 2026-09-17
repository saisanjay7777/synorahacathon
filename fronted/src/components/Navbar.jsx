import React, { useState, useEffect } from 'react';
import { Gavel, Wallet, Menu, X, Shield, Sparkles, User, ChevronRight, PlusCircle, ArrowLeftRight } from 'lucide-react';
import { useAuction } from '../context/AuctionContext';

export default function Navbar() {
  const { userBalance, setAuthModalOpen, setAuthMode, setWalletModalOpen, currentView, setCurrentView } = useAuction();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Live Auctions", href: "#live-auctions" },
    { label: "Bidding Panel", href: "#bidding-panel" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#footer" },
  ];

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const toggleView = () => {
    if (currentView === 'seller-portal') {
      setCurrentView('marketplace');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('seller-portal');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => {
            setCurrentView('marketplace');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-purple-500/30 transition-all duration-300">
            <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
              <Gavel className="w-5 h-5 text-cyan-400 group-hover:scale-110 group-hover:rotate-[-8deg] transition-transform duration-300" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold font-display tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Bid<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Sphere</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-semibold">
                Live
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Nav Links (Shown when in marketplace or quick anchor access) */}
        {currentView === 'marketplace' ? (
          <nav className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : (
          <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-200">
              Seller Auction Portal
            </span>
            <span className="text-purple-400/50">•</span>
            <button
              onClick={() => {
                setCurrentView('marketplace');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs text-cyan-300 hover:text-cyan-200 font-medium hover:underline flex items-center gap-1 ml-1"
            >
              <span>Back to Marketplace</span>
            </button>
          </div>
        )}

        {/* Right side actions: Sell Item + Balance + Auth buttons */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Sell an Item / Marketplace Toggle Button */}
          <button
            onClick={toggleView}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md ${
              currentView === 'seller-portal'
                ? 'bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 border border-cyan-500/30'
                : 'bg-gradient-to-r from-purple-600/80 via-indigo-600/80 to-cyan-600/80 hover:from-purple-500 hover:to-cyan-500 text-white border border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
            }`}
            title={currentView === 'seller-portal' ? "Return to Buyer Marketplace" : "Open Seller Auction Creation Portal"}
          >
            {currentView === 'seller-portal' ? (
              <>
                <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-400" />
                <span>Marketplace</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-3.5 h-3.5 text-cyan-200" />
                <span>Sell an Item</span>
              </>
            )}
          </button>

          {/* User Wallet Pill */}
          <button
            onClick={() => setWalletModalOpen(true)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all cursor-pointer group"
            title="Open Wallet & Deposits"
          >
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform">
              <Wallet className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium leading-none">Wallet</p>
              <p className="text-xs font-mono font-bold text-white group-hover:text-cyan-200 transition-colors">
                ${userBalance.toLocaleString()}
              </p>
            </div>
            <div className="ml-1 text-[11px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-bold hover:bg-cyan-500/40">
              +
            </div>
          </button>

          {/* Auth Action Buttons */}
          <button
            onClick={() => openAuth('login')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            Login
          </button>
          
          <button
            onClick={() => openAuth('signup')}
            className="glow-button px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            Sign Up
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleView}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-600 to-cyan-600 text-white flex items-center gap-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{currentView === 'seller-portal' ? 'Market' : 'Sell'}</span>
          </button>
          <button
            onClick={() => setWalletModalOpen(true)}
            className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
          >
            <Wallet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a0f1d]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-400">Available Funds:</span>
              <span className="font-mono font-bold text-cyan-300">${userBalance.toLocaleString()}</span>
            </div>
            <button
              onClick={() => {
                setWalletModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-md"
            >
              Deposit
            </button>
          </div>

          <div className="pb-2">
            <button
              onClick={toggleView}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-cyan-600 text-white flex items-center justify-center gap-2 shadow-lg"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{currentView === 'seller-portal' ? 'Switch to Buyer Marketplace' : 'Switch to Seller Portal'}</span>
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setCurrentView('marketplace');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 border-b border-white/[0.04]"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
          </div>

          <div className="pt-2 grid grid-cols-2 gap-3">
            <button
              onClick={() => openAuth('login')}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-center"
            >
              Login
            </button>
            <button
              onClick={() => openAuth('signup')}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg text-center"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
