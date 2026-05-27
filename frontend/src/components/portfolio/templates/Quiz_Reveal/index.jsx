import React, { useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

import data from '../../../../data/dummy_data.json';
import { quizQuestions, sectionMeta } from './constants';
import ProgressTracker from './ProgressTracker';
import QuizCard from './QuizCard';
import RevealSection from './RevealSection';
import {
  About,
  Contact,
  Experience,
  Hero,
  Projects,
  Skills,
  Testimonials,
} from './sections';
import { safeArray } from './utils';

export default function QuizReveal() {
  const portfolio = data || {};
  const personal = portfolio.personal || {};
  const socials = portfolio.socials || {};
  const stats = portfolio.stats || {};
  const skills = safeArray(portfolio.skills);
  const projects = safeArray(portfolio.projects);
  const experience = safeArray(portfolio.experience);
  const testimonials = safeArray(portfolio.testimonials);

  const [unlockedCount, setUnlockedCount] = useState(1);
  const currentQuestionIndex = Math.min(unlockedCount - 1, quizQuestions.length);
  const isComplete = unlockedCount === sectionMeta.length;

  const unlockNext = () => {
    setUnlockedCount((count) => Math.min(count + 1, sectionMeta.length));
  };

  const resetQuest = () => {
    setUnlockedCount(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSectionContent = (sectionId) => {
    switch (sectionId) {
      case 'hero':
        return <Hero personal={personal} stats={stats} />;
      case 'about':
        return <About personal={personal} />;
      case 'skills':
        return <Skills skills={skills} />;
      case 'projects':
        return <Projects projects={projects} />;
      case 'experience':
        return <Experience experience={experience} />;
      case 'testimonials':
        return <Testimonials testimonials={testimonials} />;
      case 'contact':
        return <Contact personal={personal} socials={socials} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#030712] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-24 left-0 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <ProgressTracker
          unlockedCount={unlockedCount}
          activeQuestion={currentQuestionIndex}
          totalQuestions={quizQuestions.length}
        />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-start">
          <div className="space-y-8">
            {sectionMeta.map((section, index) => (
              <RevealSection
                key={section.id}
                id={section.id}
                title={section.title}
                icon={section.icon}
                index={index}
                unlocked={index < unlockedCount}
              >
                {renderSectionContent(section.id)}
              </RevealSection>
            ))}
          </div>

          <aside className="xl:sticky xl:top-36">
            <AnimatePresence mode="wait">
              <Motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 24, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -24, scale: 0.98 }}
                transition={{ duration: 0.35 }}
              >
                <QuizCard
                  question={quizQuestions[currentQuestionIndex]}
                  questionIndex={currentQuestionIndex}
                  totalQuestions={quizQuestions.length}
                  disabled={isComplete}
                  onCorrect={unlockNext}
                />
              </Motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={resetQuest}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-300/10"
            >
              <RotateCcw className="h-4 w-4" />
              Restart quest
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
