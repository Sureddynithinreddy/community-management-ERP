import React, { useState } from 'react';
import { 
  Smartphone, ShieldCheck, LayoutDashboard, CheckCircle2, XCircle, AlertTriangle, 
  Clock, Camera, QrCode, Wifi, WifiOff, FileText, Download, Send, CreditCard, 
  Calendar, UserCheck, Flame, Bell, Sparkles, RefreshCw, Lock, ShieldAlert, Award
} from 'lucide-react';
import { VisitorApprovalDemo, MaintenanceBillDemo, TicketDemo } from '../types/prd';

interface InteractiveSimulatorProps {
  activeSurface: 'Resident' | 'Guard' | 'Admin';
  onSurfaceChange: (surface: 'Resident' | 'Guard' | 'Admin') => void;
  isAccessibleMode: boolean;
}

export const InteractiveSimulator: React.FC<InteractiveSimulatorProps> = ({
  activeSurface,
  onSurfaceChange,
  isAccessibleMode,
}) => {
  // --- Resident App State ---
  const [residentSubTab, setResidentSubTab] = useState<'visitor' | 'billing' | 'helpdesk' | 'amenity' | 'sos'>('visitor');
  const [visitorDecision, setVisitorDecision] = useState<'Pending' | 'Approved' | 'Denied' | 'Left at Gate'>('Pending');
  
  const [billPaid, setBillPaid] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [ticketCategory, setTicketCategory] = useState<'Plumbing' | 'Electrical' | 'Lift/Elevator' | 'Security'>('Plumbing');
  const [ticketDescription, setTicketDescription] = useState('Water leakage from main supply pipe near balcony');
  const [ticketCreated, setTicketCreated] = useState(false);
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);

  // --- Guard Gate State ---
  const [guardSubTab, setGuardSubTab] = useState<'entry' | 'staff' | 'delivery' | 'patrol' | 'offline'>('entry');
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState<number>(0);
  const [scannedPatrolPoints, setScannedPatrolPoints] = useState<string[]>(['Gate 1 Main Entry', 'Tower A Lobby']);
  const [staffCheckinStatus, setStaffCheckinStatus] = useState<string | null>(null);

  // --- Admin ERP State ---
  const [adminSubTab, setAdminSubTab] = useState<'overview' | 'billing-rules' | 'sla' | 'rbac' | 'vault'>('overview');
  const [billingRuleType, setBillingRuleType] = useState<'sqft' | 'bhk' | 'flat'>('sqft');
  const [sqftRate, setSqftRate] = useState<number>(3.50);
  const [lateFeePercent, setLateFeePercent] = useState<number>(21);
  const [billsGenerated, setBillsGenerated] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'Secretary' | 'Treasurer' | 'President' | 'Security Chief'>('Treasurer');

  return (
    <section id="simulator" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Hands-On Prototype
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Test the PRD Experience Live
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Switch between surfaces to simulate real-time visitor approvals, offline gate resilience, automated maintenance billing, and committee SLA controls.
          </p>
        </div>

        {/* Surface Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl glass-panel border border-slate-800 shadow-xl max-w-full overflow-x-auto">
            <button
              onClick={() => onSurfaceChange('Resident')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                activeSurface === 'Resident'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Resident Mobile App
            </button>

            <button
              onClick={() => onSurfaceChange('Guard')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                activeSurface === 'Guard'
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Guard Gate Terminal
            </button>

            <button
              onClick={() => onSurfaceChange('Admin')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                activeSurface === 'Admin'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin ERP Dashboard
            </button>
          </div>
        </div>

        {/* Surface 1: Resident Mobile App Surface */}
        {activeSurface === 'Resident' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Control Sidebar for Resident Surface */}
            <div className="lg:col-span-4 space-y-4">
              <div className="glass-panel p-6 rounded-2xl border border-indigo-500/20">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-indigo-400" />
                  Resident Workflows
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Select a workflow below to test the resident mobile experience:
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => setResidentSubTab('visitor')}
                    className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                      residentSubTab === 'visitor'
                        ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>1. Real-time Gate Approval</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/30 font-semibold text-indigo-300">Must-have</span>
                  </button>

                  <button
                    onClick={() => setResidentSubTab('billing')}
                    className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                      residentSubTab === 'billing'
                        ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>2. Maintenance Pay & Receipt</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/30 font-semibold text-indigo-300">Must-have</span>
                  </button>

                  <button
                    onClick={() => setResidentSubTab('sos')}
                    className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                      residentSubTab === 'sos'
                        ? 'bg-red-600/20 text-red-200 border border-red-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 text-red-400 font-bold">
                      <Flame className="w-4 h-4 animate-bounce" />
                      3. Emergency SOS Panic Button
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/30 font-semibold text-red-300">Must-have</span>
                  </button>

                  <button
                    onClick={() => setResidentSubTab('helpdesk')}
                    className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                      residentSubTab === 'helpdesk'
                        ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>4. Raise Photo Complaint Ticket</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/30 font-semibold text-indigo-300">Must-have</span>
                  </button>

                  <button
                    onClick={() => setResidentSubTab('amenity')}
                    className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                      residentSubTab === 'amenity'
                        ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>5. Amenity Booking Calendar</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/30 font-semibold text-indigo-300">Must-have</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Resident Smartphone Simulator Screen */}
            <div className="lg:col-span-8 flex justify-center">
              <div className="w-full max-w-sm sm:max-w-md bg-slate-900 rounded-[40px] p-4 border-[6px] border-slate-800 shadow-2xl shadow-indigo-950/50 relative">
                
                {/* Phone Top Notch */}
                <div className="w-32 h-5 bg-slate-800 rounded-b-xl mx-auto mb-4 flex items-center justify-center">
                  <div className="w-10 h-1 bg-slate-700 rounded-full" />
                </div>

                {/* Mobile App Header Bar */}
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 mb-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Flat A-402 • Green Palms</span>
                    <div className="text-sm font-bold text-white">Hello, Ananya Sharma</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 flex items-center justify-center font-bold text-xs">
                    AS
                  </div>
                </div>

                {/* Mobile Screen Content Body */}
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 min-h-[380px] space-y-4">
                  
                  {/* WORKFLOW 1: Visitor Approval */}
                  {residentSubTab === 'visitor' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Bell className="w-3.5 h-3.5 animate-bounce" />
                          Gate Request Received (&lt;1.8s)
                        </span>
                        <span className="text-[10px] text-slate-400">Just Now</span>
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 overflow-hidden font-bold">
                            <span className="text-lg">📦</span>
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">Amazon Courier Delivery</div>
                            <div className="text-xs text-slate-400">Ramesh Kumar • Gate 1 Main Entry</div>
                            <div className="text-[11px] text-indigo-300 mt-0.5">OTP Code: 4928</div>
                          </div>
                        </div>

                        {visitorDecision === 'Pending' ? (
                          <div className="grid grid-cols-2 gap-2 pt-2">
                            <button
                              onClick={() => setVisitorDecision('Approved')}
                              className="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-md shadow-emerald-900/30"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Approve Entry
                            </button>
                            <button
                              onClick={() => setVisitorDecision('Denied')}
                              className="py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-md shadow-red-900/30"
                            >
                              <XCircle className="w-4 h-4" />
                              Deny Entry
                            </button>
                            <button
                              onClick={() => setVisitorDecision('Left at Gate')}
                              className="col-span-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl border border-slate-700"
                            >
                              Leave at Gate (Photo Snapshot)
                            </button>
                          </div>
                        ) : (
                          <div className="pt-2 text-center">
                            <div className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 ${
                              visitorDecision === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                              visitorDecision === 'Denied' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                              'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                            }`}>
                              {visitorDecision === 'Approved' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                              {visitorDecision === 'Denied' && <XCircle className="w-4 h-4 text-red-400" />}
                              <span>Status: Decision Sent to Guard ({visitorDecision})</span>
                            </div>
                            <button
                              onClick={() => setVisitorDecision('Pending')}
                              className="text-[11px] text-slate-400 hover:text-slate-200 underline mt-2"
                            >
                              Reset Test Notification
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* WORKFLOW 2: Maintenance Billing */}
                  {residentSubTab === 'billing' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          Monthly Society Dues (August 2026)
                        </span>
                        <span className="text-[10px] text-amber-400 font-semibold">Due in 5 Days</span>
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Maintenance Charges (2BHK)</span>
                          <span className="font-semibold text-white">₹ 3,200</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Sinking / Reserve Fund</span>
                          <span className="font-semibold text-white">₹ 500</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>GST (18% if applicable)</span>
                          <span className="font-semibold text-white">₹ 666</span>
                        </div>
                        <div className="border-t border-slate-800 pt-2 flex justify-between font-extrabold text-sm text-white">
                          <span>Total Payable Dues</span>
                          <span className="text-emerald-400 text-base">₹ 4,366</span>
                        </div>
                      </div>

                      {!billPaid ? (
                        <button
                          onClick={() => setBillPaid(true)}
                          className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
                        >
                          <CreditCard className="w-4 h-4" />
                          Pay ₹4,366 via UPI / Autopay
                        </button>
                      ) : (
                        <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-center space-y-2">
                          <div className="text-emerald-400 font-bold text-xs flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            Payment Successful! GST Receipt #GST-8821 Generated
                          </div>
                          <button
                            onClick={() => setBillPaid(false)}
                            className="text-[11px] text-slate-400 hover:text-slate-200 underline block mx-auto"
                          >
                            Reset Payment Test
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* WORKFLOW 3: Emergency SOS */}
                  {residentSubTab === 'sos' && (
                    <div className="space-y-4 text-center">
                      <div className="text-xs font-bold text-red-400 uppercase tracking-wider">
                        PRD Section 3.6 Panic Emergency Alert
                      </div>
                      
                      {!sosActive ? (
                        <div className="space-y-4 pt-2">
                          <p className="text-xs text-slate-300">
                            Tap the panic button to instantly alert Gate Security, Facility Manager, and Emergency Contacts with your exact flat location (Flat A-402).
                          </p>
                          <button
                            onClick={() => setSosActive(true)}
                            className="w-28 h-28 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 text-white font-black text-xl shadow-2xl shadow-red-600/50 border-4 border-red-400 mx-auto flex flex-col items-center justify-center gap-1 hover:scale-105 active:scale-95 transition-all"
                          >
                            <Flame className="w-7 h-7" />
                            SOS
                          </button>
                        </div>
                      ) : (
                        <div className="bg-red-950/60 border border-red-500 p-4 rounded-xl space-y-3 animate-pulse">
                          <div className="text-red-400 font-black text-sm uppercase flex items-center justify-center gap-2">
                            <ShieldAlert className="w-5 h-5 animate-spin" />
                            EMERGENCY SIREN BROADCASTED
                          </div>
                          <p className="text-xs text-slate-200">
                            Gate 1 Security Console and Tower Guards dispatched to <strong className="text-white">Flat A-402</strong>. Emergency contacts notified.
                          </p>
                          <button
                            onClick={() => setSosActive(false)}
                            className="py-1.5 px-4 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700"
                          >
                            Cancel SOS Alert
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* WORKFLOW 4: Helpdesk Ticket */}
                  {residentSubTab === 'helpdesk' && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Raise Complaint Ticket</span>
                        <span className="text-[10px] text-slate-400">SLA Tracked</span>
                      </div>

                      {!ticketCreated ? (
                        <div className="space-y-3 text-left">
                          <div>
                            <label className="text-[11px] text-slate-400 font-medium">Category</label>
                            <select
                              value={ticketCategory}
                              onChange={(e: any) => setTicketCategory(e.target.value)}
                              className="w-full bg-slate-900 text-xs text-white p-2 rounded-lg border border-slate-800 mt-1"
                            >
                              <option value="Plumbing">Plumbing (SLA: 2 Hours)</option>
                              <option value="Electrical">Electrical (SLA: 1 Hour)</option>
                              <option value="Lift/Elevator">Lift / Elevator (SLA: 30 Mins)</option>
                              <option value="Security">Security Concern (SLA: 1 Hour)</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[11px] text-slate-400 font-medium">Description</label>
                            <textarea
                              value={ticketDescription}
                              onChange={(e) => setTicketDescription(e.target.value)}
                              rows={2}
                              className="w-full bg-slate-900 text-xs text-white p-2 rounded-lg border border-slate-800 mt-1"
                            />
                          </div>

                          <div className="border border-dashed border-slate-800 p-2.5 rounded-lg text-center bg-slate-900/40">
                            <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                              <Camera className="w-3.5 h-3.5 text-indigo-400" />
                              Photo Proof Attached (leakage_pipe.jpg)
                            </span>
                          </div>

                          <button
                            onClick={() => setTicketCreated(true)}
                            className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-md"
                          >
                            Submit Ticket #TK-9021
                          </button>
                        </div>
                      ) : (
                        <div className="bg-slate-900 border border-amber-500/40 p-4 rounded-xl space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-amber-300">Ticket #TK-9021 Created</span>
                            <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded font-semibold">
                              In Progress
                            </span>
                          </div>
                          <p className="text-xs text-slate-300">{ticketDescription}</p>
                          <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-2">
                            <span>Assigned to: Ramesh (Plumber)</span>
                            <span className="text-amber-400 font-bold">SLA: 1h 45m left</span>
                          </div>
                          <button
                            onClick={() => setTicketCreated(false)}
                            className="text-[11px] text-slate-400 hover:text-white underline block mx-auto pt-1"
                          >
                            Create Another Ticket
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* WORKFLOW 5: Amenity Booking */}
                  {residentSubTab === 'amenity' && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        Amenity Slot Reservation
                      </div>

                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
                        <div className="text-xs font-bold text-white">Clubhouse Tennis Court 1</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {['06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM'].map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setBookedSlot(slot)}
                              className={`p-2 rounded-lg font-medium text-[11px] border transition-all ${
                                bookedSlot === slot
                                  ? 'bg-cyan-600 text-white border-cyan-400'
                                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      {bookedSlot && (
                        <div className="bg-cyan-500/10 border border-cyan-500/30 p-2.5 rounded-xl text-center">
                          <span className="text-xs text-cyan-300 font-bold block">
                            Slot Confirmed: {bookedSlot}
                          </span>
                          <span className="text-[10px] text-slate-400">Instant QR Entry Code generated</span>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Bottom Home Indicator */}
                <div className="w-24 h-1 bg-slate-700 rounded-full mx-auto mt-4" />
              </div>
            </div>

          </div>
        )}

        {/* Surface 2: Guard Gate Terminal Surface */}
        {activeSurface === 'Guard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Control Sidebar for Guard Surface */}
            <div className="lg:col-span-4 space-y-4">
              <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Guard Gate Workflows
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Select a gate security feature to simulate:
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => setGuardSubTab('entry')}
                    className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                      guardSubTab === 'entry'
                        ? 'bg-emerald-600/20 text-emerald-200 border border-emerald-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>1. Visitor Check-In & Photo Log</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/30 font-semibold text-emerald-300">Must-have</span>
                  </button>

                  <button
                    onClick={() => setGuardSubTab('staff')}
                    className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                      guardSubTab === 'staff'
                        ? 'bg-emerald-600/20 text-emerald-200 border border-emerald-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>2. Domestic Staff QR Tap</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/30 font-semibold text-emerald-300">Must-have</span>
                  </button>

                  <button
                    onClick={() => setGuardSubTab('delivery')}
                    className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                      guardSubTab === 'delivery'
                        ? 'bg-emerald-600/20 text-emerald-200 border border-emerald-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>3. Leave-at-Gate Delivery Log</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/30 font-semibold text-emerald-300">Must-have</span>
                  </button>

                  <button
                    onClick={() => setGuardSubTab('patrol')}
                    className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                      guardSubTab === 'patrol'
                        ? 'bg-emerald-600/20 text-emerald-200 border border-emerald-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>4. Guard Patrol QR Checkpoints</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 font-semibold text-slate-300">Should-have</span>
                  </button>

                  <button
                    onClick={() => setGuardSubTab('offline')}
                    className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                      guardSubTab === 'offline'
                        ? 'bg-amber-600/20 text-amber-200 border border-amber-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <WifiOff className="w-4 h-4" />
                      5. Offline Mode Toggle Simulator
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/30 font-semibold text-amber-300">Should-have</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Guard Terminal Simulator Screen */}
            <div className="lg:col-span-8 flex justify-center">
              <div className="w-full max-w-xl bg-slate-900 rounded-3xl p-6 border-4 border-slate-800 shadow-2xl space-y-4">
                
                {/* Gate Terminal Header Bar */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                      G1
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        Gate 1 Security Desk
                        {isOffline ? (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 flex items-center gap-1">
                            <WifiOff className="w-3 h-3" /> OFFLINE MODE
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                            <Wifi className="w-3 h-3" /> ONLINE
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">Shift Guard: Vikram Singh • Station #01</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsOffline(!isOffline);
                      if (!isOffline) setOfflineQueue((prev) => prev + 1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      isOffline
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    {isOffline ? 'Re-connect Wi-Fi' : 'Simulate Internet Drop'}
                  </button>
                </div>

                {/* Guard Terminal Main Display */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 min-h-[360px] space-y-4">
                  
                  {/* GUARD WORKFLOW 1: Check-in */}
                  {guardSubTab === 'entry' && (
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        New Visitor Gate Entry Log
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border border-slate-800 rounded-xl p-4 bg-slate-900 text-center space-y-2">
                          <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center text-2xl">
                            👤
                          </div>
                          <span className="text-xs text-slate-400 block">Photo Snapshot Captured</span>
                          <span className="text-[10px] text-emerald-400 font-mono">Timestamp: 11:35:44 AM</span>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="text-[11px] text-slate-400 font-medium">Visitor Name</label>
                            <input
                              type="text"
                              defaultValue="Rajesh Mehta"
                              className="w-full bg-slate-900 text-xs text-white p-2 rounded-lg border border-slate-800 mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] text-slate-400 font-medium">Target Flat Number</label>
                            <input
                              type="text"
                              defaultValue="Flat B-102"
                              className="w-full bg-slate-900 text-xs text-white p-2 rounded-lg border border-slate-800 mt-1"
                            />
                          </div>

                          <button
                            onClick={() => {
                              if (isOffline) setOfflineQueue(offlineQueue + 1);
                              alert(isOffline ? 'Saved locally to SQLite queue! Will sync when connection is back.' : 'Push Notification dispatched to Resident B-102!');
                            }}
                            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md"
                          >
                            {isOffline ? 'Queue Entry Offline' : 'Send Push Approval to Resident'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* GUARD WORKFLOW 2: Domestic Staff */}
                  {guardSubTab === 'staff' && (
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        Domestic Staff QR Quick Tap
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-300 font-bold flex items-center justify-center">
                              SD
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white">Sunita Devi (Maid)</div>
                              <div className="text-[10px] text-slate-400">Assigned Flats: A-402, B-102, C-301</div>
                            </div>
                          </div>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                            Verified ID
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setStaffCheckinStatus('Checked IN at 11:35 AM')}
                            className="flex-1 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg"
                          >
                            Tap Check-IN
                          </button>
                          <button
                            onClick={() => setStaffCheckinStatus('Checked OUT at 11:35 AM')}
                            className="flex-1 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-lg border border-slate-700"
                          >
                            Tap Check-OUT
                          </button>
                        </div>

                        {staffCheckinStatus && (
                          <div className="text-center text-xs text-emerald-400 font-semibold pt-1">
                            {staffCheckinStatus}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* GUARD WORKFLOW 3: Delivery */}
                  {guardSubTab === 'delivery' && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        High-Volume Delivery "Leave at Gate" Mode
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-white">Zomato / Swiggy Fast Pass</span>
                          <span className="text-[10px] text-indigo-400 font-semibold">Auto-Approved by Flat C-204</span>
                        </div>
                        <div className="border border-slate-800 p-3 rounded-lg text-center bg-slate-950">
                          <Camera className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                          <span className="text-[11px] text-slate-400 block">Package Photo Logged</span>
                          <span className="text-[10px] text-slate-300 font-mono">Order ID #ZM-8921 • Shelf Slot B-4</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* GUARD WORKFLOW 4: Patrol Checkpoint */}
                  {guardSubTab === 'patrol' && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        Security Patrol Round QR Scanner
                      </div>

                      <div className="space-y-2">
                        {['Checkpoint 1: Main Gate Outer Perimeter', 'Checkpoint 2: Tower A Basement Parking', 'Checkpoint 3: Clubhouse Back Entrance'].map((cp, idx) => (
                          <div key={cp} className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                            <span className="text-xs text-slate-200">{cp}</span>
                            {scannedPatrolPoints.includes(cp) ? (
                              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Scanned
                              </span>
                            ) : (
                              <button
                                onClick={() => setScannedPatrolPoints([...scannedPatrolPoints, cp])}
                                className="text-[10px] bg-indigo-600 text-white px-2 py-1 rounded font-bold hover:bg-indigo-500"
                              >
                                Scan QR Code
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* GUARD WORKFLOW 5: Offline Mode */}
                  {guardSubTab === 'offline' && (
                    <div className="space-y-3 text-center">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        PRD Section 3.9 Gate Internet Fault Tolerance
                      </div>

                      <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl space-y-3">
                        <WifiOff className="w-8 h-8 text-amber-400 mx-auto" />
                        <div className="text-xs text-amber-200 font-bold">
                          Gate Wi-Fi Disconnected Simulation
                        </div>
                        <p className="text-xs text-slate-300">
                          All visitor entries are queued in SQLite local storage. The gate never freezes or stops entry!
                        </p>
                        <div className="text-xs font-mono text-amber-300 bg-slate-950 p-2 rounded-lg border border-slate-800">
                          Pending Offline Sync Queue: {offlineQueue} Records
                        </div>
                        {offlineQueue > 0 && !isOffline && (
                          <div className="text-xs text-emerald-400 font-bold">
                            ✓ Auto-synced {offlineQueue} records to society cloud server!
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </div>

          </div>
        )}

        {/* Surface 3: Admin ERP Dashboard Surface */}
        {activeSurface === 'Admin' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Control Sidebar for Admin Surface */}
            <div className="lg:col-span-4 space-y-4">
              <div className="glass-panel p-6 rounded-2xl border border-amber-500/20">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-amber-400" />
                  Admin Committee Workflows
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Select an admin management function:
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => setAdminSubTab('overview')}
                    className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                      adminSubTab === 'overview'
                        ? 'bg-amber-600/20 text-amber-200 border border-amber-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>1. Central Operations Control</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/30 font-semibold text-amber-300">Must-have</span>
                  </button>

                  <button
                    onClick={() => setAdminSubTab('billing-rules')}
                    className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                      adminSubTab === 'billing-rules'
                        ? 'bg-amber-600/20 text-amber-200 border border-amber-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>2. Maintenance Billing Engine</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/30 font-semibold text-amber-300">Must-have</span>
                  </button>

                  <button
                    onClick={() => setAdminSubTab('sla')}
                    className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                      adminSubTab === 'sla'
                        ? 'bg-amber-600/20 text-amber-200 border border-amber-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>3. Helpdesk SLA Escalation Monitor</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 font-semibold text-slate-300">Should-have</span>
                  </button>

                  <button
                    onClick={() => setAdminSubTab('rbac')}
                    className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                      adminSubTab === 'rbac'
                        ? 'bg-amber-600/20 text-amber-200 border border-amber-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>4. Role-Based Permission Matrix</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/30 font-semibold text-amber-300">Must-have</span>
                  </button>

                  <button
                    onClick={() => setAdminSubTab('vault')}
                    className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-all ${
                      adminSubTab === 'vault'
                        ? 'bg-amber-600/20 text-amber-200 border border-amber-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>5. Document Vault & Handover</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 font-semibold text-slate-300">Should-have</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Admin ERP Web Screen */}
            <div className="lg:col-span-8">
              <div className="bg-slate-900 rounded-3xl p-6 border-4 border-slate-800 shadow-2xl space-y-4">
                
                {/* Admin Top Header */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">Green Palms RWA Admin ERP</div>
                    <div className="text-xs text-slate-400">Logistics & Accounting Control Suite</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Current Role:</span>
                    <select
                      value={selectedRole}
                      onChange={(e: any) => setSelectedRole(e.target.value)}
                      className="bg-slate-900 text-xs text-amber-300 font-bold px-3 py-1.5 rounded-lg border border-slate-700"
                    >
                      <option value="Treasurer">Treasurer (Full Billing & Ledgers)</option>
                      <option value="Secretary">Secretary (Notices & Handover)</option>
                      <option value="President">President (Full Executive Admin)</option>
                      <option value="Security Chief">Security Chief (Gate & Patrols)</option>
                    </select>
                  </div>
                </div>

                {/* Admin Screen Display Content */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 min-h-[380px] space-y-4">
                  
                  {/* ADMIN WORKFLOW 1: Overview */}
                  {adminSubTab === 'overview' && (
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Central Operations Room Overview
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                          <span className="text-[11px] text-slate-400 block">Today's Visitors</span>
                          <span className="text-2xl font-black text-white">342</span>
                          <span className="text-[10px] text-emerald-400 font-medium">↑ 12% vs yesterday</span>
                        </div>

                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                          <span className="text-[11px] text-slate-400 block">Collections (Aug)</span>
                          <span className="text-2xl font-black text-emerald-400">₹ 14.2 L</span>
                          <span className="text-[10px] text-slate-400">88.4% flats paid</span>
                        </div>

                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                          <span className="text-[11px] text-slate-400 block">Open Tickets</span>
                          <span className="text-2xl font-black text-amber-400">4</span>
                          <span className="text-[10px] text-amber-300">1 Overdue SLA</span>
                        </div>

                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                          <span className="text-[11px] text-slate-400 block">Patrol Coverage</span>
                          <span className="text-2xl font-black text-cyan-400">100%</span>
                          <span className="text-[10px] text-slate-400">12/12 checkpoints</span>
                        </div>
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                        <div className="font-bold text-white mb-1">Recent Society Activity Feed</div>
                        <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                          <span>Flat A-402 paid maintenance bill via UPI (₹4,366)</span>
                          <span className="text-slate-500">2 mins ago</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                          <span>Guard Vikram logged 3 Amazon deliveries at Gate 1</span>
                          <span className="text-slate-500">5 mins ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ticket #TK-9021 (Plumbing) assigned to Ramesh Vendor</span>
                          <span className="text-slate-500">12 mins ago</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ADMIN WORKFLOW 2: Billing Engine */}
                  {adminSubTab === 'billing-rules' && (
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Automated Maintenance Billing Engine
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] text-slate-400 font-medium">Billing Formula</label>
                            <select
                              value={billingRuleType}
                              onChange={(e: any) => setBillingRuleType(e.target.value)}
                              className="w-full bg-slate-950 text-xs text-white p-2 rounded-lg border border-slate-800 mt-1"
                            >
                              <option value="sqft">Per Sq. Ft. Rate (e.g. ₹3.50/sqft)</option>
                              <option value="bhk">Per BHK Tier (2BHK ₹3500, 3BHK ₹4500)</option>
                              <option value="flat">Flat Rate for All Units (₹4000)</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[11px] text-slate-400 font-medium">Late Fee Interest Rule</label>
                            <select
                              value={lateFeePercent}
                              onChange={(e: any) => setLateFeePercent(Number(e.target.value))}
                              className="w-full bg-slate-950 text-xs text-white p-2 rounded-lg border border-slate-800 mt-1"
                            >
                              <option value={21}>21% p.a. after 15th of month</option>
                              <option value={18}>18% p.a. after 10th of month</option>
                              <option value={500}>Flat ₹500 penalty after due date</option>
                            </select>
                          </div>
                        </div>

                        {!billsGenerated ? (
                          <button
                            onClick={() => setBillsGenerated(true)}
                            className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg"
                          >
                            Generate Monthly Itemized Bills for 250 Flats
                          </button>
                        ) : (
                          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-center space-y-1">
                            <span className="text-xs text-emerald-300 font-bold block">
                              ✓ 250 Itemized Bills Generated & Pushed to Resident App!
                            </span>
                            <span className="text-[10px] text-slate-400">Total Demand: ₹16,25,000 • Due Date: 10th Aug 2026</span>
                            <button
                              onClick={() => setBillsGenerated(false)}
                              className="text-[10px] text-slate-400 hover:text-white underline block mx-auto pt-1"
                            >
                              Re-configure Formula
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ADMIN WORKFLOW 3: SLA Escalation */}
                  {adminSubTab === 'sla' && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        PRD Section 5.3 SLA Timers & Auto-escalation
                      </div>

                      <div className="space-y-2">
                        <div className="bg-slate-900 p-3 rounded-xl border border-red-500/40 flex justify-between items-center">
                          <div>
                            <div className="text-xs font-bold text-white">#TK-8812 - Lift #2 Fault (Tower B)</div>
                            <div className="text-[10px] text-slate-400">Assigned: OTIS Vendor • SLA: 30 Mins</div>
                          </div>
                          <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-1 rounded font-bold animate-pulse">
                            OVERDUE (+15m) • Escalated to Secretary
                          </span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                          <div>
                            <div className="text-xs font-bold text-white">#TK-9021 - Balcony Pipe Leakage</div>
                            <div className="text-[10px] text-slate-400">Assigned: Ramesh Plumber • SLA: 2 Hours</div>
                          </div>
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-1 rounded font-bold">
                            1h 45m Remaining
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ADMIN WORKFLOW 4: RBAC Matrix */}
                  {adminSubTab === 'rbac' && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Role-Based Access Control (Permissions for {selectedRole})
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                          <span>Modify Society Maintenance Rates</span>
                          <span className={selectedRole === 'Treasurer' || selectedRole === 'President' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                            {selectedRole === 'Treasurer' || selectedRole === 'President' ? '✓ Allowed' : '✗ Restricted'}
                          </span>
                        </div>

                        <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                          <span>View Full Financial Audit Ledgers</span>
                          <span className={selectedRole === 'Treasurer' || selectedRole === 'President' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                            {selectedRole === 'Treasurer' || selectedRole === 'President' ? '✓ Allowed' : '✗ Restricted'}
                          </span>
                        </div>

                        <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                          <span>Post Official Notices & Broadcast SOS</span>
                          <span className={selectedRole === 'Secretary' || selectedRole === 'President' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                            {selectedRole === 'Secretary' || selectedRole === 'President' ? '✓ Allowed' : '✗ Restricted'}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span>Manage Guard Patrols & Gate Device Keys</span>
                          <span className={selectedRole === 'Security Chief' || selectedRole === 'President' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                            {selectedRole === 'Security Chief' || selectedRole === 'President' ? '✓ Allowed' : '✗ Restricted'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ADMIN WORKFLOW 5: Document Vault */}
                  {adminSubTab === 'vault' && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Document Vault & Committee Handover Archive
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                          <FileText className="w-5 h-5 text-indigo-400" />
                          <div className="font-bold text-white">AGM_Minutes_2025.pdf</div>
                          <span className="text-[10px] text-slate-400 block">Signed Legal Archive</span>
                          <button className="text-[10px] text-indigo-400 underline font-semibold">Download Copy</button>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                          <FileText className="w-5 h-5 text-emerald-400" />
                          <div className="font-bold text-white">CA_Audit_BalanceSheet.pdf</div>
                          <span className="text-[10px] text-slate-400 block">FY 2025-26 GST Tax File</span>
                          <button className="text-[10px] text-emerald-400 underline font-semibold">Download Copy</button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
