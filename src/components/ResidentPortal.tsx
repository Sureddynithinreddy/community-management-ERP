import React, { useState } from 'react';
import { ResidentPageId } from '../types/portalTypes';
import { ResidentAnalytics } from './ResidentAnalytics';
import { 
  Home, CreditCard, ShieldCheck, Wrench, Calendar, Megaphone, 
  Flame, CheckCircle2, XCircle, Clock, Camera, FileText, ArrowLeft, Send,
  Plus, Download, Check, Sparkles, User, QrCode, Star, ThumbsUp, MapPin, Phone, TreePine, Share2, Trash2, Filter, MessageSquare, Dumbbell, Trophy, Building, Users, Vote, Menu, X
} from 'lucide-react';

interface ResidentPortalProps {
  onExit: () => void;
}

export const ResidentPortal: React.FC<ResidentPortalProps> = ({ onExit }) => {
  const [activePage, setActivePage] = useState<ResidentPageId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Interactive States
  const [sosActive, setSosActive] = useState<boolean>(false);
  const [billStatus, setBillStatus] = useState<'Unpaid' | 'Paid'>('Unpaid');

  // Unannounced Visitors at Gate
  const [unannouncedVisitors, setUnannouncedVisitors] = useState([
    { id: 'v1', name: 'Amazon Delivery - Ramesh Kumar', type: 'Delivery', orderId: '#AZ-9021', gate: 'Gate 1 Main', time: 'Just Now', status: 'Pending' },
    { id: 'v2', name: 'Guest - Rahul Sharma', type: 'Guest', vehicle: 'KA-05-MA-1234', gate: 'Gate 1 Main', time: '5 mins ago', status: 'Pending' },
  ]);

  // Pre-Approve Guest Pass State
  const [guestName, setGuestName] = useState<string>('Siddharth Verma');
  const [guestMobile, setGuestMobile] = useState<string>('98765 43210');
  const [guestArrival, setGuestArrival] = useState<string>('Today at 04:30 PM');
  const [guestPurpose, setGuestPurpose] = useState<string>('Dinner Family Guest');
  const [guestVehicle, setGuestVehicle] = useState<string>('KA-01-MJ-9090');
  
  const [generatedPass, setGeneratedPass] = useState<{ otp: string; qr: string; name: string; mobile: string; arrival: string; purpose: string } | null>({
    otp: '892104',
    qr: 'QR-GUEST-892104',
    name: 'Siddharth Verma',
    mobile: '98765 43210',
    arrival: 'Today at 04:30 PM',
    purpose: 'Dinner Family Guest'
  });

  const [preApprovedPasses, setPreApprovedPasses] = useState([
    { id: 'PASS-8921', name: 'Siddharth Verma', mobile: '98765 43210', arrival: 'Today 04:30 PM', otp: '892-104', status: 'Active (Valid)', validTill: 'Today 11:59 PM' },
    { id: 'PASS-8810', name: 'Sunita Rao (Aunt)', mobile: '98123 55443', arrival: 'Tomorrow 10:00 AM', otp: '410-992', status: 'Active (Valid)', validTill: 'Tomorrow 08:00 PM' },
  ]);

  // Complaints State
  const [complaintSubject, setComplaintSubject] = useState<string>('Kitchen Sink Drainage Pipe Water Leakage');
  const [complaintCategory, setComplaintCategory] = useState<string>('Plumbing');
  const [complaintPriority, setComplaintPriority] = useState<string>('High');
  const [preferredSlot, setPreferredSlot] = useState<string>('Morning (09:00 AM - 12:00 PM)');
  const [complaintDesc, setComplaintDesc] = useState<string>('Water leaking continuously under the kitchen sink cabinet.');

  const [ticketsList, setTicketsList] = useState([
    { id: 'TK-9021', subject: 'Balcony Main Water Supply Pipe Leakage', category: 'Plumbing', desc: 'Water leaking near balcony window sill', priority: 'High', status: 'In Progress', assignedTo: 'Ramesh Plumber (Ph: 98123 99887)', sla: '1h 45m remaining', date: 'Today 10:15 AM', rating: null as number | null },
    { id: 'TK-8910', subject: 'Tower A Lift #2 Button Panel Flickering', category: 'Electrical', desc: '4th floor call button light blinking continuously', priority: 'Medium', status: 'Resolved', assignedTo: 'OTIS Technician Suresh', sla: 'Resolved in 42 mins', date: 'Yesterday 04:20 PM', rating: 5 },
    { id: 'TK-8742', subject: 'Intercom Noise Distortion with Gate 1', category: 'Telecom', desc: 'Static noise when calling guard desk', priority: 'Low', status: 'Resolved', assignedTo: 'Airtel Broadband Engineer', sla: 'Resolved in 2 hours', date: '19 Aug 2026', rating: 4 },
  ]);

  // Amenities State
  const [amenityTab, setAmenityTab] = useState<'courts' | 'gym' | 'halls'>('courts');
  const [selectedAmenity, setSelectedAmenity] = useState<string>('Badminton Court 2 (Indoor)');
  const [selectedSlot, setSelectedSlot] = useState<string | null>('06:00 PM - 07:00 PM');
  const [bookingDate, setBookingDate] = useState<string>('2026-08-24');
  const [eventPurpose, setEventPurpose] = useState<string>('Birthday Party');

  const [myBookings, setMyBookings] = useState([
    { id: 'BK-204', amenity: 'Badminton Court 2 (Indoor)', slot: '06:00 PM - 07:00 PM', date: 'Today', status: 'Confirmed', type: 'Sports' },
    { id: 'BK-198', amenity: 'Clubhouse Banquet Hall (150 Capacity)', slot: '05:00 PM - 10:00 PM', date: '15 Sept 2026', status: 'Confirmed', type: 'Hall' },
  ]);

  // Polls & Announcements State
  const [poll1Voted, setPoll1Voted] = useState<number | null>(1);
  const [poll1Results, setPoll1Results] = useState([
    { id: 1, option: 'AquaClean Services (₹25,000/mo)', votes: 42, percent: 58 },
    { id: 2, option: 'BlueWave Pool Mgmt (₹22,000/mo)', votes: 20, percent: 28 },
    { id: 3, option: 'Keep Existing Vendor', votes: 10, percent: 14 },
  ]);

  const [agmRsvp, setAgmRsvp] = useState<boolean>(true);

  // Handlers
  const handleVisitorDecision = (id: string, decision: string) => {
    setUnannouncedVisitors(prev => prev.map(v => v.id === id ? { ...v, status: decision } : v));
  };

  const handleCreatePreApprovedPass = (e: React.FormEvent) => {
    e.preventDefault();
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const formattedOtp = `${randomOtp.slice(0, 3)}-${randomOtp.slice(3)}`;
    
    setGeneratedPass({
      otp: formattedOtp,
      qr: `QR-GUEST-${randomOtp}`,
      name: guestName,
      mobile: guestMobile,
      arrival: guestArrival,
      purpose: guestPurpose
    });

    setPreApprovedPasses([
      { id: `PASS-${Math.floor(8000 + Math.random() * 1000)}`, name: guestName, mobile: guestMobile, arrival: guestArrival, otp: formattedOtp, status: 'Active (Valid)', validTill: 'Today 11:59 PM' },
      ...preApprovedPasses
    ]);
    alert(`Pre-Approved Guest Pass generated for ${guestName}! OTP: ${formattedOtp}`);
  };

  const handleCreateComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `TK-${Math.floor(9000 + Math.random() * 1000)}`;
    setTicketsList([
      { id: newId, subject: complaintSubject, category: complaintCategory, desc: complaintDesc, priority: complaintPriority, status: 'In Progress', assignedTo: 'Assigned to Facility Staff', sla: '2 Hours SLA', date: 'Just Now', rating: null },
      ...ticketsList
    ]);
    alert(`Helpdesk Ticket ${newId} submitted! Plumber / Technician dispatched.`);
  };

  const handleRatingTicket = (ticketId: string, stars: number) => {
    setTicketsList(prev => prev.map(t => t.id === ticketId ? { ...t, rating: stars } : t));
  };

  const handleConfirmAmenityBooking = () => {
    if (!selectedSlot) return;
    const newId = `BK-${Math.floor(200 + Math.random() * 800)}`;
    setMyBookings([
      { id: newId, amenity: selectedAmenity, slot: selectedSlot, date: bookingDate, status: 'Confirmed', type: amenityTab === 'courts' ? 'Sports' : 'Hall' },
      ...myBookings
    ]);
    alert(`Booking Confirmed for ${selectedAmenity} on ${bookingDate} (${selectedSlot})!`);
  };

  const handleVotePoll = (optionId: number) => {
    if (poll1Voted !== null) return;
    setPoll1Voted(optionId);
    setPoll1Results(prev => prev.map(opt => opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt));
  };

  const navItems = [
    { id: 'dashboard', label: 'Overview & Telemetry', icon: Home },
    { id: 'paying_bills', label: 'Paying Bills', icon: CreditCard },
    { id: 'approve_visitors', label: 'Approve Visitors', icon: ShieldCheck },
    { id: 'raise_complaints', label: 'Raise Complaints', icon: Wrench },
    { id: 'book_amenity', label: 'Book Anything (Courts & Halls)', icon: Calendar },
    { id: 'announcements_events', label: 'Announcements & Events', icon: Megaphone },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F6F3EC]">
      
      {/* MOBILE TOP BAR WITH HAMBURGER TOGGLE */}
      <div className="md:hidden bg-[#1C352C] text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#F6F3EC] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1C352C]" />
          </div>
          <div>
            <div className="serif-title text-base text-[#F6F3EC]">Green Haven</div>
            <div className="text-[9px] font-bold text-[#9DBEB2] uppercase tracking-widest">Resident App</div>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-[#12241D] text-[#9DBEB2] border border-[#2A4C3F]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* SIDEBAR (Responsive Mobile Drawer + Desktop Sidebar) */}
      <aside className={`modern-sidebar w-full md:w-72 md:min-w-[280px] text-white p-6 shrink-0 flex flex-col justify-between md:min-h-screen z-20 transition-all ${
        mobileMenuOpen ? 'block' : 'hidden md:flex'
      }`}>
        <div className="space-y-6">
          <div className="hidden md:flex items-center gap-3 pb-5 border-b border-[#2A4C3F]">
            <div className="w-10 h-10 rounded-full bg-[#F6F3EC] flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 rounded-full bg-[#1C352C]" />
            </div>
            <div>
              <div className="serif-title text-xl text-[#F6F3EC] tracking-wide">Green Haven</div>
              <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#9DBEB2]">
                Resident Portal
              </div>
            </div>
          </div>

          <div className="bg-[#12241D] p-4 rounded-2xl border border-[#2A4C3F] flex items-center gap-3.5 shadow-inner">
            <div className="w-10 h-10 rounded-xl bg-[#627636] text-white font-bold text-sm flex items-center justify-center shadow-md">
              AS
            </div>
            <div>
              <div className="font-bold text-white text-xs">Ananya Sharma</div>
              <div className="text-[11px] text-[#9DBEB2]">Flat A-402 • 2BHK</div>
            </div>
          </div>

          <nav className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9DBEB2] px-2 block mb-2">
              Menu Functions
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id as ResidentPageId);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-[#627636] text-white shadow-lg font-bold'
                      : 'text-[#E4EFEA] hover:bg-[#2A4C3F]/50 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#9DBEB2]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#2A4C3F] space-y-3 mt-6">
          <button
            onClick={onExit}
            className="w-full py-3 bg-[#627636] hover:bg-[#52632B] text-white serif-title text-xs tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>EXIT TO ALL PORTALS</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto max-w-6xl w-full">
        
        {/* PAGE 1: Dashboard */}
        {activePage === 'dashboard' && (
          <div className="space-y-6">
            <div className="modern-card p-5 sm:p-6 border-red-300 bg-gradient-to-r from-red-100/70 to-[#F6F3EC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider block flex items-center gap-1">
                  <Flame className="w-4 h-4 text-red-600 animate-pulse" />
                  Emergency Panic Alert System
                </span>
                <h3 className="font-bold text-[#172D25] text-base mt-1">One-Tap Siren & Guard Patrol Dispatch</h3>
              </div>
              <button
                onClick={() => setSosActive(!sosActive)}
                className={`w-full sm:w-20 h-16 sm:h-20 rounded-2xl font-black text-xs shrink-0 flex flex-col items-center justify-center gap-1 shadow-lg transition-transform ${
                  sosActive ? 'bg-red-600 text-white animate-bounce' : 'bg-[#1C352C] text-white'
                }`}
              >
                <Flame className="w-6 h-6" />
                <span>{sosActive ? 'ACTIVE' : 'SOS'}</span>
              </button>
            </div>

            <ResidentAnalytics />
          </div>
        )}

        {/* PAGE 2: Paying Bills */}
        {activePage === 'paying_bills' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Paying Bills & Society Dues</div>
            
            <div className="modern-card p-5 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#DED8C8] pb-4">
                <div>
                  <span className="text-xs font-bold text-[#627636] uppercase tracking-wider block">Billing Cycle</span>
                  <div className="serif-title text-xl sm:text-2xl text-[#172D25]">August 2026 Statement</div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  billStatus === 'Paid' ? 'bg-[#627636] text-white' : 'bg-amber-200 text-amber-900 border border-amber-400'
                }`}>
                  Status: {billStatus.toUpperCase()}
                </span>
              </div>

              <div className="bg-[#F6F3EC] p-4 sm:p-5 rounded-2xl border border-[#DED8C8] space-y-3 text-xs">
                <div className="flex justify-between text-slate-700"><span>Maintenance (2BHK 1,250 sqft @ ₹3.50)</span><span className="font-bold">₹ 3,200</span></div>
                <div className="flex justify-between text-slate-700"><span>Sinking Fund Contribution</span><span className="font-bold">₹ 500</span></div>
                <div className="flex justify-between text-slate-700"><span>Piped Water Usage (320 L/day avg)</span><span className="font-bold">₹ 400</span></div>
                <div className="flex justify-between text-slate-700"><span>GST Tax (18%)</span><span className="font-bold">₹ 666</span></div>
                <div className="border-t border-[#DED8C8] pt-3 flex justify-between font-black text-sm text-[#172D25]">
                  <span>Total Amount Payable</span>
                  <span className="text-[#627636] text-base sm:text-lg">₹ 4,766</span>
                </div>
              </div>

              {billStatus === 'Unpaid' ? (
                <button onClick={() => setBillStatus('Paid')} className="w-full py-4 bg-[#627636] hover:bg-[#52632B] text-white serif-title text-xs tracking-wider rounded-xl shadow-lg">
                  PAY ₹4,766 VIA UPI AUTOPAY / NETBANKING
                </button>
              ) : (
                <div className="bg-[#9DBEB2]/40 border border-[#627636] p-4 rounded-2xl text-center space-y-2">
                  <div className="text-sm font-bold text-[#172D25]">✓ Bill Paid Successfully (Receipt #GST-9021)</div>
                  <button onClick={() => alert('Downloading GST Invoice PDF...')} className="px-4 py-2 bg-[#627636] text-white font-bold rounded-xl text-xs flex items-center gap-1 mx-auto">
                    <Download className="w-3.5 h-3.5" /> Download Tax Invoice PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PAGE 3: Approve Visitors */}
        {activePage === 'approve_visitors' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Approve Visitors & Pre-Guest Passes</div>
            
            {/* Unannounced Visitors */}
            <div className="modern-card p-5 sm:p-8 space-y-4">
              <span className="text-xs font-bold text-[#627636] uppercase tracking-wider block">1. Gate Entry Push Approvals</span>
              <div className="space-y-3">
                {unannouncedVisitors.map((vis) => (
                  <div key={vis.id} className="bg-[#F6F3EC] p-4 rounded-2xl border border-[#DED8C8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-[#172D25] text-sm">{vis.name}</div>
                      <div className="text-slate-600">{vis.gate} • {vis.time}</div>
                    </div>
                    {vis.status === 'Pending' ? (
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button onClick={() => handleVisitorDecision(vis.id, 'Approved')} className="flex-1 sm:flex-initial px-4 py-2 bg-[#627636] text-white font-bold rounded-xl shadow">Approve</button>
                        <button onClick={() => handleVisitorDecision(vis.id, 'Denied')} className="flex-1 sm:flex-initial px-4 py-2 bg-[#1C352C] text-white font-bold rounded-xl shadow">Deny</button>
                      </div>
                    ) : (
                      <span className="bg-[#9DBEB2]/40 px-3 py-1 rounded-xl font-bold text-[#172D25]">{vis.status}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pre-Approve Guest Pass Generator */}
            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <span className="font-bold text-[#627636] uppercase tracking-wider block flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-[#627636]" />
                2. Pre-Approve Guest Pass Generator (QR Code & OTP)
              </span>

              <form onSubmit={handleCreatePreApprovedPass} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#172D25] block mb-1">Guest Full Name</label>
                    <input type="text" required value={guestName} onChange={(e) => setGuestName(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                  </div>
                  <div>
                    <label className="font-bold text-[#172D25] block mb-1">Guest Mobile Number</label>
                    <input type="tel" required value={guestMobile} onChange={(e) => setGuestMobile(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#172D25] block mb-1">Expected Arrival Time</label>
                    <input type="text" required value={guestArrival} onChange={(e) => setGuestArrival(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                  </div>
                  <div>
                    <label className="font-bold text-[#172D25] block mb-1">Purpose of Visit</label>
                    <input type="text" value={guestPurpose} onChange={(e) => setGuestPurpose(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-[#627636] hover:bg-[#52632B] text-white serif-title text-xs tracking-wider rounded-xl shadow-lg">
                  GENERATE FAST PASS QR CODE & ENTRY OTP
                </button>
              </form>

              {/* Visual Generated Pass Badge */}
              {generatedPass && (
                <div className="bg-[#1C352C] text-white p-6 rounded-3xl space-y-4 shadow-xl border border-[#2A4C3F]">
                  <div className="flex justify-between items-center border-b border-[#2A4C3F] pb-3">
                    <span className="serif-title text-lg text-[#F6F3EC]">FAST PASS BADGE</span>
                    <span className="bg-[#627636] px-3 py-1 rounded-full text-[10px] font-bold">VALID TODAY</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-28 h-28 bg-white p-2 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-inner">
                      <QrCode className="w-20 h-20 text-[#172D25]" />
                      <span className="text-[9px] font-mono font-bold text-slate-800 mt-1">SCAN AT GATE</span>
                    </div>

                    <div className="space-y-1.5 text-center sm:text-left">
                      <div className="text-[#9DBEB2] text-[11px]">6-DIGIT ENTRY OTP PASSCODE</div>
                      <div className="font-mono text-3xl font-black tracking-widest text-[#F6F3EC]">{generatedPass.otp}</div>
                      <div className="font-bold text-sm text-white pt-1">{generatedPass.name} ({generatedPass.mobile})</div>
                      <div className="text-slate-300 text-xs">{generatedPass.purpose} • {generatedPass.arrival}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PAGE 4: Raise Complaints */}
        {activePage === 'raise_complaints' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Raise Complaints & SLA Tracker</div>
            
            <div className="modern-card p-5 sm:p-8 space-y-4">
              <span className="text-xs font-bold text-[#627636] uppercase tracking-wider block">1. Raise New Helpdesk Ticket</span>
              
              <form onSubmit={handleCreateComplaint} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-[#172D25] block mb-1">Issue Subject</label>
                    <input type="text" required value={complaintSubject} onChange={(e) => setComplaintSubject(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                  </div>
                  <div>
                    <label className="font-bold text-[#172D25] block mb-1">Category</label>
                    <select value={complaintCategory} onChange={(e) => setComplaintCategory(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]">
                      <option value="Plumbing">Plumbing Maintenance</option>
                      <option value="Electrical">Electrical Repairs</option>
                      <option value="Carpentry">Carpentry & Door Lock</option>
                      <option value="Housekeeping">Housekeeping & Waste</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-[#172D25] block mb-1">Priority Level</label>
                    <select value={complaintPriority} onChange={(e) => setComplaintPriority(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]">
                      <option value="High">High (Immediate Action)</option>
                      <option value="Medium">Medium (Within 4 Hours)</option>
                      <option value="Low">Low (Scheduled Visit)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#172D25] block mb-1">Detailed Description</label>
                  <textarea value={complaintDesc} onChange={(e) => setComplaintDesc(e.target.value)} rows={3} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                </div>

                <button type="submit" className="w-full py-4 bg-[#627636] hover:bg-[#52632B] text-white serif-title text-xs tracking-wider rounded-xl shadow-lg">
                  SUBMIT TICKET & DISPATCH TECHNICIAN
                </button>
              </form>
            </div>

            {/* Previous & Active Tickets Register */}
            <div className="modern-card p-5 sm:p-8 space-y-4">
              <span className="text-xs font-bold text-[#627636] uppercase tracking-wider block">
                2. Previous & Active Tickets Directory ({ticketsList.length} Tickets Logged)
              </span>

              <div className="space-y-3 text-xs">
                {ticketsList.map((t) => (
                  <div key={t.id} className="bg-[#F6F3EC] p-5 rounded-2xl border border-[#DED8C8] space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-[#172D25] text-base">{t.subject} ({t.id})</div>
                        <div className="text-slate-600">{t.desc} • Category: <strong>{t.category}</strong></div>
                        <div className="text-slate-500 text-[11px]">Logged: {t.date} • Assigned: {t.assignedTo}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full font-bold text-[10px] ${
                        t.status === 'In Progress' ? 'bg-amber-200 text-amber-900 border border-amber-400' : 'bg-[#627636] text-white'
                      }`}>
                        {t.status} ({t.sla})
                      </span>
                    </div>

                    {t.status === 'Resolved' && (
                      <div className="border-t border-[#DED8C8] pt-2 flex items-center justify-between">
                        <span className="text-slate-700 font-bold">Rate Technician Service:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => handleRatingTicket(t.id, star)}
                              className={`p-1 rounded ${t.rating && t.rating >= star ? 'text-amber-500 font-black' : 'text-slate-400'}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 5: Book Anything */}
        {activePage === 'book_amenity' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Book Anything (Courts, Gym & Halls)</div>
            
            {/* Category Selector Tabs */}
            <div className="flex gap-2 border-b border-[#DED8C8] pb-3 text-xs font-bold">
              <button
                onClick={() => setAmenityTab('courts')}
                className={`px-4 py-2 rounded-xl transition-all ${amenityTab === 'courts' ? 'bg-[#627636] text-white shadow' : 'bg-[#F6F3EC] text-slate-700'}`}
              >
                1. Sports Courts
              </button>
              <button
                onClick={() => setAmenityTab('gym')}
                className={`px-4 py-2 rounded-xl transition-all ${amenityTab === 'gym' ? 'bg-[#627636] text-white shadow' : 'bg-[#F6F3EC] text-slate-700'}`}
              >
                2. Gym Membership & Trainer
              </button>
              <button
                onClick={() => setAmenityTab('halls')}
                className={`px-4 py-2 rounded-xl transition-all ${amenityTab === 'halls' ? 'bg-[#627636] text-white shadow' : 'bg-[#F6F3EC] text-slate-700'}`}
              >
                3. Convention Hall & Pods
              </button>
            </div>

            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <span className="font-bold text-[#627636] uppercase tracking-wider block">Reserve Slot</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#172D25] block mb-1">Select Amenity</label>
                  <select value={selectedAmenity} onChange={(e) => setSelectedAmenity(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]">
                    <option value="Badminton Court 2 (Indoor)">Badminton Court 2 (Indoor Wooden)</option>
                    <option value="Tennis Court 1 (Synthetic)">Tennis Court 1 (Synthetic Surface)</option>
                    <option value="Squash Court 1">Squash Court 1 (Air Conditioned)</option>
                    <option value="Clubhouse Banquet Hall">Clubhouse Banquet Convention Hall (150 Guests)</option>
                    <option value="RWA Executive Meeting Pod">RWA Executive Meeting Pod (12 Seats)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#172D25] block mb-1">Reservation Date</label>
                  <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-[#172D25] block">Available Time Slots:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM'].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-xl border font-bold text-center text-[11px] transition-all ${
                        selectedSlot === slot ? 'bg-[#627636] text-white border-[#627636]' : 'bg-[#F6F3EC] text-slate-700 border-[#DED8C8]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleConfirmAmenityBooking} className="w-full py-4 bg-[#627636] hover:bg-[#52632B] text-white serif-title text-xs tracking-wider rounded-xl shadow-lg">
                CONFIRM AMENITY RESERVATION ({selectedSlot})
              </button>
            </div>

            {/* My Active Reservations Register */}
            <div className="modern-card p-5 sm:p-8 space-y-4">
              <span className="text-xs font-bold text-[#627636] uppercase tracking-wider block">My Active Reservations ({myBookings.length} Bookings)</span>
              <div className="space-y-3 text-xs">
                {myBookings.map((b) => (
                  <div key={b.id} className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#172D25] text-sm">{b.amenity} ({b.id})</div>
                      <div className="text-slate-600">Date: {b.date} • Slot: {b.slot}</div>
                    </div>
                    <span className="bg-[#627636] text-white px-3 py-1 rounded-full font-bold text-[10px]">{b.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 6: Announcements & Events */}
        {activePage === 'announcements_events' && (
          <div className="space-y-6">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Announcements & Community Polls</div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Official Announcements */}
              <div className="lg:col-span-7 space-y-4">
                <div className="modern-card p-6 text-xs space-y-3">
                  <span className="bg-[#627636] text-white px-2.5 py-0.5 rounded font-bold text-[10px]">AGM EVENT CIRCULAR</span>
                  <div className="serif-title text-xl text-[#172D25]">Annual RWA General Body Meeting (AGM) & Elections</div>
                  <p className="text-slate-700 leading-relaxed">
                    The Annual AGM meeting for FY 2026-27 is scheduled for Sunday, August 30 at 10:00 AM in Clubhouse Banquet Hall. Financial audit approval & committee elections will be held.
                  </p>
                  
                  <div className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] flex justify-between items-center">
                    <span className="font-bold text-[#172D25]">RSVP Attendance:</span>
                    <button
                      onClick={() => setAgmRsvp(!agmRsvp)}
                      className={`px-4 py-2 rounded-xl font-bold ${agmRsvp ? 'bg-[#627636] text-white' : 'bg-slate-200 text-slate-700'}`}
                    >
                      {agmRsvp ? '✓ Attending AGM' : 'RSVP Now'}
                    </button>
                  </div>
                </div>

                <div className="modern-card p-6 text-xs space-y-2">
                  <span className="bg-amber-600 text-white px-2.5 py-0.5 rounded font-bold text-[10px]">MAINTENANCE NOTICE</span>
                  <div className="serif-title text-lg text-[#172D25]">Overhead Water Tank Sanitization Notice</div>
                  <p className="text-slate-600">Water supply will be paused on Tuesday from 10:00 AM to 02:00 PM for sanitization of all tower tanks.</p>
                </div>
              </div>

              {/* Right Top Column: Active Community Polls */}
              <div className="lg:col-span-5 space-y-4">
                <div className="modern-card p-6 text-xs space-y-4 border-amber-300">
                  <div className="flex items-center gap-1.5 text-amber-800 font-bold uppercase tracking-wider">
                    <Vote className="w-4 h-4 text-amber-600" />
                    Active Community Poll
                  </div>
                  
                  <div className="serif-title text-base text-[#172D25]">
                    Which Swimming Pool Maintenance Agency should RWA hire for FY 2026-27?
                  </div>

                  <div className="space-y-3 pt-1">
                    {poll1Results.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => handleVotePoll(opt.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          poll1Voted === opt.id ? 'bg-[#627636] text-white border-[#627636]' : 'bg-[#F6F3EC] text-slate-800 border-[#DED8C8]'
                        }`}
                      >
                        <div className="flex justify-between font-bold text-xs mb-1">
                          <span>{opt.option}</span>
                          <span>{opt.percent}% ({opt.votes} Votes)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#627636]" style={{ width: `${opt.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

    </div>
  );
};
