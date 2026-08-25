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

// Sub-screen navigation states
type ResidentScreen = 
  | 'home'
  | 'visitors_parcels'
  | 'pre_approvals_list'
  | 'parcels_list'
  | 'helpers'
  | 'find_helpers'
  | 'helper_category_detail'
  | 'members'
  | 'notices'
  | 'helpdesk'
  | 'documents'
  | 'directory'
  | 'prepaid_meter'
  | 'dues'
  | 'payment_history';

type BottomTab = 'home' | 'amenities' | 'events' | 'social' | 'chats';

export const ResidentPortal: React.FC<ResidentPortalProps> = ({ onExit }) => {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<ResidentScreen>('home');
  const [activeTab, setActiveTab] = useState<BottomTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('Cleaning');

  // Notification Toast Banner State
  const [showNotificationToast, setShowNotificationToast] = useState<boolean>(true);

  // SOS Modal State
  const [showSosModal, setShowSosModal] = useState<boolean>(false);
  const [sosTriggered, setSosTriggered] = useState<boolean>(false);

  // Pre-Approve Visitor Modal
  const [showPreApproveModal, setShowPreApproveModal] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('Siddharth Verma');
  const [guestPhone, setGuestPhone] = useState<string>('98765 43210');
  const [guestArrival, setGuestArrival] = useState<string>('Today at 04:30 PM');
  const [guestPurpose, setGuestPurpose] = useState<string>('Dinner Guest');
  const [guestVehicle, setGuestVehicle] = useState<string>('KA-01-MJ-9090');
  const [generatedPass, setGeneratedPass] = useState<{ otp: string; name: string; mobile: string; arrival: string } | null>(null);

  // Pre-Paid Meter State
  const [meterBalance, setMeterBalance] = useState<number>(-22.47);
  const [showRechargeModal, setShowRechargeModal] = useState<boolean>(false);
  const [rechargeAmount, setRechargeAmount] = useState<number>(1000);

  // Dues State
  const [duesStatus, setDuesStatus] = useState<'All Clear!' | 'Pending' | 'Paid'>('All Clear!');
  const [maintenanceAmount] = useState<number>(4766);
  const [isBillPaid, setIsBillPaid] = useState<boolean>(true);

  // Search States
  const [categorySearchQuery, setCategorySearchQuery] = useState<string>('');
  const [helperSearchQuery, setHelperSearchQuery] = useState<string>('');

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

  // 13 Categories from Image 4
  const helperCategories = [
    { id: 'rent_sell', name: 'Rent/Sell', count: 1, icon: Tag, color: 'text-slate-700' },
    { id: 'wifi', name: 'Wifi/Internet', count: 2, icon: Wifi, color: 'text-blue-600' },
    { id: 'ac', name: 'AC', count: 0, icon: Snowflake, color: 'text-cyan-600' },
    { id: 'cleaning', name: 'Cleaning', count: 8, icon: Sparkles, color: 'text-amber-600' },
    { id: 'water', name: 'Water Supply', count: 3, icon: Droplets, color: 'text-sky-600' },
    { id: 'gym', name: 'Gym Trainer', count: 2, icon: Dumbbell, color: 'text-emerald-600' },
    { id: 'swimming', name: 'Swimming Instructor', count: 1, icon: Waves, color: 'text-teal-600' },
    { id: 'music', name: 'Music Coach', count: 4, icon: Music, color: 'text-purple-600' },
    { id: 'sports', name: 'Sports Coach', count: 2, icon: Trophy, color: 'text-orange-600' },
    { id: 'milk', name: 'Milk', count: 24, icon: Package, color: 'text-indigo-600' },
    { id: 'newspaper', name: 'Newspaper', count: 0, icon: Newspaper, color: 'text-slate-600' },
    { id: 'flowers', name: 'Flowers', count: 0, icon: Sparkles, color: 'text-rose-600' },
    { id: 'packers', name: 'Packers & Movers', count: 0, icon: Truck, color: 'text-zinc-600' },
  ];

  // Category Providers Database
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

  // Community Polls
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
      { id: newId, subject: newTicketSubject, category: newTicketCategory, desc: newTicketDesc || 'Reported via Resident App', priority: newTicketPriority, status: 'In Progress', assignedTo: 'Assigned to Facility Duty Tech', sla: '2 Hours SLA', date: 'Just Now', rating: null },
      ...ticketsList
    ]);
    setNewTicketSubject('');
    setNewTicketDesc('');
    alert(`Ticket ${newId} created successfully! Technician has been alerted.`);
  };

  const handleRateTicket = (id: string, star: number) => {
    setTicketsList(prev => prev.map(t => t.id === id ? { ...t, rating: star } : t));
  };

  const handleVote = (id: number) => {
    if (pollVoted !== null) return;
    setPollVoted(id);
    setPollOptions(prev => prev.map(opt => opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt));
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans text-slate-800 antialiased selection:bg-[#1C352C] selection:text-white">
      
      {/* Mobile-Frame Canvas Container */}
      <div className="w-full max-w-md bg-white sm:rounded-[36px] shadow-2xl overflow-hidden min-h-screen sm:min-h-[840px] flex flex-col relative border border-slate-100">
        
        {/* ========================================================================= */}
        {/* TOP APP BAR (Header) */}
        {/* ========================================================================= */}
        {currentScreen === 'home' ? (
          <header className="px-5 pt-6 pb-4 bg-white flex items-center justify-between border-b border-slate-100 sticky top-0 z-20">
            {/* User Profile & Flat Info */}
            <div className="flex items-center gap-3.5">
              {/* Avatar matching Screenshot */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#6366F1] to-[#818CF8] p-0.5 shadow-sm flex items-center justify-center shrink-0">
                <div className="w-full h-full rounded-full bg-[#525CEB] flex items-center justify-center text-white font-bold text-lg overflow-hidden relative">
                  <span className="text-xl">👨‍💼</span>
                </div>
              </div>

              <div>
                <div className="font-extrabold text-xl text-slate-900 tracking-tight leading-tight">
                  B-108
                </div>
                <div className="text-xs text-slate-600 font-medium tracking-wide">
                  ASBL Springs, Pocharam
                </div>
              </div>
            </div>

            {/* Top Right Actions: SOS + Exit Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSosModal(true)}
                className="px-3.5 py-1.5 rounded-2xl bg-[#FEE2E2] hover:bg-[#FECACA] text-[#DC2626] border border-[#FCA5A5]/60 flex items-center gap-1.5 text-xs font-bold shadow-sm transition-transform active:scale-95"
              >
                <Flame className="w-4 h-4 text-[#DC2626] animate-pulse" />
                <span>SOS</span>
              </button>

              <button
                onClick={onExit}
                title="Exit to All Portals"
                className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </header>
        ) : (
          /* SUB-SCREEN TOP NAV HEADER WITH BACK BUTTON */
          <header className="px-5 py-4 bg-white flex items-center justify-between border-b border-slate-100 sticky top-0 z-20">
            <button
              onClick={() => setCurrentScreen('home')}
              className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-transform active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="font-bold text-base text-slate-900 capitalize">
              {currentScreen === 'visitors_parcels' && 'Visitors & Parcels'}
              {currentScreen === 'helpers' && 'Helpers'}
              {currentScreen === 'find_helpers' && 'Find Helpers'}
              {currentScreen === 'helper_category_detail' && selectedCategory}
              {currentScreen === 'members' && 'Members & Vehicles'}
              {currentScreen === 'notices' && 'Notice Board'}
              {currentScreen === 'helpdesk' && 'Helpdesk Tickets'}
              {currentScreen === 'documents' && 'Society Documents'}
              {currentScreen === 'directory' && 'Resident Directory'}
              {currentScreen === 'prepaid_meter' && 'Pre-paid Meter'}
              {currentScreen === 'dues' && 'Society Dues'}
              {currentScreen === 'payment_history' && 'Payment History'}
            </div>

            <div className="w-9" /> {/* Spacer */}
          </header>
        )}

        {/* ========================================================================= */}
        {/* MAIN BODY VIEW CONTENT */}
        {/* ========================================================================= */}
        <main className="flex-1 overflow-y-auto pb-24">
          
          {/* ========================================================================= */}
          {/* TAB: 1. HOME VIEW (SCREENSHOT 3 REPLICATION) */}
          {/* ========================================================================= */}
          {activeTab === 'home' && currentScreen === 'home' && (
            <div className="p-5 space-y-6">
              
              {/* SECTION 1: MY HOME */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 block px-1">
                  MY HOME
                </span>

                <div className="grid grid-cols-3 gap-3">
                  {/* Card 1: Visitors */}
                  <button
                    onClick={() => setCurrentScreen('visitors_parcels')}
                    className="bg-[#F8F9FB] hover:bg-[#F1F3F7] p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border border-slate-100 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#525CEB] shadow-xs border border-slate-100">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Visitors</span>
                  </button>

                  {/* Card 2: Helpers */}
                  <button
                    onClick={() => setCurrentScreen('helpers')}
                    className="bg-[#F8F9FB] hover:bg-[#F1F3F7] p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border border-slate-100 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#EC4899] shadow-xs border border-slate-100">
                      <HandHeart className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Helpers</span>
                  </button>

                  {/* Card 3: Members */}
                  <button
                    onClick={() => setCurrentScreen('members')}
                    className="bg-[#F8F9FB] hover:bg-[#F1F3F7] p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border border-slate-100 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#64748B] shadow-xs border border-slate-100">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Members</span>
                  </button>
                </div>
              </div>

              {/* SECTION 2: SOCIETY */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 block px-1">
                  SOCIETY
                </span>

                <div className="grid grid-cols-2 gap-3">
                  {/* Notices */}
                  <button
                    onClick={() => setCurrentScreen('notices')}
                    className="bg-[#F8F9FB] hover:bg-[#F1F3F7] p-4 rounded-2xl flex items-center gap-3.5 border border-slate-100 text-left transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-700 shadow-xs border border-slate-100 shrink-0">
                      <FileText className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Notices</div>
                      <div className="text-[11px] font-semibold text-[#EF4444]">23 Unread</div>
                    </div>
                  </button>

                  {/* Helpdesk */}
                  <button
                    onClick={() => setCurrentScreen('helpdesk')}
                    className="bg-[#F8F9FB] hover:bg-[#F1F3F7] p-4 rounded-2xl flex items-center gap-3.5 border border-slate-100 text-left transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-700 shadow-xs border border-slate-100 shrink-0">
                      <Headphones className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Helpdesk</div>
                      <div className="text-[11px] font-semibold text-slate-600">1 In Progress</div>
                    </div>
                  </button>

                  {/* Documents */}
                  <button
                    onClick={() => setCurrentScreen('documents')}
                    className="bg-[#F8F9FB] hover:bg-[#F1F3F7] p-4 rounded-2xl flex items-center gap-3.5 border border-slate-100 text-left transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-700 shadow-xs border border-slate-100 shrink-0">
                      <Folder className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Documents</div>
                      <div className="text-[11px] font-semibold text-slate-600">8 Files</div>
                    </div>
                  </button>

                  {/* Directory */}
                  <button
                    onClick={() => setCurrentScreen('directory')}
                    className="bg-[#F8F9FB] hover:bg-[#F1F3F7] p-4 rounded-2xl flex items-center gap-3.5 border border-slate-100 text-left transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-700 shadow-xs border border-slate-100 shrink-0">
                      <Contact className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Directory</div>
                      <div className="text-[11px] font-semibold text-slate-600">Gate & RWA</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* SECTION 3: PAYMENTS */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 block px-1">
                  PAYMENTS
                </span>

                <div className="space-y-3">
                  {/* Pre-paid Meter Card */}
                  <div className="bg-[#F8F9FB] p-4 rounded-2xl border border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-700 shadow-xs border border-slate-100 shrink-0">
                        <Gauge className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-[#EF4444]">
                            ₹ {meterBalance.toFixed(2)}
                          </span>
                          {meterBalance < 0 && (
                            <span className="text-[10px] font-bold text-[#DC2626] bg-[#FEE2E2] px-2 py-0.5 rounded-full">
                              Low Balance
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-600 font-medium mt-0.5">Pre-paid Meter</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowRechargeModal(true)}
                      className="px-4 py-2 rounded-2xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shadow-sm transition-transform active:scale-95"
                    >
                      Recharge
                    </button>
                  </div>

                  {/* Dues Card */}
                  <div className="bg-[#F8F9FB] p-4 rounded-2xl border border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-700 shadow-xs border border-slate-100 shrink-0">
                        <IndianRupee className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">
                          {duesStatus}
                        </div>
                        <div className="text-xs text-slate-600 font-medium mt-0.5">Dues</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentScreen('dues')}
                      className="w-9 h-9 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white flex items-center justify-center shadow-sm transition-transform active:scale-95"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* History Card */}
                  <button
                    onClick={() => setCurrentScreen('payment_history')}
                    className="w-full bg-[#F8F9FB] hover:bg-[#F1F3F7] p-4 rounded-2xl border border-slate-100 flex items-center justify-between gap-3 text-left transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-700 shadow-xs border border-slate-100 shrink-0">
                        <History className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">History</div>
                        <div className="text-xs text-slate-600 font-medium mt-0.5">View all past receipts</div>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* NOTIFICATION TEST FLOATING BANNER (Screenshot 3) */}
              {showNotificationToast && (
                <div className="bg-[#1E293B] text-white p-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-2.5">
                    <Bell className="w-4 h-4 text-[#FDE047] shrink-0" />
                    <span className="text-xs font-semibold text-slate-100">Not Getting Notifications?</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert('Push Notification Test dispatched to Flat B-108!')}
                      className="px-3 py-1 rounded-xl bg-white text-[#0F172A] font-bold text-xs shadow-sm hover:bg-slate-100 transition-all"
                    >
                      Test Now
                    </button>
                    <button
                      onClick={() => setShowNotificationToast(false)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-SCREEN: VISITORS & PARCELS (SCREENSHOT 5 REPLICATION) */}
          {/* ========================================================================= */}
          {currentScreen === 'visitors_parcels' && (
            <div className="p-6 flex flex-col items-center text-center space-y-6">
              
              {/* Large Gate Barrier Icon */}
              <div className="w-20 h-20 rounded-3xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] shadow-inner mt-4">
                <ShieldCheck className="w-10 h-10" />
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h2 className="font-extrabold text-2xl text-slate-900 tracking-tight">Visitors & Parcels</h2>
                <p className="text-xs text-slate-600 max-w-xs">Stay updated on all arrivals for your home</p>
              </div>

              {/* List Cards: Pre Approvals & Parcels */}
              <div className="w-full space-y-3 pt-2">
                {/* Pre Approvals Card */}
                <button
                  onClick={() => setCurrentScreen('pre_approvals_list')}
                  className="w-full p-4 rounded-2xl bg-[#F8F9FB] hover:bg-[#F1F3F7] border border-slate-100 flex items-center justify-between text-left transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-700 shadow-xs border border-slate-100">
                      <User className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-800">Pre Approvals</div>
                      <div className="text-[11px] text-slate-600">{preApprovedList.length} Active Passes</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>

                {/* Parcels Card */}
                <button
                  onClick={() => setCurrentScreen('parcels_list')}
                  className="w-full p-4 rounded-2xl bg-[#F8F9FB] hover:bg-[#F1F3F7] border border-slate-100 flex items-center justify-between text-left transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-700 shadow-xs border border-slate-100">
                      <Package className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-800">Parcels</div>
                      <div className="text-[11px] text-slate-600">2 Awaiting Pickup at Shelf</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Subtitle bottom note */}
              <div className="text-xs text-slate-600 pt-6 font-medium">
                Invite people to make it more lively ✨
              </div>

              {/* Bottom CTA Full Width Button */}
              <div className="w-full pt-4">
                <button
                  onClick={() => setShowPreApproveModal(true)}
                  className="w-full py-4 rounded-2xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-sm shadow-lg transition-transform active:scale-98"
                >
                  Pre-approve Visitors
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-SCREEN: PRE-APPROVALS ACTIVE PASSES LIST */}
          {/* ========================================================================= */}
          {currentScreen === 'pre_approvals_list' && (
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Active Guest Passes</span>
                <button
                  onClick={() => setShowPreApproveModal(true)}
                  className="px-3 py-1.5 bg-[#0F172A] text-white rounded-xl font-bold text-xs"
                >
                  + New Pass
                </button>
              </div>

              <div className="space-y-3">
                {preApprovedList.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-sm text-slate-900">{p.name}</div>
                        <div className="text-xs text-slate-600">{p.mobile} • {p.arrival}</div>
                      </div>
                      <span className="bg-[#DCFCE7] text-[#166534] px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                        {p.status}
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-100 flex justify-between items-center">
                      <div>
                        <div className="text-[10px] text-slate-600 font-bold uppercase">Gate OTP Passcode</div>
                        <div className="font-mono font-black text-lg text-slate-900 tracking-widest">{p.otp}</div>
                      </div>
                      <QrCode className="w-8 h-8 text-slate-700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-SCREEN: PARCELS LIST */}
          {/* ========================================================================= */}
          {currentScreen === 'parcels_list' && (
            <div className="p-5 space-y-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Gate Shelf Storage Queue</span>
              <div className="space-y-3">
                {parcelsList.map((par) => (
                  <div key={par.id} className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-sm text-slate-900">{par.courier} ({par.orderNo})</div>
                      <div className="text-xs text-slate-600">{par.shelf} • {par.arrival}</div>
                      <div className="text-[11px] font-mono font-bold text-[#4F46E5] mt-1">Pickup OTP: {par.otp}</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                      par.status.includes('Awaiting') ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {par.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-SCREEN: HELPERS (SCREENSHOT 1 & 2 REPLICATION) */}
          {/* ========================================================================= */}
          {currentScreen === 'helpers' && (
            <div className="p-6 flex flex-col items-center text-center space-y-6">
              
              {/* Large Hand with Heart Icon */}
              <div className="w-20 h-20 rounded-3xl bg-[#FCE7F3] flex items-center justify-center text-[#EC4899] shadow-inner mt-4">
                <HandHeart className="w-10 h-10" />
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h2 className="font-extrabold text-2xl text-slate-900 tracking-tight">Helpers</h2>
                <p className="text-xs text-slate-600 max-w-xs">Hire trusted helpers for your needs</p>
              </div>

              {/* Search Card: Find Helpers */}
              <div className="w-full pt-2">
                <button
                  onClick={() => setCurrentScreen('find_helpers')}
                  className="w-full p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-xs flex items-center gap-3 text-slate-700 font-bold text-sm transition-all"
                >
                  <User className="w-5 h-5 text-slate-600 shrink-0" />
                  <span>Find Helpers</span>
                </button>
              </div>

              {/* Household Active Helpers */}
              <div className="w-full text-left space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">My Household Helpers ({myHelpersList.length})</span>
                {myHelpersList.map((h) => (
                  <div key={h.id} className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-sm text-slate-900">{h.name}</div>
                      <div className="text-xs text-slate-600">{h.role} • {h.time}</div>
                      <div className="text-[11px] text-slate-600">{h.phone} • {h.salary}</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                      h.status.includes('Inside') ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {h.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Safety Note (Screenshot 1/2) */}
              <div className="text-xs text-slate-600 pt-8 font-medium">
                We verify all our helpers before onboarding them for your safety. ❤️
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-SCREEN: FIND HELPERS CATEGORIES (SCREENSHOT 4 REPLICATION) */}
          {/* ========================================================================= */}
          {currentScreen === 'find_helpers' && (
            <div className="p-5 space-y-4">
              
              {/* Search Bar matching Screenshot 4 */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search for category"
                  value={categorySearchQuery}
                  onChange={(e) => setCategorySearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0F172A] shadow-xs"
                />
              </div>

              {/* 13 Category List with counts and chevron */}
              <div className="bg-white rounded-2xl divide-y divide-slate-100 border border-slate-100 overflow-hidden shadow-xs">
                {helperCategories.filter(cat => cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase())).map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setCurrentScreen('helper_category_detail');
                      }}
                      className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#F8F9FB] transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${cat.color}`} />
                        <span className="text-xs font-semibold text-slate-800">{cat.name}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-600">{cat.count}</span>
                        <ChevronRight className="w-4 h-4 text-slate-600" />
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-SCREEN: HELPER CATEGORY DETAILS & DIRECTORY */}
          {/* ========================================================================= */}
          {currentScreen === 'helper_category_detail' && (
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Verified {selectedCategory} Providers
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Aadhaar Verified ✓
                </span>
              </div>

              <div className="space-y-3">
                {(providersByCategory[selectedCategory] || providersByCategory['Cleaning']).map((p, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-sm text-slate-900">{p.name}</div>
                        <div className="text-xs text-slate-600">{p.exp} • Works in {p.flats} Flats</div>
                      </div>
                      <span className="bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded font-bold text-xs">
                        {p.rating} ({p.reviews})
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-1 text-xs">
                      <span className="font-bold text-slate-800">{p.rate}</span>
                      <button
                        onClick={() => alert(`Calling ${p.name} at ${p.phone}...`)}
                        className="px-3.5 py-1.5 bg-[#0F172A] text-white rounded-xl font-bold flex items-center gap-1 shadow-sm"
                      >
                        <Phone className="w-3 h-3" /> Hire / Call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-SCREEN: MEMBERS & VEHICLES */}
          {/* ========================================================================= */}
          {currentScreen === 'members' && (
            <div className="p-5 space-y-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Flat B-108 Registered Members</span>
              
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm text-slate-900">Ananya Sharma</div>
                    <div className="text-xs text-slate-600">Primary Owner • 98765 11111</div>
                  </div>
                  <span className="bg-[#DCFCE7] text-[#166534] px-2.5 py-0.5 rounded-full font-bold text-[10px]">Owner</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm text-slate-900">Rahul Sharma</div>
                    <div className="text-xs text-slate-600">Co-Owner (Spouse) • 98765 22222</div>
                  </div>
                  <span className="bg-[#DCFCE7] text-[#166534] px-2.5 py-0.5 rounded-full font-bold text-[10px]">Family</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm text-slate-900">Aarav Sharma</div>
                    <div className="text-xs text-slate-600">Child (Resident)</div>
                  </div>
                  <span className="bg-[#DCFCE7] text-[#166534] px-2.5 py-0.5 rounded-full font-bold text-[10px]">Family</span>
                </div>
              </div>

              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block pt-2">Registered Vehicles & RFID</span>
              <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 space-y-1">
                <div className="font-bold text-sm text-slate-900">KA-03-MB-4921 (Honda City Sedan)</div>
                <div className="text-xs text-slate-600">Allocated Parking Slot: <strong>Slot B-42</strong> • FastTag RFID Active</div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-SCREEN: NOTICES */}
          {/* ========================================================================= */}
          {currentScreen === 'notices' && (
            <div className="p-5 space-y-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Official Society Circulars</span>
              
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="bg-[#525CEB] text-white px-2 py-0.5 rounded text-[10px] font-bold">AGM EVENT</span>
                    <span className="text-xs text-slate-600">Today</span>
                  </div>
                  <div className="font-bold text-sm text-slate-900">Annual RWA General Body Meeting (AGM)</div>
                  <p className="text-xs text-slate-600">Scheduled for Sunday, August 30 at 10:00 AM in Clubhouse Banquet Hall.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="bg-[#EA580C] text-white px-2 py-0.5 rounded text-[10px] font-bold">MAINTENANCE</span>
                    <span className="text-xs text-slate-600">Yesterday</span>
                  </div>
                  <div className="font-bold text-sm text-slate-900">Overhead Water Tank Sanitization Notice</div>
                  <p className="text-xs text-slate-600">Water supply will be paused on Tuesday from 10:00 AM to 02:00 PM.</p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-SCREEN: HELPDESK & TICKETS */}
          {/* ========================================================================= */}
          {currentScreen === 'helpdesk' && (
            <div className="p-5 space-y-5">
              {/* Create Ticket Form */}
              <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Raise New Complaint</span>
                <form onSubmit={handleCreateTicket} className="space-y-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Issue Subject (e.g. Kitchen Pipe Leak)"
                    value={newTicketSubject}
                    onChange={(e) => setNewTicketSubject(e.target.value)}
                    className="w-full p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newTicketCategory}
                      onChange={(e) => setNewTicketCategory(e.target.value)}
                      className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-medium"
                    >
                      <option value="Plumbing">Plumbing</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Carpentry">Carpentry</option>
                      <option value="Housekeeping">Housekeeping</option>
                    </select>

                    <select
                      value={newTicketPriority}
                      onChange={(e) => setNewTicketPriority(e.target.value)}
                      className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-medium"
                    >
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0F172A] text-white font-bold text-xs rounded-xl shadow-sm"
                  >
                    Submit Ticket
                  </button>
                </form>
              </div>

              {/* Tickets Directory */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Ticket History ({ticketsList.length})</span>
                {ticketsList.map((t) => (
                  <div key={t.id} className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-sm text-slate-900">{t.subject}</div>
                        <div className="text-xs text-slate-600">{t.category} • {t.assignedTo}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        t.status === 'In Progress' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#DCFCE7] text-[#166534]'
                      }`}>
                        {t.status}
                      </span>
                    </div>

                    {t.status === 'Resolved' && (
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-600 font-bold">Rate Technician:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => handleRateTicket(t.id, star)}
                              className={`text-sm ${t.rating && t.rating >= star ? 'text-amber-500 font-black' : 'text-slate-300'}`}
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
          )}

          {/* ========================================================================= */}
          {/* SUB-SCREEN: DOCUMENTS */}
          {/* ========================================================================= */}
          {currentScreen === 'documents' && (
            <div className="p-5 space-y-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Society Bylaws & Forms (8 Files)</span>
              
              <div className="space-y-3">
                {[
                  { name: 'Green Haven Society Bylaws & Regulations', size: '2.4 MB PDF' },
                  { name: 'Tenant Move-In / Move-Out NOC Form', size: '420 KB PDF' },
                  { name: 'Fire Safety & Disaster Evacuation Guide', size: '1.8 MB PDF' },
                  { name: 'Clubhouse Banquet Hall Usage Guidelines', size: '650 KB PDF' },
                  { name: 'Pet Policy & Guidelines Notice', size: '320 KB PDF' },
                ].map((doc, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{doc.name}</div>
                      <div className="text-[11px] text-slate-600">{doc.size}</div>
                    </div>
                    <button
                      onClick={() => alert(`Downloading ${doc.name}...`)}
                      className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-SCREEN: DIRECTORY */}
          {/* ========================================================================= */}
          {currentScreen === 'directory' && (
            <div className="p-5 space-y-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Important Contacts</span>
              
              <div className="space-y-3">
                {[
                  { title: 'Gate 1 Main Entry Intercom', phone: 'Ext: 101 • 98123 45678' },
                  { title: 'Gate 2 Rear Entry Intercom', phone: 'Ext: 102 • 98765 43210' },
                  { title: 'RWA President Office', phone: '98450 11990' },
                  { title: 'Emergency Ambulance & First Aid', phone: '108 / 080-22334455' },
                  { title: 'Fire Station Desk', phone: '101' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-600">{item.phone}</div>
                    </div>
                    <button
                      onClick={() => alert(`Calling ${item.title}...`)}
                      className="px-3 py-1.5 bg-[#0F172A] text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow-sm"
                    >
                      <Phone className="w-3 h-3" /> Call
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-SCREEN: DUES */}
          {/* ========================================================================= */}
          {currentScreen === 'dues' && (
            <div className="p-5 space-y-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Maintenance Breakdown</span>
              
              <div className="p-5 rounded-2xl bg-[#F8F9FB] border border-slate-100 space-y-3 text-xs">
                <div className="flex justify-between text-slate-700"><span>Maintenance (2BHK 1,250 sqft @ ₹3.50)</span><span className="font-bold">₹ 3,200</span></div>
                <div className="flex justify-between text-slate-700"><span>Sinking Fund Contribution</span><span className="font-bold">₹ 500</span></div>
                <div className="flex justify-between text-slate-700"><span>Piped Water Usage</span><span className="font-bold">₹ 400</span></div>
                <div className="flex justify-between text-slate-700"><span>GST Tax (18%)</span><span className="font-bold">₹ 666</span></div>
                <div className="border-t border-slate-200 pt-3 flex justify-between font-black text-sm text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-base font-extrabold text-[#0F172A]">₹ 4,766</span>
                </div>
              </div>

              {isBillPaid ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <div className="text-xs font-bold text-emerald-800">✓ All Dues Paid for August 2026</div>
                  <button
                    onClick={() => alert('Downloading GST Tax Invoice PDF #GST-9021...')}
                    className="px-4 py-2 bg-white border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 mx-auto"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Tax Invoice PDF
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsBillPaid(true);
                    setDuesStatus('All Clear!');
                    alert('Payment of ₹4,766 successful via UPI Autopay!');
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#0F172A] text-white font-bold text-xs shadow-lg"
                >
                  Pay ₹4,766 via UPI / Autopay
                </button>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-SCREEN: PAYMENT HISTORY */}
          {/* ========================================================================= */}
          {currentScreen === 'payment_history' && (
            <div className="p-5 space-y-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Past Payment Ledgers</span>
              
              <div className="space-y-3">
                {[
                  { month: 'August 2026', amount: '₹ 4,766', date: '05 Aug 2026', receipt: 'GST-9021' },
                  { month: 'July 2026', amount: '₹ 4,766', date: '04 Jul 2026', receipt: 'GST-8412' },
                  { month: 'June 2026', amount: '₹ 4,766', date: '02 Jun 2026', receipt: 'GST-7711' },
                ].map((rec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{rec.month} ({rec.amount})</div>
                      <div className="text-[11px] text-slate-600">Paid on {rec.date} • Receipt #{rec.receipt}</div>
                    </div>
                    <button
                      onClick={() => alert(`Downloading Receipt #${rec.receipt}...`)}
                      className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: AMENITIES TAB */}
          {/* ========================================================================= */}
          {activeTab === 'amenities' && (
            <div className="p-5 space-y-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Book Society Amenities</span>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  { name: 'Badminton Court 2 (Indoor Wooden)', icon: Dumbbell, slot: '06:00 PM - 07:00 PM', price: 'Free for Residents' },
                  { name: 'Tennis Court 1 (Synthetic Surface)', icon: Trophy, slot: '07:00 AM - 08:00 AM', price: 'Free for Residents' },
                  { name: 'Clubhouse Banquet Hall (150 Capacity)', icon: Building2, slot: '05:00 PM - 10:00 PM', price: '₹ 5,000 / Event' },
                  { name: 'Squash Court 1 (Air Conditioned)', icon: Trophy, slot: '07:00 PM - 08:00 PM', price: 'Free for Residents' },
                ].map((am, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{am.name}</div>
                      <div className="text-[11px] text-slate-600">{am.slot} • {am.price}</div>
                    </div>
                    <button
                      onClick={() => alert(`Slot booked for ${am.name}!`)}
                      className="px-3 py-1.5 bg-[#0F172A] text-white rounded-xl font-bold text-xs shadow-sm"
                    >
                      Book Slot
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: EVENTS TAB */}
          {/* ========================================================================= */}
          {activeTab === 'events' && (
            <div className="p-5 space-y-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Upcoming Society Events</span>
              
              <div className="space-y-3">
                <div className="p-5 rounded-2xl bg-[#F8F9FB] border border-slate-100 space-y-2">
                  <span className="bg-[#525CEB] text-white px-2 py-0.5 rounded text-[10px] font-bold">FESTIVAL</span>
                  <div className="font-bold text-sm text-slate-900">Ganesh Chaturthi Grand Utsav 2026</div>
                  <p className="text-xs text-slate-600">3-Day celebration at Clubhouse lawn with cultural programs and prasadam.</p>
                  <button
                    onClick={() => alert('RSVP Confirmed for Ganesh Utsav!')}
                    className="px-4 py-2 bg-[#0F172A] text-white rounded-xl font-bold text-xs shadow-sm"
                  >
                    RSVP Going
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: SOCIAL TAB & COMMUNITY POLLS */}
          {/* ========================================================================= */}
          {activeTab === 'social' && (
            <div className="p-5 space-y-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Active Community Poll</span>
              
              <div className="p-5 rounded-2xl bg-[#F8F9FB] border border-slate-100 space-y-3">
                <div className="font-bold text-sm text-slate-900">Which Swimming Pool Maintenance Agency should RWA hire?</div>
                
                <div className="space-y-2.5">
                  {pollOptions.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => handleVote(opt.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        pollVoted === opt.id ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>{opt.text}</span>
                        <span>{opt.percent}% ({opt.votes} Votes)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${opt.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: CHATS TAB */}
          {/* ========================================================================= */}
          {activeTab === 'chats' && (
            <div className="p-5 space-y-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Community Channels</span>
              
              <div className="space-y-2.5">
                {[
                  { name: 'Gate 1 Security Intercom', desc: 'Guard Vikram: Package received for B-108', time: '11:20 AM' },
                  { name: 'Tower B Residents Group', desc: 'Meenakshi: Lift #2 is working normally now', time: 'Yesterday' },
                  { name: 'Green Haven Buy / Sell Marketplace', desc: 'Rohan: Bicycle for sale', time: '20 Aug' },
                ].map((chat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F8F9FB] border border-slate-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{chat.name}</div>
                      <div className="text-[11px] text-slate-600">{chat.desc}</div>
                    </div>
                    <span className="text-[10px] text-slate-600 font-medium">{chat.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

        {/* ========================================================================= */}
        {/* BOTTOM TAB BAR NAVIGATION (SCREENSHOT 3 REPLICATION) */}
        {/* ========================================================================= */}
        <nav className="h-18 bg-white border-t border-slate-100 px-3 flex items-center justify-around fixed sm:absolute bottom-0 left-0 right-0 z-30 shadow-lg">
          {/* Tab 1: Home */}
          <button
            onClick={() => {
              setActiveTab('home');
              setCurrentScreen('home');
            }}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'home' ? 'text-[#EF4444] font-bold' : 'text-slate-600 hover:text-slate-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </button>

          {/* Tab 2: Amenities */}
          <button
            onClick={() => {
              setActiveTab('amenities');
              setCurrentScreen('home');
            }}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'amenities' ? 'text-[#EF4444] font-bold' : 'text-slate-600 hover:text-slate-600'
            }`}
          >
            <Dumbbell className="w-5 h-5" />
            <span className="text-[10px]">Amenities</span>
          </button>

          {/* Tab 3: Events */}
          <button
            onClick={() => {
              setActiveTab('events');
              setCurrentScreen('home');
            }}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'events' ? 'text-[#EF4444] font-bold' : 'text-slate-600 hover:text-slate-600'
            }`}
          >
            <PartyPopper className="w-5 h-5" />
            <span className="text-[10px]">Events</span>
          </button>

          {/* Tab 4: Social */}
          <button
            onClick={() => {
              setActiveTab('social');
              setCurrentScreen('home');
            }}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'social' ? 'text-[#EF4444] font-bold' : 'text-slate-600 hover:text-slate-600'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px]">Social</span>
          </button>

          {/* Tab 5: Chats */}
          <button
            onClick={() => {
              setActiveTab('chats');
              setCurrentScreen('home');
            }}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'chats' ? 'text-[#EF4444] font-bold' : 'text-slate-600 hover:text-slate-600'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-[10px]">Chats</span>
          </button>
        </nav>

        {/* ========================================================================= */}
        {/* MODAL 1: PRE-APPROVE VISITOR MODAL */}
        {/* ========================================================================= */}
        {showPreApproveModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-2xl relative animate-scale-up">
              <button
                onClick={() => {
                  setShowPreApproveModal(false);
                  setGeneratedPass(null);
                }}
                className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="serif-title text-xl text-slate-900 font-extrabold">
                {generatedPass ? 'Visitor Entry Pass' : 'Pre-approve Visitor'}
              </div>

              {!generatedPass ? (
                <form onSubmit={handlePreApproveSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Guest Name</label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Expected Arrival</label>
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
                    className="w-full py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold rounded-2xl shadow-lg mt-2"
                  >
                    Generate Passcode & QR
                  </button>
                </form>
              ) : (
                <div className="bg-[#0F172A] text-white p-5 rounded-2xl text-center space-y-3">
                  <div className="w-24 h-24 bg-white p-2 rounded-xl mx-auto flex items-center justify-center">
                    <QrCode className="w-20 h-20 text-[#0F172A]" />
                  </div>
                  <div className="text-[10px] text-slate-300 font-bold uppercase">6-Digit Gate OTP</div>
                  <div className="font-mono text-3xl font-black tracking-widest text-[#FDE047]">{generatedPass.otp}</div>
                  <div className="text-xs text-slate-200 font-bold">{generatedPass.name} ({generatedPass.mobile})</div>
                  <button
                    onClick={() => {
                      alert(`Passcode ${generatedPass.otp} shared via WhatsApp / SMS!`);
                      setShowPreApproveModal(false);
                      setGeneratedPass(null);
                    }}
                    className="w-full py-2.5 bg-white text-[#0F172A] font-bold rounded-xl text-xs"
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
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-2xl relative animate-scale-up">
              <button
                onClick={() => setShowRechargeModal(false)}
                className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="font-extrabold text-xl text-slate-900">Recharge Pre-paid Meter</div>
              <p className="text-xs text-slate-500">Current Balance: <span className="text-red-500 font-bold">₹ {meterBalance.toFixed(2)}</span></p>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Select Amount:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[500, 1000, 2000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setRechargeAmount(amt)}
                      className={`py-2 rounded-xl font-bold text-xs border ${
                        rechargeAmount === amt ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-slate-50 text-slate-800 border-slate-200'
                      }`}
                    >
                      ₹ {amt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRechargeMeter}
                className="w-full py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold rounded-2xl text-xs shadow-lg mt-2"
              >
                Pay ₹ {rechargeAmount} & Recharge
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 3: EMERGENCY SOS PANIC MODAL */}
        {/* ========================================================================= */}
        {showSosModal && (
          <div className="fixed inset-0 bg-red-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-2xl border-2 border-red-500 relative animate-scale-up text-center">
              <button
                onClick={() => setShowSosModal(false)}
                className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto animate-bounce">
                <Flame className="w-8 h-8" />
              </div>

              <div className="font-extrabold text-xl text-red-900">🚨 EMERGENCY SOS ALARM</div>
              <p className="text-xs text-slate-600">
                Trigger high-priority panic alert to Gate 1 Guards & Security Control Room for <strong>Flat B-108</strong>.
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setSosTriggered(true);
                    alert('EMERGENCY SIREN DISPATCHED TO GATE 1 SECURITY GUARDS!');
                    setShowSosModal(false);
                  }}
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs shadow-lg"
                >
                  DISPATCH GUARDS TO FLAT B-108
                </button>

                <button
                  onClick={() => alert('Dialing 112 / 108 Emergency Services...')}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs"
                >
                  Call Ambulance / Police (112)
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
