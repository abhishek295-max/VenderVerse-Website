import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  VENDORS0, LISTINGS0, ORDERS0, BOOKINGS0, RFQS0, LEADS0, COMMISSIONS0, DISPUTES0, USERS0, AGENTS0, AUDIT0,
  NOTIFS0, THREADS0, SETTINGS0, REVIEWS0, ME,
} from './data.jsx'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const stamp = () => {
  const d = new Date()
  const h = d.getHours() % 12 || 12
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]}, ${String(h).padStart(2, '0')}:${m} ${d.getHours() >= 12 ? 'PM' : 'AM'}`
}

/* Hindi / English dictionary (SRS §4 Localization). Covers navigation + headline strings. */
const DICT = {
  en: {
    home: 'Home', explore: 'Explore', activity: 'Activity', quotes: 'Quotes', messages: 'Messages', profile: 'Profile',
    dashboard: 'Dashboard', work: 'Work', listings: 'Listings', more: 'More', leads: 'Leads', followups: 'Follow-ups', earnings: 'Earnings',
    approvals: 'Approvals', users: 'Users', reports: 'Reports',
    hello: 'Hello', whatNeed: 'What do you need today?', searchPh: 'Search vendors, products, services',
    categories: 'Categories', seeAll: 'See all', featured: 'Top verified vendors', popular: 'Popular right now',
    rfqTitle: 'Need a bulk quote?', rfqBody: 'Post a requirement and get quotations from verified vendors.', rfqCta: 'Request quotation',
    login: 'Log in', continue: 'Continue', welcomeTitle: 'One marketplace for products, services & quotes',
    welcomeBody: 'Order products, book services and compare vendor quotations — all in one place.',
    browse: 'Browse without login', language: 'Language', logout: 'Log out',
  },
  hi: {
    home: 'होम', explore: 'खोजें', activity: 'गतिविधि', messages: 'संदेश', profile: 'प्रोफ़ाइल',
    dashboard: 'डैशबोर्ड', work: 'काम', listings: 'लिस्टिंग', more: 'और', leads: 'लीड्स', followups: 'फॉलो-अप', earnings: 'कमाई',
    approvals: 'अनुमोदन', users: 'यूज़र', reports: 'रिपोर्ट',
    hello: 'नमस्ते', whatNeed: 'आज आपको क्या चाहिए?', searchPh: 'वेंडर, प्रोडक्ट, सेवाएं खोजें',
    categories: 'श्रेणियां', seeAll: 'सभी देखें', featured: 'शीर्ष सत्यापित वेंडर', popular: 'अभी लोकप्रिय',
    rfqTitle: 'थोक में कोटेशन चाहिए?', rfqBody: 'अपनी ज़रूरत पोस्ट करें और सत्यापित वेंडर से कोटेशन पाएं।', rfqCta: 'कोटेशन माँगें',
    login: 'लॉग इन', continue: 'आगे बढ़ें', welcomeTitle: 'प्रोडक्ट, सेवाएं और कोटेशन — एक ही मार्केटप्लेस',
    welcomeBody: 'प्रोडक्ट ऑर्डर करें, सेवाएं बुक करें और वेंडर कोटेशन की तुलना करें।',
    browse: 'बिना लॉगिन के देखें', language: 'भाषा', logout: 'लॉग आउट',
  },
}

export function AppProvider({ children, initialMe }) {
  const [me, setMe] = useState(initialMe || { role: 'customer', loggedIn: false, guest: true, vendorId: 'v-me', name: 'Guest' })
  const [lang, setLang] = useState('en')
  const [vendors, setVendors] = useState(VENDORS0)
  const [listings, setListings] = useState(LISTINGS0)
  const [orders, setOrders] = useState(ORDERS0)
  const [bookings, setBookings] = useState(BOOKINGS0)
  const [rfqs, setRfqs] = useState(RFQS0)
  const [leads, setLeads] = useState(LEADS0)
  const [commissions, setCommissions] = useState(COMMISSIONS0)
  const [disputes, setDisputes] = useState(DISPUTES0)
  const [users, setUsers] = useState(USERS0)
  const [agents, setAgents] = useState(AGENTS0)
  const [audit, setAudit] = useState(AUDIT0)
  const [notifs, setNotifs] = useState(NOTIFS0)
  const [threads, setThreads] = useState(THREADS0)
  const [settings, setSettings] = useState(SETTINGS0)
  const [reviews, setReviews] = useState(REVIEWS0)
  const [saved, setSaved] = useState(['l3', 'l11', 'v7'])
  const [compare, setCompare] = useState([])
  const [toastMsg, setToast] = useState(null)
  const [reviewed, setReviewed] = useState([])
  const [prefs, setPrefs] = useState({ orders: true, bookings: true, quotes: true, promos: false, quiet: false })

  const toast = useCallback((msg, tone = 'ok') => {
    const id = Date.now()
    setToast({ msg, tone, id })
    setTimeout(() => setToast((t) => (t && t.id === id ? null : t)), 2600)
  }, [])

  const addAudit = useCallback((action, target, kind = 'approval', note) => {
    setAudit((a) => [{ id: 'a' + Date.now() + Math.random(), actor: ME.admin, action, target, at: stamp(), kind, note }, ...a])
  }, [])
  const notify = useCallback((role, title, body, type = 'order') => {
    setNotifs((n) => ({ ...n, [role]: [{ id: 'n' + Date.now() + Math.random(), type, title, body, time: 'Just now', read: false }, ...n[role]] }))
  }, [])
  const patch = useCallback((setter) => (id, changes) => setter((l) => l.map((x) => (x.id === id ? { ...x, ...(typeof changes === 'function' ? changes(x) : changes) } : x))), [])

  const api = useMemo(() => {
    const t = (k) => DICT[lang][k] ?? DICT.en[k] ?? k
    const vendor = (id) => vendors.find((v) => v.id === id)
    const isVerified = (id) => vendor(id)?.status === 'approved'
    return {
      me, setMe, lang, setLang, t, toast, toastMsg, addAudit, notify,
      vendors, setVendors, vendor, isVerified, patchVendor: patch(setVendors),
      listings, setListings, patchListing: patch(setListings),
      orders, setOrders, patchOrder: patch(setOrders),
      bookings, setBookings, patchBooking: patch(setBookings),
      rfqs, setRfqs, patchRfq: patch(setRfqs),
      leads, setLeads, patchLead: patch(setLeads),
      commissions, setCommissions, patchCommission: patch(setCommissions),
      disputes, setDisputes, patchDispute: patch(setDisputes),
      users, setUsers, patchUser: patch(setUsers),
      agents, setAgents,
      audit, notifs, setNotifs, threads, setThreads,
      settings, setSettings, reviews, setReviews, reviewed, setReviewed,
      saved, setSaved, compare, setCompare, prefs, setPrefs,
      toggleSaved: (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])),
      toggleCompare: (id) => setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= 3 ? c : [...c, id])),
      stamp,
    }
  }, [me, lang, vendors, listings, orders, bookings, rfqs, leads, commissions, disputes, users, agents, audit, notifs, threads, settings, reviews, reviewed, saved, compare, toastMsg, prefs, toast, addAudit, notify, patch])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

