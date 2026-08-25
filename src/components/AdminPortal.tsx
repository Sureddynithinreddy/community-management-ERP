import React, { useState } from 'react';
import { 
  LayoutDashboard, ShieldCheck, Users, FileText, TrendingUp, UserCheck, 
  AlertTriangle, Flame, Calendar, Wrench, Megaphone, Receipt, Shield, 
  Settings, Building2, ArrowLeft, CheckCircle2, Download, Plus, Search,
  Clock, DollarSign, Check, ChevronRight, Sparkles, Filter, Phone, Mail, MapPin, Eye, Zap, ShieldAlert, X, Trash2, Send, AlertCircle, Key, Lock, QrCode, Menu, LogOut,
  BarChart3, RefreshCw, BadgeCheck, Bell, Smartphone, ArrowUpRight, CheckSquare,
  HelpCircle, CreditCard, PieChart, Activity
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
  | 'audit_logs'
  | 'community_config'
  | 'analytics';

export const AdminPortal: React.FC<AdminPortalProps> = ({ onExit }) => {
  const [activePage, setActivePage] = useState<AdminPageId>('dashboard');

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

  // 2. Manage Residents (12 Flats Directory)
  const [resSearch, setResSearch] = useState<string>('');
  const [residentsDirectory] = useState([
    { flat: 'Flat B-108', name: 'Ananya Sharma', phone: '98765 11111', type: 'Primary Owner', bhk: '2BHK (1250 sqft)', members: 3, vehicle: 'KA-03-MB-4921 (Honda City)', parking: 'Slot B-42', dues: '₹ 4,766 (Due)' },
    { flat: 'Flat A-402', name: 'Rajesh Mehta', phone: '98765 12345', type: 'Owner', bhk: '3BHK (1850 sqft)', members: 3, vehicle: 'KA-05-MA-1234 (Creta)', parking: 'Slot A-12', dues: '₹ 0 (Paid)' },
    { flat: 'Flat C-301', name: 'Suresh Menon', phone: '98901 22334', type: 'Tenant', bhk: '3BHK (1700 sqft)', members: 4, vehicle: 'TS-09-GA-1002 (Brezza)', parking: 'Slot C-08', dues: '₹ 0 (Paid)' },
    { flat: 'Flat A-104', name: 'Pooja Hegde', phone: '98123 99999', type: 'Owner', bhk: '1BHK (850 sqft)', members: 1, vehicle: 'KA-01-PH-7711 (Seltos)', parking: 'Slot A-04', dues: '₹ 3,200 (Due)' },
    { flat: 'Flat B-204', name: 'Rohan Deshmukh', phone: '98990 11223', type: 'Owner', bhk: '2BHK (1300 sqft)', members: 3, vehicle: 'KA-04-MN-9012 (Swift)', parking: 'Slot B-24', dues: '₹ 0 (Paid)' },
    { flat: 'Flat C-502', name: 'Dr. Alok Nath', phone: '98765 66666', type: 'Owner', bhk: 'Penthouse (2800 sqft)', members: 5, vehicle: 'KA-01-AL-0001 (BMW 3)', parking: 'Slot C-01 & C-02', dues: '₹ 0 (Paid)' },
    { flat: 'Flat A-201', name: 'Vikramaditya Roy', phone: '98765 77777', type: 'Owner', bhk: '3BHK (1750 sqft)', members: 4, vehicle: 'KA-03-VR-8888 (Harrier)', parking: 'Slot A-21', dues: '₹ 5,200 (Due)' },
    { flat: 'Flat B-405', name: 'Neha Kapoor', phone: '98765 88888', type: 'Tenant', bhk: '2BHK (1200 sqft)', members: 2, vehicle: 'KA-05-NK-4321 (i20)', parking: 'Slot B-45', dues: '₹ 0 (Paid)' },
    { flat: 'Flat C-101', name: 'Siddharth Nair', phone: '98765 99999', type: 'Owner', bhk: '2BHK (1350 sqft)', members: 3, vehicle: 'KA-02-SN-1122 (Seltos)', parking: 'Slot C-11', dues: '₹ 0 (Paid)' },
    { flat: 'Flat A-303', name: 'Meenakshi Iyer', phone: '98765 00000', type: 'Owner', bhk: '3BHK (1600 sqft)', members: 4, vehicle: 'KA-03-MI-9900 (Nexon)', parking: 'Slot A-33', dues: '₹ 0 (Paid)' },
    { flat: 'Flat B-501', name: 'Arjun Das', phone: '98111 44332', type: 'Tenant', bhk: '3BHK (1680 sqft)', members: 3, vehicle: 'KA-01-AD-7766 (Thar)', parking: 'Slot B-51', dues: '₹ 0 (Paid)' },
    { flat: 'Flat C-202', name: 'Kavita Menon', phone: '98222 55443', type: 'Owner', bhk: '2BHK (1280 sqft)', members: 2, vehicle: 'KA-04-KM-3322 (Kiger)', parking: 'Slot C-22', dues: '₹ 0 (Paid)' },
  ]);

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
  const [staffMobile, setStaffMobile] = useState<string>('98123 99887');
  const [staffAadhaar, setStaffAadhaar] = useState<string>('4012-9012-8841');
  const [staffGateAccess, setStaffGateAccess] = useState<string>('Gate 1 & Gate 2 Access');

  const [staffCredentialsList, setStaffCredentialsList] = useState([
    { id: 'STF-101', name: 'Ramesh Pawar', company: 'AquaClean Pool Services', role: 'Pool Maintenance Supervisor', mobile: '98123 99887', username: 'ramesh.aquaclean', passCode: 'GH-8921-X', gateAccess: 'Gate 1 & Gate 2', status: 'Active Credentials', aadhaar: 'VERIFIED ✓' },
    { id: 'STF-098', name: 'Suresh Electrician', company: 'GreenHaven Facilities', role: 'Chief Electrician', mobile: '98765 00998', username: 'suresh.elec', passCode: 'GH-4102-Y', gateAccess: 'All Towers Access', status: 'Active Credentials', aadhaar: 'VERIFIED ✓' },
    { id: 'STF-092', name: 'OTIS Technician Alok', company: 'OTIS Elevator Services', role: 'Elevator Maintenance Engineer', mobile: '98345 11223', username: 'alok.otis', passCode: 'GH-7711-Z', gateAccess: 'Tower A, B, C Lifts', status: 'Active Credentials', aadhaar: 'VERIFIED ✓' },
  ]);

  const [vendorList] = useState([
    { name: 'OTIS Elevator Services Pvt Ltd', scope: 'Annual AMC for 6 Elevators (Towers A, B, C)', cost: '₹ 1,20,000 / year', status: 'Active (Valid till Jan 2027)' },
    { name: 'GreenShield Security Agency', scope: '12 Security Guards (Round-the-clock 3 Shifts)', cost: '₹ 2,40,000 / month', status: 'Active (Valid till Dec 2026)' },
    { name: 'CleanPro Housekeeping Services', scope: '8 Housekeeping Cleaners & Waste Management', cost: '₹ 95,000 / month', status: 'Active (Valid till Nov 2026)' },
    { name: 'AquaClean Swimming Pool Services', scope: 'Daily Chemical Balancing & Pool Cleaning', cost: '₹ 25,000 / month', status: 'Active (Valid till Mar 2027)' },
  ]);

  // 11. Audit Logs
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
    const newId = `STF-${Math.floor(100 + Math.random() * 900)}`;
    const username = `${staffName.toLowerCase().split(' ')[0]}.${staffCompany.toLowerCase().split(' ')[0]}`;
    const passCode = `GH-${Math.floor(1000 + Math.random() * 9000)}-PASS`;
    setStaffCredentialsList([{ id: newId, name: staffName, company: staffCompany, role: staffRole, mobile: staffMobile, username: username, passCode: passCode, gateAccess: staffGateAccess, status: 'Active Credentials', aadhaar: 'VERIFIED ✓' }, ...staffCredentialsList]);
    alert(`Credentials issued for ${staffName}!`);
  };

  const handleRevokeStaffCredentials = (id: string, name: string) => {
    setStaffCredentialsList(prev => prev.map(s => s.id === id ? { ...s, status: 'Revoked / Suspended' } : s));
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

  const unpaidCount = flatsBillingStatus.filter(f => f.status === 'Unpaid').length;
  const pendingAmenityCount = amenityApprovals.filter(a => a.status === 'Pending Approval').length;
  const activeGuardsCount = guardsList.filter(g => g.status.includes('Active')).length;

  const navMenuItems = [
    { id: 'dashboard', label: 'Executive Command Dashboard', icon: LayoutDashboard },
    { id: 'manage_guards', label: 'Manage Guards & Rosters', icon: ShieldCheck, badge: `${activeGuardsCount} On Shift`, badgeColor: 'bg-emerald-100 text-emerald-800' },
    { id: 'manage_residents', label: 'Residents & Flats Directory', icon: Users, badge: `${residentsDirectory.length} Flats`, badgeColor: 'bg-slate-100 text-slate-700' },
    { id: 'billing_fees', label: 'Billing & Maintenance Fees', icon: Receipt, badge: `${unpaidCount} Overdue`, badgeColor: 'bg-amber-100 text-amber-900 font-bold' },
    { id: 'notices', label: 'Notice Board & Circulars', icon: Megaphone, badge: `${publishedNotices.length} Live`, badgeColor: 'bg-indigo-100 text-indigo-800' },
    { id: 'amenity_mgmt', label: 'Amenity & Hall Bookings', icon: Calendar, badge: `${pendingAmenityCount} Pending`, badgeColor: 'bg-rose-100 text-rose-800 font-bold' },
    { id: 'maintenance_mgmt', label: 'Maintenance & AMC Assets', icon: Wrench },
    { id: 'visitor_mgmt', label: 'Gate Visitor Management', icon: UserCheck },
    { id: 'incident_mgmt', label: 'Incident Investigation Desk', icon: AlertTriangle, badge: `${incidentsList.filter(i => i.status !== 'Resolved').length} Open`, badgeColor: 'bg-rose-100 text-rose-800' },
    { id: 'emergency_mgmt', label: 'Emergency Protocols & Drills', icon: Flame },
    { id: 'staff_vendor', label: 'Staff & Vendor Credentials', icon: Building2 },
    { id: 'audit_logs', label: 'Audit Trail & Access Logs', icon: Shield },
    { id: 'community_config', label: 'Community Bylaw & Formula', icon: Settings },
    { id: 'analytics', label: 'Society Analytics Suite', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans antialiased flex flex-col selection:bg-[#0F172A] selection:text-white">
      
      {/* ========================================================================= */}
      {/* TOP DESKTOP HEADER BAR */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200 px-6 sm:px-10 py-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand & Admin Station Identifier */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-900 p-0.5 shadow-sm flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-xl">
                <span>🏛️</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl text-slate-900 tracking-tight">RWA Management Committee</span>
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded-full font-bold">Admin Console</span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                ASBL Springs, Pocharam • Society Operations & Governance ERP
              </div>
            </div>
          </div>

          {/* Quick Actions & Exit */}
          <div className="flex items-center gap-3">
            
            {/* Quick Broadcast Notice Button */}
            <button
              onClick={() => {
                setActivePage('notices');
              }}
              className="hidden sm:flex px-4 py-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 font-bold text-xs items-center gap-1.5 cursor-pointer"
            >
              <Megaphone className="w-4 h-4 text-indigo-600" />
              <span>+ Broadcast Notice</span>
            </button>

            {/* Quick Generate Bill Button */}
            <button
              onClick={() => {
                setActivePage('billing_fees');
              }}
              className="hidden sm:flex px-4 py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold text-xs items-center gap-1.5 cursor-pointer"
            >
              <Receipt className="w-4 h-4 text-emerald-600" />
              <span>Generate Dues</span>
            </button>

            <button
              onClick={onExit}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 text-xs font-bold shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Exit to Gateway</span>
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
                setActivePage('notices');
              }}
              className="w-full p-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Megaphone className="w-4 h-4" />
              <span>+ Post Community Notice</span>
            </button>

            <button
              onClick={() => {
                setActivePage('billing_fees');
              }}
              className="w-full p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl flex items-center justify-center gap-2 border border-slate-200 transition-transform active:scale-95 cursor-pointer"
            >
              <Receipt className="w-4 h-4 text-indigo-600" />
              <span>+ Issue Monthly Invoices</span>
            </button>
          </div>

          {/* Society Financial & Occupancy Telemetry Box */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 rounded-3xl shadow-sm space-y-3 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 block">
              Society Financial Health
            </span>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-white/10 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-300 block">Dues Collected</span>
                <span className="text-lg font-black text-emerald-300">₹ 14.8 L</span>
              </div>
              <div className="bg-white/10 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-300 block">Occupancy</span>
                <span className="text-lg font-black text-white">96.4%</span>
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
              
              {/* Top Hero Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-inner shrink-0">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-black text-2xl text-white">Society Executive Command & Governance</h2>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        FY 2026-27 Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">Real-time financial audits, security rosters, resident accounts, AMC contracts, and facilities governance</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 relative z-10">
                  <button
                    onClick={() => setActivePage('billing_fees')}
                    className="px-5 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Receipt className="w-4 h-4 fill-slate-950" />
                    <span>Manage Billing & Dues</span>
                  </button>

                  <button
                    onClick={() => setActivePage('notices')}
                    className="px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl text-xs shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
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
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-slate-900">Society Resident & Flat Ownership Directory</h2>
                    <p className="text-xs text-slate-500 mt-1">Complete unit directory, registered owners, vehicle whitelist, parking slots, and dues status</p>
                  </div>
                </div>

                <div className="w-full sm:w-72 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search flat, name, vehicle..."
                    value={resSearch}
                    onChange={(e) => setResSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold">
                      <th className="py-3">Flat & Tower</th>
                      <th className="py-3">Primary Owner / Tenant</th>
                      <th className="py-3">Configuration</th>
                      <th className="py-3">Registered Vehicle</th>
                      <th className="py-3">Allocated Parking</th>
                      <th className="py-3 text-right">Maintenance Dues</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {residentsDirectory
                      .filter(r => r.flat.toLowerCase().includes(resSearch.toLowerCase()) || r.name.toLowerCase().includes(resSearch.toLowerCase()) || r.vehicle.toLowerCase().includes(resSearch.toLowerCase()))
                      .map(r => (
                        <tr key={r.flat} className="hover:bg-slate-50">
                          <td className="py-3.5 font-bold text-slate-900">{r.flat}</td>
                          <td className="py-3.5">
                            <div className="font-bold text-slate-900">{r.name}</div>
                            <div className="text-[11px] text-slate-500">{r.phone} • {r.type}</div>
                          </td>
                          <td className="py-3.5 text-slate-600">{r.bhk}</td>
                          <td className="py-3.5 font-mono text-slate-700">{r.vehicle}</td>
                          <td className="py-3.5 font-bold text-indigo-700">{r.parking}</td>
                          <td className="py-3.5 text-right">
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              r.dues.includes('Paid') ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {r.dues}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. BILLING & MAINTENANCE FEES ENGINE */}
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
          {/* 11. STAFF & VENDOR CREDENTIALS */}
          {activePage === 'staff_vendor' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <span className="font-black text-xl text-slate-900 block">External Vendor AMC Contracts & Digital Credentials</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {vendorList.map((v, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="font-bold text-sm text-slate-900">{v.name}</div>
                      <div className="text-slate-600">{v.scope}</div>
                      <div className="font-mono font-bold text-indigo-700">{v.cost}</div>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold inline-block mt-1">
                        {v.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 12. AUDIT LOGS */}
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
          {/* 13. COMMUNITY CONFIGURATION */}
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

          {/* ========================================================================= */}
          {/* 14. SOCIETY ANALYTICS SUITE */}
          {activePage === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
              <AnalyticsDashboard />
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
