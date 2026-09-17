import React from 'react';
import { AuctionProvider, useAuction } from './context/AuctionContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import LiveAuctions from './components/LiveAuctions';
import LiveBiddingPanel from './components/LiveBiddingPanel';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import WalletModal from './components/WalletModal';
import NotificationToast from './components/NotificationToast';
import CreateAuction from './components/CreateAuction';

function AppContent() {
  const { currentView } = useAuction();

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content: Marketplace vs Seller Portal */}
      <main className="flex-grow">
        {currentView === 'seller-portal' ? (
          <CreateAuction />
        ) : (
          <>
            {/* Hero Section */}
            <Hero />

            {/* Statistics Section with Animated Counters */}
            <StatsSection />

            {/* Live Auctions Grid with Filters & Timers */}
            <LiveAuctions />

            {/* Core Interactive Live Bidding Panel */}
            <LiveBiddingPanel />

            {/* Platform Features Section */}
            <FeaturesSection />

            {/* How It Works 4-Step Process */}
            <HowItWorks />

            {/* Modern Testimonials Section */}
            <Testimonials />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Overlays & Modals */}
      <AuthModal />
      <WalletModal />
      <NotificationToast />
    </div>
  );
}

export default function App() {
  return (
    <AuctionProvider>
      <AppContent />
    </AuctionProvider>
  );
}
