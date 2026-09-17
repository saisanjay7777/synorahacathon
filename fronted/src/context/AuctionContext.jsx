import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { initialAuctions } from '../data/mockAuctions';

const AuctionContext = createContext(null);

export function AuctionProvider({ children }) {
  const [currentView, setCurrentView] = useState('marketplace'); // 'marketplace' | 'seller-portal'
  const [auctions, setAuctions] = useState(initialAuctions);
  const [selectedAuctionId, setSelectedAuctionId] = useState(initialAuctions[0].id);
  const [userBalance, setUserBalance] = useState(15450);
  
  // Seller portal state
  const [sellerAuctions, setSellerAuctions] = useState([
    {
      id: "seller-init-1",
      title: "Hasselblad 907X 50C Medium Format Rig",
      category: "Cameras",
      subtitle: "50MP CMOS Sensor • CFV II 50C Digital Back • 45mm F4 Lens",
      description: "Collector condition studio camera with dual SD slots and medium-format dynamic range.",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
      currentBid: 6850,
      startingBid: 4500,
      reservePrice: 6000,
      bidCount: 28,
      secondsRemaining: 7420,
      tag: "Seller Active",
      featured: true,
      seller: {
        name: "You (Verified Seller)",
        rating: 5.0,
        verified: true,
        salesCount: 14
      },
      bidders: [
        { name: "Elena_V", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" },
        { name: "ApexTrader", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" },
        { name: "Satoshi_N", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" }
      ],
      bidHistory: [
        { id: "sb-1", bidder: "Elena_V", amount: 6850, time: "40s ago", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80", isLead: true },
        { id: "sb-2", bidder: "ApexTrader", amount: 6600, time: "2m ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80", isLead: false }
      ]
    }
  ]);

  const [sellerActivity, setSellerActivity] = useState([
    { id: "act-1", text: "Elena_V placed $6,850 on your Hasselblad 907X", time: "40s ago", type: "bid", highlight: "$6,850" },
    { id: "act-2", text: "ApexTrader increased bid to $6,600", time: "2m ago", type: "bid", highlight: "$6,600" },
    { id: "act-3", text: "New participant joined your Hasselblad 907X room", time: "5m ago", type: "user" },
    { id: "act-4", text: "Auction reserve price met automatically ($6,000)", time: "18m ago", type: "system" }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: "init-1",
      title: "Live Arena Connected",
      message: "Connected to BidSphere High-Speed WebSocket Gateway (Tokyo Edge).",
      type: "info",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }
  ]);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [isSimulationActive, setIsSimulationActive] = useState(true);

  // Current selected auction item
  const selectedAuction = auctions.find(a => a.id === selectedAuctionId) || auctions[0];

  // Helper to add toast notification
  const addNotification = useCallback((title, message, type = 'info') => {
    const id = "notif-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4);
    const newNotif = {
      id,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 4)]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4500);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // 1. Ticking countdown timer for each auction
  useEffect(() => {
    const timer = setInterval(() => {
      setAuctions(prevAuctions =>
        prevAuctions.map(item => ({
          ...item,
          secondsRemaining: item.secondsRemaining > 0 ? item.secondsRemaining - 1 : 0
        }))
      );
      setSellerAuctions(prev =>
        prev.map(item => ({
          ...item,
          secondsRemaining: item.secondsRemaining > 0 ? item.secondsRemaining - 1 : 0
        }))
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Realistic competitor bidding simulation & seller activity simulation
  useEffect(() => {
    if (!isSimulationActive) return;

    const competitorNames = [
      { name: "Satoshi_N", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" },
      { name: "Elena_V", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" },
      { name: "ApexTrader", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" },
      { name: "Chloe_Design", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" },
      { name: "QuantumDev", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" }
    ];

    const interval = setInterval(() => {
      setAuctions(prev => {
        const targetAuction = Math.random() < 0.55
          ? prev.find(a => a.id === selectedAuctionId) || prev[0]
          : prev[Math.floor(Math.random() * prev.length)];

        if (!targetAuction || targetAuction.secondsRemaining <= 0) return prev;

        const increments = [50, 100, 150, 250];
        const increment = increments[Math.floor(Math.random() * increments.length)];
        const newBidAmount = targetAuction.currentBid + increment;
        const competitor = competitorNames[Math.floor(Math.random() * competitorNames.length)];

        const newBidEntry = {
          id: "bid-" + Date.now(),
          bidder: competitor.name,
          amount: newBidAmount,
          time: "Just now",
          avatar: competitor.avatar,
          isLead: true
        };

        if (targetAuction.id === selectedAuctionId) {
          addNotification(
            "⚡ Competing Bid Placed!",
            `${competitor.name} placed a bid of $${newBidAmount.toLocaleString()} on ${targetAuction.title.slice(0, 24)}...`,
            "warning"
          );
        }

        // Also add seller activity notification if it's one of the seller's auctions
        if (targetAuction.seller?.name?.includes("You")) {
          setSellerActivity(sPrev => [
            {
              id: "act-" + Date.now(),
              text: `${competitor.name} placed $${newBidAmount.toLocaleString()} on your ${targetAuction.title.slice(0, 20)}...`,
              time: "Just now",
              type: "bid",
              highlight: `$${newBidAmount.toLocaleString()}`
            },
            ...sPrev.slice(0, 6)
          ]);
        }

        return prev.map(a => {
          if (a.id !== targetAuction.id) return a;
          return {
            ...a,
            currentBid: newBidAmount,
            bidCount: a.bidCount + 1,
            secondsRemaining: a.secondsRemaining < 60 ? a.secondsRemaining + 45 : a.secondsRemaining,
            bidHistory: [
              newBidEntry,
              ...a.bidHistory.map(b => ({ ...b, isLead: false })).slice(0, 9)
            ]
          };
        });
      });
    }, 9000);

    return () => clearInterval(interval);
  }, [selectedAuctionId, isSimulationActive, addNotification]);

  // 3. User places a bid
  const placeBid = useCallback((auctionId, bidAmount) => {
    const target = auctions.find(a => a.id === auctionId);
    if (!target) return { success: false, error: "Auction not found" };

    if (bidAmount <= target.currentBid) {
      addNotification("Invalid Bid Amount", `Bid must be higher than current highest bid of $${target.currentBid.toLocaleString()}`, "error");
      return { success: false, error: "Bid too low" };
    }

    if (bidAmount > userBalance) {
      addNotification("Insufficient Balance", `Your balance ($${userBalance.toLocaleString()}) cannot cover this bid. Please deposit funds.`, "error");
      setWalletModalOpen(true);
      return { success: false, error: "Insufficient balance" };
    }

    const userBid = {
      id: "usr-bid-" + Date.now(),
      bidder: "You (Highest Bidder)",
      amount: bidAmount,
      time: "Just now",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      isLead: true,
      isUser: true
    };

    setAuctions(prev =>
      prev.map(a => {
        if (a.id !== auctionId) return a;
        return {
          ...a,
          currentBid: bidAmount,
          bidCount: a.bidCount + 1,
          secondsRemaining: a.secondsRemaining < 60 ? a.secondsRemaining + 60 : a.secondsRemaining,
          bidHistory: [
            userBid,
            ...a.bidHistory.map(b => ({ ...b, isLead: false })).slice(0, 9)
          ]
        };
      })
    );

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00f0ff', '#8b5cf6', '#3b82f6', '#ec4899', '#ffffff']
      });
    } catch (e) {
      console.warn("Confetti error", e);
    }

    addNotification(
      "🎉 Leading Bid Placed!",
      `You successfully placed the highest bid of $${bidAmount.toLocaleString()} on ${target.title}!`,
      "success"
    );

    return { success: true };
  }, [auctions, userBalance, addNotification]);

  // 4. Create and publish seller auction
  const addCustomAuction = useCallback((auctionData) => {
    const newId = "auc-seller-" + Date.now();
    
    // Parse duration string into seconds
    let seconds = 24 * 3600;
    if (auctionData.duration === '1h') seconds = 3600;
    else if (auctionData.duration === '6h') seconds = 6 * 3600;
    else if (auctionData.duration === '12h') seconds = 12 * 3600;
    else if (auctionData.duration === '24h') seconds = 24 * 3600;
    else if (auctionData.duration === '3 days') seconds = 3 * 24 * 3600;
    else if (auctionData.duration === '7 days') seconds = 7 * 24 * 3600;

    const newAuctionItem = {
      id: newId,
      title: auctionData.name,
      category: auctionData.category || "Electronics",
      subtitle: `${auctionData.brand ? auctionData.brand + ' • ' : ''}${auctionData.category} • Mint Verified Condition`,
      description: auctionData.description,
      image: auctionData.images[0] || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      currentBid: Number(auctionData.startingPrice),
      startingBid: Number(auctionData.startingPrice),
      reservePrice: Number(auctionData.reservePrice || auctionData.startingPrice * 1.3),
      minIncrement: Number(auctionData.minIncrement || 50),
      bidCount: 1,
      secondsRemaining: seconds,
      tag: "New Listing",
      featured: true,
      seller: {
        name: "You (Verified Seller)",
        rating: 5.0,
        verified: true,
        salesCount: 15
      },
      bidders: [
        { name: "You (Reserve)", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" }
      ],
      bidHistory: [
        {
          id: "init-bid-" + Date.now(),
          bidder: "Starting Reserve Opened",
          amount: Number(auctionData.startingPrice),
          time: "Just now",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
          isLead: true
        }
      ]
    };

    // Prepend to auctions and sellerAuctions
    setAuctions(prev => [newAuctionItem, ...prev]);
    setSellerAuctions(prev => [newAuctionItem, ...prev]);
    setSelectedAuctionId(newId);

    // Add seller activity
    setSellerActivity(prev => [
      {
        id: "act-" + Date.now(),
        text: `Auction launched: "${auctionData.name}" now live across BidSphere`,
        time: "Just now",
        type: "system",
        highlight: `$${Number(auctionData.startingPrice).toLocaleString()}`
      },
      ...prev
    ]);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#8b5cf6', '#3b82f6', '#ec4899', '#ffffff']
      });
    } catch (e) {
      console.warn("Confetti error", e);
    }

    addNotification(
      "🚀 Auction Published Live!",
      `"${auctionData.name}" is now live in the global marketplace at $${Number(auctionData.startingPrice).toLocaleString()}!`,
      "success"
    );

    return newAuctionItem;
  }, [addNotification]);

  // Deposit money into mock wallet
  const depositFunds = useCallback((amount) => {
    setUserBalance(prev => prev + amount);
    addNotification("Deposit Successful", `$${amount.toLocaleString()} added to your BidSphere secure wallet!`, "success");
  }, [addNotification]);

  return (
    <AuctionContext.Provider
      value={{
        currentView,
        setCurrentView,
        auctions,
        selectedAuction,
        selectedAuctionId,
        setSelectedAuctionId,
        sellerAuctions,
        sellerActivity,
        addCustomAuction,
        placeBid,
        userBalance,
        depositFunds,
        notifications,
        removeNotification,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        walletModalOpen,
        setWalletModalOpen,
        isSimulationActive,
        setIsSimulationActive
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
}

export function useAuction() {
  const ctx = useContext(AuctionContext);
  if (!ctx) throw new Error("useAuction must be used within an AuctionProvider");
  return ctx;
}
