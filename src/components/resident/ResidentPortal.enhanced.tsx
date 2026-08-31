import React, { useState } from 'react';
import { ResidentPageId } from '../../types/portalTypes';
import { 
  Home, CreditCard, ShieldCheck, Wrench, Calendar, Megaphone, 
  Flame, CheckCircle2, XCircle, Clock, Camera, FileText, ArrowLeft, Send,
  Plus, Download, Check, Sparkles, User, QrCode, Star, ThumbsUp, MapPin, 
  Phone, Bell, Package, Car, Users, TrendingUp, Activity
} from 'lucide-react';
import { 
  Card, Badge, Button, Input, StatCard, Table, EmptyState, SearchBar,
  Modal, Tabs, PageHeader, Alert, ChartContainer, SimpleBarChart
} from '../shared';

interface ResidentPortalProps {
  onExit: () => void;
}

export const ResidentPortal: React.FC<ResidentPortalProps> = ({ onExit }) => {
  const [activePage, setActivePage] = useState<ResidentPageId>('dashboard');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showGuestPassModal, setShowGuestPassModal] = useState(false);
  const [billPaid, setBillPaid] = useState(false);

  // Mock data
  const upcomingBookings = [
    { id: 'BK-101', amenity: 'Tennis Court 1', date: 'Today', time: '6:00 PM - 7:00 PM', status: 'Confirmed' },
    { id: 'BK-102', amenity: 'Swimming Pool', date: 'Tomorrow', time: '7:00 AM - 8:00 AM', status: 'Confirmed' },
  ];

  const activeComplaints = [
    { id: 'TK-9021', category: 'Plumbing', issue: 'Water leakage', status: 'In Progress', sla: '1h 45m remaining' },
  ];

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: Home },
    { id: 'paying_bills', label: 'Bills & Payments', icon: CreditCard },
    { id: 'approve_visitors', label: 'Visitor Management', icon: ShieldCheck },
    { id: 'raise_complaints', label: 'Maintenance', icon: Wrench },
    { id: 'book_amenity', label: 'Amenity Booking', icon: Calendar },
    { id: 'announcements_events', label: 'Community', icon: Megaphone },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
      
      {/* Enhanced Sidebar */}
      <aside className="w-full md:w-72 bg-gradient-to-b from-[#254238] to-[#1E372E] text-white p-4 border-r border-[#1E372E]/50 shrink-0 space-y-6">
        {/* Profile Section */}
        <div className="border-b border-[#3A6657] pb-4 px-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#738743] to-[#5E7034] flex items-center justify-center font-bold text-xl shadow-lg">
              AS
            </div>
            <div className="flex-1">
              <div className="serif-title text-lg text-[#F8F5EE]">Ananya Sharma</div>
              <div className="text-xs text-[#A3C3B7]">Flat A-402 • Tower A</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] mt-3">
            <div className="bg-[#738743]/20 px-2 py-1.5 rounded-lg text-center">
              <div className="font-bold text-[#F8F5EE]">2BHK</div>
              <div className="text-[#A3C3B7]">Unit Type</div>
            </div>
            <div className="bg-[#738743]/20 px-2 py-1.5 rounded-lg text-center">
              <div className="font-bold text-[#F8F5EE]">3</div>
              <div className="text-[#A3C3B7]">Members</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id as ResidentPageId)}
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
            variant="ghost"
            size="sm"
            fullWidth
            icon={<Flame className="w-4 h-4" />}
            className="text-red-300 hover:bg-red-900/40 justify-start"
          >
            Emergency SOS
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

      {/* Main Content */}
      <main className="flex-1 bg-[#F8F5EE] overflow-y-auto">
        
        {/* ================================================================= */}
        {/* DASHBOARD */}
        {/* ================================================================= */}
        {activePage === 'dashboard' && (
          <div className="p-6 space-y-6">
            <PageHeader
              title="Welcome Home, Ananya"
              description="Your personal dashboard for Flat A-402"
              icon={Home}
            />

            {/* Emergency Banner */}
            <Card variant="organic" className="p-6 border-2 border-red-300 bg-gradient-to-r from-red-50 to-transparent">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E372E] text-base">Emergency Panic Alert</h3>
                    <p className="text-sm text-[#698a7f]">One-tap security dispatch to your flat location</p>
                  </div>
                </div>
                <Button variant="danger" size="lg" icon={<Flame className="w-5 h-5" />}>
                  ACTIVATE SOS
                </Button>
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Current Dues"
                value={billPaid ? '₹0' : '₹4,766'}
                subtitle={billPaid ? 'All paid' : 'Due in 5 days'}
                icon={CreditCard}
                color={billPaid ? 'success' : 'warning'}
              />
              <StatCard
                title="Active Bookings"
                value={upcomingBookings.length}
                subtitle="Upcoming reservations"
                icon={Calendar}
                color="info"
              />
              <StatCard
                title="Open Complaints"
                value={activeComplaints.length}
                subtitle="In progress"
                icon={Wrench}
                color="primary"
              />
              <StatCard
                title="Visitors Today"
                value="3"
                subtitle="2 approved, 1 pending"
                icon={ShieldCheck}
                color="success"
              />
            </div>

            {/* Pending Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card variant="organic" className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="serif-title text-xl text-[#1E372E]">Pending Visitor Approvals</h3>
                  <Badge variant="warning">1 Pending</Badge>
                </div>
                <Alert variant="info" title="Amazon Delivery at Gate">
                  Delivery person waiting at Gate 1 with package #AZ-9021. Approve or deny entry.
                </Alert>
                <div className="flex gap-2">
                  <Button variant="success" icon={<CheckCircle2 className="w-4 h-4" />}>
                    Approve Entry
                  </Button>
                  <Button variant="outline" icon={<XCircle className="w-4 h-4" />}>
                    Deny
                  </Button>
                </div>
              </Card>

              <Card variant="organic" className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="serif-title text-xl text-[#1E372E]">Upcoming Bookings</h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="space-y-3">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="p-4 bg-[#F8F5EE] rounded-xl border border-[#DED8C8] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#738743]/20 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-[#738743]" />
                        </div>
                        <div>
                          <div className="font-bold text-[#1E372E] text-sm">{booking.amenity}</div>
                          <div className="text-xs text-[#698a7f]">{booking.date} • {booking.time}</div>
                        </div>
                      </div>
                      <Badge variant="success" size="sm">
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card variant="organic" className="p-6 space-y-4">
              <h3 className="serif-title text-xl text-[#1E372E]">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { time: '10 mins ago', text: 'Maid Sunita Devi checked in at gate', icon: Users, color: '#738743' },
                  { time: '2 hours ago', text: 'Maintenance complaint #TK-9021 status updated', icon: Wrench, color: '#f59e0b' },
                  { time: 'Yesterday', text: 'Tennis Court booking confirmed', icon: Calendar, color: '#738743' },
                ].map((activity, i) => {
                  const ActivityIcon = activity.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 bg-[#F8F5EE] rounded-xl">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${activity.color}20` }}
                      >
                        <ActivityIcon className="w-4 h-4" style={{ color: activity.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-[#1E372E] font-medium">{activity.text}</p>
                        <p className="text-xs text-[#698a7f] mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* ================================================================= */}
        {/* BILLS & PAYMENTS */}
        {/* ================================================================= */}
        {activePage === 'paying_bills' && (
          <div className="p-6 space-y-6">
            <PageHeader
              title="Bills & Payments"
              description="Maintenance fees, payment history, and tax receipts"
              icon={CreditCard}
              actions={
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={<Download className="w-4 h-4" />}
                >
                  Download History
                </Button>
              }
            />

            {/* Current Bill */}
            <Card variant="organic" className="p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-[#DED8C8] pb-4">
                <div>
                  <div className="text-xs font-bold text-[#738743] uppercase tracking-wider">August 2026 Statement</div>
                  <h3 className="serif-title text-2xl text-[#1E372E] mt-1">Maintenance Bill</h3>
                </div>
                <Badge 
                  variant={billPaid ? 'success' : 'warning'}
                  size="lg"
                  icon={billPaid ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                >
                  {billPaid ? 'PAID' : 'DUE IN 5 DAYS'}
                </Badge>
              </div>

              {/* Line Items */}
              <div className="bg-[#F8F5EE] p-5 rounded-xl space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#698a7f]">Maintenance Charge (₹3.50/sq.ft)</span>
                  <span className="font-bold text-[#1E372E]">₹3,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#698a7f]">Sinking Fund</span>
                  <span className="font-bold text-[#1E372E]">₹500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#698a7f]">Water Charges</span>
                  <span className="font-bold text-[#1E372E]">₹400</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#698a7f]">GST (18%)</span>
                  <span className="font-bold text-[#1E372E]">₹666</span>
                </div>
                <div className="border-t border-[#DED8C8] pt-3 flex justify-between">
                  <span className="font-bold text-[#1E372E]">Total Amount</span>
                  <span className="serif-title text-2xl text-[#738743]">₹4,766</span>
                </div>
              </div>

              {/* Payment Actions */}
              {!billPaid ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button 
                      variant="primary" 
                      size="lg"
                      fullWidth
                      icon={<CreditCard className="w-4 h-4" />}
                      onClick={() => {
                        setBillPaid(true);
                        alert('Payment successful! Receipt #GST-9021 generated.');
                      }}
                    >
                      PAY ₹4,766 VIA UPI
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="lg"
                      fullWidth
                      onClick={() => setShowPaymentModal(true)}
                    >
                      OTHER PAYMENT METHODS
                    </Button>
                  </div>
                  <Alert variant="info">
                    Enable UPI Autopay for automatic payments and zero late fees every month.
                  </Alert>
                </div>
              ) : (
                <Alert variant="success" title="Payment Successful">
                  <div className="flex items-center justify-between mt-2">
                    <span>Paid on {new Date().toLocaleDateString()}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      icon={<Download className="w-3.5 h-3.5" />}
                    >
                      Download Receipt
                    </Button>
                  </div>
                </Alert>
              )}
            </Card>

            {/* Payment History */}
            <Card variant="organic" className="p-6 space-y-4">
              <h3 className="serif-title text-xl text-[#1E372E]">Payment History</h3>
              <Table
                data={[
                  { month: 'July 2026', amount: '₹4,766', date: '05 Jul 2026', receipt: 'GST-8812' },
                  { month: 'June 2026', amount: '₹4,766', date: '04 Jun 2026', receipt: 'GST-7910' },
                  { month: 'May 2026', amount: '₹4,500', date: '03 May 2026', receipt: 'GST-6102' },
                ]}
                columns={[
                  { key: 'month', header: 'Billing Month' },
                  { key: 'amount', header: 'Amount', render: (item) => (
                    <span className="font-bold text-[#738743]">{item.amount}</span>
                  )},
                  { key: 'date', header: 'Payment Date' },
                  { key: 'receipt', header: 'Receipt', render: (item) => (
                    <span className="font-mono text-xs">{item.receipt}</span>
                  )},
                ]}
              />
            </Card>
          </div>
        )}

        {/* Placeholder for other pages */}
        {!['dashboard', 'paying_bills'].includes(activePage) && (
          <div className="p-6 space-y-6">
            <PageHeader
              title={navItems.find(item => item.id === activePage)?.label || 'Page'}
              description="Enhanced features coming soon"
              icon={navItems.find(item => item.id === activePage)?.icon || Activity}
            />
            <EmptyState
              icon={Sparkles}
              title="Feature Under Development"
              description={`The ${navItems.find(item => item.id === activePage)?.label} section is being enhanced with production-quality components.`}
            />
          </div>
        )}

      </main>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Choose Payment Method"
      >
        <div className="space-y-3">
          <Button variant="outline" fullWidth className="justify-start">
            💳 Credit/Debit Card
          </Button>
          <Button variant="outline" fullWidth className="justify-start">
            🏦 Net Banking
          </Button>
          <Button variant="outline" fullWidth className="justify-start">
            📱 UPI / QR Code
          </Button>
        </div>
      </Modal>

    </div>
  );
};
