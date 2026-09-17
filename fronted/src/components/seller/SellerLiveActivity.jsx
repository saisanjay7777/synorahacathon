import React from 'react';
import { Activity, Clock, Zap, UserPlus, AlertCircle, ArrowUpRight } from 'lucide-react';
import { useAuction } from '../../context/AuctionContext';

export default function SellerLiveActivity() {
  const { sellerActivity } = useAuction();

  const getIcon = (type) => {
    switch (type) {
      case 'bid':
        return <Zap className="w-4 h-4 text-cyan-400" />;
      case 'user':
        return <UserPlus className="w-4 h-4 text-purple-400" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      default:
        return <Activity className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
      
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <h4 className="text-sm font-bold font-display text-white">
            Live Seller Activity Feed
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Real-Time Stream</span>
        </div>
      </div>

      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {sellerActivity.map((act) => (
          <div
            key={act.id}
            className="p-3.5 rounded-xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/5 hover:border-cyan-500/30 transition-all flex items-start gap-3"
          >
            <div className="mt-0.5 p-1.5 rounded-lg bg-white/5 border border-white/10 shrink-0">
              {getIcon(act.type)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-200 leading-relaxed">
                {act.text}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {act.time}
                </span>
                {act.highlight && (
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                    {act.highlight}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
