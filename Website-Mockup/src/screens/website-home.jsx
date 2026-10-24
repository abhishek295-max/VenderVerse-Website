import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, BadgeCheck, Building2, FileText, Heart, MapPin, MessageCircle, Package, Search, ShieldCheck, Sparkles, Star, Store } from 'lucide-react'
import { useApp } from '../store.jsx'
import { useNav } from '../nav.jsx'
import { CATS, cat } from '../data.jsx'
import { Avatar, Button, Card, Thumb, cx, fmt, GRAD } from '../ui.jsx'
import './website-home.css'

function HeroMotion() {
  const stageRef = useRef(null)
  const tiltRef = useRef(null)
  useEffect(() => {
    const stage = stageRef.current
    const tilt = tiltRef.current
    const hero = stage?.closest('.vv-market-hero')
    if (!hero || !tilt || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = (event) => {
      const rect = hero.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - .5
      const y = (event.clientY - rect.top) / rect.height - .5
      tilt.style.setProperty('--vv-ry', `${x * 40}deg`)
      tilt.style.setProperty('--vv-rx', `${-18 - y * 24}deg`)
    }
    const reset = () => { tilt.style.setProperty('--vv-ry', '0deg'); tilt.style.setProperty('--vv-rx', '-18deg') }
    hero.addEventListener('mousemove', move)
    hero.addEventListener('mouseleave', reset)
    return () => { hero.removeEventListener('mousemove', move); hero.removeEventListener('mouseleave', reset) }
  }, [])
  return (
    <div ref={stageRef} className="vv-hero-stage" aria-hidden="true">
      <div ref={tiltRef} className="vv-hero-tilt"><div className="vv-hero-scene">
        <div className="vv-hero-ring" /><div className="vv-hero-ring vv-hero-ring-b" /><div className="vv-hero-ring vv-hero-ring-c" />
        <div className="vv-hero-cube">{Array.from({ length: 6 }, (_, i) => <div className="vv-hero-cube-face" key={i}><svg viewBox="0 0 40 36"><path d="M2 3h9l9 20 9-20h9L24 33h-8z" fill="#fff" /></svg></div>)}</div>
        <div className="vv-hero-orbit">{[[0, ShieldCheck], [90, Package], [180, Store], [270, Building2]].map(([angle, Icon]) => <div className="vv-hero-node" style={{ '--node-angle': `${angle}deg` }} key={angle}><span className="vv-hero-node-icon"><Icon size={18} /></span></div>)}</div>
      </div></div>
    </div>
  )
}

export function WebsiteHome() {
  const nav = useNav()
  const { me, listings, vendors, saved, toggleSaved, locale } = useApp()
  const [query, setQuery] = useState('')
  const featured = vendors.filter((v) => v.status === 'approved').sort((a, b) => b.rating - a.rating).slice(0, 4)
  const popular = useMemo(() => listings.filter((l) => l.status === 'approved').sort((a, b) => b.reviews - a.reviews).slice(0, 4), [listings])
  const search = (e) => { e.preventDefault(); nav.go('c_explore', query.trim() ? { q: query.trim() } : {}) }

  return (
    <div className="vv-c-home h-full overflow-y-auto">
      <section className="vv-market-hero relative overflow-hidden text-white">
        <div className="vv-hero-leaf vv-hero-leaf-a" style={{ '--leaf-turn': '35deg' }} />
        <div className="vv-hero-leaf vv-hero-leaf-b" style={{ '--leaf-turn': '-20deg' }} />
        <div className="vv-hero-leaf vv-hero-leaf-c" />
        <div className="vv-hero-waves"><div><svg viewBox="0 0 2400 60" preserveAspectRatio="none"><path d="M0 30C150 0 350 60 600 30S1050 0 1200 30C1350 0 1550 60 1800 30S2250 0 2400 30V60H0z" fill="rgba(255,255,255,.5)" /></svg></div><div><svg viewBox="0 0 2400 60" preserveAspectRatio="none"><path d="M0 38C200 10 400 60 600 38S1000 10 1200 38C1400 10 1600 60 1800 38S2200 10 2400 38V60H0z" fill="rgba(255,255,255,.55)" /></svg></div></div>
        <div className="absolute -right-28 -top-32 size-[28rem] rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -bottom-40 left-[35%] size-[26rem] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="vv-market-hero-inner relative mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-14 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <span className="vv-hero-tag"><Sparkles size={14} /> A trusted global marketplace</span>
            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[58px]">Find the right vendor. <span className="text-teal-300">Get work moving.</span></h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">Discover verified suppliers and service professionals, compare quotations, and talk directly to the people who can help.</p>
            <form onSubmit={search} className="vv-market-search mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-black/20 sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3"><Search size={20} className="shrink-0 text-ink-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try ‘electrical supplies’ or ‘home cleaning’" className="h-12 min-w-0 flex-1 bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-400" /></div>
              <Button type="submit" className="h-12 rounded-xl px-6">Search marketplace <ArrowRight size={17} /></Button>
            </form>
            <div className="vv-market-facts mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-white/65"><span className="inline-flex items-center gap-1.5"><MapPin size={14} /> Jaipur, Rajasthan</span><span>Verified businesses</span><span>Direct conversations</span></div>
          </div>
          <div className="vv-hero-side relative hidden min-h-[370px] lg:block">
            <HeroMotion />
            <div className="absolute inset-7 rounded-[2.5rem] bg-gradient-to-br from-teal-300/30 via-brand-500/20 to-indigo-400/20 blur-2xl" />
            <div className="vv-hero-feature-panel absolute right-10 top-8 w-[min(100%,440px)] rotate-2 rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between"><div><p className="text-xs font-semibold text-teal-100">GLOBAL PICKS</p><p className="mt-1 text-lg font-extrabold">Popular worldwide</p></div><span className="grid size-11 place-items-center rounded-2xl bg-teal-300/20 text-teal-200"><Store size={21} /></span></div>
              <div className="mt-5 space-y-3">
                {popular.slice(0, 3).map((l) => { const vendor = vendors.find((v) => v.id === l.vendorId); return <button key={l.id} onClick={() => nav.go('c_listing', { id: l.id })} className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 text-left transition hover:bg-white/15"><Thumb tone={l.tone} icon={cat(l.cat).icon} size={52} round="rounded-xl" /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{l.title}</span><span className="mt-1 flex items-center gap-1 text-xs text-white/65">{vendor?.name || 'Verified vendor'} <BadgeCheck size={13} className="text-teal-300" /></span></span><span className="text-sm font-extrabold">{fmt(l.price)}</span></button> })}
              </div>
              <button onClick={() => nav.go('c_explore')} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-sm font-bold text-teal-100 hover:bg-white/10">Explore all listings <ArrowRight size={16} /></button>
            </div>
            <div className="vv-hero-proof absolute bottom-6 left-0 flex items-center gap-3 rounded-2xl border border-white/20 bg-white p-3.5 text-ink-900 shadow-xl"><span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><ShieldCheck size={22} /></span><span><span className="block text-sm font-extrabold">Verified before they’re featured</span><span className="mt-0.5 block text-xs text-ink-500">Local businesses, reviewed by our team</span></span></div>
          </div>
        </div>
      </section>

      <div className="vv-market-content mx-auto max-w-[1440px] space-y-14 px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <section className="vv-market-categories">
          <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand-700">Browse by need</p><h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink-900">Explore categories</h2></div><button onClick={() => nav.go('c_categories')} className="flex shrink-0 items-center gap-1 text-sm font-bold text-brand-700">All categories <ArrowRight size={16} /></button></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CATS.slice(0, 6).map((c) => <button key={c.id} onClick={() => nav.go('c_category', { id: c.id })} className="group flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg"><Thumb tone={c.tone} icon={c.icon} size={46} round="rounded-xl" /><span className="min-w-0"><span className="block truncate text-sm font-bold text-ink-900">{c.name}</span><span className="mt-0.5 block text-xs text-ink-500">{c.type === 'service' ? 'Services' : 'Products'}</span></span></button>)}
          </div>
        </section>

        <section className="vv-market-vendors">
          <div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand-700">Chosen for quality</p><h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink-900">Featured verified vendors</h2></div><button onClick={() => nav.go('c_explore', { mode: 'vendors' })} className="flex items-center gap-1 text-sm font-bold text-brand-700">Browse vendors <ArrowRight size={16} /></button></div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((v) => <Card key={v.id} onClick={() => nav.go('c_vendor', { id: v.id })} className="group overflow-hidden !p-0 transition hover:-translate-y-1 hover:shadow-xl"><div className={cx('relative h-28 bg-gradient-to-br', GRAD[v.tone])}><div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" /><span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-extrabold text-ink-900"><Star size={13} className="fill-amber-400 text-amber-400" />{v.rating.toFixed(1)}</span></div><div className="px-4 pb-4"><div className="-mt-7 grid size-14 place-items-center rounded-2xl border-4 border-white bg-white shadow"><Avatar name={v.name} size={42} /></div><h3 className="mt-2 truncate font-extrabold text-ink-900">{v.name}</h3><p className="mt-1 text-sm text-ink-500">{cat(v.cat).name} · {v.city}</p><div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3 text-xs"><span className="inline-flex items-center gap-1 font-bold text-emerald-700"><BadgeCheck size={15} /> Verified</span><span className="text-ink-500">{v.reviews} reviews</span></div></div></Card>)}
          </div>
        </section>

        <section className="rounded-[2rem] bg-ink-50 p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:p-10"><div className="max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand-700">For larger requirements</p><h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">One request. Multiple quotations.</h2><p className="mt-2 text-sm leading-relaxed text-ink-600">Share what you need and compare responses from vendors that fit your requirements.</p></div><div className="mt-5 flex flex-wrap gap-3 lg:mt-0"><Button onClick={() => nav.go('c_rfq_new')}><FileText size={17} /> Create an RFQ</Button><Button variant="secondary" onClick={() => nav.go('messages')}><MessageCircle size={17} /> Talk to vendors</Button></div></section>

        <section>
          <div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand-700">Popular this week</p><h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink-900">Products and services</h2></div><button onClick={() => nav.go('c_explore')} className="flex items-center gap-1 text-sm font-bold text-brand-700">View marketplace <ArrowRight size={16} /></button></div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {popular.map((l) => { const v = vendors.find((x) => x.id === l.vendorId); return <article key={l.id} className="overflow-hidden rounded-2xl border border-ink-100 bg-white transition hover:-translate-y-1 hover:shadow-xl"><button onClick={() => nav.go('c_listing', { id: l.id })} className="relative flex h-40 w-full items-center justify-center bg-ink-50"><Thumb tone={l.tone} icon={cat(l.cat).icon} size={82} /><span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-ink-600">{cat(l.cat).name}</span></button><div className="p-4"><button onClick={() => nav.go('c_listing', { id: l.id })} className="line-clamp-2 min-h-10 text-left text-sm font-extrabold text-ink-900 hover:text-brand-700">{l.title}</button><button onClick={() => nav.go('c_vendor', { id: v?.id })} className="mt-1 block text-xs text-ink-500 hover:text-brand-700">{v?.name || 'Local vendor'} · {v?.city}</button><div className="mt-4 flex items-center justify-between"><span className="text-lg font-black text-ink-900">{fmt(l.price)}<span className="ml-1 text-xs font-medium text-ink-500">/{l.unit}</span></span><button onClick={() => toggleSaved(l.id)} aria-label={saved.includes(l.id) ? 'Remove from saved' : 'Save listing'} className={cx('grid size-9 place-items-center rounded-full border transition', saved.includes(l.id) ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-ink-200 text-ink-500 hover:border-rose-200 hover:text-rose-600')}><Heart size={17} className={saved.includes(l.id) ? 'fill-current' : ''} /></button></div></div></article> })}
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-ink-100 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 VendorVerse · Products, services and quotations</span><div className="flex gap-5"><button onClick={() => nav.go('c_issues')} className="hover:text-brand-700">Help & support</button><button onClick={() => nav.go(me.guest ? 'login' : 'c_profile')} className="hover:text-brand-700">{me.guest ? 'Sign in' : 'My account'}</button></div></footer>
      </div>
    </div>
  )
}
