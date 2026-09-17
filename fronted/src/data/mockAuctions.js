export const initialAuctions = [
  {
    id: "auc-1",
    title: "Alienware M18 R2 Liquid-Cooled Beast",
    category: "Gaming",
    subtitle: "Intel Core i9-14900HX • RTX 4090 16GB • 64GB DDR5 • 4K Mini-LED",
    description: "The apex predator of gaming laptops. Featuring vapor-chamber cooling, mechanical CherryMX ultra-low profile keyboard, and desktop-grade overclocking headroom.",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80",
    currentBid: 3450,
    startingBid: 2200,
    reservePrice: 3000,
    bidCount: 42,
    secondsRemaining: 1845, // ~30 mins
    tag: "Ending Soon",
    featured: true,
    seller: {
      name: "CyberTech Global",
      rating: 4.98,
      verified: true,
      salesCount: 1420
    },
    bidders: [
      { name: "Alex V.", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" },
      { name: "Sarah K.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" },
      { name: "Dmitri R.", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80" },
      { name: "Elena M.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80" }
    ],
    bidHistory: [
      { id: "b1", bidder: "Sarah K.", amount: 3450, time: "25s ago", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80", isLead: true },
      { id: "b2", bidder: "Marcus Sterling", amount: 3400, time: "1m ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80", isLead: false },
      { id: "b3", bidder: "Alex V.", amount: 3350, time: "3m ago", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80", isLead: false },
      { id: "b4", bidder: "Elena M.", amount: 3200, time: "6m ago", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80", isLead: false },
      { id: "b5", bidder: "Dmitri R.", amount: 3100, time: "11m ago", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80", isLead: false }
    ]
  },
  {
    id: "auc-2",
    title: "Apple iPhone 18 Pro Max Quantum",
    category: "Electronics",
    subtitle: "Liquid Titanium • 1TB • Quantum Neural Engine • Sub-THz 6G",
    description: "Next-generation quantum-crystal OLED panel with zero-bezel edge and revolutionary photonic sensor array. Factory sealed with global AppleCare+ lifetime coverage.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
    currentBid: 2150,
    startingBid: 1400,
    reservePrice: 2000,
    bidCount: 56,
    secondsRemaining: 4890, // ~1 hr 20 mins
    tag: "Hot Item",
    featured: true,
    seller: {
      name: "Apex Electronics",
      rating: 4.95,
      verified: true,
      salesCount: 3890
    },
    bidders: [
      { name: "Jordan P.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" },
      { name: "Emily C.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80" },
      { name: "David L.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80" }
    ],
    bidHistory: [
      { id: "b20", bidder: "Emily C.", amount: 2150, time: "42s ago", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80", isLead: true },
      { id: "b21", bidder: "Jordan P.", amount: 2100, time: "2m ago", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80", isLead: false },
      { id: "b22", bidder: "David L.", amount: 2050, time: "5m ago", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80", isLead: false }
    ]
  },
  {
    id: "auc-3",
    title: "Rolex Cosmograph Daytona Rose Gold",
    category: "Luxury",
    subtitle: "18k Everose Gold • Black Cerachrom Bezel • Oysterflex Bracelet",
    description: "An icon eternally joined in name and function to the high-performance world of motorsport. Pristine condition with original papers, chronometer certificate, and presentation vault.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    currentBid: 38900,
    startingBid: 28000,
    reservePrice: 35000,
    bidCount: 78,
    secondsRemaining: 9420, // ~2.6 hrs
    tag: "High Value",
    featured: true,
    seller: {
      name: "Geneva Vault & Horology",
      rating: 5.0,
      verified: true,
      salesCount: 840
    },
    bidders: [
      { name: "Count Von B.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" },
      { name: "Sophia Wei", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" },
      { name: "Harrison F.", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80" }
    ],
    bidHistory: [
      { id: "b30", bidder: "Sophia Wei", amount: 38900, time: "18s ago", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80", isLead: true },
      { id: "b31", bidder: "Harrison F.", amount: 38500, time: "1m ago", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80", isLead: false },
      { id: "b32", bidder: "Count Von B.", amount: 37900, time: "4m ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80", isLead: false }
    ]
  },
  {
    id: "auc-4",
    title: "PlayStation 6 Pro Limited Cyber Edition",
    category: "Gaming",
    subtitle: "Custom Obsidian Chassis • 8K 120FPS • Dual Sense Quantum Controller",
    description: "Collector's Unit #0042/1000. Features biometric sensory integration, custom cyberpunk luminescent piping, and unreleased launch title preview packages.",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80",
    currentBid: 1450,
    startingBid: 850,
    reservePrice: 1200,
    bidCount: 64,
    secondsRemaining: 3120, // ~52 mins
    tag: "Rare Find",
    featured: false,
    seller: {
      name: "Tokyo Rare Tech",
      rating: 4.97,
      verified: true,
      salesCount: 2190
    },
    bidders: [
      { name: "Kenji S.", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" },
      { name: "Maya T.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" }
    ],
    bidHistory: [
      { id: "b40", bidder: "Kenji S.", amount: 1450, time: "12s ago", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80", isLead: true },
      { id: "b41", bidder: "Maya T.", amount: 1400, time: "2m ago", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80", isLead: false }
    ]
  },
  {
    id: "auc-5",
    title: "Sony Alpha 1 II Cinema 8K Rig",
    category: "Cameras",
    subtitle: "50.1MP Exmor RS • 8K 60p RAW • FE 24-70mm f/2.8 GM II",
    description: "Complete cinematography production package with Tilta cage rig, Ninja V+ HDR monitor, two 1TB CFexpress Type A cards, and carbon fluid head tripod.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    currentBid: 7850,
    startingBid: 5500,
    reservePrice: 7000,
    bidCount: 31,
    secondsRemaining: 6780, // ~1.8 hrs
    tag: "Creator Pro",
    featured: false,
    seller: {
      name: "Cinema Lens & Motion",
      rating: 4.99,
      verified: true,
      salesCount: 910
    },
    bidders: [
      { name: "Lucas B.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" },
      { name: "Clara R.", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" }
    ],
    bidHistory: [
      { id: "b50", bidder: "Lucas B.", amount: 7850, time: "1m ago", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80", isLead: true },
      { id: "b51", bidder: "Clara R.", amount: 7600, time: "4m ago", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80", isLead: false }
    ]
  },
  {
    id: "auc-6",
    title: "Bugatti Tourbillon 1:8 Masterpiece Scale Model",
    category: "Collectibles",
    subtitle: "Amalgam Collection • Handcrafted Carbon Fiber • Working V16 Parts",
    description: "Strictly limited to 99 numbered pieces worldwide. Precise 1:8 digital scan from Bugatti factory blueprints with opening doors, functioning steering, and genuine leather cockpit.",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
    currentBid: 16200,
    startingBid: 12000,
    reservePrice: 15000,
    bidCount: 29,
    secondsRemaining: 12400, // ~3.4 hrs
    tag: "Exclusive",
    featured: false,
    seller: {
      name: "Monaco Prestige Gallery",
      rating: 5.0,
      verified: true,
      salesCount: 430
    },
    bidders: [
      { name: "Vikram N.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80" },
      { name: "Olivier D.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80" }
    ],
    bidHistory: [
      { id: "b60", bidder: "Vikram N.", amount: 16200, time: "45s ago", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80", isLead: true },
      { id: "b61", bidder: "Olivier D.", amount: 15800, time: "7m ago", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80", isLead: false }
    ]
  }
];
