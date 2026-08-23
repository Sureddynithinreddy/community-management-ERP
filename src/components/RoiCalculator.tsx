import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign, ShieldCheck, Sparkles } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [flatCount, setFlatCount] = useState<number>(250);
  const [maintenanceRate, setMaintenanceRate] = useState<number>(3500);
  const [latePaymentRate, setLatePaymentRate] = useState<number>(25);

  const calculations = useMemo(() => {
    const totalMonthlyBilling = flatCount * maintenanceRate;
    const currentUnpaidAmount = totalMonthlyBilling * (latePaymentRate / 100);
    // GatePulse automated billing + UPI Autopay boosts on-time payment by ~75%
    const automatedOnTimeCollection = currentUnpaidAmount * 0.75;
    // Treasurer manual bill generation & tally hours (approx 0.15 hrs per flat/month)
    const treasurerHoursSaved = Math.round(flatCount * 0.15);
    // Estimated late fee recovered per year (assuming 21% p.a. penalty engine)
    const annualLateFeeRecovered = Math.round(currentUnpaidAmount * 0.18 * (1/12) * 12);
    // Gate queue reduction: QR pre-approval speeds entry by 78%
    const gateTimeSavedHoursPerMonth = Math.round((flatCount * 4 * 30 * 2.5) / 3600); // 4 visitors/flat/day

    return {
      totalMonthlyBilling,
      currentUnpaidAmount,
      automatedOnTimeCollection,
      treasurerHoursSaved,
      annualLateFeeRecovered,
      gateTimeSavedHoursPerMonth,
    };
  }, [flatCount, maintenanceRate, latePaymentRate]);

  return (
    <section id="roi-calculator" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase">
            <Calculator className="w-3.5 h-3.5" />
            Society ROI & Operational Calculator
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Calculate Impact for Your Society
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            See how much time your RWA committee saves every month and how digital collections eliminate late maintenance dues.
          </p>
        </div>

        {/* Interactive Calculator Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Panel */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Adjust Society Parameters
            </h3>

            {/* Slider 1: Flat Count */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Number of Flats / Units</span>
                <span className="text-emerald-400 font-bold text-base">{flatCount} Flats</span>
              </div>
              <input
                type="range"
                min={20}
                max={2000}
                step={10}
                value={flatCount}
                onChange={(e) => setFlatCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>20 Flats (Standalone)</span>
                <span>500 Flats</span>
                <span>2,000 Flats (Township)</span>
              </div>
            </div>

            {/* Slider 2: Maintenance Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Avg Monthly Maintenance Dues per Flat</span>
                <span className="text-emerald-400 font-bold text-base">₹ {maintenanceRate.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={1000}
                max={20000}
                step={500}
                value={maintenanceRate}
                onChange={(e) => setMaintenanceRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>₹1,000/mo</span>
                <span>₹10,000/mo</span>
                <span>₹20,000/mo</span>
              </div>
            </div>

            {/* Slider 3: Late Payment Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Estimated Late Dues / Defaulter Rate</span>
                <span className="text-amber-400 font-bold text-base">{latePaymentRate}% overdue</span>
              </div>
              <input
                type="range"
                min={5}
                max={50}
                step={5}
                value={latePaymentRate}
                onChange={(e) => setLatePaymentRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>5% (Low)</span>
                <span>25% (Average RWA)</span>
                <span>50% (High Defaulters)</span>
              </div>
            </div>
          </div>

          {/* Results Display Grid */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Result Card 1 */}
            <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 to-slate-900 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">
                  On-time Cashflow Accelerated Monthly
                </span>
                <div className="text-3xl font-black text-emerald-400">
                  + ₹ {Math.round(calculations.automatedOnTimeCollection).toLocaleString()}
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Collected on time via UPI Autopay & automated push reminders.
                </p>
              </div>
            </div>

            {/* Result Card 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-white">{calculations.treasurerHoursSaved} Hours / Month</div>
                <span className="text-xs text-slate-400 block mt-1">Saved by Treasurer & CA</span>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-white">{calculations.gateTimeSavedHoursPerMonth} Hrs Gate Time</div>
                <span className="text-xs text-slate-400 block mt-1">Saved at Gate per Month</span>
              </div>
            </div>

            {/* Result Summary Box */}
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-white flex justify-between">
                <span>Total Monthly Billing Demand:</span>
                <span>₹ {calculations.totalMonthlyBilling.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Annual Late Fee Recovered:</span>
                <span className="text-amber-400 font-semibold">₹ {calculations.annualLateFeeRecovered.toLocaleString()}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
