import React from 'react';
import { 
  ShieldCheck, UserCheck, Package, Car, Flame, Clock, 
  CheckCircle2, AlertTriangle, Wifi, BarChart3, Activity
} from 'lucide-react';

export const SecurityAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center border-b border-[#DED8C8] pb-4">
        <div>
          <div className="serif-title text-3xl text-[#172D25]">Gate 1 Security Operations Telemetry</div>
          <p className="text-xs text-slate-600 mt-0.5">Real-time gate footfall, ANPR scanner, and QR patrol stats</p>
        </div>
        <span className="text-xs font-bold text-[#627636] bg-[#9DBEB2]/30 px-3.5 py-1 rounded-full border border-[#86A79B]">
          Gate Terminal #01 Live
        </span>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="modern-card p-6 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Today Gate Visitors</span>
          <div className="serif-title text-3xl text-[#172D25]">342</div>
          <span className="text-[11px] text-[#627636] font-bold block">182 Pre-Approved OTP Passes</span>
        </div>

        <div className="modern-card p-6 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Gate Shelf Parcel Storage</span>
          <div className="serif-title text-3xl text-[#627636]">14 Active</div>
          <span className="text-[11px] text-slate-600 block">Avg Dwell Time: 2.4 Hours</span>
        </div>

        <div className="modern-card p-6 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Patrol Round Compliance</span>
          <div className="serif-title text-3xl text-[#1C352C]">100%</div>
          <span className="text-[11px] text-[#627636] font-bold block">12 Checkpoints Scanned/Round</span>
        </div>

        <div className="modern-card p-6 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Avg SOS Response Time</span>
          <div className="serif-title text-3xl text-[#627636]">2m 14s</div>
          <span className="text-[11px] text-slate-600 block">Dispatch Guard to Flat Speed</span>
        </div>
      </div>

      {/* Gate Peak Traffic Volume Breakdown */}
      <div className="modern-card p-6 sm:p-8 space-y-4">
        <h3 className="serif-title text-xl text-[#172D25]">Gate 1 Hourly Traffic & Delivery Volume</h3>
        <div className="space-y-3 text-xs font-bold">
          <div>
            <div className="flex justify-between mb-1 text-slate-800">
              <span>Morning Peak (08:00 AM - 10:30 AM) • Staff & Delivery</span>
              <span>142 Entries (41.5%)</span>
            </div>
            <div className="w-full bg-[#DED8C8] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#627636] h-full w-[41.5%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1 text-slate-800">
              <span>Afternoon (11:00 AM - 04:00 PM) • Guests & Courier</span>
              <span>90 Entries (26.3%)</span>
            </div>
            <div className="w-full bg-[#DED8C8] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#1C352C] h-full w-[26.3%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1 text-slate-800">
              <span>Evening Peak (05:00 PM - 08:00 PM) • Resident Cars & Food</span>
              <span>110 Entries (32.2%)</span>
            </div>
            <div className="w-full bg-[#DED8C8] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#627636] h-full w-[32.2%]" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
