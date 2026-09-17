import React from 'react';
import { PlusCircle, Layers, Gavel, ShieldCheck, Database, Radio, ArrowRight, Sparkles } from 'lucide-react';

export default function RealtimeFlowDiagram() {
  const steps = [
    {
      step: 1,
      title: "Seller Creates Auction",
      description: "Seller specifies asset details, reserve pricing, and cryptographic ownership certificate.",
      icon: PlusCircle,
      accent: "from-cyan-500 to-blue-500",
      pill: "Seller Node"
    },
    {
      step: 2,
      title: "Auction Appears in Live Auctions",
      description: "Asset is instantly indexed and populated across all active buyer grids and recommendation engines.",
      icon: Layers,
      accent: "from-blue-500 to-indigo-500",
      pill: "Global Indexer"
    },
    {
      step: 3,
      title: "Buyers Place Bids",
      description: "Thousands of concurrent global bidders submit competitive microsecond increments.",
      icon: Gavel,
      accent: "from-indigo-500 to-purple-500",
      pill: "Buyer Gateway"
    },
    {
      step: 4,
      title: "Backend Validates Bid",
      description: "Escrow balances, anti-sniping timestamp ordering, and signature verification executed.",
      icon: ShieldCheck,
      accent: "from-purple-500 to-pink-500",
      pill: "Consensus Engine"
    },
    {
      step: 5,
      title: "Database Commits Highest Bid",
      description: "Deterministic state commit locks current leader and recalculates reserve milestones.",
      icon: Database,
      accent: "from-pink-500 to-rose-500",
      pill: "ACID Ledger"
    },
    {
      step: 6,
      title: "WebSocket Broadcast Updates Everyone",
      description: "Sub-10ms pub/sub edge pipelines push instant price flash and timer updates globally.",
      icon: Radio,
      accent: "from-cyan-400 to-emerald-400",
      pill: "Edge Broadcast"
    }
  ];

  return (
    <div className="relative p-6 sm:p-8 rounded-3xl glass-card border border-cyan-500/20 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            System Architecture
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Real-Time BidSphere Lifecycle Engine
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            How a seller-created auction flows through verification, live bidding, and instant global edge distribution.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Sub-10ms Edge Pipelines</span>
        </div>
      </div>

      {/* Grid of 6 Flow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.05] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-cyan-300 border border-white/10">
                    STAGE 0{s.step}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {s.pill}
                  </span>
                </div>

                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${s.accent} p-[1px] shrink-0`}>
                    <div className="w-full h-full bg-[#0b101c] rounded-[11px] flex items-center justify-center text-white">
                      <Icon className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold font-display text-white group-hover:text-cyan-300 transition-colors leading-tight">
                    {s.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed mt-2">
                  {s.description}
                </p>
              </div>

              {/* Bottom Connector Arrow */}
              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-mono">Sync Verified</span>
                {idx < steps.length - 1 ? (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                ) : (
                  <span className="text-emerald-400 font-bold">100% Broadcasted</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
