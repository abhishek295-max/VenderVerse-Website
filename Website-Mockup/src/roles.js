import {
  Home, Compass, ClipboardList, MessageCircle, User, LayoutDashboard, Briefcase, Package, MoreHorizontal, Users, CalendarClock,
  Wallet, ShieldCheck, BarChart3, Settings,
} from 'lucide-react'

export const ROLES = [
  { id: 'customer', label: 'Customer', short: 'Customer' },
  { id: 'vendor', label: 'Vendor / Supplier', short: 'Vendor' },
  { id: 'business', label: 'Business / Company Supplier', short: 'Business' },
  { id: 'agent', label: 'Sales Agent', short: 'Agent' },
  { id: 'admin', label: 'Super Admin', short: 'Admin' },
]

export const HOME = { customer: 'c_home', vendor: 'v_dash', agent: 'a_home', admin: 'ad_dash' }
HOME.business = 'v_dash'

/* bottom navigation per role — `k` is a dictionary key for Hindi/English labels */
export const TABS = {
  customer: [
    { id: 'c_home', k: 'home', icon: Home },
    { id: 'c_explore', k: 'explore', icon: Compass },
    { id: 'c_activity', k: 'quotes', icon: ClipboardList },
    { id: 'messages', k: 'messages', icon: MessageCircle },
    { id: 'c_profile', k: 'profile', icon: User },
  ],
  vendor: [
    { id: 'v_dash', k: 'dashboard', icon: LayoutDashboard },
    { id: 'v_work', k: 'quotes', icon: Briefcase },
    { id: 'v_listings', k: 'listings', icon: Package },
    { id: 'messages', k: 'messages', icon: MessageCircle },
    { id: 'v_more', k: 'more', icon: MoreHorizontal },
  ],
  business: [
    { id: 'v_dash', k: 'dashboard', icon: LayoutDashboard },
    { id: 'v_work', k: 'quotes', icon: Briefcase },
    { id: 'v_listings', k: 'listings', icon: Package },
    { id: 'messages', k: 'messages', icon: MessageCircle },
    { id: 'v_more', k: 'more', icon: MoreHorizontal },
  ],
  agent: [
    { id: 'a_home', k: 'home', icon: Home },
    { id: 'a_leads', k: 'leads', icon: Users },
    { id: 'a_followups', k: 'followups', icon: CalendarClock },
    { id: 'a_earnings', k: 'earnings', icon: Wallet },
    { id: 'a_profile', k: 'profile', icon: User },
  ],
  admin: [
    { id: 'ad_dash', k: 'dashboard', icon: LayoutDashboard },
    { id: 'ad_approvals', k: 'approvals', icon: ShieldCheck },
    { id: 'ad_users', k: 'users', icon: Users },
    { id: 'ad_reports', k: 'reports', icon: BarChart3 },
    { id: 'ad_more', k: 'more', icon: Settings },
  ],
}

