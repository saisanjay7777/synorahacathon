import React from 'react';
import { useAuction } from '../context/AuctionContext';
import { AlertCircle, CheckCircle2, Info, X, Zap } from 'lucide-react';

export default function NotificationToast() {
  const { notifications, removeNotification } = useAuction();

  if (!notifications.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => {
        const isSuccess = n.type === 'success';
        const isWarning = n.type === 'warning';
        const isError = n.type === 'error';

        return (
          <div
            key={n.id}
            className={`pointer-events-auto p-4 rounded-xl backdrop-blur-xl border transition-all duration-300 shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5 ${
              isSuccess
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.2)]'
                : isWarning
                ? 'bg-amber-950/85 border-amber-500/40 text-amber-100 shadow-[0_0_25px_rgba(245,158,11,0.2)]'
                : isError
                ? 'bg-rose-950/85 border-rose-500/40 text-rose-100 shadow-[0_0_25px_rgba(244,63,94,0.2)]'
                : 'bg-slate-900/90 border-cyan-500/30 text-slate-100 shadow-[0_0_25px_rgba(56,189,248,0.2)]'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isWarning && <Zap className="w-5 h-5 text-amber-400 animate-pulse" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {!isSuccess && !isWarning && !isError && <Info className="w-5 h-5 text-cyan-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-sm leading-tight text-white">{n.title}</p>
                <span className="text-[10px] opacity-60 font-mono shrink-0">{n.timestamp}</span>
              </div>
              <p className="text-xs mt-1 text-slate-300 leading-relaxed break-words">{n.message}</p>
            </div>

            <button
              onClick={() => removeNotification(n.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
