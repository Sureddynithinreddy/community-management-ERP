import React from 'react';
import { Layers, CheckCircle2, Clock, Sparkles, XCircle, ArrowRight } from 'lucide-react';

export const RoadmapPhaseSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase">
            <Layers className="w-3.5 h-3.5" />
            PRD Section 11 - Structured Build Order
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Phased Product Roadmap
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Sensible release ordering prioritizing core gate trust and maintenance billing first, followed by growth and advanced AI differentiators.
          </p>
        </div>

        {/* 3-Phase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Phase 1 */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-950 space-y-6 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Phase 1 (v1 Core)
                </span>
                <h3 className="text-xl font-extrabold text-white">Must-Have Essentials</h3>
              </div>
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/40">
                1
              </span>
            </div>

            <p className="text-xs text-slate-300">
              The core foundation. Makes the app immediately worth adopting for any society.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Visitor Pre-approval & Real-time Approval</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Delivery "Leave at Gate" & Photo Log</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Domestic Staff QR Attendance & Emergency SOS</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated Maintenance Billing & UPI Payments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Late Fee Interest Engine & GST Invoices</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Photo Complaint Tickets & Digital Notice Board</span>
              </li>
            </ul>
          </div>

          {/* Phase 2 */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/20 to-slate-950 space-y-6 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                  Phase 2 (v1.5 Growth)
                </span>
                <h3 className="text-xl font-extrabold text-white">Should-Have Features</h3>
              </div>
              <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-sm border border-indigo-500/40">
                2
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Expected by competitive societies to scale management efficiency.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Amenity Booking Live Slot Calendar</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Helpdesk SLA Timers & Auto-escalation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Guard App Offline Mode Sync Engine</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Guard Patrol Round QR Checkpoints</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Resident Voting Polls & Opt-in Directory</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Financial Transparency & Document Vault</span>
              </li>
            </ul>
          </div>

          {/* Phase 3 */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-950/20 to-slate-950 space-y-6 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block">
                  Phase 3 (v2.0 Differentiators)
                </span>
                <h3 className="text-xl font-extrabold text-white">Nice-to-Have Features</h3>
              </div>
              <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-sm border border-purple-500/40">
                3
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Advanced differentiators for large townships and smart societies.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Facial Recognition Gate Entry Camera</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Asset & Equipment Inventory Schedules</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Piped Gas & Water Utility Sub-metering</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>AGM Legal Event Vault & Resolutions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Resident Classifieds & Marketplace</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Committee Handover Transition Tools</span>
              </li>
            </ul>
          </div>

        </div>

        {/* PRD Section 10: Out of Scope for v1 Callout */}
        <div className="glass-panel p-6 rounded-2xl border border-red-500/20 bg-slate-900/60 max-w-4xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-red-400 font-extrabold text-sm uppercase tracking-wider">
            <XCircle className="w-5 h-5" />
            PRD Section 10 - Explicitly Out of Scope for v1
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            To ensure core stability and avoid bloat in v1, the following are strictly excluded:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>No in-app advertising or third-brand marketplaces</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>No drone delivery or hyper-local e-commerce integrations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>No full HR/payroll suite beyond basic staff log</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>No per-society white-labeling (consistent v1 experience)</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
