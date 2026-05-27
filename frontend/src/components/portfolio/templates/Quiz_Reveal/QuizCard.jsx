import React, { useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Check, ChevronRight, Play, ShieldCheck } from 'lucide-react';

import { sectionMeta } from './constants';
import { GlassPanel } from './ui';

export default function QuizCard({ question, questionIndex, totalQuestions, disabled, onCorrect }) {
  const [selected, setSelected] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const chooseAnswer = (option) => {
    if (disabled || isCorrect === true) return;

    const correct = option === question.answer;
    setSelected(option);
    setIsCorrect(correct);

    if (correct) {
      setTimeout(() => {
        onCorrect();
        setSelected('');
        setIsCorrect(null);
      }, 650);
    }
  };

  if (!question) {
    return (
      <GlassPanel className="overflow-hidden p-6">
        <div className="flex items-center gap-3 text-emerald-200">
          <ShieldCheck className="h-6 w-6" />
          <div>
            <h3 className="text-xl font-bold text-white">Portfolio fully unlocked</h3>
            <p className="text-sm text-slate-400">Every section is now available to explore.</p>
          </div>
        </div>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="overflow-hidden">
      <div className="border-b border-white/10 bg-gradient-to-r from-cyan-400/10 via-fuchsia-400/10 to-emerald-400/10 p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">
            <Play className="h-3.5 w-3.5" />
            Unlock Round {questionIndex + 1}
          </div>
          <div className="text-xs font-semibold text-slate-400">
            {questionIndex + 1}/{totalQuestions}
          </div>
        </div>
        <h2 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-3xl">
          {question.question}
        </h2>
      </div>

      <div className="grid gap-3 p-5 sm:grid-cols-2">
        {question.options.map((option) => {
          const isSelected = selected === option;
          const showCorrect = isSelected && isCorrect === true;
          const showWrong = isSelected && isCorrect === false;

          return (
            <Motion.button
              key={option}
              type="button"
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => chooseAnswer(option)}
              className={`group flex min-h-16 items-center justify-between rounded-2xl border p-4 text-left text-sm font-semibold transition ${
                showCorrect
                  ? 'border-emerald-300/70 bg-emerald-400/20 text-emerald-50 shadow-lg shadow-emerald-500/20'
                  : showWrong
                    ? 'border-rose-300/60 bg-rose-400/15 text-rose-100'
                    : 'border-white/10 bg-slate-950/70 text-slate-200 hover:border-cyan-300/50 hover:bg-cyan-300/10'
              }`}
            >
              <span>{option}</span>
              {showCorrect ? (
                <Check className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5 text-slate-500 transition group-hover:text-cyan-200" />
              )}
            </Motion.button>
          );
        })}
      </div>

      <div className="border-t border-white/10 px-5 py-4 text-sm">
        <AnimatePresence mode="wait">
          {isCorrect === false && (
            <Motion.p
              key="wrong"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-rose-200"
            >
              Not quite. Try another answer to open the next portfolio module.
            </Motion.p>
          )}
          {isCorrect === true && (
            <Motion.p
              key="correct"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-emerald-200"
            >
              Correct. Access granted.
            </Motion.p>
          )}
          {isCorrect === null && (
            <Motion.p
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-slate-400"
            >
              Choose the best answer to reveal {sectionMeta[questionIndex + 1]?.title || 'the next section'}.
            </Motion.p>
          )}
        </AnimatePresence>
      </div>
    </GlassPanel>
  );
}
