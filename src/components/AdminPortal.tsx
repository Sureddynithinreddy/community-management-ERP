import React, { useState } from 'react';
import { 
  LayoutDashboard, ShieldCheck, Users, FileText, TrendingUp, UserCheck, 
  AlertTriangle, Flame, Calendar, Wrench, Megaphone, Receipt, Shield, 
  Settings, Building2, ArrowLeft, CheckCircle2, Download, Plus, Search,
  Clock, DollarSign, Check, ChevronRight, Sparkles, Filter, Phone, Mail, MapPin, Eye, Zap, ShieldAlert, X, Trash2, Send, AlertCircle, Key, Lock, QrCode, Menu, LogOut,
  BarChart3, RefreshCw, BadgeCheck, Bell, Smartphone, ArrowUpRight, CheckSquare,
  HelpCircle, CreditCard, PieChart, Activity, UserPlus, Car, Home, Layers,
  PhoneCall, ShieldQuestion, Briefcase, FileCheck, Award, Printer, FileSpreadsheet
} from 'lucide-react';
import { AnalyticsDashboard } from './AnalyticsDashboard';

interface AdminPortalProps {
  onExit: () => void;
}

export type AdminPageId = 
  | 'dashboard'
  | 'manage_guards'
  | 'manage_residents'
  | 'billing_fees'
  | 'notices'
  | 'amenity_mgmt'
  | 'maintenance_mgmt'
  | 'visitor_mgmt'
  | 'incident_mgmt'
  | 'emergency_mgmt'
  | 'staff_vendor'
  | 'view_reports'
  | 'audit_logs'
  | 'community_config'
  | 'analytics';

interface ResidentRecord {
  flat: string;
  name: string;
  phone: string;
  type: 'Owner' | 'Tenant' | 'Primary Owner';
  bhk: string;
  tower: 'Tower A' | 'Tower B' | 'Tower C';
  floor: string;
  members: number;
  vehicle: string;
  parking: string;
  dues: string;
  aadhaarKyc: string;
  email: string;
  rfidTag: string;
  helpersCount: number;
}

interface StaffCredential {
  id: string;
  name: string;
  company: string;
  role: string;
  mobile: string;
  username: string;
  passCode: string;
  gateAccess: string;
  status: 'Active Credentials' | 'Revoked / Suspended';
  aadhaar: string;
  validTill: string;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onExit }) => {
  const [activePage, setActivePage] = useState<AdminPageId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Manage Residents Sub-Tab State
  const [residentSubTab, setResidentSubTab] = useState<'directory' | 'onboard' | 'grid'>('directory');
  const [selectedTowerFilter, setSelectedTowerFilter] = useState<'ALL' | 'Tower A' | 'Tower B' | 'Tower C'>('ALL');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'ALL' | 'Owner' | 'Tenant'>('ALL');
  const [selectedDuesFilter, setSelectedDuesFilter] = useState<'ALL' | 'Due' | 'Paid'>('ALL');
  const [selectedResidentDetail, setSelectedResidentDetail] = useState<ResidentRecord | null>(null);

  // Staff & Vendor Sub-Tab State
  const [vendorSubTab, setVendorSubTab] = useState<'contracts' | 'staff_passes' | 'issue_pass'>('contracts');
  const [selectedStaffPassModal, setSelectedStaffPassModal] = useState<StaffCredential | null>(null);

  // New Resident Onboarding Form State
  const [newFlat, setNewFlat] = useState<string>('Flat B-302');
  const [newTower, setNewTower] = useState<'Tower A' | 'Tower B' | 'Tower C'>('Tower B');
  const [newFloor, setNewFloor] = useState<string>('3rd Floor');
  const [newBhk, setNewBhk] = useState<string>('2BHK (1250 sqft)');
  const [newName, setNewName] = useState<string>('');
  const [newPhone, setNewPhone] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newType, setNewType] = useState<'Owner' | 'Tenant'>('Owner');
  const [newAadhaar, setNewAadhaar] = useState<string>('XXXX-XXXX-9912');
  const [newVehicle, setNewVehicle] = useState<string>('TS-08-AB-1234');
  const [newParking, setNewParking] = useState<string>('Slot B-52');

  // --- FULL EXHAUSTIVE DATASET FOR ADMIN PORTAL ---

  // 1. Manage Guards (8 Guards)
  const [guardName, setGuardName] = useState<string>('Suresh Kumar');
  const [guardPhone, setGuardPhone] = useState<string>('98765 43210');
  const [guardStation, setGuardStation] = useState<string>('Gate 2 Rear Entry');
  const [guardShift, setGuardShift] = useState<string>('Shift B (02:00 PM - 10:00 PM)');
  const [guardsList, setGuardsList] = useState([
    { id: 'GRD-101', name: 'Vikram Singh', phone: '98123 45678', station: 'Gate 1 Main Entry', shift: 'Shift A (06:00 AM - 02:00 PM)', status: 'Active (On Shift)', rating: '4.9 ⭐', Aadhaar: 'VERIFIED ✓' },
    { id: 'GRD-102', name: 'Suresh Kumar', phone: '98765 43210', station: 'Gate 2 Rear Entry', shift: 'Shift B (02:00 PM - 10:00 PM)', status: 'Scheduled', rating: '4.8 ⭐', Aadhaar: 'VERIFIED ✓' },
    { id: 'GRD-103', name: 'Rajesh Sharma', phone: '98345 67890', station: 'Night Patrol Rover', shift: 'Shift C (10:00 PM - 06:00 AM)', status: 'Scheduled', rating: '5.0 ⭐', Aadhaar: 'VERIFIED ✓' },
    { id: 'GRD-104', name: 'Amit Verma', phone: '98901 23456', station: 'Tower B Lobby Desk', shift: 'Shift A (06:00 AM - 02:00 PM)', status: 'Active (On Shift)', rating: '4.7 ⭐', Aadhaar: 'VERIFIED ✓' },
    { id: 'GRD-105', name: 'Dinesh Patil', phone: '98234 56789', station: 'Clubhouse Guard', shift: 'Shift B (02:00 PM - 10:00 PM)', status: 'Scheduled', rating: '4.9 ⭐', Aadhaar: 'VERIFIED ✓' },
    { id: 'GRD-106', name: 'Manoj Kumar', phone: '98111 22334', station: 'Basement Parking Desk', shift: 'Shift C (10:00 PM - 06:00 AM)', status: 'Scheduled', rating: '4.8 ⭐', Aadhaar: 'VERIFIED ✓' },
    { id: 'GRD-107', name: 'Ganesh Shinde', phone: '98444 55566', station: 'Tower C Lobby Desk', shift: 'Shift A (06:00 AM - 02:00 PM)', status: 'Active (On Shift)', rating: '4.9 ⭐', Aadhaar: 'VERIFIED ✓' },
    { id: 'GRD-108', name: 'Praveen Yadav', phone: '98777 88899', station: 'Swimming Pool Gate', shift: 'Shift B (02:00 PM - 10:00 PM)', status: 'Scheduled', rating: '4.8 ⭐', Aadhaar: 'VERIFIED ✓' },
  ]);

  // 2. Manage Residents (12 Complete Flat Dossiers)
  const [resSearch, setResSearch] = useState<string>('');
  const [residentsDirectory, setResidentsDirectory] = useState<ResidentRecord[]>([
    { flat: 'Flat B-108', name: 'Ananya Sharma', phone: '+91 98765 11111', type: 'Primary Owner', bhk: '2BHK (1250 sqft)', tower: 'Tower B', floor: '1st Floor', members: 3, vehicle: 'KA-03-MB-4921 (Honda City)', parking: 'Slot B-42', dues: '₹ 4,766 (Due)', aadhaarKyc: 'XXXX-XXXX-8902 (Verified ✓)', email: 'ananya.sharma@example.com', rfidTag: 'RFID-ANPR-8921-ACTIVE', helpersCount: 2 },
    { flat: 'Flat A-402', name: 'Rajesh Mehta', phone: '+91 98765 12345', type: 'Owner', bhk: '3BHK (1850 sqft)', tower: 'Tower A', floor: '4th Floor', members: 3, vehicle: 'KA-05-MA-1234 (Creta)', parking: 'Slot A-12', dues: '₹ 0 (Paid)', aadhaarKyc: 'XXXX-XXXX-4412 (Verified ✓)', email: 'rajesh.mehta@example.com', rfidTag: 'RFID-ANPR-4412-ACTIVE', helpersCount: 1 },
    { flat: 'Flat C-301', name: 'Suresh Menon', phone: '+91 98901 22334', type: 'Tenant', bhk: '3BHK (1700 sqft)', tower: 'Tower C', floor: '3rd Floor', members: 4, vehicle: 'TS-09-GA-1002 (Brezza)', parking: 'Slot C-08', dues: '₹ 0 (Paid)', aadhaarKyc: 'XXXX-XXXX-9901 (Verified ✓)', email: 'suresh.menon@example.com', rfidTag: 'RFID-ANPR-3319-ACTIVE', helpersCount: 1 },
    { flat: 'Flat A-104', name: 'Pooja Hegde', phone: '+91 98123 99999', type: 'Owner', bhk: '1BHK (850 sqft)', tower: 'Tower A', floor: '1st Floor', members: 1, vehicle: 'KA-01-PH-7711 (Seltos)', parking: 'Slot A-04', dues: '₹ 3,200 (Due)', aadhaarKyc: 'XXXX-XXXX-7711 (Verified ✓)', email: 'pooja.hegde@example.com', rfidTag: 'RFID-ANPR-7711-ACTIVE', helpersCount: 1 },
    { flat: 'Flat B-204', name: 'Rohan Deshmukh', phone: '+91 98990 11223', type: 'Owner', bhk: '2BHK (1300 sqft)', tower: 'Tower B', floor: '2nd Floor', members: 3, vehicle: 'KA-04-MN-9012 (Swift)', parking: 'Slot B-24', dues: '₹ 0 (Paid)', aadhaarKyc: 'XXXX-XXXX-2044 (Verified ✓)', email: 'rohan.d@example.com', rfidTag: 'RFID-ANPR-2044-ACTIVE', helpersCount: 2 },
    { flat: 'Flat C-502', name: 'Dr. Alok Nath', phone: '+91 98765 66666', type: 'Owner', bhk: 'Penthouse (2800 sqft)', tower: 'Tower C', floor: '5th Floor', members: 5, vehicle: 'KA-01-AL-0001 (BMW 3)', parking: 'Slot C-01 & C-02', dues: '₹ 0 (Paid)', aadhaarKyc: 'XXXX-XXXX-0001 (Verified ✓)', email: 'dr.alok@example.com', rfidTag: 'RFID-ANPR-0001-ACTIVE', helpersCount: 3 },
    { flat: 'Flat A-201', name: 'Vikramaditya Roy', phone: '+91 98765 77777', type: 'Owner', bhk: '3BHK (1750 sqft)', tower: 'Tower A', floor: '2nd Floor', members: 4, vehicle: 'KA-03-VR-8888 (Harrier)', parking: 'Slot A-21', dues: '₹ 5,200 (Due)', aadhaarKyc: 'XXXX-XXXX-8888 (Verified ✓)', email: 'vikram.roy@example.com', rfidTag: 'RFID-ANPR-8888-ACTIVE', helpersCount: 2 },
    { flat: 'Flat B-405', name: 'Neha Kapoor', phone: '+91 98765 88888', type: 'Tenant', bhk: '2BHK (1200 sqft)', tower: 'Tower B', floor: '4th Floor', members: 2, vehicle: 'KA-05-NK-4321 (i20)', parking: 'Slot B-45', dues: '₹ 0 (Paid)', aadhaarKyc: 'XXXX-XXXX-4321 (Verified ✓)', email: 'neha.k@example.com', rfidTag: 'RFID-ANPR-4321-ACTIVE', helpersCount: 1 },
    { flat: 'Flat C-101', name: 'Siddharth Nair', phone: '+91 98765 99999', type: 'Owner', bhk: '2BHK (1350 sqft)', tower: 'Tower C', floor: '1st Floor', members: 3, vehicle: 'KA-02-SN-1122 (Seltos)', parking: 'Slot C-11', dues: '₹ 0 (Paid)', aadhaarKyc: 'XXXX-XXXX-1122 (Verified ✓)', email: 'sid.nair@example.com', rfidTag: 'RFID-ANPR-1122-ACTIVE', helpersCount: 1 },
    { flat: 'Flat A-303', name: 'Meenakshi Iyer', phone: '+91 98765 00000', type: 'Owner', bhk: '3BHK (1600 sqft)', tower: 'Tower A', floor: '3rd Floor', members: 4, vehicle: 'KA-03-MI-9900 (Nexon)', parking: 'Slot A-33', dues: '₹ 0 (Paid)', aadhaarKyc: 'XXXX-XXXX-9900 (Verified ✓)', email: 'meenakshi.i@example.com', rfidTag: 'RFID-ANPR-9900-ACTIVE', helpersCount: 2 },
    { flat: 'Flat B-501', name: 'Arjun Das', phone: '+91 98111 44332', type: 'Tenant', bhk: '3BHK (1680 sqft)', tower: 'Tower B', floor: '5th Floor', members: 3, vehicle: 'KA-01-AD-7766 (Thar)', parking: 'Slot B-51', dues: '₹ 0 (Paid)', aadhaarKyc: 'XXXX-XXXX-7766 (Verified ✓)', email: 'arjun.das@example.com', rfidTag: 'RFID-ANPR-7766-ACTIVE', helpersCount: 1 },
    { flat: 'Flat C-202', name: 'Kavita Menon', phone: '+91 98222 55443', type: 'Owner', bhk: '2BHK (1280 sqft)', tower: 'Tower C', floor: '2nd Floor', members: 2, vehicle: 'KA-04-KM-3322 (Kiger)', parking: 'Slot C-22', dues: '₹ 0 (Paid)', aadhaarKyc: 'XXXX-XXXX-3322 (Verified ✓)', email: 'kavita.m@example.com', rfidTag: 'RFID-ANPR-3322-ACTIVE', helpersCount: 1 },
  ]);

  // Tower Occupancy Matrix Mock
  const towerOccupancyGrid = [
    { tower: 'Tower A', units: [
      { unit: 'A-101', status: 'Owner Occupied', res: 'Siddharth Nair' },
      { unit: 'A-104', status: 'Owner Occupied', res: 'Pooja Hegde' },
      { unit: 'A-201', status: 'Owner Occupied', res: 'Vikramaditya Roy' },
      { unit: 'A-303', status: 'Owner Occupied', res: 'Meenakshi Iyer' },
      { unit: 'A-402', status: 'Owner Occupied', res: 'Rajesh Mehta' },
      { unit: 'A-501', status: 'Vacant', res: '--' },
    ]},
    { tower: 'Tower B', units: [
      { unit: 'B-108', status: 'Owner Occupied', res: 'Ananya Sharma' },
      { unit: 'B-204', status: 'Owner Occupied', res: 'Rohan Deshmukh' },
      { unit: 'B-302', status: 'Vacant', res: '--' },
      { unit: 'B-405', status: 'Tenant Occupied', res: 'Neha Kapoor' },
      { unit: 'B-501', status: 'Tenant Occupied', res: 'Arjun Das' },
      { unit: 'B-504', status: 'Owner Occupied', res: 'Prakash Rao' },
    ]},
    { tower: 'Tower C', units: [
      { unit: 'C-101', status: 'Owner Occupied', res: 'Siddharth Nair' },
      { unit: 'C-202', status: 'Owner Occupied', res: 'Kavita Menon' },
      { unit: 'C-301', status: 'Tenant Occupied', res: 'Suresh Menon' },
      { unit: 'C-402', status: 'Vacant', res: '--' },
      { unit: 'C-502', status: 'Owner Occupied', res: 'Dr. Alok Nath' },
      { unit: 'C-504', status: 'Owner Occupied', res: 'Sunita Rao' },
    ]},
  ];

  // 3. Visitor Management Logs
  const [adminVisitorLogs] = useState([
    { id: 'VIS-901', name: 'Rajesh Kumar (Blinkit)', flat: 'Flat B-108', gate: 'Gate 1 Main', type: 'Delivery', entry: '11:45 AM', exit: '--', status: 'Inside' },
    { id: 'VIS-900', name: 'Sunita Devi (Maid)', flat: 'Flat B-108, A-402', gate: 'Gate 1 Main', type: 'Daily Staff', entry: '09:15 AM', exit: '--', status: 'Inside' },
    { id: 'VIS-899', name: 'Siddharth Verma', flat: 'Flat B-108', gate: 'Gate 1 Main', type: 'Guest Pass', entry: '10:30 AM', exit: '--', status: 'Inside' },
    { id: 'VIS-898', name: 'Ramesh Plumber', flat: 'Flat B-108', gate: 'Gate 1 Main', type: 'Service Tech', entry: '10:15 AM', exit: '--', status: 'Inside' },
    { id: 'VIS-897', name: 'Rahul Sharma (Swiggy)', flat: 'Flat C-301', gate: 'Gate 1 Main', type: 'Delivery', entry: '11:05 AM', exit: '11:15 AM', status: 'Departed' },
    { id: 'VIS-896', name: 'Driver Alok (Uber)', flat: 'Flat A-104', gate: 'Gate 2 Rear', type: 'Cab', entry: '11:20 AM', exit: '11:32 AM', status: 'Departed' },
  ]);

  // 4. Incident Management
  const [incidentsList, setIncidentsList] = useState([
    { id: 'INC-8921', category: 'Parking Dispute', flat: 'Flat B-102', desc: 'Visitor car parked blocking basement ramp', loggedBy: 'Guard Vikram Singh', severity: 'High', status: 'Under Investigation', time: '10:45 AM' },
    { id: 'INC-8810', category: 'Noise Disturbance', flat: 'Flat C-401', desc: 'Loud music past 11 PM reported by neighbors', loggedBy: 'Guard Suresh', severity: 'Medium', status: 'Resolved', time: 'Yesterday' },
    { id: 'INC-8742', category: 'Pool Rules Violation', flat: 'Flat A-201', desc: 'Glass bottles brought to swimming pool deck', loggedBy: 'Guard Dinesh', severity: 'High', status: 'Resolved', time: '19 Aug 2026' },
  ]);

  // 5. Emergency Management
  const [broadcastActive, setBroadcastActive] = useState<boolean>(false);
  const [drillType, setDrillType] = useState<string>('Fire Evacuation Drill');

  // 6. Amenity Management
  const [amenityApprovals, setAmenityApprovals] = useState([
    { id: 'AP-201', resident: 'Ananya Sharma (Flat B-108)', amenity: 'Clubhouse Banquet Hall', date: '15 Sept 2026', event: 'Family Reception (100 Guests)', status: 'Pending Approval' },
    { id: 'AP-198', resident: 'Dr. Alok Nath (Flat C-502)', amenity: 'Tennis Court 1 Special Event', date: '01 Sept 2026', event: 'Society Tennis Tournament', status: 'Approved' },
    { id: 'AP-192', resident: 'Vikramaditya Roy (Flat A-201)', amenity: 'Clubhouse Banquet Hall', date: '28 Aug 2026', event: 'Family Get-Together', status: 'Approved' },
  ]);

  // 7. Maintenance Assets
  const [assetsList] = useState([
    { name: 'OTIS Passenger Elevators #1 & #2 (Tower A)', vendor: 'OTIS Elevator Services', status: 'Operational (AMC Active)', nextService: '15 Sep 2026', health: '98%' },
    { name: 'OTIS Passenger Elevators #3 & #4 (Tower B)', vendor: 'OTIS Elevator Services', status: 'Operational (AMC Active)', nextService: '18 Sep 2026', health: '96%' },
    { name: 'Diesel Generator (250 kVA DG Set)', vendor: 'Cummins India', status: 'Operational (Fuel: 85%)', nextService: '01 Oct 2026', health: '99%' },
    { name: 'Hydro-pneumatic Main Water Booster Pumps', vendor: 'AquaFlow Systems', status: 'Operational (Pressure 4.2 Bar)', nextService: '10 Sep 2026', health: '95%' },
    { name: 'CCTV Security NVR 64-Channel System', vendor: 'Hikvision Digital', status: 'Operational (Recording Active)', nextService: '30 Sep 2026', health: '100%' },
    { name: '50 kW Solar Rooftop Panel Grid', vendor: 'SolarTech Energy', status: 'Operational (Generating 210 kWh)', nextService: '05 Oct 2026', health: '97%' },
  ]);

  // 8. Notice Board
  const [noticeTitle, setNoticeTitle] = useState<string>('Overhead Water Tank Sanitization Notice');
  const [noticeCategory, setNoticeCategory] = useState<string>('Maintenance Notice');
  const [noticeBody, setNoticeBody] = useState<string>('Water supply will be paused on Tuesday from 10:00 AM to 02:00 PM for sanitization of all tower tanks.');
  const [publishedNotices, setPublishedNotices] = useState([
    { id: 'NTC-101', title: 'Overhead Water Tank Sanitization Notice', category: 'Maintenance Notice', date: 'Today 11:30 AM', body: 'Water supply paused on Tuesday 10 AM to 2 PM.', status: 'Pushed to 250 Apps' },
    { id: 'NTC-099', title: 'Annual RWA General Body Meeting (AGM)', category: 'AGM Event', date: '20 Aug 2026', body: 'AGM meeting in Clubhouse Banquet Hall at 10 AM.', status: 'Pushed to 250 Apps' },
    { id: 'NTC-095', title: 'Independence Day Flag Hoisting Photo Album', category: 'General Circular', date: '15 Aug 2026', body: 'Photos uploaded to community photo gallery.', status: 'Archived' },
  ]);

  // 9. Billing Engine
  const [selectedTargetFlat, setSelectedTargetFlat] = useState<string>('Flat B-108 (Ananya Sharma)');
  const [customBillAmount, setCustomBillAmount] = useState<string>('4766');
  const [billNote, setBillNote] = useState<string>('August 2026 Monthly Maintenance Dues');
  const [billingFilter, setBillingFilter] = useState<'all' | 'paid' | 'unpaid'>('all');

  const [flatsBillingStatus, setFlatsBillingStatus] = useState([
    { flat: 'Flat B-108', resident: 'Ananya Sharma', phone: '98765 11111', bhk: '2BHK', amount: '₹ 4,766', status: 'Unpaid', dueDate: '31 Aug 2026', receiptNo: '--', mode: '--' },
    { flat: 'Flat A-402', resident: 'Rajesh Mehta', phone: '98765 12345', bhk: '3BHK', amount: '₹ 5,800', status: 'Paid', dueDate: '31 Aug 2026', receiptNo: 'GST-9012', mode: 'UPI Autopay (05 Aug)' },
    { flat: 'Flat C-301', resident: 'Suresh Menon', phone: '98901 22334', bhk: '3BHK', amount: '₹ 5,950', status: 'Paid', dueDate: '31 Aug 2026', receiptNo: 'GST-8812', mode: 'Netbanking (04 Aug)' },
    { flat: 'Flat A-104', resident: 'Pooja Hegde', phone: '98123 99999', bhk: '1BHK', amount: '₹ 3,200', status: 'Unpaid', dueDate: '31 Aug 2026', receiptNo: '--', mode: '--' },
    { flat: 'Flat B-204', resident: 'Rohan Deshmukh', phone: '98990 11223', bhk: '2BHK', amount: '₹ 4,900', status: 'Paid', dueDate: '31 Aug 2026', receiptNo: 'GST-7711', mode: 'Credit Card (02 Aug)' },
  ]);

  // 10. Staff & Vendor Credentials Console
  const [staffName, setStaffName] = useState<string>('Ramesh Pawar');
  const [staffCompany, setStaffCompany] = useState<string>('AquaClean Swimming Pool Services');
  const [staffRole, setStaffRole] = useState<string>('Pool Maintenance Supervisor');
  const [staffMobile, setStaffMobile] = useState<string>('+91 98123 99887');
  const [staffAadhaar, setStaffAadhaar] = useState<string>('4012-9012-8841');
  const [staffGateAccess, setStaffGateAccess] = useState<string>('Gate 1 & Gate 2 Access');

  const [staffCredentialsList, setStaffCredentialsList] = useState<StaffCredential[]>([
    { id: 'STF-101', name: 'Ramesh Pawar', company: 'AquaClean Pool Services', role: 'Pool Maintenance Supervisor', mobile: '+91 98123 99887', username: 'ramesh.aquaclean', passCode: 'GH-8921-X', gateAccess: 'Gate 1 & Gate 2 (Pool Deck)', status: 'Active Credentials', aadhaar: 'XXXX-XXXX-8841 (Verified ✓)', validTill: '31 Dec 2026' },
    { id: 'STF-098', name: 'Suresh Electrician', company: 'GreenHaven Facilities', role: 'Chief Facilities Electrician', mobile: '+91 98765 00998', username: 'suresh.elec', passCode: 'GH-4102-Y', gateAccess: 'All Towers & Substation', status: 'Active Credentials', aadhaar: 'XXXX-XXXX-9908 (Verified ✓)', validTill: '31 Dec 2026' },
    { id: 'STF-092', name: 'OTIS Technician Alok', company: 'OTIS Elevator Services', role: 'Elevator Maintenance Engineer', mobile: '+91 98345 11223', username: 'alok.otis', passCode: 'GH-7711-Z', gateAccess: 'Tower A, B, C Lift Motor Rooms', status: 'Active Credentials', aadhaar: 'XXXX-XXXX-1123 (Verified ✓)', validTill: '15 Jan 2027' },
    { id: 'STF-088', name: 'Sunita Devi', company: 'CleanPro Facility Housekeeping', role: 'Lead Housekeeper & Waste Lead', mobile: '+91 98765 33445', username: 'sunita.cleanpro', passCode: 'GH-3344-K', gateAccess: 'All Residential Corridors', status: 'Active Credentials', aadhaar: 'XXXX-XXXX-3345 (Verified ✓)', validTill: '30 Nov 2026' },
  ]);

  const [vendorList] = useState([
    { name: 'OTIS Elevator Services Pvt Ltd', scope: 'Annual Comprehensive AMC for 6 High-Speed Passenger Elevators (Towers A, B, C)', cost: '₹ 1,20,000 / year', status: 'Active (Valid till Jan 2027)', sla: '99.4% Uptime SLA', hotline: '+91 1800 220 847', engineers: '2 Dedicated Techs' },
    { name: 'GreenShield Security Agency', scope: '12 Security Guards & Lead Supervisors (Round-the-clock 3 Shifts)', cost: '₹ 2,40,000 / month', status: 'Active (Valid till Dec 2026)', sla: '100% Post Coverage SLA', hotline: '+91 98123 45678', engineers: '12 Certified Guards' },
    { name: 'CleanPro Housekeeping Services', scope: '8 Housekeeping Staff, Common Area Sanitization & Waste Management', cost: '₹ 95,000 / month', status: 'Active (Valid till Nov 2026)', sla: 'Daily Audit Score 98%', hotline: '+91 98222 11009', engineers: '8 Housekeepers' },
    { name: 'AquaClean Swimming Pool Services', scope: 'Daily Chemical Balancing, Filtration Plant & Lifeguard Support', cost: '₹ 25,000 / month', status: 'Active (Valid till Mar 2027)', sla: 'Chlorine & pH Certified Daily', hotline: '+91 98111 33221', engineers: '1 Pool Specialist' },
  ]);

  // 11. View Reports Registry
  const [societyReportsList] = useState([
    { id: 'REP-AUG-2026', title: 'Monthly Maintenance & GST Collection Ledger', category: 'Finance & Billing', date: 'August 2026 (Month-End)', size: '2.4 MB PDF', records: '250 Unit Invoices' },
    { id: 'REP-KYC-2026', title: 'Resident Ownership & Tenant KYC Dossier Directory', category: 'Administration', date: 'Updated Today 11:30 AM', size: '1.8 MB Excel', records: '740 Verified Residents' },
    { id: 'REP-GATE-2026', title: 'Gate 1 & Gate 2 Comprehensive Visitor & ANPR Vehicle Log', category: 'Security Desk', date: 'Last 30 Days', size: '4.2 MB Excel', records: '14,460 Logged Entries' },
    { id: 'REP-AMC-2026', title: 'AMC Contractor & Vendor SLA Performance Audit', category: 'Facilities Management', date: 'Q3 FY 2026-27', size: '1.2 MB PDF', records: '4 Active Vendor Audits' },
    { id: 'REP-AMENITY-2026', title: 'Clubhouse Amenity & Banquet Hall Revenue Statement', category: 'Amenity Booking', date: 'August 2026', size: '980 KB PDF', records: '18 Event Bookings' },
    { id: 'REP-INCIDENT-2026', title: 'Society Incident Occurrence & Investigation Ledger', category: 'Security Desk', date: 'Year-to-Date 2026', size: '1.1 MB PDF', records: '32 Logged Incidents' },
  ]);

  // 12. Audit Logs
  const [auditLogsList] = useState([
    { id: 'LOG-8812', user: 'Ramesh Chandra (Treasurer)', action: 'Updated maintenance billing formula to ₹3.50/sq.ft + 18% GST', timestamp: 'Today 11:30 AM', ip: '192.168.1.45' },
    { id: 'LOG-8811', user: 'Vikram Singh (Guard)', action: 'Logged Blinkit delivery entry pass for Flat B-108', timestamp: 'Today 11:20 AM', ip: '192.168.1.102' },
    { id: 'LOG-8810', user: 'Ananya Sharma (Resident)', action: 'Paid monthly bill via UPI (₹4,766) - Receipt #GST-9021', timestamp: 'Today 11:05 AM', ip: '10.0.4.12' },
  ]);

  // Handlers
  const handleAddGuard = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `GRD-${Math.floor(100 + Math.random() * 900)}`;
    setGuardsList([{ id: newId, name: guardName, phone: guardPhone, station: guardStation, shift: guardShift, status: 'Active (On Shift)', rating: '5.0 ⭐', Aadhaar: 'VERIFIED ✓' }, ...guardsList]);
    alert(`Guard ${guardName} created & assigned to ${guardStation}!`);
  };

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `NTC-${Math.floor(100 + Math.random() * 900)}`;
    setPublishedNotices([{ id: newId, title: noticeTitle, category: noticeCategory, date: 'Just Now', body: noticeBody, status: 'Pushed to 250 Apps' }, ...publishedNotices]);
    alert(`Notice "${noticeTitle}" published & pushed to all 250 resident mobile apps!`);
  };

  const handleDeleteNotice = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete and revoke notice "${title}"?`)) {
      setPublishedNotices(prev => prev.filter(n => n.id !== id));
      alert(`Notice "${title}" (${id}) deleted & revoked.`);
    }
  };

  const handleIssueStaffCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffName || !staffMobile) return;

    const newId = `STF-${Math.floor(100 + Math.random() * 900)}`;
    const username = `${staffName.toLowerCase().replace(/\s+/g, '.')}.${staffCompany.toLowerCase().split(' ')[0]}`;
    const passCode = `GH-${Math.floor(1000 + Math.random() * 9000)}-PASS`;
    
    const newStaff: StaffCredential = {
      id: newId,
      name: staffName,
      company: staffCompany,
      role: staffRole,
      mobile: staffMobile,
      username: username,
      passCode: passCode,
      gateAccess: staffGateAccess,
      status: 'Active Credentials',
      aadhaar: `${staffAadhaar} (Verified ✓)`,
      validTill: '31 Dec 2026'
    };

    setStaffCredentialsList([newStaff, ...staffCredentialsList]);
    setVendorSubTab('staff_passes');
    alert(`DIGITAL PASS ISSUED ✓\nCredentials activated for ${staffName} (${staffCompany}). Access Token: ${passCode}`);
  };

  const handleToggleStaffCredentials = (id: string) => {
    setStaffCredentialsList(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Active Credentials' ? 'Revoked / Suspended' : 'Active Credentials';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const handleIssueCustomBill = (e: React.FormEvent) => {
    e.preventDefault();
    const targetFlatCode = selectedTargetFlat.split(' ')[0];
    setFlatsBillingStatus(prev => prev.map(f => f.flat === targetFlatCode ? { ...f, amount: `₹ ${customBillAmount}`, status: 'Unpaid', dueDate: '31 Aug 2026' } : f));
    alert(`Individual Maintenance Bill of ₹${customBillAmount} issued to ${selectedTargetFlat}!`);
  };

  const handleSendPaymentReminder = (flat: string, resident: string) => {
    alert(`Payment SMS & App Push Reminder sent to ${resident} (${flat})!`);
  };

  const handleResolveIncident = (id: string) => {
    setIncidentsList(prev => prev.map(inc => inc.id === id ? { ...inc, status: 'Resolved' } : inc));
  };

  const handleAmenityDecision = (id: string, decision: string) => {
    setAmenityApprovals(prev => prev.map(a => a.id === id ? { ...a, status: decision } : a));
  };

  const handleOnboardResident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    const newRecord: ResidentRecord = {
      flat: newFlat,
      name: newName,
      phone: newPhone,
      type: newType,
      bhk: newBhk,
      tower: newTower,
      floor: newFloor,
      members: 3,
      vehicle: `${newVehicle} (Sedan)`,
      parking: newParking,
      dues: '₹ 0 (Paid)',
      aadhaarKyc: `${newAadhaar} (Verified ✓)`,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      rfidTag: `RFID-ANPR-${Math.floor(1000 + Math.random() * 9000)}-ACTIVE`,
      helpersCount: 1
    };

    setResidentsDirectory([newRecord, ...residentsDirectory]);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setResidentSubTab('directory');
    alert(`RESIDENT ONBOARDED SUCCESSFULLY ✓\n${newName} registered to ${newFlat} (${newTower}). FastTag RFID tag & login credentials activated!`);
  };

  const unpaidCount = flatsBillingStatus.filter(f => f.status === 'Unpaid').length;
  const pendingAmenityCount = amenityApprovals.filter(a => a.status === 'Pending Approval').length;
  const activeGuardsCount = guardsList.filter(g => g.status.includes('Active')).length;

  const navMenuItems = [
    { id: 'dashboard', label: 'Executive Command Dashboard', icon: LayoutDashboard },
    { id: 'manage_guards', label: 'Manage Guards & Rosters', icon: ShieldCheck, badge: `${activeGuardsCount} On Shift`, badgeColor: 'bg-emerald-100 text-emerald-800' },
    { id: 'manage_residents', label: 'Residents & Flats Directory', icon: Users, badge: `${residentsDirectory.length} Units`, badgeColor: 'bg-indigo-100 text-indigo-800 font-bold' },
    { id: 'billing_fees', label: 'Billing & Maintenance Fees', icon: Receipt, badge: `${unpaidCount} Overdue`, badgeColor: 'bg-amber-100 text-amber-900 font-bold' },
    { id: 'notices', label: 'Notice Board & Circulars', icon: Megaphone, badge: `${publishedNotices.length} Live`, badgeColor: 'bg-indigo-100 text-indigo-800' },
    { id: 'amenity_mgmt', label: 'Amenity & Hall Bookings', icon: Calendar, badge: `${pendingAmenityCount} Pending`, badgeColor: 'bg-rose-100 text-rose-800 font-bold' },
    { id: 'maintenance_mgmt', label: 'Maintenance & AMC Assets', icon: Wrench },
    { id: 'visitor_mgmt', label: 'Gate Visitor Management', icon: UserCheck },
    { id: 'incident_mgmt', label: 'Incident Investigation Desk', icon: AlertTriangle, badge: `${incidentsList.filter(i => i.status !== 'Resolved').length} Open`, badgeColor: 'bg-rose-100 text-rose-800' },
    { id: 'emergency_mgmt', label: 'Emergency Protocols & Drills', icon: Flame },
    { id: 'staff_vendor', label: 'Staff & Vendor Credentials', icon: Building2, badge: `${vendorList.length} AMC Firms`, badgeColor: 'bg-slate-100 text-slate-700 font-bold' },
    { id: 'view_reports', label: 'Official Society Reports', icon: FileText, badge: `${societyReportsList.length} Reports`, badgeColor: 'bg-emerald-100 text-emerald-800 font-bold' },
    { id: 'analytics', label: 'Executive Analytics Suite', icon: TrendingUp },
    { id: 'audit_logs', label: 'Audit Trail & Access Logs', icon: Shield },
    { id: 'community_config', label: 'Community Bylaw & Formula', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans antialiased flex flex-col selection:bg-[#0F172A] selection:text-white">
      
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* TOP DESKTOP & MOBILE HEADER BAR */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-10 py-3.5 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Brand & Admin Station Identifier */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-900 p-0.5 shadow-sm flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                <span>🏛️</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight">RWA Admin</span>
                <span className="bg-indigo-100 text-indigo-800 text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full font-medium">Committee ERP</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-normal truncate max-w-[160px] sm:max-w-none">
                ASBL Springs • <span className="text-indigo-700 font-semibold">Ramesh Chandra (Treasurer)</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Exit */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Broadcast Notice Button */}
            <button
              onClick={() => {
                setActivePage('notices');
                setMobileMenuOpen(false);
              }}
              className="hidden sm:flex px-4 py-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 font-medium text-xs items-center gap-1.5 cursor-pointer"
            >
              <Megaphone className="w-4 h-4 text-indigo-600" />
              <span>+ Notice</span>
            </button>

            {/* Quick Generate Bill Button */}
            <button
              onClick={() => {
                setActivePage('billing_fees');
                setMobileMenuOpen(false);
              }}
              className="hidden sm:flex px-4 py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-medium text-xs items-center gap-1.5 cursor-pointer"
            >
              <Receipt className="w-4 h-4 text-emerald-600" />
              <span>Dues</span>
            </button>

            {/* Mobile Hamburger Drawer Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-2xl bg-slate-900 text-white font-medium flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Toggle Admin Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={onExit}
              className="hidden sm:flex px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white items-center gap-2 text-xs font-medium shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit</span>
            </button>
          </div>

        </div>

        {/* Mobile Collapsible Admin Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-200 max-h-[75vh] overflow-y-auto space-y-2 animate-fade-in pb-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2">
              Admin Governance Workspaces
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navMenuItems.map(item => {
                const TabIcon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePage(item.id as AdminPageId);
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
              <span>Exit Admin Portal to Gateway</span>
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
          
          {/* Admin Leadership Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                RC
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">Ramesh Chandra</div>
                <div className="text-xs text-slate-500 font-medium">RWA President & Treasurer</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-600">
              <span>Term: <strong>2025 - 2027</strong></span>
              <span className="text-emerald-600 font-bold">Authorized ✓</span>
            </div>
          </div>

          {/* Quick Admin Actions */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-1">
              Quick Admin Actions
            </span>

            <button
              onClick={() => {
                setActivePage('view_reports');
              }}
              className="w-full p-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Download Society Reports</span>
            </button>

            <button
              onClick={() => {
                setActivePage('analytics');
              }}
              className="w-full p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl flex items-center justify-center gap-2 border border-slate-200 transition-transform active:scale-95 cursor-pointer"
            >
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>View Live Analytics</span>
            </button>
          </div>

          {/* Society Financial & Occupancy Telemetry Box - Light Theme */}
          <div className="bg-gradient-to-br from-indigo-50/90 via-white to-slate-50 border border-indigo-100 text-slate-800 p-5 rounded-3xl shadow-xs space-y-3 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-700 block">
              Society Financial Health
            </span>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-white p-3 rounded-2xl border border-indigo-100/80 shadow-xs">
                <span className="text-[10px] text-slate-400 block font-bold">Dues Collected</span>
                <span className="text-lg font-black text-emerald-600">₹ 14.8 L</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-indigo-100/80 shadow-xs">
                <span className="text-[10px] text-slate-400 block font-bold">Occupancy</span>
                <span className="text-lg font-black text-slate-900">96.4%</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="bg-white p-3 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-2 block">
              Admin Workspaces
            </span>
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id as AdminPageId)}
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
          {/* 1. EXECUTIVE COMMAND DASHBOARD */}
          {/* ========================================================================= */}
          {activePage === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Top Hero Banner - Modern Light Theme */}
              <div className="bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/60 text-slate-900 p-8 rounded-3xl border border-indigo-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 shadow-xs">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-black text-2xl text-slate-900">Society Executive Command & Governance</h2>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        FY 2026-27 Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Real-time financial audits, security rosters, resident accounts, AMC contracts, and facilities governance</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 relative z-10">
                  <button
                    onClick={() => setActivePage('billing_fees')}
                    className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-xs flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Receipt className="w-4 h-4 text-white" />
                    <span>Manage Billing & Dues</span>
                  </button>

                  <button
                    onClick={() => setActivePage('notices')}
                    className="px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold rounded-2xl text-xs shadow-xs flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Megaphone className="w-4 h-4 text-indigo-600" />
                    <span>Broadcast Notice</span>
                  </button>
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500">August Collections</div>
                    <div className="text-2xl font-black text-slate-900">₹ 14.8 Lakhs</div>
                    <div className="text-[10px] text-emerald-600 font-bold">92% Compliance</div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500">Registered Residents</div>
                    <div className="text-2xl font-black text-slate-900">250 Flats (740 Res)</div>
                    <div className="text-[10px] text-indigo-600 font-bold">Aadhaar KYC 98%</div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500">Security Personnel</div>
                    <div className="text-2xl font-black text-slate-900">8 Guards on Roster</div>
                    <div className="text-[10px] text-emerald-600 font-bold">3 on Active Shift</div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500">AMC Equipment</div>
                    <div className="text-2xl font-black text-slate-900">6 Critical Assets</div>
                    <div className="text-[10px] text-purple-600 font-bold">100% Operational</div>
                  </div>
                </div>
              </div>

              {/* Quick Jump Grid: Residents, Guards, Dues */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Billing & Maintenance Status */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div>
                      <span className="font-extrabold text-sm text-slate-900 block">August 2026 Maintenance Ledger</span>
                      <span className="text-xs text-slate-500">Recent flat payment activities</span>
                    </div>
                    <button
                      onClick={() => setActivePage('billing_fees')}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      View All Dues →
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {flatsBillingStatus.map(f => (
                      <div key={f.flat} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-slate-900">{f.flat} ({f.resident})</div>
                          <div className="text-[11px] text-slate-500">{f.bhk} • Mode: {f.mode}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-900">{f.amount}</div>
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            f.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {f.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security & AMC Equipment Health */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div>
                      <span className="font-extrabold text-sm text-slate-900 block">Critical Society Infrastructure</span>
                      <span className="text-xs text-slate-500">Real-time AMC status</span>
                    </div>
                    <button
                      onClick={() => setActivePage('maintenance_mgmt')}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      View All Assets →
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {assetsList.slice(0, 4).map((a, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-slate-900">{a.name}</div>
                          <div className="text-[11px] text-slate-500">Vendor: {a.vendor} • Next: {a.nextService}</div>
                        </div>
                        <div className="text-right">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {a.health} Health
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. MANAGE GUARDS & ROSTERS */}
          {/* ========================================================================= */}
          {activePage === 'manage_guards' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Security Guard Roster & Shift Allocations</h2>
                    <p className="text-xs text-slate-500 mt-1">Manage 24/7 guard shifts, post assignments, biometric Aadhaar verifications, and ratings</p>
                  </div>
                </div>

                <button
                  onClick={() => alert('New Guard registration form opened below.')}
                  className="px-5 py-3 bg-slate-900 text-white font-bold rounded-2xl text-xs flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Security Guard</span>
                </button>
              </div>

              {/* Add Guard Form */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-extrabold text-base text-slate-900 block">Register & Assign Guard to Gate Station</span>
                <form onSubmit={handleAddGuard} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Guard Name</label>
                    <input
                      type="text"
                      required
                      value={guardName}
                      onChange={(e) => setGuardName(e.target.value)}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={guardPhone}
                      onChange={(e) => setGuardPhone(e.target.value)}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Assigned Station</label>
                    <select
                      value={guardStation}
                      onChange={(e) => setGuardStation(e.target.value)}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold"
                    >
                      <option value="Gate 1 Main Entry">Gate 1 Main Entry</option>
                      <option value="Gate 2 Rear Entry">Gate 2 Rear Entry</option>
                      <option value="Night Patrol Rover">Night Patrol Rover</option>
                      <option value="Clubhouse Guard">Clubhouse Guard</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Shift Schedule</label>
                    <select
                      value={guardShift}
                      onChange={(e) => setGuardShift(e.target.value)}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold"
                    >
                      <option value="Shift A (06:00 AM - 02:00 PM)">Shift A (06:00 AM - 02:00 PM)</option>
                      <option value="Shift B (02:00 PM - 10:00 PM)">Shift B (02:00 PM - 10:00 PM)</option>
                      <option value="Shift C (10:00 PM - 06:00 AM)">Shift C (10:00 PM - 06:00 AM)</option>
                    </select>
                  </div>
                  <div className="sm:col-span-4">
                    <button
                      type="submit"
                      className="py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md"
                    >
                      Save Guard Assignment & Deploy
                    </button>
                  </div>
                </form>
              </div>

              {/* Guards List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {guardsList.map(g => (
                  <div key={g.id} className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="font-mono font-bold text-slate-400">{g.id}</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        g.status.includes('Active') ? 'bg-emerald-100 text-emerald-800 animate-pulse' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {g.status}
                      </span>
                    </div>

                    <div>
                      <div className="font-black text-sm text-slate-900">{g.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{g.phone}</div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-800">{g.station}</div>
                      <div className="text-[11px] text-slate-500">{g.shift}</div>
                      <div className="text-[10px] text-emerald-700 font-bold pt-1">{g.Aadhaar}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. MANAGE RESIDENTS & FLATS DIRECTORY */}
          {/* ========================================================================= */}
          {activePage === 'manage_residents' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Top Hero Banner */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Manage Residents & Flats Directory</h2>
                    <p className="text-xs text-slate-500 mt-1">Complete unit ownership register, Aadhaar KYC verifications, parking allocations, and dues</p>
                  </div>
                </div>

                {/* Sub-Tab Selector */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-bold gap-1 self-stretch sm:self-center">
                  <button
                    onClick={() => setResidentSubTab('directory')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      residentSubTab === 'directory' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📋 Units Directory ({residentsDirectory.length})
                  </button>

                  <button
                    onClick={() => setResidentSubTab('onboard')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      residentSubTab === 'onboard' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    ➕ Onboard Resident
                  </button>

                  <button
                    onClick={() => setResidentSubTab('grid')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      residentSubTab === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🏢 Tower Matrix Grid
                  </button>
                </div>
              </div>

              {/* 4 Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Total Society Units</span>
                  <span className="text-2xl font-black text-slate-900">250 Flats</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Registered Residents</span>
                  <span className="text-2xl font-black text-indigo-600">740 People</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Aadhaar KYC Verified</span>
                  <span className="text-2xl font-black text-emerald-600">98.4% Verified</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">FastTag Active Cars</span>
                  <span className="text-2xl font-black text-slate-900">310 Vehicles</span>
                </div>
              </div>

              {/* VIEW 1: DIRECTORY TABLE & SEARCH */}
              {residentSubTab === 'directory' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5 animate-fade-in">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                    
                    {/* Filters */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      {(['ALL', 'Tower A', 'Tower B', 'Tower C'] as const).map(t => (
                        <button
                          key={t}
                          onClick={() => setSelectedTowerFilter(t)}
                          className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                            selectedTowerFilter === t ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {t}
                        </button>
                      ))}

                      {(['ALL', 'Owner', 'Tenant'] as const).map(typ => (
                        <button
                          key={typ}
                          onClick={() => setSelectedTypeFilter(typ)}
                          className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                            selectedTypeFilter === typ ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-800'
                          }`}
                        >
                          {typ === 'ALL' ? 'All Types' : `${typ}s`}
                        </button>
                      ))}
                    </div>

                    {/* Search Input */}
                    <div className="w-full sm:w-72 relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search flat, name, vehicle plate..."
                        value={resSearch}
                        onChange={(e) => setResSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold">
                          <th className="py-3">Flat & Tower</th>
                          <th className="py-3">Primary Resident</th>
                          <th className="py-3">Configuration</th>
                          <th className="py-3">Registered Vehicle</th>
                          <th className="py-3">Parking Slot</th>
                          <th className="py-3">Aadhaar KYC</th>
                          <th className="py-3">Dues</th>
                          <th className="py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {residentsDirectory
                          .filter(r => selectedTowerFilter === 'ALL' || r.tower === selectedTowerFilter)
                          .filter(r => selectedTypeFilter === 'ALL' || (selectedTypeFilter === 'Owner' ? r.type.includes('Owner') : r.type === 'Tenant'))
                          .filter(r => r.flat.toLowerCase().includes(resSearch.toLowerCase()) || r.name.toLowerCase().includes(resSearch.toLowerCase()) || r.vehicle.toLowerCase().includes(resSearch.toLowerCase()))
                          .map(r => (
                            <tr key={r.flat} className="hover:bg-slate-50">
                              <td className="py-3.5 font-bold text-slate-900">
                                <div>{r.flat}</div>
                                <div className="text-[10px] text-slate-400 font-normal">{r.tower} • {r.floor}</div>
                              </td>
                              <td className="py-3.5">
                                <div className="font-bold text-slate-900">{r.name}</div>
                                <div className="text-[11px] text-slate-500">{r.phone} • <span className="font-bold text-indigo-600">{r.type}</span></div>
                              </td>
                              <td className="py-3.5 text-slate-600">{r.bhk}</td>
                              <td className="py-3.5 font-mono text-slate-700">{r.vehicle}</td>
                              <td className="py-3.5 font-bold text-indigo-700">{r.parking}</td>
                              <td className="py-3.5">
                                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                                  Verified ✓
                                </span>
                              </td>
                              <td className="py-3.5">
                                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                                  r.dues.includes('Paid') ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {r.dues}
                                </span>
                              </td>
                              <td className="py-3.5 text-right">
                                <button
                                  onClick={() => setSelectedResidentDetail(r)}
                                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[11px] cursor-pointer shadow-xs"
                                >
                                  View Dossier
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* VIEW 2: ONBOARD NEW RESIDENT FORM */}
              {residentSubTab === 'onboard' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-black text-lg text-slate-900">Onboard & Register New Society Resident</h3>
                      <p className="text-xs text-slate-500">Record unit ownership, Aadhaar KYC verification, allocated parking, and issue digital portal credentials</p>
                    </div>
                  </div>

                  <form onSubmit={handleOnboardResident} className="space-y-6 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">1. Unit / Flat Number</label>
                        <input
                          type="text"
                          required
                          value={newFlat}
                          onChange={(e) => setNewFlat(e.target.value)}
                          placeholder="e.g. Flat B-302"
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-bold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">2. Tower</label>
                        <select
                          value={newTower}
                          onChange={(e) => setNewTower(e.target.value as any)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-bold focus:outline-none"
                        >
                          <option value="Tower A">Tower A</option>
                          <option value="Tower B">Tower B</option>
                          <option value="Tower C">Tower C</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">3. Floor Level</label>
                        <input
                          type="text"
                          value={newFloor}
                          onChange={(e) => setNewFloor(e.target.value)}
                          placeholder="e.g. 3rd Floor"
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-medium focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">4. BHK Configuration</label>
                        <select
                          value={newBhk}
                          onChange={(e) => setNewBhk(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-bold focus:outline-none"
                        >
                          <option value="1BHK (850 sqft)">1BHK (850 sqft)</option>
                          <option value="2BHK (1250 sqft)">2BHK (1250 sqft)</option>
                          <option value="3BHK (1850 sqft)">3BHK (1850 sqft)</option>
                          <option value="Penthouse (2800 sqft)">Penthouse (2800 sqft)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">5. Primary Resident Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Varun Teja"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-medium focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">6. Contact Mobile Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 44332"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-mono font-medium focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">7. Resident Classification</label>
                        <select
                          value={newType}
                          onChange={(e) => setNewType(e.target.value as any)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-bold focus:outline-none"
                        >
                          <option value="Owner">Primary Registered Owner</option>
                          <option value="Tenant">Verified Tenant</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">8. Aadhaar KYC Number</label>
                        <input
                          type="text"
                          value={newAadhaar}
                          onChange={(e) => setNewAadhaar(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-mono font-medium focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">9. Registered Vehicle Plate</label>
                        <input
                          type="text"
                          value={newVehicle}
                          onChange={(e) => setNewVehicle(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-mono font-medium focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">10. Allocated Parking Slot</label>
                        <input
                          type="text"
                          value={newParking}
                          onChange={(e) => setNewParking(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-bold focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Complete Resident Onboarding & Activate App Credentials</span>
                    </button>
                  </form>
                </div>
              )}

              {/* VIEW 3: TOWER OCCUPANCY MATRIX GRID */}
              {residentSubTab === 'grid' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
                  <div>
                    <h3 className="font-black text-lg text-slate-900">Visual Tower Occupancy & Possession Map</h3>
                    <p className="text-xs text-slate-500">Live floor-by-floor unit map for Towers A, B, and C</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {towerOccupancyGrid.map(t => (
                      <div key={t.tower} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="font-black text-base text-slate-900">{t.tower}</span>
                          <span className="text-xs bg-slate-200 text-slate-800 font-bold px-2.5 py-0.5 rounded-full">
                            {t.units.length} Units Monitored
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          {t.units.map(u => (
                            <div
                              key={u.unit}
                              className={`p-3.5 rounded-2xl border flex flex-col justify-between space-y-2 transition-all ${
                                u.status === 'Owner Occupied'
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                                  : u.status === 'Tenant Occupied'
                                  ? 'bg-indigo-50 border-indigo-200 text-indigo-950'
                                  : 'bg-slate-100 border-slate-200 text-slate-500'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-sm">{u.unit}</span>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                  u.status === 'Owner Occupied' ? 'bg-emerald-200 text-emerald-900' : u.status === 'Tenant Occupied' ? 'bg-indigo-200 text-indigo-900' : 'bg-slate-200 text-slate-600'
                                }`}>
                                  {u.status === 'Owner Occupied' ? 'Owner' : u.status === 'Tenant Occupied' ? 'Tenant' : 'Vacant'}
                                </span>
                              </div>
                              <div className="text-[11px] font-medium truncate">{u.res}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. BILLING & MAINTENANCE FEES ENGINE */}
          {/* ========================================================================= */}
          {activePage === 'billing_fees' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Receipt className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Maintenance Billing & Financial Ledger</h2>
                    <p className="text-xs text-slate-500 mt-1">Issue automated invoices, track UPI/Netbanking payments, generate GST receipts, and dispatch reminders</p>
                  </div>
                </div>

                <button
                  onClick={() => alert('Bulk Monthly Maintenance invoices generated for all 250 flats!')}
                  className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs shadow-md cursor-pointer"
                >
                  ⚡ Generate Bulk Society Invoices
                </button>
              </div>

              {/* Issue Custom Bill Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-extrabold text-base text-slate-900 block">Issue Individual Maintenance or Repair Bill</span>
                <form onSubmit={handleIssueCustomBill} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Target Flat & Resident</label>
                    <select
                      value={selectedTargetFlat}
                      onChange={(e) => setSelectedTargetFlat(e.target.value)}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold"
                    >
                      <option value="Flat B-108 (Ananya Sharma)">Flat B-108 (Ananya Sharma)</option>
                      <option value="Flat A-402 (Rajesh Mehta)">Flat A-402 (Rajesh Mehta)</option>
                      <option value="Flat C-301 (Suresh Menon)">Flat C-301 (Suresh Menon)</option>
                      <option value="Flat A-104 (Pooja Hegde)">Flat A-104 (Pooja Hegde)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      required
                      value={customBillAmount}
                      onChange={(e) => setCustomBillAmount(e.target.value)}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Bill Description</label>
                    <input
                      type="text"
                      value={billNote}
                      onChange={(e) => setBillNote(e.target.value)}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md"
                    >
                      Dispatch Bill & Notify Resident App
                    </button>
                  </div>
                </form>
              </div>

              {/* Billing Status Table */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4 text-xs">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBillingFilter('all')}
                      className={`px-3.5 py-1.5 rounded-xl font-bold cursor-pointer ${billingFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      All Records
                    </button>
                    <button
                      onClick={() => setBillingFilter('unpaid')}
                      className={`px-3.5 py-1.5 rounded-xl font-bold cursor-pointer ${billingFilter === 'unpaid' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      Overdue ({unpaidCount})
                    </button>
                    <button
                      onClick={() => setBillingFilter('paid')}
                      className={`px-3.5 py-1.5 rounded-xl font-bold cursor-pointer ${billingFilter === 'paid' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      Paid ({flatsBillingStatus.length - unpaidCount})
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold">
                        <th className="py-3">Flat & Resident</th>
                        <th className="py-3">Amount</th>
                        <th className="py-3">Due Date</th>
                        <th className="py-3">Payment Mode</th>
                        <th className="py-3">Status</th>
                        <th className="py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {flatsBillingStatus
                        .filter(f => billingFilter === 'all' || (billingFilter === 'unpaid' ? f.status === 'Unpaid' : f.status === 'Paid'))
                        .map(f => (
                          <tr key={f.flat} className="hover:bg-slate-50">
                            <td className="py-3.5 font-bold text-slate-900">
                              <div>{f.flat} ({f.resident})</div>
                              <div className="text-[11px] text-slate-400 font-mono">{f.phone}</div>
                            </td>
                            <td className="py-3.5 font-black text-slate-900">{f.amount}</td>
                            <td className="py-3.5 text-slate-500">{f.dueDate}</td>
                            <td className="py-3.5 text-slate-600">{f.mode}</td>
                            <td className="py-3.5">
                              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                                f.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {f.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-right">
                              {f.status === 'Unpaid' ? (
                                <button
                                  onClick={() => handleSendPaymentReminder(f.flat, f.resident)}
                                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-[11px] cursor-pointer"
                                >
                                  Send Reminder
                                </button>
                              ) : (
                                <span className="text-emerald-700 font-bold text-[11px]">GST Receipt #{f.receiptNo}</span>
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
          {/* 5. NOTICES & ANNOUNCEMENTS */}
          {/* ========================================================================= */}
          {activePage === 'notices' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Megaphone className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Official Society Notice Board & Circulars</h2>
                    <p className="text-xs text-slate-500 mt-1">Broadcast official announcements directly to all 250 resident mobile apps with instant push alerts</p>
                  </div>
                </div>
              </div>

              {/* Compose Notice Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-extrabold text-base text-slate-900 block">Compose & Broadcast Circular</span>
                <form onSubmit={handlePostNotice} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Notice Headline</label>
                      <input
                        type="text"
                        required
                        value={noticeTitle}
                        onChange={(e) => setNoticeTitle(e.target.value)}
                        className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Category</label>
                      <select
                        value={noticeCategory}
                        onChange={(e) => setNoticeCategory(e.target.value)}
                        className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold"
                      >
                        <option value="Maintenance Notice">Maintenance Notice</option>
                        <option value="AGM Event">AGM Event & Elections</option>
                        <option value="General Circular">General Circular</option>
                        <option value="Security Alert">Security Alert</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Notice Message Content</label>
                    <textarea
                      rows={3}
                      required
                      value={noticeBody}
                      onChange={(e) => setNoticeBody(e.target.value)}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Broadcast Notice to 250 Residents</span>
                  </button>
                </form>
              </div>

              {/* Published Notices List */}
              <div className="space-y-3">
                {publishedNotices.map(n => (
                  <div key={n.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-slate-900">{n.title}</span>
                        <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          {n.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{n.body}</p>
                      <div className="text-[11px] text-slate-400 mt-1">Published: {n.date} • {n.status}</div>
                    </div>

                    <button
                      onClick={() => handleDeleteNotice(n.id, n.title)}
                      className="p-2.5 text-rose-600 hover:bg-rose-50 rounded-xl border border-rose-200 text-xs font-bold cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 6. AMENITY MANAGEMENT */}
          {/* ========================================================================= */}
          {activePage === 'amenity_mgmt' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Amenity & Facility Booking Approvals</h2>
                    <p className="text-xs text-slate-500 mt-1">Approve or reject resident bookings for Banquet Hall, Tennis Courts, and Turf Arenas</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {amenityApprovals.map(a => (
                  <div key={a.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-slate-400">{a.id}</span>
                        <span className="font-black text-sm text-slate-900">{a.amenity}</span>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          a.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {a.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-700 mt-1">Requested by: <strong>{a.resident}</strong> • Date: <strong>{a.date}</strong></div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Event Details: {a.event}</div>
                    </div>

                    {a.status === 'Pending Approval' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAmenityDecision(a.id, 'Approved')}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs cursor-pointer"
                        >
                          Approve Request
                        </button>
                        <button
                          onClick={() => handleAmenityDecision(a.id, 'Rejected')}
                          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 7. MAINTENANCE & AMC ASSET TRACKER */}
          {activePage === 'maintenance_mgmt' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-black text-xl text-slate-900 block">Critical Equipment AMC & Maintenance Ledger</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {assetsList.map((a, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sm text-slate-900">{a.name}</span>
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          {a.health} Health
                        </span>
                      </div>
                      <div className="text-slate-600">Contractor: <strong>{a.vendor}</strong></div>
                      <div className="text-slate-500">Status: {a.status}</div>
                      <div className="text-indigo-700 font-bold pt-1">Next Scheduled Service: {a.nextService}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 8. GATE VISITOR MANAGEMENT LOGS */}
          {activePage === 'visitor_mgmt' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-black text-xl text-slate-900 block">Society Gate Access & Visitor History</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold">
                        <th className="py-3">Visitor Name</th>
                        <th className="py-3">Target Flat</th>
                        <th className="py-3">Gate & Type</th>
                        <th className="py-3">Entry Time</th>
                        <th className="py-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {adminVisitorLogs.map(v => (
                        <tr key={v.id} className="hover:bg-slate-50">
                          <td className="py-3.5 font-bold text-slate-900">{v.name}</td>
                          <td className="py-3.5 text-indigo-700 font-bold">{v.flat}</td>
                          <td className="py-3.5 text-slate-600">{v.gate} ({v.type})</td>
                          <td className="py-3.5 text-slate-500">{v.entry}</td>
                          <td className="py-3.5 text-right">
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              v.status === 'Inside' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {v.status}
                            </span>
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
          {/* 9. INCIDENT INVESTIGATION DESK */}
          {activePage === 'incident_mgmt' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-black text-xl text-slate-900 block">Society Security Occurrence & Investigation Desk</span>
                <div className="space-y-3 text-xs">
                  {incidentsList.map(inc => (
                    <div key={inc.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-400">{inc.id}</span>
                          <span className="font-bold text-sm text-slate-900">{inc.category} ({inc.flat})</span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          inc.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {inc.status}
                        </span>
                      </div>
                      <p className="text-slate-600">{inc.desc}</p>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                        <span>Logged by {inc.loggedBy} • {inc.time}</span>
                        {inc.status !== 'Resolved' && (
                          <button
                            onClick={() => handleResolveIncident(inc.id)}
                            className="px-3 py-1 bg-slate-900 text-white font-bold rounded-lg cursor-pointer"
                          >
                            Mark Resolved
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 10. EMERGENCY MANAGEMENT & DRILLS */}
          {activePage === 'emergency_mgmt' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                    <Flame className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Emergency Protocols & Community Drills</h2>
                    <p className="text-xs text-slate-500">Conduct community safety drills and broadcast emergency evacuation instructions</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-red-50/70 border border-red-200 space-y-4 text-xs">
                  <span className="font-bold text-red-900 text-sm block">Broadcast Community Drill / Evacuation Notice</span>
                  <div className="flex gap-3">
                    <select
                      value={drillType}
                      onChange={(e) => setDrillType(e.target.value)}
                      className="p-3 bg-white rounded-xl border border-red-200 font-bold"
                    >
                      <option value="Fire Evacuation Drill">Scheduled Fire Evacuation Drill</option>
                      <option value="Earthquake Safety Drill">Earthquake Safety Protocol</option>
                      <option value="Power Grid Blackout Drill">Power Substation Safety Drill</option>
                    </select>

                    <button
                      onClick={() => alert(`Broadcasted "${drillType}" alert to all resident mobile apps!`)}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl cursor-pointer"
                    >
                      Dispatch Community Alert
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 11. STAFF & VENDOR CREDENTIALS CONSOLE */}
          {/* ========================================================================= */}
          {activePage === 'staff_vendor' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Top Hero Banner */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Staff & Vendor Management Suite</h2>
                    <p className="text-xs text-slate-500 mt-1">Manage external AMC contractor contracts, digital staff security passes, and gate access authorizations</p>
                  </div>
                </div>

                {/* Sub-Tab Selector */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-bold gap-1 self-stretch sm:self-center">
                  <button
                    onClick={() => setVendorSubTab('contracts')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      vendorSubTab === 'contracts' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🏢 AMC Contracts ({vendorList.length})
                  </button>

                  <button
                    onClick={() => setVendorSubTab('staff_passes')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      vendorSubTab === 'staff_passes' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    👷 Staff Passes ({staffCredentialsList.length})
                  </button>

                  <button
                    onClick={() => setVendorSubTab('issue_pass')}
                    className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      vendorSubTab === 'issue_pass' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    ➕ Issue Access Pass
                  </button>
                </div>
              </div>

              {/* 4 Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Active AMC Vendor Firms</span>
                  <span className="text-2xl font-black text-slate-900">4 Agencies</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Registered Contractor Staff</span>
                  <span className="text-2xl font-black text-indigo-600">28 Personnel</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Police & Aadhaar KYC</span>
                  <span className="text-2xl font-black text-emerald-600">100% Verified</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Contractor Monthly Outflow</span>
                  <span className="text-2xl font-black text-slate-900">₹ 4.80 L / mo</span>
                </div>
              </div>

              {/* VIEW 1: AMC VENDOR CONTRACTS */}
              {vendorSubTab === 'contracts' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {vendorList.map((v, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-black text-base text-slate-900 block">{v.name}</span>
                              <span className="text-xs text-emerald-700 font-bold">{v.status}</span>
                            </div>
                            <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                              {v.sla}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed pt-1">{v.scope}</p>

                          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                              <span className="text-[10px] text-slate-400 block font-bold uppercase">Contract Rate</span>
                              <span className="font-black text-slate-900">{v.cost}</span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                              <span className="text-[10px] text-slate-400 block font-bold uppercase">Deployed Team</span>
                              <span className="font-bold text-indigo-700">{v.engineers}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-xs">
                          <span className="text-slate-500 font-medium font-mono">Hotline: {v.hotline}</span>
                          <button
                            onClick={() => alert(`Downloaded Official AMC Agreement PDF for ${v.name}`)}
                            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-[11px] cursor-pointer"
                          >
                            Agreement PDF ↓
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VIEW 2: STAFF DIGITAL PASSES & CREDENTIALS */}
              {vendorSubTab === 'staff_passes' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 animate-fade-in">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-black text-lg text-slate-900">Contractor Staff Digital Passports</h3>
                      <p className="text-xs text-slate-500">Active personnel passes with gate access zones, Aadhaar verification, and token revocations</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold">
                          <th className="py-3">Staff ID & Name</th>
                          <th className="py-3">Agency / Firm</th>
                          <th className="py-3">Role / Trade</th>
                          <th className="py-3">Gate Access Zone</th>
                          <th className="py-3">Passcode Token</th>
                          <th className="py-3">Status</th>
                          <th className="py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {staffCredentialsList.map(s => (
                          <tr key={s.id} className="hover:bg-slate-50">
                            <td className="py-3.5 font-bold text-slate-900">
                              <div>{s.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{s.id} • {s.mobile}</div>
                            </td>
                            <td className="py-3.5 text-slate-700 font-medium">{s.company}</td>
                            <td className="py-3.5 text-indigo-700 font-bold">{s.role}</td>
                            <td className="py-3.5 text-slate-600">{s.gateAccess}</td>
                            <td className="py-3.5 font-mono font-bold text-slate-900">{s.passCode}</td>
                            <td className="py-3.5">
                              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                                s.status === 'Active Credentials' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {s.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-right space-x-2">
                              <button
                                onClick={() => setSelectedStaffPassModal(s)}
                                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[11px] cursor-pointer"
                              >
                                View ID Badge
                              </button>
                              <button
                                onClick={() => handleToggleStaffCredentials(s.id)}
                                className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] cursor-pointer ${
                                  s.status === 'Active Credentials' ? 'text-rose-600 hover:bg-rose-50' : 'text-emerald-700 hover:bg-emerald-50'
                                }`}
                              >
                                {s.status === 'Active Credentials' ? 'Revoke' : 'Activate'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* VIEW 3: ISSUE ACCESS PASS FORM */}
              {vendorSubTab === 'issue_pass' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
                  <div>
                    <h3 className="font-black text-lg text-slate-900">Issue Contractor Digital Security Pass</h3>
                    <p className="text-xs text-slate-500">Generate digital security pass with gate QR authorization and Aadhaar verification</p>
                  </div>

                  <form onSubmit={handleIssueStaffCredentials} className="space-y-6 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">1. Staff Full Name</label>
                        <input
                          type="text"
                          required
                          value={staffName}
                          onChange={(e) => setStaffName(e.target.value)}
                          placeholder="e.g. Ramesh Pawar"
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-bold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">2. Contractor Agency / Vendor</label>
                        <select
                          value={staffCompany}
                          onChange={(e) => setStaffCompany(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-bold focus:outline-none"
                        >
                          <option value="AquaClean Swimming Pool Services">AquaClean Swimming Pool Services</option>
                          <option value="OTIS Elevator Services Pvt Ltd">OTIS Elevator Services Pvt Ltd</option>
                          <option value="GreenShield Security Agency">GreenShield Security Agency</option>
                          <option value="CleanPro Facility Housekeeping">CleanPro Facility Housekeeping</option>
                          <option value="GreenHaven Facilities Management">GreenHaven Facilities Management</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">3. Trade Role / Designation</label>
                        <input
                          type="text"
                          required
                          value={staffRole}
                          onChange={(e) => setStaffRole(e.target.value)}
                          placeholder="e.g. Pool Maintenance Supervisor"
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-medium focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">4. Mobile Number</label>
                        <input
                          type="tel"
                          required
                          value={staffMobile}
                          onChange={(e) => setStaffMobile(e.target.value)}
                          placeholder="e.g. +91 98123 99887"
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-mono font-medium focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">5. Aadhaar KYC Number</label>
                        <input
                          type="text"
                          required
                          value={staffAadhaar}
                          onChange={(e) => setStaffAadhaar(e.target.value)}
                          placeholder="e.g. 4012-9012-8841"
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-mono font-medium focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">6. Gate Access Zone Clearance</label>
                        <select
                          value={staffGateAccess}
                          onChange={(e) => setStaffGateAccess(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-bold focus:outline-none"
                        >
                          <option value="Gate 1 & Gate 2 (Pool Deck)">Gate 1 & Gate 2 (Pool Deck)</option>
                          <option value="All Towers & Substation">All Towers & Substation</option>
                          <option value="Tower A, B, C Lift Motor Rooms">Tower A, B, C Lift Motor Rooms</option>
                          <option value="All Residential Corridors">All Residential Corridors</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Key className="w-4 h-4 text-amber-400" />
                      <span>Issue Digital Access Pass & Notify Gate Station</span>
                    </button>
                  </form>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* 12. NEW: OFFICIAL SOCIETY REPORTS CENTER */}
          {/* ========================================================================= */}
          {activePage === 'view_reports' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Official Society Reports & Export Ledger</h2>
                    <p className="text-xs text-slate-500 mt-1">Generate, view, and export official financial, KYC, gate visitor, and maintenance statements</p>
                  </div>
                </div>

                <button
                  onClick={() => alert('Generating society-wide comprehensive audit archive package (ZIP)...')}
                  className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Export All Statements (ZIP)</span>
                </button>
              </div>

              {/* Reports Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {societyReportsList.map(rep => (
                  <div key={rep.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-mono font-bold text-xs text-slate-400">{rep.id}</span>
                        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {rep.category}
                        </span>
                      </div>

                      <h3 className="font-black text-base text-slate-900">{rep.title}</h3>
                      
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between text-xs text-slate-600">
                        <span>Period: <strong>{rep.date}</strong></span>
                        <span>Scope: <strong>{rep.records}</strong></span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs">
                      <span className="text-slate-400 font-mono">{rep.size}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => alert(`Exporting ${rep.title} as PDF...`)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[11px] flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>
                        <button
                          onClick={() => alert(`Exporting ${rep.title} as Excel CSV...`)}
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold rounded-xl text-[11px] flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5" />
                          <span>Excel</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 13. EXECUTIVE ANALYTICS SUITE */}
          {/* ========================================================================= */}
          {activePage === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
              <AnalyticsDashboard />
            </div>
          )}

          {/* ========================================================================= */}
          {/* 14. AUDIT LOGS */}
          {/* ========================================================================= */}
          {activePage === 'audit_logs' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-black text-xl text-slate-900 block">System Financial & Security Audit Trail</span>
                <div className="space-y-3 text-xs">
                  {auditLogsList.map(log => (
                    <div key={log.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-slate-900">{log.action}</div>
                        <div className="text-[11px] text-slate-500">By: {log.user} • IP: {log.ip}</div>
                      </div>
                      <span className="font-mono text-slate-400 text-[11px]">{log.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 15. COMMUNITY CONFIGURATION */}
          {/* ========================================================================= */}
          {activePage === 'community_config' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
                <span className="font-black text-xl text-slate-900 block">Society Bylaws & Maintenance Formula Configuration</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block">Maintenance Rate Calculation</span>
                    <div className="text-slate-600">Base Rate: <strong>₹ 3.50 per sq.ft / month</strong></div>
                    <div className="text-slate-600">Sinking Fund: <strong>₹ 500 per month</strong></div>
                    <div className="text-slate-600">GST Applicability: <strong>18% for bills &gt; ₹7,500/mo</strong></div>
                  </div>

                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block">RWA Society Registration & Banking</span>
                    <div className="text-slate-600">RWA Reg No: <strong>RWA/HYD/2024/8901</strong></div>
                    <div className="text-slate-600">GSTIN: <strong>36AAACG8901L1Z4</strong></div>
                    <div className="text-slate-600">Bank: <strong>HDFC Bank - Pocharam Branch</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: RESIDENT DETAILED KYC DOSSIER MODAL */}
      {/* ========================================================================= */}
      {selectedResidentDetail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-xl space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedResidentDetail(null)}
              className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center text-3xl shadow-xs shrink-0 border border-indigo-200">
                👩‍💼
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-2xl text-slate-900">{selectedResidentDetail.name}</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    KYC Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedResidentDetail.flat} • {selectedResidentDetail.tower} ({selectedResidentDetail.floor}) • {selectedResidentDetail.bhk}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Phone</span>
                <span className="font-bold text-slate-900">{selectedResidentDetail.phone}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address</span>
                <span className="font-bold text-slate-900 truncate block">{selectedResidentDetail.email}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Allocated Parking</span>
                <span className="font-bold text-indigo-700">{selectedResidentDetail.parking}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Vehicle & FastTag</span>
                <span className="font-mono font-bold text-slate-900 truncate block">{selectedResidentDetail.vehicle}</span>
              </div>
            </div>

            <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-200 text-xs space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Aadhaar KYC Token:</span>
                <span className="font-mono font-bold text-slate-900">{selectedResidentDetail.aadhaarKyc}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Maintenance Dues Status:</span>
                <span className={`font-bold ${selectedResidentDetail.dues.includes('Paid') ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {selectedResidentDetail.dues}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Household Staff Registered:</span>
                <span className="font-bold text-indigo-900">{selectedResidentDetail.helpersCount} Helpers Active</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  alert(`Payment reminder dispatched to ${selectedResidentDetail.name} via SMS & App Push!`);
                }}
                className="py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs cursor-pointer shadow-xs"
              >
                Send Dues Notice
              </button>

              <button
                onClick={() => {
                  alert(`Password reset link sent to ${selectedResidentDetail.email}!`);
                }}
                className="py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
              >
                Reset App Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CONTRACTOR DIGITAL ID BADGE MODAL - Light Theme */}
      {/* ========================================================================= */}
      {selectedStaffPassModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-6 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setSelectedStaffPassModal(null)}
              className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Digital ID Card - Clean Light Aesthetic */}
            <div className="bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 text-slate-900 p-6 rounded-3xl border border-indigo-200 shadow-sm space-y-4 text-center relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-indigo-100 pb-3 text-left">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block">
                    ASBL Springs ERP
                  </span>
                  <span className="font-bold text-xs text-slate-800">Authorized Contractor Pass</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold px-2 py-0.5 rounded text-[10px]">
                  ACTIVE PASS
                </span>
              </div>

              <div className="w-20 h-20 mx-auto rounded-2xl bg-indigo-100 text-indigo-900 border border-indigo-200 flex items-center justify-center text-4xl shadow-xs">
                👷
              </div>

              <div>
                <h4 className="font-black text-xl text-slate-900">{selectedStaffPassModal.name}</h4>
                <p className="text-xs text-indigo-600 font-bold">{selectedStaffPassModal.role}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{selectedStaffPassModal.company}</p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 text-left space-y-1.5 text-xs shadow-2xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Passcode:</span>
                  <span className="font-mono font-black text-indigo-700">{selectedStaffPassModal.passCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Gate Zone:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[170px]">{selectedStaffPassModal.gateAccess}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Aadhaar KYC:</span>
                  <span className="text-emerald-700 font-bold">Verified ✓</span>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-400 font-mono">
                Badge ID: {selectedStaffPassModal.id} • Valid Till: {selectedStaffPassModal.validTill}
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Security Pass for ${selectedStaffPassModal.name} sent to connected gate badge printer!`);
                setSelectedStaffPassModal(null);
              }}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print Physical Gate Badge</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
