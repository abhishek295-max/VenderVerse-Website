import * as Auth from './screens/auth.jsx'
import * as C1 from './screens/customer1.jsx'
import * as C2 from './screens/customer2.jsx'
import * as V from './screens/vendor.jsx'
import * as A from './screens/agent.jsx'
import * as AD from './screens/admin.jsx'
import { WebsiteHome } from './screens/website-home.jsx'


/*  id → { C: component, role, title, fr: [FR codes], bar: status-bar tone, demo: params used when jumping from the directory }  */
const R = (id, C, role, title, fr = [], extra = {}) => [id, { id, C, role, title, fr, ...extra }]

export const SCREENS = Object.fromEntries([
  // ---- auth ----
  R('splash', Auth.Splash, 'auth', 'Splash', ['FR-01'], { bar: 'brand-dark' }),
  R('welcome', Auth.Welcome, 'auth', 'Welcome & language', ['FR-01'], { bar: 'brand' }),
  R('login', Auth.Login, 'auth', 'Log in (phone / email)', ['FR-01', 'FR-02']),
  R('otp', Auth.Otp, 'auth', 'OTP & admin MFA', ['FR-01', 'FR-02'], { demo: { contact: '+91 98290 00001', role: 'customer' } }),
  R('register', Auth.Register, 'auth', 'Create account', ['FR-01', 'FR-03']),

  // ---- customer ----
  R('c_home', WebsiteHome, 'customer', 'Marketplace', ['FR-05', 'FR-10'], { tab: true, bar: 'brand' }),
  R('c_categories', C1.Categories, 'customer', 'All categories', ['FR-04', 'FR-05']),
  R('c_category', C1.Category, 'customer', 'Category detail', ['FR-04', 'FR-05'], { demo: { id: 'elec' } }),
  R('c_explore', C1.Explore, 'customer', 'Search, filters & results', ['FR-05'], { tab: true }),
  R('c_listing', C1.ListingDetail, 'customer', 'Product / service detail', ['FR-04', 'FR-05', 'FR-10'], { demo: { id: 'l1' } }),
  R('c_vendor', C1.VendorProfile, 'customer', 'Vendor profile', ['FR-03', 'FR-05'], { demo: { id: 'v-me' } }),
  R('c_activity', C2.Quotes, 'customer', 'Quote requests (RFQ)', ['FR-08'], { tab: true }),
  R('c_booking_new', C2.BookingNew, 'customer', 'Request a service booking', ['FR-09']),
  R('c_booking', C2.BookingDetail, 'shared', 'Booking details & actions', ['FR-09', 'FR-11'], { demo: { id: 'BKG-1039' } }),
  R('c_rfq_new', C2.RfqNew, 'customer', 'Create RFQ', ['FR-08']),
  R('c_rfq', C2.RfqDetail, 'customer', 'RFQ & compare quotations', ['FR-08', 'FR-15'], { demo: { id: 'RFQ-311' } }),
  R('c_saved', C2.Saved, 'customer', 'Saved & compare', ['FR-05']),
  R('messages', C2.Messages, 'shared', 'Messages (customer and vendor)', ['FR-10'], { tab: true }),
  R('chat', C2.Chat, 'shared', 'Chat', ['FR-10'], { demo: { id: 't1' } }),
  R('notifications', C2.Notifications, 'shared', 'Notifications', ['FR-10']),
  R('c_review', C2.WriteReview, 'customer', 'Rate a vendor', ['FR-11'], { demo: { vendorId: 'v-me' } }),
  R('c_issue_new', C2.IssueNew, 'customer', 'Report an issue', ['FR-11']),
  R('c_issues', C2.Issues, 'customer', 'Support & issues', ['FR-11']),
  R('c_issue', C2.IssueDetail, 'customer', 'Issue status', ['FR-11', 'FR-15'], { demo: { id: 'DSP-204' } }),
  R('c_profile', C2.Profile, 'customer', 'Profile', ['FR-01'], { tab: true }),
  R('c_profile_edit', C2.ProfileEdit, 'customer', 'Edit profile', ['FR-01']),
  R('c_settings', C2.CustomerSettings, 'customer', 'Settings, privacy & sessions', ['FR-01', 'FR-10']),

  // ---- vendor ----
  R('v_dash', V.VendorDashboard, 'vendor', 'Dashboard', ['FR-03', 'FR-08', 'FR-10'], { tab: true, bar: 'ink' }),
  R('v_register', V.VendorRegister, 'vendor', 'Registration wizard', ['FR-03']),
  R('v_verify', V.VendorVerify, 'vendor', 'Verification status', ['FR-03', 'FR-15']),
  R('v_listings', V.VendorListings, 'vendor', 'My listings', ['FR-04'], { tab: true }),
  R('v_listing_edit', V.ListingEdit, 'vendor', 'Add / edit listing', ['FR-04'], { demo: { id: 'l1' } }),
  R('v_work', V.VendorQuotes, 'vendor', 'Quote requests (RFQ)', ['FR-08'], { tab: true }),
  R('v_rfq', V.VendorRfq, 'vendor', 'Submit / revise quotation', ['FR-08', 'FR-15'], { demo: { id: 'RFQ-315' } }),
  R('v_perf', V.Performance, 'vendor', 'Performance reports', ['FR-13']),
  R('v_reviews', V.VendorReviews, 'vendor', 'Customer reviews', ['FR-11']),
  R('v_more', V.VendorMore, 'vendor', 'More', ['FR-02'], { tab: true }),
  R('v_profile', V.VendorProfile, 'vendor', 'Business profile & plan', ['FR-03', 'FR-14']),

  // ---- sales agent ----
  R('a_home', A.AgentHome, 'agent', 'Home & pipeline', ['FR-12'], { tab: true, bar: 'brand-dark' }),
  R('a_leads', A.Leads, 'agent', 'Leads', ['FR-12'], { tab: true }),
  R('a_lead', A.LeadDetail, 'agent', 'Lead detail', ['FR-12', 'FR-15'], { demo: { id: 'ld1' } }),
  R('a_lead_new', A.LeadNew, 'agent', 'Add lead', ['FR-12']),
  R('a_log', A.LogActivity, 'agent', 'Log call / message / visit', ['FR-12'], { demo: { id: 'ld1' } }),
  R('a_followups', A.Followups, 'agent', 'Follow-ups', ['FR-12'], { tab: true }),
  R('a_onboard', A.Onboard, 'agent', 'Assisted onboarding (consent)', ['FR-12', 'FR-03'], { demo: { id: 'ld1' } }),
  R('a_earnings', A.AgentEarnings, 'agent', 'Commissions', ['FR-12'], { tab: true }),
  R('a_profile', A.AgentProfile, 'agent', 'Profile', ['FR-02', 'FR-12'], { tab: true }),

  // ---- super admin ----
  R('ad_dash', AD.AdminDashboard, 'admin', 'Dashboard', ['FR-13'], { tab: true, bar: 'ink' }),
  R('ad_approvals', AD.Approvals, 'admin', 'Approvals hub', ['FR-03', 'FR-04', 'FR-11'], { tab: true }),
  R('ad_vendors', AD.AdminVendors, 'admin', 'Vendor verification queue', ['FR-03']),
  R('ad_vendor', AD.AdminVendor, 'admin', 'Review vendor', ['FR-03', 'FR-15'], { demo: { id: 'v8' } }),
  R('ad_listings', AD.AdminListings, 'admin', 'Listing moderation', ['FR-04']),
  R('ad_listing', AD.AdminListing, 'admin', 'Review listing', ['FR-04', 'FR-15'], { demo: { id: 'l5' } }),
  R('ad_users', AD.UsersScreen, 'admin', 'Users', ['FR-02'], { tab: true }),
  R('ad_user', AD.UserDetail, 'admin', 'User & role', ['FR-02'], { demo: { id: 'u1' } }),
  R('ad_roles', AD.Roles, 'admin', 'Roles & permissions', ['FR-02']),
  R('ad_categories', AD.AdminCategories, 'admin', 'Categories', ['FR-04']),
  R('ad_category', AD.AdminCategory, 'admin', 'Category & required fields', ['FR-04'], { demo: { id: 'elec' } }),
  R('ad_agents', AD.AdminAgents, 'admin', 'Sales agents', ['FR-12']),
  R('ad_agent', AD.AdminAgent, 'admin', 'Agent & commissions', ['FR-12', 'FR-09'], { demo: { id: 'ag1' } }),
  R('ad_disputes', AD.AdminDisputes, 'admin', 'Disputes & support', ['FR-11']),
  R('ad_dispute', AD.AdminDispute, 'admin', 'Resolve dispute', ['FR-11', 'FR-15'], { demo: { id: 'DSP-204' } }),
  R('ad_reports', AD.AdminReports, 'admin', 'Reports & export', ['FR-13'], { tab: true }),
  R('ad_settings', AD.AdminSettings, 'admin', 'Platform settings', ['FR-14']),
  R('ad_audit', AD.AuditLog, 'admin', 'Audit log', ['FR-15']),
  R('ad_more', AD.AdminMore, 'admin', 'More', ['FR-02'], { tab: true }),
])

export const GROUPS = [
  { id: 'auth', label: 'Auth' },
  { id: 'customer', label: 'Customer' },
  { id: 'vendor', label: 'Vendor' },
  { id: 'agent', label: 'Agent' },
  { id: 'admin', label: 'Admin' },
]


