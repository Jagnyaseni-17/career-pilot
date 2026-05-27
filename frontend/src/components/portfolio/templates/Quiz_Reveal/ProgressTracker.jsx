import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Lock, Trophy } from 'lucide-react';

import { sectionMeta } from './constants';
import { GlassPanel } from './ui';

export default function ProgressTracker({ unlockedCount, activeQuestion, totalQuestions }) {
  const progress = Math.round(((unlockedCount - 1) / totalQuestions) * 100);

  return (
    <GlassPanel className="sticky top-4 z-30 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            <Trophy className="h-4 w-4" />
            Quest Progress
          </div>
          <p className="mt-1 text-sm text-slate-400">
            {unlockedCount} of {sectionMeta.length} sections unlocked
          </p>
        </div>

        <div className="min-w-0 flex-1 lg:max-w-xl">
          <div className="h-3 overflow-hidden rounded-full bg-slate-900 ring-1 ring-white/10">
            <Motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-300"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
            />
          </div>
          <div className="mt-3 grid grid-cols-7 gap-2">
            {sectionMeta.map((section, index) => {
              const isUnlocked = index < unlockedCount;
              const isNext = index === unlockedCount;

              return (
                <div
                  key={section.id}
                  className={`group relative flex min-h-12 flex-col items-center justify-center rounded-xl border text-[10px] font-semibold uppercase tracking-wide transition ${
                    isUnlocked
                      ? 'border-cyan-300/40 bg-cyan-300/10 text-cyan-100 shadow-lg shadow-cyan-500/10'
                      : isNext
                        ? 'border-fuchsia-300/40 bg-fuchsia-300/10 text-fuchsia-100'
                        : 'border-white/10 bg-slate-950/70 text-slate-500'
                  }`}
                >
                  {isUnlocked ? React.createElement(section.icon, { className: 'h-4 w-4' }) : <Lock className="h-4 w-4" />}
                  <span className="mt-1 hidden sm:block">{section.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
          <span className="text-slate-500">Question</span>{' '}
          <span className="font-bold text-white">{Math.min(activeQuestion + 1, totalQuestions)}</span>
          <span className="text-slate-500">/{totalQuestions}</span>
        </div>
      </div>
    </GlassPanel>
  );
}
