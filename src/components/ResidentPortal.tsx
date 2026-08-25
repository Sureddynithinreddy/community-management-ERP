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
  AlertCircle, Car, Coffee, ShieldX, UserX, PhoneCall, AlertTriangle, ThumbsUp, Hammer,
  Settings, KeyRound, BadgeCheck, FileCheck
} from 'lucide-react';

interface ResidentPortalProps {
  onExit: () => void;
}

type ResidentNavSection = 
  | 'overview'
  | 'visitors_parcels'
  | 'payments'
  | 'helpdesk'
  | 'helpers'
  | 'members'
  | 'notices'
  | 'documents'
  | 'directory'
  | 'amenities'
  | 'events'
  | 'social'
  | 'chats'
  | 'profile';

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

  // Notification Toast Banner
  const [showNotificationToast, setShowNotificationToast] = useState<boolean>(true);

  // SOS Alarm Modal
  const [showSosModal, setShowSosModal] = useState<boolean>(false);

  // Mobile Menu Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // =========================================================================
  // 1. LIVE GATE APPROVAL REQUESTS ENGINE
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

  // =========================================================================
  // 2. MODERN BILLING & PAYMENT ENGINE STATE
  // =========================================================================
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
    { id: 'INV-MAY-2026', month: 'May 2026', amount: '₹ 4,766.00', status: 'Paid', date: '03 May 2026', receipt: 'GST-7012', mode: 'UPI Autopay' },
    { id: 'INV-APR-2026', month: 'April 2026', amount: '₹ 4,766.00', status: 'Paid', date: '05 Apr 2026', receipt: 'GST-6411', mode: 'Netbanking (ICICI)' },
  ]);

  // =========================================================================
  // 3. MODERN HELPDESK & COMPLAINT ENGINE STATE
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

  // =========================================================================
  // 4. HELPERS & 13 SERVICE CATEGORIES
  // =========================================================================
  const [categorySearchQuery, setCategorySearchQuery] = useState<string>('');

  const [myHelpersList, setMyHelpersList] = useState([
    { id: 'HLP-01', name: 'Sunita Devi', role: 'Daily Housekeeping Maid', phone: '98765 99887', status: 'Inside Society (Gate 1)', time: '09:15 AM - 01:00 PM', rating: '4.9 ★', salary: '₹ 3,500/mo' },
    { id: 'HLP-02', name: 'Ramesh Kumar', role: 'Morning Cook', phone: '98123 44556', status: 'Checked Out', time: '07:00 AM - 09:00 AM', rating: '4.8 ★', salary: '₹ 5,000/mo' },
    { id: 'HLP-03', name: 'Alok Sharma', role: 'Car Washer & Cleaner', phone: '98345 66778', status: 'Scheduled', time: '06:00 AM - 07:00 AM', rating: '4.9 ★', salary: '₹ 800/mo' },
  ]);

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

  const providersByCategory: Record<string, Array<{ name: string; exp: string; rating: string; reviews: number; flats: number; phone: string; rate: string }>> = {
    Cleaning: [
      { name: 'Sunita Devi', exp: '4 Years in Community', rating: '4.9 ★', reviews: 42, flats: 8, phone: '98765 99887', rate: '₹3,500/month' },
      { name: 'Kavita Kumari', exp: '3 Years in Community', rating: '4.8 ★', reviews: 29, flats: 6, phone: '98123 77665', rate: '₹3,200/month' },
      { name: 'Laxmi Shinde', exp: '5 Years in Community', rating: '5.0 ★', reviews: 68, flats: 11, phone: '98450 33441', rate: '₹3,800/month' },
      { name: 'Pooja Bai', exp: '2 Years in Community', rating: '4.7 ★', reviews: 18, flats: 4, phone: '98901 22334', rate: '₹3,000/month' },
    ],
    'Water Supply': [
      { name: 'AquaPure Mineral Cans (Bisleri 20L)', exp: 'Daily 7 AM & 4 PM Supply', rating: '4.9 ★', reviews: 140, flats: 65, phone: '98220 11990', rate: '₹80/Can' },
      { name: 'Himalayan Spring Water Service', exp: 'Doorstep Delivery', rating: '4.8 ★', reviews: 88, flats: 34, phone: '98111 00223', rate: '₹90/Can' },
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
    ],
  };

  // =========================================================================
  // 5. COMMUNITY SOCIAL POLLS
  // =========================================================================
  const [pollVoted, setPollVoted] = useState<number | null>(1);
  const [pollOptions, setPollOptions] = useState([
    { id: 1, text: 'AquaClean Services (₹25,000/mo)', votes: 42, percent: 58 },
    { id: 2, text: 'BlueWave Pool Mgmt (₹22,000/mo)', votes: 20, percent: 28 },
    { id: 3, text: 'Keep Existing Vendor', votes: 10, percent: 14 },
  ]);

  // =========================================================================
  // 6. RESIDENT PROFILE & PREFERENCES STATE
  // =========================================================================
  const [residentProfile, setResidentProfile] = useState({
    name: 'Ananya Sharma',
    role: 'Owner (Primary Registered)',
    flatNo: 'Flat B-108',
    tower: 'Tower B',
    floor: '1st Floor',
    unitType: '2BHK (1,250 sq.ft)',
    society: 'ASBL Springs, Pocharam',
    phone: '+91 98765 11111',
    email: 'ananya.sharma@example.com',
    emergencyContact: 'Dr. Ramesh Sharma (Father) • +91 98450 11990',
    aadhaarKyc: 'XXXX-XXXX-8902 (Verified ✓)',
    possessionDate: '15 March 2024',
    regDocNo: 'ASBL-2024-B108-REG',
    allocatedParking: 'Basement Level 1 - Slot B-42',
    rfidTag: 'RFID-ANPR-8921-ACTIVE',
    vehicleModel: 'Honda City Sedan (KA-03-MB-4921)',
    gateIvrCall: true,
    directoryPrivacy: false,
    whatsappNotifications: true
  });

  // Handlers
  const handleAllowGateEntry = (reqId: string) => {
    const req = incomingGateRequests.find(r => r.id === reqId);
    if (!req) return;
    setIncomingGateRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'allowed' } : r));
    alert(`ENTRY ALLOWED ✓\nGate barrier lifted for ${req.name} (${req.company || req.category}). Guard notified!`);
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
    alert(`PARCEL ACCEPTED AT GATE ✓\nInstructed Guard to store package at Shelf Locker #B-1. Pickup Passcode: ${randomOtp}`);
  };

  const handleDenyGateEntry = (reqId: string) => {
    const req = incomingGateRequests.find(r => r.id === reqId);
    if (!req) return;
    setIncomingGateRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'denied' } : r));
    alert(`ENTRY DENIED ❌\nInformed Guard that ${req.name} is denied entry.`);
  };

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
        name: 'Venkatesh Rao (Relative)',
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

  const handleVote = (id: number) => {
    if (pollVoted !== null) return;
    setPollVoted(id);
    setPollOptions(prev => prev.map(opt => opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt));
  };

  const pendingGateCount = incomingGateRequests.filter(r => r.status === 'pending').length;
  const activeTicketsCount = ticketsList.filter(t => t.status !== 'Resolved').length;

  const navMenuItems = [
    { id: 'overview', label: 'Overview Dashboard', icon: Home, badge: pendingGateCount > 0 ? `${pendingGateCount} at Gate` : undefined, badgeColor: 'bg-red-500 text-white animate-pulse' },
    { id: 'profile', label: 'My Resident Profile', icon: User, badge: 'Verified ✓', badgeColor: 'bg-emerald-100 text-emerald-800' },
    { id: 'visitors_parcels', label: 'Visitors & Gate Approvals', icon: Shield, badge: pendingGateCount > 0 ? `${pendingGateCount}` : undefined },
    { id: 'payments', label: 'Paying Bills & Meters', icon: CreditCard, badge: billStatus === 'Unpaid' ? 'Due' : undefined },
    { id: 'helpdesk', label: 'Raise Complaints & Helpdesk', icon: Headphones, badge: activeTicketsCount > 0 ? `${activeTicketsCount} Active` : undefined, badgeColor: 'bg-indigo-600 text-white' },
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
      {/* ========================================================================= */}
      {/* TOP DESKTOP & MOBILE HEADER BAR */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-10 py-3.5 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Brand & Flat Identifier (Clickable to open profile) */}
          <button 
            onClick={() => {
              setActiveSection('profile');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 text-left hover:opacity-90 transition-opacity cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#6366F1] to-[#818CF8] p-0.5 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-2xl bg-[#525CEB] flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                <span>👨‍💼</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight">Flat B-108</span>
                <span className="bg-slate-100 text-slate-700 text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full font-bold">2BHK • Tower B</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium truncate max-w-[160px] sm:max-w-none">
                ASBL Springs • <span className="text-indigo-600 font-bold underline">Ananya Sharma</span>
              </div>
            </div>
          </button>

          {/* Quick Actions & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {pendingGateCount > 0 && (
              <button
                onClick={() => {
                  setActiveSection('visitors_parcels');
                  setMobileMenuOpen(false);
                }}
                className="hidden sm:flex px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs items-center gap-2 shadow-sm animate-bounce cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span>{pendingGateCount} Gate Approvals!</span>
              </button>
            )}

            <button
              onClick={() => {
                setActiveSection('payments');
                setMobileMenuOpen(false);
              }}
              className={`hidden sm:flex px-4 py-2 rounded-2xl border items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                billStatus === 'Unpaid' ? 'bg-amber-50 text-amber-900 border-amber-300' : 'bg-emerald-50 text-emerald-900 border-emerald-300'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>{billStatus === 'Unpaid' ? `Bill: ₹ ${totalPayable.toFixed(2)}` : 'Dues Cleared ✓'}</span>
            </button>

            <button
              onClick={() => setShowSosModal(true)}
              className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-[#FEE2E2] hover:bg-[#FECACA] text-[#DC2626] border border-[#FCA5A5]/80 flex items-center gap-1.5 sm:gap-2 text-xs font-black shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-[#DC2626] animate-pulse" />
              <span className="hidden sm:inline">🚨 SOS PANIC</span>
              <span className="sm:hidden font-black">SOS</span>
            </button>

            {/* Mobile Hamburger Drawer Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={onExit}
              className="hidden sm:flex px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white items-center gap-2 text-xs font-bold shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit</span>
            </button>
          </div>

        </div>

        {/* Mobile Collapsible Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-200 max-h-[75vh] overflow-y-auto space-y-2 animate-fade-in pb-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2">
              Resident Workspaces
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'overview', label: 'Dashboard Hub', icon: Home },
                { id: 'visitors_parcels', label: 'Visitors & Parcels', icon: Package, badge: pendingGateCount > 0 ? `${pendingGateCount}` : undefined },
                { id: 'payments', label: 'Pay Dues (₹ 4,766)', icon: CreditCard },
                { id: 'helpdesk', label: 'Raise Complaint', icon: Wrench },
                { id: 'helpers', label: 'Daily Staff (13)', icon: HandHeart },
                { id: 'members', label: 'FastTag & Parking', icon: Car },
                { id: 'amenities', label: 'Book Amenities', icon: Calendar },
                { id: 'notices', label: 'Notice Board', icon: Megaphone },
                { id: 'social', label: 'Community Polls', icon: Vote },
                { id: 'chats', label: 'Resident Assistant', icon: MessageSquare },
                { id: 'documents', label: 'Bylaws & Vault', icon: Folder },
                { id: 'directory', label: 'Lost & Found', icon: LifeBuoy },
                { id: 'profile', label: 'My Resident Profile', icon: User },
              ].map(tab => {
                const TabIcon = tab.icon;
                const isActive = activeSection === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveSection(tab.id as ResidentNavSection);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      isActive ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <TabIcon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{tab.label}</span>
                    </div>
                    {tab.badge && (
                      <span className="bg-amber-500 text-slate-950 text-[10px] px-1.5 py-0.5 rounded-full font-black">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={onExit}
              className="w-full p-3 mt-3 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 font-bold text-xs flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Resident Portal to Gateway</span>
            </button>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* DESKTOP SIDEBAR + EXPANSIVE MAIN WORKSPACE */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col md:flex-row gap-6 p-4 sm:p-6 md:p-8">
        
        {/* DESKTOP LEFT SIDEBAR NAVIGATION */}
        <aside className="hidden md:block w-full md:w-72 shrink-0 space-y-4">
          
          {/* Resident Profile Card (Clickable to open profile) */}
          <button
            onClick={() => setActiveSection('profile')}
            className="w-full bg-white hover:bg-slate-50 p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 text-left transition-all hover:scale-[1.01] cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm shadow-sm group-hover:bg-indigo-600 transition-colors">
                AS
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">Ananya Sharma</div>
                <div className="text-xs text-slate-500 font-medium">Primary Registered Owner</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-600">
              <span>Family: <strong>3 Members</strong></span>
              <span className="text-indigo-600 font-bold">Edit Profile →</span>
            </div>
          </button>

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

          {/* Quick Emergency Facility Dial Strip */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-4 rounded-3xl shadow-sm space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 block">
              24/7 Facility Emergency Desk
            </span>
            <div className="space-y-1.5 pt-1 text-[11px]">
              <div className="flex justify-between items-center text-slate-300">
                <span>⚡ Electrician:</span>
                <span className="font-mono font-bold text-white">98123 44556</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>🚰 Plumber:</span>
                <span className="font-mono font-bold text-white">98765 99887</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>👮 Gate 1 Desk:</span>
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
          {/* NEW: 0. RESIDENT PROFILE SECTION (FLAT B-108) */}
          {/* ========================================================================= */}
          {activeSection === 'profile' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Profile Hero Header Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 shadow-lg shrink-0 flex items-center justify-center">
                    <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-4xl">
                      👩‍💼
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="font-black text-2xl text-white">{residentProfile.name}</h2>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <BadgeCheck className="w-3.5 h-3.5" /> Aadhaar Verified
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 font-medium mt-1">
                      {residentProfile.role} • {residentProfile.flatNo} ({residentProfile.unitType}) • {residentProfile.society}
                    </div>

                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      Possession: {residentProfile.possessionDate} • Reg: {residentProfile.regDocNo}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert('Profile and KYC details updated successfully!')}
                  className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl text-xs shadow-md transition-transform active:scale-95 cursor-pointer relative z-10"
                >
                  Save Profile Changes
                </button>
              </div>

              {/* 2-Column Grid: Personal & Contact Info + Parking & Vehicles */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left Card: Verified Contact & Ownership Details */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="font-extrabold text-base text-slate-900 block">Personal & Verified Contact Info</span>
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">KYC Active ✓</span>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        value={residentProfile.name}
                        onChange={(e) => setResidentProfile({ ...residentProfile, name: e.target.value })}
                        className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Primary Mobile (Verified)</label>
                        <input
                          type="text"
                          value={residentProfile.phone}
                          onChange={(e) => setResidentProfile({ ...residentProfile, phone: e.target.value })}
                          className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono font-medium"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Registered Email</label>
                        <input
                          type="email"
                          value={residentProfile.email}
                          onChange={(e) => setResidentProfile({ ...residentProfile, email: e.target.value })}
                          className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Emergency Contact Person</label>
                      <input
                        type="text"
                        value={residentProfile.emergencyContact}
                        onChange={(e) => setResidentProfile({ ...residentProfile, emergencyContact: e.target.value })}
                        className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium"
                      />
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Aadhaar KYC Number</span>
                        <span className="font-mono font-bold text-slate-900">{residentProfile.aadhaarKyc}</span>
                      </div>
                      <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">Verified</span>
                    </div>
                  </div>
                </div>

                {/* Right Card: Vehicles, Parking & RFID */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="font-extrabold text-base text-slate-900 block">Allocated Parking & FastTag RFID</span>
                    <span className="text-xs text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full font-bold">Slot B-42</span>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-sm text-slate-900">{residentProfile.vehicleModel}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">Sedan • Allocated: {residentProfile.allocatedParking}</div>
                        </div>
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">ANPR Active</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200/60 flex justify-between text-[11px] font-mono">
                        <span className="text-slate-500">FastTag Tag ID:</span>
                        <span className="font-bold text-slate-800">{residentProfile.rfidTag}</span>
                      </div>
                    </div>

                    {/* Household Family Members */}
                    <div className="space-y-2 pt-1">
                      <span className="font-bold text-slate-700 block">Registered Family Members (3)</span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="font-bold text-slate-900">Rahul Sharma</div>
                          <div className="text-[10px] text-slate-500">Co-Owner (Spouse)</div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="font-bold text-slate-900">Aarav Sharma</div>
                          <div className="text-[10px] text-slate-500">Child (Resident)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Notification & Security Preferences Section */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <span className="font-extrabold text-base text-slate-900 block">Gate Security & Notification Preferences</span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center gap-3">
                    <div>
                      <div className="font-bold text-slate-900">Gate IVR Phone Calls</div>
                      <div className="text-[11px] text-slate-500">Receive automated voice call for gate arrivals</div>
                    </div>
                    <button
                      onClick={() => setResidentProfile({ ...residentProfile, gateIvrCall: !residentProfile.gateIvrCall })}
                      className={`w-10 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${residentProfile.gateIvrCall ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${residentProfile.gateIvrCall ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center gap-3">
                    <div>
                      <div className="font-bold text-slate-900">Directory Phone Masking</div>
                      <div className="text-[11px] text-slate-500">Hide personal number in society directory</div>
                    </div>
                    <button
                      onClick={() => setResidentProfile({ ...residentProfile, directoryPrivacy: !residentProfile.directoryPrivacy })}
                      className={`w-10 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${residentProfile.directoryPrivacy ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${residentProfile.directoryPrivacy ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center gap-3">
                    <div>
                      <div className="font-bold text-slate-900">WhatsApp Notification Pass</div>
                      <div className="text-[11px] text-slate-500">Send gate QR codes & bills on WhatsApp</div>
                    </div>
                    <button
                      onClick={() => setResidentProfile({ ...residentProfile, whatsappNotifications: !residentProfile.whatsappNotifications })}
                      className={`w-10 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${residentProfile.whatsappNotifications ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${residentProfile.whatsappNotifications ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* PROMINENT LIVE INCOMING GATE APPROVAL BANNER */}
          {/* ========================================================================= */}
          {activeSection !== 'profile' && incomingGateRequests.filter(r => r.status === 'pending').map((req) => (
            <div 
              key={req.id}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 p-6 rounded-3xl shadow-xl space-y-4 border-2 border-amber-300 animate-fade-in relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
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

                <div className="flex flex-wrap items-center gap-2.5 self-end sm:self-center">
                  <button
                    onClick={() => handleAllowGateEntry(req.id)}
                    className="px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <CheckCheck className="w-4 h-4 text-emerald-400" />
                    <span>ALLOW ENTRY</span>
                  </button>

                  <button
                    onClick={() => handleLeaveAtGate(req.id)}
                    className="px-4 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-indigo-600" />
                    <span>LEAVE AT GATE</span>
                  </button>

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
              
              {/* NOTIFICATION TEST BANNER */}
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

              {/* SECTION 1: MY HOME (3 Widescreen Cards) */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block px-1">
                  MY HOME
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveSection('visitors_parcels')}
                    className="bg-white hover:bg-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between text-left transition-all hover:scale-[1.01] hover:shadow-md cursor-pointer group"
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] shadow-xs group-hover:scale-110 transition-transform">
                        <Shield className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        pendingGateCount > 0 ? 'bg-red-500 text-white animate-pulse' : 'text-[#4F46E5] bg-[#EEF2FF]'
                      }`}>
                        {pendingGateCount > 0 ? `${pendingGateCount} at Gate` : `${preApprovedList.length} Passes`}
                      </span>
                    </div>
                    <div>
                      <div className="font-extrabold text-base text-slate-900">Visitors & Gate Approvals</div>
                      <div className="text-xs text-slate-500 mt-1">Approve Blinkit, Swiggy, and guests at gate</div>
                    </div>
                  </button>

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

              {/* SECTION 2: SOCIETY (4-Column Grid) */}
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

              {/* SECTION 3: PAYMENTS & METERS */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block px-1">
                  PAYMENTS & METERS
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                        <div className="text-xs text-slate-500 font-medium">5 Past Statements & CA Invoices</div>
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
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  + Pre-approve Visitors
                </button>
              </div>

              {/* Today's Gate Arrivals & Resident Decisions */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-base text-slate-900 block">Today's Gate Arrivals & Decisions Log</span>
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

              {/* 2-Column Desktop Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          {/* 3. MODERN PAYING BILLS & INVOICE SUITE */}
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

              {/* 2-Column Grid: Itemized Bill Breakdown + Pre-Paid Meter */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column: Transparent Itemized Breakdown */}
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
                      <div>
                        <span>4. 250 kVA Diesel Generator Emergency Backup</span>
                        <span className="text-[11px] text-slate-400 block">4.2 Units @ ₹18.00/Unit</span>
                      </div>
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

                  {/* Autopay Control Toggle */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 pt-4">
                    <div>
                      <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Recurring UPI Autopay on 1st of Month</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Auto-deduct maintenance dues to avoid late fee penalties.</div>
                    </div>

                    <button
                      onClick={() => setAutopayEnabled(!autopayEnabled)}
                      className={`w-12 h-6 rounded-full transition-colors p-0.5 cursor-pointer ${
                        autopayEnabled ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        autopayEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Right Column: Pre-Paid Smart Meter Console */}
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
                      <div className="text-[11px] text-slate-500 font-medium">Daily Consumption: ~8.4 kWh/day</div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <span className="font-bold text-slate-700">Quick 1-Tap Recharge:</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[500, 1000, 2000].map(amt => (
                          <button
                            key={amt}
                            onClick={() => {
                              setRechargeAmount(amt);
                              setShowRechargeModal(true);
                            }}
                            className="py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-800 text-xs transition-transform active:scale-95 cursor-pointer"
                          >
                            + ₹ {amt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setShowRechargeModal(true)}
                      className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md cursor-pointer"
                    >
                      Custom Recharge Amount
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">Green Haven Sanctuary RWA Account</div>
                      <div className="text-[11px] text-slate-500 font-mono">HDFC Bank • A/C: 50200099881122 • IFSC: HDFC0001202</div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Past 12-Month Invoices & CA Audit Receipts Vault */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-extrabold text-base text-slate-900 block">Past Payment Statements & Tax Receipts</span>
                    <span className="text-xs text-slate-500">Official CA-audited ledger records with downloadable GST invoices</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">{pastInvoicesList.length} Statements Found</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold">
                        <th className="py-3">Invoice Month</th>
                        <th className="py-3">Amount</th>
                        <th className="py-3">Payment Date</th>
                        <th className="py-3">Mode</th>
                        <th className="py-3">Receipt No</th>
                        <th className="py-3 text-right">Tax Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {pastInvoicesList.map(inv => (
                        <tr key={inv.id} className="hover:bg-slate-50">
                          <td className="py-3.5 font-bold text-slate-900">{inv.month}</td>
                          <td className="py-3.5 font-black text-slate-900">{inv.amount}</td>
                          <td className="py-3.5 text-slate-500">{inv.date}</td>
                          <td className="py-3.5 text-slate-600 font-medium">{inv.mode}</td>
                          <td className="py-3.5 font-mono text-slate-600">{inv.receipt}</td>
                          <td className="py-3.5 text-right">
                            {inv.status === 'Paid' ? (
                              <button
                                onClick={() => alert(`Downloading GST Invoice #${inv.receipt} for ${inv.month}...`)}
                                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-[11px] inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5" /> PDF
                              </button>
                            ) : (
                              <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full text-[10px]">
                                Payment Pending
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. RAISE COMPLAINTS & HELPDESK SUITE */}
          {/* ========================================================================= */}
          {activeSection === 'helpdesk' && (
            <div className="space-y-6">
              
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

              {/* Raise New Complaint Creator */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-black text-lg text-slate-900">Raise a New Service Complaint</h3>
                    <p className="text-xs text-slate-500">Select service category, preferred visit time, and priority level</p>
                  </div>
                  <span className="text-xs font-bold text-slate-400">Unit: Flat B-108</span>
                </div>

                <form onSubmit={handleCreateComplaint} className="space-y-6 text-xs">
                  
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
          {/* 5. HELPERS & 13 SERVICE CATEGORIES */}
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

              {/* Household Helpers Active Attendance */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-bold text-base text-slate-900 block">My Household Helpers ({myHelpersList.length})</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {myHelpersList.map((h) => (
                    <div key={h.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-sm text-slate-900">{h.name}</div>
                          <div className="text-xs text-slate-500">{h.role}</div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          h.status.includes('Inside') ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {h.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 pt-1 border-t border-slate-200/60 flex justify-between">
                        <span>{h.time}</span>
                        <span className="font-bold">{h.salary}</span>
                      </div>
                    </div>
                  ))}
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

              {/* 13 Categories Desktop Grid */}
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
          {/* 6. MEMBERS & VEHICLES */}
          {activeSection === 'members' && (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <span className="font-extrabold text-base text-slate-900 block">Flat B-108 Registered Members</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="font-bold text-sm text-slate-900">Ananya Sharma</div>
                    <div className="text-xs text-slate-500">Primary Owner • 98765 11111</div>
                    <span className="inline-block bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[10px] mt-2">Owner</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="font-bold text-sm text-slate-900">Rahul Sharma</div>
                    <div className="text-xs text-slate-500">Co-Owner (Spouse) • 98765 22222</div>
                    <span className="inline-block bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-bold text-[10px] mt-2">Family</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="font-bold text-sm text-slate-900">Aarav Sharma</div>
                    <div className="text-xs text-slate-500">Child (Resident)</div>
                    <span className="inline-block bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-bold text-[10px] mt-2">Family</span>
                  </div>
                </div>

                <span className="font-extrabold text-base text-slate-900 block pt-4">Registered Vehicles & RFID FastTags</span>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm text-slate-900">KA-03-MB-4921 (Honda City Sedan)</div>
                    <div className="text-xs text-slate-500">Allocated Parking Slot: <strong>Slot B-42</strong> • FastTag ANPR RFID Active</div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold text-xs">Verified RFID ✓</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 7. NOTICES */}
          {activeSection === 'notices' && (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <span className="font-extrabold text-base text-slate-900 block">Official RWA Circulars & Notices (23 Unread)</span>
                
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
                    <button onClick={() => alert('RSVP Confirmed for AGM!')} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer">
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
          {/* 8. DOCUMENTS */}
          {activeSection === 'documents' && (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <span className="font-extrabold text-base text-slate-900 block">Society Documents (8 Files)</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Green Haven Society Bylaws & Regulations', size: '2.4 MB PDF' },
                    { name: 'Tenant Move-In / Move-Out NOC Form', size: '420 KB PDF' },
                    { name: 'Fire Safety & Disaster Evacuation Guide', size: '1.8 MB PDF' },
                    { name: 'Clubhouse Banquet Hall Usage Guidelines', size: '650 KB PDF' },
                    { name: 'Pet Policy & Guidelines Notice', size: '320 KB PDF' },
                  ].map((doc, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-xs text-slate-900">{doc.name}</div>
                        <div className="text-[11px] text-slate-500">{doc.size}</div>
                      </div>
                      <button onClick={() => alert(`Downloading ${doc.name}...`)} className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 cursor-pointer">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 9. DIRECTORY */}
          {activeSection === 'directory' && (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <span className="font-extrabold text-base text-slate-900 block">Resident & Security Directory</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Gate 1 Main Entry Intercom', phone: 'Ext: 101 • 98123 45678' },
                    { title: 'Gate 2 Rear Entry Intercom', phone: 'Ext: 102 • 98765 43210' },
                    { title: 'RWA President Office', phone: '98450 11990' },
                    { title: 'Emergency Ambulance & First Aid', phone: '108 / 080-22334455' },
                    { title: 'Fire Station Desk', phone: '101' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-sm text-slate-900">{item.title}</div>
                        <div className="text-xs text-slate-500">{item.phone}</div>
                      </div>
                      <button onClick={() => alert(`Calling ${item.title}...`)} className="px-3.5 py-1.5 bg-slate-900 text-white rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer">
                        <Phone className="w-3.5 h-3.5" /> Call
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 10. AMENITIES BOOKING */}
          {activeSection === 'amenities' && (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <span className="font-extrabold text-base text-slate-900 block">Reserve Society Amenities</span>
                
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
                      <button onClick={() => alert(`Slot booked for ${am.name}!`)} className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs cursor-pointer">
                        Book Slot
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 11. EVENTS */}
          {activeSection === 'events' && (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <span className="font-extrabold text-base text-slate-900 block">Society Events Calendar</span>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="bg-indigo-600 text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold">FESTIVAL</span>
                  <div className="font-bold text-base text-slate-900">Ganesh Chaturthi Grand Utsav 2026</div>
                  <p className="text-xs text-slate-600">3-Day grand celebration at Clubhouse lawn with cultural events and prasadam.</p>
                  <button onClick={() => alert('RSVP Confirmed for Ganesh Utsav!')} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer">
                    RSVP Going
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 12. SOCIAL POLLS */}
          {activeSection === 'social' && (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <span className="font-extrabold text-base text-slate-900 block">Active Community Poll</span>
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
            </div>
          )}

          {/* ========================================================================= */}
          {/* 13. CHATS */}
          {activeSection === 'chats' && (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <span className="font-extrabold text-base text-slate-900 block">Community Intercom & Channels</span>
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
                className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
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

                    <div className="space-y-1.5 text-xs">
                      <label className="font-bold text-slate-700">Or Select 1-Click UPI App:</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['GPay', 'PhonePe', 'Paytm'].map(app => (
                          <button
                            key={app}
                            onClick={() => setSelectedUpiApp(app)}
                            className={`p-3 rounded-xl border font-bold text-center cursor-pointer transition-all ${
                              selectedUpiApp === app ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {app}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5 rounded-2xl shadow-lg space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold tracking-wider">HDFC MILLENNIA DEBIT</span>
                        <span className="font-mono font-bold">VISA</span>
                      </div>
                      <div className="font-mono text-lg tracking-widest pt-2">{cardNumber || '•••• •••• •••• ••••'}</div>
                      <div className="flex justify-between text-[11px] text-slate-300 pt-1">
                        <span>{cardHolder || 'CARD HOLDER'}</span>
                        <span>EXP: {cardExpiry || 'MM/YY'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="col-span-2">
                        <label className="font-bold text-slate-700 block mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-mono"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-mono"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-3 text-xs">
                    <label className="font-bold text-slate-700">Select Banking Partner:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National'].map(bank => (
                        <button
                          key={bank}
                          onClick={() => setSelectedBank(bank)}
                          className={`p-3 rounded-xl border font-bold text-left cursor-pointer transition-all ${
                            selectedBank === bank ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {bank}
                        </button>
                      ))}
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
                <p className="text-xs text-slate-500">Contacting Payment Gateway & Authorizing 256-Bit SSL Encrypted Transaction</p>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="text-center space-y-4 py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCheck className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    Transaction Approved ✓
                  </span>
                  <h3 className="font-black text-2xl text-slate-900 pt-2">₹ {totalPayable.toFixed(2)} Paid</h3>
                  <p className="text-xs text-slate-500">August 2026 Maintenance Dues Cleared for Flat B-108</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-left space-y-1 font-mono">
                  <div className="flex justify-between"><span>Transaction ID:</span><span className="font-bold text-slate-900">TXN-9021-8841-IN</span></div>
                  <div className="flex justify-between"><span>Receipt Number:</span><span className="font-bold text-slate-900">GST-9021</span></div>
                  <div className="flex justify-between"><span>Payment Method:</span><span className="font-bold text-slate-900">{paymentMethod.toUpperCase()}</span></div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      alert('Downloading Verified GST Tax Invoice PDF #GST-9021...');
                      setShowPaymentModal(false);
                    }}
                    className="flex-1 py-3.5 bg-slate-900 text-white font-bold rounded-2xl text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Tax Invoice PDF</span>
                  </button>

                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs cursor-pointer"
                  >
                    Close
                  </button>
                </div>
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
              className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
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
              className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
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
              className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
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
                  alert('EMERGENCY SIREN DISPATCHED TO GATE 1 GUARDS!');
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
