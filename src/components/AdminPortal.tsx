import React, { useState } from 'react';
import { AdminPageId } from '../types/portalTypes';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { 
  LayoutDashboard, ShieldCheck, Users, FileText, TrendingUp, UserCheck, 
  AlertTriangle, Flame, Calendar, Wrench, Megaphone, Receipt, Shield, 
  Settings, Building2, ArrowLeft, CheckCircle2, Download, Plus, Search,
  Clock, DollarSign, Check, ChevronRight, Sparkles, Filter, Phone, Mail, MapPin, Eye, Zap, ShieldAlert, X, Trash2, Send, AlertCircle, Key, Lock, QrCode, Menu
} from 'lucide-react';

interface AdminPortalProps {
  onExit: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onExit }) => {
  const [activePage, setActivePage] = useState<AdminPageId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
    { flat: 'Flat A-402', name: 'Ananya Sharma', phone: '98765 11111', type: 'Owner', bhk: '2BHK (1250 sqft)', members: 3, vehicle: 'KA-03-MB-4921 (Honda City)', parking: 'Slot B-42', dues: '₹ 4,766 (Due)' },
    { flat: 'Flat B-102', name: 'Rohan Mehta', phone: '98765 22222', type: 'Tenant', bhk: '3BHK (1650 sqft)', members: 2, vehicle: 'MH-12-PQ-9988 (Creta)', parking: 'Slot B-12', dues: '₹ 0 (Paid)' },
    { flat: 'Flat C-301', name: 'Sunita Rao', phone: '98765 33333', type: 'Owner', bhk: '3BHK (1700 sqft)', members: 4, vehicle: 'KA-05-AB-1234 (Baleno)', parking: 'Slot C-08', dues: '₹ 0 (Paid)' },
    { flat: 'Flat A-104', name: 'Kabir Verma', phone: '98765 44444', type: 'Owner', bhk: '1BHK (850 sqft)', members: 1, vehicle: 'KA-01-XY-5678 (Ather EV)', parking: 'Slot A-14', dues: '₹ 3,200 (Due)' },
    { flat: 'Flat B-204', name: 'Priya Sundaram', phone: '98765 55555', type: 'Tenant', bhk: '2BHK (1300 sqft)', members: 3, vehicle: 'KA-04-MN-9012 (Swift)', parking: 'Slot B-24', dues: '₹ 0 (Paid)' },
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
    { id: 'VIS-901', name: 'Rajesh Mehta', flat: 'Flat A-402', gate: 'Gate 1 Main', type: 'Guest', entry: '11:35 AM', exit: '--', status: 'Inside' },
    { id: 'VIS-900', name: 'Ramesh Kumar (Amazon)', flat: 'Flat B-102', gate: 'Gate 1 Main', type: 'Delivery', entry: '11:20 AM', exit: '11:28 AM', status: 'Departed' },
    { id: 'VIS-899', name: 'Plumber Ramesh', flat: 'Flat B-102', gate: 'Gate 2 Rear', type: 'Service', entry: '08:30 AM', exit: '10:45 AM', status: 'Departed' },
    { id: 'VIS-898', name: 'Sunita Devi (Maid)', flat: 'Flat A-402, B-102', gate: 'Gate 1 Main', type: 'Daily Help', entry: '09:15 AM', exit: '--', status: 'Inside' },
    { id: 'VIS-897', name: 'Rahul Sharma (Swiggy)', flat: 'Flat C-301', gate: 'Gate 1 Main', type: 'Delivery', entry: '12:05 PM', exit: '12:12 PM', status: 'Departed' },
    { id: 'VIS-896', name: 'Pooja Hegde', flat: 'Flat A-104', gate: 'Gate 1 Main', type: 'Guest Pass', entry: '01:30 PM', exit: '--', status: 'Inside' },
  ]);

  // 4. Incident Management
  const [incidentsList, setIncidentsList] = useState([
    { id: 'INC-8921', category: 'Parking Dispute', flat: 'Flat B-102', desc: 'Visitor car parked blocking basement ramp', loggedBy: 'Guard Vikram', severity: 'High', status: 'Under Investigation', time: '10:45 AM' },
    { id: 'INC-8810', category: 'Noise Disturbance', flat: 'Flat C-401', desc: 'Loud music past 11 PM', loggedBy: 'Guard Suresh', severity: 'Medium', status: 'Resolved', time: 'Yesterday' },
    { id: 'INC-8742', category: 'Pool Rules Violation', flat: 'Flat A-201', desc: 'Glass bottles brought to swimming pool deck', loggedBy: 'Guard Dinesh', severity: 'High', status: 'Resolved', time: '19 Aug 2026' },
  ]);

  // 5. Emergency Management
  const [broadcastActive, setBroadcastActive] = useState<boolean>(false);
  const [drillType, setDrillType] = useState<string>('Fire Drill');

  // 6. Amenity Management
  const [amenityApprovals, setAmenityApprovals] = useState([
    { id: 'AP-201', resident: 'Sunita Rao (Flat C-301)', amenity: 'Clubhouse Banquet Hall', date: '15 Sept 2026', event: 'Birthday Party (100 Guests)', status: 'Pending Approval' },
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
  const [selectedTargetFlat, setSelectedTargetFlat] = useState<string>('Flat A-402 (Ananya Sharma)');
  const [customBillAmount, setCustomBillAmount] = useState<string>('4766');
  const [billNote, setBillNote] = useState<string>('August 2026 Monthly Maintenance Dues');
  const [billingFilter, setBillingFilter] = useState<'all' | 'paid' | 'unpaid'>('all');

  const [flatsBillingStatus, setFlatsBillingStatus] = useState([
    { flat: 'Flat A-402', resident: 'Ananya Sharma', phone: '98765 11111', bhk: '2BHK', amount: '₹ 4,766', status: 'Unpaid', dueDate: '31 Aug 2026', receiptNo: '--', mode: '--' },
    { flat: 'Flat B-102', resident: 'Rohan Mehta', phone: '98765 22222', bhk: '3BHK', amount: '₹ 5,800', status: 'Paid', dueDate: '31 Aug 2026', receiptNo: 'GST-9012', mode: 'UPI Autopay (05 Aug)' },
    { flat: 'Flat C-301', resident: 'Sunita Rao', phone: '98765 33333', bhk: '3BHK', amount: '₹ 5,950', status: 'Paid', dueDate: '31 Aug 2026', receiptNo: 'GST-8812', mode: 'Netbanking (04 Aug)' },
    { flat: 'Flat A-104', resident: 'Kabir Verma', phone: '98765 44444', bhk: '1BHK', amount: '₹ 3,200', status: 'Unpaid', dueDate: '31 Aug 2026', receiptNo: '--', mode: '--' },
    { flat: 'Flat B-204', resident: 'Priya Sundaram', phone: '98765 55555', bhk: '2BHK', amount: '₹ 4,900', status: 'Paid', dueDate: '31 Aug 2026', receiptNo: 'GST-7711', mode: 'Credit Card (02 Aug)' },
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

  // Audit Logs
  const [auditLogsList] = useState([
    { id: 'LOG-8812', user: 'Ramesh Chandra (Treasurer)', action: 'Updated maintenance billing formula to ₹3.50/sq.ft + 18% GST', timestamp: 'Today 11:30 AM', ip: '192.168.1.45' },
    { id: 'LOG-8811', user: 'Vikram Singh (Guard)', action: 'Logged Amazon courier entry pass for Flat A-402', timestamp: 'Today 11:20 AM', ip: '192.168.1.102' },
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

  const navItems = [
    { id: 'dashboard', label: 'Dashboard & Analytics', icon: LayoutDashboard },
    { id: 'manage_guards', label: 'Manage Guards', icon: ShieldCheck },
    { id: 'manage_residents', label: 'Manage Residents', icon: Users },
    { id: 'view_reports', label: 'View Reports', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'visitor_mgmt', label: 'Visitor Management', icon: UserCheck },
    { id: 'incident_mgmt', label: 'Incident Management', icon: AlertTriangle },
    { id: 'emergency_mgmt', label: 'Emergency Management', icon: Flame },
    { id: 'amenity_mgmt', label: 'Amenity Management', icon: Calendar },
    { id: 'maintenance_mgmt', label: 'Maintenance Management', icon: Wrench },
    { id: 'notices', label: 'Notice / Announcements', icon: Megaphone },
    { id: 'billing_fees', label: 'Billing / Maintenance Fees', icon: Receipt },
    { id: 'audit_logs', label: 'Audit Logs', icon: Shield },
    { id: 'community_config', label: 'Community Config', icon: Settings },
    { id: 'staff_vendor', label: 'Staff & Vendor Credentials', icon: Building2 },
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
            <div className="text-[9px] font-bold text-[#9DBEB2] uppercase tracking-widest">Admin Committee</div>
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
                Admin ERP Committee
              </div>
            </div>
          </div>

          <div className="bg-[#12241D] p-4 rounded-2xl border border-[#2A4C3F] flex items-center gap-3.5 shadow-inner">
            <div className="w-10 h-10 rounded-xl bg-[#627636] text-white font-bold text-sm flex items-center justify-center shadow-md">
              RC
            </div>
            <div>
              <div className="font-bold text-white text-xs">Ramesh Chandra</div>
              <div className="text-[11px] text-[#9DBEB2]">RWA Treasurer • Officer</div>
            </div>
          </div>

          <nav className="space-y-1.5 max-h-[55vh] overflow-y-auto pr-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9DBEB2] px-2 block mb-2">
              Management Function Pages
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id as AdminPageId);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-[#627636] text-white shadow-lg font-bold'
                      : 'text-[#E4EFEA] hover:bg-[#2A4C3F]/50 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#9DBEB2]'}`} />
                  <span className="truncate">{item.label}</span>
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
        
        {/* PAGE 1 & 5: Dashboard & Analytics */}
        {(activePage === 'dashboard' || activePage === 'analytics') && (
          <AnalyticsDashboard />
        )}

        {/* PAGE 2: Manage Guards */}
        {activePage === 'manage_guards' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Manage Security Guards & Shift Roster</div>
            
            <div className="modern-card p-5 sm:p-8 space-y-4">
              <span className="text-xs font-bold text-[#627636] uppercase tracking-wider block">Add New Security Guard Account</span>
              <form onSubmit={handleAddGuard} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#172D25] block mb-1">Guard Full Name</label>
                    <input type="text" required value={guardName} onChange={(e) => setGuardName(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                  </div>
                  <div>
                    <label className="font-bold text-[#172D25] block mb-1">Phone Number</label>
                    <input type="text" required value={guardPhone} onChange={(e) => setGuardPhone(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 bg-[#627636] hover:bg-[#52632B] text-white serif-title text-xs tracking-wider rounded-xl shadow-lg">
                  ADD GUARD TO SECURITY ROSTER
                </button>
              </form>
            </div>

            <div className="modern-card p-5 sm:p-8 space-y-4">
              <span className="text-xs font-bold text-[#627636] uppercase tracking-wider block">Security Roster Directory ({guardsList.length} Guards)</span>
              <div className="space-y-3 text-xs">
                {guardsList.map((g) => (
                  <div key={g.id} className="bg-[#F6F3EC] p-4 rounded-2xl border border-[#DED8C8] flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#172D25] text-sm">{g.name} ({g.id})</div>
                      <div className="text-slate-600">{g.station} • {g.shift} • Phone: {g.phone}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#627636] text-white px-2 py-0.5 rounded font-bold text-[10px]">{g.Aadhaar}</span>
                      <span className="text-amber-800 font-bold">{g.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 3: Manage Residents */}
        {activePage === 'manage_residents' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Manage Residents Master Directory</div>
            
            <div className="modern-card p-5 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="text-xs font-bold text-[#627636] uppercase tracking-wider">
                  250 Flat Master Registry Database ({residentsDirectory.length} Directory View)
                </span>
                <input
                  type="text"
                  placeholder="Search by flat or name..."
                  value={resSearch}
                  onChange={(e) => setResSearch(e.target.value)}
                  className="p-2.5 bg-[#F6F3EC] text-xs rounded-xl border border-[#DED8C8] w-full sm:w-64"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#DED8C8] text-slate-500 font-bold">
                      <th className="py-2">Flat No</th>
                      <th className="py-2">Resident Name</th>
                      <th className="py-2">Phone</th>
                      <th className="py-2">Type</th>
                      <th className="py-2">Unit Size</th>
                      <th className="py-2">Vehicle Plate</th>
                      <th className="py-2 text-right">Dues Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DED8C8]">
                    {residentsDirectory.filter(r => 
                      r.flat.toLowerCase().includes(resSearch.toLowerCase()) || 
                      r.name.toLowerCase().includes(resSearch.toLowerCase())
                    ).map((res) => (
                      <tr key={res.flat} className="text-slate-800">
                        <td className="py-3 font-bold font-mono text-[#172D25]">{res.flat}</td>
                        <td className="py-3 font-bold">{res.name}</td>
                        <td className="py-3 text-slate-500 font-mono">{res.phone}</td>
                        <td className="py-3">{res.type}</td>
                        <td className="py-3">{res.bhk}</td>
                        <td className="py-3 font-mono">{res.vehicle}</td>
                        <td className="py-3 text-right font-bold text-[#627636]">{res.dues}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 4: View Reports */}
        {activePage === 'view_reports' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Financial & Audit Reports</div>
            
            <div className="modern-card p-5 sm:p-8 space-y-4">
              <span className="text-xs font-bold text-[#627636] uppercase tracking-wider block">
                CA Audit Ledgers & Financial Statements
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#F6F3EC] p-5 rounded-2xl border border-[#DED8C8] space-y-2">
                  <FileText className="w-6 h-6 text-[#627636]" />
                  <div className="font-bold text-[#172D25] text-sm">FY 2025-26 Annual Audit Balance Sheet</div>
                  <p className="text-slate-600">CA-Verified Income & Expense Ledger Statement</p>
                  <button onClick={() => alert('Downloading CA_Audit_BalanceSheet_2025.pdf...')} className="px-4 py-2 bg-[#627636] text-white font-bold rounded-xl shadow flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                </div>

                <div className="bg-[#F6F3EC] p-5 rounded-2xl border border-[#DED8C8] space-y-2">
                  <FileText className="w-6 h-6 text-[#1C352C]" />
                  <div className="font-bold text-[#172D25] text-sm">August 2026 GST Return Filing</div>
                  <p className="text-slate-600">GST Registration #29AAAAA0000A1Z5 Statement</p>
                  <button onClick={() => alert('Downloading GST_Return_Aug2026.pdf...')} className="px-4 py-2 bg-[#1C352C] text-white font-bold rounded-xl shadow flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> Download GST File
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 6: Visitor Management */}
        {activePage === 'visitor_mgmt' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Visitor Analytics & Gate Register Log</div>
            
            <div className="modern-card p-5 sm:p-8 space-y-4">
              <span className="text-xs font-bold text-[#627636] uppercase tracking-wider block">Today Gate Visitors Log ({adminVisitorLogs.length} Recent Logged)</span>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#DED8C8] text-slate-500 font-bold">
                      <th className="py-2">Visitor ID</th>
                      <th className="py-2">Visitor Name & Type</th>
                      <th className="py-2">Host Flat</th>
                      <th className="py-2">Gate Station</th>
                      <th className="py-2">Check In</th>
                      <th className="py-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DED8C8]">
                    {adminVisitorLogs.map((v) => (
                      <tr key={v.id} className="text-slate-800">
                        <td className="py-3 font-mono font-bold">{v.id}</td>
                        <td className="py-3 font-bold">{v.name} ({v.type})</td>
                        <td className="py-3 font-bold">{v.flat}</td>
                        <td className="py-3">{v.gate}</td>
                        <td className="py-3">{v.entry}</td>
                        <td className="py-3 text-right">
                          <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] ${v.status === 'Inside' ? 'bg-[#627636] text-white' : 'bg-[#1C352C] text-white'}`}>
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

        {/* PAGE 7: Incident Management */}
        {activePage === 'incident_mgmt' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Incident Management Console</div>
            
            <div className="modern-card p-5 sm:p-8 space-y-4">
              <span className="text-xs font-bold text-[#627636] uppercase tracking-wider block">Security & RWA Incident Log ({incidentsList.length} Cases)</span>
              <div className="space-y-3 text-xs">
                {incidentsList.map((inc) => (
                  <div key={inc.id} className="bg-[#F6F3EC] p-4 rounded-2xl border border-[#DED8C8] flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#172D25] text-sm">{inc.id} - {inc.category} ({inc.flat})</div>
                      <div className="text-slate-600">{inc.desc} • Logged by {inc.loggedBy} ({inc.time})</div>
                    </div>
                    {inc.status === 'Under Investigation' ? (
                      <button onClick={() => handleResolveIncident(inc.id)} className="px-4 py-2 bg-[#627636] text-white font-bold rounded-xl shadow">
                        Mark Resolved
                      </button>
                    ) : (
                      <span className="bg-[#1C352C] text-white px-3 py-1 rounded-full font-bold">✓ Resolved</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 8: Emergency Management */}
        {activePage === 'emergency_mgmt' && (
          <div className="space-y-6 max-w-xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Emergency Management Broadcast</div>
            
            <div className="modern-card p-5 sm:p-8 border-red-300 space-y-4 text-xs">
              <span className="text-xs font-bold text-red-700 uppercase tracking-wider block">RWA Emergency Siren Console</span>
              
              <div className="space-y-2">
                <label className="font-bold text-[#172D25]">Select Drill Type:</label>
                <select value={drillType} onChange={(e) => setDrillType(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]">
                  <option value="Fire Drill">Fire Alarm Drill</option>
                  <option value="Gas Leakage Alert">Piped Gas Leakage Alert</option>
                  <option value="Security Intrusion">Security Intrusion Lockdown</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setBroadcastActive(true);
                  alert(`HIGH PRIORITY ${drillType.toUpperCase()} SIREN BROADCAST SENT!`);
                }}
                className="w-full py-4 bg-red-700 hover:bg-red-800 text-white serif-title text-xs tracking-wider rounded-xl shadow-lg"
              >
                BROADCAST {drillType.toUpperCase()} SIREN TO ALL 250 FLATS
              </button>
              
              {broadcastActive && (
                <div className="bg-red-100 border border-red-400 p-4 rounded-xl text-center font-bold text-red-900 animate-pulse">
                  🚨 High Priority Emergency Broadcast ({drillType}) Active across Resident Apps & Gate Desks!
                </div>
              )}
            </div>
          </div>
        )}

        {/* PAGE 9: Amenity Management */}
        {activePage === 'amenity_mgmt' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Amenity Approvals</div>
            
            <div className="modern-card p-5 sm:p-8 space-y-4">
              <span className="text-xs font-bold text-[#627636] uppercase tracking-wider block">Resident Banquet & Event Approvals</span>
              <div className="space-y-3 text-xs">
                {amenityApprovals.map((a) => (
                  <div key={a.id} className="bg-[#F6F3EC] p-4 rounded-2xl border border-[#DED8C8] flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#172D25]">{a.amenity} ({a.date})</div>
                      <div className="text-slate-600">Reserved by: {a.resident} • Event: {a.event}</div>
                    </div>
                    {a.status === 'Pending Approval' ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleAmenityDecision(a.id, 'Approved')} className="px-3 py-1.5 bg-[#627636] text-white font-bold rounded-lg">Approve</button>
                        <button onClick={() => handleAmenityDecision(a.id, 'Rejected')} className="px-3 py-1.5 bg-[#1C352C] text-white font-bold rounded-lg">Reject</button>
                      </div>
                    ) : (
                      <span className="bg-[#627636] text-white px-3 py-1 rounded-full font-bold text-[10px]">{a.status}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 10: Maintenance Management */}
        {activePage === 'maintenance_mgmt' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Infrastructure Maintenance</div>
            
            <div className="modern-card p-5 sm:p-8 space-y-3 text-xs">
              <span className="font-bold text-[#627636] uppercase tracking-wider block">8 Society Infrastructure Assets</span>
              {assetsList.map((asset) => (
                <div key={asset.name} className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <div className="font-bold text-[#172D25] text-sm">{asset.name}</div>
                    <div className="text-slate-600">Vendor: {asset.vendor} • Next Maintenance: {asset.nextService}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#627636]">Health: {asset.health}</span>
                    <span className="bg-[#627636] text-white px-3 py-1 rounded-full font-bold text-[10px]">{asset.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 11: Notice Board */}
        {activePage === 'notices' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Notice Publisher</div>
            
            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <form onSubmit={handlePostNotice} className="space-y-4">
                <input type="text" required value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} placeholder="Title" className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                <textarea value={noticeBody} onChange={(e) => setNoticeBody(e.target.value)} rows={3} placeholder="Body Description" className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                <button type="submit" className="w-full py-3.5 bg-[#627636] text-white serif-title text-xs tracking-wider rounded-xl shadow-lg">
                  POST NOTICE & PUSH TO ALL APPS
                </button>
              </form>
            </div>

            <div className="modern-card p-5 sm:p-8 space-y-3 text-xs">
              <span className="font-bold text-[#627636] block">Posted Notices ({publishedNotices.length} Circulars)</span>
              {publishedNotices.map((n) => (
                <div key={n.id} className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] flex justify-between items-center">
                  <div>
                    <div className="font-bold text-[#172D25]">{n.title} ({n.id})</div>
                    <div className="text-slate-600">{n.body}</div>
                  </div>
                  <button onClick={() => handleDeleteNotice(n.id, n.title)} className="p-2 bg-red-100 text-red-700 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 12: Billing & Maintenance Fees Engine */}
        {activePage === 'billing_fees' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Billing & Maintenance Engine</div>
            
            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <span className="font-bold text-[#627636] uppercase tracking-wider block">Issue Invoice to Flat</span>
              <form onSubmit={handleIssueCustomBill} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <select value={selectedTargetFlat} onChange={(e) => setSelectedTargetFlat(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]">
                    {flatsBillingStatus.map(f => (
                      <option key={f.flat} value={`${f.flat} (${f.resident})`}>{f.flat} - {f.resident}</option>
                    ))}
                  </select>
                  <input type="number" required value={customBillAmount} onChange={(e) => setCustomBillAmount(e.target.value)} placeholder="Amount ₹" className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                  <input type="text" value={billNote} onChange={(e) => setBillNote(e.target.value)} placeholder="Bill Note" className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                </div>
                <button type="submit" className="w-full py-3.5 bg-[#627636] text-white serif-title text-xs tracking-wider rounded-xl shadow-lg">
                  ISSUE INVOICE & SEND PUSH NOTIFICATION
                </button>
              </form>
            </div>

            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#627636]">Payment Status Tracker</span>
                <div className="flex gap-2">
                  <button onClick={() => setBillingFilter('all')} className={`px-3 py-1 rounded-lg ${billingFilter === 'all' ? 'bg-[#627636] text-white' : 'bg-[#F6F3EC]'}`}>All</button>
                  <button onClick={() => setBillingFilter('paid')} className={`px-3 py-1 rounded-lg ${billingFilter === 'paid' ? 'bg-[#627636] text-white' : 'bg-[#F6F3EC]'}`}>Paid</button>
                  <button onClick={() => setBillingFilter('unpaid')} className={`px-3 py-1 rounded-lg ${billingFilter === 'unpaid' ? 'bg-[#627636] text-white' : 'bg-[#F6F3EC]'}`}>Unpaid</button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#DED8C8] text-slate-500 font-bold">
                      <th className="py-2">Flat</th>
                      <th className="py-2">Resident</th>
                      <th className="py-2">Amount</th>
                      <th className="py-2">Payment Details</th>
                      <th className="py-2 text-right">Status / Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DED8C8]">
                    {flatsBillingStatus.filter(f => billingFilter === 'all' ? true : billingFilter === 'paid' ? f.status === 'Paid' : f.status === 'Unpaid').map((f) => (
                      <tr key={f.flat} className="text-slate-800">
                        <td className="py-3 font-mono font-bold">{f.flat}</td>
                        <td className="py-3 font-bold">{f.resident}</td>
                        <td className="py-3 font-bold text-[#172D25]">{f.amount}</td>
                        <td className="py-3 text-slate-600">{f.status === 'Paid' ? `Receipt #${f.receiptNo} (${f.mode})` : 'Pending Payment'}</td>
                        <td className="py-3 text-right">
                          {f.status === 'Paid' ? (
                            <span className="bg-[#627636] text-white px-3 py-1 rounded-full font-bold text-[10px]">✓ Paid</span>
                          ) : (
                            <button onClick={() => handleSendPaymentReminder(f.flat, f.resident)} className="px-3 py-1 bg-red-700 text-white font-bold rounded text-[10px] ml-auto">Send Reminder</button>
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

        {/* PAGE 13: Audit Logs */}
        {activePage === 'audit_logs' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">System Audit Trail Logs</div>
            <div className="modern-card p-5 sm:p-8 space-y-3 text-xs">
              <span className="font-bold text-[#627636] block">Timestamped Audit Log Trail</span>
              {auditLogsList.map((log) => (
                <div key={log.id} className="bg-[#F6F3EC] p-3.5 rounded-xl border border-[#DED8C8] flex justify-between items-center">
                  <div>
                    <div className="font-bold text-[#172D25]">{log.user} ({log.id})</div>
                    <div className="text-slate-600">{log.action}</div>
                  </div>
                  <div className="text-right shrink-0 font-mono text-slate-500">{log.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 14: Community Config */}
        {activePage === 'community_config' && (
          <div className="space-y-6 max-w-xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Community Configuration</div>
            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <div className="font-bold text-[#172D25]">Society Legal & Tax Setup</div>
              <div className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] space-y-2">
                <div>Name: <strong>Green Haven Sanctuary RWA</strong></div>
                <div>GSTIN: <strong>29AAAAA0000A1Z5</strong></div>
                <div>Registration No: <strong>RWA/KA/BNG/2021/9012</strong></div>
                <div>Towers: <strong>3 Towers (Tower A, B, C) • 250 Units</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 15: Staff & Vendor Management */}
        {activePage === 'staff_vendor' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Staff & Vendor Credentials Management</div>
            <p className="text-xs text-slate-600">Issue digital access credentials & login passcodes to new staff members and vendors working in the community</p>

            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <span className="font-bold text-[#627636] uppercase tracking-wider block">1. Issue Login Credentials to Staff / Vendor</span>
              <form onSubmit={handleIssueStaffCredentials} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input type="text" required value={staffName} onChange={(e) => setStaffName(e.target.value)} placeholder="Staff Name" className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                  <input type="text" required value={staffCompany} onChange={(e) => setStaffCompany(e.target.value)} placeholder="Company" className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                  <input type="text" required value={staffRole} onChange={(e) => setStaffRole(e.target.value)} placeholder="Role" className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                </div>
                <button type="submit" className="w-full py-4 bg-[#627636] text-white serif-title text-xs tracking-wider rounded-xl shadow-lg">
                  ISSUE LOGIN CREDENTIALS & DISPATCH SMS
                </button>
              </form>
            </div>

            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <span className="font-bold text-[#627636] uppercase tracking-wider block">2. Active Staff & Vendor Credentials Vault ({staffCredentialsList.length} Accounts)</span>
              <div className="space-y-3">
                {staffCredentialsList.map((s) => (
                  <div key={s.id} className="bg-[#F6F3EC] p-4 rounded-2xl border border-[#DED8C8] flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#172D25] text-base">{s.name} ({s.role})</div>
                      <div className="text-slate-600">Username: <strong className="font-mono text-[#172D25]">{s.username}</strong> • Passcode: <strong className="font-mono text-[#627636]">{s.passCode}</strong></div>
                    </div>
                    <button onClick={() => handleRevokeStaffCredentials(s.id, s.name)} className="px-3.5 py-1.5 bg-red-100 text-red-800 font-bold rounded-xl text-xs">
                      Revoke Credentials
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <span className="font-bold text-[#627636] uppercase tracking-wider block">3. Active Society Vendor AMC Contracts</span>
              <div className="space-y-3">
                {vendorList.map((v) => (
                  <div key={v.name} className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#172D25]">{v.name}</div>
                      <div className="text-slate-600">{v.scope} • Cost: <strong>{v.cost}</strong></div>
                    </div>
                    <span className="bg-[#627636] text-white px-3 py-1 rounded-full font-bold text-[10px]">{v.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
