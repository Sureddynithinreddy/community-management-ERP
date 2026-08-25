import React, { useState } from 'react';
import { 
  TrendingUp, DollarSign, Users, ShieldCheck, Wrench, Calendar, 
  ArrowUpRight, ArrowDownRight, Filter, Download, PieChart, BarChart3, 
  Activity, Clock, CheckCircle2, AlertTriangle, Package, Zap, Award,
  Car, Shield, Smartphone, FileText, Check
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('month');
  const [activeCategory, setActiveCategory] = useState<'financial' | 'visitors' | 'helpdesk' | 'amenities' | 'patrol'>('financial');

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header & Filter Controls */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-black text-2xl text-slate-900">Executive Society Analytics & Statistics</h2>
            <p className="text-xs text-slate-500 mt-1">Real-time telemetry across financial, security, helpdesk, and amenity operations</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Time Range Selector */}
          <div className="bg-slate-100 p-1.5 rounded-2xl flex text-xs font-bold gap-1">
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                timeRange === 'month' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              August 2026
            </button>
            <button
              onClick={() => setTimeRange('quarter')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                timeRange === 'quarter' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Q3 2026
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                timeRange === 'year' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FY 2026-27
            </button>
          </div>

          <button
            onClick={() => alert('Exporting Full Analytics Executive Summary (PDF & Excel)...')}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl shadow-xs flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
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
              className={`px-4 py-3 rounded-2xl transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* CATEGORY 1: FINANCIAL & DUES STATISTICS */}
      {/* =================================================================== */}
      {activeCategory === 'financial' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Top Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Monthly Demand</span>
              <div className="text-3xl font-black text-slate-900">₹ 16,25,000</div>
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> 250 Units Billed @ ₹3.50/sqft
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Collected Amount</span>
              <div className="text-3xl font-black text-emerald-600">₹ 14,80,450</div>
              <span className="text-[11px] text-indigo-600 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 92.4% Compliance Rate
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Outstanding Dues</span>
              <div className="text-3xl font-black text-rose-600">₹ 1,44,550</div>
              <span className="text-[11px] text-slate-500 font-medium">18 Units Pending Payment</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Sinking Reserve Fund</span>
              <div className="text-3xl font-black text-indigo-900">₹ 42,50,000</div>
              <span className="text-[11px] text-emerald-600 font-bold">HDFC Bank Fixed Deposit</span>
            </div>
          </div>

          {/* Collection Progress & Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
              <span className="font-black text-base text-slate-900 block">August 2026 Monthly Collection Progress</span>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600">Collected: ₹ 14.80 L (232 Flats)</span>
                  <span className="text-emerald-700">92.4%</span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: '92.4%' }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Tower A</span>
                  <span className="font-black text-slate-900 text-sm">96% Paid</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Tower B</span>
                  <span className="font-black text-slate-900 text-sm">91% Paid</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Tower C</span>
                  <span className="font-black text-slate-900 text-sm">90% Paid</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-black text-base text-slate-900 block">Payment Mode Share</span>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-600" />
                    <span className="font-bold text-slate-800">UPI Autopay & QR (GPay/PhonePe)</span>
                  </div>
                  <span className="font-black text-slate-900">84% (₹ 12.43 L)</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="font-bold text-slate-800">Netbanking Direct NEFT/IMPS</span>
                  </div>
                  <span className="font-black text-slate-900">12% (₹ 1.77 L)</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="font-bold text-slate-800">Credit / Debit Card Online Portal</span>
                  </div>
                  <span className="font-black text-slate-900">4% (₹ 0.60 L)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CATEGORY 2: GATE TRAFFIC & DELIVERY METRICS */}
      {/* =================================================================== */}
      {activeCategory === 'visitors' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Daily Gate Entries</span>
              <div className="text-3xl font-black text-slate-900">482 Entries</div>
              <span className="text-[11px] text-emerald-600 font-bold">100% Digital Pass Logged</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Deliveries Logged</span>
              <div className="text-3xl font-black text-indigo-600">142 Parcels</div>
              <span className="text-[11px] text-slate-500 font-medium">Blinkit, Swiggy, Amazon</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">ANPR Plate Accuracy</span>
              <div className="text-3xl font-black text-emerald-600">99.8%</div>
              <span className="text-[11px] text-emerald-700 font-bold">Boom Auto-Actuated</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Avg Visitor Dwell Time</span>
              <div className="text-3xl font-black text-slate-900">18.4 Mins</div>
              <span className="text-[11px] text-slate-500 font-medium">Delivery: 8.2 mins avg</span>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <span className="font-black text-base text-slate-900 block">Courier Delivery Breakdown</span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">⚡ Blinkit (10-min)</span>
                <span className="text-lg font-black text-indigo-600">54 Deliveries</span>
                <span className="text-[10px] text-slate-400 block">38% Share</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">🍔 Swiggy & Zomato</span>
                <span className="text-lg font-black text-emerald-600">46 Deliveries</span>
                <span className="text-[10px] text-slate-400 block">32% Share</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">📦 Amazon & Flipkart</span>
                <span className="text-lg font-black text-amber-600">28 Deliveries</span>
                <span className="text-[10px] text-slate-400 block">20% Share</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">🚕 Uber & Ola Cabs</span>
                <span className="text-lg font-black text-slate-700">14 Trips</span>
                <span className="text-[10px] text-slate-400 block">10% Share</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CATEGORY 3: HELPDESK & SLA RESOLUTION */}
      {/* =================================================================== */}
      {activeCategory === 'helpdesk' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">August Work Orders</span>
              <div className="text-3xl font-black text-slate-900">42 Tickets</div>
              <span className="text-[11px] text-emerald-600 font-bold">39 Resolved (93%)</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Avg Turnaround Time</span>
              <div className="text-3xl font-black text-indigo-600">3.4 Hours</div>
              <span className="text-[11px] text-indigo-700 font-bold">Within 4hr SLA</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Resident Satisfaction</span>
              <div className="text-3xl font-black text-emerald-600">4.92 / 5.0</div>
              <span className="text-[11px] text-slate-500 font-medium">From 38 Verified Reviews</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Open Tickets</span>
              <div className="text-3xl font-black text-amber-600">3 In-Progress</div>
              <span className="text-[11px] text-slate-500 font-medium">Assigned to Electrician</span>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CATEGORY 4: AMENITY & FACILITY USAGE */}
      {/* =================================================================== */}
      {activeCategory === 'amenities' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <span className="font-black text-sm text-slate-900 block">Clubhouse Banquet Hall</span>
              <div className="text-2xl font-black text-indigo-600">78% Weekend Occupancy</div>
              <p className="text-xs text-slate-600">12 Family Receptions & Birthdays booked for August-September</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <span className="font-black text-sm text-slate-900 block">Tennis & Badminton Courts</span>
              <div className="text-2xl font-black text-emerald-600">92% Evening Prime Usage</div>
              <p className="text-xs text-slate-600">6 PM - 10 PM slots consistently booked across all towers</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <span className="font-black text-sm text-slate-900 block">Swimming Pool & Deck</span>
              <div className="text-2xl font-black text-slate-900">45 Swimmers / Day</div>
              <p className="text-xs text-slate-600">Daily chemical testing compliant with municipal safety limits</p>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CATEGORY 5: GUARD PATROL & SOS EMERGENCY */}
      {/* =================================================================== */}
      {activeCategory === 'patrol' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">QR Checkpoint Scans</span>
              <div className="text-3xl font-black text-emerald-600">100% Complete</div>
              <span className="text-[11px] text-slate-500 font-medium">Night Patrol Rover Active</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Panic SOS</span>
              <div className="text-3xl font-black text-slate-900">0 Alarms</div>
              <span className="text-[11px] text-emerald-600 font-bold">All Stations Secure</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Avg Emergency Response</span>
              <div className="text-3xl font-black text-indigo-600">1.8 Mins</div>
              <span className="text-[11px] text-slate-500 font-medium">Simulated Rapid Response</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Gate Barrier Uptime</span>
              <div className="text-3xl font-black text-emerald-600">99.9%</div>
              <span className="text-[11px] text-slate-500 font-medium">Zero Actuator Faults</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
