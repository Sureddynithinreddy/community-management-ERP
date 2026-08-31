import React, { useState } from 'react';
import { ShieldCheck, Building2, Smartphone, LayoutDashboard, Calculator, Menu, X, Sparkles, Accessibility } from 'lucide-react';

interface NavbarProps {
  onOpenDemo: () => void;
  isAccessibleMode: boolean;
  onToggleAccessibleMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDemo,
  isAccessibleMode,
  onToggleAccessibleMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-indigo-400 group-hover:text-emerald-400 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                GatePulse
              </span>
              <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-0.5 rounded-full font-semibold border border-indigo-500/30">
                ERP
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">Society Operating System</p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-slate-300">
          <a href="#simulator" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5 py-1">
            <Smartphone className="w-4 h-4 text-indigo-400" />
            Live Simulator
          </a>
          <a href="#features" className="hover:text-indigo-400 transition-colors py-1">
            PRD Features (30+)
          </a>
          <a href="#roi-calculator" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5 py-1">
            <Calculator className="w-4 h-4 text-emerald-400" />
            Society Calculator
          </a>
          <a href="#non-functional" className="hover:text-indigo-400 transition-colors py-1">
            Gate Resilience & Security
          </a>
          <a href="#roadmap" className="hover:text-indigo-400 transition-colors py-1">
            Build Roadmap
          </a>
          <a href="#pricing" className="hover:text-indigo-400 transition-colors py-1">
            Plans
          </a>
        </nav>

        {/* Desktop CTA & Controls */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Senior UX Toggle */}
          <button
            onClick={onToggleAccessibleMode}
            title="Toggle Senior / High-Contrast Mode (PRD Requirement 9)"
            className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-all ${
              isAccessibleMode
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Accessibility className="w-4 h-4" />
            <span>{isAccessibleMode ? 'Senior UX ON' : 'Senior UX Mode'}</span>
          </button>

          {/* Request Demo Button */}
          <button
            onClick={onOpenDemo}
            className="relative group overflow-hidden rounded-xl font-semibold text-sm px-5 py-2.5 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Request Society Demo
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={onToggleAccessibleMode}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-amber-400"
          >
            <Accessibility className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-slate-800 px-4 py-6 space-y-4 text-slate-200">
          <a
            href="#simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium hover:text-indigo-400"
          >
            Live App Simulator
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium hover:text-indigo-400"
          >
            PRD Feature Directory (30+)
          </a>
          <a
            href="#roi-calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium hover:text-indigo-400"
          >
            Society ROI Calculator
          </a>
          <a
            href="#non-functional"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium hover:text-indigo-400"
          >
            Gate Reliability & Security
          </a>
          <a
            href="#roadmap"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium hover:text-indigo-400"
          >
            Build Order Roadmap
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium hover:text-indigo-400"
          >
            Society Pricing
          </a>
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full text-center py-3 bg-gradient-to-r from-indigo-500 to-emerald-400 font-bold rounded-xl text-white shadow-md"
            >
              Request Demo for Your Society
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
