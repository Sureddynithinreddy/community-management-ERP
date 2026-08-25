import React, { useState } from 'react';
import { 
  ShieldCheck, UserCheck, Package, Car, Search, Flame, AlertTriangle, 
  Clock, HelpCircle, LayoutDashboard, ArrowLeft, Wifi, WifiOff, Camera, Check,
  Plus, CheckCircle2, XCircle, Phone, Download, QrCode, Sparkles, AlertCircle, 
  ShieldAlert, LogOut, Menu, X, Bell, UserPlus, PhoneCall, ChevronRight,
  TrendingUp, BarChart3, Radio, FileText, CheckCheck, RefreshCw, KeyRound,
  Lock, Eye, Shield, Users, Building2, MapPin, Truck, AlertOctagon, UserX,
  BadgeCheck, Hammer, Sparkle, Printer, Share2, ArrowUpRight, ShieldQuestion
} from 'lucide-react';
import { SecurityAnalytics } from './SecurityAnalytics';

interface SecurityPortalProps {
  onExit: () => void;
}

type SecurityNavSection = 
  | 'dashboard'
  | 'visitors'
  | 'checkout'
  | 'parcels'
  | 'anpr'
  | 'staff'
  | 'sos'
  | 'incidents'
  | 'patrol'
  | 'lostfound'
  | 'analytics';

interface VisitorEntry {
  id: string;
  name: string;
  phone: string;
  flat: string;
  residentName: string;
  purpose: 'Delivery' | 'Guest' | 'Cab' | 'Service Tech' | 'Daily Staff';
  company?: string;
  orderNo?: string;
  vehicle: string;
  entryTime: string;
  exitTime: string;
  dwellTime?: string;
  status: 'Inside' | 'Departed';
  photo: string;
  gate: string;
  guardName: string;
  passOtp?: string;
  badgeNo: string;
  overstay?: boolean;
}

interface ParcelEntry {
  id: string;
  courier: string;
  orderNo: string;
  flat: string;
  shelf: string;
  loggedTime: string;
  dwell: string;
  status: 'Awaiting Pickup' | 'Picked Up';
  pickupOtp: string;
  recipientPhone: string;
}

interface StaffEntry {
  id: string;
  name: string;
  role: string;
  phone: string;
  assignedFlats: string;
  status: 'Inside Society' | 'Checked Out';
  entryTime: string;
  aadhaarVerified: boolean;
  rating: string;
}

export const SecurityPortal: React.FC<SecurityPortalProps> = ({ onExit }) => {
  // Navigation State
  const [activeSection, setActiveSection] = useState<SecurityNavSection>('dashboard');

  // Visitor Workspace Sub-Tab State
  const [visitorSubTab, setVisitorSubTab] = useState<'checkin' | 'checkout' | 'ledger' | 'preapproved'>('ledger');

  // Offline Sync State
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [offlineQueue, setOfflineQueue] = useState<number>(0);

  // Modals
  const [showCheckInModal, setShowCheckInModal] = useState<boolean>(false);
  const [showParcelModal, setShowParcelModal] = useState<boolean>(false);
  const [showSosModal, setShowSosModal] = useState<boolean>(false);
  const [showOtpValidateModal, setShowOtpValidateModal] = useState<boolean>(false);
  const [otpToValidate, setOtpToValidate] = useState<string>('');
  const [otpValidationResult, setOtpValidationResult] = useState<string | null>(null);

  // Printable Visitor Badge Modal
  const [badgeVisitor, setBadgeVisitor] = useState<VisitorEntry | null>(null);

  // =========================================================================
  // 1. VISITOR CHECK-IN STATE & FORM
  // =========================================================================
  const [vName, setVName] = useState<string>('Rajesh Kumar');
  const [vPhone, setVPhone] = useState<string>('98765 12099');
  const [vFlat, setVFlat] = useState<string>('Flat B-108');
  const [vPurpose, setVPurpose] = useState<'Delivery' | 'Guest' | 'Cab' | 'Service Tech' | 'Daily Staff'>('Delivery');
  const [vCompany, setVCompany] = useState<string>('Blinkit 10-Min Delivery');
  const [vOrderNo, setVOrderNo] = useState<string>('#BK-90214');
  const [vVehicle, setVVehicle] = useState<string>('TS-08-EM-4921 (EV Bike)');
  const [hasCameraSnapshot, setHasCameraSnapshot] = useState<boolean>(true);

  // Resident Lookup Map
  const residentDatabase: Record<string, { owner: string; phone: string; type: string; autoApprove: string }> = {
    'Flat B-108': { owner: 'Ananya Sharma', phone: '+91 98765 11111', type: 'Primary Owner (Tower B)', autoApprove: 'Deliveries & Cabs Auto-Approved' },
    'Flat A-402': { owner: 'Rajesh Mehta', phone: '+91 98765 12345', type: 'Primary Owner (Tower A)', autoApprove: 'Manual Verification Required' },
    'Flat C-301': { owner: 'Suresh Menon', phone: '+91 98901 22334', type: 'Tenant (Tower C)', autoApprove: 'Deliveries Auto-Approved' },
    'Flat A-104': { owner: 'Pooja Hegde', phone: '+91 98123 99999', type: 'Owner (Tower A)', autoApprove: 'Pre-Approved Guests Only' },
    'Flat B-204': { owner: 'Rohan Deshmukh', phone: '+91 98990 11223', type: 'Owner (Tower B)', autoApprove: 'Manual Verification' }
  };

  const [visitorRegister, setVisitorRegister] = useState<VisitorEntry[]>([
    { id: 'VIS-901', name: 'Rajesh Kumar', phone: '98765 12099', flat: 'Flat B-108', residentName: 'Ananya Sharma', purpose: 'Delivery', company: 'Blinkit', orderNo: '#BK-90214', vehicle: 'TS-08-EM-4921 (EV Bike)', entryTime: '11:45 AM', exitTime: '--', dwellTime: '15 mins in campus', status: 'Inside', photo: 'CAM-101.jpg', gate: 'Gate 1 Main', guardName: 'Guard Vikram Singh', badgeNo: 'BDG-901', overstay: false },
    { id: 'VIS-900', name: 'Sunita Devi (Maid)', phone: '98765 99887', flat: 'Flat B-108', residentName: 'Ananya Sharma', purpose: 'Daily Staff', vehicle: 'Walk-in', entryTime: '09:15 AM', exitTime: '--', dwellTime: '2h 45m in campus', status: 'Inside', photo: 'CAM-099.jpg', gate: 'Gate 1 Main', guardName: 'Guard Vikram Singh', badgeNo: 'BDG-900', overstay: false },
    { id: 'VIS-899', name: 'Siddharth Verma', phone: '98765 43210', flat: 'Flat B-108', residentName: 'Ananya Sharma', purpose: 'Guest', vehicle: 'KA-05-MA-1234 (Creta)', entryTime: '10:30 AM', exitTime: '--', dwellTime: '1h 30m in campus', status: 'Inside', photo: 'CAM-098.jpg', gate: 'Gate 1 Main', guardName: 'Guard Vikram Singh', passOtp: '892-104', badgeNo: 'BDG-899', overstay: false },
    { id: 'VIS-898', name: 'Ramesh Plumber', phone: '98123 99887', flat: 'Flat B-108', residentName: 'Ananya Sharma', purpose: 'Service Tech', vehicle: 'KA-04-PL-1102', entryTime: '10:15 AM', exitTime: '--', dwellTime: '1h 45m in campus', status: 'Inside', photo: 'CAM-095.jpg', gate: 'Gate 1 Main', guardName: 'Guard Vikram Singh', badgeNo: 'BDG-898', overstay: false },
    { id: 'VIS-897', name: 'Rahul Sharma (Swiggy)', phone: '98901 22334', flat: 'Flat C-301', residentName: 'Suresh Menon', purpose: 'Delivery', company: 'Swiggy', orderNo: '#SW-4912', vehicle: 'KA-05-SW-4912', entryTime: '11:05 AM', exitTime: '11:15 AM', dwellTime: '10 Mins (Departed)', status: 'Departed', photo: 'CAM-092.jpg', gate: 'Gate 1 Main', guardName: 'Guard Vikram Singh', badgeNo: 'BDG-897', overstay: false },
    { id: 'VIS-896', name: 'Driver Alok (Uber)', phone: '98123 99999', flat: 'Flat A-104', residentName: 'Pooja Hegde', purpose: 'Cab', vehicle: 'KA-01-PH-7711 (White Dzire)', entryTime: '11:20 AM', exitTime: '11:32 AM', dwellTime: '12 Mins (Departed)', status: 'Departed', photo: 'CAM-090.jpg', gate: 'Gate 2 Rear', guardName: 'Guard Ramu', badgeNo: 'BDG-896', overstay: false },
  ]);

  // Visitor Filter & Search
  const [visitorFilterTab, setVisitorFilterTab] = useState<'all' | 'inside' | 'departed'>('inside');
  const [visitorSearch, setVisitorSearch] = useState<string>('');

  // Exit Search
  const [exitSearchQuery, setExitSearchQuery] = useState<string>('');

  // =========================================================================
  // 2. PARCEL LOCKER REGISTER STATE (5 Parcels)
  // =========================================================================
  const [delCompany, setDelCompany] = useState<string>('Amazon Courier');
  const [delFlat, setDelFlat] = useState<string>('Flat B-108');
  const [delOrderNo, setDelOrderNo] = useState<string>('#AZ-9021');
  const [delShelf, setDelShelf] = useState<string>('Shelf B-4');
  const [delPhone, setDelPhone] = useState<string>('98765 11111');

  const [deliveryParcels, setDeliveryParcels] = useState<ParcelEntry[]>([
    { id: 'PAR-101', courier: 'Amazon Courier', orderNo: '#AZ-9021', flat: 'Flat B-108', shelf: 'Shelf B-4', loggedTime: '11:20 AM', dwell: '1.2 Hours', status: 'Awaiting Pickup', pickupOtp: '4091', recipientPhone: '98765 11111' },
    { id: 'PAR-102', courier: 'Swiggy InstaMart', orderNo: '#SW-4912', flat: 'Flat B-108', shelf: 'Cold Storage Locker #02', loggedTime: '11:32 AM', dwell: '45 Mins', status: 'Awaiting Pickup', pickupOtp: '8821', recipientPhone: '98765 11111' },
    { id: 'PAR-103', courier: 'Zomato Food', orderNo: '#ZM-8812', flat: 'Flat A-402', shelf: 'Shelf A-1 (Hot Food)', loggedTime: '12:01 PM', dwell: '20 Mins', status: 'Awaiting Pickup', pickupOtp: '3312', recipientPhone: '98765 22334' },
    { id: 'PAR-104', courier: 'Flipkart Logistics', orderNo: '#FK-1102', flat: 'Flat A-104', shelf: 'Shelf A-2', loggedTime: '09:45 AM', dwell: '3.1 Hours', status: 'Awaiting Pickup', pickupOtp: '1904', recipientPhone: '98123 44556' },
    { id: 'PAR-099', courier: 'Blinkit Instant', orderNo: '#BK-5541', flat: 'Flat B-204', shelf: 'Shelf B-1', loggedTime: '08:15 AM', dwell: 'Picked Up', status: 'Picked Up', pickupOtp: '7721', recipientPhone: '98990 11223' },
  ]);

  // =========================================================================
  // 3. ANPR LICENSE PLATE & VEHICLE TRACKER
  // =========================================================================
  const [plateQuery, setPlateQuery] = useState<string>('KA-03-MB-4921');
  const [searchedPlateInfo, setSearchedPlateInfo] = useState<{ plate: string; owner: string; flat: string; slot: string; type: string; status: string } | null>({
    plate: 'KA-03-MB-4921',
    owner: 'Ananya Sharma',
    flat: 'Flat B-108 (Tower B)',
    slot: 'Basement 1 - Slot B-42',
    type: 'Resident Honda City Sedan',
    status: 'Whitelisted FastTag RFID Active ✓'
  });

  const [flaggedVehicles, setFlaggedVehicles] = useState([
    { plate: 'MH-12-PQ-9988', flat: 'Flat B-102 Visitor', violation: 'Parked blocking Tower B Basement Ramp', severity: 'Critical', status: 'Warning Issued', time: '10:15 AM' },
    { plate: 'KA-05-AB-1234', flat: 'Flat C-301 Guest', violation: 'Overstayed visitor parking limit (6+ Hours)', severity: 'Moderate', status: 'Citation Logged', time: '09:40 AM' },
    { plate: 'KA-01-XY-9999', flat: 'Unauthorized Vehicle', violation: 'Entered without ANPR plate registration', severity: 'High', status: 'Under Inspection', time: '08:20 AM' },
  ]);

  // =========================================================================
  // 4. DAILY STAFF & HELPERS ATTENDANCE (6 Active Staff)
  // =========================================================================
  const [staffList, setStaffList] = useState<StaffEntry[]>([
    { id: 'STF-01', name: 'Sunita Devi', role: 'Daily Housekeeping Maid', phone: '98765 99887', assignedFlats: 'Flat B-108, Flat A-402', status: 'Inside Society', entryTime: '09:15 AM', aadhaarVerified: true, rating: '4.9 ★' },
    { id: 'STF-02', name: 'Ramesh Kumar', role: 'Morning Cook', phone: '98123 44556', assignedFlats: 'Flat B-108, Flat B-201', status: 'Checked Out', entryTime: '07:00 AM - 09:00 AM', aadhaarVerified: true, rating: '4.8 ★' },
    { id: 'STF-03', name: 'Alok Sharma', role: 'Car Washer & Cleaner', phone: '98345 66778', assignedFlats: 'Tower B Basements (12 Cars)', status: 'Checked Out', entryTime: '06:00 AM - 07:30 AM', aadhaarVerified: true, rating: '4.9 ★' },
    { id: 'STF-04', name: 'Ramesh Plumber', role: 'Community Duty Plumber', phone: '98123 99887', assignedFlats: 'Helpdesk Maintenance Dispatch', status: 'Inside Society', entryTime: '10:15 AM', aadhaarVerified: true, rating: '4.9 ★' },
    { id: 'STF-05', name: 'Alok Electrician', role: 'Lead Electrician', phone: '98123 44556', assignedFlats: 'Tower A Substation', status: 'Inside Society', entryTime: '08:30 AM', aadhaarVerified: true, rating: '5.0 ★' },
    { id: 'STF-06', name: 'Pooja Bai', role: 'Cleaning Staff', phone: '98901 22334', assignedFlats: 'Flat C-102, Flat C-304', status: 'Inside Society', entryTime: '09:45 AM', aadhaarVerified: true, rating: '4.7 ★' },
  ]);

  // =========================================================================
  // 5. INCIDENTS & OCCURRENCE BOOK
  // =========================================================================
  const [incidentsList, setIncidentsList] = useState([
    { id: 'INC-8921', category: 'Parking Dispute', flat: 'Flat B-102', desc: 'Visitor car parked blocking basement ramp', loggedBy: 'Guard Vikram Singh', status: 'Under Investigation', time: '10:45 AM', priority: 'High' },
    { id: 'INC-8810', category: 'Noise Disturbance', flat: 'Flat C-401', desc: 'Loud music past 11 PM reported by neighbors', loggedBy: 'Guard Suresh', status: 'Resolved', time: 'Yesterday', priority: 'Medium' },
    { id: 'INC-8742', category: 'Pool Rules Violation', flat: 'Flat A-201', desc: 'Glass bottles brought to swimming pool deck', loggedBy: 'Guard Dinesh', status: 'Resolved', time: '19 Aug 2026', priority: 'Low' },
  ]);

  // =========================================================================
  // 6. GUARD PATROL CHECKPOINTS
  // =========================================================================
  const [patrolPoints, setPatrolPoints] = useState([
    { id: 1, name: 'Checkpoint 1: Main Gate Outer Perimeter', scanned: true, time: '11:00 AM', location: 'Gate 1 Outer Wall' },
    { id: 2, name: 'Checkpoint 2: Tower B Basement Parking Ramp', scanned: true, time: '11:15 AM', location: 'Basement 1 Ramp' },
    { id: 3, name: 'Checkpoint 3: Clubhouse Back Entrance & Pool', scanned: false, time: '--', location: 'Clubhouse Ground Floor' },
    { id: 4, name: 'Checkpoint 4: DG Power Backup Substation', scanned: false, time: '--', location: 'Rear Utility Yard' },
    { id: 5, name: 'Checkpoint 5: Tower A Fire Hose Station', scanned: false, time: '--', location: 'Tower A Ground' },
  ]);

  // =========================================================================
  // 7. LOST & FOUND REGISTER
  // =========================================================================
  const [lostFoundList, setLostFoundList] = useState([
    { id: 'LF-101', item: 'Hyundai Car Smart Key Ring', loc: 'Swimming Pool Deck', date: 'Today 09:30 AM', status: 'Unclaimed', photo: 'KEY-101.jpg' },
    { id: 'LF-098', item: 'Child Blue Bicycle (Hero Sprint)', loc: 'Garden Play Area', date: '21 Aug 2026', status: 'Claimed by Flat B-201', photo: 'CYCLE-98.jpg' },
    { id: 'LF-095', item: 'Leather Wallet with ID Cards', loc: 'Clubhouse Gym', date: '18 Aug 2026', status: 'Claimed by Flat C-301', photo: 'WALLET-95.jpg' },
    { id: 'LF-091', item: 'Ray-Ban Aviator Sunglasses', loc: 'Tennis Court 1', date: '14 Aug 2026', status: 'Unclaimed', photo: 'SUNGLASS-91.jpg' },
  ]);

  // Emergency SOS Dispatch State
  const [emergencyAlertActive, setEmergencyAlertActive] = useState<boolean>(false);

  // Handlers
  const handleCheckInVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vName) return;

    const newId = `VIS-${Math.floor(900 + Math.random() * 100)}`;
    const badgeNumber = `BDG-${Math.floor(100 + Math.random() * 900)}`;
    const residentInfo = residentDatabase[vFlat] || { owner: 'Resident', phone: 'Ext: 101' };

    const newEntry: VisitorEntry = {
      id: newId,
      name: vName,
      phone: vPhone,
      flat: vFlat,
      residentName: residentInfo.owner,
      purpose: vPurpose,
      company: vCompany,
      orderNo: vOrderNo,
      vehicle: vVehicle || 'Walk-in',
      entryTime: 'Just Now (11:55 AM)',
      exitTime: '--',
      dwellTime: 'Just Entered',
      status: 'Inside',
      photo: `CAM-SNAP-${Math.floor(100 + Math.random() * 100)}.jpg`,
      gate: 'Gate 1 Main',
      guardName: 'Guard Vikram Singh',
      badgeNo: badgeNumber,
      overstay: false
    };

    setVisitorRegister([newEntry, ...visitorRegister]);
    setShowCheckInModal(false);
    setVisitorSubTab('ledger');
    alert(`VISITOR ENTRY LOGGED (${newId}) ✓\nGate barrier lifted for ${vName} heading to ${vFlat} (${residentInfo.owner})!\nPasscode / Gate Badge #${badgeNumber} generated.`);
  };

  const handleCheckOutVisitor = (id: string) => {
    setVisitorRegister(prev => prev.map(v => v.id === id ? { 
      ...v, 
      status: 'Departed', 
      exitTime: 'Just Now',
      dwellTime: '42 Mins (Departed)'
    } : v));
    alert(`CHECK-OUT LOGGED ✓\nExit barrier lifted. Visitor marked as Departed.`);
  };

  const handleLogParcel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delOrderNo) return;

    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const newId = `PAR-${Math.floor(100 + Math.random() * 100)}`;
    const newParcel: ParcelEntry = {
      id: newId,
      courier: delCompany,
      orderNo: delOrderNo,
      flat: delFlat,
      shelf: delShelf,
      loggedTime: 'Just Now',
      dwell: '0 Mins',
      status: 'Awaiting Pickup',
      pickupOtp: randomOtp,
      recipientPhone: delPhone
    };

    setDeliveryParcels([newParcel, ...deliveryParcels]);
    setShowParcelModal(false);
    alert(`PARCEL STORED AT ${delShelf} (${newId}) ✓\nPickup Passcode OTP: ${randomOtp} dispatched to ${delFlat} resident!`);
  };

  const handleVerifyParcelPickup = (id: string) => {
    setDeliveryParcels(prev => prev.map(p => p.id === id ? { ...p, status: 'Picked Up', dwell: 'Picked Up Just Now' } : p));
    alert(`PARCEL HANDED OVER ✓\nMarked as collected by resident.`);
  };

  const handlePlateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (plateQuery.toUpperCase().includes('KA-03-MB-4921') || plateQuery.toUpperCase().includes('4921')) {
      setSearchedPlateInfo({
        plate: 'KA-03-MB-4921',
        owner: 'Ananya Sharma',
        flat: 'Flat B-108 (Tower B)',
        slot: 'Basement 1 - Slot B-42',
        type: 'Resident Honda City Sedan (White)',
        status: 'Whitelisted FastTag RFID Active ✓'
      });
    } else {
      setSearchedPlateInfo({
        plate: plateQuery.toUpperCase(),
        owner: 'Visitor / Unregistered Vehicle',
        flat: 'Not Associated to Any Resident',
        slot: 'Temporary Visitor Parking Bay V-04',
        type: 'Visitor Entry',
        status: 'Non-Resident • Guard Gate Pass Required'
      });
    }
  };

  const handleToggleStaff = (id: string) => {
    setStaffList(prev => prev.map(s => {
      if (s.id === id) {
        const newStatus = s.status === 'Inside Society' ? 'Checked Out' : 'Inside Society';
        return { ...s, status: newStatus, entryTime: newStatus === 'Inside Society' ? 'Just Now' : s.entryTime };
      }
      return s;
    }));
  };

  const handleScanCheckpoint = (id: number) => {
    setPatrolPoints(prev => prev.map(p => p.id === id ? { ...p, scanned: true, time: 'Just Now' } : p));
    alert(`CHECKPOINT SCANNED ✓\nGPS & QR timestamp verified for patrol point.`);
  };

  const handleValidateOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = otpToValidate.replace('-', '').trim();
    if (cleanOtp === '892104' || cleanOtp === '892-104') {
      setOtpValidationResult('VALID: Pre-Approved Guest Pass for Siddharth Verma -> Flat B-108 (Valid for Today)');
    } else if (cleanOtp === '4091') {
      setOtpValidationResult('VALID: Amazon Parcel Pickup OTP for Flat B-108 (Shelf B-4)');
    } else if (cleanOtp === '7812') {
      setOtpValidationResult('VALID: Close-Job OTP for Service Tech Ramesh Plumber (Flat B-108)');
    } else {
      setOtpValidationResult('INVALID / EXPIRED OTP PASSCODE. Please check with resident.');
    }
  };

  const insideCount = visitorRegister.filter(v => v.status === 'Inside').length;
  const awaitingParcelsCount = deliveryParcels.filter(p => p.status === 'Awaiting Pickup').length;
  const staffInsideCount = staffList.filter(s => s.status === 'Inside Society').length;

  const navMenuItems = [
    { id: 'dashboard', label: 'Security Command Dashboard', icon: LayoutDashboard },
    { id: 'visitors', label: 'Check-In / Out Visitors', icon: ShieldCheck, badge: `${insideCount} Inside`, badgeColor: 'bg-emerald-100 text-emerald-800 font-bold' },
    { id: 'parcels', label: 'Gate Shelf Parcel Lockers', icon: Package, badge: `${awaitingParcelsCount} Awaiting`, badgeColor: 'bg-amber-100 text-amber-900 font-bold' },
    { id: 'anpr', label: 'ANPR AI Plate & Parking', icon: Car },
    { id: 'staff', label: 'Daily Staff & Attendance', icon: Users, badge: `${staffInsideCount} Active`, badgeColor: 'bg-blue-100 text-blue-800 font-bold' },
    { id: 'sos', label: 'Emergency SOS Alarm Console', icon: Flame, badge: emergencyAlertActive ? '🚨 SIREN' : undefined, badgeColor: 'bg-red-600 text-white animate-pulse' },
    { id: 'incidents', label: 'Incident Occurrence Book', icon: FileText },
    { id: 'patrol', label: 'Guard QR Patrol Checkpoints', icon: MapPin },
    { id: 'lostfound', label: 'Lost & Found Register', icon: Search },
    { id: 'analytics', label: 'Gate Traffic & Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans antialiased flex flex-col selection:bg-[#0F172A] selection:text-white">
      
      {/* ========================================================================= */}
      {/* TOP DESKTOP HEADER BAR */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200 px-6 sm:px-10 py-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand & Gate Station Identifier */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-900 p-0.5 shadow-sm flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-xl">
                <span>👮</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl text-slate-900 tracking-tight">Gate 1 Main Barrier</span>
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold">Shift: 08:00 AM - 08:00 PM</span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                ASBL Springs, Pocharam • Security Operations Console
              </div>
            </div>
          </div>

          {/* Quick Actions & Live Hardware Status */}
          <div className="flex items-center gap-3">
            
            {/* Live Camera Feed Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
              <Camera className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>ANPR CAM 1 LIVE</span>
            </div>

            {/* Offline Mode Toggle */}
            <button
              onClick={() => {
                setIsOffline(!isOffline);
                if (!isOffline) {
                  setOfflineQueue(3);
                } else {
                  setOfflineQueue(0);
                  alert('OFFLINE QUEUE SYNCED: 3 entries pushed to society cloud database ✓');
                }
              }}
              className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                isOffline ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              {isOffline ? <WifiOff className="w-4 h-4 text-amber-700" /> : <Wifi className="w-4 h-4 text-emerald-600" />}
              <span>{isOffline ? `Offline Mode (${offlineQueue} Queued)` : 'Cloud Synced'}</span>
            </button>

            {/* Validate OTP Passcode Button */}
            <button
              onClick={() => {
                setOtpValidationResult(null);
                setOtpToValidate('');
                setShowOtpValidateModal(true);
              }}
              className="px-4 py-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-indigo-600" />
              <span>Verify Passcode</span>
            </button>

            {/* SOS Trigger */}
            <button
              onClick={() => setShowSosModal(true)}
              className="px-5 py-2.5 rounded-2xl bg-[#FEE2E2] hover:bg-[#FECACA] text-[#DC2626] border border-[#FCA5A5]/80 flex items-center gap-2 text-xs font-black shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-[#DC2626] animate-pulse" />
              <span>🚨 SECURITY SOS</span>
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
          
          {/* Guard Profile Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                VS
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">Guard Vikram Singh</div>
                <div className="text-xs text-slate-500 font-medium">Lead Security Officer (Gate 1)</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-600">
              <span>Station: <strong>Gate 1 Barrier</strong></span>
              <span className="text-emerald-600 font-bold">On Duty ✓</span>
            </div>
          </div>

          {/* Quick Gate Action Buttons */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-1">
              Quick Gate Actions
            </span>

            <button
              onClick={() => {
                setActiveSection('visitors');
                setVisitorSubTab('checkin');
              }}
              className="w-full p-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ New Visitor Check-In</span>
            </button>

            <button
              onClick={() => {
                setActiveSection('visitors');
                setVisitorSubTab('checkout');
              }}
              className="w-full p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl flex items-center justify-center gap-2 border border-slate-200 transition-transform active:scale-95 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-slate-600" />
              <span>Fast Exit / Check-Out</span>
            </button>
          </div>

          {/* Gate Telemetry Stats */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 rounded-3xl shadow-sm space-y-3 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 block">
              Gate 1 Live Telemetry
            </span>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-white/10 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-300 block">Visitors Inside</span>
                <span className="text-xl font-black text-white">{insideCount}</span>
              </div>
              <div className="bg-white/10 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-300 block">Shelf Parcels</span>
                <span className="text-xl font-black text-amber-300">{awaitingParcelsCount}</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="bg-white p-3 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-2 block">
              Guard Workspaces
            </span>
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as SecurityNavSection)}
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
                      item.badgeColor || (isActive ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700')
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
          {/* 1. COMMAND DASHBOARD */}
          {/* ========================================================================= */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Top Hero Gate Command Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-inner shrink-0">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-white">Security Command & Gate Control</h2>
                    <p className="text-xs text-slate-300 mt-1">Real-time visitor check-ins, ANPR license plate recognition, and parcel locker management</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 relative z-10">
                  <button
                    onClick={() => {
                      setActiveSection('visitors');
                      setVisitorSubTab('checkin');
                    }}
                    className="px-5 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4 fill-slate-950" />
                    <span>Quick Visitor Check-In</span>
                  </button>

                  <button
                    onClick={() => setShowParcelModal(true)}
                    className="px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl text-xs shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-indigo-600" />
                    <span>Log Parcel</span>
                  </button>
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500">Visitors Inside</div>
                    <div className="text-2xl font-black text-slate-900">{insideCount} People</div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500">Gate Shelf Parcels</div>
                    <div className="text-2xl font-black text-slate-900">{awaitingParcelsCount} Awaiting</div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500">Daily Staff Inside</div>
                    <div className="text-2xl font-black text-slate-900">{staffInsideCount} Staff</div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500">Flagged Vehicles</div>
                    <div className="text-2xl font-black text-rose-600">{flaggedVehicles.length} Flagged</div>
                  </div>
                </div>
              </div>

              {/* Today's Active Entries Ledger */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">Today's Gate Visitor & Delivery Register</h3>
                    <p className="text-xs text-slate-500">Real-time log of entries through Gate 1 Main Barrier</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSection('visitors')}
                      className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                    >
                      View Full Register →
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold">
                        <th className="py-3">Visitor Name</th>
                        <th className="py-3">Purpose / Category</th>
                        <th className="py-3">Target Unit</th>
                        <th className="py-3">Vehicle</th>
                        <th className="py-3">Entry Time</th>
                        <th className="py-3">Status</th>
                        <th className="py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {visitorRegister.slice(0, 5).map(v => (
                        <tr key={v.id} className="hover:bg-slate-50">
                          <td className="py-3.5 font-bold text-slate-900">
                            <div>{v.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{v.phone}</div>
                          </td>
                          <td className="py-3.5 font-medium text-slate-700">
                            <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold text-[10px]">
                              {v.company || v.purpose}
                            </span>
                          </td>
                          <td className="py-3.5 font-bold text-indigo-600">{v.flat} ({v.residentName})</td>
                          <td className="py-3.5 font-mono text-slate-600">{v.vehicle}</td>
                          <td className="py-3.5 text-slate-500">{v.entryTime}</td>
                          <td className="py-3.5">
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              v.status === 'Inside' ? 'bg-emerald-100 text-emerald-800 animate-pulse' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {v.status}
                            </span>
                          </td>
                          <td className="py-3.5 text-right">
                            {v.status === 'Inside' ? (
                              <button
                                onClick={() => handleCheckOutVisitor(v.id)}
                                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[11px] cursor-pointer"
                              >
                                Log Exit
                              </button>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Departed ({v.exitTime})</span>
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
          {/* 2. UPGRADED: VISITOR CHECK-IN & CHECK-OUT WORKSPACE */}
          {/* ========================================================================= */}
          {activeSection === 'visitors' && (
            <div className="space-y-6">
              
              {/* Top Hero Banner */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <UserCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Visitor Check-In & Exit Management</h2>
                    <p className="text-xs text-slate-500 mt-1">Complete gate passage control, instant resident notification, badge generator, and fast exit scan</p>
                  </div>
                </div>

                {/* 4 Unified Sub-Tab Switcher */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-bold gap-1 self-stretch sm:self-center">
                  <button
                    onClick={() => setVisitorSubTab('ledger')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      visitorSubTab === 'ledger' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📋 Live Inside ({insideCount})
                  </button>

                  <button
                    onClick={() => setVisitorSubTab('checkin')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      visitorSubTab === 'checkin' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🟢 New Entry Check-In
                  </button>

                  <button
                    onClick={() => setVisitorSubTab('checkout')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      visitorSubTab === 'checkout' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🔴 Fast Exit / Exit Scan
                  </button>

                  <button
                    onClick={() => setVisitorSubTab('preapproved')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      visitorSubTab === 'preapproved' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🎫 Pass Validator
                  </button>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* SUB-TAB 1: LIVE IN-CAMPUS VISITORS LEDGER */}
              {/* ========================================================================= */}
              {visitorSubTab === 'ledger' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                    <div className="flex gap-2 text-xs">
                      <button
                        onClick={() => setVisitorFilterTab('inside')}
                        className={`px-4 py-2 rounded-xl font-bold cursor-pointer ${visitorFilterTab === 'inside' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
                      >
                        Currently Inside ({insideCount})
                      </button>
                      <button
                        onClick={() => setVisitorFilterTab('all')}
                        className={`px-4 py-2 rounded-xl font-bold cursor-pointer ${visitorFilterTab === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
                      >
                        All Entries ({visitorRegister.length})
                      </button>
                      <button
                        onClick={() => setVisitorFilterTab('departed')}
                        className={`px-4 py-2 rounded-xl font-bold cursor-pointer ${visitorFilterTab === 'departed' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
                      >
                        Departed ({visitorRegister.length - insideCount})
                      </button>
                    </div>

                    <div className="w-full sm:w-72 relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search name, phone, flat..."
                        value={visitorSearch}
                        onChange={(e) => setVisitorSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {visitorRegister
                      .filter(v => visitorFilterTab === 'all' || (visitorFilterTab === 'inside' ? v.status === 'Inside' : v.status === 'Departed'))
                      .filter(v => v.name.toLowerCase().includes(visitorSearch.toLowerCase()) || v.flat.toLowerCase().includes(visitorSearch.toLowerCase()) || v.phone.includes(visitorSearch))
                      .map(v => (
                        <div key={v.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white text-slate-900 flex items-center justify-center text-xl shadow-xs border border-slate-200 shrink-0">
                              {v.purpose === 'Delivery' ? '⚡' : v.purpose === 'Cab' ? '🚗' : v.purpose === 'Service Tech' ? '👨‍🔧' : '👤'}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-slate-900">{v.name}</span>
                                <span className="bg-slate-200 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                  {v.company || v.purpose}
                                </span>
                                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                                  v.status === 'Inside' ? 'bg-emerald-100 text-emerald-800 animate-pulse' : 'bg-slate-200 text-slate-600'
                                }`}>
                                  {v.status}
                                </span>
                                <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                                  {v.badgeNo}
                                </span>
                              </div>
                              <div className="text-xs text-slate-500 mt-1">
                                Flat: <strong className="text-slate-900">{v.flat} ({v.residentName})</strong> • Phone: {v.phone} • Vehicle: <strong className="font-mono">{v.vehicle}</strong>
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                                <span>Entry: <strong>{v.entryTime}</strong></span>
                                <span>•</span>
                                <span className="text-indigo-600 font-bold">{v.dwellTime}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
                            {v.status === 'Inside' && (
                              <button
                                onClick={() => handleCheckOutVisitor(v.id)}
                                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                              >
                                Log Exit
                              </button>
                            )}

                            <button
                              onClick={() => setBadgeVisitor(v)}
                              className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Printer className="w-3.5 h-3.5 text-indigo-600" />
                              <span>Gate Badge</span>
                            </button>

                            <button
                              onClick={() => alert(`Calling resident ${v.residentName} (${v.flat}) on intercom...`)}
                              className="p-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl cursor-pointer"
                              title="Call Resident"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* SUB-TAB 2: NEW ENTRY CHECK-IN FORM */}
              {/* ========================================================================= */}
              {visitorSubTab === 'checkin' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-black text-lg text-slate-900">Log New Visitor Entry & Dispatch Approval</h3>
                      <p className="text-xs text-slate-500">Record visitor details, capture camera snapshot, and notify resident flat</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                      Gate 1 Main Barrier
                    </span>
                  </div>

                  <form onSubmit={handleCheckInVisitor} className="space-y-6 text-xs">
                    
                    {/* Category Selector */}
                    <div className="space-y-2">
                      <label className="font-bold text-slate-700 block">1. Select Visitor Category:</label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {[
                          { id: 'Delivery', label: '⚡ Delivery (Blinkit/Swiggy)', desc: '10-min / Food Delivery' },
                          { id: 'Cab', label: '🚗 Cab Pickup (Uber/Ola)', desc: 'Taxi / Airport Ride' },
                          { id: 'Guest', label: '👨‍👩‍👧 Family Guest', desc: 'Pre-Approved / Walk-in' },
                          { id: 'Service Tech', label: '👨‍🔧 Service Technician', desc: 'Plumber / Electrician' },
                          { id: 'Daily Staff', label: '👷 Daily Staff', desc: 'Maid / Cook / Driver' },
                        ].map(cat => (
                          <button
                            type="button"
                            key={cat.id}
                            onClick={() => setVPurpose(cat.id as any)}
                            className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                              vPurpose === cat.id ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div className="font-bold text-xs">{cat.label}</div>
                            <div className={`text-[10px] mt-0.5 ${vPurpose === cat.id ? 'text-slate-300' : 'text-slate-500'}`}>{cat.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">2. Visitor Full Name</label>
                        <input
                          type="text"
                          required
                          value={vName}
                          onChange={(e) => setVName(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-slate-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">3. Visitor Mobile Number</label>
                        <input
                          type="tel"
                          required
                          value={vPhone}
                          onChange={(e) => setVPhone(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono font-medium focus:outline-none focus:border-slate-900"
                        />
                      </div>
                    </div>

                    {/* Destination Flat & Resident Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">4. Destination Flat Number</label>
                        <select
                          value={vFlat}
                          onChange={(e) => setVFlat(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold focus:outline-none"
                        >
                          <option value="Flat B-108">Flat B-108 (Ananya Sharma - Tower B)</option>
                          <option value="Flat A-402">Flat A-402 (Rajesh Mehta - Tower A)</option>
                          <option value="Flat C-301">Flat C-301 (Suresh Menon - Tower C)</option>
                          <option value="Flat A-104">Flat A-104 (Pooja Hegde - Tower A)</option>
                          <option value="Flat B-204">Flat B-204 (Rohan Deshmukh - Tower B)</option>
                        </select>
                      </div>

                      {/* Resident Info Preview Box */}
                      <div className="p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-2xl space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-900">{residentDatabase[vFlat]?.owner}</span>
                          <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded">Resident Info</span>
                        </div>
                        <div className="text-[11px] text-slate-600">{residentDatabase[vFlat]?.phone} • {residentDatabase[vFlat]?.type}</div>
                        <div className="text-[10px] font-bold text-emerald-700 mt-1">{residentDatabase[vFlat]?.autoApprove}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">5. Company / Delivery App / Purpose</label>
                        <input
                          type="text"
                          value={vCompany}
                          onChange={(e) => setVCompany(e.target.value)}
                          placeholder="e.g. Blinkit, Swiggy, Uber, Zomato"
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">6. Vehicle Plate Number</label>
                        <input
                          type="text"
                          value={vVehicle}
                          onChange={(e) => setVVehicle(e.target.value)}
                          placeholder="e.g. TS-08-EM-4921 or Walk-in"
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono font-medium focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Camera Snapshot Toggle */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Camera className="w-5 h-5 text-indigo-600" />
                        <div>
                          <div className="font-bold text-xs text-slate-900">Gate AI Camera Snapshot Capture</div>
                          <div className="text-[11px] text-slate-500">Live facial photo capture attached to visitor gate badge.</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                        ✓ Snapshot Ready (CAM-101.jpg)
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Log Visitor Entry & Lift Gate 1 Barrier</span>
                    </button>

                  </form>
                </div>
              )}

              {/* ========================================================================= */}
              {/* SUB-TAB 3: FAST EXIT / CHECK-OUT SCANNER */}
              {/* ========================================================================= */}
              {visitorSubTab === 'checkout' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
                  <div>
                    <h3 className="font-black text-lg text-slate-900">Fast Exit / Check-Out Scanner</h3>
                    <p className="text-xs text-slate-500">Search by plate number or mobile to record visitor exit and raise exit barrier</p>
                  </div>

                  <div className="relative">
                    <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search Vehicle Plate or Visitor Mobile (e.g. TS-08-EM-4921, 98765 12099)..."
                      value={exitSearchQuery}
                      onChange={(e) => setExitSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold uppercase focus:outline-none focus:border-slate-900"
                    />
                  </div>

                  <div className="space-y-3">
                    {visitorRegister
                      .filter(v => v.status === 'Inside')
                      .filter(v => v.vehicle.toLowerCase().includes(exitSearchQuery.toLowerCase()) || v.name.toLowerCase().includes(exitSearchQuery.toLowerCase()) || v.phone.includes(exitSearchQuery))
                      .map(v => (
                        <div key={v.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-black text-base text-slate-900">{v.vehicle}</span>
                              <span className="font-bold text-xs text-slate-600">({v.name})</span>
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                Inside
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              Visited: <strong>{v.flat} ({v.residentName})</strong> • Phone: {v.phone} • Entered at: {v.entryTime}
                            </div>
                            <div className="text-[11px] font-bold text-indigo-600 mt-0.5">
                              Dwell Time: {v.dwellTime}
                            </div>
                          </div>

                          <button
                            onClick={() => handleCheckOutVisitor(v.id)}
                            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-2xl shadow-md transition-transform active:scale-95 cursor-pointer shrink-0"
                          >
                            Raise Exit Barrier & Check-Out
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* SUB-TAB 4: PRE-APPROVED FAST PASS SCANNER */}
              {/* ========================================================================= */}
              {visitorSubTab === 'preapproved' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
                  <div>
                    <h3 className="font-black text-lg text-slate-900">Pre-Approved Guest Pass & QR Validator</h3>
                    <p className="text-xs text-slate-500">Scan resident-generated QR codes or enter 6-digit gate OTP passcodes</p>
                  </div>

                  <form onSubmit={handleValidateOtp} className="space-y-4 max-w-md">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1 text-xs">Enter 6-Digit Gate OTP Passcode:</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 892-104"
                        value={otpToValidate}
                        onChange={(e) => setOtpToValidate(e.target.value)}
                        className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-center text-2xl font-black tracking-widest uppercase focus:outline-none focus:border-slate-900"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-lg cursor-pointer"
                    >
                      Validate Guest Passcode & Allow Entry
                    </button>
                  </form>

                  {otpValidationResult && (
                    <div className={`p-5 rounded-2xl border text-xs font-bold ${
                      otpValidationResult.includes('VALID:') ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-red-50 border-red-300 text-red-900'
                    }`}>
                      {otpValidationResult}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. GATE SHELF PARCEL LOCKERS */}
          {activeSection === 'parcels' && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Package className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Gate Shelf Parcel Lockers</h2>
                    <p className="text-xs text-slate-500 mt-1">Secure parcel storage for deliveries left at gate when residents are away</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowParcelModal(true)}
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md cursor-pointer"
                >
                  + Store New Parcel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {deliveryParcels.map(p => (
                  <div key={p.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-black text-base text-slate-900">{p.courier} ({p.orderNo})</div>
                        <div className="text-xs text-slate-500 mt-0.5">Target: <strong className="text-indigo-600 font-bold">{p.flat}</strong> • Phone: {p.recipientPhone}</div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full font-bold text-xs ${
                        p.status === 'Awaiting Pickup' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {p.status}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Shelf Location</span>
                        <span className="font-bold text-slate-900">{p.shelf}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Pickup OTP Passcode</span>
                        <span className="font-mono font-black text-sm text-indigo-600">OTP {p.pickupOtp}</span>
                      </div>
                    </div>

                    {p.status === 'Awaiting Pickup' && (
                      <button
                        onClick={() => handleVerifyParcelPickup(p.id)}
                        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer"
                      >
                        Verify Pickup & Handover
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. ANPR AI CAMERA & VEHICLE SCANNER */}
          {activeSection === 'anpr' && (
            <div className="space-y-6">
              
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <span className="font-black text-xl text-slate-900 block">ANPR AI Camera & Plate OCR Scanner</span>
                
                <form onSubmit={handlePlateSearch} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter License Plate Number (e.g. KA-03-MB-4921)..."
                    value={plateQuery}
                    onChange={(e) => setPlateQuery(e.target.value)}
                    className="flex-1 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono font-bold uppercase focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-slate-900 text-white font-bold rounded-2xl text-xs cursor-pointer"
                  >
                    Scan / Lookup Plate
                  </button>
                </form>

                {searchedPlateInfo && (
                  <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-3 animate-fade-in">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-mono font-black text-2xl text-slate-900">{searchedPlateInfo.plate}</div>
                        <div className="text-xs text-slate-600 mt-1">Owner: <strong>{searchedPlateInfo.owner}</strong> • {searchedPlateInfo.flat}</div>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1 rounded-full">
                        {searchedPlateInfo.status}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-indigo-200/60 flex justify-between text-xs text-slate-700">
                      <span>Allocated: <strong>{searchedPlateInfo.slot}</strong></span>
                      <span>Vehicle: {searchedPlateInfo.type}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Flagged Vehicles & Parking Violations */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-black text-base text-slate-900 block">Flagged Vehicles & Parking Violations ({flaggedVehicles.length})</span>
                <div className="space-y-3 text-xs">
                  {flaggedVehicles.map((fv, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex justify-between items-center">
                      <div>
                        <div className="font-mono font-bold text-sm text-slate-900">{fv.plate} ({fv.flat})</div>
                        <div className="text-slate-600 mt-0.5">{fv.violation} • Logged at {fv.time}</div>
                      </div>
                      <span className="bg-rose-200 text-rose-900 font-bold px-3 py-1 rounded-full text-[10px]">
                        {fv.severity} - {fv.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. DAILY STAFF ATTENDANCE */}
          {activeSection === 'staff' && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-black text-xl text-slate-900">Daily Household Staff & Helpers Attendance</h2>
                    <p className="text-xs text-slate-500">Biometric Aadhaar verified maids, cooks, cleaners, and maintenance technicians</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-xs">
                    {staffInsideCount} Staff Inside
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {staffList.map(s => (
                    <div key={s.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                            <span>{s.name}</span>
                            {s.aadhaarVerified && <BadgeCheck className="w-4 h-4 text-emerald-600" />}
                          </div>
                          <div className="text-xs text-slate-500">{s.role} • {s.phone}</div>
                          <div className="text-[11px] text-indigo-600 font-medium mt-0.5">{s.assignedFlats}</div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          s.status === 'Inside Society' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {s.status}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-200/60 text-xs">
                        <span className="text-slate-500">{s.entryTime}</span>
                        <button
                          onClick={() => handleToggleStaff(s.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
                            s.status === 'Inside Society' ? 'bg-slate-900 text-white' : 'bg-emerald-600 text-white'
                          }`}
                        >
                          {s.status === 'Inside Society' ? 'Check Out' : 'Check In'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 6. EMERGENCY SOS CONSOLE */}
          {activeSection === 'sos' && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                    <Flame className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Emergency SOS Command & Dispatch</h2>
                    <p className="text-xs text-slate-500">Instant siren alerts triggered by residents or security patrols</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <span className="font-bold text-sm text-slate-900 block">Emergency Response Hotline</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-500 block">Ambulance Service</span>
                      <span className="font-mono font-bold text-lg text-red-600">108 / 112</span>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-500 block">Local Fire Station</span>
                      <span className="font-mono font-bold text-lg text-slate-900">101</span>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-500 block">Pocharam Police Station</span>
                      <span className="font-mono font-bold text-lg text-slate-900">040-27891100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 7. INCIDENT OCCURRENCE BOOK */}
          {activeSection === 'incidents' && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <span className="font-black text-xl text-slate-900 block">Incident Occurrence Book & Shift Log</span>
                <div className="space-y-3">
                  {incidentsList.map(inc => (
                    <div key={inc.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-slate-500">{inc.id}</span>
                          <span className="font-bold text-sm text-slate-900">{inc.category} ({inc.flat})</span>
                        </div>
                        <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                          {inc.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{inc.desc}</p>
                      <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                        Logged by: {inc.loggedBy} • {inc.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 8. GUARD QR PATROL CHECKPOINTS */}
          {activeSection === 'patrol' && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <span className="font-black text-xl text-slate-900 block">Guard QR Patrol Checkpoints</span>
                <div className="space-y-3 text-xs">
                  {patrolPoints.map(p => (
                    <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-sm text-slate-900">{p.name}</div>
                        <div className="text-slate-500">{p.location}</div>
                      </div>
                      {p.scanned ? (
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                          Scanned ({p.time}) ✓
                        </span>
                      ) : (
                        <button
                          onClick={() => handleScanCheckpoint(p.id)}
                          className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl cursor-pointer"
                        >
                          Scan QR Tag
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 9. LOST & FOUND REGISTER */}
          {activeSection === 'lostfound' && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <span className="font-black text-xl text-slate-900 block">Lost & Found Property Register</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {lostFoundList.map(lf => (
                    <div key={lf.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="font-bold text-sm text-slate-900">{lf.item}</div>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          lf.status.includes('Claimed') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {lf.status}
                        </span>
                      </div>
                      <div className="text-slate-500">Found Location: <strong>{lf.loc}</strong> • {lf.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 10. SECURITY ANALYTICS */}
          {activeSection === 'analytics' && (
            <div className="space-y-6">
              <SecurityAnalytics />
            </div>
          )}

        </main>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: PRINTABLE VISITOR GATE BADGE MODAL */}
      {/* ========================================================================= */}
      {badgeVisitor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-sm space-y-5 shadow-2xl relative text-center">
            <button
              onClick={() => setBadgeVisitor(null)}
              className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-950 text-white flex items-center justify-center mx-auto text-2xl shadow-md">
              🛡️
            </div>

            <div>
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2.5 py-0.5 rounded-full">
                Visitor Gate Pass
              </span>
              <h3 className="font-black text-2xl text-slate-900 mt-1">{badgeVisitor.name}</h3>
              <p className="text-xs text-slate-500">{badgeVisitor.company || badgeVisitor.purpose} • {badgeVisitor.phone}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Badge No:</span>
                <span className="font-mono font-bold text-slate-900">{badgeVisitor.badgeNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-bold text-slate-900">{badgeVisitor.flat} ({badgeVisitor.residentName})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Vehicle:</span>
                <span className="font-mono text-slate-900">{badgeVisitor.vehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Issued At:</span>
                <span className="text-slate-900">{badgeVisitor.entryTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Authorized By:</span>
                <span className="text-slate-900">{badgeVisitor.guardName}</span>
              </div>
            </div>

            <div className="w-32 h-32 bg-white p-2 border border-slate-200 rounded-2xl mx-auto flex items-center justify-center">
              <QrCode className="w-28 h-28 text-slate-900" />
            </div>

            <button
              onClick={() => {
                alert(`Printing Visitor Gate Badge #${badgeVisitor.badgeNo} on thermal receipt printer...`);
                setBadgeVisitor(null);
              }}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Visitor Badge</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: LOG GATE SHELF PARCEL MODAL */}
      {/* ========================================================================= */}
      {showParcelModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowParcelModal(false)}
              className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-black text-xl text-slate-900">Store Parcel at Gate Shelf</h3>
              <p className="text-xs text-slate-500">Assign locker shelf and generate pickup OTP for resident</p>
            </div>

            <form onSubmit={handleLogParcel} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Courier / Service Provider</label>
                <input
                  type="text"
                  required
                  value={delCompany}
                  onChange={(e) => setDelCompany(e.target.value)}
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Flat</label>
                  <input
                    type="text"
                    required
                    value={delFlat}
                    onChange={(e) => setDelFlat(e.target.value)}
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Order / Tracking #</label>
                  <input
                    type="text"
                    required
                    value={delOrderNo}
                    onChange={(e) => setDelOrderNo(e.target.value)}
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Shelf Slot Location</label>
                <select
                  value={delShelf}
                  onChange={(e) => setDelShelf(e.target.value)}
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <option value="Shelf B-4">Shelf B-4 (Tower B Packages)</option>
                  <option value="Shelf B-1">Shelf B-1</option>
                  <option value="Shelf A-1">Shelf A-1 (Tower A Packages)</option>
                  <option value="Cold Storage Locker #02">Cold Storage Locker #02 (Dairy / Food)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs shadow-lg mt-2 cursor-pointer"
              >
                Log Parcel & Send Resident OTP
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: VALIDATE PASSCODE / OTP MODAL */}
      {/* ========================================================================= */}
      {showOtpValidateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowOtpValidateModal(false)}
              className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-black text-xl text-slate-900">Verify Resident / Guest Passcode</h3>
              <p className="text-xs text-slate-500">Enter 4-digit or 6-digit OTP passcode provided by visitor</p>
            </div>

            <form onSubmit={handleValidateOtp} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Passcode / OTP</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 892-104 or 4091"
                  value={otpToValidate}
                  onChange={(e) => setOtpToValidate(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-mono text-center text-lg font-black tracking-widest uppercase"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs shadow-lg cursor-pointer"
              >
                Validate Passcode
              </button>
            </form>

            {otpValidationResult && (
              <div className={`p-4 rounded-2xl border text-xs font-bold ${
                otpValidationResult.includes('VALID:') ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-red-50 border-red-300 text-red-900'
              }`}>
                {otpValidationResult}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SECURITY SOS PANIC MODAL */}
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

            <div className="font-black text-2xl text-red-900">🚨 SECURITY EMERGENCY SIREN</div>
            <p className="text-xs text-slate-600">
              Broadcast emergency siren to all security gate posts and emergency response units.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  setEmergencyAlertActive(true);
                  alert('SECURITY EMERGENCY BROADCAST ACTIVE! All patrol guards notified.');
                  setShowSosModal(false);
                }}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs shadow-lg cursor-pointer"
              >
                BROADCAST GATE 1 EMERGENCY SIREN
              </button>

              <button
                onClick={() => alert('Dialing 112 / 108 Emergency Ambulance / Police Services...')}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs cursor-pointer"
              >
                Call Police / Ambulance (112)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
