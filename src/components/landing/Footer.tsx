import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-900 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base text-white">GatePulse ERP</span>
              <p className="text-[11px] text-slate-500">All-in-One Gated Community & Society Operating System</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-slate-400 font-medium">
            <a href="#simulator" className="hover:text-indigo-400 transition-colors">Live Simulator</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">30+ PRD Features</a>
            <a href="#roi-calculator" className="hover:text-indigo-400 transition-colors">ROI Calculator</a>
            <a href="#non-functional" className="hover:text-indigo-400 transition-colors">Gate Reliability</a>
            <a href="#roadmap" className="hover:text-indigo-400 transition-colors">Build Order Roadmap</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Plans & Pricing</a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>© 2026 GatePulse ERP. Built strictly according to Product Requirement Document (PRD) Specifications.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Crafted with precision for RWAs & Housing Societies</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
