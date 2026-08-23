import { PRDModule, PRDFeature } from '../types/prd';

export const PRD_MODULES: PRDModule[] = [
  {
    id: 'gate-security',
    number: 3,
    title: 'Visitor & Gate Security',
    description: 'Replaces paper registers at the gate with high-speed digital entry, delivery management, panic SOS alerts, and domestic staff tracking.',
    iconName: 'ShieldCheck',
    targetRole: 'Guards & Residents',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'accounting-billing',
    number: 4,
    title: 'Accounting, Billing & Payments',
    description: 'Automated billing engine, GST receipts, interest calculation, UPI autopay, vendor expenses, and CA-ready audit balance sheets.',
    iconName: 'Receipt',
    targetRole: 'Treasurer & Residents',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'helpdesk-complaints',
    number: 5,
    title: 'Helpdesk & Complaints',
    description: 'Photo-enabled complaint ticketing, staff assignment, SLA countdown timers, auto-escalation, and vendor performance analytics.',
    iconName: 'Wrench',
    targetRole: 'Residents & Facility Manager',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'communication-community',
    number: 6,
    title: 'Communication & Community',
    description: 'Digital notice boards, high-priority emergency broadcast alerts, instant resident polls, opted-in directory, and AGM records.',
    iconName: 'Megaphone',
    targetRole: 'Secretary & Residents',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'facilities-staff-vendors',
    number: 7,
    title: 'Facilities, Staff & Vendors',
    description: 'Amenity slot booking calendars, society staff attendance & payroll summaries, vendor contract vaults, and asset inventory.',
    iconName: 'Building2',
    targetRole: 'Facility Staff & Residents',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'admin-dashboard',
    number: 8,
    title: 'Admin Dashboard & Governance',
    description: 'Role-based access control, central operations room, flat/resident master database, secure document vault, and committee handover tools.',
    iconName: 'LayoutDashboard',
    targetRole: 'Management Committee',
    color: 'from-indigo-500 to-violet-600',
  },
];

export const PRD_FEATURES: PRDFeature[] = [
  // Module 3: Visitor & Gate Security
  {
    id: 'gate-pre-approval',
    moduleId: 'gate-security',
    title: 'Visitor Pre-approval',
    priority: 'Must-have',
    surface: 'Resident',
    whatItIs: 'A resident can invite a guest in advance from the app and the guest gets a pass (QR code or one-time code).',
    whyItMatters: 'Saves time at the gate and removes the awkward phone call to residents asking "is this person allowed in?"',
    howItWorks: 'Resident enters guest name and time window in app → app generates QR/OTP → guard scans/enters it at gate → guest is let in automatically, no phone call needed.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['Gate', 'QR Code', 'OTP', 'Pre-Pass']
  },
  {
    id: 'gate-realtime-approval',
    moduleId: 'gate-security',
    title: 'Real-time Visitor Approval',
    priority: 'Must-have',
    surface: 'Resident',
    whatItIs: 'When an unannounced visitor arrives, the guard sends a request to the resident phone and the resident approves or declines instantly.',
    whyItMatters: 'Core trust mechanism — residents want full control over who enters, without needing to walk to the gate.',
    howItWorks: 'Guard enters visitor name & photo at gate app → push notification sent to resident phone → resident taps Approve/Deny → guard sees decision immediately.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['Push Notification', 'Gate App', 'Instant Call']
  },
  {
    id: 'gate-delivery-leave-at-gate',
    moduleId: 'gate-security',
    title: 'Delivery & "Leave at Gate" Management',
    priority: 'Must-have',
    surface: 'Guard',
    whatItIs: 'A simplified, faster flow for e-commerce/food delivery with leave-at-gate photo proof.',
    whyItMatters: 'Typical society gets 300-500+ delivery entries a day; slow approval flows cause huge gate queues.',
    howItWorks: 'Delivery partner scans QR or gives order ID → quick-approve notification or auto-approve pre-set → guard marks package "left at gate" with photo snapshot.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['Delivery', 'E-commerce', 'Photo Proof']
  },
  {
    id: 'gate-digital-visitor-log',
    moduleId: 'gate-security',
    title: 'Photo ID Capture & Digital Log',
    priority: 'Must-have',
    surface: 'Guard',
    whatItIs: 'Every visitor photo, ID proof, and entry/exit timestamp recorded digitally instead of paper register.',
    whyItMatters: 'Gives committee a searchable, audit-ready record for security incidents and reduces disputes.',
    howItWorks: 'Guard app captures photo at entry; log is timestamped and stored, exit time recorded when visitor leaves (or auto-closed).',
    phase: 'Phase 1 (v1 Core)',
    tags: ['Audit Log', 'Camera Snapshot', 'Entry History']
  },
  {
    id: 'gate-domestic-staff-tracking',
    moduleId: 'gate-security',
    title: 'Domestic Staff & Daily-help Management',
    priority: 'Must-have',
    surface: 'Resident',
    whatItIs: 'Verification, attendance tracking and quick entry for maids, cooks, drivers, and daily help.',
    whyItMatters: 'Repeat high-frequency visitors shouldn\'t need fresh approval every single time.',
    howItWorks: 'Staff registered once with photo & ID proof against specific flat → daily entry is fast QR/fingerprint tap → resident views attendance history.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['Maid Attendance', 'QR Tap', 'Daily Help']
  },
  {
    id: 'gate-panic-sos-button',
    moduleId: 'gate-security',
    title: 'Panic Button / Emergency Alert',
    priority: 'Must-have',
    surface: 'Resident',
    whatItIs: 'One-tap emergency button for resident or guard to alert security and nearby residents instantly.',
    whyItMatters: 'Basic safety expectation in security app; missing panic button is a trust red flag.',
    howItWorks: 'Resident taps SOS button → alert triggers at guard station, facility manager, and pre-set emergency contacts with flat details.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['SOS', 'Emergency', 'Guard Siren']
  },
  {
    id: 'gate-patrol-tracking',
    moduleId: 'gate-security',
    title: 'Guard Patrol / Rounds Tracking',
    priority: 'Should-have',
    surface: 'Guard',
    whatItIs: 'Guards check in at property checkpoints during rounds so committee confirms patrols happened.',
    whyItMatters: 'Provides verifiable proof of security coverage instead of trusting verbal reports.',
    howItWorks: 'QR codes or beacons at check-points around property → guard scans during rounds → report shows completed vs missed patrol points.',
    phase: 'Phase 2 (v1.5 Growth)',
    tags: ['Patrol', 'QR Checkpoints', 'Audit Report']
  },
  {
    id: 'gate-vehicle-parking',
    moduleId: 'gate-security',
    title: 'Vehicle & Parking Management',
    priority: 'Should-have',
    surface: 'Admin',
    whatItIs: 'Registering resident & visitor vehicles and tracking parking slot allocations.',
    whyItMatters: 'Prevents parking disputes, one of the highest complaint categories in societies.',
    howItWorks: 'Residents register vehicle numbers; guard app scans/recognizes plates at entry; admin allocates & tracks parking slots per flat.',
    phase: 'Phase 2 (v1.5 Growth)',
    tags: ['Vehicle Log', 'ANPR Plate Scan', 'Parking Slots']
  },
  {
    id: 'gate-offline-mode',
    moduleId: 'gate-security',
    title: 'Offline Mode for Guard App',
    priority: 'Should-have',
    surface: 'Guard',
    whatItIs: 'Guard app keeps working (approvals queue up and sync later) even if gate internet drops.',
    whyItMatters: 'Gate operations cannot stop just because internet drops — crucial for 100% gate uptime.',
    howItWorks: 'Guard app stores entries locally when offline → auto-syncs to cloud server once connection returns without losing records.',
    phase: 'Phase 2 (v1.5 Growth)',
    tags: ['Offline First', 'Auto Sync', 'Zero Downtime']
  },
  {
    id: 'gate-facial-recognition',
    moduleId: 'gate-security',
    title: 'Facial Recognition Entry',
    priority: 'Nice-to-have',
    surface: 'Guard',
    whatItIs: 'Automatic recognition of frequent visitors/domestic staff/residents at gate without code scan.',
    whyItMatters: 'Speeds up entry for daily visitors during peak morning hours.',
    howItWorks: 'Camera at gate matches face against registered photos → auto-logs entry if matched → falls back to manual entry if unrecognized.',
    phase: 'Phase 3 (v2.0 Advanced)',
    tags: ['AI Vision', 'Touchless Entry', 'Face ID']
  },

  // Module 4: Accounting, Billing & Payments
  {
    id: 'fin-automated-billing',
    moduleId: 'accounting-billing',
    title: 'Automated Maintenance Bill Generation',
    priority: 'Must-have',
    surface: 'Admin',
    whatItIs: 'Calculates and generates every flat\'s monthly maintenance bill automatically based on society rules.',
    whyItMatters: 'Single biggest time-saver for Treasurer — manual billing for hundreds of flats is a massive burden.',
    howItWorks: 'Committee sets billing rule once (per BHK / per sq.ft / flat rate) → app auto-generates itemized bills for every flat every cycle.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['Automated Billing', 'Per SqFt', 'Treasurer Engine']
  },
  {
    id: 'fin-online-payments',
    moduleId: 'accounting-billing',
    title: 'Online Payments with Multiple Options',
    priority: 'Must-have',
    surface: 'Resident',
    whatItIs: 'Residents pay dues directly in-app using UPI, Credit/Debit cards, or Net Banking.',
    whyItMatters: 'Digital collection dramatically increases on-time payment rate vs cash or manual bank transfer.',
    howItWorks: 'Resident taps "Pay Now" → redirected to secure payment gateway → payment status updates instantly, digital receipt generated.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['UPI', 'Credit Card', 'Netbanking', 'Instant Receipt']
  },
  {
    id: 'fin-upi-autopay',
    moduleId: 'accounting-billing',
    title: 'Auto-debit / UPI Autopay for Recurring Dues',
    priority: 'Should-have',
    surface: 'Resident',
    whatItIs: 'Residents set up recurring maintenance payment automatically every month without manual clicking.',
    whyItMatters: 'Removes late payments caused by forgetting due dates and reduces Treasurer follow-up.',
    howItWorks: 'Resident opts in once via UPI Autopay mandate → system auto-charges account on due date each cycle → resident receives notification.',
    phase: 'Phase 2 (v1.5 Growth)',
    tags: ['UPI Autopay', 'Recurring', 'Zero Late Fees']
  },
  {
    id: 'fin-late-fee-calculator',
    moduleId: 'accounting-billing',
    title: 'Late Fee & Interest Calculation',
    priority: 'Must-have',
    surface: 'Admin',
    whatItIs: 'Automatically adds late fees or interest to overdue bills based on society rules.',
    whyItMatters: 'Removes awkward, manual job of committee calculating penalties and chasing defaulters.',
    howItWorks: 'Society sets late-fee rule (e.g. 21% p.a. after 15 days overdue) → system auto-applies penalty to unpaid bills past due date.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['Interest Calculator', 'Overdue Penalties', 'Auto Fine']
  },
  {
    id: 'fin-collection-dashboard',
    moduleId: 'accounting-billing',
    title: 'Real-time Collection Dashboard',
    priority: 'Must-have',
    surface: 'Admin',
    whatItIs: 'Live view for committee showing paid vs unpaid status, total dues outstanding, filtered by tower.',
    whyItMatters: 'Replaces messy Excel spreadsheets; live dashboard removes hours of reconciliation work.',
    howItWorks: 'Dashboard auto-updates as payments arrive, filterable by flat/tower/status, exportable to Excel/PDF for meetings.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['Live Dashboard', 'Excel Export', 'Defaulter List']
  },
  {
    id: 'fin-expense-tracking',
    moduleId: 'accounting-billing',
    title: 'Expense Tracking & Vendor Payments',
    priority: 'Must-have',
    surface: 'Admin',
    whatItIs: 'Recording all society expenses (salaries, repairs, utilities) with attached bill invoices.',
    whyItMatters: 'Committees are legally required to maintain proper accounts and residents want financial transparency.',
    howItWorks: 'Committee logs each expense with category, vendor, and attached receipt → system maintains running income vs expense ledger.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['Expense Ledger', 'Vendor Invoices', 'Petty Cash']
  },
  {
    id: 'fin-gst-invoices',
    moduleId: 'accounting-billing',
    title: 'GST-Compliant Invoices & Digital Receipts',
    priority: 'Must-have',
    surface: 'Resident',
    whatItIs: 'Every payment automatically generates a proper, downloadable, tax-compliant PDF receipt.',
    whyItMatters: 'Required for audits and GST-registered societies; residents need proof for tax/reimbursements.',
    howItWorks: 'On payment success, system auto-generates PDF receipt/invoice with GST breakdown and emails/stores in resident app.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['GST Tax', 'PDF Receipt', 'Audit Compliant']
  },
  {
    id: 'fin-financial-audit-reports',
    moduleId: 'accounting-billing',
    title: 'Financial Reports for Audits',
    priority: 'Must-have',
    surface: 'Admin',
    whatItIs: 'Ready-made reports (income & expense statement, balance sheet, general ledger) for society CAs.',
    whyItMatters: 'Saves society from hiring extra accounting help to compile numbers manually at year end.',
    howItWorks: 'System auto-compiles transactions into CA-standard report formats, filterable by financial year, exportable as PDF/Excel.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['Balance Sheet', 'General Ledger', 'CA Audit Ready']
  },
  {
    id: 'fin-resident-transparency',
    moduleId: 'accounting-billing',
    title: 'Budgeting & Transparency for Residents',
    priority: 'Should-have',
    surface: 'Resident',
    whatItIs: 'Residents see a simplified summary of society income, broad spending categories, and fund balances.',
    whyItMatters: 'Builds trust; residents know where maintenance money goes instead of paying blindly.',
    howItWorks: 'Admin publishes periodic summary inside resident app showing spending graphs and bank balance highlights.',
    phase: 'Phase 2 (v1.5 Growth)',
    tags: ['Transparency', 'Budget Summary', 'Community Trust']
  },
  {
    id: 'fin-sinking-fund-tracking',
    moduleId: 'accounting-billing',
    title: 'Sinking Fund / Reserve Fund Tracking',
    priority: 'Should-have',
    surface: 'Admin',
    whatItIs: 'Separately tracks long-term reserve funds for major structural repairs from daily operational accounts.',
    whyItMatters: 'Legally required — reserve funds must not get mixed up with day-to-day operational expenses.',
    howItWorks: 'System maintains separate ledger for reserve/sinking fund contributions and withdrawals, viewable by committee.',
    phase: 'Phase 2 (v1.5 Growth)',
    tags: ['Sinking Fund', 'Reserve Balance', 'Legal Ledger']
  },

  // Module 5: Helpdesk & Complaints
  {
    id: 'help-raise-ticket',
    moduleId: 'helpdesk-complaints',
    title: 'Raise Complaint/Ticket with Photos',
    priority: 'Must-have',
    surface: 'Resident',
    whatItIs: 'Residents log maintenance issues directly in app, attaching photo proof and description.',
    whyItMatters: 'Replaces complaints getting lost in noisy WhatsApp groups or forgotten phone calls.',
    howItWorks: 'Resident selects category (plumbing, electrical, elevator, etc.), uploads photo → ticket created with unique ID and timestamp.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['Photo Upload', 'Ticket ID', 'Issue Tracking']
  },
  {
    id: 'help-ticket-assignment',
    moduleId: 'helpdesk-complaints',
    title: 'Ticket Assignment & Status Tracking',
    priority: 'Must-have',
    surface: 'Admin',
    whatItIs: 'Office staff assigns ticket to staff member/vendor; resident sees live status (Open → In Progress → Resolved).',
    whyItMatters: 'Gives residents visibility and accountability instead of wondering if anything is being done.',
    howItWorks: 'Admin assigns ticket from dropdown → status updates send push alerts → resident confirms resolution or reopens.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['Staff Assignment', 'Status Timeline', 'Resident Confirmation']
  },
  {
    id: 'help-sla-timers',
    moduleId: 'helpdesk-complaints',
    title: 'SLA Timers & Auto-escalation',
    priority: 'Should-have',
    surface: 'Admin',
    whatItIs: 'Expected resolution timeframe per issue category; auto-escalates to senior manager if overdue.',
    whyItMatters: 'Prevents complaints from sitting unresolved for weeks and holds facility staff accountable.',
    howItWorks: 'Admin sets SLA hours per category (e.g. security: 2 hrs, lift: 4 hrs) → system auto-flags overdue tickets to President/Secretary.',
    phase: 'Phase 2 (v1.5 Growth)',
    tags: ['SLA Countdown', 'Auto Escalation', 'Overdue Alert']
  },
  {
    id: 'help-complaint-analytics',
    moduleId: 'helpdesk-complaints',
    title: 'Complaint History & Analytics',
    priority: 'Should-have',
    surface: 'Admin',
    whatItIs: 'Dashboard showing recurring issues by category, block, tower, or vendor resolution performance.',
    whyItMatters: 'Helps committee spot recurring vendor flaws (e.g. specific lift breaking repeatedly) to take contract action.',
    howItWorks: 'System aggregates ticket metrics into charts — most frequent categories, average resolution time, vendor SLAs.',
    phase: 'Phase 2 (v1.5 Growth)',
    tags: ['Analytics Charts', 'Vendor Rating', 'Tower Hotspots']
  },

  // Module 6: Communication & Community
  {
    id: 'comm-digital-notice-board',
    moduleId: 'communication-community',
    title: 'Digital Notice Board',
    priority: 'Must-have',
    surface: 'Resident',
    whatItIs: 'Official announcements, notices, and circulars from committee visible in-app.',
    whyItMatters: 'Replaces printed notices pinned on physical lobby boards and avoids clutter in WhatsApp groups.',
    howItWorks: 'Admin posts notice (text/image/PDF) → all residents receive push notification and view in Notices tab.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['Official Notices', 'PDF Attachment', 'Push Alert']
  },
  {
    id: 'comm-emergency-broadcast',
    moduleId: 'communication-community',
    title: 'Emergency Broadcast Alerts',
    priority: 'Must-have',
    surface: 'Admin',
    whatItIs: 'Committee/security instantly broadcasts urgent alerts (fire, water outage, security threat) to all residents.',
    whyItMatters: 'Speed matters in emergencies; broadcast reaches 100% residents far faster than manual phone calls.',
    howItWorks: 'Admin selects "Emergency Alert", types message → pushed instantly to every resident phone as high-priority alert.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['High Priority Siren', 'Emergency Broadcast', 'Instant Push']
  },
  {
    id: 'comm-polls-surveys',
    moduleId: 'communication-community',
    title: 'Polls & Surveys',
    priority: 'Should-have',
    surface: 'Resident',
    whatItIs: 'Committee runs quick digital votes on society decisions (vendor selection, budget approvals).',
    whyItMatters: 'Makes decision-making transparent and gives residents a voice, building community trust.',
    howItWorks: 'Admin creates poll with options & deadline → residents vote once from app → results tallied automatically.',
    phase: 'Phase 2 (v1.5 Growth)',
    tags: ['1 Flat 1 Vote', 'Live Poll Tally', 'Transparent Voting']
  },
  {
    id: 'comm-resident-directory',
    moduleId: 'communication-community',
    title: 'Opt-in Resident Directory',
    priority: 'Should-have',
    surface: 'Resident',
    whatItIs: 'Searchable list of opt-in residents with contact details they choose to share with neighbors.',
    whyItMatters: 'Fosters neighborhood community building and practical neighbor-to-neighbor contact.',
    howItWorks: 'Residents opt-in to appear in directory and select which contact details (phone/email/blood group) are visible.',
    phase: 'Phase 2 (v1.5 Growth)',
    tags: ['Opt-in Privacy', 'Neighbor Search', 'Flat Directory']
  },
  {
    id: 'comm-events-agm-management',
    moduleId: 'communication-community',
    title: 'Events & AGM Management',
    priority: 'Nice-to-have',
    surface: 'Admin',
    whatItIs: 'Event creation with RSVPs and formal digital archives of AGM invites, agendas, and signed minutes.',
    whyItMatters: 'AGMs carry legal significance for RWAs; digital records protect committee from legal disputes.',
    howItWorks: 'Admin creates event with venue & agenda → residents RSVP → formal AGM minutes uploaded and linked to event record.',
    phase: 'Phase 3 (v2.0 Advanced)',
    tags: ['AGM Legal Vault', 'RSVP Tracker', 'Society Festivals']
  },
  {
    id: 'comm-classifieds-marketplace',
    moduleId: 'communication-community',
    title: 'Classifieds / Society Marketplace',
    priority: 'Nice-to-have',
    surface: 'Resident',
    whatItIs: 'Residents post items for sale, local services, or recommendations exclusively within their society.',
    whyItMatters: 'Drives daily app engagement even when residents don\'t have pending bills or complaints.',
    howItWorks: 'Resident uploads item photo/price → visible only to verified residents of same society → direct chat.',
    phase: 'Phase 3 (v2.0 Advanced)',
    tags: ['Buy/Sell', 'Verified Neighbors', 'Local Marketplace']
  },

  // Module 7: Facilities, Staff & Vendor Management
  {
    id: 'fac-amenity-booking',
    moduleId: 'facilities-staff-vendors',
    title: 'Amenity / Facility Booking',
    priority: 'Must-have',
    surface: 'Resident',
    whatItIs: 'Residents reserve shared spaces (clubhouse, tennis court, gym, guest rooms) from live calendar.',
    whyItMatters: 'Replaces handwritten registers and prevents double-booking disputes among residents.',
    howItWorks: 'Resident picks facility, date, and slot from availability calendar → instant confirmation → auto-blocks defaulters.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['Live Slot Calendar', 'Clubhouse Booking', 'Auto Confirmation']
  },
  {
    id: 'fac-staff-payroll-basics',
    moduleId: 'facilities-staff-vendors',
    title: 'Staff Attendance & Payroll Basics',
    priority: 'Should-have',
    surface: 'Admin',
    whatItIs: 'Tracking attendance of society staff (housekeeping, gardeners, guards) and calculating monthly pay.',
    whyItMatters: 'Removes paper registers and avoids monthly wage disputes with security & housekeeping vendors.',
    howItWorks: 'Staff check in/out via guard app tap → auto-feeds into monthly payroll summary for admin approval.',
    phase: 'Phase 2 (v1.5 Growth)',
    tags: ['Biometric/QR Tap', 'Salary Calculation', 'Staff Log']
  },
  {
    id: 'fac-vendor-management',
    moduleId: 'facilities-staff-vendors',
    title: 'Vendor Contract & Service Management',
    priority: 'Should-have',
    surface: 'Admin',
    whatItIs: 'Central record of all vendors (lift maintenance, security, pest control) with contracts, quotes, & history.',
    whyItMatters: 'Prevents lost contract paperwork and gives committee clear records when renewing vendor terms.',
    howItWorks: 'Admin creates vendor profile with uploaded agreements → service visits and invoice logs tracked over time.',
    phase: 'Phase 2 (v1.5 Growth)',
    tags: ['Vendor Vault', 'Contract Expiry Alert', 'Service Log']
  },
  {
    id: 'fac-asset-inventory',
    moduleId: 'facilities-staff-vendors',
    title: 'Asset & Inventory Tracking',
    priority: 'Nice-to-have',
    surface: 'Admin',
    whatItIs: 'Record of society equipment (diesel generators, pumps, gym machines) with proactive maintenance schedules.',
    whyItMatters: 'Prevents large societies/townships from losing track of expensive machinery assets.',
    howItWorks: 'Admin logs asset with purchase date & service frequency → system alerts admin when preventative service is due.',
    phase: 'Phase 3 (v2.0 Advanced)',
    tags: ['Asset Register', 'Maintenance Reminder', 'Generator Log']
  },
  {
    id: 'fac-utility-submetering',
    moduleId: 'facilities-staff-vendors',
    title: 'Utility Sub-metering & Individual Billing',
    priority: 'Nice-to-have',
    surface: 'Admin',
    whatItIs: 'Tracking and billing individual water / electricity / piped gas usage per flat for large townships.',
    whyItMatters: 'Required in integrated townships where utilities are not directly billed per flat by government grid.',
    howItWorks: 'Meter readings (manual/IoT) entered per flat → system calculates consumption and appends to maintenance bill.',
    phase: 'Phase 3 (v2.0 Advanced)',
    tags: ['Piped Gas', 'Sub-meter Water', 'Township Billing']
  },

  // Module 8: Admin Dashboard & Governance
  {
    id: 'adm-role-based-access',
    moduleId: 'admin-dashboard',
    title: 'Role-based Access Control (RBAC)',
    priority: 'Must-have',
    surface: 'Admin',
    whatItIs: 'Different committee members & staff get granular access permissions (e.g. only Treasurer edits billing).',
    whyItMatters: 'Protects sensitive resident data and financial ledgers from unauthorized or accidental changes.',
    howItWorks: 'Super Admin assigns roles (Secretary, Treasurer, Security Chief, Office Staff) with pre-configured granular permission checks.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['RBAC Security', 'Treasurer Role', 'Data Protection']
  },
  {
    id: 'adm-central-ops-dashboard',
    moduleId: 'admin-dashboard',
    title: 'Central Operations Control Center',
    priority: 'Must-have',
    surface: 'Admin',
    whatItIs: 'Single-screen overview showing pending dues, open tickets, today\'s gate visitor count, and facility bookings.',
    whyItMatters: 'Committee members are volunteers with limited time; snapshot dashboard saves digging through sub-screens.',
    howItWorks: 'Dashboard pulls live counts from billing, helpdesk, gate logs, and bookings into unified KPI widgets.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['KPI Control Room', 'Live Overview', 'Instant Insights']
  },
  {
    id: 'adm-flat-resident-database',
    moduleId: 'admin-dashboard',
    title: 'Master Flat & Resident Database',
    priority: 'Must-have',
    surface: 'Admin',
    whatItIs: 'Master directory of every flat, owner vs tenant status, occupancy details, and move-in/out dates.',
    whyItMatters: 'Foundation every other module (billing, gate approvals, notices) relies on for accuracy.',
    howItWorks: 'Admin manages flat master, supports multiple family members/tenants per flat, and tracks historical occupancy.',
    phase: 'Phase 1 (v1 Core)',
    tags: ['Master Directory', 'Owner/Tenant Switch', 'Flat Mapping']
  },
  {
    id: 'adm-document-vault',
    moduleId: 'admin-dashboard',
    title: 'Society Document Vault',
    priority: 'Should-have',
    surface: 'Admin',
    whatItIs: 'Secure repository for society registration certificates, building plans, insurance papers, & AGM minutes.',
    whyItMatters: 'Removes dependence on personal drives/emails when committee members change annually.',
    howItWorks: 'Admin uploads documents into categorized secure folders; access controlled by committee role.',
    phase: 'Phase 2 (v1.5 Growth)',
    tags: ['Cloud Vault', 'Legal Papers', 'Audit Archive']
  },
  {
    id: 'adm-committee-handover',
    moduleId: 'admin-dashboard',
    title: 'Committee Handover Tools',
    priority: 'Nice-to-have',
    surface: 'Admin',
    whatItIs: 'Structured transition workflow to transfer admin access and historical data to newly elected committee.',
    whyItMatters: 'RWAs elect new committees every 1-3 years; prevents lost history or starting from scratch.',
    howItWorks: 'Outgoing admin initiates handover wizard → reassigns roles to elected members while maintaining historical archives.',
    phase: 'Phase 3 (v2.0 Advanced)',
    tags: ['1-Click Handover', 'RWA Election Wizard', 'Data Preservation']
  }
];

export const NON_FUNCTIONAL_REQUIREMENTS = [
  {
    id: 'ux-elderly',
    title: 'Senior & Non-Tech Friendly UX',
    description: 'Designed with extra-large touch targets, clear high-contrast text, simple local language phrasing, and minimal 2-tap payment flows.',
    metric: 'Zero-learning curve for senior residents',
    icon: 'UserCheck'
  },
  {
    id: 'offline-resilience',
    title: 'Offline Gate Resilience',
    description: 'Guard app queues all visitor scans locally in local storage/SQLite when gate Wi-Fi drops, auto-syncing to cloud instantly when restored.',
    metric: '100% Zero Gate Stoppage',
    icon: 'WifiOff'
  },
  {
    id: 'speed-latency',
    title: 'Sub-2 Second Push Notifications',
    description: 'High-priority WebSocket and Push Notification pipelines deliver visitor approval requests to residents in under 2 seconds globally.',
    metric: '< 2.0s Gate Approval Delivery',
    icon: 'Zap'
  },
  {
    id: 'security-privacy',
    title: 'Enterprise Encryption & Privacy',
    description: 'AES-256 encryption at rest and TLS 1.3 in transit. Full compliance with DPDP data privacy regulations including Resident Data Deletion on request.',
    metric: '100% Encrypted & Audit Ready',
    icon: 'Lock'
  },
  {
    id: 'scalability',
    title: 'Scales from 20 to 5,000+ Flats',
    description: 'Modular microservice architecture built to support small standalone 12-flat buildings as seamlessly as 50-tower mega townships.',
    metric: '50,000+ Concurrent Requests',
    icon: 'TrendingUp'
  },
  {
    id: 'multilingual',
    title: 'Multi-lingual Guard & Resident UI',
    description: 'Native support for English, Hindi, Marathi, Kannada, Tamil, Telugu, and Gujarati so guards and staff work comfortably in preferred language.',
    metric: '7+ Languages Supported',
    icon: 'Languages'
  }
];
