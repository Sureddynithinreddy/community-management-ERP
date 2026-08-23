export type PriorityLevel = 'Must-have' | 'Should-have' | 'Nice-to-have';
export type SurfaceType = 'Resident' | 'Guard' | 'Admin' | 'All';
export type PhaseType = 'Phase 1 (v1 Core)' | 'Phase 2 (v1.5 Growth)' | 'Phase 3 (v2.0 Advanced)';

export interface PRDModule {
  id: string;
  number: number;
  title: string;
  description: string;
  iconName: string;
  targetRole: string;
  color: string;
}

export interface PRDFeature {
  id: string;
  moduleId: string;
  title: string;
  priority: PriorityLevel;
  surface: SurfaceType;
  whatItIs: string;
  whyItMatters: string;
  howItWorks: string;
  phase: PhaseType;
  tags: string[];
}

export interface VisitorApprovalDemo {
  visitorName: string;
  visitorPhoto: string;
  visitorType: 'Guest' | 'Delivery' | 'Daily Help' | 'Cab';
  flatNo: string;
  company?: string;
  timestamp: string;
  status: 'Pending' | 'Approved' | 'Denied' | 'Left at Gate';
}

export interface MaintenanceBillDemo {
  flatNo: string;
  residentName: string;
  billingMonth: string;
  maintenanceAmount: number;
  sinkingFundAmount: number;
  lateFee: number;
  dueDate: string;
  status: 'Unpaid' | 'Paid' | 'Processing';
  gstInvoiceNo?: string;
}

export interface TicketDemo {
  id: string;
  flatNo: string;
  category: 'Plumbing' | 'Electrical' | 'Lift/Elevator' | 'Security' | 'Pest Control';
  description: string;
  slaHours: number;
  status: 'Open' | 'In Progress' | 'Escalated' | 'Resolved';
  assignedTo: string;
  createdAt: string;
}
