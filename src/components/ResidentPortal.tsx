import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Bell, Calendar, Camera, Check, CheckCircle2, ChevronRight, Clock, 
  CreditCard, Download, Droplets, Dumbbell, FileText, Filter, Flame, Folder, FolderOpen, 
  Gauge, HandHeart, Heart, Headphones, History, Home, IndianRupee, LifeBuoy, 
  Lock, LogOut, Mail, MapPin, Megaphone, Menu, MessageCircle, MessageSquare, Music, 
  Newspaper, Package, PartyPopper, Phone, Plus, QrCode, Search, Send, Share2, Shield, 
  ShieldAlert, ShieldCheck, Snowflake, Sparkles, Star, Tag, Trash2, Trophy, Truck, 
  User, UserCheck, UserPlus, Users, Vote, Waves, Wifi, Wrench, X, XCircle, Zap, Contact, Building2
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

export const ResidentPortal: React.FC<ResidentPortalProps> = ({ onExit }) => {
  // Navigation State
  const [activeSection, setActiveSection] = useState<ResidentNavSection>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Notification Toast Banner
  const [showNotificationToast, setShowNotificationToast] = useState<boolean>(true);

  // SOS Alarm Modal
  const [showSosModal, setShowSosModal] = useState<boolean>(false);
  const [sosTriggered, setSosTriggered] = useState<boolean>(false);

  // Pre-Approve Visitor Modal
  const [showPreApproveModal, setShowPreApproveModal] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('Siddharth Verma');
  const [guestPhone, setGuestPhone] = useState<string>('98765 43210');
  const [guestArrival, setGuestArrival] = useState<string>('Today at 04:30 PM');
  const [guestPurpose, setGuestPurpose] = useState<string>('Dinner Guest');
  const [generatedPass, setGeneratedPass] = useState<{ otp: string; name: string; mobile: string; arrival: string } | null>(null);

  // Pre-Paid Meter State
  const [meterBalance, setMeterBalance] = useState<number>(-22.47);
  const [showRechargeModal, setShowRechargeModal] = useState<boolean>(false);
  const [rechargeAmount, setRechargeAmount] = useState<number>(1000);

  // Dues State
  const [duesStatus, setDuesStatus] = useState<'All Clear!' | 'Pending' | 'Paid'>('All Clear!');
  const [isBillPaid, setIsBillPaid] = useState<boolean>(true);

  // Search State
  const [categorySearchQuery, setCategorySearchQuery] = useState<string>('');

  // Pre-approved passes list
  const [preApprovedList, setPreApprovedList] = useState([
    { id: 'PASS-8921', name: 'Siddharth Verma', mobile: '98765 43210', arrival: 'Today 04:30 PM', otp: '892-104', status: 'Active (Valid)', type: 'Guest Pass' },
    { id: 'PASS-8810', name: 'Sunita Rao (Family)', mobile: '98123 55443', arrival: 'Tomorrow 10:00 AM', otp: '410-992', status: 'Scheduled', type: 'Guest Pass' },
    { id: 'PASS-8750', name: 'Dr. Ramesh Plumber', mobile: '98450 11223', arrival: 'Today 02:00 PM', otp: '718-204', status: 'Inside', type: 'Service Pass' },
  ]);

  // Parcels list
  const [parcelsList, setParcelsList] = useState([
    { id: 'PAR-101', courier: 'Amazon Courier', orderNo: '#AZ-9021', shelf: 'Gate Shelf B-4', arrival: '11:20 AM Today', status: 'Awaiting Pickup', otp: '4091' },
    { id: 'PAR-102', courier: 'Swiggy InstaMart', orderNo: '#SW-4912', shelf: 'Cold Storage Locker #02', arrival: '11:32 AM Today', status: 'Awaiting Pickup', otp: '8821' },
    { id: 'PAR-099', courier: 'Flipkart Logistics', orderNo: '#FK-1102', shelf: 'Gate Shelf A-1', arrival: 'Yesterday', status: 'Picked Up', otp: '1904' },
  ]);

  // Household Active Helpers
  const [myHelpersList, setMyHelpersList] = useState([
    { id: 'HLP-01', name: 'Sunita Devi', role: 'Daily Housekeeping Maid', phone: '98765 99887', status: 'Inside Society (Gate 1)', time: '09:15 AM - 01:00 PM', rating: '4.9 ★', salary: '₹ 3,500/mo' },
    { id: 'HLP-02', name: 'Ramesh Kumar', role: 'Morning Cook', phone: '98123 44556', status: 'Checked Out', time: '07:00 AM - 09:00 AM', rating: '4.8 ★', salary: '₹ 5,000/mo' },
    { id: 'HLP-03', name: 'Alok Sharma', role: 'Car Washer & Cleaner', phone: '98345 66778', status: 'Scheduled', time: '06:00 AM - 07:00 AM', rating: '4.9 ★', salary: '₹ 800/mo' },
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
      { name: 'Pooja Bai', exp: '2 Years in Community', rating: '4.7 ★', reviews: 18, flats: 4, phone: '98901 22334', rate: '₹3,000/month' },
      { name: 'Meena Rathod', exp: '6 Years in Community', rating: '4.9 ★', reviews: 54, flats: 9, phone: '98222 11009', rate: '₹3,600/month' },
      { name: 'Radha Yadav', exp: '1 Year in Community', rating: '4.6 ★', reviews: 12, flats: 3, phone: '98333 44556', rate: '₹2,900/month' },
      { name: 'Anita Pawar', exp: '3 Years in Community', rating: '4.8 ★', reviews: 31, flats: 7, phone: '98111 99882', rate: '₹3,400/month' },
      { name: 'Saraswati Bai', exp: '4 Years in Community', rating: '4.9 ★', reviews: 39, flats: 8, phone: '98777 66554', rate: '₹3,500/month' },
    ],
    'Water Supply': [
      { name: 'AquaPure Mineral Cans (Bisleri 20L)', exp: 'Daily 7 AM & 4 PM Supply', rating: '4.9 ★', reviews: 140, flats: 65, phone: '98220 11990', rate: '₹80/Can' },
      { name: 'Himalayan Spring Water Service', exp: 'Doorstep Delivery', rating: '4.8 ★', reviews: 88, flats: 34, phone: '98111 00223', rate: '₹90/Can' },
      { name: 'Ganga RO Water Delivery', exp: 'Direct Tower Delivery', rating: '4.7 ★', reviews: 52, flats: 22, phone: '98444 88776', rate: '₹75/Can' },
    ],
    'Gym Trainer': [
      { name: 'Coach Rohit Verma (Certified ACSM)', exp: '8 Years Experience', rating: '5.0 ★', reviews: 38, flats: 14, phone: '98700 12345', rate: '₹4,500/month' },
      { name: 'Priya Nambiar (Yoga & Pilates)', exp: '6 Years Experience', rating: '4.9 ★', reviews: 45, flats: 18, phone: '98999 55443', rate: '₹4,000/month' },
    ],
    'Wifi/Internet': [
      { name: 'Airtel Xstream Fiber (Green Haven Desk)', exp: 'Up to 1 Gbps • Same Day Install', rating: '4.9 ★', reviews: 180, flats: 92, phone: '98123 00001', rate: 'From ₹799/mo' },
      { name: 'JioFiber Community Executive Alok', exp: 'Free Router + Set Top Box', rating: '4.8 ★', reviews: 145, flats: 78, phone: '98900 11112', rate: 'From ₹699/mo' },
    ],
    Milk: [
      { name: 'Nandini Fresh Farm Milk (Morning 6 AM)', exp: 'Pasteurized & Toned Cans', rating: '4.9 ★', reviews: 220, flats: 110, phone: '98450 99881', rate: 'Daily Subscription' },
      { name: 'Amul Taaza / Gold Delivery Team', exp: 'Doorstep Milk Crate Delivery', rating: '4.9 ★', reviews: 195, flats: 85, phone: '98111 44332', rate: 'Daily Subscription' },
    ],
  };

  // Helpdesk Tickets
  const [ticketsList, setTicketsList] = useState([
    { id: 'TK-9021', subject: 'Kitchen Sink Drainage Pipe Water Leakage', category: 'Plumbing', desc: 'Water leaking under the kitchen sink cabinet continuously.', priority: 'High', status: 'In Progress', assignedTo: 'Ramesh Plumber (Ph: 98123 99887)', sla: '1h 45m remaining', date: 'Today 10:15 AM', rating: null as number | null },
    { id: 'TK-8910', subject: 'Tower B Lift #2 Button Panel Flickering', category: 'Electrical', desc: '4th floor call button light blinking.', priority: 'Medium', status: 'Resolved', assignedTo: 'OTIS Engineer Alok', sla: 'Resolved in 42 mins', date: 'Yesterday 04:20 PM', rating: 5 },
    { id: 'TK-8742', subject: 'Intercom Noise Distortion with Gate 1', category: 'Telecom', desc: 'Static noise when calling guard desk.', priority: 'Low', status: 'Resolved', assignedTo: 'Airtel Telecom Tech', sla: 'Resolved in 2 hours', date: '19 Aug 2026', rating: 4 },
  ]);

  const [newTicketSubject, setNewTicketSubject] = useState<string>('');
  const [newTicketCategory, setNewTicketCategory] = useState<string>('Plumbing');
  const [newTicketPriority, setNewTicketPriority] = useState<string>('High');
  const [newTicketDesc, setNewTicketDesc] = useState<string>('');

  // Amenities State
  const [selectedAmenity, setSelectedAmenity] = useState<string>('Badminton Court 2 (Indoor)');
  const [selectedSlot, setSelectedSlot] = useState<string>('06:00 PM - 07:00 PM');
  const [bookingDate, setBookingDate] = useState<string>('2026-08-26');

  // Community Polls State
  const [pollVoted, setPollVoted] = useState<number | null>(1);
  const [pollOptions, setPollOptions] = useState([
    { id: 1, text: 'AquaClean Services (₹25,000/mo)', votes: 42, percent: 58 },
    { id: 2, text: 'BlueWave Pool Mgmt (₹22,000/mo)', votes: 20, percent: 28 },
    { id: 3, text: 'Keep Existing Vendor', votes: 10, percent: 14 },
  ]);

  // Handlers
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

  const handleRateTicket = (id: string, star: number) => {
    setTicketsList(prev => prev.map(t => t.id === id ? { ...t, rating: star } : t));
  };

  const handleVote = (id: number) => {
    if (pollVoted !== null) return;
    setPollVoted(id);
    setPollOptions(prev => prev.map(opt => opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt));
  };

  const navMenuItems = [
    { id: 'overview', label: 'Overview Dashboard', icon: Home },
    { id: 'visitors_parcels', label: 'Visitors & Parcels', icon: Shield },
    { id: 'helpers', label: 'Helpers & Services (13 Categories)', icon: HandHeart },
    { id: 'members', label: 'Members & Vehicles', icon: Users },
    { id: 'notices', label: 'Society Notices (23 Unread)', icon: FileText, badge: '23' },
    { id: 'helpdesk', label: 'Helpdesk Tickets', icon: Headphones, badge: '1' },
    { id: 'documents', label: 'Society Documents (8 Files)', icon: Folder },
    { id: 'directory', label: 'Resident & Gate Directory', icon: Contact },
    { id: 'payments', label: 'Pre-paid Meter & Dues', icon: IndianRupee },
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

          {/* Quick Action Buttons: SOS Siren, Notification, Exit */}
          <div className="flex items-center gap-3">
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
              <span className="hidden sm:inline">Exit to Portals</span>
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
                      isActive ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'
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
              
              {/* NOTIFICATION TEST BANNER (Screenshot 3 Sign) */}
              {showNotificationToast && (
                <div className="bg-[#1E293B] text-white p-4 rounded-3xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[#FDE047]">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-100 block">Not Getting Push Notifications on Gate Entries?</span>
                      <span className="text-[11px] text-slate-400">Test the real-time push dispatch channel for Flat B-108.</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => alert('Push Notification Test dispatched to Flat B-108!')}
                      className="px-4 py-1.5 rounded-xl bg-white text-[#0F172A] font-bold text-xs shadow-sm hover:bg-slate-100 transition-all cursor-pointer"
                    >
                      Test Now
                    </button>
                    <button
                      onClick={() => setShowNotificationToast(false)}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

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
                      <span className="text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] px-3 py-1 rounded-full">
                        {preApprovedList.length} Passes Active
                      </span>
                    </div>
                    <div>
                      <div className="font-extrabold text-base text-slate-900">Visitors & Parcels</div>
                      <div className="text-xs text-slate-500 mt-1">Pre-approvals, QR passes, and parcel locker pickups</div>
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

              {/* SECTION 3: PAYMENTS (Widescreen 3-Card Grid) */}
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
                        <div className="font-black text-base text-slate-900">{duesStatus}</div>
                        <div className="text-xs text-slate-500 font-medium">August Maintenance Dues</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveSection('payments')}
                      className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-sm transition-transform active:scale-95 cursor-pointer"
                    >
                      <ArrowRight className="w-5 h-5" />
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
                        <div className="text-xs text-slate-500 font-medium">Tax invoices & CA receipts</div>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </button>

                </div>
              </div>

              {/* SECTION 4: HOUSEHOLD WIDGETS & TELEMETRY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Active Helpers Widget */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-slate-900">Household Helpers Attendance</span>
                    <button onClick={() => setActiveSection('helpers')} className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                  </div>
                  <div className="space-y-3 text-xs">
                    {myHelpersList.map(h => (
                      <div key={h.id} className="p-3 bg-slate-50 rounded-2xl flex justify-between items-center">
                        <div>
                          <div className="font-bold text-slate-900">{h.name} ({h.role})</div>
                          <div className="text-[11px] text-slate-500">{h.time}</div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          h.status.includes('Inside') ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {h.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gate Deliveries Widget */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-slate-900">Gate Deliveries & Shelf Lockers</span>
                    <button onClick={() => setActiveSection('visitors_parcels')} className="text-xs font-bold text-blue-600 hover:underline">View Queue</button>
                  </div>
                  <div className="space-y-3 text-xs">
                    {parcelsList.map(p => (
                      <div key={p.id} className="p-3 bg-slate-50 rounded-2xl flex justify-between items-center">
                        <div>
                          <div className="font-bold text-slate-900">{p.courier} ({p.orderNo})</div>
                          <div className="text-[11px] text-slate-500">Location: {p.shelf}</div>
                        </div>
                        <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
                          OTP: {p.otp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. VISITORS & PARCELS FULL DESKTOP VIEW */}
          {/* ========================================================================= */}
          {activeSection === 'visitors_parcels' && (
            <div className="space-y-6">
              
              {/* Header Hero Banner (Screenshot 5 Signs) */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] shadow-xs shrink-0">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Visitors & Parcels</h2>
                    <p className="text-xs text-slate-500 mt-1">Stay updated on all arrivals and pre-authorize guest passes for your home</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowPreApproveModal(true)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  + Pre-approve Visitors
                </button>
              </div>

              {/* 2-Column Desktop Grid */}
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
          {/* 3. HELPERS & 13 SERVICE CATEGORIES FULL DESKTOP VIEW */}
          {/* ========================================================================= */}
          {activeSection === 'helpers' && (
            <div className="space-y-6">
              
              {/* Header Hero Banner (Screenshots 1 & 2 Signs) */}
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

              {/* Search Category Filter */}
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search for category (e.g. Cleaning, Water Supply, Gym Trainer, Milk...)"
                  value={categorySearchQuery}
                  onChange={(e) => setCategorySearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-xs"
                />
              </div>

              {/* 13 Categories Desktop Grid (Screenshot 4 Replication) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {helperCategories.filter(c => c.name.toLowerCase().includes(categorySearchQuery.toLowerCase())).map(cat => {
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

              {/* Category Verified Providers List */}
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
          {/* 4. MEMBERS & VEHICLES */}
          {/* ========================================================================= */}
          {activeSection === 'members' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-bold text-base text-slate-900 block">Flat B-108 Registered Members</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="font-bold text-sm text-slate-900">Ananya Sharma</div>
                    <div className="text-xs text-slate-500">Primary Owner • 98765 11111</div>
                    <span className="inline-block bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px] mt-2">Owner</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="font-bold text-sm text-slate-900">Rahul Sharma</div>
                    <div className="text-xs text-slate-500">Co-Owner (Spouse) • 98765 22222</div>
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold text-[10px] mt-2">Family</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="font-bold text-sm text-slate-900">Aarav Sharma</div>
                    <div className="text-xs text-slate-500">Child (Resident)</div>
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold text-[10px] mt-2">Family</span>
                  </div>
                </div>

                <span className="font-bold text-base text-slate-900 block pt-4">Registered Vehicles & RFID Slot</span>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm text-slate-900">KA-03-MB-4921 (Honda City Sedan)</div>
                    <div className="text-xs text-slate-500">Allocated Parking Slot: <strong>Slot B-42</strong> • FastTag ANPR RFID Active</div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold text-xs">Verified ✓</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. NOTICES */}
          {/* ========================================================================= */}
          {activeSection === 'notices' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-bold text-base text-slate-900 block">Official RWA Notices & Circulars (23 Unread)</span>
                
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="bg-indigo-600 text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold">AGM EVENT</span>
                      <span className="text-xs text-slate-500">Today at 11:30 AM</span>
                    </div>
                    <div className="font-bold text-base text-slate-900">Annual RWA General Body Meeting (AGM) & Elections</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Annual General Body Meeting for FY 2026-27 is scheduled for Sunday, August 30 at 10:00 AM in Clubhouse Banquet Hall. Financial audit approval & committee elections will take place.
                    </p>
                    <button onClick={() => alert('RSVP Confirmed for AGM!')} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                      RSVP Attending AGM
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="bg-amber-600 text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold">MAINTENANCE</span>
                      <span className="text-xs text-slate-500">Yesterday</span>
                    </div>
                    <div className="font-bold text-base text-slate-900">Overhead Water Tank Sanitization Notice</div>
                    <p className="text-xs text-slate-600">Water supply will be paused on Tuesday from 10:00 AM to 02:00 PM for sanitization of all tower tanks.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 6. HELPDESK TICKETS */}
          {/* ========================================================================= */}
          {activeSection === 'helpdesk' && (
            <div className="space-y-6">
              
              {/* Ticket Creator Form */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-bold text-base text-slate-900 block">Raise New Helpdesk Complaint</span>
                
                <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Issue Subject (e.g. Pipe Leakage)"
                      value={newTicketSubject}
                      onChange={(e) => setNewTicketSubject(e.target.value)}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                    />

                    <select
                      value={newTicketCategory}
                      onChange={(e) => setNewTicketCategory(e.target.value)}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium"
                    >
                      <option value="Plumbing">Plumbing Maintenance</option>
                      <option value="Electrical">Electrical Repairs</option>
                      <option value="Carpentry">Carpentry & Lock</option>
                      <option value="Housekeeping">Housekeeping</option>
                    </select>

                    <select
                      value={newTicketPriority}
                      onChange={(e) => setNewTicketPriority(e.target.value)}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium"
                    >
                      <option value="High">High (Immediate Action)</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Provide details about the issue..."
                    value={newTicketDesc}
                    onChange={(e) => setNewTicketDesc(e.target.value)}
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md cursor-pointer"
                  >
                    Submit Helpdesk Ticket & Dispatch Technician
                  </button>
                </form>
              </div>

              {/* Tickets Directory */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-bold text-base text-slate-900 block">Ticket History & SLA Status</span>

                <div className="space-y-3 text-xs">
                  {ticketsList.map(t => (
                    <div key={t.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-sm text-slate-900">{t.subject} ({t.id})</div>
                          <div className="text-xs text-slate-500 mt-0.5">{t.category} • Assigned: {t.assignedTo}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full font-bold text-[10px] ${
                          t.status === 'In Progress' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {t.status} ({t.sla})
                        </span>
                      </div>

                      {t.status === 'Resolved' && (
                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                          <span className="text-slate-600 font-bold">Rate Service:</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                onClick={() => handleRateTicket(t.id, star)}
                                className={`text-base cursor-pointer ${t.rating && t.rating >= star ? 'text-amber-500 font-black' : 'text-slate-300'}`}
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

          {/* ========================================================================= */}
          {/* 7. PRE-PAID METER & DUES */}
          {/* ========================================================================= */}
          {activeSection === 'payments' && (
            <div className="space-y-6">
              
              {/* Pre-paid Meter + Dues 2-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Pre-paid Meter */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-base text-slate-900">Pre-paid Electricity Meter</span>
                    <span className="text-xs text-[#EF4444] font-bold bg-red-50 px-2.5 py-1 rounded-full">Low Balance</span>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center space-y-2">
                    <div className="text-xs text-slate-500 font-bold uppercase">Current Meter Balance</div>
                    <div className="font-black text-3xl text-[#EF4444]">₹ {meterBalance.toFixed(2)}</div>
                    <p className="text-xs text-slate-500">Power disconnect alert threshold at ₹ 0.00</p>
                  </div>

                  <button
                    onClick={() => setShowRechargeModal(true)}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md cursor-pointer"
                  >
                    Recharge Pre-paid Meter
                  </button>
                </div>

                {/* Maintenance Dues Breakdown */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-base text-slate-900">August 2026 Maintenance</span>
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">Paid ✓</span>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-600"><span>Maintenance (2BHK 1,250 sqft @ ₹3.50)</span><span className="font-bold">₹ 3,200</span></div>
                    <div className="flex justify-between text-slate-600"><span>Sinking Fund Contribution</span><span className="font-bold">₹ 500</span></div>
                    <div className="flex justify-between text-slate-600"><span>Piped Water Usage (320 L/day avg)</span><span className="font-bold">₹ 400</span></div>
                    <div className="flex justify-between text-slate-600"><span>GST Tax (18%)</span><span className="font-bold">₹ 666</span></div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-sm text-slate-900">
                      <span>Total Amount</span>
                      <span className="text-base font-extrabold text-slate-900">₹ 4,766</span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert('Downloading GST Tax Invoice PDF #GST-9021...')}
                    className="w-full py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Download GST Invoice PDF
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 8. AMENITIES BOOKING */}
          {activeSection === 'amenities' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-bold text-base text-slate-900 block">Reserve Society Amenities</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Badminton Court 2 (Indoor Wooden)', slot: '06:00 PM - 07:00 PM', price: 'Free for Residents' },
                    { name: 'Tennis Court 1 (Synthetic Surface)', slot: '07:00 AM - 08:00 AM', price: 'Free for Residents' },
                    { name: 'Clubhouse Banquet Hall (150 Capacity)', slot: '05:00 PM - 10:00 PM', price: '₹ 5,000 / Event' },
                    { name: 'Squash Court 1 (Air Conditioned)', slot: '07:00 PM - 08:00 PM', price: 'Free for Residents' },
                  ].map((am, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-sm text-slate-900">{am.name}</div>
                        <div className="text-xs text-slate-500">{am.slot} • {am.price}</div>
                      </div>
                      <button
                        onClick={() => alert(`Slot booked for ${am.name}!`)}
                        className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs cursor-pointer"
                      >
                        Book Slot
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 9. EVENTS, SOCIAL & CHATS */}
          {activeSection === 'events' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-bold text-base text-slate-900 block">Society Events Calendar</span>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="bg-indigo-600 text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold">FESTIVAL</span>
                <div className="font-bold text-base text-slate-900">Ganesh Chaturthi Grand Utsav 2026</div>
                <p className="text-xs text-slate-600">3-Day grand celebration at Clubhouse lawn with cultural events.</p>
                <button onClick={() => alert('RSVP Confirmed for Ganesh Utsav!')} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                  RSVP Going
                </button>
              </div>
            </div>
          )}

          {activeSection === 'social' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-bold text-base text-slate-900 block">Active Community Poll</span>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="font-bold text-sm text-slate-900">Which Swimming Pool Maintenance Agency should RWA hire for FY 2026-27?</div>
                <div className="space-y-2.5">
                  {pollOptions.map(opt => (
                    <div
                      key={opt.id}
                      onClick={() => handleVote(opt.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        pollVoted === opt.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>{opt.text}</span>
                        <span>{opt.percent}% ({opt.votes} Votes)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${opt.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'chats' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-bold text-base text-slate-900 block">Community Intercom & Channels</span>
              <div className="space-y-3">
                {[
                  { name: 'Gate 1 Security Intercom', desc: 'Guard Vikram: Package received for B-108', time: '11:20 AM' },
                  { name: 'Tower B Residents Group', desc: 'Meenakshi: Lift #2 is working normally now', time: 'Yesterday' },
                  { name: 'Green Haven Buy / Sell Marketplace', desc: 'Rohan: Bicycle for sale', time: '20 Aug' },
                ].map((c, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-sm text-slate-900">{c.name}</div>
                      <div className="text-xs text-slate-500">{c.desc}</div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{c.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'documents' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <span className="font-bold text-base text-slate-900 block">Society Documents (8 Files)</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Green Haven Society Bylaws & Regulations', size: '2.4 MB PDF' },
                  { name: 'Tenant Move-In / Move-Out NOC Form', size: '420 KB PDF' },
                  { name: 'Fire Safety & Disaster Evacuation Guide', size: '1.8 MB PDF' },
                  { name: 'Clubhouse Banquet Hall Usage Guidelines', size: '650 KB PDF' },
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
                  { title: 'RWA President Office', phone: '98450 11990' },
                  { title: 'Emergency Ambulance & First Aid', phone: '108' },
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

        </main>

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: PRE-APPROVE VISITOR MODAL */}
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
      {/* MODAL 2: RECHARGE PRE-PAID METER MODAL */}
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
      {/* MODAL 3: EMERGENCY SOS PANIC MODAL */}
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
