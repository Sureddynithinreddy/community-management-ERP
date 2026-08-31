import React, { useState } from 'react';
import { AdminPageId } from '../../types/portalTypes';
import { 
  LayoutDashboard, ShieldCheck, Users, FileText, TrendingUp, UserCheck, 
  AlertTriangle, Flame, Calendar, Wrench, Megaphone, Receipt, Shield, 
  Settings, Building2, ArrowLeft, CheckCircle2, Download, Plus,
  Clock, DollarSign, Package, Car, Home, Bell, Eye, Edit, Trash2,
  UserPlus, MapPin, Phone, Mail, Activity, Zap, RefreshCw, Search, Filter
} from 'lucide-react';
import { 
  Card, Badge, Button, Input, StatCard, Table, EmptyState, SearchBar,
  Modal, Tabs, PageHeader, Alert, ChartContainer, SimpleLineChart,
  SimpleBarChart, SimplePieChart
} from '../shared';
import { generateMockData, mockResidents, mockGuards, mockComplaints, mockVisitors, mockVehicles, mockIncidents, mockNotices, mockAmenities } from '../../utils/mockData';

interface AdminPortalProps {
  onExit: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onExit }) => {
  const [activePage, setActivePage] = useState<AdminPageId>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');

  const mockData = generateMockData();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: '#738743' },
    { id: 'residents', label: 'Residents', icon: Users, color: '#254238' },
    { id: 'guards', label: 'Security Guards', icon: ShieldCheck, color: '#738743' },
    { id: 'buildings', label: 'Buildings & Units', icon: Building2, color: '#254238' },
    { id: 'visitors', label: 'Visitor Management', icon: UserCheck, color: '#738743' },
    { id: 'vehicles', label: 'Vehicle Registry', icon: Car, color: '#254238' },
    { id: 'incidents', label: 'Incident Reports', icon: AlertTriangle, color: '#738743' },
    { id: 'emergency', label: 'Emergency Management', icon: Flame, color: '#254238' },
    { id: 'amenities', label: 'Amenity Management', icon: Calendar, color: '#738743' },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench, color: '#254238' },
    { id: 'complaints', label: 'Complaints', icon: Bell, color: '#738743' },
    { id: 'notices', label: 'Announcements', icon: Megaphone, color: '#254238' },
    { id: 'billing', label: 'Billing & Fees', icon: Receipt, color: '#738743' },
    { id: 'reports', label: 'Reports & Analytics', icon: TrendingUp, color: '#254238' },
    { id: 'audit', label: 'Audit Logs', icon: Shield, color: '#738743' },
    { id: 'settings', label: 'Settings', icon: Settings, color: '#254238' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
      
      {/* Enhanced Sidebar */}
      <aside className="w-full md:w-72 bg-gradient-to-b from-[#254238] to-[#1E372E] text-white p-4 border-r border-[#1E372E]/50 shrink-0 space-y-6">
        {/* User Profile Section */}
        <div className="border-b border-[#3A6657] pb-4 px-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-[#738743] flex items-center justify-center font-bold text-lg">
              RC
            </div>
            <div className="flex-1">
              <div className="serif-title text-lg text-[#F8F5EE]">Ramesh Chandra</div>
              <div className="text-xs text-[#A3C3B7]">RWA Treasurer</div>
            </div>
          </div>
          <div className="flex gap-2 text-[10px] mt-2">
            <span className="px-2 py-1 bg-[#738743]/30 rounded text-[#A3C3B7] font-bold">Committee Member</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id as AdminPageId)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left group ${
                  isActive
                    ? 'bg-[#738743] text-white shadow-lg scale-[1.02]'
                    : 'text-[#E5EFEC] hover:bg-[#3A6657]/40 hover:text-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActive ? 'bg-white/20' : 'bg-transparent group-hover:bg-white/10'
                }`}>
                  <Icon className="w-4 h-4 shrink-0" />
                </div>
                <span className="truncate flex-1">{item.label}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-[#3A6657] space-y-2">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            className="text-white hover:bg-[#3A6657]/40 justify-start"
          >
            Sync Data
          </Button>
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

      {/* Main Content Area */}
      <main className="flex-1 bg-[#F8F5EE] overflow-y-auto">
        
        {/* ================================================================= */}
        {/* DASHBOARD PAGE */}
        {/* ================================================================= */}
        {activePage === 'dashboard' && (
          <div className="p-6 space-y-6">
            <PageHeader
              title="Admin Control Center"
              description="Real-time operational and financial analytics dashboard"
              icon={LayoutDashboard}
              actions={
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    icon={<Download className="w-4 h-4" />}
                  >
                    Export Report
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    icon={<Plus className="w-4 h-4" />}
                  >
                    Quick Action
                  </Button>
                </>
              }
            />

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Residents"
                value="250"
                subtitle="Across 3 towers"
                icon={Users}
                color="primary"
                trend={{ value: '5 new this month', direction: 'up' }}
              />
              <StatCard
                title="Gate Entries Today"
                value="342"
                subtitle="Visitors + Deliveries"
                icon={UserCheck}
                color="success"
                trend={{ value: '12% vs yesterday', direction: 'up' }}
              />
              <StatCard
                title="Monthly Collections"
                value="₹14.2L"
                subtitle="88.4% collected"
                icon={DollarSign}
                color="success"
                trend={{ value: '221 of 250 flats', direction: 'neutral' }}
              />
              <StatCard
                title="Active Complaints"
                value="4"
                subtitle="1 overdue SLA"
                icon={AlertTriangle}
                color="warning"
                trend={{ value: 'Avg resolution: 1h 15m', direction: 'neutral' }}
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer
                title="Visitor Traffic Trends"
                subtitle="Monthly visitor and delivery entries"
              >
                <SimpleBarChart
                  data={mockData.visitorTraffic}
                  xKey="month"
                  yKey="visitors"
                  height={250}
                />
              </ChartContainer>

              <ChartContainer
                title="Complaint Distribution"
                subtitle="By category (Last 30 days)"
              >
                <SimplePieChart
                  data={mockData.complaintsByCategory}
                  nameKey="name"
                  valueKey="value"
                  height={250}
                />
              </ChartContainer>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card variant="organic" className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="serif-title text-xl text-[#1E372E]">Recent Activity</h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="space-y-3">
                  {[
                    { time: '2 mins ago', text: 'Vikram Singh logged visitor entry for Flat A-402', icon: UserCheck, color: '#738743' },
                    { time: '15 mins ago', text: 'New complaint raised: Plumbing issue at B-102', icon: AlertTriangle, color: '#f59e0b' },
                    { time: '1 hour ago', text: 'Ananya Sharma paid maintenance bill via UPI', icon: DollarSign, color: '#738743' },
                    { time: '2 hours ago', text: 'Emergency SOS resolved at Flat C-301', icon: Flame, color: '#dc2626' },
                  ].map((activity, i) => {
                    const ActivityIcon = activity.icon;
                    return (
                      <div key={i} className="flex items-start gap-3 p-3 bg-[#F8F5EE] rounded-xl border border-[#DED8C8]">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${activity.color}20` }}
                        >
                          <ActivityIcon className="w-4 h-4" style={{ color: activity.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#1E372E] font-medium">{activity.text}</p>
                          <p className="text-xs text-[#698a7f] mt-0.5">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card variant="organic" className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="serif-title text-xl text-[#1E372E]">System Alerts</h3>
                  <Badge variant="warning">3 Active</Badge>
                </div>
                <div className="space-y-3">
                  <Alert variant="warning" title="SLA Breach Alert">
                    Complaint #TK-9018 has exceeded expected resolution time. Immediate action required.
                  </Alert>
                  <Alert variant="info" title="Billing Cycle Reminder">
                    Monthly billing engine scheduled to run in 2 days. Review rate configuration.
                  </Alert>
                  <Alert variant="success" title="Patrol Checkpoints">
                    All 12 security patrol checkpoints completed successfully today.
                  </Alert>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* RESIDENTS PAGE */}
        {/* ================================================================= */}
        {activePage === 'residents' && (
          <div className="p-6 space-y-6">
            <PageHeader
              title="Resident Management"
              description="Complete directory of 250 residential units"
              icon={Users}
              actions={
                <>
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search by flat or name..."
                    className="w-64"
                  />
                  <Button 
                    variant="primary" 
                    size="md"
                    icon={<UserPlus className="w-4 h-4" />}
                    onClick={() => setShowAddModal(true)}
                  >
                    Add Resident
                  </Button>
                </>
              }
            />

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Card variant="organic" className="p-4 text-center space-y-2">
                <div className="serif-title text-2xl text-[#254238]">250</div>
                <div className="text-xs text-[#698a7f] font-medium">Total Units</div>
              </Card>
              <Card variant="organic" className="p-4 text-center space-y-2">
                <div className="serif-title text-2xl text-[#738743]">218</div>
                <div className="text-xs text-[#698a7f] font-medium">Owners</div>
              </Card>
              <Card variant="organic" className="p-4 text-center space-y-2">
                <div className="serif-title text-2xl text-[#254238]">32</div>
                <div className="text-xs text-[#698a7f] font-medium">Tenants</div>
              </Card>
              <Card variant="organic" className="p-4 text-center space-y-2">
                <div className="serif-title text-2xl text-[#738743]">245</div>
                <div className="text-xs text-[#698a7f] font-medium">Verified</div>
              </Card>
            </div>

            {/* Residents Table */}
            <Table
              data={mockResidents.filter(r => 
                r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.flat.toLowerCase().includes(searchQuery.toLowerCase())
              )}
              columns={[
                { key: 'flat', header: 'Flat No', render: (item) => (
                  <div className="font-bold font-mono text-[#254238]">{item.flat}</div>
                )},
                { key: 'name', header: 'Resident Name', render: (item) => (
                  <div>
                    <div className="font-bold text-[#1E372E]">{item.name}</div>
                    <div className="text-xs text-[#698a7f]">{item.phone}</div>
                  </div>
                )},
                { key: 'type', header: 'Type', render: (item) => (
                  <Badge variant={item.type === 'Owner' ? 'primary' : 'info'} size="sm">
                    {item.type}
                  </Badge>
                )},
                { key: 'bhk', header: 'Unit', render: (item) => item.bhk },
                { key: 'members', header: 'Members', render: (item) => (
                  <span className="text-[#254238] font-bold">{item.members}</span>
                )},
                { key: 'vehicle', header: 'Vehicle', render: (item) => (
                  <span className="font-mono text-xs">{item.vehicle}</span>
                )},
                { key: 'status', header: 'Status', align: 'right', render: (item) => (
                  <Badge variant="success" size="sm" icon={<CheckCircle2 className="w-3 h-3" />}>
                    {item.status}
                  </Badge>
                )},
              ]}
              onRowClick={(item) => console.log('View resident:', item)}
            />
          </div>
        )}

        {/* ================================================================= */}
        {/* GUARDS PAGE */}
        {/* ================================================================= */}
        {activePage === 'guards' && (
          <div className="p-6 space-y-6">
            <PageHeader
              title="Security Guards Management"
              description="Guard roster, shifts, and attendance tracking"
              icon={ShieldCheck}
              actions={
                <Button 
                  variant="primary" 
                  size="md"
                  icon={<Plus className="w-4 h-4" />}
                >
                  Add Guard
                </Button>
              }
            />

            {/* Shift Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card variant="organic" className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#698a7f] font-bold uppercase">Shift A</div>
                    <div className="serif-title text-xl text-[#254238]">6 AM - 2 PM</div>
                  </div>
                  <Badge variant="success">2 Active</Badge>
                </div>
                <div className="text-xs text-[#698a7f]">Gate 1, Clubhouse</div>
              </Card>

              <Card variant="organic" className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#698a7f] font-bold uppercase">Shift B</div>
                    <div className="serif-title text-xl text-[#254238]">2 PM - 10 PM</div>
                  </div>
                  <Badge variant="warning">1 Scheduled</Badge>
                </div>
                <div className="text-xs text-[#698a7f]">Gate 2</div>
              </Card>

              <Card variant="organic" className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#698a7f] font-bold uppercase">Shift C</div>
                    <div className="serif-title text-xl text-[#254238]">10 PM - 6 AM</div>
                  </div>
                  <Badge variant="neutral">1 Off Duty</Badge>
                </div>
                <div className="text-xs text-[#698a7f]">Night Patrol</div>
              </Card>
            </div>

            {/* Guards Table */}
            <Table
              data={mockGuards}
              columns={[
                { key: 'id', header: 'Guard ID', render: (item) => (
                  <span className="font-mono font-bold text-[#254238]">{item.id}</span>
                )},
                { key: 'name', header: 'Guard Name', render: (item) => (
                  <div>
                    <div className="font-bold text-[#1E372E]">{item.name}</div>
                    <div className="text-xs text-[#698a7f] flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {item.phone}
                    </div>
                  </div>
                )},
                { key: 'station', header: 'Station', render: (item) => (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#698a7f]" />
                    <span className="text-sm">{item.station}</span>
                  </div>
                )},
                { key: 'shift', header: 'Shift', render: (item) => item.shift },
                { key: 'status', header: 'Status', align: 'right', render: (item) => (
                  <Badge 
                    variant={item.status === 'On Duty' ? 'success' : item.status === 'Scheduled' ? 'warning' : 'neutral'} 
                    size="sm"
                  >
                    {item.status}
                  </Badge>
                )},
              ]}
            />
          </div>
        )}

        {/* Additional pages will be similar enhanced versions... */}
        {/* For brevity, showing pattern - rest follows same structure */}
        
        {/* Placeholder for other pages */}
        {!['dashboard', 'residents', 'guards'].includes(activePage) && (
          <div className="p-6 space-y-6">
            <PageHeader
              title={navItems.find(item => item.id === activePage)?.label || 'Page'}
              description="This enhanced page is under construction"
              icon={navItems.find(item => item.id === activePage)?.icon || Settings}
            />
            <EmptyState
              icon={Activity}
              title="Enhanced Feature In Development"
              description={`The ${navItems.find(item => item.id === activePage)?.label} section is being built with production-quality components and workflows.`}
            />
          </div>
        )}

      </main>

      {/* Add Resident Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Resident"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button variant="primary">Add Resident</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input label="Flat Number" placeholder="e.g., A-402" />
          <Input label="Resident Name" placeholder="Full name" />
          <Input label="Phone Number" placeholder="+91 98765 43210" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="BHK Type" placeholder="e.g., 2BHK" />
            <Input label="Family Members" type="number" placeholder="3" />
          </div>
        </div>
      </Modal>

    </div>
  );
};
