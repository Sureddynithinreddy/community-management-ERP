import React from 'react';
import { NON_FUNCTIONAL_REQUIREMENTS } from '../data/prdData';
import { ShieldCheck, UserCheck, WifiOff, Zap, Lock, TrendingUp, Languages, Award, CheckCircle2 } from 'lucide-react';

interface NonFunctionalSectionProps {
  isAccessibleMode: boolean;
  onToggleAccessibleMode: () => void;
}

export const NonFunctionalSection: React.FC<NonFunctionalSectionProps> = ({
  isAccessibleMode,
  onToggleAccessibleMode,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-indigo-400" />;
      case 'WifiOff': return <WifiOff className="w-6 h-6 text-amber-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-sky-400" />;
      case 'Lock': return <Lock className="w-6 h-6 text-emerald-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-cyan-400" />;
      case 'Languages': return <Languages className="w-6 h-6 text-purple-400" />;
      default: return <ShieldCheck className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <section id="non-functional" className="py-20 bg-slate-950/90 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase">
            <Lock className="w-3.5 h-3.5" />
            PRD Section 9 - Non-Functional Core
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for Reliability & Trust
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Essential architectural standards ensuring gate operations never stop, push notifications arrive instantly, and resident privacy remains fully protected.
          </p>
        </div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {NON_FUNCTIONAL_REQUIREMENTS.map((req) => (
            <div
              key={req.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-colors space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                {getIcon(req.icon)}
              </div>

              <h3 className="text-lg font-bold text-white">{req.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{req.description}</p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-emerald-300">{req.metric}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Senior Accessibility Interactive Banner */}
        <div className="glass-panel p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-950 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              Senior-Friendly UX Demonstration
            </div>
            <h3 className="text-2xl font-black text-white">
              Try Senior / High-Contrast Mode Right Now
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              According to PRD Requirement 9.1, the resident app must feature extra-large buttons, zero jargon, and high contrast for non-tech-savvy elderly residents.
            </p>
          </div>

          <button
            onClick={onToggleAccessibleMode}
            className={`px-6 py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all ${
              isAccessibleMode
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-slate-800 text-amber-400 hover:bg-slate-700 border border-amber-500/40'
            }`}
          >
            {isAccessibleMode ? '✓ Senior UX Mode Active' : 'Enable Senior UX Mode'}
          </button>
        </div>

      </div>
    </section>
  );
};
