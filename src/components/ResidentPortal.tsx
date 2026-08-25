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
  AlertCircle, Car, Coffee, ShieldX, UserX, PhoneCall, AlertTriangle, ThumbsUp, Hammer
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

interface HelpdeskTicket {
  id: string;
  subject: string;
  category: string;
  categoryIcon: any;
  desc: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  preferredSlot: string;
  status: 'Logged' | 'Technician Assigned' | 'In Progress' | 'Resolved';
  assignedTech: {
    name: string;
    role: string;
    phone: string;
    rating: string;
    jobs: number;
    location: string;
  };
  sla: string;
  closeOtp: string;
  date: string;
  photoAttached?: boolean;
  rating?: number | null;
  feedbackTags?: string[];
}

export const ResidentPortal: React.FC<ResidentPortalProps> = ({ onExit }) => {
  // Navigation State
  const [activeSection, setActiveSection] = useState<ResidentNavSection>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // SOS Alarm Modal
  const [showSosModal, setShowSosModal] = useState<boolean>(false);
  const [sosTriggered, setSosTriggered] = useState<boolean>(false);

  // Gate Approval Requests State
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
  const [generatedPass, setGeneratedPass] = useState<{ otp: string; name: string; mobile: string; arrival: string } | null>(null);

  // Billing State
  const [billStatus, setBillStatus] = useState<'Unpaid' | 'Paid'>('Unpaid');
  const [earlyBirdApplied, setEarlyBirdApplied] = useState<boolean>(true);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [paymentStep, setPaymentStep] = useState<'idle' | 'processing' | 'success'>('idle');

  // Pre-Paid Meter State
  const [meterBalance, setMeterBalance] = useState<number>(-22.47);
  const [showRechargeModal, setShowRechargeModal] = useState<boolean>(false);
  const [rechargeAmount, setRechargeAmount] = useState<number>(1000);

  const totalPayable = 4753.30;

  // =========================================================================
  // MODERN HELPDESK & COMPLAINT ENGINE STATE
  // =========================================================================
  const [complaintCategory, setComplaintCategory] = useState<string>('Plumbing');
  const [complaintSubject, setComplaintSubject] = useState<string>('Kitchen Sink Drainage Pipe Water Leakage');
  const [complaintDesc, setComplaintDesc] = useState<string>('Continuous water leaking under the sink cabinet causing dampness. Need urgent inspection.');
  const [complaintPriority, setComplaintPriority] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('High');
  const [complaintSlot, setComplaintSlot] = useState<string>('Morning (09:00 AM - 12:00 PM)');
  const [hasPhotoAttached, setHasPhotoAttached] = useState<boolean>(true);
  const [filterTicketTab, setFilterTicketTab] = useState<'all' | 'active' | 'resolved'>('all');

  const complaintCategoriesList = [
    { id: 'Plumbing', name: 'Plumbing & Drainage', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'Electrical', name: 'Electrical & Power', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'Carpentry', name: 'Carpentry & Door Locks', icon: Hammer, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'Housekeeping', name: 'Housekeeping & Waste', icon: Sparkles, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'Lift', name: 'Lift & Common Area', icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'Telecom', name: 'Intercom & Wi-Fi Fiber', icon: Wifi, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { id: 'Security', name: 'Parking & Noise Alert', icon: Car, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const [ticketsList, setTicketsList] = useState<HelpdeskTicket[]>([
    {
      id: 'TK-9021',
      subject: 'Kitchen Sink Drainage Pipe Water Leakage',
      category: 'Plumbing',
      categoryIcon: Droplets,
      desc: 'Continuous water leaking under the sink cabinet causing dampness.',
      priority: 'High',
      preferredSlot: 'Immediate (Within 30 mins)',
      status: 'In Progress',
      assignedTech: {
        name: 'Ramesh Plumber',
        role: 'Senior Community Plumber',
        phone: '98123 99887',
        rating: '4.9 ★',
        jobs: 142,
        location: 'Tower B, 3rd Floor (2 mins away)'
      },
      sla: '1h 45m remaining (Target: 01:30 PM)',
      closeOtp: '7812',
      date: 'Today at 10:15 AM',
      photoAttached: true,
      rating: null,
      feedbackTags: []
    },
    {
      id: 'TK-8910',
      subject: 'Tower B Lift #2 Button Panel Flickering',
      category: 'Lift',
      categoryIcon: Building2,
      desc: '4th floor call button light blinking rapidly.',
      priority: 'Medium',
      preferredSlot: 'Afternoon (12:00 PM - 04:00 PM)',
      status: 'Resolved',
      assignedTech: {
        name: 'Alok OTIS Engineer',
        role: 'Lift Specialist Technician',
        phone: '98700 11223',
        rating: '5.0 ★',
        jobs: 88,
        location: 'Resolved & Closed'
      },
      sla: 'Resolved in 42 mins',
      closeOtp: '4091',
      date: 'Yesterday 04:20 PM',
      photoAttached: false,
      rating: 5,
      feedbackTags: ['Punctual', 'Clean Work', 'Polite']
    },
    {
      id: 'TK-8742',
      subject: 'Intercom Noise Distortion with Gate 1',
      category: 'Telecom',
      categoryIcon: Wifi,
      desc: 'Heavy static noise when calling guard desk.',
      priority: 'Low',
      preferredSlot: 'Evening (04:00 PM - 08:00 PM)',
      status: 'Resolved',
      assignedTech: {
        name: 'Suresh Telecom Tech',
        role: 'Intercom Network Engineer',
        phone: '98450 66778',
        rating: '4.8 ★',
        jobs: 64,
        location: 'Resolved & Closed'
      },
      sla: 'Resolved in 1.5 hours',
      closeOtp: '2281',
      date: '19 Aug 2026',
      photoAttached: false,
      rating: 4,
      feedbackTags: ['Good Fix']
    }
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
    ],
  };

  // Handlers
  const handleCreateComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintSubject) return;

    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const newId = `TK-${Math.floor(9000 + Math.random() * 1000)}`;
    const matchedCategory = complaintCategoriesList.find(c => c.id === complaintCategory);

    const newTicket: HelpdeskTicket = {
      id: newId,
      subject: complaintSubject,
      category: complaintCategory,
      categoryIcon: matchedCategory ? matchedCategory.icon : Wrench,
      desc: complaintDesc || 'Reported via Resident Web ERP',
      priority: complaintPriority,
      preferredSlot: complaintSlot,
      status: 'Technician Assigned',
      assignedTech: {
        name: complaintCategory === 'Plumbing' ? 'Ramesh Plumber' : complaintCategory === 'Electrical' ? 'Alok Electrician' : 'Duty Technician',
        role: `Lead Community ${complaintCategory} Tech`,
        phone: '98123 99887',
        rating: '4.9 ★',
        jobs: 140,
        location: 'Dispatched to Tower B'
      },
      sla: complaintPriority === 'Critical' ? '30 Mins Emergency SLA' : '2 Hours SLA',
      closeOtp: randomOtp,
      date: 'Just Now',
      photoAttached: hasPhotoAttached,
      rating: null,
      feedbackTags: []
    };

    setTicketsList([newTicket, ...ticketsList]);
    setComplaintSubject('');
    setComplaintDesc('');
    alert(`COMPLAINT REGISTERED (${newId}) ✓\nTechnician ${newTicket.assignedTech.name} has been dispatched to Flat B-108!\nYour Close-Job Passcode: OTP ${randomOtp}`);
  };

  const handleRateTicket = (id: string, star: number) => {
    setTicketsList(prev => prev.map(t => t.id === id ? { ...t, rating: star } : t));
  };

  const handleAllowGateEntry = (reqId: string) => {
    setIncomingGateRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'allowed' } : r));
  };

  const handleLeaveAtGate = (reqId: string) => {
    setIncomingGateRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'left_at_gate' } : r));
  };

  const handleDenyGateEntry = (reqId: string) => {
    setIncomingGateRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'denied' } : r));
  };

  const pendingGateCount = incomingGateRequests.filter(r => r.status === 'pending').length;
  const activeTicketsCount = ticketsList.filter(t => t.status !== 'Resolved').length;

  const navMenuItems = [
    { id: 'overview', label: 'Overview Dashboard', icon: Home, badge: pendingGateCount > 0 ? `${pendingGateCount} at Gate` : undefined, badgeColor: 'bg-red-500 text-white animate-pulse' },
    { id: 'helpdesk', label: 'Raise Complaints & Helpdesk', icon: Headphones, badge: activeTicketsCount > 0 ? `${activeTicketsCount} Active` : undefined, badgeColor: 'bg-indigo-600 text-white' },
    { id: 'visitors_parcels', label: 'Visitors & Gate Approvals', icon: Shield, badge: pendingGateCount > 0 ? `${pendingGateCount}` : undefined },
    { id: 'payments', label: 'Paying Bills & Meters', icon: CreditCard, badge: billStatus === 'Unpaid' ? 'Due' : undefined },
    { id: 'helpers', label: 'Helpers & Services (13 Categories)', icon: HandHeart },
    { id: 'members', label: 'Members & Vehicles', icon: Users },
    { id: 'notices', label: 'Society Notices (23 Unread)', icon: FileText, badge: '23' },
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

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSection('helpdesk')}
              className="px-4 py-2 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 flex items-center gap-2 text-xs font-bold transition-all cursor-pointer"
            >
              <Headphones className="w-4 h-4 text-blue-600" />
              <span>{activeTicketsCount} Active Complaint{activeTicketsCount > 1 ? 's' : ''}</span>
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

          {/* Quick Emergency Facility Dial Strip */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-4 rounded-3xl shadow-sm space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 block">
              24/7 Facility Emergency Desk
            </span>
            <div className="space-y-1.5 pt-1 text-[11px]">
              <div className="flex justify-between items-center text-slate-300">
                <span>⚡ Electrician On-Duty:</span>
                <span className="font-mono font-bold text-white">98123 44556</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>🚰 Plumber On-Duty:</span>
                <span className="font-mono font-bold text-white">98765 99887</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>👮 Gate 1 Guard Desk:</span>
                <span className="font-mono font-bold text-white">Ext: 101</span>
              </div>
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
          {/* 1. OVERVIEW & DESKTOP DASHBOARD */}
          {/* ========================================================================= */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              
              {/* SECTION 1: MY HOME */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block px-1">
                  MY HOME
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveSection('visitors_parcels')}
                    className="bg-white hover:bg-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between text-left transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
                        <Shield className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] px-3 py-1 rounded-full">
                        {preApprovedList.length} Passes
                      </span>
                    </div>
                    <div>
                      <div className="font-extrabold text-base text-slate-900">Visitors & Gate Approvals</div>
                      <div className="text-xs text-slate-500 mt-1">Approve Blinkit, Swiggy, and guests at gate</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveSection('helpdesk')}
                    className="bg-white hover:bg-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between text-left transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Headphones className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                        {activeTicketsCount} In Progress
                      </span>
                    </div>
                    <div>
                      <div className="font-extrabold text-base text-slate-900">Raise Complaints & Helpdesk</div>
                      <div className="text-xs text-slate-500 mt-1">Plumbing, electrical, carpentry technician tracking</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveSection('payments')}
                    className="bg-white hover:bg-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between text-left transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                        {billStatus === 'Paid' ? 'All Clear ✓' : 'Bill Due'}
                      </span>
                    </div>
                    <div>
                      <div className="font-extrabold text-base text-slate-900">Paying Bills & Pre-Paid Meter</div>
                      <div className="text-xs text-slate-500 mt-1">1-Click UPI checkout & EB meter recharge</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* SECTION 2: SOCIETY */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block px-1">
                  SOCIETY
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button onClick={() => setActiveSection('notices')} className="bg-white hover:bg-slate-50 p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4 text-left transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 shrink-0"><FileText className="w-6 h-6" /></div>
                    <div><div className="font-bold text-sm text-slate-900">Notices</div><div className="text-xs font-bold text-[#EF4444] mt-0.5">23 Unread Circulars</div></div>
                  </button>
                  <button onClick={() => setActiveSection('helpdesk')} className="bg-white hover:bg-slate-50 p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4 text-left transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><Headphones className="w-6 h-6" /></div>
                    <div><div className="font-bold text-sm text-slate-900">Helpdesk</div><div className="text-xs font-bold text-blue-600 mt-0.5">{activeTicketsCount} Ticket In Progress</div></div>
                  </button>
                  <button onClick={() => setActiveSection('documents')} className="bg-white hover:bg-slate-50 p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4 text-left transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0"><Folder className="w-6 h-6" /></div>
                    <div><div className="font-bold text-sm text-slate-900">Documents</div><div className="text-xs font-medium text-slate-500 mt-0.5">8 Society Files</div></div>
                  </button>
                  <button onClick={() => setActiveSection('directory')} className="bg-white hover:bg-slate-50 p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4 text-left transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0"><Contact className="w-6 h-6" /></div>
                    <div><div className="font-bold text-sm text-slate-900">Directory</div><div className="text-xs font-medium text-slate-500 mt-0.5">Gate & RWA</div></div>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. UPGRADED RAISE COMPLAINTS & HELPDESK SUITE */}
          {/* ========================================================================= */}
          {activeSection === 'helpdesk' && (
            <div className="space-y-6">
              
              {/* Header Hero Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-inner shrink-0">
                    <Headphones className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-white">Raise Complaints & Helpdesk Service</h2>
                    <p className="text-xs text-slate-300 mt-1">Book certified community technicians with real-time dispatch tracking & SLA resolution</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-4 py-2 rounded-2xl text-xs font-bold">
                    ⚡ Guaranteed &lt; 2-Hour SLA
                  </span>
                </div>
              </div>

              {/* Raise New Complaint Interactive Creator */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-black text-lg text-slate-900">Raise a New Service Complaint</h3>
                    <p className="text-xs text-slate-500">Select service category, preferred visit time, and priority level</p>
                  </div>
                  <span className="text-xs font-bold text-slate-400">Unit: Flat B-108</span>
                </div>

                <form onSubmit={handleCreateComplaint} className="space-y-6 text-xs">
                  
                  {/* Step 1: Select Category Tiles */}
                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 block">1. Select Service Category:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                      {complaintCategoriesList.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = complaintCategory === cat.id;
                        return (
                          <button
                            type="button"
                            key={cat.id}
                            onClick={() => setComplaintCategory(cat.id)}
                            className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : cat.color}`} />
                            <span className="text-[11px] font-bold line-clamp-1">{cat.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Subject & Issue Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">2. Issue Title / Subject:</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kitchen Pipe Leakage, MCB Tripping"
                        value={complaintSubject}
                        onChange={(e) => setComplaintSubject(e.target.value)}
                        className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">3. Preferred Visit Time Slot:</label>
                      <select
                        value={complaintSlot}
                        onChange={(e) => setComplaintSlot(e.target.value)}
                        className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none"
                      >
                        <option value="Immediate (Within 30 mins)">Immediate Emergency (Within 30 mins)</option>
                        <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                        <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                        <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 3: Priority Selector & Description */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">4. Describe the problem in detail:</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Explain the issue (e.g. where the leak is located, since when it started)..."
                      value={complaintDesc}
                      onChange={(e) => setComplaintDesc(e.target.value)}
                      className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-slate-900"
                    />
                  </div>

                  {/* Priority and Photo Attachment */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700 text-xs">Urgency:</span>
                      {(['Critical', 'High', 'Medium', 'Low'] as const).map((pri) => (
                        <button
                          type="button"
                          key={pri}
                          onClick={() => setComplaintPriority(pri)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs border cursor-pointer ${
                            complaintPriority === pri
                              ? pri === 'Critical' ? 'bg-red-600 text-white border-red-600'
                                : pri === 'High' ? 'bg-orange-500 text-white border-orange-500'
                                : pri === 'Medium' ? 'bg-amber-500 text-white border-amber-500'
                                : 'bg-slate-900 text-white border-slate-900'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {pri}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setHasPhotoAttached(!hasPhotoAttached)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer ${
                        hasPhotoAttached ? 'bg-indigo-50 text-indigo-700 border-indigo-300' : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      <Camera className="w-4 h-4" />
                      <span>{hasPhotoAttached ? '✓ 1 Photo Attached (kitchen_leak.jpg)' : '+ Attach Photo'}</span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Submit Complaint & Dispatch Certified Technician</span>
                  </button>

                </form>
              </div>

              {/* Tickets Directory & Real-Time Tracking */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-black text-lg text-slate-900">Live Service Tickets & SLA Tracking</h3>
                    <p className="text-xs text-slate-500">Track technician assignment, live status, and close-job OTP</p>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex gap-2 text-xs">
                    <button
                      onClick={() => setFilterTicketTab('all')}
                      className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer ${filterTicketTab === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      All ({ticketsList.length})
                    </button>
                    <button
                      onClick={() => setFilterTicketTab('active')}
                      className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer ${filterTicketTab === 'active' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      Active ({activeTicketsCount})
                    </button>
                    <button
                      onClick={() => setFilterTicketTab('resolved')}
                      className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer ${filterTicketTab === 'resolved' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      Resolved ({ticketsList.length - activeTicketsCount})
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {ticketsList
                    .filter(t => filterTicketTab === 'all' || (filterTicketTab === 'active' ? t.status !== 'Resolved' : t.status === 'Resolved'))
                    .map((ticket) => {
                      const Icon = ticket.categoryIcon;
                      return (
                        <div
                          key={ticket.id}
                          className={`p-6 rounded-3xl border space-y-5 transition-all ${
                            ticket.status === 'In Progress' || ticket.status === 'Technician Assigned'
                              ? 'bg-blue-50/40 border-blue-200 shadow-sm'
                              : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          {/* Ticket Header */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="flex items-center gap-3.5">
                              <div className="w-12 h-12 rounded-2xl bg-white text-slate-900 flex items-center justify-center text-lg shadow-xs border border-slate-200 shrink-0">
                                <Icon className="w-6 h-6 text-indigo-600" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-black text-xs text-slate-500">{ticket.id}</span>
                                  <span className="font-black text-base text-slate-900">{ticket.subject}</span>
                                </div>
                                <div className="text-xs text-slate-500 mt-0.5">
                                  {ticket.category} • Slot: <strong>{ticket.preferredSlot}</strong> • Logged: {ticket.date}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 rounded-full font-black text-[11px] uppercase ${
                                ticket.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                ticket.priority === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-slate-200 text-slate-700'
                              }`}>
                                {ticket.priority} Priority
                              </span>

                              <span className={`px-3 py-1 rounded-full font-black text-[11px] uppercase ${
                                ticket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-600 text-white animate-pulse'
                              }`}>
                                {ticket.status}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-700 bg-white p-3 rounded-2xl border border-slate-200/70">
                            {ticket.desc}
                          </p>

                          {/* Technician & Live Tracking Bar */}
                          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3.5">
                              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-xs">
                                👨‍🔧
                              </div>
                              <div>
                                <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                                  <span>{ticket.assignedTech.name}</span>
                                  <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-black text-[10px]">{ticket.assignedTech.rating}</span>
                                </div>
                                <div className="text-[11px] text-slate-500">{ticket.assignedTech.role} • {ticket.assignedTech.location}</div>
                              </div>
                            </div>

                            {ticket.status !== 'Resolved' ? (
                              <div className="flex flex-wrap items-center gap-3">
                                <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-center">
                                  <div className="text-[9px] text-amber-800 font-bold uppercase">Close-Job Passcode</div>
                                  <div className="font-mono font-black text-sm text-slate-900">OTP {ticket.closeOtp}</div>
                                </div>

                                <button
                                  onClick={() => alert(`Calling ${ticket.assignedTech.name} (${ticket.assignedTech.phone})...`)}
                                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                                >
                                  <PhoneCall className="w-3.5 h-3.5" /> Call Tech
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-600">Your Rating:</span>
                                <div className="flex gap-1 text-sm">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      onClick={() => handleRateTicket(ticket.id, star)}
                                      className={`cursor-pointer ${ticket.rating && ticket.rating >= star ? 'text-amber-500 font-black' : 'text-slate-300'}`}
                                    >
                                      ★
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                        </div>
                      );
                    })}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. VISITORS & GATE APPROVALS */}
          {/* ========================================================================= */}
          {activeSection === 'visitors_parcels' && (
            <div className="space-y-6">
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

                <button
                  onClick={() => setShowPreApproveModal(true)}
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md cursor-pointer"
                >
                  + Pre-approve Visitors
                </button>
              </div>

              {/* Pre-Approvals & Parcel Queue */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <span className="font-bold text-sm text-slate-900 block">Active Pre-Approved Guest Passes</span>
                  <div className="space-y-3 text-xs">
                    {preApprovedList.map(p => (
                      <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-sm text-slate-900">{p.name}</div>
                          <div className="text-xs text-slate-500">{p.mobile} • {p.arrival}</div>
                          <div className="font-mono font-bold text-indigo-600 mt-1">Passcode: {p.otp}</div>
                        </div>
                        <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[10px]">{p.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <span className="font-bold text-sm text-slate-900 block">Gate Shelf Parcel Queue</span>
                  <div className="space-y-3 text-xs">
                    {parcelsList.map(p => (
                      <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-sm text-slate-900">{p.courier} ({p.orderNo})</div>
                          <div className="text-xs text-slate-500">{p.shelf} • {p.arrival}</div>
                          <div className="font-mono font-bold text-indigo-600 mt-1">Pickup Passcode: {p.otp}</div>
                        </div>
                        <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-bold text-[10px]">{p.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. PAYMENTS SECTION */}
          {/* ========================================================================= */}
          {activeSection === 'payments' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 text-white p-8 rounded-3xl shadow-xl flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest block">August 2026 Maintenance</span>
                  <span className="text-4xl font-black">{billStatus === 'Paid' ? '₹ 0.00' : `₹ ${totalPayable.toFixed(2)}`}</span>
                </div>
                <button
                  onClick={() => alert('Payment completed via UPI Autopay!')}
                  className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs cursor-pointer"
                >
                  Pay ₹ {totalPayable.toFixed(2)}
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. HELPERS (13 CATEGORIES) */}
          {/* ========================================================================= */}
          {activeSection === 'helpers' && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FCE7F3] flex items-center justify-center text-[#EC4899]"><HandHeart className="w-7 h-7" /></div>
                  <div><h2 className="font-black text-xl text-slate-900">Helpers & Services</h2><p className="text-xs text-slate-500">13 Verified service categories</p></div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {helperCategories.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.name)} className="p-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 flex items-center gap-3 text-left">
                      <Icon className={`w-5 h-5 ${cat.color}`} />
                      <div><div className="font-bold text-xs">{cat.name}</div><div className="text-[10px] text-slate-500">{cat.count} Available</div></div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 6. MEMBERS, NOTICES, DOCUMENTS, DIRECTORY, AMENITIES, ETC. */}
          {/* ========================================================================= */}
          {activeSection === 'members' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-bold text-base text-slate-900 block">Flat B-108 Registered Members</span>
              <div className="p-4 bg-slate-50 rounded-2xl text-xs space-y-1">
                <div className="font-bold text-slate-900">Ananya Sharma (Owner) • Rahul Sharma (Co-Owner) • Aarav Sharma (Child)</div>
                <div className="text-slate-500">Allocated Parking Slot: Slot B-42 • KA-03-MB-4921 (FastTag RFID Active)</div>
              </div>
            </div>
          )}

          {activeSection === 'notices' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-bold text-base text-slate-900 block">Society Circulars (23 Unread)</span>
              <div className="p-5 bg-slate-50 rounded-2xl space-y-2 text-xs">
                <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">AGM NOTICE</span>
                <div className="font-bold text-sm text-slate-900">Annual General Body Meeting (AGM) 2026</div>
                <p className="text-slate-600">Sunday, August 30 at 10:00 AM in Clubhouse Banquet Hall.</p>
              </div>
            </div>
          )}

          {activeSection === 'documents' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-bold text-base text-slate-900 block">Society Documents (8 Files)</span>
              <div className="space-y-2 text-xs">
                {['Green Haven Society Bylaws PDF', 'Move-In / Move-Out NOC Form PDF'].map((doc, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                    <span className="font-bold text-slate-800">{doc}</span>
                    <button onClick={() => alert(`Downloading ${doc}...`)} className="px-3 py-1 bg-white border border-slate-200 rounded-lg font-bold">Download</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'directory' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-bold text-base text-slate-900 block">Resident & Security Directory</span>
              <div className="p-4 bg-slate-50 rounded-2xl text-xs space-y-2">
                <div className="flex justify-between"><span>Gate 1 Intercom:</span><span className="font-bold">Ext 101</span></div>
                <div className="flex justify-between"><span>RWA President:</span><span className="font-bold">98450 11990</span></div>
              </div>
            </div>
          )}

          {activeSection === 'amenities' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-bold text-base text-slate-900 block">Reserve Society Amenities</span>
              <div className="p-4 bg-slate-50 rounded-2xl text-xs flex justify-between items-center">
                <div><div className="font-bold text-slate-900">Badminton Court 2</div><div className="text-slate-500">06:00 PM - 07:00 PM</div></div>
                <button onClick={() => alert('Slot Booked!')} className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl">Book</button>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: PRE-APPROVE VISITOR MODAL */}
      {/* ========================================================================= */}
      {showPreApproveModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-5 shadow-2xl relative">
            <button onClick={() => setShowPreApproveModal(false)} className="absolute right-5 top-5 p-1.5 text-slate-400">
              <X className="w-5 h-5" />
            </button>
            <div className="font-extrabold text-xl text-slate-900">Pre-approve Visitor Entry</div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const otp = '892-104';
              setPreApprovedList([{ id: 'PASS-8921', name: guestName, mobile: guestPhone, arrival: guestArrival, otp: otp, status: 'Active (Valid)', type: 'Guest Pass' }, ...preApprovedList]);
              setShowPreApproveModal(false);
              alert(`Visitor Pass Generated for ${guestName}! Passcode OTP: ${otp}`);
            }} className="space-y-3 text-xs">
              <input type="text" required placeholder="Guest Name" value={guestName} onChange={(e) => setGuestName(e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl border" />
              <input type="tel" required placeholder="Mobile Number" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl border" />
              <button type="submit" className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl">Generate Gate Pass</button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EMERGENCY SOS PANIC MODAL */}
      {/* ========================================================================= */}
      {showSosModal && (
        <div className="fixed inset-0 bg-red-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-5 shadow-2xl border-2 border-red-500 relative text-center">
            <button onClick={() => setShowSosModal(false)} className="absolute right-5 top-5 p-1.5 text-slate-400">
              <X className="w-5 h-5" />
            </button>
            <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto animate-bounce">
              <Flame className="w-10 h-10" />
            </div>
            <div className="font-black text-2xl text-red-900">🚨 EMERGENCY SOS ALARM</div>
            <p className="text-xs text-slate-600">Trigger instant high-priority panic alert to Gate 1 Security Desk for <strong>Flat B-108</strong>.</p>
            <button onClick={() => { alert('EMERGENCY SIREN DISPATCHED TO GATE 1 GUARDS!'); setShowSosModal(false); }} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs">
              DISPATCH GUARDS TO FLAT B-108
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
