import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { dict, Lang } from './i18n'
import { projects, Project } from './data/projects'
import { contact } from './config'

const GLYPHS = ['◆', '▦', '◎', '▶', '✎']
const IDS = ['home', 'portfolio', 'services'] as const

function Ph({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div role="img" aria-label={label} className={`grid-bg relative flex items-center justify-center bg-panel ${className}`}>
      <svg viewBox="0 0 120 80" className="h-1/2 w-1/2 opacity-40" fill="none" stroke="#c6ff3d" strokeWidth="1.5" aria-hidden>
        <path d="M5 5h40v25h30V5h40v70H80V50H45v25H5z" /><circle cx="60" cy="40" r="5" fill="#ff5a36" stroke="none" />
      </svg>
      <span className="absolute bottom-2 left-3 text-[10px] uppercase tracking-widest text-zinc-500">Placeholder</span>
    </div>
  )
}
const Img = ({ src, alt, className }: { src?: string; alt: string; className?: string }) =>
  src ? <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} /> : <Ph label={alt} className={className} />

function Modal({ p, lang, onClose, onNav }: { p: Project; lang: Lang; onClose: () => void; onNav: (d: number) => void }) {
  const t = dict[lang], ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    ref.current?.focus(); document.body.style.overflow = 'hidden'
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') onNav(1); if (e.key === 'ArrowLeft') onNav(-1) }
    window.addEventListener('keydown', k)
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose, onNav])
  const shots = p.images?.length ? p.images : [undefined, undefined]
  return (
    <motion.div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label={p.title[lang]} onClick={e => e.stopPropagation()}
        className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto border border-line bg-ink sm:max-h-[88dvh]"
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}>
        <Img src={p.cover} alt={`${p.title[lang]} — main image`} className="aspect-video w-full" />
        <div className="space-y-6 p-5 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs uppercase tracking-widest text-accent">{p.category[lang]}</p><h3 className="mt-1 text-3xl font-bold text-white">{p.title[lang]}</h3></div>
            <button ref={ref} onClick={onClose} aria-label={t.close} className="border border-line px-3 py-2 hover:border-accent hover:text-accent">✕</button>
          </div>
          <p className="leading-relaxed text-zinc-300">{p.description[lang]}</p>
          <dl className="grid gap-6 sm:grid-cols-2">
            <div><dt className="text-xs uppercase tracking-widest text-zinc-500">{t.roleL}</dt><dd className="mt-1 text-white">{p.role[lang]}</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-zinc-500">{t.toolsL}</dt><dd className="mt-1 text-white">{p.tools.join(' · ')}</dd></div>
            <div className="sm:col-span-2"><dt className="text-xs uppercase tracking-widest text-zinc-500">{t.contribL}</dt>
              <dd className="mt-2 flex flex-wrap gap-2">{p.contributions.map((c, i) => <span key={i} className="border border-line px-3 py-1 text-sm">{c[lang]}</span>)}</dd></div>
          </dl>
          <div><h4 className="mb-2 text-xs uppercase tracking-widest text-zinc-500">{t.imgL}</h4>
            <div className="grid grid-cols-2 gap-3">{shots.map((s, i) => <Img key={i} src={s} alt={`${p.title[lang]} — screenshot ${i + 1}`} className="aspect-video w-full" />)}</div></div>
          <div className="text-sm">{p.links?.length ? p.links.map(l => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="mr-4 text-accent underline">{l.label}</a>) : <span className="text-zinc-500">{t.noLinks}</span>}</div>
          <div className="flex justify-between border-t border-line pt-4">
            <button onClick={() => onNav(-1)} className="hover:text-accent">← {t.prev}</button>
            <button onClick={() => onNav(1)} className="hover:text-accent">{t.next} →</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') === 'en' ? 'en' : 'fr'))
  const [active, setActive] = useState('home'), [menu, setMenu] = useState(false), [open, setOpen] = useState<number | null>(null)
  const t = dict[lang]

  useEffect(() => {
    localStorage.setItem('lang', lang); document.documentElement.lang = lang; document.title = t.meta.title
    document.querySelector('meta[name=description]')?.setAttribute('content', t.meta.desc)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.meta.desc)
  }, [lang, t])
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    IDS.forEach(i => { const el = document.getElementById(i); el && io.observe(el) }); return () => io.disconnect()
  }, [])
  const nav = (d: number) => setOpen(o => (o === null ? o : (o + d + projects.length) % projects.length))
  const labels = [t.nav.home, t.nav.portfolio, t.nav.services]
  const fade = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.6 } }
  const btn = 'inline-block px-6 py-3 font-display font-bold uppercase tracking-wider transition'

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[70] focus:bg-accent focus:p-2 focus:text-ink">Skip to content</a>
      <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3">
        <nav aria-label="Main" className="w-full max-w-3xl border border-line bg-ink/80 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-2">
            <a href="#home" className="font-display font-bold text-white">QG<span className="text-accent">.</span></a>
            <ul className="hidden gap-1 md:flex">{IDS.map((id, i) => (
              <li key={id}><a href={`#${id}`} aria-current={active === id ? 'page' : undefined} className={`relative px-4 py-2 text-sm transition hover:text-white ${active === id ? 'text-accent' : ''}`}>
                {labels[i]}{active === id && <motion.span layoutId="dot" className="absolute inset-x-4 -bottom-0.5 h-0.5 bg-accent" />}</a></li>))}</ul>
            <div className="flex items-center gap-2">
              <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} aria-label={t.nav.lang} className="border border-line px-3 py-1.5 text-xs font-bold tracking-widest hover:border-accent">
                <span className={lang === 'fr' ? 'text-accent' : ''}>FR</span> / <span className={lang === 'en' ? 'text-accent' : ''}>EN</span></button>
              <button onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={t.nav.menu} className="border border-line px-3 py-1.5 md:hidden">{menu ? '✕' : '☰'}</button>
            </div>
          </div>
          {menu && <ul className="border-t border-line md:hidden">{IDS.map((id, i) => <li key={id}><a href={`#${id}`} onClick={() => setMenu(false)} className={`block px-5 py-4 ${active === id ? 'text-accent' : ''}`}>{labels[i]}</a></li>)}</ul>}
        </nav>
      </header>

      <main id="main">
        <section id="home" className="relative flex min-h-[100dvh] items-center overflow-hidden px-5 pt-24">
          <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden />
          <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" aria-hidden />
          <div className="relative mx-auto w-full max-w-6xl">
            <p className="mb-4 font-display text-sm uppercase tracking-[0.3em] text-accent">▸ Paris · FR / EN</p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-bold leading-[0.95] text-white sm:text-8xl lg:text-9xl">Quentin<br />Gautier<span className="text-hot">.</span></motion.h1>
            <p className="mt-6 font-display text-xl text-zinc-100 sm:text-3xl">{t.role}</p>
            <p className="mt-4 max-w-xl text-lg text-zinc-400">{t.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#portfolio" className={`${btn} bg-accent text-ink hover:bg-white`}>{t.cta1}</a>
              <a href="#contact" className={`${btn} border border-line hover:border-accent hover:text-accent`}>{t.cta2}</a>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-24 md:grid-cols-[1fr_2fr]">
          <motion.h2 {...fade} className="text-4xl font-bold text-white">{t.aboutT}<span className="text-accent">_</span></motion.h2>
          <motion.div {...fade} className="space-y-5 text-lg leading-relaxed text-zinc-300">
            {t.about.map((p, i) => <p key={i}>{p}</p>)}
            <ul className="flex flex-wrap gap-2 pt-2 text-sm">{t.stats.map(s => <li key={s} className="border border-line px-3 py-1">{s}</li>)}</ul>
          </motion.div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24">
          <motion.div {...fade} className="relative overflow-hidden border border-line bg-panel p-8 sm:p-12">
            <div className="grid-bg absolute inset-0 opacity-50" aria-hidden />
            <div className="relative max-w-2xl">
              <p className="text-xs uppercase tracking-widest text-hot">{t.expT}</p>
              <h2 className="mt-2 text-3xl font-bold text-white sm:text-5xl">{t.expName}</h2>
              <p className="mt-4 text-zinc-300">{t.expP}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">{t.exp.map(x => <li key={x}><span className="mr-2 text-accent">▸</span>{x}</li>)}</ul>
              <button onClick={() => { document.getElementById('portfolio')?.scrollIntoView(); setOpen(0) }} className={`${btn} mt-8 bg-white text-ink hover:bg-accent`}>{t.expBtn} →</button>
            </div>
          </motion.div>
        </section>

        <section id="portfolio" className="mx-auto max-w-6xl px-5 py-24">
          <motion.div {...fade}><h2 className="text-4xl font-bold text-white sm:text-6xl">{t.portT}<span className="text-accent">_</span></h2><p className="mt-3 text-zinc-400">{t.portSub}</p></motion.div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {projects.map((p, i) => (
              <motion.button key={p.id} {...fade} onClick={() => setOpen(i)} aria-haspopup="dialog" aria-label={`${t.view}: ${p.title[lang]}`}
                className={`group relative overflow-hidden border border-line text-left transition hover:border-accent ${p.size === 'wide' ? 'md:col-span-2' : ''}`}>
                <Img src={p.cover} alt={`${p.title[lang]} — thumbnail`} className="aspect-[16/10] w-full transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent opacity-90 transition group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[11px] uppercase tracking-widest text-accent">{p.category[lang]}</p>
                  <h3 className="mt-1 text-2xl font-bold text-white">{p.title[lang]}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm text-zinc-300 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100 group-focus-visible:max-h-24 group-focus-visible:opacity-100">{p.short[lang]}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">{p.tags.map(g => <span key={g} className="border border-line bg-ink/70 px-2 py-0.5 text-[11px]">{g}</span>)}</div>
                </div>
              </motion.button>))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-5 py-24">
          <motion.div {...fade}><h2 className="text-4xl font-bold text-white sm:text-6xl">{t.servT}<span className="text-accent">_</span></h2><p className="mt-3 text-zinc-400">{t.servSub}</p></motion.div>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {t.services.map((s, i) => (
              <motion.article key={s.t} {...fade} className="grid gap-6 py-10 md:grid-cols-[auto_1fr_1.2fr] md:gap-10">
                <div className="flex items-center gap-4 md:flex-col md:items-start"><span className="font-display text-5xl text-hot" aria-hidden>{GLYPHS[i]}</span><span className="font-display text-sm text-zinc-500">0{i + 1}</span></div>
                <div><h3 className="text-2xl font-bold text-white">{s.t}</h3><p className="mt-2 text-zinc-400">{s.d}</p></div>
                <div><p className="mb-2 text-xs uppercase tracking-widest text-zinc-500">{t.deliv}</p>
                  <ul className="grid gap-1.5 text-sm sm:grid-cols-2">{s.l.map(x => <li key={x}><span className="mr-2 text-accent">▸</span>{x}</li>)}</ul></div>
              </motion.article>))}
          </div>
          <motion.div {...fade} className="mt-16 border border-accent/40 bg-accent/5 p-8 text-center sm:p-14">
            <h3 className="text-3xl font-bold text-white sm:text-4xl">{t.ctaT}</h3><p className="mt-2 text-zinc-300">{t.ctaP}</p>
            <a href={`mailto:${contact.email}`} className={`${btn} mt-6 bg-accent text-ink hover:bg-white`}>{t.ctaBtn}</a>
          </motion.div>
        </section>
      </main>

      <footer id="contact" className="border-t border-line bg-panel px-5 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between">
          <div><p className="font-display text-2xl font-bold text-white">Quentin Gautier<span className="text-accent">.</span></p><p className="mt-1 text-zinc-400">{t.role}</p><p className="mt-1 text-zinc-500">📍 {contact.location}</p></div>
          <ul className="space-y-2">
            <li><a className="text-accent underline-offset-4 hover:underline" href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><a className="hover:text-accent" href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
            <li><a className="hover:text-accent" href={contact.itch} target="_blank" rel="noopener noreferrer">itch.io ↗</a></li>
          </ul>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-xs text-zinc-500">© {new Date().getFullYear()} Quentin Gautier. {t.rights}</p>
      </footer>

      <AnimatePresence>{open !== null && <Modal key="m" p={projects[open]} lang={lang} onClose={() => setOpen(null)} onNav={nav} />}</AnimatePresence>
    </>
  )
}
