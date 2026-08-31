import React, { useState } from 'react';
import { Check, Sparkles, Shield, Building2, HelpCircle } from 'lucide-react';

interface PricingSectionProps {
  onOpenDemo: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenDemo }) => {
  const [flatCount, setFlatCount] = useState<number>(200);

  const calculatedMonthlyPrice = Math.round(flatCount * 18);

  return (
    <section id="pricing" className="py-20 bg-slate-950/90 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase">
            <Building2 className="w-3.5 h-3.5" />
            Transparent RWA Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Simple Per-Flat Pricing
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            No hidden setup fees. Pay only for active flats in your society with full unlimited guard terminals & resident accounts.
          </p>
        </div>

        {/* Dynamic Pricing Estimator Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 max-w-3xl mx-auto text-center space-y-6 mb-16 shadow-2xl">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-300">
            Interactive Society Estimate
          </div>
          
          <div className="space-y-3 max-w-xl mx-auto">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-200">
              <span>Your Society Flat Count:</span>
              <span className="text-indigo-400 font-extrabold text-xl">{flatCount} Flats</span>
            </div>
            <input
              type="range"
              min={30}
              max={1500}
              step={10}
              value={flatCount}
              onChange={(e) => setFlatCount(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div className="pt-2">
            <div className="text-4xl sm:text-5xl font-black text-white">
              ₹ {calculatedMonthlyPrice.toLocaleString()} <span className="text-sm font-semibold text-slate-400">/ month</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              (Approx. ₹18 per flat / month for full ERP suite)
            </p>
          </div>

          <button
            onClick={onOpenDemo}
            className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-900/40 hover:scale-105 transition-transform"
          >
            Get Custom Formal Proposal for {flatCount} Flats
          </button>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Tier 1: Standalone */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Standalone Building</h3>
              <p className="text-xs text-slate-400">Ideal for small standalone buildings up to 50 flats.</p>
              <div className="text-3xl font-extrabold text-white">
                ₹ 15 <span className="text-xs font-normal text-slate-400">/ flat / mo</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Visitor Pre-approval & Real-time Call</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Automated Maintenance Billing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Photo Helpdesk Complaints</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Digital Notice Board</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenDemo}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700"
            >
              Start Free Trial
            </button>
          </div>

          {/* Tier 2: Gated Community (Featured) */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-indigo-500 bg-gradient-to-b from-indigo-950/30 to-slate-950 space-y-6 relative flex flex-col justify-between shadow-2xl">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 text-white font-bold text-[10px] uppercase tracking-wider shadow-md">
              Most Popular RWA Choice
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-xl font-bold text-white">Gated Community</h3>
              <p className="text-xs text-slate-400">For multi-tower gated societies (50 to 500 flats).</p>
              <div className="text-3xl font-extrabold text-white">
                ₹ 18 <span className="text-xs font-normal text-slate-400">/ flat / mo</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Everything in Standalone +</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Guard App Offline Mode & Patrol Scan</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>UPI Autopay & Late Fee Engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Amenity Slot Booking & Polls</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Helpdesk SLA Auto-Escalation</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenDemo}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-900/40"
            >
              Select Gated Community
            </button>
          </div>

          {/* Tier 3: Enterprise Township */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Enterprise Township</h3>
              <p className="text-xs text-slate-400">For mega townships & multi-society complexes (500+ flats).</p>
              <div className="text-3xl font-extrabold text-white">
                Custom <span className="text-xs font-normal text-slate-400">Tier Pricing</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Everything in Gated Community +</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Facial Recognition Gate Integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Utility Sub-metering (Water/Gas)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Multi-Admin Role Permission Matrix</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Dedicated Society Success Manager</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenDemo}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700"
            >
              Contact Enterprise Sales
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
