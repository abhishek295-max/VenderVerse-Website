import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  VENDORS0, LISTINGS0, ORDERS0, BOOKINGS0, RFQS0, LEADS0, COMMISSIONS0, DISPUTES0, USERS0, AGENTS0, AUDIT0,
  NOTIFS0, THREADS0, SETTINGS0, REVIEWS0, ME,
} from './data.jsx'
import { CATS } from './data.jsx'
import { clearState, loadState, saveState } from './services/browserRepository.js'
import { can, ownsCustomerRecord, ownsVendor } from './services/authorization.js'

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
  const seed = useMemo(() => ({
    me: { role: 'customer', loggedIn: false, guest: true, vendorId: 'v-me', name: 'Guest', accountState: 'active', buyerMode: false },
    customCategories: [],
    lang: 'en', locale: { country: 'IN', currency: 'INR', timeZone: 'Asia/Kolkata' }, vendors: VENDORS0, listings: LISTINGS0, orders: ORDERS0,
    bookings: BOOKINGS0, rfqs: RFQS0, leads: LEADS0, commissions: COMMISSIONS0, disputes: DISPUTES0, users: USERS0, agents: AGENTS0,
    audit: AUDIT0, notifs: NOTIFS0, threads: THREADS0, settings: SETTINGS0, reviews: REVIEWS0, saved: ['l3', 'l11', 'v7'], compare: [],
    reviewed: [], prefs: { orders: true, bookings: true, quotes: true, promos: false, quiet: false },
  }), [])
  const restored = useMemo(() => loadState(seed), [seed])
  const [me, setMe] = useState(initialMe || restored.me)
  const [lang, setLang] = useState(restored.lang)
  const [locale, setLocale] = useState(restored.locale)
  const [vendors, setVendors] = useState(restored.vendors)
  const [listings, setListings] = useState(restored.listings)
  const [orders, setOrders] = useState(restored.orders)
  const [bookings, setBookings] = useState(restored.bookings)
  const [rfqs, setRfqs] = useState(restored.rfqs)
  const [leads, setLeads] = useState(restored.leads)
  const [commissions, setCommissions] = useState(restored.commissions)
  const [disputes, setDisputes] = useState(restored.disputes)
  const [users, setUsers] = useState(restored.users)
  const [agents, setAgents] = useState(restored.agents)
  const [audit, setAudit] = useState(restored.audit)
  const [notifs, setNotifs] = useState(restored.notifs)
  const [threads, setThreads] = useState(restored.threads)
  const [settings, setSettings] = useState(restored.settings)
  const [reviews, setReviews] = useState(restored.reviews)
  const [saved, setSaved] = useState(restored.saved)
  const [compare, setCompare] = useState(restored.compare)
  const [toastMsg, setToast] = useState(null)
  const [reviewed, setReviewed] = useState(restored.reviewed)
  const [prefs, setPrefs] = useState(restored.prefs)
  const [customCategories, setCustomCategories] = useState(restored.customCategories || [])

  useEffect(() => {
    saveState({ me, lang, locale, vendors, listings, orders, bookings, rfqs, leads, commissions, disputes, users, agents, audit, notifs, threads, settings, reviews, saved, compare, reviewed, prefs, customCategories })
  }, [me, lang, locale, vendors, listings, orders, bookings, rfqs, leads, commissions, disputes, users, agents, audit, notifs, threads, settings, reviews, saved, compare, reviewed, prefs, customCategories])

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
      me, setMe, lang, setLang, locale, setLocale, t, toast, toastMsg, addAudit, notify,
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
      categories: [...CATS, ...customCategories.map((c) => ({ ...c, icon: CATS[0].icon }))], customCategories, setCustomCategories,
      saved, setSaved, compare, setCompare, prefs, setPrefs,
      toggleSaved: (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])),
      toggleCompare: (id) => setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= 3 ? c : [...c, id])),
      can: (permission) => can(me, permission),
      ownsVendor: (vendorId) => ownsVendor(me, vendorId),
      ownsCustomerRecord: (record) => ownsCustomerRecord(me, record),
      resetWorkspace: () => { clearState(); window.location.reload() },
      stamp,
    }
  }, [me, lang, locale, vendors, listings, orders, bookings, rfqs, leads, commissions, disputes, users, agents, audit, notifs, threads, settings, reviews, reviewed, saved, compare, toastMsg, prefs, toast, addAudit, notify, patch])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

