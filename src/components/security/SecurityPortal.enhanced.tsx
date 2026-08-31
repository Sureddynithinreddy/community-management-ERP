import React, { useState } from 'react';
import { SecurityPageId } from '../../types/portalTypes';
import { 
  ShieldCheck, UserCheck, Package, Car, Search, Flame, AlertTriangle, 
  Clock, HelpCircle, LayoutDashboard, ArrowLeft, Wifi, WifiOff, Camera, 
  CheckCircle2, XCircle, Phone, QrCode, Activity, Bell, MapPin
} from 'lucide-react';
import { 
  Card, Badge, Button, Input, StatCard, Table, EmptyState, SearchBar,
  Modal, Tabs, PageHeader, Alert, ChartContainer, SimpleBarChart
} from '../shared';

interface SecurityPortalProps {
  onExit: () => void;
}

export const SecurityPortal: React.FC<SecurityPortalProps> = ({ onExit }) => {
  const [activePage, setActivePage] = useState<SecurityPageId>('dashboard');
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState(0);

  // Mock active visitors
  const activeVisitors = [
    { id: 'VIS-901', name: 'Rajesh Mehta', flat: 'A-402', purpose: 'Guest', entry: '11:35 AM', vehicle: 'KA-05-MA-1234', status: 'Inside' },
    { id: 'VIS-900', name: 'Sunita Devi', flat: 'A-402, B-102', purpose: 'Maid', entry: '09:15 AM', vehicle: '--', status: 'Inside' },
  ];

  const navItems = [
    { id: 'dashboard', label: 'Security Dashboard', icon: LayoutDashboard },
    { id: 'check_in_out', label: 'Visitor Check-In/Out', icon: UserCheck },
    { id: 'log_deliveries', label: 'Log Deliveries', icon: Package },
    { id: 'delivery_mgmt', label: 'Parcel Management', icon: Package },
    { id: 'vehicle_mgmt', label: 'Vehicle Registry', icon: Car },
    { id: 'resident_verification', label: 'Resident Lookup', icon: Search },
    { id: 'emergency_sos', label: 'Emergency SOS', icon: Flame },
    { id: 'incident_reporting', label: 'Incident Reports', icon: AlertTriangle },
    { id: 'guard_shifts', label: 'Patrol & Shifts', icon: Clock },
    { id: 'lost_and_found', label: 'Lost & Found', icon: HelpCircle },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
      
      {/* Enhanced Sidebar */}
      <aside className="w-full md:w-72 bg-gradient-to-b from-[#254238] to-[#1E372E] text-white p-4 border-r border-[#1E372E]/50 shrink-0 space-y-6">
        {/* Guard Profile */}
        <div className="border-b border-[#3A6657] pb-4 px-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#738743] to-[#5E7034] flex items-center justify-center font-bold text-xl shadow-lg">
              VS
            </div>
            <div className="flex-1">
              <div className="serif-title text-lg text-[#F8F5EE]">Vikram Singh</div>
              <div className="text-xs text-[#A3C3B7]">Gate 1 Station</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] mt-3">
            <div className="bg-[#738743]/20 px-2 py-1.5 rounded-lg text-center">
              <div className="font-bold text-[#F8F5EE]">Shift A</div>
              <div className="text-[#A3C3B7]">6 AM - 2 PM</div>
            </div>
            <div className="bg-green-600/20 px-2 py-1.5 rounded-lg text-center">
              <div className="font-bold text-green-300">ON DUTY</div>
              <div className="text-green-200">Active</div>
            </div>
          </div>
        </div>

        {/* Network Status */}
        <Card variant="glass" className="p-3 bg-[#3A6657]/30 border-[#3A6657]">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {isOffline ? (
                <WifiOff className="w-4 h-4 text-amber-300" />
              ) : (
                <Wifi className="w-4 h-4 text-green-300" />
              )}
              <span className="text-white font-medium">
                {isOffline ? 'Offline Mode' : 'Online'}
              </span>
            </div>
            <button
              onClick={() => {
                setIsOffline(!isOffline);
                if (!isOffline) setOfflineQueue(3);
              }}
              className="text-[#A3C3B7] hover:text-white transition-colors text-[10px] font-bold"
            >
              Toggle
            </button>
          </div>
          {isOffline && (
            <div className="mt-2 text-[10px] text-amber-300 font-bold">
              Queue: {offlineQueue} pending sync
            </div>
          )}
        </Card>

        {/* Navigation */}
        <nav className="space-y-1 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id as SecurityPageId)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left group ${
                  isActive
                    ? 'bg-[#738743] text-white shadow-lg'
                    : 'text-[#E5EFEC] hover:bg-[#3A6657]/40 hover:text-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActive ? 'bg-white/20' : 'bg-transparent group-hover:bg-white/10'
                }`}>
                  <Icon className="w-4 h-4 shrink-0" />
                </div>
                <span className="truncate flex-1">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-[#3A6657] space-y-2">
          <Button
            onClick={onExit}
            variant="ghost"
            size="sm"
            fullWidth
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
            className="text-white hover:bg-[#3A6657]/40 justify-start"
          >
            All Portals
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#F8F5EE] overflow-y-auto">
        
        {/* ================================================================= */}
        {/* DASHBOARD */}
        {/* ================================================================= */}
        {activePage === 'dashboard' && (
          <div className="p-6 space-y-6">
            <PageHeader
              title="Security Command Center"
              description="Gate 1 Main Entrance • Real-time monitoring"
              icon={ShieldCheck}
            />

            {/* Offline Warning */}
            {isOffline && (
              <Alert variant="warning" title="Offline Mode Active">
                Gate Wi-Fi disconnected. All entries are being queued locally. {offlineQueue} records pending cloud sync.
              </Alert>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Today's Entries"
                value="342"
                subtitle="Visitors + Deliveries"
                icon={UserCheck}
                color="success"
                trend={{ value: '12% vs yesterday', direction: 'up' }}
              />
              <StatCard
                title="Active Visitors"
                value={activeVisitors.length}
                subtitle="Currently inside"
                icon={Activity}
                color="primary"
              />
              <StatCard
                title="Pending Parcels"
                value="14"
                subtitle="Awaiting pickup"
                icon={Package}
                color="warning"
              />
              <StatCard
                title="Patrol Coverage"
                value="100%"
                subtitle="12/12 checkpoints"
                icon={CheckCircle2}
                color="success"
              />
            </div>

            {/* Live Activity Feed */}
            <Card variant="organic" className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="serif-title text-xl text-[#1E372E]">Live Gate Activity</h3>
                <Badge variant="success" icon={<Activity className="w-3 h-3 animate-pulse" />}>
                  Live
                </Badge>
              </div>
              
              <div className="space-y-3">
                {activeVisitors.map((visitor) => (
                  <div key={visitor.id} className="p-4 bg-[#F8F5EE] rounded-xl border border-[#DED8C8] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#738743]/20 flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-[#738743]" />
                      </div>
                      <div>
                        <div className="font-bold text-[#1E372E] text-sm">{visitor.name}</div>
                        <div className="text-xs text-[#698a7f]">
                          {visitor.flat} • {visitor.purpose} • Entry: {visitor.entry}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      icon={<CheckCircle2 className="w-4 h-4" />}
                    >
                      Check Out
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer
                title="Gate Traffic by Hour"
                subtitle="Today's entry pattern"
              >
                <SimpleBarChart
                  data={[
                    { hour: '6 AM', count: 45 },
                    { hour: '8 AM', count: 120 },
                    { hour: '10 AM', count: 85 },
                    { hour: '12 PM', count: 95 },
                    { hour: '2 PM', count: 110 },
                    { hour: '4 PM', count: 75 },
                    { hour: '6 PM', count: 140 },
                    { hour: '8 PM', count: 60 }
                  ]}
                  xKey="hour"
                  yKey="count"
                  height={250}
                />
              </ChartContainer>

              <Card variant="organic" className="p-6 space-y-4">
                <h3 className="serif-title text-xl text-[#1E372E]">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="primary" 
                    fullWidth
                    icon={<UserCheck className="w-4 h-4" />}
                    onClick={() => setActivePage('check_in_out')}
                  >
                    Check In Visitor
                  </Button>
                  <Button 
                    variant="secondary" 
                    fullWidth
                    icon={<Package className="w-4 h-4" />}
                    onClick={() => setActivePage('log_deliveries')}
                  >
                    Log Delivery
                  </Button>
                  <Button 
                    variant="outline" 
                    fullWidth
                    icon={<Car className="w-4 h-4" />}
                    onClick={() => setActivePage('vehicle_mgmt')}
                  >
                    Verify Vehicle
                  </Button>
                  <Button 
                    variant="outline" 
                    fullWidth
                    icon={<AlertTriangle className="w-4 h-4" />}
                    onClick={() => setActivePage('incident_reporting')}
                  >
                    Report Incident
                  </Button>
                </div>
              </Card>
            </div>

            {/* Emergency Alerts */}
            <Card variant="organic" className="p-6 space-y-4 border-2 border-red-300">
              <div className="flex items-center gap-3">
                <Flame className="w-6 h-6 text-red-600 animate-pulse" />
                <h3 className="serif-title text-xl text-[#1E372E]">Emergency SOS Monitor</h3>
              </div>
              <Alert variant="success">
                No active emergency alerts. All residents safe. Last patrol: 15 mins ago.
              </Alert>
            </Card>
          </div>
        )}

        {/* Placeholder for other pages */}
        {activePage !== 'dashboard' && (
          <div className="p-6 space-y-6">
            <PageHeader
              title={navItems.find(item => item.id === activePage)?.label || 'Page'}
              description="Enhanced security operations interface"
              icon={navItems.find(item => item.id === activePage)?.icon || Activity}
            />
            <EmptyState
              icon={ShieldCheck}
              title="Feature Under Development"
              description={`The ${navItems.find(item => item.id === activePage)?.label} section is being enhanced for faster, more efficient security operations.`}
            />
          </div>
        )}

      </main>

    </div>
  );
};
