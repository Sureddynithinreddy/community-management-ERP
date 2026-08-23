// Mock data generator for realistic ERP data
export const generateMockData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  
  return {
    // Visitor traffic data
    visitorTraffic: months.map(month => ({
      month,
      visitors: Math.floor(Math.random() * 200) + 250,
      deliveries: Math.floor(Math.random() * 100) + 100
    })),

    // Monthly collections data
    monthlyCollections: months.map(month => ({
      month,
      collected: Math.floor(Math.random() * 5) + 12,
      pending: Math.floor(Math.random() * 3) + 2
    })),

    // Complaint categories
    complaintsByCategory: [
      { name: 'Plumbing', value: 45 },
      { name: 'Electrical', value: 32 },
      { name: 'Security', value: 18 },
      { name: 'Noise', value: 25 },
      { name: 'Other', value: 15 }
    ],

    // Amenity bookings
    amenityBookings: [
      { name: 'Tennis Court', value: 120 },
      { name: 'Clubhouse', value: 45 },
      { name: 'Swimming Pool', value: 85 },
      { name: 'Gym', value: 180 },
      { name: 'Party Hall', value: 25 }
    ],

    // Gate traffic by hour
    gateTrafficByHour: [
      { hour: '6 AM', count: 45 },
      { hour: '8 AM', count: 120 },
      { hour: '10 AM', count: 85 },
      { hour: '12 PM', count: 95 },
      { hour: '2 PM', count: 110 },
      { hour: '4 PM', count: 75 },
      { hour: '6 PM', count: 140 },
      { hour: '8 PM', count: 60 }
    ]
  };
};

export const mockResidents = [
  { id: 'R001', flat: 'A-402', name: 'Ananya Sharma', type: 'Owner', bhk: '2BHK', members: 3, vehicle: 'KA-03-MB-4921', phone: '9876543210', status: 'Active', email: 'ananya.a402@greenhaven.org' },
  { id: 'R002', flat: 'B-102', name: 'Rohan Mehta', type: 'Tenant', bhk: '3BHK', members: 2, vehicle: 'MH-12-PQ-9988', phone: '9876543211', status: 'Active', email: 'rohan.b102@greenhaven.org' },
  { id: 'R003', flat: 'C-301', name: 'Sunita Rao', type: 'Owner', bhk: '3BHK', members: 4, vehicle: 'KA-05-AB-1234', phone: '9876543212', status: 'Active', email: 'sunita.c301@greenhaven.org' },
  { id: 'R004', flat: 'A-104', name: 'Kabir Verma', type: 'Owner', bhk: '1BHK', members: 1, vehicle: 'KA-01-XY-5678', phone: '9876543213', status: 'Active', email: 'kabir.a104@greenhaven.org' },
  { id: 'R005', flat: 'B-205', name: 'Priya Patel', type: 'Owner', bhk: '2BHK', members: 3, vehicle: 'KA-02-CD-9012', phone: '9876543214', status: 'Active', email: 'priya.b205@greenhaven.org' },
  { id: 'R006', flat: 'C-501', name: 'Arjun Singh', type: 'Tenant', bhk: '3BHK', members: 4, vehicle: 'KA-04-EF-3456', phone: '9876543215', status: 'Active', email: 'arjun.c501@greenhaven.org' },
  { id: 'R007', flat: 'A-201', name: 'Neha Kapoor', type: 'Owner', bhk: '2BHK', members: 3, vehicle: 'KA-06-GH-7890', phone: '9876543216', status: 'Active', email: 'neha.a201@greenhaven.org' },
  { id: 'R008', flat: 'B-303', name: 'Aditya Sharma', type: 'Owner', bhk: '3BHK', members: 5, vehicle: 'KA-07-IJ-2345', phone: '9876543217', status: 'Active', email: 'aditya.b303@greenhaven.org' },
  { id: 'R009', flat: 'C-104', name: 'Lakshmi Iyer', type: 'Owner', bhk: '2BHK', members: 2, vehicle: 'TN-01-KL-6789', phone: '9876543218', status: 'Active', email: 'lakshmi.c104@greenhaven.org' },
  { id: 'R010', flat: 'A-305', name: 'Vikram Reddy', type: 'Tenant', bhk: '3BHK', members: 4, vehicle: 'AP-09-MN-3456', phone: '9876543219', status: 'Active', email: 'vikram.a305@greenhaven.org' },
  { id: 'R011', flat: 'B-401', name: 'Divya Krishnan', type: 'Owner', bhk: '3BHK', members: 4, vehicle: 'KL-08-OP-8901', phone: '9876543220', status: 'Active', email: 'divya.b401@greenhaven.org' },
  { id: 'R012', flat: 'C-202', name: 'Rahul Khanna', type: 'Owner', bhk: '2BHK', members: 2, vehicle: 'DL-03-QR-4567', phone: '9876543221', status: 'Active', email: 'rahul.c202@greenhaven.org' },
  { id: 'R013', flat: 'A-503', name: 'Meera Nair', type: 'Owner', bhk: '3BHK', members: 3, vehicle: 'KA-10-ST-1234', phone: '9876543222', status: 'Active', email: 'meera.a503@greenhaven.org' },
  { id: 'R014', flat: 'B-105', name: 'Sanjay Gupta', type: 'Tenant', bhk: '1BHK', members: 1, vehicle: 'HR-26-UV-5678', phone: '9876543223', status: 'Active', email: 'sanjay.b105@greenhaven.org' },
  { id: 'R015', flat: 'C-405', name: 'Anjali Desai', type: 'Owner', bhk: '3BHK', members: 4, vehicle: 'GJ-01-WX-9012', phone: '9876543224', status: 'Active', email: 'anjali.c405@greenhaven.org' },
  { id: 'R016', flat: 'A-302', name: 'Karan Malhotra', type: 'Owner', bhk: '2BHK', members: 2, vehicle: 'PB-02-YZ-3456', phone: '9876543225', status: 'Active', email: 'karan.a302@greenhaven.org' },
  { id: 'R017', flat: 'B-504', name: 'Pooja Agarwal', type: 'Owner', bhk: '3BHK', members: 5, vehicle: 'UP-16-AB-7890', phone: '9876543226', status: 'Active', email: 'pooja.b504@greenhaven.org' },
  { id: 'R018', flat: 'C-103', name: 'Harsh Joshi', type: 'Tenant', bhk: '1BHK', members: 1, vehicle: 'RJ-14-CD-2345', phone: '9876543227', status: 'Active', email: 'harsh.c103@greenhaven.org' },
  { id: 'R019', flat: 'A-405', name: 'Sneha Pillai', type: 'Owner', bhk: '3BHK', members: 3, vehicle: 'KA-11-EF-6789', phone: '9876543228', status: 'Active', email: 'sneha.a405@greenhaven.org' },
  { id: 'R020', flat: 'B-203', name: 'Manish Kumar', type: 'Owner', bhk: '2BHK', members: 4, vehicle: 'BR-01-GH-1234', phone: '9876543229', status: 'Active', email: 'manish.b203@greenhaven.org' },
];

export const mockGuards = [
  { id: 'GRD-101', name: 'Vikram Singh', station: 'Gate 1 Main Entry', shift: 'Shift A (06:00 AM - 02:00 PM)', phone: '9876000001', status: 'On Duty', joinDate: '2024-01-15' },
  { id: 'GRD-102', name: 'Suresh Kumar', station: 'Gate 2 Rear Entry', shift: 'Shift B (02:00 PM - 10:00 PM)', phone: '9876000002', status: 'Scheduled', joinDate: '2024-02-20' },
  { id: 'GRD-103', name: 'Rajesh Sharma', station: 'Night Patrol', shift: 'Shift C (10:00 PM - 06:00 AM)', phone: '9876000003', status: 'Off Duty', joinDate: '2023-11-10' },
  { id: 'GRD-104', name: 'Amit Gupta', station: 'Clubhouse Security', shift: 'Shift A (06:00 AM - 02:00 PM)', phone: '9876000004', status: 'On Duty', joinDate: '2024-03-05' },
  { id: 'GRD-105', name: 'Ravi Yadav', station: 'Gate 1 Main Entry', shift: 'Shift B (02:00 PM - 10:00 PM)', phone: '9876000005', status: 'On Duty', joinDate: '2024-04-12' },
  { id: 'GRD-106', name: 'Manoj Tiwari', station: 'Roving Patrol', shift: 'Shift C (10:00 PM - 06:00 AM)', phone: '9876000006', status: 'Scheduled', joinDate: '2023-12-01' },
  { id: 'GRD-107', name: 'Deepak Verma', station: 'Gate 2 Rear Entry', shift: 'Shift A (06:00 AM - 02:00 PM)', phone: '9876000007', status: 'On Duty', joinDate: '2024-01-22' },
  { id: 'GRD-108', name: 'Santosh Kumar', station: 'Swimming Pool Area', shift: 'Shift B (02:00 PM - 10:00 PM)', phone: '9876000008', status: 'Off Duty', joinDate: '2024-05-08' },
];

export const mockComplaints = [
  { id: 'TK-9021', flat: 'A-402', category: 'Plumbing', priority: 'High', desc: 'Main water supply pipe leaking near balcony', status: 'In Progress', assignedTo: 'Ramesh (Plumber)', sla: '1h 45m remaining', createdAt: '2026-08-23T10:15:00', photo: true },
  { id: 'TK-9020', flat: 'B-102', category: 'Electrical', priority: 'Medium', desc: 'Living room fan not working', status: 'Open', assignedTo: 'Unassigned', sla: '4h remaining', createdAt: '2026-08-23T09:30:00', photo: false },
  { id: 'TK-9019', flat: 'C-301', category: 'Carpentry', priority: 'Low', desc: 'Main door handle loose', status: 'Open', assignedTo: 'Unassigned', sla: '24h remaining', createdAt: '2026-08-23T08:00:00', photo: true },
  { id: 'TK-9018', flat: 'A-104', category: 'Painting', priority: 'Low', desc: 'Wall seepage stains in bedroom', status: 'In Progress', assignedTo: 'Kumar (Painter)', sla: '12h remaining', createdAt: '2026-08-22T16:45:00', photo: true },
  { id: 'TK-9017', flat: 'B-205', category: 'Plumbing', priority: 'High', desc: 'Bathroom drain clogged', status: 'In Progress', assignedTo: 'Ramesh (Plumber)', sla: '2h 30m remaining', createdAt: '2026-08-22T14:20:00', photo: false },
  { id: 'TK-9016', flat: 'C-501', category: 'Electrical', priority: 'High', desc: 'Power fluctuation in entire flat', status: 'Open', assignedTo: 'Suresh (Electrician)', sla: '3h remaining', createdAt: '2026-08-22T11:00:00', photo: false },
  { id: 'TK-8815', flat: 'A-201', category: 'Pest Control', priority: 'Medium', desc: 'Termite infestation in wooden furniture', status: 'Scheduled', assignedTo: 'PestAway Services', sla: '48h remaining', createdAt: '2026-08-21T15:30:00', photo: true },
  { id: 'TK-8814', flat: 'B-303', category: 'AC Repair', priority: 'High', desc: 'Split AC not cooling properly', status: 'In Progress', assignedTo: 'CoolAir Technician', sla: '6h remaining', createdAt: '2026-08-21T13:15:00', photo: false },
  { id: 'TK-8813', flat: 'C-104', category: 'Lift', priority: 'High', desc: 'Lift making unusual noise', status: 'Resolved', assignedTo: 'OTIS Engineer', sla: 'Completed', createdAt: '2026-08-21T10:45:00', photo: false },
  { id: 'TK-8812', flat: 'A-305', category: 'Electrical', priority: 'Low', desc: 'Lobby corridor light bulb replacement', status: 'Resolved', assignedTo: 'Suresh (Electrician)', sla: 'Completed', createdAt: '2026-08-21T14:20:00', photo: false },
  { id: 'TK-8811', flat: 'B-401', category: 'Water Supply', priority: 'Medium', desc: 'Low water pressure during peak hours', status: 'Under Review', assignedTo: 'Maintenance Team', sla: '8h remaining', createdAt: '2026-08-20T09:00:00', photo: false },
  { id: 'TK-8810', flat: 'C-202', category: 'Intercom', priority: 'Low', desc: 'Intercom not connecting to gate', status: 'Resolved', assignedTo: 'Tech Support', sla: 'Completed', createdAt: '2026-08-20T12:30:00', photo: false },
  { id: 'TK-8800', flat: 'A-104', category: 'Security', priority: 'High', desc: 'Main entrance gate lock damaged', status: 'Resolved', assignedTo: 'Vikram (Security)', sla: 'Completed', createdAt: '2026-08-20T08:15:00', photo: true },
];

export const mockVisitors = [
  { id: 'VIS-901', name: 'Rajesh Mehta', flat: 'A-402', purpose: 'Personal Guest', phone: '9876512345', vehicle: 'KA-05-MA-1234', entryTime: '11:35 AM', exitTime: '--', status: 'Inside', photo: true },
  { id: 'VIS-900', name: 'Sunita Devi', flat: 'A-402, B-102', purpose: 'Daily Help (Maid)', phone: '9876512346', vehicle: '--', entryTime: '09:15 AM', exitTime: '--', status: 'Inside', photo: true },
  { id: 'VIS-899', name: 'Amazon Delivery', flat: 'B-102', purpose: 'Delivery', phone: '9876512347', vehicle: '--', entryTime: '11:20 AM', exitTime: '11:25 AM', status: 'Departed', photo: true },
  { id: 'VIS-898', name: 'Plumber Ramesh', flat: 'A-402', purpose: 'Service Technician', phone: '9876512348', vehicle: '--', entryTime: '08:30 AM', exitTime: '10:45 AM', status: 'Departed', photo: true },
  { id: 'VIS-897', name: 'Swiggy Delivery', flat: 'C-301', purpose: 'Food Delivery', phone: '9876512349', vehicle: '--', entryTime: '12:45 PM', exitTime: '12:50 PM', status: 'Departed', photo: true },
  { id: 'VIS-896', name: 'Kumar (Painter)', flat: 'A-104', purpose: 'Contractor', phone: '9876512350', vehicle: 'KA-08-XY-7890', entryTime: '08:00 AM', exitTime: '--', status: 'Inside', photo: true },
  { id: 'VIS-895', name: 'Priya Shah', flat: 'B-205', purpose: 'Personal Guest', phone: '9876512351', vehicle: 'MH-02-AB-4567', entryTime: '10:30 AM', exitTime: '--', status: 'Inside', photo: true },
  { id: 'VIS-894', name: 'Flipkart Delivery', flat: 'C-501', purpose: 'Delivery', phone: '9876512352', vehicle: '--', entryTime: '09:45 AM', exitTime: '09:50 AM', status: 'Departed', photo: true },
  { id: 'VIS-893', name: 'AC Technician', flat: 'B-303', purpose: 'Service Technician', phone: '9876512353', vehicle: 'KA-09-CD-2345', entryTime: '11:00 AM', exitTime: '--', status: 'Inside', photo: true },
  { id: 'VIS-892', name: 'Zomato Delivery', flat: 'A-201', purpose: 'Food Delivery', phone: '9876512354', vehicle: '--', entryTime: '01:15 PM', exitTime: '01:20 PM', status: 'Departed', photo: true },
  { id: 'VIS-891', name: 'Ravi Kumar', flat: 'C-104', purpose: 'Personal Guest', phone: '9876512355', vehicle: 'TN-01-EF-6789', entryTime: '10:00 AM', exitTime: '12:30 PM', status: 'Departed', photo: true },
  { id: 'VIS-890', name: 'Electrician Suresh', flat: 'B-401', purpose: 'Service Technician', phone: '9876512356', vehicle: '--', entryTime: '08:45 AM', exitTime: '11:15 AM', status: 'Departed', photo: true },
  { id: 'VIS-889', name: 'Anjali Deshmukh', flat: 'A-305', purpose: 'Personal Guest', phone: '9876512357', vehicle: 'KA-10-GH-1234', entryTime: '11:45 AM', exitTime: '--', status: 'Inside', photo: true },
  { id: 'VIS-888', name: 'Dunzo Delivery', flat: 'C-202', purpose: 'Delivery', phone: '9876512358', vehicle: '--', entryTime: '10:15 AM', exitTime: '10:20 AM', status: 'Departed', photo: true },
  { id: 'VIS-887', name: 'Pest Control Team', flat: 'A-201', purpose: 'Service Team', phone: '9876512359', vehicle: 'KA-11-IJ-5678', entryTime: '09:00 AM', exitTime: '11:00 AM', status: 'Departed', photo: true },
];

export const mockAmenities = [
  { id: 'AMN-001', name: 'Tennis Court 1', type: 'Sports', capacity: '4 persons', bookingUnit: 'Hourly', fee: 'Free', advanceBooking: '7 days', status: 'Available', todayBookings: 5 },
  { id: 'AMN-002', name: 'Tennis Court 2', type: 'Sports', capacity: '4 persons', bookingUnit: 'Hourly', fee: 'Free', advanceBooking: '7 days', status: 'Available', todayBookings: 3 },
  { id: 'AMN-003', name: 'Clubhouse Banquet Hall', type: 'Event Space', capacity: '100 persons', bookingUnit: 'Full Day', fee: '₹5,000 + ₹2,000 deposit', advanceBooking: '30 days', status: 'Available', todayBookings: 0 },
  { id: 'AMN-004', name: 'Swimming Pool', type: 'Sports', capacity: '20 persons', bookingUnit: 'Session', fee: 'Free', advanceBooking: '1 day', status: 'Available', todayBookings: 8 },
  { id: 'AMN-005', name: 'Gym', type: 'Fitness', capacity: '15 persons', bookingUnit: 'Session', fee: 'Free', advanceBooking: '1 day', status: 'Available', todayBookings: 12 },
  { id: 'AMN-006', name: 'Badminton Court', type: 'Sports', capacity: '4 persons', bookingUnit: 'Hourly', fee: 'Free', advanceBooking: '7 days', status: 'Available', todayBookings: 4 },
  { id: 'AMN-007', name: 'Party Hall (Small)', type: 'Event Space', capacity: '30 persons', bookingUnit: 'Half Day', fee: '₹2,000 + ₹1,000 deposit', advanceBooking: '15 days', status: 'Available', todayBookings: 0 },
  { id: 'AMN-008', name: 'Kids Play Area', type: 'Recreation', capacity: '20 kids', bookingUnit: 'Walk-in', fee: 'Free', advanceBooking: 'Not Required', status: 'Available', todayBookings: 15 },
  { id: 'AMN-009', name: 'Community Garden', type: 'Outdoor', capacity: 'Unlimited', bookingUnit: 'Walk-in', fee: 'Free', advanceBooking: 'Not Required', status: 'Available', todayBookings: 0 },
  { id: 'AMN-010', name: 'Yoga/Aerobics Room', type: 'Fitness', capacity: '20 persons', bookingUnit: 'Session', fee: 'Free', advanceBooking: '3 days', status: 'Available', todayBookings: 6 },
];

export const mockBookings = [
  { id: 'BK-201', resident: 'Ananya Sharma', flat: 'A-402', amenity: 'Tennis Court 1', date: '2026-08-23', slot: '6:00 PM - 7:00 PM', status: 'Confirmed' },
  { id: 'BK-202', resident: 'Rohan Mehta', flat: 'B-102', amenity: 'Swimming Pool', date: '2026-08-24', slot: '7:00 AM - 8:00 AM', status: 'Confirmed' },
  { id: 'BK-203', resident: 'Sunita Rao', flat: 'C-301', amenity: 'Badminton Court', date: '2026-08-23', slot: '5:00 PM - 6:00 PM', status: 'Confirmed' },
  { id: 'BK-204', resident: 'Kabir Verma', flat: 'A-104', amenity: 'Gym', date: '2026-08-23', slot: '6:00 AM - 7:00 AM', status: 'Confirmed' },
  { id: 'BK-205', resident: 'Priya Patel', flat: 'B-205', amenity: 'Yoga Room', date: '2026-08-24', slot: '7:00 AM - 8:00 AM', status: 'Confirmed' },
  { id: 'BK-206', resident: 'Arjun Singh', flat: 'C-501', amenity: 'Tennis Court 2', date: '2026-08-25', slot: '6:30 PM - 7:30 PM', status: 'Confirmed' },
  { id: 'BK-207', resident: 'Neha Kapoor', flat: 'A-201', amenity: 'Clubhouse Banquet Hall', date: '2026-09-15', slot: 'Full Day', status: 'Pending Approval' },
  { id: 'BK-208', resident: 'Aditya Sharma', flat: 'B-303', amenity: 'Party Hall (Small)', date: '2026-08-30', slot: 'Evening 6 PM - 10 PM', status: 'Confirmed' },
  { id: 'BK-209', resident: 'Lakshmi Iyer', flat: 'C-104', amenity: 'Swimming Pool', date: '2026-08-23', slot: '5:00 PM - 6:00 PM', status: 'Confirmed' },
  { id: 'BK-210', resident: 'Vikram Reddy', flat: 'A-305', amenity: 'Gym', date: '2026-08-24', slot: '7:00 PM - 8:00 PM', status: 'Confirmed' },
];

export const mockPayments = [
  { id: 'PAY-301', flat: 'A-402', resident: 'Ananya Sharma', month: 'August 2026', amount: '₹4,766', method: 'UPI', date: '2026-08-05', receipt: 'GST-9021', status: 'Paid' },
  { id: 'PAY-302', flat: 'B-102', resident: 'Rohan Mehta', month: 'August 2026', amount: '₹6,240', method: 'Net Banking', date: '2026-08-06', receipt: 'GST-9022', status: 'Paid' },
  { id: 'PAY-303', flat: 'C-301', resident: 'Sunita Rao', month: 'August 2026', amount: '₹6,240', method: 'UPI', date: '2026-08-04', receipt: 'GST-9023', status: 'Paid' },
  { id: 'PAY-304', flat: 'A-104', resident: 'Kabir Verma', month: 'August 2026', amount: '₹3,200', method: 'Cash', date: '2026-08-08', receipt: 'GST-9024', status: 'Paid' },
  { id: 'PAY-305', flat: 'B-205', resident: 'Priya Patel', month: 'August 2026', amount: '₹4,766', method: 'UPI', date: '2026-08-03', receipt: 'GST-9025', status: 'Paid' },
  { id: 'PAY-306', flat: 'C-501', resident: 'Arjun Singh', month: 'August 2026', amount: '₹6,240', method: 'Card', date: '2026-08-10', receipt: 'GST-9026', status: 'Paid' },
  { id: 'PAY-307', flat: 'A-201', resident: 'Neha Kapoor', month: 'August 2026', amount: '₹4,766', method: 'UPI', date: '2026-08-07', receipt: 'GST-9027', status: 'Paid' },
  { id: 'PAY-308', flat: 'B-303', resident: 'Aditya Sharma', month: 'August 2026', amount: '₹6,240', method: 'Net Banking', date: '2026-08-02', receipt: 'GST-9028', status: 'Paid' },
  { id: 'PAY-309', flat: 'C-104', resident: 'Lakshmi Iyer', month: 'August 2026', amount: '₹4,766', method: 'UPI', date: '2026-08-09', receipt: 'GST-9029', status: 'Paid' },
  { id: 'PAY-310', flat: 'A-305', resident: 'Vikram Reddy', month: 'August 2026', amount: '₹6,240', method: 'UPI', date: '2026-08-11', receipt: 'GST-9030', status: 'Paid' },
  { id: 'PAY-311', flat: 'B-401', resident: 'Divya Krishnan', month: 'August 2026', amount: '₹6,240', method: 'Card', date: '--', receipt: '--', status: 'Pending' },
  { id: 'PAY-312', flat: 'C-202', resident: 'Rahul Khanna', month: 'August 2026', amount: '₹4,766', method: 'UPI', date: '--', receipt: '--', status: 'Pending' },
];

export const mockStaff = [
  { id: 'STF-001', name: 'Ramesh Kumar', role: 'Plumber', phone: '9876000101', available: true, rating: 4.5 },
  { id: 'STF-002', name: 'Suresh Electrician', role: 'Electrician', phone: '9876000102', available: true, rating: 4.8 },
  { id: 'STF-003', name: 'Kumar Painter', role: 'Painter', phone: '9876000103', available: false, rating: 4.2 },
  { id: 'STF-004', name: 'Raju Carpenter', role: 'Carpenter', phone: '9876000104', available: true, rating: 4.6 },
  { id: 'STF-005', name: 'Mohan AC Tech', role: 'AC Technician', phone: '9876000105', available: true, rating: 4.7 },
  { id: 'STF-006', name: 'Prakash Gardener', role: 'Gardener', phone: '9876000106', available: true, rating: 4.4 },
];

export const mockVendors = [
  { id: 'VND-001', name: 'OTIS Elevator Services', service: 'Elevator Maintenance', contract: 'Annual', amount: '₹1,20,000/year', validity: 'Till Jan 2027', status: 'Active' },
  { id: 'VND-002', name: 'GreenShield Security', service: 'Security Guards', contract: 'Monthly', amount: '₹2,40,000/month', validity: 'Till Dec 2026', status: 'Active' },
  { id: 'VND-003', name: 'AquaClean Services', service: 'Pool Maintenance', contract: 'Annual', amount: '₹25,000/month', validity: 'Till Mar 2027', status: 'Active' },
  { id: 'VND-004', name: 'CleanSweep', service: 'Housekeeping', contract: 'Annual', amount: '₹80,000/month', validity: 'Till Jun 2027', status: 'Active' },
  { id: 'VND-005', name: 'GreenLeaf Landscaping', service: 'Garden Maintenance', contract: 'Annual', amount: '₹35,000/month', validity: 'Till Sep 2027', status: 'Active' },
];

export const mockVehicles = [
  { id: 'VEH-001', plate: 'KA-03-MB-4921', owner: 'Ananya Sharma', flat: 'A-402', type: 'Car (Honda City)', slot: 'Parking B-42', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-002', plate: 'MH-12-PQ-9988', owner: 'Rohan Mehta', flat: 'B-102', type: 'Car (Hyundai i20)', slot: 'Parking A-15', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-003', plate: 'KA-05-AB-1234', owner: 'Sunita Rao', flat: 'C-301', type: 'Car (Maruti Swift)', slot: 'Parking C-28', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-004', plate: 'KA-01-XY-5678', owner: 'Kabir Verma', flat: 'A-104', type: 'Bike (Royal Enfield)', slot: 'Two-Wheeler Z-09', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-005', plate: 'KA-02-CD-9012', owner: 'Priya Patel', flat: 'B-205', type: 'Car (Tata Nexon)', slot: 'Parking B-18', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-006', plate: 'KA-04-EF-3456', owner: 'Arjun Singh', flat: 'C-501', type: 'Car (Kia Seltos)', slot: 'Parking C-45', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-007', plate: 'KA-06-GH-7890', owner: 'Neha Kapoor', flat: 'A-201', type: 'Car (Hyundai Creta)', slot: 'Parking A-22', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-008', plate: 'KA-07-IJ-2345', owner: 'Aditya Sharma', flat: 'B-303', type: 'Car (Toyota Innova)', slot: 'Parking B-35', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-009', plate: 'TN-01-KL-6789', owner: 'Lakshmi Iyer', flat: 'C-104', type: 'Car (Honda Amaze)', slot: 'Parking C-12', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-010', plate: 'AP-09-MN-3456', owner: 'Vikram Reddy', flat: 'A-305', type: 'Car (Mahindra XUV700)', slot: 'Parking A-38', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-011', plate: 'KL-08-OP-8901', owner: 'Divya Krishnan', flat: 'B-401', type: 'Car (Volkswagen Polo)', slot: 'Parking B-41', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-012', plate: 'DL-03-QR-4567', owner: 'Rahul Khanna', flat: 'C-202', type: 'Bike (Honda Activa)', slot: 'Two-Wheeler Z-15', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-013', plate: 'KA-10-ST-1234', owner: 'Meera Nair', flat: 'A-503', type: 'Car (Skoda Kushaq)', slot: 'Parking A-50', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-014', plate: 'HR-26-UV-5678', owner: 'Sanjay Gupta', flat: 'B-105', type: 'Bike (Yamaha FZ)', slot: 'Two-Wheeler Z-21', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-015', plate: 'GJ-01-WX-9012', owner: 'Anjali Desai', flat: 'C-405', type: 'Car (Nissan Magnite)', slot: 'Parking C-40', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-016', plate: 'PB-02-YZ-3456', owner: 'Karan Malhotra', flat: 'A-302', type: 'Bike (Bajaj Pulsar)', slot: 'Two-Wheeler Z-30', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-017', plate: 'UP-16-AB-7890', owner: 'Pooja Agarwal', flat: 'B-504', type: 'Car (Renault Kiger)', slot: 'Parking B-52', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-018', plate: 'RJ-14-CD-2345', owner: 'Harsh Joshi', flat: 'C-103', type: 'Bike (TVS Apache)', slot: 'Two-Wheeler Z-10', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-019', plate: 'KA-11-EF-6789', owner: 'Sneha Pillai', flat: 'A-405', type: 'Car (Ford EcoSport)', slot: 'Parking A-45', sticker: 'Valid', status: 'Verified' },
  { id: 'VEH-020', plate: 'BR-01-GH-1234', owner: 'Manish Kumar', flat: 'B-203', type: 'Car (Jeep Compass)', slot: 'Parking B-20', sticker: 'Valid', status: 'Verified' },
];

export const mockIncidents = [
  { id: 'INC-8921', category: 'Parking Dispute', flat: 'B-102', reporter: 'Vikram Singh (Guard)', desc: 'Visitor car parked blocking Tower B basement ramp', severity: 'Medium', status: 'Under Investigation', time: '10:45 AM', date: '2026-08-23' },
  { id: 'INC-8920', category: 'Property Damage', flat: 'C-301', reporter: 'Sunita Rao (Resident)', desc: 'Community garden bench broken', severity: 'Low', status: 'Open', time: '09:30 AM', date: '2026-08-23' },
  { id: 'INC-8919', category: 'Suspicious Activity', flat: '--', reporter: 'Suresh Kumar (Guard)', desc: 'Unknown person loitering near Gate 2', severity: 'High', status: 'Resolved', time: '07:15 AM', date: '2026-08-23' },
  { id: 'INC-8918', category: 'Safety Hazard', flat: 'A-402', reporter: 'Amit Gupta (Guard)', desc: 'Wet floor near elevator, slip risk', severity: 'Medium', status: 'Resolved', time: '11:20 AM', date: '2026-08-22' },
  { id: 'INC-8917', category: 'Pet Issue', flat: 'B-205', reporter: 'Neha Kapoor (Resident)', desc: 'Unleashed dog in common area', severity: 'Low', status: 'Warned', time: '05:45 PM', date: '2026-08-22' },
  { id: 'INC-8916', category: 'Theft Report', flat: 'C-104', reporter: 'Lakshmi Iyer (Resident)', desc: 'Bicycle stolen from parking area', severity: 'High', status: 'Under Investigation', time: '08:00 AM', date: '2026-08-22' },
  { id: 'INC-8810', category: 'Noise Disturbance', flat: 'C-401', reporter: 'Suresh Kumar (Guard)', desc: 'Loud music past 11 PM curfew', severity: 'Low', status: 'Resolved', time: '11:30 PM', date: '2026-08-22' },
  { id: 'INC-8809', category: 'Fire Hazard', flat: 'B-303', reporter: 'Rajesh Sharma (Guard)', desc: 'Electrical sparking in corridor', severity: 'High', status: 'Resolved', time: '03:20 PM', date: '2026-08-21' },
  { id: 'INC-8808', category: 'Vehicle Accident', flat: '--', reporter: 'Vikram Singh (Guard)', desc: 'Minor collision in parking area', severity: 'Medium', status: 'Reported to Insurance', time: '02:45 PM', date: '2026-08-21' },
  { id: 'INC-8807', category: 'Unattended Child', flat: 'A-201', reporter: 'Manoj Tiwari (Guard)', desc: 'Small child found alone near playground', severity: 'High', status: 'Resolved', time: '04:30 PM', date: '2026-08-21' },
  { id: 'INC-8801', category: 'Unauthorized Entry', flat: '--', reporter: 'Vikram Singh (Guard)', desc: 'Unknown person attempting entry via side gate', severity: 'High', status: 'Resolved', time: '02:15 AM', date: '2026-08-21' },
  { id: 'INC-8800', category: 'Medical Emergency', flat: 'B-401', reporter: 'Deepak Verma (Guard)', desc: 'Elderly resident fell, ambulance called', severity: 'Critical', status: 'Resolved', time: '06:50 PM', date: '2026-08-20' },
];

export const mockNotices = [
  { id: 'NTC-101', title: 'Overhead Water Tank Sanitization Notice', category: 'Maintenance Notice', body: 'Water supply will be paused on Tuesday from 10:00 AM to 02:00 PM for annual sanitization of all tower overhead tanks.', publishedBy: 'RWA Secretary', date: '2026-08-23', views: 145 },
  { id: 'NTC-100', title: 'Diwali Decoration Guidelines', category: 'Festival Announcement', body: 'Residents are requested to follow RWA-approved decoration guidelines. No oil lamps in corridors. Electric diyas recommended.', publishedBy: 'Cultural Committee', date: '2026-08-23', views: 98 },
  { id: 'NTC-099', title: 'Annual RWA General Body Meeting (AGM)', category: 'AGM Event', body: 'Scheduled for August 30 at 10:00 AM in Main Clubhouse. Key agenda: Financial Audit ledgers approval and RWA election handover updates.', publishedBy: 'RWA President', date: '2026-08-20', views: 230 },
  { id: 'NTC-098', title: 'Diwali Community Celebration', category: 'Event', body: 'Join us for community Diwali celebration on October 24th at Clubhouse. Cultural programs, dinner, and fireworks display.', publishedBy: 'Cultural Committee', date: '2026-08-15', views: 198 },
  { id: 'NTC-097', title: 'Gym Equipment Upgrade Completed', category: 'Facility Update', body: 'New treadmills, cross-trainers, and weight machines installed. Free trial sessions available this week.', publishedBy: 'Amenities Manager', date: '2026-08-12', views: 167 },
  { id: 'NTC-096', title: 'Parking Violation Penalty Update', category: 'Rules & Regulations', body: 'Unauthorized parking in visitor slots will now incur ₹500 penalty. Third violation leads to towing.', publishedBy: 'RWA Committee', date: '2026-08-10', views: 215 },
  { id: 'NTC-095', title: 'Swimming Pool Maintenance Schedule', category: 'Maintenance Notice', body: 'Pool will be closed every Monday 6 AM - 10 AM for cleaning and chemical treatment. Plan your swim sessions accordingly.', publishedBy: 'Maintenance Team', date: '2026-08-08', views: 142 },
  { id: 'NTC-094', title: 'Independence Day Flag Hoisting', category: 'National Event', body: 'Join us for Independence Day celebrations on August 15th at 8:00 AM. Flag hoisting followed by breakfast.', publishedBy: 'Cultural Committee', date: '2026-08-05', views: 180 },
  { id: 'NTC-093', title: 'New CCTV Cameras Installed', category: 'Security Update', body: '12 additional HD CCTV cameras installed in parking areas and corridors. 24/7 recording active.', publishedBy: 'Security Head', date: '2026-08-03', views: 201 },
  { id: 'NTC-092', title: 'Guest Parking Policy Reminder', category: 'Parking Rules', body: 'Maximum 2 hours for guest parking. Overnight guest parking requires prior approval from security desk.', publishedBy: 'RWA Secretary', date: '2026-08-01', views: 189 },
];
