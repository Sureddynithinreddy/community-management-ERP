import React from 'react';
import { Smartphone, ShieldCheck, LayoutDashboard, ArrowRight, Zap, CheckCircle2, Award, Clock, Users } from 'lucide-react';

interface HeroProps {
  onOpenDemo: () => void;
  onSelectSurface: (surface: 'Resident' | 'Guard' | 'Admin') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo, onSelectSurface }) => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-sky-500/15 to-emerald-500/20 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-light border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase shadow-md shadow-indigo-900/20">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            All-in-One Gated Community RWA ERP Prototype
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            One Operating System for <br />
            <span className="gradient-text">Residents, Security & Committee</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Eliminate gate bottlenecks, automate maintenance billing, resolve complaints with SLA tracking, and empower your RWA committee with audit-ready financial ledgers.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#simulator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-500 text-white font-bold text-base shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] transition-all duration-200"
            >
              <Zap className="w-5 h-5 text-amber-300" />
              Launch Live App Simulator
            </a>

            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700 hover:border-slate-600 transition-all"
            >
              Request Custom Demo
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Quick Surface Jump Selector */}
          <div className="pt-8">
            <p className="text-xs uppercase tracking-widest font-semibold text-slate-400 mb-4">
              Explore Live Prototype Across 3 Surfaces
            </p>
            <div className="inline-flex flex-wrap justify-center gap-3 p-1.5 rounded-2xl glass-panel border border-slate-800">
              <button
                onClick={() => {
                  onSelectSurface('Resident');
                  document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-200 border border-indigo-500/30 font-medium text-sm transition-all"
              >
                <Smartphone className="w-4 h-4 text-indigo-400" />
                1. Resident App Surface
              </button>

              <button
                onClick={() => {
                  onSelectSurface('Guard');
                  document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-200 border border-emerald-500/30 font-medium text-sm transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                2. Guard Gate Terminal
              </button>

              <button
                onClick={() => {
                  onSelectSurface('Admin');
                  document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-200 border border-amber-500/30 font-medium text-sm transition-all"
              >
                <LayoutDashboard className="w-4 h-4 text-amber-400" />
                3. Admin Web Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Highlight Key PRD Metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 text-center hover:border-indigo-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-white">&lt; 2.0 Seconds</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Gate Approval Push Speed</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 text-center hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-white">100% Audit-Ready</div>
            <div className="text-xs text-slate-400 font-medium mt-1">GST & CA Balance Sheets</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 text-center hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-white">0 Min Gate Stoppage</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Offline Guard Sync Mode</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 text-center hover:border-sky-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto mb-3">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-white">35+ Hours Saved</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Monthly Treasurer Workload</div>
          </div>
        </div>

      </div>
    </section>
  );
};
