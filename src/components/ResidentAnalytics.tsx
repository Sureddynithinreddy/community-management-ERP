import React, { useState } from 'react';
import { 
  TrendingUp, CreditCard, ShieldCheck, Wrench, Calendar, 
  ArrowUpRight, ArrowDownRight, CheckCircle2, Droplets, Clock, Package, Star
} from 'lucide-react';

export const ResidentAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center border-b border-[#DED8C8] pb-4">
        <div>
          <div className="serif-title text-3xl text-[#172D25]">My Personal Resident Telemetry</div>
          <p className="text-xs text-slate-600 mt-0.5">Flat A-402 • Personal Dues, Water Usage & Visitor Stats</p>
        </div>
        <span className="text-xs font-bold text-[#627636] bg-[#9DBEB2]/30 px-3.5 py-1 rounded-full border border-[#86A79B]">
          August 2026 Telemetry
        </span>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="modern-card p-6 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Average Monthly Bill</span>
          <div className="serif-title text-3xl text-[#172D25]">₹ 4,766</div>
          <span className="text-[11px] text-[#627636] font-bold block">✓ Paid via UPI Autopay</span>
        </div>

        <div className="modern-card p-6 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Daily Piped Water Usage</span>
          <div className="serif-title text-3xl text-[#1C352C]">320 L / Day</div>
          <span className="text-[11px] text-[#627636] font-bold block">Sub-meter Charge: ₹400</span>
        </div>

        <div className="modern-card p-6 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Deliveries Received</span>
          <div className="serif-title text-3xl text-[#627636]">28 Parcels</div>
          <span className="text-[11px] text-slate-600 block">Amazon (16), Swiggy (8), Zomato (4)</span>
        </div>

        <div className="modern-card p-6 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Helpdesk SLA Speed</span>
          <div className="serif-title text-3xl text-[#627636]">1h 20m</div>
          <span className="text-[11px] text-slate-600 block">3 Tickets Resolved (4.9 ⭐ Given)</span>
        </div>
      </div>

      {/* Water & Dues Monthly Trajectory */}
      <div className="modern-card p-6 sm:p-8 space-y-4">
        <h3 className="serif-title text-xl text-[#172D25]">6-Month Maintenance Spending Trajectory</h3>
        <div className="grid grid-cols-6 gap-2 text-center text-xs">
          {[
            { month: 'Mar', amount: '₹4,500', status: 'Paid' },
            { month: 'Apr', amount: '₹4,500', status: 'Paid' },
            { month: 'May', amount: '₹4,500', status: 'Paid' },
            { month: 'Jun', amount: '₹4,766', status: 'Paid' },
            { month: 'Jul', amount: '₹4,766', status: 'Paid' },
            { month: 'Aug', amount: '₹4,766', status: 'Paid' },
          ].map((m) => (
            <div key={m.month} className="bg-[#F6F3EC] p-3 rounded-xl border border-[#DED8C8] space-y-1">
              <span className="font-bold text-slate-500 block">{m.month}</span>
              <span className="font-bold text-[#172D25] block">{m.amount}</span>
              <span className="text-[10px] text-[#627636] font-bold block">✓ {m.status}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
