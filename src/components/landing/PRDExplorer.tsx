import React, { useState, useMemo } from 'react';
import { PRD_FEATURES, PRD_MODULES } from '../../data/prdData';
import { PRDFeature, PriorityLevel, SurfaceType } from '../../types/prd';
import { Search, Filter, ShieldCheck, Receipt, Wrench, Megaphone, Building2, LayoutDashboard, ChevronRight, CheckCircle2, Star, Sparkles, Layers } from 'lucide-react';

export const PRDExplorer: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedSurface, setSelectedSurface] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalFeature, setActiveModalFeature] = useState<PRDFeature | null>(null);

  const filteredFeatures = useMemo(() => {
    return PRD_FEATURES.filter((feature) => {
      if (selectedModule !== 'all' && feature.moduleId !== selectedModule) return false;
      if (selectedPriority !== 'all' && feature.priority !== selectedPriority) return false;
      if (selectedSurface !== 'all' && feature.surface !== selectedSurface && feature.surface !== 'All') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          feature.title.toLowerCase().includes(q) ||
          feature.whatItIs.toLowerCase().includes(q) ||
          feature.whyItMatters.toLowerCase().includes(q) ||
          feature.howItWorks.toLowerCase().includes(q) ||
          feature.tags.some(t => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedModule, selectedPriority, selectedSurface, searchQuery]);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Receipt': return <Receipt className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      case 'Megaphone': return <Megaphone className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'LayoutDashboard': return <LayoutDashboard className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <section id="features" className="py-20 bg-slate-950/80 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase">
            <Layers className="w-3.5 h-3.5" />
            Complete Feature Specification
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            PRD Feature Directory & Specs
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Every feature specified in the PRD, categorized by priority build phase, target user surface, and operational rationale.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6 mb-10 shadow-2xl">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search features (e.g. 'panic button', 'late fee', 'offline', 'GST', 'amenity')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 text-slate-100 pl-12 pr-4 py-3.5 rounded-xl border border-slate-700 focus:border-indigo-500 focus:outline-none text-sm placeholder:text-slate-500 shadow-inner"
            />
          </div>

          {/* Module Filter Pills */}
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-indigo-400" />
              Filter by PRD Module:
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedModule('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedModule === 'all'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                All Modules ({PRD_FEATURES.length})
              </button>

              {PRD_MODULES.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModule(mod.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedModule === mod.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {getModuleIcon(mod.iconName)}
                  <span>{mod.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Priority & Surface Secondary Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
            <div>
              <span className="text-xs text-slate-400 font-medium block mb-2">Build Priority:</span>
              <div className="flex flex-wrap gap-2">
                {['all', 'Must-have', 'Should-have', 'Nice-to-have'].map((pri) => (
                  <button
                    key={pri}
                    onClick={() => setSelectedPriority(pri)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      selectedPriority === pri
                        ? 'bg-slate-800 text-white border-indigo-500/50'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {pri === 'all' ? 'All Priorities' : pri}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-medium block mb-2">Target Surface:</span>
              <div className="flex flex-wrap gap-2">
                {['all', 'Resident', 'Guard', 'Admin'].map((surf) => (
                  <button
                    key={surf}
                    onClick={() => setSelectedSurface(surf)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      selectedSurface === surf
                        ? 'bg-slate-800 text-white border-indigo-500/50'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {surf === 'all' ? 'All Surfaces' : `${surf} Surface`}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature) => (
            <div
              key={feature.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header Pills */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-md border ${
                    feature.priority === 'Must-have'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : feature.priority === 'Should-have'
                      ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                      : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                  }`}>
                    {feature.priority}
                  </span>

                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {feature.surface} Surface
                  </span>
                </div>

                {/* Feature Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                  {feature.title}
                </h3>

                {/* What it is */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  <strong className="text-slate-200">What it is:</strong> {feature.whatItIs}
                </p>

                {/* Why it matters */}
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 mb-4 text-xs space-y-1">
                  <span className="text-indigo-300 font-semibold block">Why it matters to society:</span>
                  <p className="text-slate-400 leading-relaxed">{feature.whyItMatters}</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setActiveModalFeature(feature)}
                className="w-full mt-2 py-2.5 px-4 bg-slate-900 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-200 font-semibold text-xs rounded-xl border border-slate-800 hover:border-indigo-500/40 transition-all flex items-center justify-center gap-1.5"
              >
                <span>View How It Works in Practice</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {filteredFeatures.length === 0 && (
          <div className="text-center py-16 text-slate-400 bg-slate-900/50 rounded-2xl border border-slate-800">
            <p className="text-base font-semibold">No features match your current filter selection.</p>
            <button
              onClick={() => {
                setSelectedModule('all');
                setSelectedPriority('all');
                setSelectedSurface('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-indigo-400 underline font-bold"
            >
              Reset all filters
            </button>
          </div>
        )}

      </div>

      {/* Feature Detail Modal */}
      {activeModalFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {activeModalFeature.priority}
                  </span>
                  <span className="text-xs text-slate-400">
                    {activeModalFeature.phase}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white">{activeModalFeature.title}</h3>
              </div>
              <button
                onClick={() => setActiveModalFeature(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-white text-xs uppercase tracking-wider block text-indigo-400">
                  What It Is
                </span>
                <p>{activeModalFeature.whatItIs}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-white text-xs uppercase tracking-wider block text-emerald-400">
                  Why It Matters to the Society
                </span>
                <p>{activeModalFeature.whyItMatters}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-white text-xs uppercase tracking-wider block text-amber-400">
                  How It Works in Practice
                </span>
                <p className="leading-relaxed">{activeModalFeature.howItWorks}</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <div className="flex flex-wrap gap-1.5">
                {activeModalFeature.tags.map((t) => (
                  <span key={t} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setActiveModalFeature(null)}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                Close Spec
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
