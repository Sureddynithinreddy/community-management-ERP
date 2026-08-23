import React, { useState } from 'react';
import { 
  ShieldCheck, Smartphone, LayoutDashboard, ArrowRight, TreePine, Sparkles, ChevronRight, Check
} from 'lucide-react';
import { ResidentPortal } from './components/ResidentPortal';
import { SecurityPortal } from './components/SecurityPortal';
import { AdminPortal } from './components/AdminPortal';

type ActivePortalView = 'gateway' | 'resident_portal' | 'guard_portal' | 'admin_portal';

export const App: React.FC = () => {
  // Navigation State
  const [activeView, setActiveView] = useState<ActivePortalView>('gateway');

  return (
    <div className="min-h-screen bg-[#F6F3EC] text-[#172D25] font-sans antialiased selection:bg-[#627636] selection:text-white flex flex-col justify-between relative overflow-x-hidden">
      
      {/* Background Ambient Glow Lights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[#9DBEB2]/30 via-[#E4EFEA]/40 to-[#627636]/20 blur-[140px] pointer-events-none rounded-full z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#1C352C]/5 blur-[120px] pointer-events-none rounded-full z-0" />

      <div className="relative z-10">
        {/* ========================================================================= */}
        {/* TOP HEADER - Rendered ONLY on Gateway View */}
        {/* ========================================================================= */}
        {activeView === 'gateway' && (
          <header className="bg-[#1C352C]/95 backdrop-blur-md text-white px-6 sm:px-12 py-5 shadow-xl border-b border-[#2A4C3F]">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              {/* Logo Badge */}
              <div 
                onClick={() => setActiveView('gateway')}
                className="flex items-center gap-3.5 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-[#F6F3EC] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <div className="w-4 h-4 rounded-full bg-[#1C352C]" />
                </div>
                <div>
                  <span className="serif-title text-2xl tracking-wide text-[#F6F3EC] block leading-none">
                    Green Haven
                  </span>
                  <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-[#9DBEB2] block mt-0.5">
                    Sanctuary ERP System
                  </span>
                </div>
              </div>

              {/* Direct Portal Jump Links */}
              <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm serif-title tracking-widest text-[#E4EFEA]">
                <button
                  onClick={() => setActiveView('resident_portal')}
                  className="hover:text-[#9DBEB2] transition-colors py-1 hover:border-b-2 border-[#627636]"
                >
                  1. RESIDENTS PORTAL
                </button>
                <button
                  onClick={() => setActiveView('guard_portal')}
                  className="hover:text-[#9DBEB2] transition-colors py-1 hover:border-b-2 border-[#627636]"
                >
                  2. SECURITY PORTAL
                </button>
                <button
                  onClick={() => setActiveView('admin_portal')}
                  className="hover:text-[#9DBEB2] transition-colors py-1 hover:border-b-2 border-[#627636]"
                >
                  3. ADMIN PORTAL
                </button>
              </nav>

              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#2A4C3F]/60 border border-[#9DBEB2]/30 text-xs font-bold text-[#9DBEB2]">
                <span className="w-2 h-2 rounded-full bg-[#627636] animate-pulse" />
                <span>3 PORTALS ONLINE</span>
              </div>

            </div>
          </header>
        )}

        {/* ========================================================================= */}
        {/* VIEW 1: GATEWAY LANDING HUB */}
        {/* ========================================================================= */}
        {activeView === 'gateway' && (
          <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-12">
            
            {/* ULTRA-MODERN HERO BANNER CARD */}
            <div className="modern-hero-card p-8 sm:p-14 text-[#172D25] shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Hero Details */}
              <div className="lg:col-span-6 space-y-6 z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C352C] text-[#F6F3EC] text-xs font-semibold tracking-wider uppercase shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#627636]" />
                  Gated Community Operating System
                </div>

                <h1 className="serif-title text-4xl sm:text-6xl text-[#172D25] leading-[1.08] tracking-wide">
                  Green Haven <br />
                  <span className="italic font-normal">Sanctuary</span>
                </h1>

                <p className="text-sm sm:text-base text-[#1C352C]/90 max-w-lg leading-relaxed font-medium">
                  Welcome to Green Haven ERP. Experience unified digital living across Residents, Security Guards, and Management Committee Officers.
                </p>

                {/* Hero Direct Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <button
                    onClick={() => setActiveView('resident_portal')}
                    className="px-6 py-3.5 bg-[#627636] hover:bg-[#52632B] text-white serif-title text-xs tracking-widest rounded-xl shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl"
                  >
                    1. RESIDENTS PORTAL
                  </button>

                  <button
                    onClick={() => setActiveView('guard_portal')}
                    className="px-6 py-3.5 bg-[#1C352C] hover:bg-[#12241D] text-[#F6F3EC] serif-title text-xs tracking-widest rounded-xl shadow-md transition-all transform hover:scale-105"
                  >
                    2. SECURITY PORTAL
                  </button>

                  <button
                    onClick={() => setActiveView('admin_portal')}
                    className="px-6 py-3.5 bg-[#627636] hover:bg-[#52632B] text-white serif-title text-xs tracking-widest rounded-xl shadow-md transition-all transform hover:scale-105"
                  >
                    3. ADMIN PORTAL
                  </button>
                </div>
              </div>

              {/* Right Greenhouse Graphic */}
              <div className="lg:col-span-6 flex justify-center items-center z-10">
                <div className="w-full max-w-md bg-[#F6F3EC]/50 p-6 rounded-3xl border border-[#1C352C]/20 backdrop-blur-md shadow-2xl">
                  <svg viewBox="0 0 500 320" className="w-full h-auto drop-shadow-lg">
                    <rect x="10" y="10" width="480" height="300" rx="16" fill="#C8DDD5" opacity="0.6" />
                    <line x1="20" y1="280" x2="480" y2="280" stroke="#172D25" strokeWidth="3" />
                    <path d="M 120 280 L 120 140 L 250 70 L 380 140 L 380 280 Z" fill="none" stroke="#FFFFFF" strokeWidth="4" />
                    <line x1="250" y1="70" x2="250" y2="280" stroke="#FFFFFF" strokeWidth="3" />
                    <line x1="120" y1="140" x2="380" y2="140" stroke="#FFFFFF" strokeWidth="3" />
                    <path d="M 210 280 L 210 180 Q 250 160 290 180 L 290 280" fill="#1C352C" opacity="0.18" stroke="#FFFFFF" strokeWidth="3" />
                    <path d="M 140 280 Q 130 200 170 170 Q 180 230 160 280 Z" fill="#1C352C" />
                    <path d="M 170 280 Q 200 190 240 180 Q 210 240 190 280 Z" fill="#627636" />
                    <path d="M 360 280 Q 370 190 320 160 Q 310 230 340 280 Z" fill="#1C352C" />
                    <path d="M 330 280 Q 290 180 260 190 Q 290 240 310 280 Z" fill="#627636" />
                    <polygon points="410,280 405,250 435,250 430,280" fill="#627636" />
                    <path d="M 420 250 Q 400 210 420 190 Q 440 210 420 250 Z" fill="#1C352C" />
                  </svg>
                </div>
              </div>

            </div>

            {/* THE 3 PORTAL CARDS - Modern Glassmorphism */}
            <div>
              <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
                <span className="text-xs font-bold text-[#627636] uppercase tracking-wider block">
                  Select System Entrance
                </span>
                <h2 className="serif-title text-3xl sm:text-4xl text-[#172D25] tracking-wide">
                  Choose Your Portal Access
                </h2>
                <p className="text-xs text-[#1C352C]/80 font-medium">
                  Each portal contains a full sidebar navigation for all features listed in your specification.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* 1. ADMIN PORTAL CARD */}
                <div className="modern-card p-8 space-y-6 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="w-13 h-13 rounded-2xl bg-[#1C352C] text-[#F6F3EC] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform p-3">
                      <LayoutDashboard className="w-6 h-6 text-[#9DBEB2]" />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#627636] block">
                        Management Hub
                      </span>
                      <h3 className="serif-title text-2xl text-[#172D25] mt-0.5">Admin Portal</h3>
                    </div>

                    <p className="text-xs text-[#1C352C]/90 leading-relaxed font-medium">
                      Manage guards, residents, view reports, analytics, visitor/incident/emergency mgmt, amenity/maintenance, billing & audit logs.
                    </p>

                    <div className="bg-[#F6F3EC] p-3 rounded-xl border border-[#DED8C8] text-[11px] font-mono text-[#172D25]">
                      🔑 Dummy: treasurer.rwa@greenhaven.org
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveView('admin_portal')}
                    className="w-full py-4 bg-[#627636] hover:bg-[#52632B] text-white serif-title text-xs tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform group-hover:scale-[1.02]"
                  >
                    <span>SIGN IN TO ADMIN PORTAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 2. RESIDENTS PORTAL CARD */}
                <div className="modern-card p-8 space-y-6 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="w-13 h-13 rounded-2xl bg-[#1C352C] text-[#F6F3EC] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform p-3">
                      <Smartphone className="w-6 h-6 text-[#9DBEB2]" />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#627636] block">
                        Resident Hub
                      </span>
                      <h3 className="serif-title text-2xl text-[#172D25] mt-0.5">Residents Portal</h3>
                    </div>

                    <p className="text-xs text-[#1C352C]/90 leading-relaxed font-medium">
                      Paying bills, approve visitors, raise complaints, book anything (court), view announcements and events.
                    </p>

                    <div className="bg-[#F6F3EC] p-3 rounded-xl border border-[#DED8C8] text-[11px] font-mono text-[#172D25]">
                      🔑 Dummy: ananya.a402@greenhaven.org
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveView('resident_portal')}
                    className="w-full py-4 bg-[#1C352C] hover:bg-[#12241D] text-white serif-title text-xs tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform group-hover:scale-[1.02]"
                  >
                    <span>SIGN IN TO RESIDENTS PORTAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 3. SECURITY PORTAL CARD */}
                <div className="modern-card p-8 space-y-6 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="w-13 h-13 rounded-2xl bg-[#1C352C] text-[#F6F3EC] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform p-3">
                      <ShieldCheck className="w-6 h-6 text-[#9DBEB2]" />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#627636] block">
                        Security Desk Hub
                      </span>
                      <h3 className="serif-title text-2xl text-[#172D25] mt-0.5">Security Portal</h3>
                    </div>

                    <p className="text-xs text-[#1C352C]/90 leading-relaxed font-medium">
                      Check in/out visitors, log deliveries, vehicle management, resident verification, emergency SOS, incident reporting, lost & found.
                    </p>

                    <div className="bg-[#F6F3EC] p-3 rounded-xl border border-[#DED8C8] text-[11px] font-mono text-[#172D25]">
                      🔑 Dummy: vikram.gate1@greenhaven.org
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveView('guard_portal')}
                    className="w-full py-4 bg-[#627636] hover:bg-[#52632B] text-white serif-title text-xs tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform group-hover:scale-[1.02]"
                  >
                    <span>SIGN IN TO SECURITY PORTAL</span>
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
        <footer className="bg-[#1C352C] text-[#F6F3EC] py-8 text-center text-xs serif-title tracking-wider border-t border-[#2A4C3F] mt-16">
          Green Haven Eco-Sanctuary • Gated Community 3-Portal System
        </footer>
      )}

    </div>
  );
};

export default App;
