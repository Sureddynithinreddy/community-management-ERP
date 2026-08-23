import React, { useState } from 'react';
import { SecurityPageId } from '../types/portalTypes';
import { SecurityAnalytics } from './SecurityAnalytics';
import { 
  ShieldCheck, UserCheck, Package, Car, Search, Flame, AlertTriangle, 
  Clock, HelpCircle, LayoutDashboard, ArrowLeft, Wifi, WifiOff, Camera, Check,
  Plus, CheckCircle2, XCircle, Phone, Download, QrCode, Sparkles, AlertCircle, ShieldAlert, LogOut, Menu, X
} from 'lucide-react';

interface SecurityPortalProps {
  onExit: () => void;
}

export const SecurityPortal: React.FC<SecurityPortalProps> = ({ onExit }) => {
  const [activePage, setActivePage] = useState<SecurityPageId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Network Offline Simulation
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [offlineQueue, setOfflineQueue] = useState<number>(0);

  // 1. Visitor Check-In / Check-Out Register (6 Live Entries)
  const [vName, setVName] = useState<string>('Rajesh Mehta');
  const [vPhone, setVPhone] = useState<string>('98765 12345');
  const [vFlat, setVFlat] = useState<string>('Flat A-402');
  const [vPurpose, setVPurpose] = useState<string>('Personal Guest');
  const [vVehicle, setVVehicle] = useState<string>('KA-05-MA-1234');

  const [visitorRegister, setVisitorRegister] = useState([
    { id: 'VIS-901', name: 'Rajesh Mehta', phone: '98765 12345', flat: 'Flat A-402', purpose: 'Guest', vehicle: 'KA-05-MA-1234', entryTime: '11:35 AM', exitTime: '--', status: 'Inside', photo: 'CAM-101.jpg' },
    { id: 'VIS-900', name: 'Sunita Devi (Maid)', phone: '98765 99887', flat: 'Flat A-402, B-102', purpose: 'Daily Maid', vehicle: 'Walk-in', entryTime: '09:15 AM', exitTime: '--', status: 'Inside', photo: 'CAM-099.jpg' },
    { id: 'VIS-899', name: 'Ramesh Kumar (Amazon)', phone: '98123 44556', flat: 'Flat B-102', purpose: 'Delivery', vehicle: 'KA-01-AZ-8812', entryTime: '11:20 AM', exitTime: '11:28 AM', status: 'Departed', photo: 'CAM-098.jpg' },
    { id: 'VIS-898', name: 'Plumber Ramesh', phone: '98345 66778', flat: 'Flat B-102', purpose: 'Service Tech', vehicle: 'KA-04-PL-1102', entryTime: '08:30 AM', exitTime: '10:45 AM', status: 'Departed', photo: 'CAM-095.jpg' },
    { id: 'VIS-897', name: 'Rahul Sharma (Swiggy)', phone: '98901 22334', flat: 'Flat C-301', purpose: 'Food Delivery', vehicle: 'KA-05-SW-4912', entryTime: '12:05 PM', exitTime: '12:12 PM', status: 'Departed', photo: 'CAM-092.jpg' },
    { id: 'VIS-896', name: 'Pooja Hegde', phone: '98123 99999', flat: 'Flat A-104', purpose: 'Pre-Approved Guest', vehicle: 'KA-01-PH-7711', entryTime: '01:30 PM', exitTime: '--', status: 'Inside', photo: 'CAM-090.jpg' },
  ]);

  // 2. Deliveries Log & Shelf Queue (5 Parcels)
  const [delCompany, setDelCompany] = useState<string>('Amazon Courier');
  const [delFlat, setDelFlat] = useState<string>('Flat B-102');
  const [delOrderNo, setDelOrderNo] = useState<string>('#AZ-9021');

  const [deliveryParcels, setDeliveryParcels] = useState([
    { id: 'PAR-101', courier: 'Amazon Courier', orderNo: '#AZ-9021', flat: 'Flat B-102', shelf: 'Shelf B-4', loggedTime: '11:20 AM', dwell: '1.2 Hours', status: 'Awaiting Pickup' },
    { id: 'PAR-102', courier: 'Swiggy InstaMart', orderNo: '#SW-4912', flat: 'Flat C-301', shelf: 'Cold Storage Locker #02', loggedTime: '11:32 AM', dwell: '45 Mins', status: 'Awaiting Pickup' },
    { id: 'PAR-103', courier: 'Zomato Food', orderNo: '#ZM-8812', flat: 'Flat A-402', shelf: 'Shelf A-1 (Hot Food)', loggedTime: '12:01 PM', dwell: '20 Mins', status: 'Awaiting Pickup' },
    { id: 'PAR-104', courier: 'Flipkart Logistics', orderNo: '#FK-1102', flat: 'Flat A-104', shelf: 'Shelf A-2', loggedTime: '09:45 AM', dwell: '3.1 Hours', status: 'Awaiting Pickup' },
    { id: 'PAR-099', courier: 'Blinkit Instant', orderNo: '#BK-5541', flat: 'Flat B-204', shelf: 'Shelf B-1', loggedTime: '08:15 AM', dwell: 'Picked Up', status: 'Picked Up' },
  ]);

  // 3. ANPR License Plate Scanner & Parking Violations
  const [plateQuery, setPlateQuery] = useState<string>('KA-03-MB-4921');
  const [plateSearchResult] = useState<{ plate: string; owner: string; flat: string; slot: string; type: string }>({
    plate: 'KA-03-MB-4921', owner: 'Ananya Sharma', flat: 'Flat A-402', slot: 'Parking Slot B-42', type: 'Resident Honda City'
  });

  const [flaggedVehicles, setFlaggedVehicles] = useState([
    { plate: 'MH-12-PQ-9988', flat: 'Flat B-102 Visitor', violation: 'Parked blocking Tower B Basement Ramp', severity: 'Critical', status: 'Warning Issued' },
    { plate: 'KA-05-AB-1234', flat: 'Flat C-301 Guest', violation: 'Overstayed visitor parking limit (6+ Hours)', severity: 'Moderate', status: 'Citation Logged' },
    { plate: 'KA-01-XY-9999', flat: 'Unauthorized Vehicle', violation: 'Entered without ANPR plate registration', severity: 'High', status: 'Under Inspection' },
  ]);

  // 4. Resident Verification Search
  const [searchFlat, setSearchFlat] = useState<string>('Flat A-402');
  const [verifiedResident] = useState({
    name: 'Ananya Sharma', flat: 'Flat A-402 (2BHK, Tower A)', status: 'Owner Verified', family: '3 Registered Members (Ananya, Rahul, Aarav)', vehicles: 'KA-03-MB-4921 (Honda City)', autoApprove: 'Enabled for Deliveries & Pre-Approved Guests'
  });

  // 5. Emergency SOS Console
  const [sosDispatched, setSosDispatched] = useState<boolean>(false);

  // 6. Incident Reporting Log
  const [incCategory, setIncCategory] = useState<string>('Parking Dispute');
  const [incDesc, setIncDesc] = useState<string>('Visitor car parked blocking Tower B basement ramp');
  const [incidentsList, setIncidentsList] = useState([
    { id: 'INC-8921', category: 'Parking Dispute', flat: 'Flat B-102', desc: 'Visitor car parked blocking basement ramp', loggedBy: 'Guard Vikram', status: 'Under Investigation', time: '10:45 AM' },
    { id: 'INC-8810', category: 'Noise Disturbance', flat: 'Flat C-401', desc: 'Loud music past 11 PM', loggedBy: 'Guard Suresh', status: 'Resolved', time: 'Yesterday' },
    { id: 'INC-8742', category: 'Pool Rules Violation', flat: 'Flat A-201', desc: 'Glass bottles brought to swimming pool deck', loggedBy: 'Guard Dinesh', status: 'Resolved', time: '19 Aug 2026' },
  ]);

  // 7. Guard Patrol Checkpoints
  const [patrolPoints, setPatrolPoints] = useState([
    { name: 'Checkpoint 1: Main Gate Outer Perimeter', scanned: true, time: '11:00 AM' },
    { name: 'Checkpoint 2: Tower A Basement Parking', scanned: true, time: '11:15 AM' },
    { name: 'Checkpoint 3: Clubhouse Back Entrance', scanned: false, time: '--' },
    { name: 'Checkpoint 4: Swimming Pool Deck', scanned: false, time: '--' },
  ]);

  // 8. Lost & Found Register
  const [foundItemName, setFoundItemName] = useState<string>('Hyundai Car Key Ring');
  const [foundLoc, setFoundLoc] = useState<string>('Swimming Pool Deck');
  const [lostFoundList, setLostFoundList] = useState([
    { id: 'LF-101', item: 'Hyundai Car Key Ring', loc: 'Swimming Pool Deck', date: 'Today 09:30 AM', status: 'Unclaimed' },
    { id: 'LF-098', item: 'Child Blue Bicycle', loc: 'Garden Play Area', date: '21 Aug 2026', status: 'Claimed by Flat B-201' },
    { id: 'LF-095', item: 'Leather Wallet with Cards', loc: 'Clubhouse Gym', date: '18 Aug 2026', status: 'Claimed by Flat C-301' },
    { id: 'LF-091', item: 'Ray-Ban Sunglasses', loc: 'Tennis Court 1', date: '14 Aug 2026', status: 'Unclaimed' },
  ]);

  // Action Handlers
  const handleCheckInVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `VIS-${Math.floor(900 + Math.random() * 100)}`;
    setVisitorRegister([
      { id: newId, name: vName, phone: vPhone, flat: vFlat, purpose: vPurpose, vehicle: vVehicle, entryTime: 'Just Now', exitTime: '--', status: 'Inside', photo: 'CAM-NEW.jpg' },
      ...visitorRegister
    ]);
    if (isOffline) setOfflineQueue(prev => prev + 1);
    alert(`Visitor ${vName} entry logged & resident notified!`);
  };

  const handleCheckOutVisitor = (id: string) => {
    setVisitorRegister(prev => prev.map(v => v.id === id ? { ...v, exitTime: 'Just Now', status: 'Departed' } : v));
    alert(`Visitor ${id} checked out! Exit timestamp logged.`);
  };

  const handleLogDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `PAR-${Math.floor(100 + Math.random() * 900)}`;
    setDeliveryParcels([
      { id: newId, courier: delCompany, orderNo: delOrderNo, flat: delFlat, shelf: 'Shelf B-4', loggedTime: 'Just Now', dwell: '0 Mins', status: 'Awaiting Pickup' },
      ...deliveryParcels
    ]);
    alert(`Delivery Parcel ${newId} logged at Gate Shelf B-4 for ${delFlat}!`);
  };

  const handlePickupParcel = (id: string) => {
    setDeliveryParcels(prev => prev.map(p => p.id === id ? { ...p, status: 'Picked Up', dwell: 'Picked Up' } : p));
  };

  const handleScanPatrol = (index: number) => {
    const updated = [...patrolPoints];
    updated[index].scanned = true;
    updated[index].time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setPatrolPoints(updated);
    alert(`Scanned Patrol Checkpoint: ${updated[index].name}!`);
  };

  const handleLogIncident = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `INC-${Math.floor(8900 + Math.random() * 100)}`;
    setIncidentsList([
      { id: newId, category: incCategory, flat: 'Flat B-102', desc: incDesc, loggedBy: 'Guard Vikram', status: 'Under Investigation', time: 'Just Now' },
      ...incidentsList
    ]);
    alert(`Incident ${newId} logged!`);
  };

  const handleLogLostItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `LF-${Math.floor(100 + Math.random() * 900)}`;
    setLostFoundList([
      { id: newId, item: foundItemName, loc: foundLoc, date: 'Today', status: 'Unclaimed' },
      ...lostFoundList
    ]);
    alert(`Lost Item ${newId} logged!`);
  };

  const handleClaimLostItem = (id: string) => {
    setLostFoundList(prev => prev.map(l => l.id === id ? { ...l, status: 'Claimed by Resident' } : l));
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard & Telemetry', icon: LayoutDashboard },
    { id: 'check_in_out', label: 'Check In/Out Visitors', icon: UserCheck },
    { id: 'log_deliveries', label: 'Log Deliveries', icon: Package },
    { id: 'delivery_mgmt', label: 'Delivery Management', icon: Package },
    { id: 'vehicle_mgmt', label: 'Vehicle Management', icon: Car },
    { id: 'resident_verification', label: 'Resident Verification', icon: Search },
    { id: 'emergency_sos', label: 'Emergency / SOS', icon: Flame },
    { id: 'incident_reporting', label: 'Incident Reporting', icon: AlertTriangle },
    { id: 'guard_shifts', label: 'Guard Shift Management', icon: Clock },
    { id: 'lost_and_found', label: 'Lost & Found', icon: HelpCircle },
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
            <div className="text-[9px] font-bold text-[#9DBEB2] uppercase tracking-widest">Security Terminal</div>
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
                Security Desk
              </div>
            </div>
          </div>

          <div className="bg-[#12241D] p-4 rounded-2xl border border-[#2A4C3F] flex items-center gap-3.5 shadow-inner">
            <div className="w-10 h-10 rounded-xl bg-[#1C352C] border border-[#2A4C3F] text-[#9DBEB2] font-bold text-sm flex items-center justify-center shadow-md">
              G1
            </div>
            <div>
              <div className="font-bold text-white text-xs">Vikram Singh</div>
              <div className="text-[11px] text-[#9DBEB2]">Gate 1 Main Entry</div>
            </div>
          </div>

          <nav className="space-y-1.5 max-h-[55vh] overflow-y-auto pr-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9DBEB2] px-2 block mb-2">
              Gate Functions
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id as SecurityPageId);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
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
            onClick={() => setIsOffline(!isOffline)}
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 ${
              isOffline ? 'bg-amber-600 text-white' : 'bg-[#12241D] text-[#9DBEB2] border border-[#2A4C3F]'
            }`}
          >
            {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4 text-[#627636]" />}
            <span>{isOffline ? 'Offline Mode' : 'Online Mode'}</span>
          </button>

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
        
        {/* PAGE 1: Dashboard */}
        {activePage === 'dashboard' && (
          <div className="space-y-6">
            {isOffline && (
              <div className="bg-amber-100 border border-amber-400 text-amber-900 p-4 rounded-2xl text-xs font-bold space-y-1">
                <div>⚠️ Gate Wi-Fi Disconnected Simulation Active</div>
                <div className="font-mono">SQLite Local Queue: {offlineQueue} Offline Records Pending Cloud Sync</div>
              </div>
            )}
            <SecurityAnalytics />
          </div>
        )}

        {/* PAGE 2: Check In / Out Visitors */}
        {activePage === 'check_in_out' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Check In / Out Visitors</div>
              <p className="text-xs text-slate-600 mt-1">Log new gate entries, send push approval to resident, and manage live visitors inside society</p>
            </div>
            
            <div className="modern-card p-5 sm:p-8 space-y-4">
              <span className="text-xs font-bold text-[#627636] uppercase tracking-wider block">
                1. New Visitor Entry Form & Camera Photo Capture
              </span>

              <form onSubmit={handleCheckInVisitor} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-[#172D25] block mb-1">Visitor Full Name</label>
                    <input type="text" required value={vName} onChange={(e) => setVName(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                  </div>
                  <div>
                    <label className="font-bold text-[#172D25] block mb-1">Mobile Number</label>
                    <input type="tel" required value={vPhone} onChange={(e) => setVPhone(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                  </div>
                  <div>
                    <label className="font-bold text-[#172D25] block mb-1">Target Flat Number</label>
                    <input type="text" required value={vFlat} onChange={(e) => setVFlat(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#172D25] block mb-1">Purpose of Visit</label>
                    <select value={vPurpose} onChange={(e) => setVPurpose(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]">
                      <option value="Personal Guest">Personal Guest</option>
                      <option value="Daily Maid / Cook">Daily Maid / Cook</option>
                      <option value="Service Technician">Service Technician</option>
                      <option value="Delivery Partner">Delivery Partner</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#172D25] block mb-1">Vehicle Plate Number (Optional)</label>
                    <input type="text" value={vVehicle} onChange={(e) => setVVehicle(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-[#627636] hover:bg-[#52632B] text-white serif-title text-xs tracking-wider rounded-xl shadow-lg">
                  {isOffline ? 'QUEUE ENTRY IN OFFLINE LOCAL STORAGE' : 'LOG ENTRY & SEND PUSH APPROVAL TO RESIDENT'}
                </button>
              </form>
            </div>

            <div className="modern-card p-5 sm:p-8 space-y-4">
              <span className="text-xs font-bold text-[#627636] uppercase tracking-wider block">
                2. Live Visitors Register ({visitorRegister.length} Visitors Logged Today)
              </span>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#DED8C8] text-slate-500 font-bold">
                      <th className="py-2">Visitor ID</th>
                      <th className="py-2">Visitor Name & Mobile</th>
                      <th className="py-2">Target Flat</th>
                      <th className="py-2">Purpose</th>
                      <th className="py-2">Check In</th>
                      <th className="py-2 text-right">Status / Check-OUT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DED8C8]">
                    {visitorRegister.map((v) => (
                      <tr key={v.id} className="text-slate-800">
                        <td className="py-3 font-mono font-bold text-[#172D25]">{v.id}</td>
                        <td className="py-3 font-bold">{v.name} ({v.phone})</td>
                        <td className="py-3 font-bold text-[#627636]">{v.flat}</td>
                        <td className="py-3">{v.purpose}</td>
                        <td className="py-3 font-mono text-slate-500">{v.entryTime}</td>
                        <td className="py-3 text-right">
                          {v.status === 'Inside' ? (
                            <button
                              onClick={() => handleCheckOutVisitor(v.id)}
                              className="px-3.5 py-1.5 bg-[#1C352C] text-white font-bold rounded-lg text-[11px] shadow flex items-center gap-1 ml-auto hover:bg-[#12241D]"
                            >
                              <LogOut className="w-3 h-3" /> Check-OUT
                            </button>
                          ) : (
                            <span className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full font-bold text-[10px]">
                              Departed ({v.exitTime})
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

        {/* PAGE 3: Log Deliveries */}
        {activePage === 'log_deliveries' && (
          <div className="space-y-6 max-w-xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Log Deliveries at Gate Desk</div>
            
            <div className="modern-card p-5 sm:p-8 space-y-4">
              <form onSubmit={handleLogDelivery} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[#172D25] block mb-1">Delivery Agency / Company</label>
                  <select value={delCompany} onChange={(e) => setDelCompany(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]">
                    <option value="Amazon Courier">Amazon Courier</option>
                    <option value="Zomato Food Delivery">Zomato Food Delivery</option>
                    <option value="Swiggy InstaMart">Swiggy InstaMart</option>
                    <option value="Flipkart Logistics">Flipkart Logistics</option>
                    <option value="Blinkit Instant">Blinkit Instant Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#172D25] block mb-1">Target Flat Number</label>
                  <input type="text" required value={delFlat} onChange={(e) => setDelFlat(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                </div>

                <div>
                  <label className="font-bold text-[#172D25] block mb-1">Order / Tracking ID</label>
                  <input type="text" value={delOrderNo} onChange={(e) => setDelOrderNo(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                </div>

                <button type="submit" className="w-full py-4 bg-[#1C352C] hover:bg-[#12241D] text-white serif-title text-xs tracking-wider rounded-xl shadow-lg">
                  LOG PARCEL PHOTO & ASSIGN GATE SHELF B-4
                </button>
              </form>
            </div>
          </div>
        )}

        {/* PAGE 4: Delivery Management Queue */}
        {activePage === 'delivery_mgmt' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Delivery Management & Gate Shelf Storage</div>
              <p className="text-xs text-slate-600 mt-1">Track parcels currently stored at Gate Desk shelves awaiting resident pickup</p>
            </div>

            <div className="modern-card p-5 sm:p-8 space-y-4">
              <span className="text-xs font-bold text-[#627636] uppercase tracking-wider block">
                Active Shelf Parcels Queue ({deliveryParcels.filter(p => p.status === 'Awaiting Pickup').length} Parcels Awaiting Pickup)
              </span>

              <div className="space-y-3 text-xs">
                {deliveryParcels.map((p) => (
                  <div key={p.id} className="bg-[#F6F3EC] p-5 rounded-2xl border border-[#DED8C8] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="font-bold text-[#172D25] text-base">{p.courier} ({p.orderNo})</div>
                      <div className="text-slate-600">
                        Target Flat: <strong className="text-[#172D25]">{p.flat}</strong> • Shelf Location: <strong className="text-[#627636]">{p.shelf}</strong>
                      </div>
                      <div className="text-slate-500 text-[11px]">Logged: {p.loggedTime} • Dwell Time: {p.dwell}</div>
                    </div>

                    {p.status === 'Awaiting Pickup' ? (
                      <button
                        onClick={() => handlePickupParcel(p.id)}
                        className="px-4 py-2.5 bg-[#627636] hover:bg-[#52632B] text-white font-bold rounded-xl shadow"
                      >
                        Mark Picked Up by Resident
                      </button>
                    ) : (
                      <span className="bg-[#1C352C] text-white px-3.5 py-1.5 rounded-full font-bold text-[10px]">
                        ✓ Picked Up
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 5: Vehicle Management */}
        {activePage === 'vehicle_mgmt' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Vehicle & Parking Management</div>
              <p className="text-xs text-slate-600 mt-1">ANPR License Plate Scanner, visitor vehicle registration, and parking violations log</p>
            </div>

            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <span className="font-bold text-[#627636] uppercase tracking-wider block">ANPR Plate Scanner Lookup</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={plateQuery}
                  onChange={(e) => setPlateQuery(e.target.value)}
                  className="flex-1 p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8] font-mono font-bold"
                />
                <button
                  onClick={() => alert(`ANPR Scan match found for plate ${plateQuery}!`)}
                  className="px-5 bg-[#627636] text-white font-bold rounded-xl shadow"
                >
                  Scan Plate
                </button>
              </div>

              {plateSearchResult && (
                <div className="bg-[#F6F3EC] p-5 rounded-2xl border border-[#DED8C8] space-y-2">
                  <div className="font-bold text-[#172D25] text-base">{plateSearchResult.plate} ({plateSearchResult.type})</div>
                  <div className="text-slate-700">Registered Owner: {plateSearchResult.owner} ({plateSearchResult.flat})</div>
                  <div className="text-[#627636] font-bold">Allocated Reserved Slot: {plateSearchResult.slot}</div>
                </div>
              )}
            </div>

            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <span className="font-bold text-red-700 uppercase tracking-wider block">Flagged Parking Violations Register ({flaggedVehicles.length} Cases)</span>
              <div className="space-y-3">
                {flaggedVehicles.map((fv) => (
                  <div key={fv.plate} className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#172D25] font-mono">{fv.plate} ({fv.flat})</div>
                      <div className="text-red-700 font-semibold">{fv.violation}</div>
                    </div>
                    <button
                      onClick={() => alert(`Warning & towing alert sent to owner of vehicle ${fv.plate}!`)}
                      className="px-3.5 py-1.5 bg-red-700 text-white font-bold rounded-lg"
                    >
                      Issue Warning
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 6: Resident Verification */}
        {activePage === 'resident_verification' && (
          <div className="space-y-6 max-w-xl">
            <div>
              <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Resident Identity Verification</div>
              <p className="text-xs text-slate-600 mt-1">Fast lookup of resident owner details, family members, and auto-approve preferences</p>
            </div>

            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchFlat}
                  onChange={(e) => setSearchFlat(e.target.value)}
                  className="flex-1 p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8] font-mono font-bold"
                />
                <button
                  onClick={() => alert(`Verified details for ${searchFlat}!`)}
                  className="px-5 bg-[#627636] text-white font-bold rounded-xl shadow"
                >
                  Lookup Flat
                </button>
              </div>

              {verifiedResident && (
                <div className="bg-[#F6F3EC] p-6 rounded-3xl border border-[#DED8C8] space-y-3">
                  <div className="serif-title text-2xl text-[#172D25]">{verifiedResident.name}</div>
                  <div className="text-slate-700 font-bold">{verifiedResident.flat}</div>
                  <div className="text-[#627636] font-bold">Status: {verifiedResident.status}</div>
                  <div className="text-slate-600">Family: {verifiedResident.family}</div>
                  <div className="text-slate-600">Vehicles: {verifiedResident.vehicles}</div>
                  <div className="bg-[#9DBEB2]/40 p-3 rounded-xl font-bold text-[#172D25] text-[11px]">
                    Preferences: {verifiedResident.autoApprove}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PAGE 7: Emergency SOS Console */}
        {activePage === 'emergency_sos' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Emergency SOS Receiver Console</div>
              <p className="text-xs text-slate-600 mt-1">Real-time alert receiver from resident panic buttons with immediate guard dispatch triggers</p>
            </div>

            <div className="modern-card p-5 sm:p-8 border-red-300 space-y-4 text-xs">
              <div className="bg-red-100 border border-red-300 p-6 rounded-3xl space-y-4 text-red-950">
                <div className="serif-title text-2xl text-red-900 flex items-center gap-2">
                  <Flame className="w-6 h-6 text-red-600 animate-pulse" />
                  🚨 LIVE PANIC SOS ALARM FROM FLAT A-402
                </div>
                
                <div className="font-bold text-sm">Resident: Ananya Sharma • Flat A-402 (Tower A, Level 4)</div>
                <p className="text-xs text-red-900">Triggered via Resident App Emergency Siren at 11:42 AM.</p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSosDispatched(true);
                      alert('Gate Guards dispatched to Flat A-402!');
                    }}
                    className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl shadow text-xs"
                  >
                    DISPATCH GATE GUARDS TO FLAT A-402
                  </button>

                  <button
                    onClick={() => alert('Calling Emergency Services (112)...')}
                    className="px-6 py-3 bg-[#1C352C] text-white font-bold rounded-xl shadow text-xs"
                  >
                    CALL EMERGENCY SERVICES (112 / 108)
                  </button>
                </div>

                {sosDispatched && (
                  <div className="bg-red-700 text-white p-3 rounded-xl text-center font-bold text-xs animate-pulse">
                    ✓ Guards Vikram & Suresh dispatched to Flat A-402 (Eta 1.5 mins)
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 8: Incident Reporting */}
        {activePage === 'incident_reporting' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Incident Reporting Log</div>
            
            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <form onSubmit={handleLogIncident} className="space-y-4">
                <div>
                  <label className="font-bold text-[#172D25] block mb-1">Incident Category</label>
                  <select value={incCategory} onChange={(e) => setIncCategory(e.target.value)} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]">
                    <option value="Parking Dispute">Parking Dispute</option>
                    <option value="Noise Disturbance">Noise Disturbance Past 11 PM</option>
                    <option value="Pool Rules Violation">Pool Rules Violation</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#172D25] block mb-1">Description</label>
                  <textarea value={incDesc} onChange={(e) => setIncDesc(e.target.value)} rows={3} className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                </div>

                <button type="submit" className="w-full py-3.5 bg-[#1C352C] text-white serif-title text-xs tracking-wider rounded-xl shadow-lg">
                  LOG INCIDENT & SEND REPORT TO COMMITTEE
                </button>
              </form>
            </div>

            <div className="modern-card p-5 sm:p-8 space-y-3 text-xs">
              <span className="font-bold text-[#627636]">Logged Incidents Directory ({incidentsList.length} Cases)</span>
              {incidentsList.map((inc) => (
                <div key={inc.id} className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] flex justify-between items-center">
                  <div>
                    <div className="font-bold text-[#172D25]">{inc.id} - {inc.category} ({inc.flat})</div>
                    <div className="text-slate-600">{inc.desc}</div>
                  </div>
                  <span className="bg-[#1C352C] text-white px-3 py-1 rounded-full font-bold text-[10px]">{inc.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 9: Guard Shifts & Patrol QR Scanner */}
        {activePage === 'guard_shifts' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Guard Shift Management & QR Patrols</div>
            
            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <span className="font-bold text-[#627636] uppercase tracking-wider block">Security Patrol Checkpoint QR Scanner</span>
              
              <div className="space-y-3">
                {patrolPoints.map((cp, idx) => (
                  <div key={cp.name} className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#172D25] text-sm">{cp.name}</div>
                      <div className="text-slate-600">{cp.scanned ? `Scanned at ${cp.time}` : 'Pending Scan'}</div>
                    </div>
                    {cp.scanned ? (
                      <span className="bg-[#627636] text-white px-3.5 py-1.5 rounded-xl font-bold text-[10px]">
                        ✓ Scanned
                      </span>
                    ) : (
                      <button onClick={() => handleScanPatrol(idx)} className="px-4 py-2 bg-[#1C352C] text-white font-bold rounded-xl shadow">
                        Scan QR Checkpoint
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 10: Lost & Found Register */}
        {activePage === 'lost_and_found' && (
          <div className="space-y-6 max-w-4xl">
            <div className="serif-title text-2xl sm:text-3xl text-[#172D25]">Lost & Found Register</div>
            
            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <span className="font-bold text-[#627636] uppercase tracking-wider block">Log Found Item</span>
              <form onSubmit={handleLogLostItem} className="space-y-3">
                <input type="text" required value={foundItemName} onChange={(e) => setFoundItemName(e.target.value)} placeholder="Item Description (e.g. Hyundai Car Key Ring)" className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                <input type="text" required value={foundLoc} onChange={(e) => setFoundLoc(e.target.value)} placeholder="Location Found (e.g. Swimming Pool Deck)" className="w-full p-3 bg-[#F6F3EC] rounded-xl border border-[#DED8C8]" />
                <button type="submit" className="w-full py-3 bg-[#627636] text-white serif-title text-xs tracking-wider rounded-xl shadow-lg">
                  LOG ITEM TO FOUND REGISTER
                </button>
              </form>
            </div>

            <div className="modern-card p-5 sm:p-8 space-y-4 text-xs">
              <span className="font-bold text-[#627636] uppercase tracking-wider block">Found Items Inventory Directory ({lostFoundList.length} Items)</span>
              <div className="space-y-3">
                {lostFoundList.map((lf) => (
                  <div key={lf.id} className="bg-[#F6F3EC] p-4 rounded-xl border border-[#DED8C8] flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#172D25] text-sm">{lf.item} ({lf.id})</div>
                      <div className="text-slate-600">Location: {lf.loc} • Logged: {lf.date}</div>
                    </div>
                    {lf.status === 'Unclaimed' ? (
                      <button onClick={() => handleClaimLostItem(lf.id)} className="px-3.5 py-1.5 bg-[#627636] text-white font-bold rounded-lg text-xs shadow">
                        Mark Claimed
                      </button>
                    ) : (
                      <span className="bg-[#1C352C] text-white px-3 py-1 rounded-full font-bold text-[10px]">{lf.status}</span>
                    )}
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
