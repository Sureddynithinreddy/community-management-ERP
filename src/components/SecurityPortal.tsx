import React, { useState } from 'react';
import { 
  ShieldCheck, UserCheck, Package, Car, Search, Flame, AlertTriangle, 
  Clock, HelpCircle, LayoutDashboard, ArrowLeft, Wifi, WifiOff, Camera, Check,
  Plus, CheckCircle2, XCircle, Phone, Download, QrCode, Sparkles, AlertCircle, 
  ShieldAlert, LogOut, Menu, X, Bell, UserPlus, PhoneCall, ChevronRight,
  TrendingUp, BarChart3, Radio, FileText, CheckCheck, RefreshCw, KeyRound,
  Lock, Eye, Shield, Users, Building2, MapPin, Truck, AlertOctagon, UserX,
  BadgeCheck, Hammer, Sparkle, Printer, Share2, ArrowUpRight, ShieldQuestion,
  Snowflake, Scan, Compass, ShieldBan, Tag, Siren, Volume2, VolumeX, ShieldQuestion as ShieldQ,
  PhoneForwarded, Send, ArrowUp, ArrowDown, Key, CheckSquare, Sparkles as SparklesIcon
} from 'lucide-react';
import { SecurityAnalytics } from './SecurityAnalytics';

interface SecurityPortalProps {
  onExit: () => void;
}

type SecurityNavSection = 
  | 'dashboard'
  | 'visitors'
  | 'residents'
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
  residentName: string;
  shelf: string;
  category: 'Standard Parcel' | 'Cold Storage (Dairy/Food)' | 'Fragile Box' | 'Document';
  loggedTime: string;
  dwell: string;
  status: 'Awaiting Pickup' | 'Picked Up';
  pickupOtp: string;
  recipientPhone: string;
  collectedBy?: string;
  collectedTime?: string;
}

interface ResidentDossier {
  flat: string;
  tower: string;
  floor: string;
  unitType: string;
  owner: string;
  phone: string;
  intercom: string;
  email: string;
  aadhaarKyc: string;
  possessionDate: string;
  familyMembers: Array<{ name: string; relation: string; phone?: string }>;
  vehicles: Array<{ plate: string; model: string; slot: string; rfid: string }>;
  helpers: Array<{ name: string; role: string; time: string; phone: string }>;
  autoApproveRules: string[];
}

interface ResidentVehicle {
  id: string;
  plate: string;
  model: string;
  color: string;
  flat: string;
  owner: string;
  phone: string;
  slot: string;
  rfidTag: string;
  status: 'Whitelisted FastTag Active' | 'Tag Inactive';
}

interface ParkingViolation {
  id: string;
  plate: string;
  vehicleModel: string;
  flat: string;
  location: string;
  violation: string;
  severity: 'Critical' | 'High' | 'Moderate';
  status: 'Warning Issued' | 'Citation Logged' | 'Under Inspection';
  time: string;
  fineAmount?: string;
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

interface SosIncident {
  id: string;
  flat: string;
  resident: string;
  tower: string;
  triggerTime: string;
  status: 'Active Siren' | 'Guard Dispatched' | 'Resolved';
  dispatchedOfficer?: string;
  responseTime?: string;
  notes?: string;
}

interface LostFoundItem {
  id: string;
  title: string;
  category: 'Keys & Smart Remotes' | 'Wallets & IDs' | 'Electronics' | 'Kids Toys & Bikes' | 'Personal Accessories';
  loc: string;
  date: string;
  status: 'Unclaimed In Custody' | 'Claimed & Returned';
  locker: string;
  loggedBy: string;
  photo: string;
  claimedBy?: string;
  claimedFlat?: string;
  claimedDate?: string;
}

export const SecurityPortal: React.FC<SecurityPortalProps> = ({ onExit }) => {
  // Navigation State
  const [activeSection, setActiveSection] = useState<SecurityNavSection>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Sub-Tab Navigation States
  const [visitorSubTab, setVisitorSubTab] = useState<'ledger' | 'checkin' | 'checkout' | 'preapproved'>('ledger');
  const [parcelSubTab, setParcelSubTab] = useState<'inventory' | 'log' | 'verify' | 'history'>('inventory');
  const [anprSubTab, setAnprSubTab] = useState<'scanner' | 'directory' | 'violations' | 'bays'>('scanner');
  const [lostFoundSubTab, setLostFoundSubTab] = useState<'all' | 'unclaimed' | 'claimed' | 'log'>('all');

  // Gate Boom Barrier Hardware Simulation
  const [barrierState, setBarrierState] = useState<'LOWERED' | 'RAISED'>('LOWERED');

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

  // Handover Claim Modal for Lost & Found
  const [claimingItem, setClaimingItem] = useState<LostFoundItem | null>(null);
  const [claimResidentName, setClaimResidentName] = useState<string>('Ananya Sharma');
  const [claimResidentFlat, setClaimResidentFlat] = useState<string>('Flat B-108');

  // Printable Visitor Badge Modal
  const [badgeVisitor, setBadgeVisitor] = useState<VisitorEntry | null>(null);

  // =========================================================================
  // 1. RESIDENT DIRECTORY & VERIFICATION DATABASE
  // =========================================================================
  const [residentSearchQuery, setResidentSearchQuery] = useState<string>('Flat B-108');
  const [selectedTowerFilter, setSelectedTowerFilter] = useState<'ALL' | 'Tower A' | 'Tower B' | 'Tower C'>('ALL');

  const fullResidentDatabase: Record<string, ResidentDossier> = {
    'Flat B-108': {
      flat: 'Flat B-108',
      tower: 'Tower B',
      floor: '1st Floor',
      unitType: '2BHK (1,250 sq.ft)',
      owner: 'Ananya Sharma',
      phone: '+91 98765 11111',
      intercom: 'Ext: 108',
      email: 'ananya.sharma@example.com',
      aadhaarKyc: 'XXXX-XXXX-8902 (Verified ✓)',
      possessionDate: '15 March 2024',
      familyMembers: [
        { name: 'Rahul Sharma', relation: 'Spouse / Co-Owner', phone: '+91 98765 22222' },
        { name: 'Aarav Sharma', relation: 'Child / Resident' }
      ],
      vehicles: [
        { plate: 'KA-03-MB-4921', model: 'Honda City Sedan (White)', slot: 'Basement 1 - Slot B-42', rfid: 'RFID-ANPR-8921-ACTIVE' },
        { plate: 'TS-07-EX-8899', model: 'Ather 450X EV (Grey)', slot: '2W Bay B-14', rfid: 'RFID-2W-8899-ACTIVE' }
      ],
      helpers: [
        { name: 'Sunita Devi', role: 'Daily Housekeeping Maid', time: '09:15 AM - 01:00 PM', phone: '98765 99887' },
        { name: 'Ramesh Kumar', role: 'Morning Cook', time: '07:00 AM - 09:00 AM', phone: '98123 44556' }
      ],
      autoApproveRules: [
        '⚡ Blinkit / Swiggy Deliveries Auto-Approved',
        '🚗 Uber / Ola Cabs Auto-Approved',
        '🔔 Automated IVR Voice Call on Gate Arrivals Active'
      ]
    },
    'Flat A-402': {
      flat: 'Flat A-402',
      tower: 'Tower A',
      floor: '4th Floor',
      unitType: '3BHK (1,850 sq.ft)',
      owner: 'Rajesh Mehta',
      phone: '+91 98765 12345',
      intercom: 'Ext: 402',
      email: 'rajesh.mehta@example.com',
      aadhaarKyc: 'XXXX-XXXX-4412 (Verified ✓)',
      possessionDate: '10 January 2024',
      familyMembers: [
        { name: 'Kavita Mehta', relation: 'Spouse', phone: '+91 98765 33441' },
        { name: 'Rohan Mehta', relation: 'Son' }
      ],
      vehicles: [
        { plate: 'KA-05-MA-1234', model: 'Hyundai Creta SUV (Silver)', slot: 'Basement 1 - Slot A-12', rfid: 'RFID-ANPR-4412-ACTIVE' }
      ],
      helpers: [
        { name: 'Sunita Devi', role: 'Daily Maid', time: '08:00 AM - 09:15 AM', phone: '98765 99887' }
      ],
      autoApproveRules: [
        '⚠️ Manual Guard Phone Call Verification Required for All Visitors'
      ]
    },
    'Flat C-301': {
      flat: 'Flat C-301',
      tower: 'Tower C',
      floor: '3rd Floor',
      unitType: '3BHK (1,850 sq.ft)',
      owner: 'Suresh Menon',
      phone: '+91 98901 22334',
      intercom: 'Ext: 301',
      email: 'suresh.menon@example.com',
      aadhaarKyc: 'XXXX-XXXX-9901 (Verified ✓)',
      possessionDate: '01 June 2024',
      familyMembers: [
        { name: 'Deepa Menon', relation: 'Spouse', phone: '+91 98901 55667' }
      ],
      vehicles: [
        { plate: 'TS-09-GA-1002', model: 'Maruti Brezza (Red)', slot: 'Basement 2 - Slot C-08', rfid: 'RFID-ANPR-3319-ACTIVE' }
      ],
      helpers: [
        { name: 'Pooja Bai', role: 'Daily Cleaner', time: '09:45 AM - 11:00 AM', phone: '98901 22334' }
      ],
      autoApproveRules: [
        '⚡ Food Deliveries (Swiggy / Zomato) Auto-Approved'
      ]
    }
  };

  const selectedDossier: ResidentDossier = fullResidentDatabase[residentSearchQuery] || fullResidentDatabase['Flat B-108'];

  // =========================================================================
  // 2. EMERGENCY SOS CONSOLE & LIVE SIREN DISPATCH
  // =========================================================================
  const [sosActiveSiren, setSosActiveSiren] = useState<boolean>(false);
  const [activeSosIncident, setActiveSosIncident] = useState<SosIncident>({
    id: 'SOS-901',
    flat: 'Flat B-108',
    resident: 'Ananya Sharma',
    tower: 'Tower B (1st Floor)',
    triggerTime: '11:46 AM',
    status: 'Resolved',
    dispatchedOfficer: 'Guard Suresh (Patrol Unit 1)',
    responseTime: '1 min 15s',
    notes: 'Resident verified safe. Test siren resolved.'
  });

  const [sosHistoryList, setSosHistoryList] = useState<SosIncident[]>([
    { id: 'SOS-892', flat: 'Flat A-402', resident: 'Rajesh Mehta', tower: 'Tower A', triggerTime: '19 Aug 2026 09:12 PM', status: 'Resolved', dispatchedOfficer: 'Guard Vikram Singh', responseTime: '1m 40s Response', notes: 'Accidental test trigger by resident child. Verified all clear.' },
    { id: 'SOS-880', flat: 'Flat C-301', resident: 'Suresh Menon', tower: 'Tower C', triggerTime: '14 Aug 2026 02:30 AM', status: 'Resolved', dispatchedOfficer: 'Guard Ramu', responseTime: '2m 10s Response', notes: 'Medical panic alarm. Ambulance 108 summoned and escorted to Tower C.' },
  ]);

  // =========================================================================
  // 3. VISITOR REGISTER STATE (6 Active Entries)
  // =========================================================================
  const [vName, setVName] = useState<string>('Rajesh Kumar');
  const [vPhone, setVPhone] = useState<string>('98765 12099');
  const [vFlat, setVFlat] = useState<string>('Flat B-108');
  const [vPurpose, setVPurpose] = useState<'Delivery' | 'Guest' | 'Cab' | 'Service Tech' | 'Daily Staff'>('Delivery');
  const [vCompany, setVCompany] = useState<string>('Blinkit 10-Min Delivery');
  const [vOrderNo, setVOrderNo] = useState<string>('#BK-90214');
  const [vVehicle, setVVehicle] = useState<string>('TS-08-EM-4921 (EV Bike)');

  const [visitorRegister, setVisitorRegister] = useState<VisitorEntry[]>([
    { id: 'VIS-901', name: 'Rajesh Kumar', phone: '98765 12099', flat: 'Flat B-108', residentName: 'Ananya Sharma', purpose: 'Delivery', company: 'Blinkit', orderNo: '#BK-90214', vehicle: 'TS-08-EM-4921 (EV Bike)', entryTime: '11:45 AM', exitTime: '--', dwellTime: '15 mins in campus', status: 'Inside', photo: 'CAM-101.jpg', gate: 'Gate 1 Main', guardName: 'Guard Vikram Singh', badgeNo: 'BDG-901', overstay: false },
    { id: 'VIS-900', name: 'Sunita Devi (Maid)', phone: '98765 99887', flat: 'Flat B-108', residentName: 'Ananya Sharma', purpose: 'Daily Staff', vehicle: 'Walk-in', entryTime: '09:15 AM', exitTime: '--', dwellTime: '2h 45m in campus', status: 'Inside', photo: 'CAM-099.jpg', gate: 'Gate 1 Main', guardName: 'Guard Vikram Singh', badgeNo: 'BDG-900', overstay: false },
    { id: 'VIS-899', name: 'Siddharth Verma', phone: '98765 43210', flat: 'Flat B-108', residentName: 'Ananya Sharma', purpose: 'Guest', vehicle: 'KA-05-MA-1234 (Creta)', entryTime: '10:30 AM', exitTime: '--', dwellTime: '1h 30m in campus', status: 'Inside', photo: 'CAM-098.jpg', gate: 'Gate 1 Main', guardName: 'Guard Vikram Singh', passOtp: '892-104', badgeNo: 'BDG-899', overstay: false },
    { id: 'VIS-898', name: 'Ramesh Plumber', phone: '98123 99887', flat: 'Flat B-108', residentName: 'Ananya Sharma', purpose: 'Service Tech', vehicle: 'KA-04-PL-1102', entryTime: '10:15 AM', exitTime: '--', dwellTime: '1h 45m in campus', status: 'Inside', photo: 'CAM-095.jpg', gate: 'Gate 1 Main', guardName: 'Guard Vikram Singh', badgeNo: 'BDG-898', overstay: false },
    { id: 'VIS-897', name: 'Rahul Sharma (Swiggy)', phone: '98901 22334', flat: 'Flat C-301', residentName: 'Suresh Menon', purpose: 'Delivery', company: 'Swiggy', orderNo: '#SW-4912', vehicle: 'KA-05-SW-4912', entryTime: '11:05 AM', exitTime: '11:15 AM', dwellTime: '10 Mins (Departed)', status: 'Departed', photo: 'CAM-092.jpg', gate: 'Gate 1 Main', guardName: 'Guard Vikram Singh', badgeNo: 'BDG-897', overstay: false },
    { id: 'VIS-896', name: 'Driver Alok (Uber)', phone: '98123 99999', flat: 'Flat A-104', residentName: 'Pooja Hegde', purpose: 'Cab', vehicle: 'KA-01-PH-7711 (White Dzire)', entryTime: '11:20 AM', exitTime: '11:32 AM', dwellTime: '12 Mins (Departed)', status: 'Departed', photo: 'CAM-090.jpg', gate: 'Gate 2 Rear', guardName: 'Guard Ramu', badgeNo: 'BDG-896', overstay: false },
  ]);

  // Visitor Filters
  const [visitorFilterTab, setVisitorFilterTab] = useState<'all' | 'inside' | 'departed'>('inside');
  const [visitorSearch, setVisitorSearch] = useState<string>('');
  const [exitSearchQuery, setExitSearchQuery] = useState<string>('');

  // =========================================================================
  // 4. PARCEL & DELIVERY LOCKER STATE
  // =========================================================================
  const [delCompany, setDelCompany] = useState<string>('Amazon Courier');
  const [delFlat, setDelFlat] = useState<string>('Flat B-108');
  const [delOrderNo, setDelOrderNo] = useState<string>('#AZ-9021');
  const [delShelf, setDelShelf] = useState<string>('Shelf B-4');
  const [delCategory, setDelCategory] = useState<'Standard Parcel' | 'Cold Storage (Dairy/Food)' | 'Fragile Box' | 'Document'>('Standard Parcel');
  const [delPhone, setDelPhone] = useState<string>('98765 11111');
  const [parcelVerifyOtp, setParcelVerifyOtp] = useState<string>('');
  const [parcelVerifyResult, setParcelVerifyResult] = useState<string | null>(null);

  const [deliveryParcels, setDeliveryParcels] = useState<ParcelEntry[]>([
    { id: 'PAR-101', courier: 'Amazon Courier', orderNo: '#AZ-9021', flat: 'Flat B-108', residentName: 'Ananya Sharma', shelf: 'Shelf B-4', category: 'Standard Parcel', loggedTime: '11:20 AM', dwell: '1.2 Hours', status: 'Awaiting Pickup', pickupOtp: '4091', recipientPhone: '98765 11111' },
    { id: 'PAR-102', courier: 'Swiggy InstaMart', orderNo: '#SW-4912', flat: 'Flat B-108', residentName: 'Ananya Sharma', shelf: 'Cold Storage Locker #02', category: 'Cold Storage (Dairy/Food)', loggedTime: '11:32 AM', dwell: '45 Mins', status: 'Awaiting Pickup', pickupOtp: '8821', recipientPhone: '98765 11111' },
    { id: 'PAR-103', courier: 'Zomato Food', orderNo: '#ZM-8812', flat: 'Flat A-402', residentName: 'Rajesh Mehta', shelf: 'Shelf A-1', category: 'Standard Parcel', loggedTime: '12:01 PM', dwell: '20 Mins', status: 'Awaiting Pickup', pickupOtp: '3312', recipientPhone: '98765 12345' },
    { id: 'PAR-104', courier: 'Flipkart Logistics', orderNo: '#FK-1102', flat: 'Flat A-104', residentName: 'Pooja Hegde', shelf: 'Shelf A-2', category: 'Standard Parcel', loggedTime: '09:45 AM', dwell: '3.1 Hours', status: 'Awaiting Pickup', pickupOtp: '1904', recipientPhone: '98123 99999' },
    { id: 'PAR-099', courier: 'Blinkit Instant', orderNo: '#BK-5541', flat: 'Flat B-204', residentName: 'Rohan Deshmukh', shelf: 'Shelf B-1', category: 'Standard Parcel', loggedTime: '08:15 AM', dwell: 'Picked Up', status: 'Picked Up', pickupOtp: '7721', recipientPhone: '98990 11223', collectedBy: 'Rohan Deshmukh', collectedTime: '09:30 AM' },
    { id: 'PAR-098', courier: 'BlueDart Air', orderNo: '#BD-1092', flat: 'Flat C-301', residentName: 'Suresh Menon', shelf: 'Shelf A-3', category: 'Document', loggedTime: 'Yesterday', dwell: 'Picked Up', status: 'Picked Up', pickupOtp: '5512', recipientPhone: '98901 22334', collectedBy: 'Suresh Menon', collectedTime: 'Yesterday 06:10 PM' },
  ]);

  // Visual Shelf Racks
  const shelfRacks = [
    { id: 'Shelf B-1', tower: 'Tower B', status: 'Available' },
    { id: 'Shelf B-2', tower: 'Tower B', status: 'Available' },
    { id: 'Shelf B-3', tower: 'Tower B', status: 'Available' },
    { id: 'Shelf B-4', tower: 'Tower B', status: 'Occupied', parcelId: 'PAR-101', flat: 'Flat B-108' },
    { id: 'Shelf B-5', tower: 'Tower B', status: 'Available' },
    { id: 'Shelf B-6', tower: 'Tower B', status: 'Available' },
    { id: 'Shelf A-1', tower: 'Tower A', status: 'Occupied', parcelId: 'PAR-103', flat: 'Flat A-402' },
    { id: 'Shelf A-2', tower: 'Tower A', status: 'Occupied', parcelId: 'PAR-104', flat: 'Flat A-104' },
    { id: 'Shelf A-3', tower: 'Tower A', status: 'Available' },
    { id: 'Shelf A-4', tower: 'Tower A', status: 'Available' },
    { id: 'Cold Storage Locker #01', tower: 'Refrigerated', status: 'Available' },
    { id: 'Cold Storage Locker #02', tower: 'Refrigerated', status: 'Occupied', parcelId: 'PAR-102', flat: 'Flat B-108' },
  ];

  // =========================================================================
  // 5. VEHICLE, ANPR & PARKING MANAGEMENT STATE
  // =========================================================================
  const [plateQuery, setPlateQuery] = useState<string>('KA-03-MB-4921');
  const [simulatedScanResult, setSimulatedScanResult] = useState<{
    plate: string;
    confidence: string;
    status: 'Whitelisted Resident' | 'Visitor Pass' | 'Unregistered';
    owner: string;
    flat: string;
    slot: string;
    rfidTag: string;
    barrierAction: string;
  } | null>({
    plate: 'KA-03-MB-4921',
    confidence: '99.4% OCR Match',
    status: 'Whitelisted Resident',
    owner: 'Ananya Sharma',
    flat: 'Flat B-108 (Tower B)',
    slot: 'Basement 1 - Slot B-42',
    rfidTag: 'RFID-ANPR-8921-ACTIVE',
    barrierAction: 'Automatic Barrier Lift Allowed ✓'
  });

  const [residentVehiclesList, setResidentVehiclesList] = useState<ResidentVehicle[]>([
    { id: 'VEH-01', plate: 'KA-03-MB-4921', model: 'Honda City Sedan', color: 'White', flat: 'Flat B-108', owner: 'Ananya Sharma', phone: '+91 98765 11111', slot: 'Basement 1 - Slot B-42', rfidTag: 'RFID-ANPR-8921-ACTIVE', status: 'Whitelisted FastTag Active' },
    { id: 'VEH-02', plate: 'KA-05-MA-1234', model: 'Hyundai Creta SUV', color: 'Silver', flat: 'Flat A-402', owner: 'Rajesh Mehta', phone: '+91 98765 12345', slot: 'Basement 1 - Slot A-12', rfidTag: 'RFID-ANPR-4412-ACTIVE', status: 'Whitelisted FastTag Active' },
    { id: 'VEH-03', plate: 'TS-09-GA-1002', model: 'Maruti Brezza', color: 'Red', flat: 'Flat C-301', owner: 'Suresh Menon', phone: '+91 98901 22334', slot: 'Basement 2 - Slot C-08', rfidTag: 'RFID-ANPR-3319-ACTIVE', status: 'Whitelisted FastTag Active' },
    { id: 'VEH-04', plate: 'KA-01-PH-7711', model: 'Kia Seltos', color: 'Black', flat: 'Flat A-104', owner: 'Pooja Hegde', phone: '+91 98123 99999', slot: 'Basement 1 - Slot A-04', rfidTag: 'RFID-ANPR-7711-ACTIVE', status: 'Whitelisted FastTag Active' },
    { id: 'VEH-05', plate: 'TS-07-EX-8899', model: 'Ather 450X (2-Wheeler)', color: 'Grey', flat: 'Flat B-108', owner: 'Rahul Sharma', phone: '+91 98765 22222', slot: '2W Bay B-14', rfidTag: 'RFID-2W-8899-ACTIVE', status: 'Whitelisted FastTag Active' },
  ]);

  const [vehicleSearchQuery, setVehicleSearchQuery] = useState<string>('');

  const [parkingViolationsList, setParkingViolationsList] = useState<ParkingViolation[]>([
    { id: 'VIO-8921', plate: 'MH-12-PQ-9988', vehicleModel: 'Toyota Innova (Visitor)', flat: 'Flat B-102 Visitor', location: 'Tower B Basement Entry Ramp', violation: 'Parked blocking basement access ramp', severity: 'Critical', status: 'Warning Issued', time: '10:15 AM', fineAmount: '₹ 500' },
    { id: 'VIO-8810', plate: 'KA-05-AB-1234', vehicleModel: 'Maruti Swift (Guest)', flat: 'Flat C-301 Guest', location: 'Visitor Parking Bay V-03', violation: 'Overstayed visitor parking limit (6+ Hours)', severity: 'Moderate', status: 'Citation Logged', time: '09:40 AM', fineAmount: '₹ 200' },
    { id: 'VIO-8742', plate: 'KA-01-XY-9999', vehicleModel: 'Unknown White Sedan', flat: 'Unauthorized Vehicle', location: 'Clubhouse Fire Lane', violation: 'Parked in designated Fire Engine emergency lane', severity: 'Critical', status: 'Under Inspection', time: '08:20 AM', fineAmount: '₹ 1,000' },
  ]);

  // Visitor Parking Bays (V-01 to V-10)
  const [visitorBays, setVisitorBays] = useState([
    { id: 'V-01', plate: 'TS-08-EM-4921', visitor: 'Rajesh Kumar (Blinkit)', flat: 'Flat B-108', dwell: '15 Mins', status: 'Occupied' },
    { id: 'V-02', plate: 'KA-05-MA-1234', visitor: 'Siddharth Verma', flat: 'Flat B-108', dwell: '1.5 Hours', status: 'Occupied' },
    { id: 'V-03', plate: 'KA-05-AB-1234', visitor: 'Guest Car', flat: 'Flat C-301', dwell: '6.2 Hours (Overstay!)', status: 'Overstay' },
    { id: 'V-04', plate: '--', visitor: '--', flat: '--', dwell: '--', status: 'Available' },
    { id: 'V-05', plate: '--', visitor: '--', flat: '--', dwell: '--', status: 'Available' },
    { id: 'V-06', plate: '--', visitor: '--', flat: '--', dwell: '--', status: 'Available' },
    { id: 'V-07', plate: '--', visitor: '--', flat: '--', dwell: '--', status: 'Available' },
    { id: 'V-08', plate: '--', visitor: '--', flat: '--', dwell: '--', status: 'Available' },
  ]);

  // =========================================================================
  // 6. DAILY STAFF & HELPERS ATTENDANCE (6 Active Staff)
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
  // 7. INCIDENTS & OCCURRENCE BOOK
  // =========================================================================
  const [incidentsList, setIncidentsList] = useState([
    { id: 'INC-8921', category: 'Parking Dispute', flat: 'Flat B-102', desc: 'Visitor car parked blocking basement ramp', loggedBy: 'Guard Vikram Singh', status: 'Under Investigation', time: '10:45 AM', priority: 'High' },
    { id: 'INC-8810', category: 'Noise Disturbance', flat: 'Flat C-401', desc: 'Loud music past 11 PM reported by neighbors', loggedBy: 'Guard Suresh', status: 'Resolved', time: 'Yesterday', priority: 'Medium' },
    { id: 'INC-8742', category: 'Pool Rules Violation', flat: 'Flat A-201', desc: 'Glass bottles brought to swimming pool deck', loggedBy: 'Guard Dinesh', status: 'Resolved', time: '19 Aug 2026', priority: 'Low' },
  ]);

  // =========================================================================
  // 8. GUARD PATROL CHECKPOINTS
  // =========================================================================
  const [patrolPoints, setPatrolPoints] = useState([
    { id: 1, name: 'Checkpoint 1: Main Gate Outer Perimeter', scanned: true, time: '11:00 AM', location: 'Gate 1 Outer Wall' },
    { id: 2, name: 'Checkpoint 2: Tower B Basement Parking Ramp', scanned: true, time: '11:15 AM', location: 'Basement 1 Ramp' },
    { id: 3, name: 'Checkpoint 3: Clubhouse Back Entrance & Pool', scanned: false, time: '--', location: 'Clubhouse Ground Floor' },
    { id: 4, name: 'Checkpoint 4: DG Power Backup Substation', scanned: false, time: '--', location: 'Rear Utility Yard' },
    { id: 5, name: 'Checkpoint 5: Tower A Fire Hose Station', scanned: false, time: '--', location: 'Tower A Ground' },
  ]);

  // =========================================================================
  // 9. UPGRADED: LOST & FOUND PROPERTY REGISTER (6 Comprehensive Entries)
  // =========================================================================
  const [lfTitle, setLfTitle] = useState<string>('');
  const [lfCategory, setLfCategory] = useState<'Keys & Smart Remotes' | 'Wallets & IDs' | 'Electronics' | 'Kids Toys & Bikes' | 'Personal Accessories'>('Keys & Smart Remotes');
  const [lfLoc, setLfLoc] = useState<string>('Clubhouse Swimming Pool Deck');
  const [lfLocker, setLfLocker] = useState<string>('Security Locker LF-03');

  const [lostFoundList, setLostFoundList] = useState<LostFoundItem[]>([
    { id: 'LF-101', title: 'Hyundai Creta Smart Key Ring', category: 'Keys & Smart Remotes', loc: 'Swimming Pool Deck', date: 'Today 09:30 AM', status: 'Unclaimed In Custody', locker: 'Security Locker LF-01', loggedBy: 'Guard Vikram Singh', photo: 'KEY-101.jpg' },
    { id: 'LF-102', title: 'Apple AirPods Pro (White Case)', category: 'Electronics', loc: 'Clubhouse Gym (Treadmill 2)', date: 'Today 08:15 AM', status: 'Unclaimed In Custody', locker: 'Security Locker LF-03', loggedBy: 'Guard Ramu', photo: 'AIRPOD-102.jpg' },
    { id: 'LF-098', title: 'Child Blue Bicycle (Hero Sprint 20T)', category: 'Kids Toys & Bikes', loc: 'Garden Play Area', date: '21 Aug 2026', status: 'Claimed & Returned', locker: 'Main Gate Storage Bay', loggedBy: 'Guard Suresh', photo: 'CYCLE-98.jpg', claimedBy: 'Rohan Deshmukh', claimedFlat: 'Flat B-201', claimedDate: '22 Aug 2026' },
    { id: 'LF-095', title: 'Brown Leather Wallet with Driving License', category: 'Wallets & IDs', loc: 'Clubhouse Badminton Court', date: '18 Aug 2026', status: 'Claimed & Returned', locker: 'Security Locker LF-02', loggedBy: 'Guard Vikram Singh', photo: 'WALLET-95.jpg', claimedBy: 'Suresh Menon', claimedFlat: 'Flat C-301', claimedDate: '19 Aug 2026' },
    { id: 'LF-091', title: 'Ray-Ban Aviator Sunglasses (Gold Frame)', category: 'Personal Accessories', loc: 'Tennis Court 1', date: '14 Aug 2026', status: 'Claimed & Returned', locker: 'Security Locker LF-04', loggedBy: 'Guard Dinesh', photo: 'SUNGLASS-91.jpg', claimedBy: 'Pooja Hegde', claimedFlat: 'Flat A-104', claimedDate: '15 Aug 2026' },
    { id: 'LF-089', title: 'Noise ColorFit Smartwatch (Black Strap)', category: 'Electronics', loc: 'Tower B Lift Lobby', date: '10 Aug 2026', status: 'Claimed & Returned', locker: 'Security Locker LF-02', loggedBy: 'Guard Vikram Singh', photo: 'WATCH-89.jpg', claimedBy: 'Rahul Sharma', claimedFlat: 'Flat B-108', claimedDate: '11 Aug 2026' },
  ]);

  // Handlers
  const handleCheckInVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vName) return;

    const newId = `VIS-${Math.floor(900 + Math.random() * 100)}`;
    const badgeNumber = `BDG-${Math.floor(100 + Math.random() * 900)}`;
    const residentInfo = fullResidentDatabase[vFlat] || { owner: 'Resident', phone: 'Ext: 101' };

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
    const residentInfo = fullResidentDatabase[delFlat] || { owner: 'Resident', phone: delPhone };

    const newParcel: ParcelEntry = {
      id: newId,
      courier: delCompany,
      orderNo: delOrderNo,
      flat: delFlat,
      residentName: residentInfo.owner,
      shelf: delShelf,
      category: delCategory,
      loggedTime: 'Just Now',
      dwell: '0 Mins',
      status: 'Awaiting Pickup',
      pickupOtp: randomOtp,
      recipientPhone: delPhone || residentInfo.phone
    };

    setDeliveryParcels([newParcel, ...deliveryParcels]);
    setShowParcelModal(false);
    setParcelSubTab('inventory');
    alert(`PARCEL STORED AT ${delShelf} (${newId}) ✓\nPickup Passcode OTP: ${randomOtp} dispatched to ${delFlat} (${residentInfo.owner})!`);
  };

  const handleVerifyParcelPickup = (id: string) => {
    setDeliveryParcels(prev => prev.map(p => p.id === id ? { 
      ...p, 
      status: 'Picked Up', 
      dwell: 'Collected Just Now',
      collectedBy: p.residentName,
      collectedTime: 'Just Now'
    } : p));
    alert(`PARCEL HANDED OVER ✓\nMarked as collected by resident.`);
  };

  const handleVerifyParcelWithOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = deliveryParcels.find(p => p.pickupOtp === parcelVerifyOtp && p.status === 'Awaiting Pickup');
    if (matched) {
      handleVerifyParcelPickup(matched.id);
      setParcelVerifyResult(`MATCH SUCCESS ✓: Handed over ${matched.courier} (${matched.orderNo}) to ${matched.residentName} (${matched.flat}) at ${matched.shelf}`);
      setParcelVerifyOtp('');
    } else {
      setParcelVerifyResult('ERROR ❌: Invalid Pickup OTP or parcel already collected.');
    }
  };

  const handlePlateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = plateQuery.toUpperCase().replace(/\s+/g, '');
    if (cleanQuery.includes('4921') || cleanQuery.includes('KA-03-MB-4921') || cleanQuery.includes('KA03MB4921')) {
      setSimulatedScanResult({
        plate: 'KA-03-MB-4921',
        confidence: '99.4% OCR Match',
        status: 'Whitelisted Resident',
        owner: 'Ananya Sharma',
        flat: 'Flat B-108 (Tower B)',
        slot: 'Basement 1 - Slot B-42',
        rfidTag: 'RFID-ANPR-8921-ACTIVE',
        barrierAction: 'Automatic Barrier Lift Allowed ✓'
      });
    } else if (cleanQuery.includes('1234') || cleanQuery.includes('KA-05-MA-1234')) {
      setSimulatedScanResult({
        plate: 'KA-05-MA-1234',
        confidence: '98.8% OCR Match',
        status: 'Whitelisted Resident',
        owner: 'Rajesh Mehta',
        flat: 'Flat A-402 (Tower A)',
        slot: 'Basement 1 - Slot A-12',
        rfidTag: 'RFID-ANPR-4412-ACTIVE',
        barrierAction: 'Automatic Barrier Lift Allowed ✓'
      });
    } else {
      setSimulatedScanResult({
        plate: plateQuery.toUpperCase(),
        confidence: '95.2% OCR Match',
        status: 'Visitor Pass',
        owner: 'Visitor / Unregistered',
        flat: 'Not Whitelisted in System',
        slot: 'Allocate Visitor Bay (V-04)',
        rfidTag: 'No Active FastTag Tag',
        barrierAction: 'Guard Check-In Verification Required ⚠️'
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

  const handleLogLostFoundItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lfTitle) return;

    const newId = `LF-${Math.floor(100 + Math.random() * 900)}`;
    const newItem: LostFoundItem = {
      id: newId,
      title: lfTitle,
      category: lfCategory,
      loc: lfLoc,
      date: 'Just Now',
      status: 'Unclaimed In Custody',
      locker: lfLocker,
      loggedBy: 'Guard Vikram Singh',
      photo: 'ITEM-FOUND.jpg'
    };

    setLostFoundList([newItem, ...lostFoundList]);
    setLfTitle('');
    setLostFoundSubTab('unclaimed');
    alert(`FOUND PROPERTY LOGGED (${newId}) ✓\nSecured in ${lfLocker}. Notification posted on society board.`);
  };

  const handleProcessClaimHandover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimingItem) return;

    setLostFoundList(prev => prev.map(item => item.id === claimingItem.id ? {
      ...item,
      status: 'Claimed & Returned',
      claimedBy: claimResidentName,
      claimedFlat: claimResidentFlat,
      claimedDate: 'Today Just Now'
    } : item));

    setClaimingItem(null);
    alert(`HANDOVER COMPLETED ✓\nReturned ${claimingItem.title} to ${claimResidentName} (${claimResidentFlat}). Handover logged in security register.`);
  };

  const handleDispatchPatrolToSos = () => {
    setActiveSosIncident(prev => ({
      ...prev,
      status: 'Guard Dispatched',
      dispatchedOfficer: 'Guard Suresh (Patrol Unit 1) - En Route',
      responseTime: 'Guard Arriving in 45s'
    }));
    alert(`EMERGENCY PATROL DISPATCHED ✓\nGuard Suresh assigned to Flat B-108 (Tower B 1st Floor). Radio dispatch alerted!`);
  };

  const handleResetSosSiren = () => {
    setSosActiveSiren(false);
    setActiveSosIncident(prev => ({
      ...prev,
      status: 'Resolved',
      notes: 'Siren cleared & verified with resident Ananya Sharma. All safe.'
    }));
    setSosHistoryList(prev => [activeSosIncident, ...prev]);
    alert(`SOS SIREN RESET ✓\nEmergency alarm cleared. Resident verified safe.`);
  };

  const insideCount = visitorRegister.filter(v => v.status === 'Inside').length;
  const awaitingParcelsCount = deliveryParcels.filter(p => p.status === 'Awaiting Pickup').length;
  const staffInsideCount = staffList.filter(s => s.status === 'Inside Society').length;
  const unclaimedLfCount = lostFoundList.filter(i => i.status === 'Unclaimed In Custody').length;
  const scannedPatrolCount = patrolPoints.filter(p => p.scanned).length;

  const navMenuItems = [
    { id: 'dashboard', label: 'Security Command Dashboard', icon: LayoutDashboard },
    { id: 'visitors', label: 'Check-In / Out Visitors', icon: ShieldCheck, badge: `${insideCount} Inside`, badgeColor: 'bg-emerald-100 text-emerald-800 font-bold' },
    { id: 'residents', label: 'Resident Directory & KYC', icon: Users, badge: 'Verified ✓', badgeColor: 'bg-indigo-100 text-indigo-800 font-bold' },
    { id: 'parcels', label: 'Gate Shelf Parcel Lockers', icon: Package, badge: `${awaitingParcelsCount} Awaiting`, badgeColor: 'bg-amber-100 text-amber-900 font-bold' },
    { id: 'anpr', label: 'ANPR AI Plate & Parking', icon: Car, badge: `${parkingViolationsList.length} Flagged`, badgeColor: 'bg-rose-100 text-rose-800 font-bold' },
    { id: 'staff', label: 'Daily Staff & Attendance', icon: Users, badge: `${staffInsideCount} Active`, badgeColor: 'bg-blue-100 text-blue-800 font-bold' },
    { id: 'sos', label: 'Emergency SOS Alarm Console', icon: Flame, badge: sosActiveSiren ? '🚨 SIREN ACTIVE' : undefined, badgeColor: 'bg-red-600 text-white animate-pulse' },
    { id: 'incidents', label: 'Incident Occurrence Book', icon: FileText },
    { id: 'patrol', label: 'Guard QR Patrol Checkpoints', icon: MapPin, badge: `${scannedPatrolCount}/5 Done`, badgeColor: 'bg-slate-100 text-slate-700' },
    { id: 'lostfound', label: 'Lost & Found Register', icon: Search, badge: `${unclaimedLfCount} In Locker`, badgeColor: 'bg-amber-100 text-amber-900 font-bold' },
    { id: 'analytics', label: 'Gate Traffic & Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans antialiased flex flex-col selection:bg-[#0F172A] selection:text-white">
      
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* TOP DESKTOP & MOBILE HEADER BAR */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-10 py-3.5 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Brand & Gate Station Identifier */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-900 p-0.5 shadow-sm flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                <span>👮</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight">Gate 1 Desk</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full font-bold">Shift: 8AM-8PM</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium truncate max-w-[160px] sm:max-w-none">
                ASBL Springs • <span className="text-emerald-700 font-bold">Guard Vikram Singh</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Live Hardware Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Camera Feed Indicator */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
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
              className={`hidden sm:flex px-3.5 py-2 rounded-2xl border text-xs font-bold items-center gap-1.5 cursor-pointer transition-all ${
                isOffline ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              {isOffline ? <WifiOff className="w-4 h-4 text-amber-700" /> : <Wifi className="w-4 h-4 text-emerald-600" />}
              <span>{isOffline ? `Offline (${offlineQueue})` : 'Cloud Synced'}</span>
            </button>

            {/* Validate OTP Passcode Button */}
            <button
              onClick={() => {
                setOtpValidationResult(null);
                setOtpToValidate('');
                setShowOtpValidateModal(true);
              }}
              className="hidden sm:flex px-4 py-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 font-bold text-xs items-center gap-1.5 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-indigo-600" />
              <span>Verify Code</span>
            </button>

            {/* SOS Trigger */}
            <button
              onClick={() => {
                setActiveSection('sos');
                setSosActiveSiren(true);
              }}
              className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-[#FEE2E2] hover:bg-[#FECACA] text-[#DC2626] border border-[#FCA5A5]/80 flex items-center gap-1.5 sm:gap-2 text-xs font-black shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-[#DC2626] animate-pulse" />
              <span className="hidden sm:inline">🚨 SECURITY SOS</span>
              <span className="sm:hidden font-black">SOS</span>
            </button>

            {/* Mobile Hamburger Drawer Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Toggle Security Menu"
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

        {/* Mobile Collapsible Security Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-200 max-h-[75vh] overflow-y-auto space-y-2 animate-fade-in pb-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2">
              Security Gate Workspaces
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navMenuItems.map(item => {
                const TabIcon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id as SecurityNavSection);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      isActive ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <TabIcon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${item.badgeColor || 'bg-slate-200 text-slate-800'}`}>
                        {item.badge}
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
              <span>Exit Security Desk to Gateway</span>
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
                setActiveSection('residents');
              }}
              className="w-full p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl flex items-center justify-center gap-2 border border-slate-200 transition-transform active:scale-95 cursor-pointer"
            >
              <Search className="w-4 h-4 text-indigo-600" />
              <span>Verify Resident Flat</span>
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
          {/* 1. UPGRADED: SECURITY COMMAND DASHBOARD */}
          {/* ========================================================================= */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Top Hero Gate Command Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-inner shrink-0">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-black text-2xl text-white">Security Command & Gate Operations</h2>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        Gate 1 Boom Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">Real-time visitor processing, ANPR neural plate OCR, parcel shelves, and emergency dispatch</p>
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
                    <span>+ Visitor Check-In</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection('parcels');
                      setParcelSubTab('log');
                    }}
                    className="px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl text-xs shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-indigo-600" />
                    <span>Store Parcel</span>
                  </button>
                </div>
              </div>

              {/* 6 Real-Time Telemetry Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                
                {/* 1. Visitors */}
                <div 
                  onClick={() => setActiveSection('visitors')}
                  className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all cursor-pointer space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-medium text-slate-500">Visitors Inside</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <UserCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">{insideCount} People</div>
                  <div className="text-[10px] text-emerald-600 font-bold">1 Delivery • 1 Guest</div>
                </div>

                {/* 2. Parcels */}
                <div 
                  onClick={() => setActiveSection('parcels')}
                  className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all cursor-pointer space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-medium text-slate-500">Gate Shelf Parcels</span>
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">{awaitingParcelsCount} Awaiting</div>
                  <div className="text-[10px] text-indigo-600 font-bold">1 Cold Locker</div>
                </div>

                {/* 3. Flagged Vehicles */}
                <div 
                  onClick={() => setActiveSection('anpr')}
                  className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all cursor-pointer space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-medium text-slate-500">Parking Citations</span>
                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                      <Car className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-rose-600">{parkingViolationsList.length} Flagged</div>
                  <div className="text-[10px] text-rose-600 font-bold">Ramp Blockage Alert</div>
                </div>

                {/* 4. Daily Staff */}
                <div 
                  onClick={() => setActiveSection('staff')}
                  className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all cursor-pointer space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-medium text-slate-500">Staff on Duty</span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">{staffInsideCount} Staff</div>
                  <div className="text-[10px] text-blue-600 font-bold">Aadhaar Verified</div>
                </div>

                {/* 5. Patrol */}
                <div 
                  onClick={() => setActiveSection('patrol')}
                  className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all cursor-pointer space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-medium text-slate-500">Patrol Status</span>
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">{scannedPatrolCount}/5 Done</div>
                  <div className="text-[10px] text-purple-600 font-bold">Shift on Schedule</div>
                </div>

                {/* 6. Lost & Found */}
                <div 
                  onClick={() => setActiveSection('lostfound')}
                  className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all cursor-pointer space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-medium text-slate-500">Lost & Found</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Search className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-amber-800">{unclaimedLfCount} In Locker</div>
                  <div className="text-[10px] text-amber-700 font-bold">Smart Key & AirPods</div>
                </div>

              </div>

              {/* Interactive Barrier Control Strip & Live ANPR Stream Card */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Gate 1 Barrier Controls */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-extrabold text-sm text-slate-900 block">Gate 1 Main Boom Barrier</span>
                      <span className="text-xs text-slate-500">Hardware Actuator Controller</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      barrierState === 'RAISED' ? 'bg-emerald-100 text-emerald-800 animate-pulse' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {barrierState === 'RAISED' ? 'BARRIER OPEN' : 'BARRIER DOWN'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => {
                        setBarrierState('RAISED');
                        alert('GATE 1 BOOM BARRIER RAISED (OPEN) ✓');
                      }}
                      className={`p-4 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        barrierState === 'RAISED' ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                      }`}
                    >
                      <ArrowUp className="w-5 h-5" />
                      <span>Raise Barrier</span>
                    </button>

                    <button
                      onClick={() => {
                        setBarrierState('LOWERED');
                        alert('GATE 1 BOOM BARRIER LOWERED (CLOSED) ✓');
                      }}
                      className={`p-4 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        barrierState === 'LOWERED' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      <ArrowDown className="w-5 h-5" />
                      <span>Lower Barrier</span>
                    </button>
                  </div>
                </div>

                {/* Live ANPR Camera Stream Mini */}
                <div className="lg:col-span-2 bg-slate-900 text-white p-6 rounded-3xl shadow-md flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="font-bold text-xs uppercase tracking-widest text-emerald-400">Live ANPR OCR Camera Feed</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">CAM 1 • Entry Lane</span>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Latest Plate Captured</span>
                      <span className="font-mono font-black text-xl text-white tracking-widest">KA-03-MB-4921</span>
                      <div className="text-[11px] text-emerald-400 mt-0.5">Whitelisted Resident • Flat B-108 (Ananya Sharma)</div>
                    </div>

                    <button
                      onClick={() => setActiveSection('anpr')}
                      className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs cursor-pointer"
                    >
                      Open Full ANPR Scanner →
                    </button>
                  </div>
                </div>

              </div>

              {/* Today's Active Gate Activity Log */}
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
          {/* 2. VISITOR CHECK-IN & CHECK-OUT WORKSPACE */}
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

              {/* SUB-TAB 1: LIVE IN-CAMPUS VISITORS LEDGER */}
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

              {/* SUB-TAB 2: NEW ENTRY CHECK-IN FORM */}
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
                        </select>
                      </div>

                      <div className="p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-2xl space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-900">{fullResidentDatabase[vFlat]?.owner}</span>
                          <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded">Resident Info</span>
                        </div>
                        <div className="text-[11px] text-slate-600">{fullResidentDatabase[vFlat]?.phone} • {fullResidentDatabase[vFlat]?.tower}</div>
                        <div className="text-[10px] font-bold text-emerald-700 mt-1">{fullResidentDatabase[vFlat]?.autoApproveRules[0]}</div>
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

              {/* SUB-TAB 3: FAST EXIT / CHECK-OUT SCANNER */}
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

              {/* SUB-TAB 4: PRE-APPROVED FAST PASS SCANNER */}
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
          {/* 3. RESIDENT DIRECTORY & KYC VERIFICATION */}
          {/* ========================================================================= */}
          {activeSection === 'residents' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Top Banner */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Resident Directory & KYC Verification</h2>
                    <p className="text-xs text-slate-500 mt-1">Instant resident identity check, vehicle FastTag whitelist, registered helpers, and intercom dialer</p>
                  </div>
                </div>

                {/* Tower Filter Buttons */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-bold gap-1">
                  {(['ALL', 'Tower A', 'Tower B', 'Tower C'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedTowerFilter(t)}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                        selectedTowerFilter === t ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resident Search Bar */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Enter Flat No (e.g. Flat B-108, Flat A-402) or Owner Name..."
                      value={residentSearchQuery}
                      onChange={(e) => setResidentSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-bold">Quick Select:</span>
                  {Object.keys(fullResidentDatabase).map(f => (
                    <button
                      key={f}
                      onClick={() => setResidentSearchQuery(f)}
                      className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                        residentSearchQuery === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {f} ({fullResidentDatabase[f].owner})
                    </button>
                  ))}
                </div>
              </div>

              {/* Comprehensive Resident Dossier Card */}
              {selectedDossier && (
                <div className="space-y-6">
                  
                  {/* Hero Dossier Header */}
                  <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 shrink-0 flex items-center justify-center">
                        <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-4xl">
                          👩‍💼
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-black text-2xl text-white">{selectedDossier.owner}</h3>
                          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <BadgeCheck className="w-3.5 h-3.5" /> Aadhaar Verified
                          </span>
                        </div>
                        <div className="text-xs text-slate-300 mt-1">
                          {selectedDossier.flat} • {selectedDossier.tower} ({selectedDossier.floor}) • {selectedDossier.unitType}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          KYC ID: {selectedDossier.aadhaarKyc} • Possession: {selectedDossier.possessionDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 self-end sm:self-center">
                      <button
                        onClick={() => alert(`Ringing intercom ${selectedDossier.intercom} for ${selectedDossier.owner}...`)}
                        className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <Phone className="w-4 h-4 fill-slate-950" />
                        <span>Ring Intercom ({selectedDossier.intercom})</span>
                      </button>

                      <button
                        onClick={() => alert(`Dialing mobile ${selectedDossier.phone}...`)}
                        className="px-4 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <Phone className="w-4 h-4 text-indigo-600" />
                        <span>Call Mobile</span>
                      </button>
                    </div>
                  </div>

                  {/* 3-Column Grid: Family Members + Vehicles + Helpers */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Family Members */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <span className="font-extrabold text-sm text-slate-900 block">Registered Family Members</span>
                        <span className="text-xs text-indigo-600 font-bold">{selectedDossier.familyMembers.length + 1} Total</span>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-200">
                          <div className="font-bold text-slate-900">{selectedDossier.owner}</div>
                          <div className="text-[11px] text-slate-500">Primary Registered Owner • {selectedDossier.phone}</div>
                        </div>

                        {selectedDossier.familyMembers.map((m, idx) => (
                          <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                            <div className="font-bold text-slate-900">{m.name}</div>
                            <div className="text-[11px] text-slate-500">{m.relation} {m.phone ? `• ${m.phone}` : ''}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Registered Vehicles */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <span className="font-extrabold text-sm text-slate-900 block">Allocated Parking & FastTag</span>
                        <span className="text-xs text-emerald-600 font-bold">{selectedDossier.vehicles.length} Vehicles</span>
                      </div>

                      <div className="space-y-3 text-xs">
                        {selectedDossier.vehicles.map((v, idx) => (
                          <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                            <div className="flex justify-between items-start">
                              <span className="font-mono font-black text-sm text-slate-900">{v.plate}</span>
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Active</span>
                            </div>
                            <div className="text-[11px] text-slate-600">{v.model}</div>
                            <div className="text-[11px] text-indigo-700 font-bold">{v.slot}</div>
                            <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-200/60">RFID: {v.rfid}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Authorized Helpers */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <span className="font-extrabold text-sm text-slate-900 block">Authorized Daily Helpers</span>
                        <span className="text-xs text-slate-500 font-bold">{selectedDossier.helpers.length} Helpers</span>
                      </div>

                      <div className="space-y-3 text-xs">
                        {selectedDossier.helpers.map((h, idx) => (
                          <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                            <div className="flex justify-between items-start">
                              <span className="font-bold text-slate-900">{h.name}</span>
                              <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold">{h.role}</span>
                            </div>
                            <div className="text-[11px] text-slate-500">{h.time} • {h.phone}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Security & Gate Auto-Approval Rules Strip */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                    <span className="font-extrabold text-sm text-slate-900 block">Resident Gate Auto-Approval Rules</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {selectedDossier.autoApproveRules.map((rule, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-emerald-950 font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. EMERGENCY SOS & PANIC ALARM CONSOLE */}
          {/* ========================================================================= */}
          {activeSection === 'sos' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Pulsing Active Emergency Siren Hero Banner */}
              {sosActiveSiren ? (
                <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-8 rounded-3xl shadow-2xl space-y-6 border-4 border-red-300 relative overflow-hidden animate-pulse">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 rounded-3xl bg-white text-red-600 flex items-center justify-center text-4xl shadow-xl shrink-0 animate-bounce">
                        <Flame className="w-12 h-12" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="bg-black text-amber-300 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest animate-ping">
                            🚨 CRITICAL EMERGENCY PANIC SIREN ACTIVE
                          </span>
                          <span className="text-xs font-mono font-bold text-white">{activeSosIncident.triggerTime}</span>
                        </div>
                        <h2 className="font-black text-3xl text-white tracking-tight mt-1">
                          {activeSosIncident.flat} ({activeSosIncident.resident}) • {activeSosIncident.tower}
                        </h2>
                        <p className="text-xs text-white/90 font-bold mt-1">
                          {activeSosIncident.notes}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 self-end sm:self-center">
                      <button
                        onClick={handleDispatchPatrolToSos}
                        className="px-6 py-4 bg-white hover:bg-slate-100 text-red-950 font-black rounded-2xl text-xs shadow-2xl flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                      >
                        <ShieldAlert className="w-5 h-5 text-red-600" />
                        <span>DISPATCH PATROL TO FLAT B-108</span>
                      </button>

                      <button
                        onClick={handleResetSosSiren}
                        className="px-5 py-4 bg-red-950 hover:bg-red-900 text-white font-bold rounded-2xl text-xs shadow-lg transition-transform active:scale-95 cursor-pointer"
                      >
                        Reset & Clear Siren
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-red-400/60 flex flex-wrap justify-between items-center text-xs text-white/90">
                    <span>Officer Dispatched: <strong>{activeSosIncident.dispatchedOfficer}</strong></span>
                    <span>Response Timer: <strong>{activeSosIncident.responseTime}</strong></span>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="font-black text-2xl text-slate-900">Emergency SOS Command & Dispatch</h2>
                      <p className="text-xs text-slate-500 mt-1">All gate posts and towers normal. No active panic sirens in society.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSosActiveSiren(true)}
                    className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-2xl shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <Flame className="w-4 h-4" />
                    <span>Test Emergency Siren</span>
                  </button>
                </div>
              )}

              {/* Emergency Speed-Dial Hotlines */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-extrabold text-base text-slate-900 block">24/7 External Emergency Hotlines</span>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                  {[
                    { label: '🚑 Ambulance', phone: '108 / 112', bg: 'bg-red-50 text-red-900 border-red-200' },
                    { label: '🚒 Fire Service', phone: '101', bg: 'bg-orange-50 text-orange-900 border-orange-200' },
                    { label: '👮 Police Station', phone: '100 / 040-27891100', bg: 'bg-blue-50 text-blue-900 border-blue-200' },
                    { label: '🏥 Hospital ER', phone: '040-44556677', bg: 'bg-indigo-50 text-indigo-900 border-indigo-200' },
                    { label: '⚡ 33kV Substation', phone: '98123 44556', bg: 'bg-amber-50 text-amber-900 border-amber-200' },
                    { label: '🚰 Water Valve', phone: '98765 99887', bg: 'bg-cyan-50 text-cyan-900 border-cyan-200' },
                  ].map((hotline, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border flex flex-col justify-between space-y-2 ${hotline.bg}`}>
                      <span className="font-bold text-xs">{hotline.label}</span>
                      <span className="font-mono font-black text-sm">{hotline.phone}</span>
                      <button
                        onClick={() => alert(`Dialing ${hotline.label} (${hotline.phone})...`)}
                        className="py-1.5 bg-white/80 hover:bg-white text-slate-900 font-bold rounded-xl text-[10px] text-center shadow-xs cursor-pointer"
                      >
                        Speed Dial
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Historical Emergency SOS Incident Ledger */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-extrabold text-base text-slate-900 block">Emergency Panic Incident History & Audit Logs</span>
                
                <div className="space-y-3 text-xs">
                  {sosHistoryList.map(sos => (
                    <div key={sos.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-slate-500">{sos.id}</span>
                          <span className="font-bold text-sm text-slate-900">{sos.flat} ({sos.resident})</span>
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                            {sos.status}
                          </span>
                        </div>
                        <span className="text-slate-400 font-mono">{sos.triggerTime}</span>
                      </div>
                      <p className="text-slate-600">{sos.notes}</p>
                      <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 flex justify-between">
                        <span>Officer: <strong>{sos.dispatchedOfficer}</strong></span>
                        <span className="text-indigo-600 font-bold">{sos.responseTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. GATE SHELF PARCEL LOCKERS */}
          {/* ========================================================================= */}
          {activeSection === 'parcels' && (
            <div className="space-y-6">
              
              {/* Top Hero Banner */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Package className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Delivery & Parcel Locker Management</h2>
                    <p className="text-xs text-slate-500 mt-1">Smart gate locker shelf storage, cold storage for dairy/groceries, and OTP pickup authentication</p>
                  </div>
                </div>

                {/* Sub-Tabs */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-bold gap-1 self-stretch sm:self-center">
                  <button
                    onClick={() => setParcelSubTab('inventory')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      parcelSubTab === 'inventory' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📦 Shelf Inventory ({awaitingParcelsCount})
                  </button>

                  <button
                    onClick={() => setParcelSubTab('log')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      parcelSubTab === 'log' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    ➕ Store Inbound Parcel
                  </button>

                  <button
                    onClick={() => setParcelSubTab('verify')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      parcelSubTab === 'verify' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🔑 Handover OTP Verify
                  </button>

                  <button
                    onClick={() => setParcelSubTab('history')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      parcelSubTab === 'history' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📜 History Log
                  </button>
                </div>
              </div>

              {/* 4 Metric Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Awaiting Pickup</span>
                  <span className="text-2xl font-black text-slate-900">{awaitingParcelsCount} Parcels</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Cold Storage Lockers</span>
                  <span className="text-2xl font-black text-cyan-600">1 Occupied (4 Total)</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Today's Inbound Deliveries</span>
                  <span className="text-2xl font-black text-slate-900">14 Received</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Average Dwell Time</span>
                  <span className="text-2xl font-black text-indigo-600">1.4 Hours</span>
                </div>
              </div>

              {/* SUB-TAB 1: SHELF INVENTORY & VISUAL LOCKER RACK */}
              {parcelSubTab === 'inventory' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Visual Shelf Rack Matrix */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                    <span className="font-extrabold text-base text-slate-900 block">Gate Shelf Locker Rack Matrix</span>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
                      {shelfRacks.map(shelf => (
                        <div
                          key={shelf.id}
                          className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                            shelf.status === 'Occupied'
                              ? shelf.tower === 'Refrigerated' ? 'bg-cyan-50 border-cyan-300 text-cyan-950' : 'bg-amber-50 border-amber-300 text-amber-950 shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-xs">{shelf.id}</span>
                              {shelf.tower === 'Refrigerated' && <Snowflake className="w-3.5 h-3.5 text-cyan-600" />}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{shelf.tower}</div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-200/60">
                            {shelf.status === 'Occupied' ? (
                              <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded block text-center">
                                {shelf.flat}
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-slate-400 block text-center">
                                Empty
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Shelf Packages Table */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900">Active Gate Shelf Packages ({awaitingParcelsCount})</h3>
                        <p className="text-xs text-slate-500">Packages stored awaiting resident pickup with OTP authentication</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {deliveryParcels.filter(p => p.status === 'Awaiting Pickup').map(p => (
                        <div key={p.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-black text-base text-slate-900">{p.courier} ({p.orderNo})</div>
                              <div className="text-xs text-slate-500 mt-0.5">Target: <strong className="text-indigo-600 font-bold">{p.flat} ({p.residentName})</strong></div>
                              <div className="text-[11px] text-slate-400 font-mono">Mobile: {p.recipientPhone}</div>
                            </div>
                            <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-bold text-[10px]">
                              {p.dwell}
                            </span>
                          </div>

                          <div className="p-3 bg-white rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Shelf</span>
                              <span className="font-bold text-slate-900">{p.shelf}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-slate-400 uppercase font-bold block">Pickup Passcode</span>
                              <span className="font-mono font-black text-sm text-indigo-600">OTP {p.pickupOtp}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleVerifyParcelPickup(p.id)}
                              className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                            >
                              Verify Handover
                            </button>
                            <button
                              onClick={() => alert(`Resent Pickup Passcode OTP ${p.pickupOtp} via SMS to ${p.recipientPhone}!`)}
                              className="p-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl cursor-pointer"
                              title="Resend SMS"
                            >
                              <PhoneCall className="w-4 h-4 text-indigo-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* SUB-TAB 2: STORE INBOUND PARCEL FORM */}
              {parcelSubTab === 'log' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-black text-lg text-slate-900">Store Inbound Parcel at Gate Shelf</h3>
                      <p className="text-xs text-slate-500">Record package details, assign locker shelf, and auto-dispatch OTP passcode to resident</p>
                    </div>
                  </div>

                  <form onSubmit={handleLogParcel} className="space-y-6 text-xs">
                    
                    <div className="space-y-2">
                      <label className="font-bold text-slate-700 block">1. Select Courier Service Provider:</label>
                      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                        {['Amazon Courier', 'Flipkart Logistics', 'Blinkit Instant', 'Swiggy InstaMart', 'Zomato Food', 'BlueDart Express'].map(cr => (
                          <button
                            type="button"
                            key={cr}
                            onClick={() => setDelCompany(cr)}
                            className={`p-3 rounded-xl border font-bold text-center cursor-pointer transition-all ${
                              delCompany === cr ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {cr}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">2. Target Destination Flat</label>
                        <select
                          value={delFlat}
                          onChange={(e) => setDelFlat(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold focus:outline-none"
                        >
                          <option value="Flat B-108">Flat B-108 (Ananya Sharma - Tower B)</option>
                          <option value="Flat A-402">Flat A-402 (Rajesh Mehta - Tower A)</option>
                          <option value="Flat C-301">Flat C-301 (Suresh Menon - Tower C)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">3. Tracking / Order Number</label>
                        <input
                          type="text"
                          required
                          value={delOrderNo}
                          onChange={(e) => setDelOrderNo(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono font-medium focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">4. Locker Shelf Slot Assignment</label>
                        <select
                          value={delShelf}
                          onChange={(e) => setDelShelf(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold focus:outline-none"
                        >
                          <option value="Shelf B-4">Shelf B-4 (Tower B Rack)</option>
                          <option value="Shelf B-1">Shelf B-1</option>
                          <option value="Shelf B-2">Shelf B-2</option>
                          <option value="Shelf A-1">Shelf A-1 (Tower A Rack)</option>
                          <option value="Cold Storage Locker #02">Cold Storage Locker #02 (Refrigerated)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">5. Package Category</label>
                        <select
                          value={delCategory}
                          onChange={(e) => setDelCategory(e.target.value as any)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none"
                        >
                          <option value="Standard Parcel">Standard E-Commerce Parcel</option>
                          <option value="Cold Storage (Dairy/Food)">Cold Storage (Dairy, Milk, Ice Cream)</option>
                          <option value="Fragile Box">Fragile Electronics Box</option>
                          <option value="Document">Important Legal Document</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Package className="w-4 h-4" />
                      <span>Assign Shelf & Dispatch Resident Pickup Passcode</span>
                    </button>
                  </form>
                </div>
              )}

              {/* SUB-TAB 3: HANDOVER OTP VERIFICATION */}
              {parcelSubTab === 'verify' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
                  <div>
                    <h3 className="font-black text-lg text-slate-900">Verify Resident Pickup OTP & Release Package</h3>
                    <p className="text-xs text-slate-500">Ask the resident for their 4-digit pickup passcode to release the stored package</p>
                  </div>

                  <form onSubmit={handleVerifyParcelWithOtp} className="space-y-4 max-w-md">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1 text-xs">Enter 4-Digit Pickup Passcode:</label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        placeholder="e.g. 4091 or 8821"
                        value={parcelVerifyOtp}
                        onChange={(e) => setParcelVerifyOtp(e.target.value)}
                        className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-center text-3xl font-black tracking-widest focus:outline-none focus:border-slate-900"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-lg cursor-pointer"
                    >
                      Authenticate & Release Parcel
                    </button>
                  </form>

                  {parcelVerifyResult && (
                    <div className={`p-5 rounded-2xl border text-xs font-bold ${
                      parcelVerifyResult.includes('MATCH SUCCESS') ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-red-50 border-red-300 text-red-900'
                    }`}>
                      {parcelVerifyResult}
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TAB 4: HANDOVER HISTORY & AUDIT LOG */}
              {parcelSubTab === 'history' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 animate-fade-in">
                  <span className="font-extrabold text-base text-slate-900 block">Delivered Parcels & Handover Audit History</span>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold">
                          <th className="py-3">Courier & Tracking</th>
                          <th className="py-3">Flat & Resident</th>
                          <th className="py-3">Shelf</th>
                          <th className="py-3">Stored Time</th>
                          <th className="py-3">Collected Time</th>
                          <th className="py-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {deliveryParcels.map(p => (
                          <tr key={p.id} className="hover:bg-slate-50">
                            <td className="py-3.5 font-bold text-slate-900">
                              <div>{p.courier}</div>
                              <div className="text-[11px] text-slate-400 font-mono">{p.orderNo}</div>
                            </td>
                            <td className="py-3.5 font-bold text-indigo-600">{p.flat} ({p.residentName})</td>
                            <td className="py-3.5 font-medium text-slate-700">{p.shelf}</td>
                            <td className="py-3.5 text-slate-500">{p.loggedTime}</td>
                            <td className="py-3.5 text-slate-600">{p.collectedTime || '--'}</td>
                            <td className="py-3.5 text-right">
                              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                                p.status === 'Picked Up' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                              }`}>
                                {p.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* 6. VEHICLE, ANPR & PARKING MANAGEMENT */}
          {/* ========================================================================= */}
          {activeSection === 'anpr' && (
            <div className="space-y-6">
              
              {/* Top Hero Banner */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Car className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Vehicle & ANPR AI Management</h2>
                    <p className="text-xs text-slate-500 mt-1">Automatic number plate recognition, FastTag RFID whitelisting, and parking violation citations</p>
                  </div>
                </div>

                {/* Sub-Tabs */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-bold gap-1 self-stretch sm:self-center">
                  <button
                    onClick={() => setAnprSubTab('scanner')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      anprSubTab === 'scanner' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📹 AI OCR Scanner
                  </button>

                  <button
                    onClick={() => setAnprSubTab('directory')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      anprSubTab === 'directory' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📑 Resident Whitelist ({residentVehiclesList.length})
                  </button>

                  <button
                    onClick={() => setAnprSubTab('violations')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      anprSubTab === 'violations' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🚨 Violations ({parkingViolationsList.length})
                  </button>

                  <button
                    onClick={() => setAnprSubTab('bays')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      anprSubTab === 'bays' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🅿️ Visitor Bays (V-01..V-08)
                  </button>
                </div>
              </div>

              {/* SUB-TAB 1: LIVE ANPR CAMERA SCANNER */}
              {anprSubTab === 'scanner' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Camera AI Stream Box */}
                  <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                        <span className="font-bold text-xs uppercase tracking-widest text-emerald-400">ANPR AI Camera 1 • Gate 1 Main Barrier</span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">1080p 60FPS • Neural OCR v4.2</span>
                    </div>

                    {/* Camera Viewport Simulation */}
                    <div className="h-44 bg-slate-950 rounded-2xl border border-slate-800 relative flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />
                      
                      {/* OCR Bounding Box */}
                      <div className="border-2 border-emerald-400 px-6 py-3 rounded-xl bg-emerald-950/40 text-center relative z-10 animate-pulse">
                        <span className="text-[10px] text-emerald-400 uppercase font-bold block">Vehicle Plate Detected</span>
                        <span className="font-mono font-black text-2xl text-white tracking-widest">{plateQuery}</span>
                      </div>
                    </div>

                    {/* Plate Lookup Form */}
                    <form onSubmit={handlePlateSearch} className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Enter Plate Number (e.g. KA-03-MB-4921, KA-05-MA-1234)..."
                        value={plateQuery}
                        onChange={(e) => setPlateQuery(e.target.value)}
                        className="flex-1 p-3.5 bg-slate-800 rounded-2xl border border-slate-700 text-white text-xs font-mono font-bold uppercase focus:outline-none focus:border-indigo-400"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs cursor-pointer shadow-lg"
                      >
                        Simulate AI Scan
                      </button>
                    </form>
                  </div>

                  {/* Recognition Result Card */}
                  {simulatedScanResult && (
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5 animate-fade-in">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-black text-3xl text-slate-900 tracking-wider">{simulatedScanResult.plate}</span>
                            <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                              simulatedScanResult.status === 'Whitelisted Resident' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                            }`}>
                              {simulatedScanResult.status}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1">Confidence Score: <strong className="text-emerald-600">{simulatedScanResult.confidence}</strong></div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Barrier Action</span>
                          <span className="font-bold text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block mt-1">
                            {simulatedScanResult.barrierAction}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Registered Owner</span>
                          <span className="font-bold text-slate-900">{simulatedScanResult.owner} ({simulatedScanResult.flat})</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Allocated Slot</span>
                          <span className="font-bold text-slate-900">{simulatedScanResult.slot}</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">FastTag RFID Tag ID</span>
                          <span className="font-mono font-bold text-indigo-600">{simulatedScanResult.rfidTag}</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* SUB-TAB 2: RESIDENT VEHICLES DIRECTORY */}
              {anprSubTab === 'directory' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5 animate-fade-in">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">Resident Registered Vehicles & FastTag Whitelist</h3>
                      <p className="text-xs text-slate-500">Authorized resident vehicles with automated ANPR gate barrier access</p>
                    </div>

                    <div className="w-full sm:w-72 relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search plate, owner, flat, slot..."
                        value={vehicleSearchQuery}
                        onChange={(e) => setVehicleSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold">
                          <th className="py-3">License Plate</th>
                          <th className="py-3">Vehicle Details</th>
                          <th className="py-3">Owner & Unit</th>
                          <th className="py-3">Parking Slot</th>
                          <th className="py-3">FastTag RFID</th>
                          <th className="py-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {residentVehiclesList
                          .filter(v => v.plate.toLowerCase().includes(vehicleSearchQuery.toLowerCase()) || v.owner.toLowerCase().includes(vehicleSearchQuery.toLowerCase()) || v.flat.toLowerCase().includes(vehicleSearchQuery.toLowerCase()))
                          .map(v => (
                            <tr key={v.id} className="hover:bg-slate-50">
                              <td className="py-3.5 font-mono font-black text-slate-900">{v.plate}</td>
                              <td className="py-3.5 text-slate-700">{v.model} ({v.color})</td>
                              <td className="py-3.5 font-bold text-indigo-600">{v.owner} • {v.flat}</td>
                              <td className="py-3.5 font-bold text-slate-900">{v.slot}</td>
                              <td className="py-3.5 font-mono text-slate-500">{v.rfidTag}</td>
                              <td className="py-3.5 text-right">
                                <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                                  {v.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: PARKING VIOLATIONS & CITATIONS */}
              {anprSubTab === 'violations' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5 animate-fade-in">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">Active Parking Violations & Citations ({parkingViolationsList.length})</h3>
                      <p className="text-xs text-slate-500">Track unauthorized parking, ramp blockages, and overstay violations</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {parkingViolationsList.map(vio => (
                      <div key={vio.id} className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-base text-slate-900">{vio.plate}</span>
                            <span className="font-bold text-xs text-slate-700">({vio.vehicleModel})</span>
                            <span className="bg-rose-200 text-rose-900 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                              {vio.severity}
                            </span>
                          </div>
                          <div className="text-xs text-slate-700 mt-1">
                            Location: <strong>{vio.location}</strong> • Violation: <strong className="text-rose-800">{vio.violation}</strong>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Reported at {vio.time} • Associated: <strong>{vio.flat}</strong>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Penalty Fine</span>
                            <span className="font-bold text-sm text-slate-900">{vio.fineAmount}</span>
                          </div>

                          <button
                            onClick={() => alert(`Citation notification dispatched to ${vio.flat} on resident app!`)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                          >
                            Send Resident Alert
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: VISITOR PARKING BAY ALLOCATION TRACKER */}
              {anprSubTab === 'bays' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5 animate-fade-in">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">Visitor Parking Bay Real-Time Allocation (Bays V-01 to V-08)</h3>
                    <p className="text-xs text-slate-500">Track parking occupancy and overstay dwell timers for guest vehicles</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {visitorBays.map(bay => (
                      <div
                        key={bay.id}
                        className={`p-5 rounded-3xl border flex flex-col justify-between space-y-3 transition-all ${
                          bay.status === 'Overstay'
                            ? 'bg-rose-50 border-rose-300 shadow-sm'
                            : bay.status === 'Occupied'
                            ? 'bg-indigo-50/60 border-indigo-200 shadow-xs'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-black text-lg text-slate-900">{bay.id}</span>
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            bay.status === 'Overstay'
                              ? 'bg-rose-600 text-white animate-pulse'
                              : bay.status === 'Occupied'
                              ? 'bg-indigo-100 text-indigo-900'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {bay.status}
                          </span>
                        </div>

                        {bay.status !== 'Available' ? (
                          <div className="text-xs space-y-1">
                            <div className="font-mono font-bold text-slate-900">{bay.plate}</div>
                            <div className="text-slate-600 text-[11px]">{bay.visitor} • {bay.flat}</div>
                            <div className="text-indigo-600 font-bold text-[10px]">Dwell: {bay.dwell}</div>
                          </div>
                        ) : (
                          <div className="text-xs text-slate-400 py-2">
                            Available for Inbound Visitor
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* 7. DAILY STAFF ATTENDANCE */}
          {/* ========================================================================= */}
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
          {/* 8. INCIDENT OCCURRENCE BOOK */}
          {/* ========================================================================= */}
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
          {/* 9. GUARD QR PATROL CHECKPOINTS */}
          {/* ========================================================================= */}
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
          {/* 10. UPGRADED: LOST & FOUND PROPERTY REGISTER */}
          {/* ========================================================================= */}
          {activeSection === 'lostfound' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Top Hero Banner */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Search className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Lost & Found Property Register</h2>
                    <p className="text-xs text-slate-500 mt-1">Log found society items, secure in security locker custody, and verify resident handover</p>
                  </div>
                </div>

                {/* Sub-Tab Selector */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-bold gap-1 self-stretch sm:self-center">
                  <button
                    onClick={() => setLostFoundSubTab('all')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      lostFoundSubTab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📋 All Items ({lostFoundList.length})
                  </button>

                  <button
                    onClick={() => setLostFoundSubTab('unclaimed')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      lostFoundSubTab === 'unclaimed' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🟡 In Locker Custody ({unclaimedLfCount})
                  </button>

                  <button
                    onClick={() => setLostFoundSubTab('claimed')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      lostFoundSubTab === 'claimed' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    ✅ Returned ({lostFoundList.length - unclaimedLfCount})
                  </button>

                  <button
                    onClick={() => setLostFoundSubTab('log')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      lostFoundSubTab === 'log' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    ➕ Log Found Property
                  </button>
                </div>
              </div>

              {/* 4 Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Total Found Logged</span>
                  <span className="text-2xl font-black text-slate-900">{lostFoundList.length} Items</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">In Security Custody</span>
                  <span className="text-2xl font-black text-amber-700">{unclaimedLfCount} Items</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Returned to Owners</span>
                  <span className="text-2xl font-black text-emerald-600">{lostFoundList.length - unclaimedLfCount} Claimed</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Avg Claim Turnaround</span>
                  <span className="text-2xl font-black text-indigo-600">18.4 Hours</span>
                </div>
              </div>

              {/* VIEW: LOG NEW FOUND PROPERTY */}
              {lostFoundSubTab === 'log' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-black text-lg text-slate-900">Log New Found Society Property</h3>
                      <p className="text-xs text-slate-500">Record found item details and assign a secure locker slot at Gate 1</p>
                    </div>
                  </div>

                  <form onSubmit={handleLogLostFoundItem} className="space-y-6 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">1. Item Description & Model</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Black Leather Wallet with Driving License"
                          value={lfTitle}
                          onChange={(e) => setLfTitle(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-medium focus:outline-none focus:border-slate-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">2. Item Category</label>
                        <select
                          value={lfCategory}
                          onChange={(e) => setLfCategory(e.target.value as any)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-bold focus:outline-none"
                        >
                          <option value="Keys & Smart Remotes">Keys & Smart Car Remotes</option>
                          <option value="Electronics">Electronics (AirPods, Smartwatch, Mobile)</option>
                          <option value="Wallets & IDs">Wallets, Cards & Passports</option>
                          <option value="Kids Toys & Bikes">Kids Bicycles & Toys</option>
                          <option value="Personal Accessories">Personal Accessories (Glasses, Bags)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">3. Location Where Found in Campus</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Swimming Pool Deck, Clubhouse Gym, Tennis Court"
                          value={lfLoc}
                          onChange={(e) => setLfLoc(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-medium focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">4. Secure Storage Locker Slot</label>
                        <select
                          value={lfLocker}
                          onChange={(e) => setLfLocker(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-bold focus:outline-none"
                        >
                          <option value="Security Locker LF-01">Security Locker LF-01 (Small Valuables)</option>
                          <option value="Security Locker LF-02">Security Locker LF-02</option>
                          <option value="Security Locker LF-03">Security Locker LF-03</option>
                          <option value="Main Gate Storage Bay">Main Gate Storage Bay (Bikes & Large Items)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Search className="w-4 h-4" />
                      <span>Log Found Item & Broadcast to Resident Notice Board</span>
                    </button>
                  </form>
                </div>
              )}

              {/* VIEW: ALL / UNCLAIMED / CLAIMED ITEMS CARDS */}
              {lostFoundSubTab !== 'log' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lostFoundList
                      .filter(item => lostFoundSubTab === 'all' || (lostFoundSubTab === 'unclaimed' ? item.status === 'Unclaimed In Custody' : item.status === 'Claimed & Returned'))
                      .map(item => (
                        <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <span className="text-[10px] font-mono font-bold text-slate-400">{item.id}</span>
                              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                                item.status === 'Unclaimed In Custody' ? 'bg-amber-100 text-amber-900 animate-pulse' : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {item.status}
                              </span>
                            </div>

                            <div>
                              <h3 className="font-extrabold text-sm text-slate-900">{item.title}</h3>
                              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold mt-1 inline-block">
                                {item.category}
                              </span>
                            </div>

                            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                              <div className="flex justify-between">
                                <span className="text-slate-400">Found At:</span>
                                <span className="font-bold text-slate-800">{item.loc}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Storage Slot:</span>
                                <span className="font-mono font-bold text-indigo-700">{item.locker}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Found Date:</span>
                                <span className="text-slate-700">{item.date}</span>
                              </div>
                              {item.claimedBy && (
                                <div className="flex justify-between pt-1 border-t border-slate-200/60 text-emerald-800 font-bold">
                                  <span>Returned To:</span>
                                  <span>{item.claimedBy} ({item.claimedFlat})</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {item.status === 'Unclaimed In Custody' ? (
                            <button
                              onClick={() => setClaimingItem(item)}
                              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                            >
                              <Key className="w-3.5 h-3.5" />
                              <span>Verify & Handover to Resident</span>
                            </button>
                          ) : (
                            <div className="text-center text-[11px] text-slate-400 font-medium py-1">
                              Handover verified on {item.claimedDate}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* 11. SECURITY ANALYTICS */}
          {/* ========================================================================= */}
          {activeSection === 'analytics' && (
            <div className="space-y-6">
              <SecurityAnalytics />
            </div>
          )}

        </main>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: LOST & FOUND CLAIM HANDOVER MODAL */}
      {/* ========================================================================= */}
      {claimingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-5 shadow-2xl relative">
            <button
              onClick={() => setClaimingItem(null)}
              className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-black text-xl text-slate-900">Verify Property Handover</h3>
              <p className="text-xs text-slate-500">Record claimant details for {claimingItem.title} ({claimingItem.id})</p>
            </div>

            <form onSubmit={handleProcessClaimHandover} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Claimant Full Name</label>
                <input
                  type="text"
                  required
                  value={claimResidentName}
                  onChange={(e) => setClaimResidentName(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Claimant Resident Flat</label>
                <select
                  value={claimResidentFlat}
                  onChange={(e) => setClaimResidentFlat(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-bold"
                >
                  <option value="Flat B-108">Flat B-108 (Ananya Sharma - Tower B)</option>
                  <option value="Flat A-402">Flat A-402 (Rajesh Mehta - Tower A)</option>
                  <option value="Flat C-301">Flat C-301 (Suresh Menon - Tower C)</option>
                  <option value="Flat B-201">Flat B-201 (Rohan Deshmukh - Tower B)</option>
                  <option value="Flat A-104">Flat A-104 (Pooja Hegde - Tower A)</option>
                </select>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-[11px] font-bold">
                ✓ Identity & Flat verified against security resident database. Custody locker will be unlocked.
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs shadow-lg cursor-pointer"
              >
                Complete Handover & Release from Locker
              </button>
            </form>
          </div>
        </div>
      )}

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
                  setSosActiveSiren(true);
                  setActiveSection('sos');
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
