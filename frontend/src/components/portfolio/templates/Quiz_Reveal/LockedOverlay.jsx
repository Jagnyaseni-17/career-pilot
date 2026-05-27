import React from 'react';
import { Lock } from 'lucide-react';

export default function LockedOverlay({ title }) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-950/60 p-6 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl border border-fuchsia-300/30 bg-fuchsia-300/10 text-fuchsia-100 shadow-lg shadow-fuchsia-500/10">
        <Lock className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-white">{title} locked</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-400">
        Answer the active quiz prompt to reveal this part of the portfolio.
      </p>
    </div>
  );
}
