import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Bell, Calendar, Camera, Check, CheckCircle2, ChevronRight, Clock, 
  CreditCard, Download, Droplets, Dumbbell, FileText, Filter, Flame, Folder, FolderOpen, 
  Gauge, HandHeart, Heart, Headphones, History, Home, IndianRupee, LifeBuoy, 
  Lock, LogOut, Mail, MapPin, Megaphone, Menu, MessageCircle, MessageSquare, Music, 
  Newspaper, Package, PartyPopper, Phone, Plus, QrCode, Search, Send, Share2, Shield, 
  ShieldAlert, ShieldCheck, Snowflake, Sparkles, Star, Tag, Trash2, Trophy, Truck, 
  User, UserCheck, UserPlus, Users, Vote, Waves, Wifi, Wrench, X, XCircle, Zap, Contact, Building2,
  CheckCheck, Percent, RefreshCw, Smartphone, Landmark, ShieldCheck as SecureIcon,
  AlertCircle, Car, Coffee, ShieldX, UserX, PhoneCall
} from 'lucide-react';

interface ResidentPortalProps {
  onExit: () => void;
}

type ResidentNavSection = 
  | 'overview'
  | 'visitors_parcels'
  | 'helpers'
  | 'members'
  | 'notices'
  | 'helpdesk'
  | 'documents'
  | 'directory'
  | 'payments'
  | 'amenities'
  | 'events'
  | 'social'
  | 'chats';

interface GateApprovalRequest {
  id: string;
  name: string;
  category: 'delivery' | 'cab' | 'guest' | 'service';
  company?: string;
  orderNo?: string;
  vehicle: string;
  phone: string;
  gate: string;
  guardName: string;
  time: string;
  avatarEmoji: string;
  status: 'pending' | 'allowed' | 'denied' | 'left_at_gate';
}

export const ResidentPortal: React.FC<ResidentPortalProps> = ({ onExit }) => {
  // Navigation State
  const [activeSection, setActiveSection] = useState<ResidentNavSection>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Notification Toast Banner
  const [showNotificationToast, setShowNotificationToast] = useState<boolean>(false);

  // SOS Alarm Modal
  const [showSosModal, setShowSosModal] = useState<boolean>(false);
  const [sosTriggered, setSosTriggered] = useState<boolean>(false);

  // =========================================================================
  // LIVE GATE APPROVAL REQUESTS ENGINE (Blinkit, Swiggy, Guests at Gate)
  // =========================================================================
  const [incomingGateRequests, setIncomingGateRequests] = useState<GateApprovalRequest[]>([
    {
      id: 'GATE-REQ-101',
      name: 'Rajesh Kumar',
      category: 'delivery',
      company: 'Blinkit 10-Min Delivery',
      orderNo: '#BK-90214',
      vehicle: 'TS-08-EM-4921 (Electric 2-Wheeler)',
      phone: '98765 12099',
      gate: 'Gate 1 Security Barrier',
      guardName: 'Guard Vikram Singh',
      time: 'Just Now (11:45 AM)',
      avatarEmoji: '⚡',
      status: 'pending',
    }
  ]);

  // Pre-Approve Visitor Modal
  const [showPreApproveModal, setShowPreApproveModal] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('Siddharth Verma');
  const [guestPhone, setGuestPhone] = useState<string>('98765 43210');
  const [guestArrival, setGuestArrival] = useState<string>('Today at 04:30 PM');
  const [guestPurpose, setGuestPurpose] = useState<string>('Dinner Guest');
  const [generatedPass, setGeneratedPass] = useState<{ otp: string; name: string; mobile: string; arrival: string } | null>(null);

  // Modern Billing State
  const [billStatus, setBillStatus] = useState<'Unpaid' | 'Paid'>('Unpaid');
  const [earlyBirdApplied, setEarlyBirdApplied] = useState<boolean>(true);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [paymentStep, setPaymentStep] = useState<'idle' | 'processing' | 'success'>('idle');
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>('GPay');
  const [selectedBank, setSelectedBank] = useState<string>('HDFC Bank');
  
  // Card Input State
  const [cardNumber, setCardNumber] = useState<string>('4532 8901 2345 9012');
  const [cardHolder, setCardHolder] = useState<string>('ANANYA SHARMA');
  const [cardExpiry, setCardExpiry] = useState<string>('08/29');
  const [cardCvv, setCardCvv] = useState<string>('892');

  // Pre-Paid Meter State
  const [meterBalance, setMeterBalance] = useState<number>(-22.47);
  const [showRechargeModal, setShowRechargeModal] = useState<boolean>(false);
  const [rechargeAmount, setRechargeAmount] = useState<number>(1000);
  const [autopayEnabled, setAutopayEnabled] = useState<boolean>(true);

  // Billing Calculation
  const baseMaintenance = 3200;
  const sinkingFund = 500;
  const waterUsage = 400;
  const dgBackup = 75.60;
  const amenityMaintenance = 150;
  const gstTax = 666;
  const earlyBirdDiscount = earlyBirdApplied ? 238.30 : 0;
  const totalPayable = (baseMaintenance + sinkingFund + waterUsage + dgBackup + amenityMaintenance + gstTax - earlyBirdDiscount);

  // Past Invoices Vault
  const [pastInvoicesList, setPastInvoicesList] = useState([
    { id: 'INV-AUG-2026', month: 'August 2026', amount: '₹ 4,753.30', status: billStatus, date: billStatus === 'Paid' ? 'Today' : 'Due 31 Aug 2026', receipt: 'GST-9021', mode: 'UPI Autopay' },
    { id: 'INV-JUL-2026', month: 'July 2026', amount: '₹ 4,766.00', status: 'Paid', date: '04 Jul 2026', receipt: 'GST-8412', mode: 'Netbanking (HDFC)' },
    { id: 'INV-JUN-2026', month: 'June 2026', amount: '₹ 4,766.00', status: 'Paid', date: '02 Jun 2026', receipt: 'GST-7711', mode: 'Credit Card (Visa)' },
  ]);

  // Pre-approved passes list
  const [preApprovedList, setPreApprovedList] = useState([
    { id: 'PASS-8921', name: 'Siddharth Verma', mobile: '98765 43210', arrival: 'Today 04:30 PM', otp: '892-104', status: 'Active (Valid)', type: 'Guest Pass' },
    { id: 'PASS-8810', name: 'Sunita Rao (Family)', mobile: '98123 55443', arrival: 'Tomorrow 10:00 AM', otp: '410-992', status: 'Scheduled', type: 'Guest Pass' },
  ]);

  // Parcels list
  const [parcelsList, setParcelsList] = useState([
    { id: 'PAR-101', courier: 'Amazon Courier', orderNo: '#AZ-9021', shelf: 'Gate Shelf B-4', arrival: '11:20 AM Today', status: 'Awaiting Pickup', otp: '4091' },
    { id: 'PAR-102', courier: 'Swiggy InstaMart', orderNo: '#SW-4912', shelf: 'Cold Storage Locker #02', arrival: '11:32 AM Today', status: 'Awaiting Pickup', otp: '8821' },
  ]);

  // Household Active Helpers
  const [myHelpersList, setMyHelpersList] = useState([
    { id: 'HLP-01', name: 'Sunita Devi', role: 'Daily Housekeeping Maid', phone: '98765 99887', status: 'Inside Society (Gate 1)', time: '09:15 AM - 01:00 PM', rating: '4.9 ★', salary: '₹ 3,500/mo' },
    { id: 'HLP-02', name: 'Ramesh Kumar', role: 'Morning Cook', phone: '98123 44556', status: 'Checked Out', time: '07:00 AM - 09:00 AM', rating: '4.8 ★', salary: '₹ 5,000/mo' },
  ]);

  // 13 Service Categories
  const helperCategories = [
    { id: 'rent_sell', name: 'Rent/Sell', count: 1, icon: Tag, color: 'text-slate-700', bg: 'bg-slate-100' },
    { id: 'wifi', name: 'Wifi/Internet', count: 2, icon: Wifi, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'ac', name: 'AC', count: 0, icon: Snowflake, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { id: 'cleaning', name: 'Cleaning', count: 8, icon: Sparkles, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'water', name: 'Water Supply', count: 3, icon: Droplets, color: 'text-sky-600', bg: 'bg-sky-50' },
    { id: 'gym', name: 'Gym Trainer', count: 2, icon: Dumbbell, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'swimming', name: 'Swimming Instructor', count: 1, icon: Waves, color: 'text-teal-600', bg: 'bg-teal-50' },
    { id: 'music', name: 'Music Coach', count: 4, icon: Music, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'sports', name: 'Sports Coach', count: 2, icon: Trophy, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'milk', name: 'Milk', count: 24, icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'newspaper', name: 'Newspaper', count: 0, icon: Newspaper, color: 'text-slate-600', bg: 'bg-slate-100' },
    { id: 'flowers', name: 'Flowers', count: 0, icon: Sparkles, color: 'text-rose-600', bg: 'bg-rose-50' },
    { id: 'packers', name: 'Packers & Movers', count: 0, icon: Truck, color: 'text-zinc-600', bg: 'bg-zinc-100' },
  ];

  // Category Providers Directory
  const providersByCategory: Record<string, Array<{ name: string; exp: string; rating: string; reviews: number; flats: number; phone: string; rate: string }>> = {
    Cleaning: [
      { name: 'Sunita Devi', exp: '4 Years in Community', rating: '4.9 ★', reviews: 42, flats: 8, phone: '98765 99887', rate: '₹3,500/month' },
      { name: 'Kavita Kumari', exp: '3 Years in Community', rating: '4.8 ★', reviews: 29, flats: 6, phone: '98123 77665', rate: '₹3,200/month' },
      { name: 'Laxmi Shinde', exp: '5 Years in Community', rating: '5.0 ★', reviews: 68, flats: 11, phone: '98450 33441', rate: '₹3,800/month' },
    ],
    'Water Supply': [
      { name: 'AquaPure Mineral Cans (Bisleri 20L)', exp: 'Daily 7 AM & 4 PM Supply', rating: '4.9 ★', reviews: 140, flats: 65, phone: '98220 11990', rate: '₹80/Can' },
      { name: 'Himalayan Spring Water Service', exp: 'Doorstep Delivery', rating: '4.8 ★', reviews: 88, flats: 34, phone: '98111 00223', rate: '₹90/Can' },
    ],
    'Gym Trainer': [
      { name: 'Coach Rohit Verma (Certified ACSM)', exp: '8 Years Experience', rating: '5.0 ★', reviews: 38, flats: 14, phone: '98700 12345', rate: '₹4,500/month' },
    ],
  };

  // Helpdesk Tickets
  const [ticketsList, setTicketsList] = useState([
    { id: 'TK-9021', subject: 'Kitchen Sink Drainage Pipe Water Leakage', category: 'Plumbing', desc: 'Water leaking under the kitchen sink cabinet continuously.', priority: 'High', status: 'In Progress', assignedTo: 'Ramesh Plumber (Ph: 98123 99887)', sla: '1h 45m remaining', date: 'Today 10:15 AM', rating: null as number | null },
  ]);

  const [newTicketSubject, setNewTicketSubject] = useState<string>('');
  const [newTicketCategory, setNewTicketCategory] = useState<string>('Plumbing');
  const [newTicketPriority, setNewTicketPriority] = useState<string>('High');
  const [newTicketDesc, setNewTicketDesc] = useState<string>('');

  // Search State
  const [categorySearchQuery, setCategorySearchQuery] = useState<string>('');

  // =========================================================================
  // GATE ENTRY APPROVAL ACTIONS
  // =========================================================================
  const handleAllowGateEntry = (reqId: string) => {
    const req = incomingGateRequests.find(r => r.id === reqId);
    if (!req) return;
    setIncomingGateRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'allowed' } : r));
    alert(`ENTRY ALLOWED ✓\nGate 1 barrier opened for ${req.name} (${req.company || req.category}). Guard ${req.guardName} notified!`);
  };

  const handleLeaveAtGate = (reqId: string) => {
    const req = incomingGateRequests.find(r => r.id === reqId);
    if (!req) return;
    setIncomingGateRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'left_at_gate' } : r));
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setParcelsList(prev => [
      { id: `PAR-${Math.floor(200 + Math.random() * 100)}`, courier: req.company || 'Gate Delivery', orderNo: req.orderNo || '#ORD-892', shelf: 'Gate Shelf Locker #B-1', arrival: 'Just Now', status: 'Awaiting Pickup', otp: randomOtp },
      ...prev
    ]);
    alert(`PARCEL ACCEPTED AT GATE ✓\nInstructed Guard ${req.guardName} to place ${req.company} package at Shelf Locker #B-1. Pickup Passcode: ${randomOtp}`);
  };

  const handleDenyGateEntry = (reqId: string) => {
    const req = incomingGateRequests.find(r => r.id === reqId);
    if (!req) return;
    setIncomingGateRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'denied' } : r));
    alert(`ENTRY DENIED ❌\nInformed Guard ${req.guardName} that ${req.name} is not permitted to enter.`);
  };

  // Simulators
  const handleSimulateArrival = (type: 'blinkit' | 'swiggy' | 'guest' | 'cab') => {
    let newReq: GateApprovalRequest;
    if (type === 'blinkit') {
      newReq = {
        id: `GATE-REQ-${Math.floor(100 + Math.random() * 900)}`,
        name: 'Sunil Verma',
        category: 'delivery',
        company: 'Blinkit 10-Min Delivery',
        orderNo: `#BK-${Math.floor(10000 + Math.random() * 90000)}`,
        vehicle: 'TS-07-EA-9912 (EV Bike)',
        phone: '98123 45678',
        gate: 'Gate 1 Main Gate',
        guardName: 'Guard Vikram Singh',
        time: 'Just Now',
        avatarEmoji: '⚡',
        status: 'pending',
      };
    } else if (type === 'swiggy') {
      newReq = {
        id: `GATE-REQ-${Math.floor(100 + Math.random() * 900)}`,
        name: 'Mahesh Reddy',
        category: 'delivery',
        company: 'Swiggy Food / Instamart',
        orderNo: `#SW-${Math.floor(10000 + Math.random() * 90000)}`,
        vehicle: 'AP-09-CD-3321 (Hero Splendor)',
        phone: '98450 77889',
        gate: 'Gate 1 Main Gate',
        guardName: 'Guard Ramu',
        time: 'Just Now',
        avatarEmoji: '🍕',
        status: 'pending',
      };
    } else if (type === 'cab') {
      newReq = {
        id: `GATE-REQ-${Math.floor(100 + Math.random() * 900)}`,
        name: 'Driver Alok (Uber Premier)',
        category: 'cab',
        company: 'Uber Cab Pickup',
        vehicle: 'KA-01-MJ-8819 (White Dzire)',
        phone: '98900 11223',
        gate: 'Gate 2 Rear Gate',
        guardName: 'Guard Suraj',
        time: 'Just Now',
        avatarEmoji: '🚗',
        status: 'pending',
      };
    } else {
      newReq = {
        id: `GATE-REQ-${Math.floor(100 + Math.random() * 900)}`,
        name: 'Venkatesh Rao (Uncle / Relative)',
        category: 'guest',
        company: 'Family Guest at Gate',
        vehicle: 'TS-09-GA-1002 (Honda City)',
        phone: '98700 33445',
        gate: 'Gate 1 Main Gate',
        guardName: 'Guard Vikram Singh',
        time: 'Just Now',
        avatarEmoji: '👨‍👩‍👦',
        status: 'pending',
      };
    }

    setIncomingGateRequests(prev => [newReq, ...prev]);
    setActiveSection('overview');
  };

  // Other Handlers
  const handlePreApproveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const formattedOtp = `${randomOtp.slice(0, 3)}-${randomOtp.slice(3)}`;
    const passObj = { otp: formattedOtp, name: guestName, mobile: guestPhone, arrival: guestArrival };
    setGeneratedPass(passObj);
    setPreApprovedList([
      { id: `PASS-${Math.floor(8000 + Math.random() * 1000)}`, name: guestName, mobile: guestPhone, arrival: guestArrival, otp: formattedOtp, status: 'Active (Valid)', type: 'Guest Pass' },
      ...preApprovedList
    ]);
  };

  const handleRechargeMeter = () => {
    setMeterBalance(prev => prev + rechargeAmount);
    setShowRechargeModal(false);
    alert(`Pre-paid Meter Recharged with ₹${rechargeAmount}! New Balance: ₹${(meterBalance + rechargeAmount).toFixed(2)}`);
  };

  const handleExecutePayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
      setBillStatus('Paid');
      setPastInvoicesList(prev => prev.map(inv => inv.id === 'INV-AUG-2026' ? { ...inv, status: 'Paid', date: 'Today (Just Now)', mode: paymentMethod.toUpperCase() } : inv));
    }, 1500);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject) return;
    const newId = `TK-${Math.floor(9000 + Math.random() * 1000)}`;
    setTicketsList([
      { id: newId, subject: newTicketSubject, category: newTicketCategory, desc: newTicketDesc || 'Reported via Resident Web ERP', priority: newTicketPriority, status: 'In Progress', assignedTo: 'Assigned to Facility Duty Tech', sla: '2 Hours SLA', date: 'Just Now', rating: null },
      ...ticketsList
    ]);
    setNewTicketSubject('');
    setNewTicketDesc('');
    alert(`Ticket ${newId} created successfully! Duty Technician dispatched.`);
  };

  const pendingCount = incomingGateRequests.filter(r => r.status === 'pending').length;

  const navMenuItems = [
    { id: 'overview', label: 'Overview Dashboard', icon: Home, badge: pendingCount > 0 ? `${pendingCount} at Gate` : undefined, badgeColor: 'bg-red-500 text-white animate-pulse' },
    { id: 'visitors_parcels', label: 'Visitors & Gate Approvals', icon: Shield, badge: pendingCount > 0 ? `${pendingCount}` : undefined },
    { id: 'payments', label: 'Paying Bills & Meters', icon: CreditCard, badge: billStatus === 'Unpaid' ? 'Due' : undefined },
    { id: 'helpers', label: 'Helpers & Services (13 Categories)', icon: HandHeart },
    { id: 'members', label: 'Members & Vehicles', icon: Users },
    { id: 'notices', label: 'Society Notices (23 Unread)', icon: FileText, badge: '23' },
    { id: 'helpdesk', label: 'Helpdesk Tickets', icon: Headphones, badge: '1' },
    { id: 'documents', label: 'Society Documents (8 Files)', icon: Folder },
    { id: 'directory', label: 'Resident & Gate Directory', icon: Contact },
    { id: 'amenities', label: 'Amenities & Courts Booking', icon: Dumbbell },
    { id: 'events', label: 'Events & Festival Calendar', icon: PartyPopper },
    { id: 'social', label: 'Social & Community Polls', icon: Vote },
    { id: 'chats', label: 'Chats & Intercom Channels', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans antialiased flex flex-col selection:bg-[#0F172A] selection:text-white">
      
      {/* ========================================================================= */}
      {/* TOP DESKTOP HEADER BAR */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200 px-6 sm:px-10 py-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand & Flat Identifier */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6366F1] to-[#818CF8] p-0.5 shadow-sm flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-2xl bg-[#525CEB] flex items-center justify-center text-white font-bold text-xl">
                <span>👨‍💼</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl text-slate-900 tracking-tight">Flat B-108</span>
                <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-bold">2BHK • Tower B</span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                ASBL Springs, Pocharam • Resident Portal
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3">
            {pendingCount > 0 && (
              <button
                onClick={() => setActiveSection('visitors_parcels')}
                className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-sm animate-bounce cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span>{pendingCount} Gate Approvals Waiting!</span>
              </button>
            )}

            <button
              onClick={() => setActiveSection('payments')}
              className={`px-4 py-2 rounded-2xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                billStatus === 'Unpaid' ? 'bg-amber-50 text-amber-900 border-amber-300' : 'bg-emerald-50 text-emerald-900 border-emerald-300'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>{billStatus === 'Unpaid' ? `Bill: ₹ ${totalPayable.toFixed(2)}` : 'Dues Cleared ✓'}</span>
            </button>

            <button
              onClick={() => setShowSosModal(true)}
              className="px-5 py-2.5 rounded-2xl bg-[#FEE2E2] hover:bg-[#FECACA] text-[#DC2626] border border-[#FCA5A5]/80 flex items-center gap-2 text-xs font-black shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-[#DC2626] animate-pulse" />
              <span>🚨 SOS PANIC ALARM</span>
            </button>

            <button
              onClick={onExit}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 text-xs font-bold shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* DESKTOP SIDEBAR + EXPANSIVE MAIN WORKSPACE */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col md:flex-row gap-6 p-6 sm:p-8">
        
        {/* DESKTOP LEFT SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-72 shrink-0 space-y-4">
          
          {/* Resident Profile Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                AS
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">Ananya Sharma</div>
                <div className="text-xs text-slate-500 font-medium">Primary Registered Owner</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-600">
              <span>Family: <strong>3 Members</strong></span>
              <span>Vehicle: <strong>KA-03-MB-4921</strong></span>
            </div>
          </div>

          {/* Gate Approval Quick Simulator */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-1">
              Simulate Gate Arrivals
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                onClick={() => handleSimulateArrival('blinkit')}
                className="p-2.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-900 font-bold rounded-xl border border-yellow-200 flex items-center gap-1.5 cursor-pointer"
              >
                <span>⚡ Blinkit</span>
              </button>
              <button
                onClick={() => handleSimulateArrival('swiggy')}
                className="p-2.5 bg-orange-50 hover:bg-orange-100 text-orange-900 font-bold rounded-xl border border-orange-200 flex items-center gap-1.5 cursor-pointer"
              >
                <span>🍕 Swiggy</span>
              </button>
              <button
                onClick={() => handleSimulateArrival('cab')}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl border border-slate-300 flex items-center gap-1.5 cursor-pointer"
              >
                <span>🚗 Uber Cab</span>
              </button>
              <button
                onClick={() => handleSimulateArrival('guest')}
                className="p-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold rounded-xl border border-indigo-200 flex items-center gap-1.5 cursor-pointer"
              >
                <span>👨‍👩‍👧 Guest at Gate</span>
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="bg-white p-3 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-2 block">
              Portal Sections
            </span>
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id as ResidentNavSection);
                    setSelectedCategory(null);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      item.badgeColor || (isActive ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-800')
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

        </aside>

        {/* ========================================================================= */}
        {/* EXPANSIVE MAIN DESKTOP CONTENT AREA */}
        {/* ========================================================================= */}
        <main className="flex-1 space-y-6">
          
          {/* ========================================================================= */}
          {/* PROMINENT LIVE INCOMING GATE APPROVAL BANNER (Blinkit, Swiggy, Guests) */}
          {/* ========================================================================= */}
          {incomingGateRequests.filter(r => r.status === 'pending').map((req) => (
            <div 
              key={req.id}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 p-6 rounded-3xl shadow-xl space-y-4 border-2 border-amber-300 animate-fade-in relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                
                {/* Visitor & Delivery Details */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white text-slate-900 flex items-center justify-center text-3xl shadow-md shrink-0">
                    <span>{req.avatarEmoji}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-950 text-amber-400 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider animate-pulse">
                        🚨 Ringing from Gate 1 Security
                      </span>
                      <span className="text-xs font-black text-slate-900">{req.time}</span>
                    </div>

                    <h3 className="font-black text-xl text-slate-950 tracking-tight mt-1">
                      {req.name} • <span className="underline">{req.company || req.category.toUpperCase()}</span>
                    </h3>

                    <div className="text-xs text-slate-900 font-bold flex flex-wrap items-center gap-3 mt-0.5">
                      {req.orderNo && <span>Order: <strong>{req.orderNo}</strong></span>}
                      <span>Vehicle: <strong>{req.vehicle}</strong></span>
                      <span>Phone: <strong>{req.phone}</strong></span>
                      <span>Logged by: <strong>{req.guardName}</strong></span>
                    </div>
                  </div>
                </div>

                {/* 1-Tap Quick Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 self-end sm:self-center">
                  
                  {/* Allow Entry */}
                  <button
                    onClick={() => handleAllowGateEntry(req.id)}
                    className="px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <CheckCheck className="w-4 h-4 text-emerald-400" />
                    <span>ALLOW ENTRY</span>
                  </button>

                  {/* Leave at Gate Shelf */}
                  <button
                    onClick={() => handleLeaveAtGate(req.id)}
                    className="px-4 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-indigo-600" />
                    <span>LEAVE AT GATE SHELF</span>
                  </button>

                  {/* Deny Entry */}
                  <button
                    onClick={() => handleDenyGateEntry(req.id)}
                    className="px-4 py-3 rounded-2xl bg-red-950 hover:bg-red-900 text-white font-black text-xs shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                  >
                    <UserX className="w-4 h-4 text-red-400" />
                    <span>DENY</span>
                  </button>

                </div>

              </div>
            </div>
          ))}

          {/* ========================================================================= */}
          {/* 1. OVERVIEW & DESKTOP DASHBOARD */}
          {/* ========================================================================= */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              
              {/* SECTION 1: MY HOME (Widescreen 3-Card Grid) */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block px-1">
                  MY HOME
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Card 1: Visitors */}
                  <button
                    onClick={() => setActiveSection('visitors_parcels')}
                    className="bg-white hover:bg-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between text-left transition-all hover:scale-[1.01] hover:shadow-md cursor-pointer group"
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] shadow-xs group-hover:scale-110 transition-transform">
                        <Shield className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        pendingCount > 0 ? 'bg-red-500 text-white animate-pulse' : 'text-[#4F46E5] bg-[#EEF2FF]'
                      }`}>
                        {pendingCount > 0 ? `${pendingCount} at Gate` : `${preApprovedList.length} Passes`}
                      </span>
                    </div>
                    <div>
                      <div className="font-extrabold text-base text-slate-900">Visitors & Gate Approvals</div>
                      <div className="text-xs text-slate-500 mt-1">Approve Blinkit, Swiggy, cabs, and unannounced guests</div>
                    </div>
                  </button>

                  {/* Card 2: Helpers */}
                  <button
                    onClick={() => setActiveSection('helpers')}
                    className="bg-white hover:bg-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between text-left transition-all hover:scale-[1.01] hover:shadow-md cursor-pointer group"
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#FCE7F3] flex items-center justify-center text-[#EC4899] shadow-xs group-hover:scale-110 transition-transform">
                        <HandHeart className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-[#EC4899] bg-[#FCE7F3] px-3 py-1 rounded-full">
                        13 Categories
                      </span>
                    </div>
                    <div>
                      <div className="font-extrabold text-base text-slate-900">Helpers & Services</div>
                      <div className="text-xs text-slate-500 mt-1">Hire maids, cooks, water supply, gym trainers</div>
                    </div>
                  </button>

                  {/* Card 3: Members */}
                  <button
                    onClick={() => setActiveSection('members')}
                    className="bg-white hover:bg-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between text-left transition-all hover:scale-[1.01] hover:shadow-md cursor-pointer group"
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 shadow-xs group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                        3 Registered
                      </span>
                    </div>
                    <div>
                      <div className="font-extrabold text-base text-slate-900">Members & Vehicles</div>
                      <div className="text-xs text-slate-500 mt-1">Family members, vehicle RFID FastTags, and parking slots</div>
                    </div>
                  </button>

                </div>
              </div>

              {/* SECTION 2: SOCIETY (Widescreen 4-Column Grid) */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block px-1">
                  SOCIETY
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Notices */}
                  <button
                    onClick={() => setActiveSection('notices')}
                    className="bg-white hover:bg-slate-50 p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4 text-left transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">Notices</div>
                      <div className="text-xs font-bold text-[#EF4444] mt-0.5">23 Unread Circulars</div>
                    </div>
                  </button>

                  {/* Helpdesk */}
                  <button
                    onClick={() => setActiveSection('helpdesk')}
                    className="bg-white hover:bg-slate-50 p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4 text-left transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Headphones className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">Helpdesk</div>
                      <div className="text-xs font-bold text-blue-600 mt-0.5">1 Ticket In Progress</div>
                    </div>
                  </button>

                  {/* Documents */}
                  <button
                    onClick={() => setActiveSection('documents')}
                    className="bg-white hover:bg-slate-50 p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4 text-left transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                      <Folder className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">Documents</div>
                      <div className="text-xs font-medium text-slate-500 mt-0.5">8 Society Files</div>
                    </div>
                  </button>

                  {/* Directory */}
                  <button
                    onClick={() => setActiveSection('directory')}
                    className="bg-white hover:bg-slate-50 p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4 text-left transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                      <Contact className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">Directory</div>
                      <div className="text-xs font-medium text-slate-500 mt-0.5">Gate Intercom & RWA</div>
                    </div>
                  </button>

                </div>
              </div>

              {/* SECTION 3: PAYMENTS & METERS (Widescreen 3-Card Grid) */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block px-1">
                  PAYMENTS & METERS
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Pre-paid Meter Card */}
                  <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                        <Gauge className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-base text-[#EF4444]">
                            ₹ {meterBalance.toFixed(2)}
                          </span>
                          {meterBalance < 0 && (
                            <span className="text-[10px] font-black text-[#DC2626] bg-[#FEE2E2] px-2 py-0.5 rounded-full">
                              Low Balance
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">Pre-paid Meter (EB)</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowRechargeModal(true)}
                      className="px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-transform active:scale-95 cursor-pointer"
                    >
                      Recharge
                    </button>
                  </div>

                  {/* Dues Card */}
                  <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                        <IndianRupee className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-black text-base text-slate-900">
                          {billStatus === 'Paid' ? 'All Clear ✓' : `₹ ${totalPayable.toFixed(2)} Due`}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">August Maintenance</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveSection('payments')}
                      className="px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-transform active:scale-95 cursor-pointer"
                    >
                      {billStatus === 'Paid' ? 'View Bill' : 'Pay Bill'}
                    </button>
                  </div>

                  {/* Payment History Card */}
                  <button
                    onClick={() => setActiveSection('payments')}
                    className="bg-white hover:bg-slate-50 p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                        <History className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">Payment History</div>
                        <div className="text-xs text-slate-500 font-medium">Past Statements & Tax Invoices</div>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </button>

                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. VISITORS, GATE APPROVALS & PARCELS FULL DESKTOP VIEW */}
          {/* ========================================================================= */}
          {activeSection === 'visitors_parcels' && (
            <div className="space-y-6">
              
              {/* Header Hero Banner */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] shadow-xs shrink-0">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Visitors & Gate Approvals</h2>
                    <p className="text-xs text-slate-500 mt-1">Approve incoming delivery drivers, cabs, and pre-authorize guest passes</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShowPreApproveModal(true)}
                    className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md transition-transform active:scale-95 cursor-pointer"
                  >
                    + Pre-approve Visitors
                  </button>
                </div>
              </div>

              {/* Live Gate Requests Section */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-base text-slate-900 block">Today's Gate Arrivals & Resident Decisions</span>
                  <span className="text-xs text-slate-500 font-medium">{incomingGateRequests.length} Arrivals Logged</span>
                </div>

                <div className="space-y-3 text-xs">
                  {incomingGateRequests.map((req) => (
                    <div 
                      key={req.id}
                      className={`p-5 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${
                        req.status === 'pending' 
                          ? 'bg-amber-50/80 border-amber-300' 
                          : req.status === 'allowed'
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : req.status === 'left_at_gate'
                          ? 'bg-indigo-50/60 border-indigo-200'
                          : 'bg-red-50/60 border-red-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white text-slate-900 flex items-center justify-center text-2xl shadow-xs border border-slate-200 shrink-0">
                          <span>{req.avatarEmoji}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{req.name}</span>
                            <span className="text-xs font-bold text-slate-600">({req.company || req.category})</span>
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                              req.status === 'pending'
                                ? 'bg-amber-500 text-slate-950 animate-pulse'
                                : req.status === 'allowed'
                                ? 'bg-emerald-200 text-emerald-900'
                                : req.status === 'left_at_gate'
                                ? 'bg-indigo-200 text-indigo-900'
                                : 'bg-red-200 text-red-900'
                            }`}>
                              {req.status === 'pending' ? 'Waiting Decision' : req.status.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            Vehicle: <strong>{req.vehicle}</strong> • Gate: <strong>{req.gate}</strong> • Guard: <strong>{req.guardName}</strong> • {req.time}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons if still pending */}
                      {req.status === 'pending' ? (
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => handleAllowGateEntry(req.id)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer"
                          >
                            Allow Entry
                          </button>
                          <button
                            onClick={() => handleLeaveAtGate(req.id)}
                            className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold rounded-xl text-xs cursor-pointer"
                          >
                            Leave with Guard
                          </button>
                          <button
                            onClick={() => handleDenyGateEntry(req.id)}
                            className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-800 font-bold rounded-xl text-xs cursor-pointer"
                          >
                            Deny
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-slate-500">Decision Dispatched to Guard ✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 2-Column Desktop Grid: Pre-Approvals & Parcel Queue */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left Column: Pre-Approved Passes */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-slate-900">Active Pre-Approved Guest Passes</span>
                    <span className="text-xs text-slate-500 font-medium">{preApprovedList.length} Active</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    {preApprovedList.map(p => (
                      <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-sm text-slate-900">{p.name}</div>
                            <div className="text-xs text-slate-500">{p.mobile} • {p.arrival}</div>
                          </div>
                          <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                            {p.status}
                          </span>
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex justify-between items-center">
                          <div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase">Gate OTP Passcode</div>
                            <div className="font-mono font-black text-xl text-slate-900 tracking-widest">{p.otp}</div>
                          </div>
                          <QrCode className="w-8 h-8 text-slate-700" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Parcel Storage Queue */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-slate-900">Gate Shelf Parcel Locker Queue</span>
                    <span className="text-xs text-slate-500 font-medium">{parcelsList.length} Parcels</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    {parcelsList.map(p => (
                      <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-sm text-slate-900">{p.courier} ({p.orderNo})</div>
                          <div className="text-xs text-slate-500">{p.shelf} • {p.arrival}</div>
                          <div className="text-[11px] font-mono font-bold text-indigo-600 mt-1">Pickup Passcode: {p.otp}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full font-bold text-[10px] ${
                          p.status.includes('Awaiting') ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. PAYMENTS SECTION */}
          {/* ========================================================================= */}
          {activeSection === 'payments' && (
            <div className="space-y-6">
              
              {/* Top Hero Bill Header Card */}
              <div className="bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 text-white p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest block">
                      August 2026 Society Maintenance Statement
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                        ₹ {billStatus === 'Paid' ? '0.00' : totalPayable.toFixed(2)}
                      </span>
                      {billStatus === 'Unpaid' && earlyBirdApplied && (
                        <span className="text-xs text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/40">
                          - ₹ 238.30 Early Bird 5% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <span className={`px-4 py-1.5 rounded-full font-black text-xs tracking-wider uppercase ${
                      billStatus === 'Paid' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-amber-400 text-slate-950 font-extrabold'
                    }`}>
                      {billStatus === 'Paid' ? '✓ Dues Paid & Cleared' : 'Due by 31 Aug 2026'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Invoice #GST-9021-AUG26</span>
                  </div>
                </div>

                {/* Quick Payment Action Bar */}
                <div className="pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-4 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5"><SecureIcon className="w-4 h-4 text-emerald-400" /> 256-Bit SSL Encrypted</span>
                    <span className="flex items-center gap-1.5"><Smartphone className="w-4 h-4 text-indigo-400" /> 0% Surcharge on UPI</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {billStatus === 'Unpaid' ? (
                      <button
                        onClick={() => {
                          setPaymentStep('idle');
                          setShowPaymentModal(true);
                        }}
                        className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                      >
                        <Zap className="w-4 h-4 fill-slate-950" />
                        <span>Pay ₹ {totalPayable.toFixed(2)} via 1-Click Fast Pay</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => alert('Downloading CA-Verified GST Tax Invoice PDF #GST-9021...')}
                        className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl text-xs shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Tax Invoice PDF</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Itemized Ledger */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <span className="font-extrabold text-base text-slate-900 block">Itemized Maintenance Ledger</span>
                      <span className="text-xs text-slate-500">Unit: Flat B-108 (2BHK, 1,250 sq.ft)</span>
                    </div>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">
                      Rate: ₹3.50 / sq.ft
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1 text-slate-700">
                      <span>1. Flat Base Society Maintenance (1,250 sqft)</span>
                      <span className="font-bold text-slate-900">₹ {baseMaintenance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-700">
                      <span>2. Building Sinking Fund & Lift Overhaul Reserve</span>
                      <span className="font-bold text-slate-900">₹ {sinkingFund.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-700">
                      <div>
                        <span>3. Smart Piped Water Meter AMR Usage</span>
                        <span className="text-[11px] text-slate-400 block">Meter #WM-8902 • 320 Liters/day avg</span>
                      </div>
                      <span className="font-bold text-slate-900">₹ {waterUsage.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-700">
                      <span>4. 250 kVA Diesel Generator Emergency Backup</span>
                      <span className="font-bold text-slate-900">₹ {dgBackup.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-700">
                      <span>5. Clubhouse, Gym & Pool Deck Maintenance</span>
                      <span className="font-bold text-slate-900">₹ {amenityMaintenance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-700">
                      <span>6. Goods & Services Tax (CGST 9% + SGST 9%)</span>
                      <span className="font-bold text-slate-900">₹ {gstTax.toFixed(2)}</span>
                    </div>

                    {earlyBirdApplied && (
                      <div className="flex justify-between py-2 text-emerald-700 font-bold bg-emerald-50 px-3 rounded-xl">
                        <span>Early Bird 5% Discount (Coupon: EARLYBIRD5)</span>
                        <span>- ₹ {earlyBirdDiscount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="pt-4 border-t-2 border-slate-900 flex justify-between items-center text-sm font-black text-slate-900">
                      <span>Net Total Amount Payable</span>
                      <span className="text-xl font-black text-slate-900">₹ {totalPayable.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Pre-Paid Meter */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-sm text-slate-900 block">Smart Electricity Pre-paid Meter</span>
                        <span className="text-[11px] text-slate-500">Consumer No: #EB-8910-FLATB108</span>
                      </div>
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                        Low Balance
                      </span>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center space-y-2">
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Meter Balance</div>
                      <div className="text-3xl font-black text-[#EF4444]">
                        ₹ {meterBalance.toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => setShowRechargeModal(true)}
                      className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md cursor-pointer"
                    >
                      Recharge Pre-paid Meter
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. HELPERS (13 CATEGORIES) */}
          {/* ========================================================================= */}
          {activeSection === 'helpers' && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-[#FCE7F3] flex items-center justify-center text-[#EC4899] shadow-xs shrink-0">
                    <HandHeart className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Helpers & Community Services</h2>
                    <p className="text-xs text-slate-500 mt-1">Hire trusted and Aadhaar-verified household helpers for your home</p>
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 font-medium">
                  We verify all helpers before onboarding for your safety. ❤️
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {helperCategories.map(cat => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`p-5 rounded-3xl border text-left transition-all flex items-center justify-between cursor-pointer hover:shadow-md ${
                        isSelected 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                          : 'bg-white text-slate-800 border-slate-200/80 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.bg} shrink-0`}>
                          <Icon className={`w-5 h-5 ${cat.color}`} />
                        </div>
                        <div>
                          <div className="font-bold text-xs">{cat.name}</div>
                          <div className={`text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>{cat.count} Available</div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>

              {selectedCategory && (
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-base text-slate-900">
                      Verified {selectedCategory} Helpers
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                      Aadhaar Verified ✓
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(providersByCategory[selectedCategory] || providersByCategory['Cleaning']).map((p, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-sm text-slate-900">{p.name}</div>
                            <div className="text-xs text-slate-500">{p.exp} • Works in {p.flats} Flats</div>
                          </div>
                          <span className="bg-[#FEF3C7] text-[#92400E] px-2.5 py-1 rounded-xl font-bold text-xs">
                            {p.rating} ({p.reviews})
                          </span>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-slate-200/60 text-xs">
                          <span className="font-black text-slate-900">{p.rate}</span>
                          <button
                            onClick={() => alert(`Connecting with ${p.name} (${p.phone})...`)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                          >
                            <Phone className="w-3.5 h-3.5" /> Hire / Call
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. MEMBERS, NOTICES, HELPDESK, DOCUMENTS, DIRECTORY, AMENITIES, ETC. */}
          {/* ========================================================================= */}
          {activeSection === 'members' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-bold text-base text-slate-900 block">Flat B-108 Registered Members</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-sm text-slate-900">Ananya Sharma</div>
                  <div className="text-xs text-slate-500">Primary Owner • 98765 11111</div>
                  <span className="inline-block bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px] mt-2">Owner</span>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-sm text-slate-900">Rahul Sharma</div>
                  <div className="text-xs text-slate-500">Co-Owner (Spouse) • 98765 22222</div>
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold text-[10px] mt-2">Family</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notices' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-bold text-base text-slate-900 block">Official RWA Circulars (23 Unread)</span>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="bg-indigo-600 text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold">AGM EVENT</span>
                <div className="font-bold text-base text-slate-900">Annual RWA General Body Meeting (AGM)</div>
                <p className="text-xs text-slate-600">Sunday, August 30 at 10:00 AM in Clubhouse Hall.</p>
              </div>
            </div>
          )}

          {activeSection === 'helpdesk' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-bold text-base text-slate-900 block">Helpdesk Tickets</span>
              <form onSubmit={handleCreateTicket} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Issue Subject (e.g. Water Leak)"
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                />
                <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold text-xs rounded-xl">Submit Ticket</button>
              </form>
            </div>
          )}

          {activeSection === 'documents' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-bold text-base text-slate-900 block">Society Documents (8 Files)</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Green Haven Society Bylaws & Regulations', size: '2.4 MB PDF' },
                  { name: 'Tenant Move-In / Move-Out NOC Form', size: '420 KB PDF' },
                ].map((doc, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{doc.name}</div>
                      <div className="text-[11px] text-slate-500">{doc.size}</div>
                    </div>
                    <button onClick={() => alert(`Downloading ${doc.name}...`)} className="p-2 rounded-xl bg-white border border-slate-200">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'directory' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-bold text-base text-slate-900 block">Resident & Security Directory</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Gate 1 Main Entry Intercom', phone: 'Ext: 101 • 98123 45678' },
                  { title: 'Gate 2 Rear Entry Intercom', phone: 'Ext: 102 • 98765 43210' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-sm text-slate-900">{item.title}</div>
                      <div className="text-xs text-slate-500">{item.phone}</div>
                    </div>
                    <button onClick={() => alert(`Calling ${item.title}...`)} className="px-3.5 py-1.5 bg-slate-900 text-white rounded-xl font-bold text-xs flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" /> Call
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'amenities' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-bold text-base text-slate-900 block">Reserve Society Amenities</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Badminton Court 2 (Indoor Wooden)', slot: '06:00 PM - 07:00 PM', price: 'Free for Residents' },
                  { name: 'Tennis Court 1 (Synthetic Surface)', slot: '07:00 AM - 08:00 AM', price: 'Free for Residents' },
                ].map((am, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-sm text-slate-900">{am.name}</div>
                      <div className="text-xs text-slate-500">{am.slot} • {am.price}</div>
                    </div>
                    <button onClick={() => alert(`Slot booked for ${am.name}!`)} className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs cursor-pointer">
                      Book Slot
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: INTERACTIVE MULTI-OPTION PAYMENT CHECKOUT MODAL */}
      {/* ========================================================================= */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-6 shadow-2xl relative animate-scale-up">
            
            {paymentStep !== 'processing' && (
              <button
                onClick={() => setShowPaymentModal(false)}
                className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {paymentStep === 'idle' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-xl text-slate-900">Secure Payment Checkout</h3>
                    <p className="text-xs text-slate-500">Green Haven Sanctuary RWA Maintenance Payment</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-bold block">Total Amount</span>
                    <span className="text-xl font-black text-slate-900">₹ {totalPayable.toFixed(2)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'upi' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>UPI Fast Pay</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'card' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    <span>Credit / Debit</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'netbanking' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Landmark className="w-4 h-4 text-amber-600" />
                    <span>Net Banking</span>
                  </button>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
                      <div className="w-24 h-24 bg-white p-1 rounded-xl shadow-xs shrink-0 flex items-center justify-center border border-slate-200">
                        <QrCode className="w-20 h-20 text-slate-900" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Scan & Pay via any UPI App</span>
                        <div className="font-bold text-xs text-slate-900">Scan Dynamic UPI QR Code</div>
                        <div className="text-[11px] text-slate-500 font-mono">greenhaven.rwa@hdfcbank</div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleExecutePayment}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-sm shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                >
                  <Lock className="w-4 h-4 fill-slate-950" />
                  <span>Authorize & Pay ₹ {totalPayable.toFixed(2)}</span>
                </button>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto" />
                <h3 className="font-extrabold text-xl text-slate-900">Processing Payment...</h3>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="text-center space-y-4 py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCheck className="w-8 h-8" />
                </div>
                <h3 className="font-black text-2xl text-slate-900 pt-2">₹ {totalPayable.toFixed(2)} Paid</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-2xl text-xs"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PRE-APPROVE VISITOR MODAL */}
      {/* ========================================================================= */}
      {showPreApproveModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-5 shadow-2xl relative">
            <button
              onClick={() => {
                setShowPreApproveModal(false);
                setGeneratedPass(null);
              }}
              className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="font-extrabold text-xl text-slate-900">
              {generatedPass ? 'Guest Fast Pass Ready' : 'Pre-approve Visitor Entry'}
            </div>

            {!generatedPass ? (
              <form onSubmit={handlePreApproveSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Guest Full Name</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Guest Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Expected Arrival Time</label>
                  <input
                    type="text"
                    required
                    value={guestArrival}
                    onChange={(e) => setGuestArrival(e.target.value)}
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-lg mt-2 cursor-pointer"
                >
                  Generate Passcode & QR Code
                </button>
              </form>
            ) : (
              <div className="bg-slate-900 text-white p-6 rounded-3xl text-center space-y-4">
                <div className="w-28 h-28 bg-white p-2 rounded-2xl mx-auto flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-slate-900" />
                </div>
                <div className="text-xs text-slate-300 font-bold uppercase">6-Digit Gate OTP</div>
                <div className="font-mono text-4xl font-black tracking-widest text-[#FDE047]">{generatedPass.otp}</div>
                <div className="text-sm text-slate-200 font-bold">{generatedPass.name} ({generatedPass.mobile})</div>
                <button
                  onClick={() => {
                    alert(`Passcode ${generatedPass.otp} shared via WhatsApp / SMS!`);
                    setShowPreApproveModal(false);
                    setGeneratedPass(null);
                  }}
                  className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Share via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: RECHARGE PRE-PAID METER MODAL */}
      {/* ========================================================================= */}
      {showRechargeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowRechargeModal(false)}
              className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="font-extrabold text-xl text-slate-900">Recharge Pre-paid Meter</div>
            <p className="text-xs text-slate-500">Current Meter Balance: <span className="text-red-500 font-black">₹ {meterBalance.toFixed(2)}</span></p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Select Amount:</label>
              <div className="grid grid-cols-3 gap-2">
                {[500, 1000, 2000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setRechargeAmount(amt)}
                    className={`py-3 rounded-xl font-bold text-xs border cursor-pointer ${
                      rechargeAmount === amt ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    ₹ {amt}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleRechargeMeter}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs shadow-lg mt-2 cursor-pointer"
            >
              Pay ₹ {rechargeAmount} & Recharge Now
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EMERGENCY SOS PANIC MODAL */}
      {/* ========================================================================= */}
      {showSosModal && (
        <div className="fixed inset-0 bg-red-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-5 shadow-2xl border-2 border-red-500 relative text-center">
            <button
              onClick={() => setShowSosModal(false)}
              className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto animate-bounce">
              <Flame className="w-10 h-10" />
            </div>

            <div className="font-black text-2xl text-red-900">🚨 EMERGENCY SOS ALARM</div>
            <p className="text-xs text-slate-600">
              Trigger instant high-priority panic alert to Gate 1 Security Desk and RWA emergency patrol for <strong>Flat B-108</strong>.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  setSosTriggered(true);
                  alert('EMERGENCY SIREN DISPATCHED TO GATE 1 SECURITY GUARDS!');
                  setShowSosModal(false);
                }}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs shadow-lg cursor-pointer"
              >
                DISPATCH GUARDS TO FLAT B-108
              </button>

              <button
                onClick={() => alert('Dialing 112 / 108 Emergency Ambulance / Police Services...')}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs cursor-pointer"
              >
                Call Ambulance / Police (112)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
