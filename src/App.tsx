import React, { useState } from 'react';
import { 
  ShieldCheck, Smartphone, LayoutDashboard, ArrowRight, Sparkles, ChevronRight, Check,
  Building2, Users, Receipt, Shield, Package, Car, KeyRound, CheckCircle2,
  Lock, Eye, ArrowUpRight, Radio, Flame, Calendar, Wrench, Megaphone,
  UserCheck, AlertCircle, Compass, HelpCircle
} from 'lucide-react';
import { ResidentPortal } from './components/ResidentPortal';
import { SecurityPortal } from './components/SecurityPortal';
import { AdminPortal } from './components/AdminPortal';

type ActivePortalView = 'gateway' | 'resident_portal' | 'guard_portal' | 'admin_portal';

export const App: React.FC = () => {
  // Navigation State
  const [activeView, setActiveView] = useState<ActivePortalView>('gateway');

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans antialiased selection:bg-[#0F172A] selection:text-white flex flex-col justify-between relative overflow-x-hidden">
      
      {/* Background Ambient Subtle Gradients */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-indigo-100/40 via-slate-100/30 to-transparent blur-[120px] pointer-events-none rounded-full z-0" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-100/20 blur-[140px] pointer-events-none rounded-full z-0" />

      <div className="relative z-10">
        
        {/* ========================================================================= */}
        {/* TOP HEADER - Rendered ONLY on Gateway View */}
        {/* ========================================================================= */}
        {activeView === 'gateway' && (
          <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 sm:px-12 py-4 sticky top-0 z-30 shadow-xs">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              
              {/* Logo Badge */}
              <div 
                onClick={() => setActiveView('gateway')}
                className="flex items-center gap-3.5 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-950 p-0.5 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-xl">
                    <span>🏢</span>
                  </div>
                </div>
                <div>
                  <span className="font-black text-xl tracking-tight text-slate-900 block leading-none">
                    ASBL Springs
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block mt-0.5">
                    Pocharam • Enterprise Community ERP
                  </span>
                </div>
              </div>

              {/* Direct Portal Jump Links */}
              <nav className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-600">
                <button
                  onClick={() => setActiveView('resident_portal')}
                  className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  1. Residents Portal
                </button>
                <button
                  onClick={() => setActiveView('guard_portal')}
                  className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  2. Security Portal
                </button>
                <button
                  onClick={() => setActiveView('admin_portal')}
                  className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  3. Admin Portal
                </button>
              </nav>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] sm:text-xs font-bold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden sm:inline">3 Portals Online & Synced</span>
                <span className="sm:hidden">Online</span>
              </div>

            </div>
          </header>
        )}

        {/* ========================================================================= */}
        {/* VIEW 1: GATEWAY LANDING HUB */}
        {/* ========================================================================= */}
        {activeView === 'gateway' && (
          <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-12">
            
            {/* HERO BANNER CARD - Modern Light Theme */}
            <div className="bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/60 text-slate-900 p-8 sm:p-12 rounded-3xl border border-indigo-100 shadow-xs relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Subtle ambient light accents */}
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

              {/* Left Hero Details */}
              <div className="lg:col-span-7 space-y-6 z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200/80 text-indigo-700 text-xs font-bold tracking-wide shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Next-Generation Gated Community Operating System</span>
                </div>

                <h1 className="font-black text-4xl sm:text-6xl text-slate-900 leading-[1.08] tracking-tight">
                  ASBL Springs <br />
                  <span className="bg-gradient-to-r from-indigo-600 via-indigo-800 to-slate-900 bg-clip-text text-transparent">
                    Community ERP
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed font-medium">
                  Welcome to ASBL Springs ERP. Unified digital infrastructure connecting <strong>250 Luxury Residences</strong>, <strong>24/7 Gate Security</strong>, and the <strong>RWA Management Committee</strong>.
                </p>

                {/* Hero Direct Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveView('resident_portal')}
                    className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <Smartphone className="w-4 h-4 text-white" />
                    <span>1. Residents Portal</span>
                  </button>

                  <button
                    onClick={() => setActiveView('guard_portal')}
                    className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span>2. Security Portal</span>
                  </button>

                  <button
                    onClick={() => setActiveView('admin_portal')}
                    className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4 text-indigo-400" />
                    <span>3. Admin Portal</span>
                  </button>
                </div>
              </div>

              {/* Right Telemetry Box - Crisp Light Card */}
              <div className="lg:col-span-5 flex justify-center items-center z-10">
                <div className="w-full bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-indigo-100 shadow-xs space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="font-bold text-slate-800">Society Live Telemetry</span>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2.5 py-0.5 rounded-full text-[10px]">Real-Time Active</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Community Scale</span>
                      <span className="font-black text-lg text-slate-900">250 Flats</span>
                      <span className="text-[10px] text-slate-500 block">740 Residents</span>
                    </div>

                    <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Security On Duty</span>
                      <span className="font-black text-lg text-emerald-700">8 Guards</span>
                      <span className="text-[10px] text-slate-500 block">Gate 1 & Gate 2</span>
                    </div>

                    <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">August Dues</span>
                      <span className="font-black text-lg text-indigo-700">₹ 14.8 L</span>
                      <span className="text-[10px] text-slate-500 block">92% Collected</span>
                    </div>

                    <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">ANPR AI Camera</span>
                      <span className="font-black text-lg text-slate-900">100% OCR</span>
                      <span className="text-[10px] text-slate-500 block">Boom Automated</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* THE 3 PORTAL CARDS - Modern Desktop ERP Gateway */}
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block">
                  Select User Gateway
                </span>
                <h2 className="font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                  Choose Your Dedicated Portal
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Experience seamless pair programming and community management across all three integrated systems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. RESIDENTS PORTAL CARD */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-6 group">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <Smartphone className="w-7 h-7" />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block">
                        Resident Living Suite
                      </span>
                      <h3 className="font-black text-2xl text-slate-900 mt-0.5">Residents Portal</h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Pay maintenance bills, approve Blinkit/Swiggy deliveries & cabs, raise complaints, book amenities, browse 13 helper categories, view notices, and manage your resident profile.
                    </p>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Demo Profile:</span>
                        <span className="font-bold text-slate-900">Ananya Sharma (Flat B-108)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Fast Passcode:</span>
                        <span className="font-mono font-bold text-indigo-600">OTP 892-104</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveView('resident_portal')}
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform group-hover:scale-[1.02]"
                  >
                    <span>LAUNCH RESIDENTS PORTAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 2. SECURITY GUARD PORTAL CARD */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-6 group">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-7 h-7" />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 block">
                        Gate Control & Security Desk
                      </span>
                      <h3 className="font-black text-2xl text-slate-900 mt-0.5">Security Portal</h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Check-in/out visitors, print gate badges, ANPR AI license plate scanner, manage gate parcel lockers (including cold storage), resident verification, and emergency SOS dispatch.
                    </p>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Duty Officer:</span>
                        <span className="font-bold text-slate-900">Guard Vikram Singh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Barrier Station:</span>
                        <span className="font-bold text-emerald-700">Gate 1 Main Boom</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveView('guard_portal')}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform group-hover:scale-[1.02]"
                  >
                    <span>LAUNCH SECURITY PORTAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 3. ADMIN MANAGEMENT COMMITTEE PORTAL CARD */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-6 group">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <Building2 className="w-7 h-7" />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block">
                        Management Committee Hub
                      </span>
                      <h3 className="font-black text-2xl text-slate-900 mt-0.5">Admin Portal</h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Manage 8 security guards & shift rosters, resident flat directory, automated monthly billing engine, push society notices, approve banquet bookings, and monitor AMC assets.
                    </p>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Council Officer:</span>
                        <span className="font-bold text-slate-900">Ramesh Chandra (President)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Governance:</span>
                        <span className="font-bold text-indigo-700">RWA Committee 2025-27</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveView('admin_portal')}
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform group-hover:scale-[1.02]"
                  >
                    <span>LAUNCH ADMIN PORTAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </main>
        )}

        {/* ========================================================================= */}
        {/* DEDICATED PORTAL VIEWS */}
        {/* ========================================================================= */}
        {activeView === 'admin_portal' && (
          <AdminPortal onExit={() => setActiveView('gateway')} />
        )}

        {activeView === 'resident_portal' && (
          <ResidentPortal onExit={() => setActiveView('gateway')} />
        )}

        {activeView === 'guard_portal' && (
          <SecurityPortal onExit={() => setActiveView('gateway')} />
        )}

      </div>

      {/* FOOTER */}
      {activeView === 'gateway' && (
        <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 font-medium mt-16">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>ASBL Springs, Pocharam • Integrated Gated Community ERP Operating System</span>
            <span className="font-mono text-slate-400">Version 3.4.0 • Enterprise Cloud Synced ✓</span>
          </div>
        </footer>
      )}

    </div>
  );
};

export default App;
