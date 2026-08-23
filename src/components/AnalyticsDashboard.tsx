import React, { useState } from 'react';
import { 
  TrendingUp, DollarSign, Users, ShieldCheck, Wrench, Calendar, 
  ArrowUpRight, ArrowDownRight, Filter, Download, PieChart, BarChart3, 
  Activity, Clock, CheckCircle2, AlertTriangle, Package, Zap, Award
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('month');
  const [activeCategory, setActiveCategory] = useState<'financial' | 'visitors' | 'helpdesk' | 'amenities' | 'patrol'>('financial');

  return (
    <div className="space-y-8">
      
      {/* Top Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DED8C8] pb-5">
        <div>
          <div className="serif-title text-3xl text-[#172D25]">Executive Society Analytics & Statistics</div>
          <p className="text-xs text-slate-600 mt-1">Real-time telemetry across financial, security, helpdesk, and amenity operations</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
          <div className="bg-[#F6F3EC] p-1 rounded-xl border border-[#DED8C8] flex text-xs font-bold">
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeRange === 'month' ? 'bg-[#627636] text-white shadow' : 'text-slate-600 hover:text-[#172D25]'}`}
            >
              August 2026
            </button>
            <button
              onClick={() => setTimeRange('quarter')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeRange === 'quarter' ? 'bg-[#627636] text-white shadow' : 'text-slate-600 hover:text-[#172D25]'}`}
            >
              Q3 2026
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeRange === 'year' ? 'bg-[#627636] text-white shadow' : 'text-slate-600 hover:text-[#172D25]'}`}
            >
              FY 2026-27
            </button>
          </div>

          <button
            onClick={() => alert('Exporting Full Analytics Executive Summary (PDF & CSV)...')}
            className="px-4 py-2.5 bg-[#1C352C] hover:bg-[#12241D] text-white text-xs font-bold rounded-xl shadow flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Category Tab Selector */}
      <div className="flex flex-wrap gap-2 text-xs font-bold">
        {[
          { id: 'financial', label: '1. Financial & Dues Statistics', icon: DollarSign },
          { id: 'visitors', label: '2. Gate Traffic & Delivery Metrics', icon: ShieldCheck },
          { id: 'helpdesk', label: '3. Helpdesk & SLA Resolution', icon: Wrench },
          { id: 'amenities', label: '4. Amenity & Facility Usage', icon: Calendar },
          { id: 'patrol', label: '5. Guard Patrol & SOS Emergency', icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-[#627636] text-white shadow-md'
                  : 'bg-[#F6F3EC] text-slate-700 hover:bg-[#E4EFEA] border border-[#DED8C8]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* CATEGORY 1: FINANCIAL & DUES STATISTICS */}
      {/* =================================================================== */}
      {activeCategory === 'financial' && (
        <div className="space-y-6">
          
          {/* Top Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="modern-card p-6 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Monthly Demand</span>
              <div className="serif-title text-3xl text-[#172D25]">₹ 16,25,000</div>
              <span className="text-[11px] text-[#627636] font-bold flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> 250 Units Billed @ ₹3.50/sqft
              </span>
            </div>

            <div className="modern-card p-6 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Collected Amount</span>
              <div className="serif-title text-3xl text-[#627636]">₹ 14,36,500</div>
              <span className="text-[11px] text-[#627636] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 88.4% Collection Efficiency
              </span>
            </div>

            <div className="modern-card p-6 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Outstanding Dues</span>
              <div className="serif-title text-3xl text-amber-900">₹ 1,88,500</div>
              <span className="text-[11px] text-amber-800 font-bold block">29 Flats Overdue (Notice Pushed)</span>
            </div>

            <div className="modern-card p-6 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Sinking Reserve Fund</span>
              <div className="serif-title text-3xl text-[#1C352C]">₹ 42,50,000</div>
              <span className="text-[11px] text-slate-600 font-bold block">+₹1.25L Sinking Fund Added</span>
            </div>
          </div>

          {/* Payment Method Distribution Breakdown */}
          <div className="modern-card p-6 sm:p-8 space-y-6">
            <h3 className="serif-title text-xl text-[#172D25]">Payment Mode Telemetry Breakdown</h3>
            
            <div className="space-y-4 text-xs font-bold">
              <div>
                <div className="flex justify-between mb-1.5 text-slate-800">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#627636]" /> UPI Autopay Auto-Debit
                  </span>
                  <span>56.8% (₹ 8,15,932 • 142 Flats)</span>
                </div>
                <div className="w-full bg-[#DED8C8] h-3 rounded-full overflow-hidden">
                  <div className="bg-[#627636] h-full w-[56.8%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5 text-slate-800">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#1C352C]" /> Net Banking & IMPS
                  </span>
                  <span>24.2% (₹ 3,47,633 • 60 shadow flats)</span>
                </div>
                <div className="w-full bg-[#DED8C8] h-3 rounded-full overflow-hidden">
                  <div className="bg-[#1C352C] h-full w-[24.2%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5 text-slate-800">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-600" /> Credit / Debit Cards
                  </span>
                  <span>12.5% (₹ 1,79,562 • 31 flats)</span>
                </div>
                <div className="w-full bg-[#DED8C8] h-3 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full w-[12.5%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5 text-slate-800">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-500" /> Cheque / Manual Desk Collection
                  </span>
                  <span>6.5% (₹ 93,373 • 17 flats)</span>
                </div>
                <div className="w-full bg-[#DED8C8] h-3 rounded-full overflow-hidden">
                  <div className="bg-slate-500 h-full w-[6.5%]" />
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =================================================================== */}
      {/* CATEGORY 2: GATE TRAFFIC & DELIVERIES */}
      {/* =================================================================== */}
      {activeCategory === 'visitors' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="modern-card p-6 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">Avg Daily Visitor Volume</span>
              <span className="serif-title text-3xl text-[#172D25]">342</span>
              <span className="text-[10px] text-[#627636] font-bold block">Peak Traffic @ Gate 1</span>
            </div>
            <div className="modern-card p-6 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">Pre-Approved Guest Ratio</span>
              <span className="serif-title text-3xl text-[#627636]">53.2%</span>
              <span className="text-[10px] text-slate-600 font-bold block">182 Pre-Approved OTP Passes</span>
            </div>
            <div className="modern-card p-6 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">E-commerce Deliveries</span>
              <span className="serif-title text-3xl text-[#1C352C]">142</span>
              <span className="text-[10px] text-slate-600 font-bold block">Logged at Gate Shelf B-4</span>
            </div>
            <div className="modern-card p-6 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">Domestic Maid Attendance</span>
              <span className="serif-title text-3xl text-[#627636]">98.5%</span>
              <span className="text-[10px] text-slate-600 font-bold block">64 Registered Staff Checked-In</span>
            </div>
          </div>

          {/* Delivery Brand Market Share */}
          <div className="modern-card p-6 sm:p-8 space-y-4">
            <h3 className="serif-title text-xl text-[#172D25]">Delivery Agency Volume Distribution</h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs">
              <div className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] space-y-1">
                <span className="font-bold text-[#172D25] block">Amazon</span>
                <span className="serif-title text-2xl text-[#627636]">42%</span>
                <span className="text-[10px] text-slate-500 block">60 Parcels/day</span>
              </div>
              <div className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] space-y-1">
                <span className="font-bold text-[#172D25] block">Swiggy</span>
                <span className="serif-title text-2xl text-[#1C352C]">28%</span>
                <span className="text-[10px] text-slate-500 block">40 Deliveries/day</span>
              </div>
              <div className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] space-y-1">
                <span className="font-bold text-[#172D25] block">Zomato</span>
                <span className="serif-title text-2xl text-[#627636]">18%</span>
                <span className="text-[10px] text-slate-500 block">25 Orders/day</span>
              </div>
              <div className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] space-y-1">
                <span className="font-bold text-[#172D25] block">Flipkart</span>
                <span className="serif-title text-2xl text-slate-700">8%</span>
                <span className="text-[10px] text-slate-500 block">11 Parcels/day</span>
              </div>
              <div className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] space-y-1">
                <span className="font-bold text-[#172D25] block">Blinkit / Dunzo</span>
                <span className="serif-title text-2xl text-slate-700">4%</span>
                <span className="text-[10px] text-slate-500 block">6 Orders/day</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CATEGORY 3: HELPDESK & SLA RESOLUTION */}
      {/* =================================================================== */}
      {activeCategory === 'helpdesk' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="modern-card p-6 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">Avg First Response Time</span>
              <span className="serif-title text-3xl text-[#627636]">14 Mins</span>
              <span className="text-[10px] text-slate-600 block">Target SLA: &lt; 30 Mins</span>
            </div>
            <div className="modern-card p-6 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">Avg Resolution Speed</span>
              <span className="serif-title text-3xl text-[#1C352C]">1h 15m</span>
              <span className="text-[10px] text-[#627636] font-bold block">94.2% On-time SLA Compliance</span>
            </div>
            <div className="modern-card p-6 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">Resident Satisfaction Score</span>
              <span className="serif-title text-3xl text-[#627636]">4.8 / 5.0 ⭐</span>
              <span className="text-[10px] text-slate-600 block">Based on 142 Rating Reviews</span>
            </div>
          </div>

          {/* Technician Performance Leaderboard */}
          <div className="modern-card p-6 sm:p-8 space-y-4">
            <h3 className="serif-title text-xl text-[#172D25]">Facility Staff Workload & Leaderboard</h3>
            <div className="space-y-3 text-xs">
              <div className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#627636] text-white font-bold flex items-center justify-center">1</div>
                  <div>
                    <div className="font-bold text-[#172D25]">Ramesh Kumar (Plumber)</div>
                    <div className="text-slate-600">42 Tickets Resolved • Avg Speed: 45 Mins</div>
                  </div>
                </div>
                <span className="bg-[#627636] text-white px-3 py-1 rounded-full font-bold text-[10px]">4.9 ⭐ Master Tech</span>
              </div>

              <div className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1C352C] text-white font-bold flex items-center justify-center">2</div>
                  <div>
                    <div className="font-bold text-[#172D25]">Suresh Electrician</div>
                    <div className="text-slate-600">38 Tickets Resolved • Avg Speed: 35 Mins</div>
                  </div>
                </div>
                <span className="bg-[#1C352C] text-white px-3 py-1 rounded-full font-bold text-[10px]">4.8 ⭐ Master Tech</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CATEGORY 4: AMENITIES & FACILITIES */}
      {/* =================================================================== */}
      {activeCategory === 'amenities' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="modern-card p-6 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">Tennis Court 1 Utilization</span>
              <span className="serif-title text-3xl text-[#627636]">82.5%</span>
              <span className="text-[10px] text-slate-600 block">Peak Weekend Slots Booked</span>
            </div>
            <div className="modern-card p-6 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">Clubhouse Banquet Revenue</span>
              <span className="serif-title text-3xl text-[#172D25]">₹ 60,000</span>
              <span className="text-[10px] text-slate-600 block">12 Events Booked This Month</span>
            </div>
            <div className="modern-card p-6 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">Swimming Pool Swimmers</span>
              <span className="serif-title text-3xl text-[#1C352C]">65 / Day</span>
              <span className="text-[10px] text-slate-600 block">Water pH 7.2 Balanced</span>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CATEGORY 5: GUARD PATROL & SOS EMERGENCY */}
      {/* =================================================================== */}
      {activeCategory === 'patrol' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="modern-card p-6 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">QR Patrol Round Compliance</span>
              <span className="serif-title text-3xl text-[#627636]">100%</span>
              <span className="text-[10px] text-slate-600 block">12 Checkpoints Scanned/Round</span>
            </div>
            <div className="modern-card p-6 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">Avg SOS Guard Arrival Speed</span>
              <span className="serif-title text-3xl text-[#1C352C]">2m 14s</span>
              <span className="text-[10px] text-[#627636] font-bold block">Rapid Response Record</span>
            </div>
            <div className="modern-card p-6 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">Emergency Drills Conducted</span>
              <span className="serif-title text-3xl text-[#172D25]">4 / Year</span>
              <span className="text-[10px] text-slate-600 block">Fire & Evacuation Verified</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
