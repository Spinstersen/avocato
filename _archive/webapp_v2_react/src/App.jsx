import { useEffect, useMemo, useState } from 'react'

const P = 'avocato2:'
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` }
const addDays = (iso, n) => { const d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + n); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` }
const fmtDH = (n) => `${(Number(n) || 0).toLocaleString('fr-MA')} DH`
const esc = (s) => String(s ?? '')

function useLS(key, def) {
  const [v, setV] = useState(() => { try { const r = localStorage.getItem(P + key); return r ? JSON.parse(r) : def } catch { return def } })
  useEffect(() => { try { localStorage.setItem(P + key, JSON.stringify(v)) } catch {} }, [key, v])
  return [v, setV]
}

const BIBLIO = [
  ['01_Convention_Honoraires_Modele.md', "Convention d'honoraires", 'Provision 50 % — loi 66-23'],
  ['06_Recu_Provision_Facture.md', 'Reçu provision & solde', 'Encaissement + facture finale'],
  ['07_Lettre_Mission_Planning.md', 'Lettre de mission', 'Jalons J0 → J7'],
  ['08_PV_Remise_Cloture.md', 'PV remise & clôture', 'Preuve de remise'],
  ['03_Pack_Freelance_Contrat.md', 'Contrat offshore FR/EN', '12 clauses + 90j'],
  ['04_Pack_Ecommerce_CGV.md', 'CGV e-commerce', '31-08 7j/15j + 09-08'],
  ['05_Registre_09-08_Modele.md', 'Registre 09-08', '5 onglets + CNDP'],
  ['02_Scripts_DM_WhatsApp.md', 'Scripts contact', 'Déontologiques'],
  ['09_Registre_90j_Export.md', 'Registre 90j/150j', 'Butoir auto + J-15'],
  ['10_PV_AG_Distribution_Dividende.md', 'PV AG dividende', 'Fixe la RAS'],
  ['11_Contrat_SousTraitance_Miroir.md', 'Sous-traitance miroir', 'Miroir J-7'],
  ['12_Contrat_Sponsoring_UGC.md', 'Sponsoring / UGC', 'Licence vs cession'],
  ['13_DPA_SousTraitant_Data.md', 'DPA 09-08/GDPR', 'Art. 28 + transferts'],
  ['14_Pacte_Procuration_MRE.md', 'Pacte + procuration', 'Apostille sauf DE'],
  ['15_Lettres_Rouges_Urgences.md', 'Refus + urgences', 'MED, CNDP, banque'],
  ['16_Depot_Marque_Cession_Checklist_Boutique.md', 'Marque + boutique', 'OMPIC + 15 pts'],
]

const PIPES = ['Prospect', 'Convention envoyée', 'Convention signée', 'En cours', 'Livré - solde dû', 'Clôturé']
const NAV = [
  ['today', "Ordre du jour"], ['dashboard', 'Étude'], ['pipeline', 'Pipeline'],
  ['dossiers', 'Dossiers'], ['echeances', 'Échéances'], ['registres', 'Registres 90j'], ['dividendes', 'Dividendes'],
  ['sejours', 'Séjour'], ['biblio', 'Bibliothèque'], ['vault', 'Vault'],
]

function mdLite(src) {
  const lines = esc(src).split('\n')
  const out = []
  let inTable = false
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i]
    if (/^\|.*\|$/.test(l.trim()) && lines[i + 1]?.match(/^\|[\s:\-|]+\|$/)) {
      const cells = l.trim().slice(1, -1).split('|').map((c) => c.trim())
      out.push(`<table><thead><tr>${cells.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>`)
      inTable = true; i++
      continue
    }
    if (inTable && /^\|.*\|$/.test(l.trim())) {
      const cells = l.trim().slice(1, -1).split('|').map((c) => `<td>${c}</td>`).join('')
      out.push(`<tr>${cells}</tr>`)
      if (lines[i + 1] && !/^\|.*\|$/.test(lines[i + 1].trim())) { out.push('</tbody></table>'); inTable = false }
      continue
    }
    if (/^#### /.test(l)) out.push(`<h3>${l.slice(5)}</h3>`)
    else if (/^### /.test(l)) out.push(`<h3>${l.slice(4)}</h3>`)
    else if (/^## /.test(l)) out.push(`<h2>${l.slice(3)}</h2>`)
    else if (/^# /.test(l)) out.push(`<h1>${l.slice(2)}</h1>`)
    else if (/^> /.test(l)) out.push(`<blockquote>${l.slice(2)}</blockquote>`)
    else if (/^\x60\x60\x60/.test(l)) out.push('<pre><code>…')
    else if (/^[\-\*] \[[ x]\]/.test(l)) out.push(`<p>☐ ${l.replace(/^[\-\*] \[[ x]\]\s?/, '')}</p>`)
    else if (/^[\-\*] /.test(l)) out.push(`<p>— ${l.slice(2)}</p>`)
    else if (/^\d+\. /.test(l)) out.push(`<p>${l}</p>`)
    else if (l.trim() === '---') out.push('<hr/>')
    else if (l.trim()) out.push(`<p>${l.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\x60(.+?)\x60/g, '<code>$1</code>')}</p>`)
  }
  return out.join('\n')
}

export default function App() {
  const [mode, setMode] = useLS('mode', 'cabinet')
  const [view, setView] = useLS('view', 'today')
  const [dossiers, setDossiers] = useLS('dossiers', [])
  const [echeances, setEcheances] = useLS('echeances', [])
  const [registres, setRegistres] = useLS('registres', [])
  const [dividendes, setDividendes] = useLS('dividendes', [])
  const [sejours, setSejours] = useLS('sejours', [])
  const [vault, setVault] = useState(() => window.VAULT_DATA || [])
  const [q, setQ] = useState('')
  const [folder, setFolder] = useState('')
  const [openDoc, setOpenDoc] = useState(null)
  const [pal, setPal] = useState(false)
  const [palQ, setPalQ] = useState('')
  const [toasts, setToasts] = useState([])
  const [showDossier, setShowDossier] = useState(null)
  const [dragId, setDragId] = useState(null)
  const [theme, setTheme] = useLS('theme', 'cms')
  useEffect(() => { document.body.dataset.theme = theme }, [theme])
  const isEditorial = theme === 'editorial'
  const THEMES = [['nuit', 'Encrier'], ['cms', 'CMS'], ['editorial', 'Éditorial']]

  useEffect(() => {
    if (vault.length) return
    fetch('vault-data.js').then((r) => r.text()).then((txt) => {
      const m = txt.match(/window\.VAULT_DATA\s*=\s*(\[[\s\S]*\]);?\s*$/)
      if (m) { try { setVault(JSON.parse(m[1])) } catch {} }
    }).catch(() => {})
    let n = 0
    const t = setInterval(() => {
      if (window.VAULT_DATA?.length) { setVault(window.VAULT_DATA); clearInterval(t) }
      else if (++n > 40) clearInterval(t)
    }, 250)
    return () => clearInterval(t)
  }, [vault.length])

  useEffect(() => {
    const h = (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPal((p) => !p); setPalQ('') } }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [])

  const toast = (msg) => { const id = uid(); setToasts((t) => [...t, { id, msg }]); setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200) }
  const go = (v) => { setMode('cabinet'); setView(v) }

  const saveDossier = (obj) => {
    if (showDossier?.id) {
      setDossiers((a) => a.map((d) => (d.id === showDossier.id ? { ...d, ...obj, updatedAt: todayISO() } : d)))
      toast('Dossier mis à jour.')
    } else {
      const nd = { id: uid(), ...obj, statut: obj.statut || 'Prospect', createdAt: todayISO(), updatedAt: todayISO() }
      setDossiers((a) => [...a, nd])
      if (obj.provisionEncaissee) {
        const base = todayISO()
        const packs = [
          ['Change 90j', 'Registre 90j : rapprocher factures/SWIFT (05/09)', 75],
          ['AG dividende', 'Calendrier AG : simulation Oct-Nov, PV Jan-Fév (05/10)', 300],
          ['Carte séjour', 'Renouvellement carte J-15 (11/14)', 350],
          ['Veille', 'Veille IGOC/CNDP/LF/OMPIC : 1 page (08/10)', 30],
        ].map(([type, intitule, j]) => ({ id: uid(), dossierId: nd.id, date: addDays(base, j), type, intitule, done: false, auto: 'PACK' }))
        const rythme = [0, 2, 5, 7].map((j, i) => ({ id: uid(), dossierId: nd.id, date: addDays(base, j), type: ['Rythme J0', 'Rythme J2', 'Rythme J5', 'Rythme J7'][i], intitule: ['Kickoff périmètre + calendrier', 'Checkpoint mouvement', 'Checkpoint presque fini', 'Paquet de quatre + restitution'][i], done: false, auto: 'RYTHME' }))
        setEcheances((e) => [...e, ...packs, ...rythme])
        toast(`Dossier créé — verrou levé + ${packs.length + rythme.length} échéances.`)
      } else toast('Dossier créé — provision à encaisser (verrou art. 30).')
    }
    setShowDossier(null)
  }

  const moveStatut = (id, statut) => {
    const d = dossiers.find((x) => x.id === id)
    if (!d || d.statut === statut) return
    if (['Convention signée', 'En cours', 'Livré - solde dû', 'Clôturé'].includes(statut) && !d.provisionEncaissee) {
      if (!window.confirm(`Passer « ${d.client} » en « ${statut} » sans provision encaissée ? (verrou art. 30 — journalisé dans ce proto)`)) return
    }
    setDossiers((a) => a.map((x) => (x.id === id ? { ...x, statut, updatedAt: todayISO() } : x)))
    toast(`${d.client} → ${statut}`)
  }

  const folders = useMemo(() => [...new Set(vault.map((d) => d.folder))].sort(), [vault])
  const filteredDocs = useMemo(() => {
    const t = q.trim().toLowerCase()
    const base = folder ? vault.filter((d) => d.folder === folder) : vault
    if (!t) return base.slice(0, 60)
    return base.filter((d) => `${d.title} ${d.file} ${d.folder}`.toLowerCase().includes(t)).slice(0, 80)
  }, [vault, q, folder])

  const t = todayISO()
  const in7 = addDays(t, 7)
  const overdue = echeances.filter((e) => !e.done && e.date && e.date < t)
  const soon = echeances.filter((e) => !e.done && e.date && e.date >= t && e.date <= in7)
  const regAlert = registres.filter((r) => !r.creditDate && r.butoir && (r.butoir < t || addDays(t, 15) >= r.butoir))
  const sejAlert = sejours.filter((r) => r.expiry && (r.expiry < t || addDays(t, 15) >= r.expiry))
  const caHT = dossiers.reduce((s, d) => s + (Number(d.honoraires) || 0), 0)
  const funnel = PIPES.map((p) => ({ p, n: dossiers.filter((d) => (d.statut || 'Prospect') === p).length }))
  const fmax = Math.max(1, ...funnel.map((f) => f.n))
  const frenchDate = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  const palItems = useMemo(() => {
    const s = palQ.trim().toLowerCase()
    const match = (x) => !s || String(x).toLowerCase().includes(s)
    const acts = [
      ["Aujourd'hui", () => go('today')], ['Pipeline', () => go('pipeline')], ['Dossiers', () => go('dossiers')],
      ['Échéances', () => go('echeances')], ['Registres 90j', () => go('registres')], ['Dividendes', () => go('dividendes')], ['Séjour', () => go('sejours')], ['Vault', () => setMode('vault')],
      ['Thème : Encrier nuit', () => setTheme('nuit')], ['Thème : CMS prestige', () => setTheme('cms')], ['Thème : Éditorial clair', () => setTheme('editorial')],
    ].filter(([l]) => match(l)).map(([label, run]) => ({ label, hint: 'Action', run }))
    const ds = dossiers.filter((d) => match(d.client)).slice(0, 4).map((d) => ({ label: d.client, hint: d.statut || '', run: () => go('dossiers') }))
    const docs = vault.filter((d) => match(d.title)).slice(0, 6).map((d) => ({ label: d.title, hint: 'Doc', run: () => { setMode('vault'); setOpenDoc(d) } }))
    return [...acts, ...ds, ...docs].slice(0, 14)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palQ, dossiers, vault])

  const doExport = () => {
    const blob = new Blob([JSON.stringify({ version: 3, exportedAt: new Date().toISOString(), dossiers, echeances, registres, dividendes, sejours }, null, 2)], { type: 'application/json' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `avocato2-${t}.json`; a.click(); URL.revokeObjectURL(a.href)
    toast('Export JSON v3 téléchargé (compatible webapp/).')
  }
  const doImport = (f) => {
    const r = new FileReader()
    r.onload = () => {
      try {
        const d = JSON.parse(r.result)
        if (!Array.isArray(d.dossiers)) throw new Error('dossiers[] manquant')
        setDossiers(d.dossiers); if (d.echeances) setEcheances(d.echeances)
        if (d.registres) setRegistres(d.registres); if (d.dividendes) setDividendes(d.dividendes); if (d.sejours) setSejours(d.sejours)
        toast(`Import OK : ${d.dossiers.length} dossiers.`)
      } catch (e) { toast('Import illisible : ' + e.message) }
    }
    r.readAsText(f)
  }
  const seed = () => {
    const a = { id: uid(), client: 'SARL Atlas Digital — M. Benali', type: 'Freelance / Agence offshore', mission: 'Contrat offshore', honoraires: 3500, tva: 20, provisionPct: 50, provisionEncaissee: true, statut: 'En cours', niche: '01 Freelance offshore', pack: 'Contrat offshore', residence: 'Résident MA', contact: '06 12 34 56 78', notes: 'Clients FR, Stripe bloqué', createdAt: t, updatedAt: t }
    const b = { id: uid(), client: 'Boutique YouCan — Lina Shop', type: 'E-commerce / YouCan', mission: 'CGV e-commerce', honoraires: 4900, tva: 20, provisionPct: 50, provisionEncaissee: false, statut: 'Prospect', niche: '02 E-commerce', pack: 'CGV e-commerce', residence: 'Résident MA', contact: '', notes: 'Sans CGV, CMI bloque', createdAt: t, updatedAt: t }
    setDossiers([a, b])
    setRegistres([{ id: uid(), dossierId: a.id, facture: 'F-2026-001', exig: t, kind: 'Services', montant: '8 000 EUR', butoir: addDays(t, 90), creditDate: '', createdAt: t }])
    setDividendes([{ id: uid(), dossierId: a.id, exo: '2026', agDate: addDays(t, 60), montant: '200 000 DH', rasPayee: false, transfere: false }])
    setSejours([{ id: uid(), dossierId: b.id, titre: 'Carte 1 an', expiry: addDays(t, 340) }])
    toast('Démo chargée (2 dossiers + registre + dividende + séjour). Données isolées avocato2:*')
  }

  const cur = mode === 'vault' ? 'vault' : view

  return (
    <div className="min-h-screen md:flex md:items-stretch">
      {/* Thème Éditorial : masthead clair façon revue — pas de registre latéral */}
      {isEditorial && (
      <header className="masthead sticky top-0 z-40 hidden md:block">
        <div className="mx-auto flex max-w-[1240px] items-center gap-4 px-5 pb-0 pt-4">
          <button onClick={() => go('today')} className="masthead-word bg-none text-left">
            AVOCATO <em>Cabinet</em>
          </button>
          <span className="mono hidden text-[10.5px] uppercase tracking-[0.18em] text-[var(--faint)] lg:inline">OS · essai v2 · {vault.length || '…'} docs</span>
          <div className="ml-auto flex items-center gap-2">
            <ThemeSwitch theme={theme} setTheme={setTheme} themes={THEMES} />
            <button onClick={() => { setPal(true); setPalQ('') }} className="btn-line btn-sm hidden lg:block">⌘K — Rechercher</button>
            <button onClick={() => { go('dossiers'); setShowDossier({}) }} className="btn-ink btn-sm">+ Nouveau dossier</button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-[1240px] gap-5 overflow-x-auto scroll-thin px-5">
          {NAV.map(([v, label]) => (
            <button key={v} onClick={() => { if (v === 'vault') setMode('vault'); else go(v) }} className={`navlink ${cur === v ? 'active' : ''}`}>
              {label}{(v === 'registres' && regAlert.length > 0) ? ` (${regAlert.length})` : ''}{(v === 'sejours' && sejAlert.length > 0) ? ` (${sejAlert.length})` : ''}
            </button>
          ))}
        </nav>
      </header>
      )}

      {/* Thèmes Encrier / CMS : registre latéral sombre */}
      {!isEditorial && (
      <aside className="sidebar-cab sticky top-0 hidden h-screen w-[276px] shrink-0 flex-col gap-1 overflow-y-auto scroll-thin p-4 md:flex">
        <button onClick={() => go('today')} className="bg-none text-left">
          <span className="sidebar-word">AVOCATO <em>Cabinet</em></span>
          <span className="mono mt-1 block text-[10px] uppercase tracking-[0.18em] text-white/50">essai v2 · {vault.length || '…'} docs</span>
        </button>
        <div className="mt-3 grid grid-cols-2 gap-1 rounded-[6px] border border-white/10 bg-black/20 p-1">
          {['cabinet', 'vault'].map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`rounded-[4px] px-3 py-2 text-[12px] font-semibold capitalize ${mode === m ? 'bg-[var(--accent)] text-white' : 'text-white/60'}`}>{m === 'vault' ? 'Vault' : 'Cabinet'}</button>
          ))}
        </div>
        <button onClick={() => { go('dossiers'); setShowDossier({}) }} className="btn-accent mt-3 w-full">+ Nouveau dossier</button>
        <button onClick={() => { setPal(true); setPalQ('') }} className="btn-ghostlight mt-2 w-full text-left">⌘K — Rechercher tout…</button>
        <div className="side-label">Registre</div>
        <nav className="flex flex-col">
          {NAV.filter(([v]) => v !== 'vault').map(([v, label]) => (
            <button key={v} onClick={() => go(v)} className={`sidelink ${cur === v ? 'active' : ''}`}>
              {label}{(v === 'registres' && regAlert.length > 0) ? <span className="count">{regAlert.length}</span> : ''}{(v === 'sejours' && sejAlert.length > 0) ? <span className="count">{sejAlert.length}</span> : ''}{(v === 'echeances' && overdue.length > 0) ? <span className="count">{overdue.length}</span> : ''}
            </button>
          ))}
        </nav>
        <div className="side-label">Base</div>
        <nav className="flex flex-col">
          <button onClick={() => setMode('vault')} className={`sidelink ${cur === 'vault' ? 'active' : ''}`}>Vault documentaire</button>
          <button onClick={() => go('biblio')} className={`sidelink ${cur === 'biblio' ? 'active' : ''}`}>Bibliothèque · 16</button>
        </nav>
        <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-3">
          <ThemeSwitch theme={theme} setTheme={setTheme} themes={THEMES} />
          <div className="grid grid-cols-2 gap-2">
            <button onClick={doExport} className="btn-ghostlight">↓ Export JSON</button>
            <label className="btn-ghostlight cursor-pointer text-center">↑ Import JSON<input type="file" accept=".json" hidden onChange={(e) => e.target.files[0] && doImport(e.target.files[0])} /></label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={seed} className="btn-ghostlight">Démo</button>
            <button onClick={() => { if (window.confirm('Wipe avocato2:* ? (webapp/ intact)')) { Object.keys(localStorage).filter((k) => k.startsWith(P)).forEach((k) => localStorage.removeItem(k)); location.reload() } }} className="btn-ghostlight">Wipe</button>
          </div>
        </div>
      </aside>
      )}

      {/* Barre haute téléphone : wordmark + recherche (tous thèmes) */}
      <div className="sticky top-0 z-40 flex items-center gap-2 border-b border-[var(--line)] bg-[var(--paper)]/95 px-4 py-2.5 backdrop-blur md:hidden">
        <button onClick={() => go('today')} className="sidebar-word !text-[19px] !text-[var(--petrol-ink)]">AVOCATO <em>Cabinet</em></button>
        <button onClick={() => { setPal(true); setPalQ('') }} className="btn-line btn-sm ml-auto" aria-label="Rechercher">⌘K</button>
      </div>

      <main className="mx-auto w-full min-w-0 max-w-[1240px] flex-1 px-4 pb-32 pt-6 md:px-8 md:pb-8 md:pt-8">
        {mode === 'vault' ? (
          <div>
            <div className="kicker">Base documentaire — lecture seule</div>
            <h1 className="serif mt-2 text-[42px] font-bold leading-[1.05] text-[var(--petrol-ink)]">Le Vault, {vault.length} documents.</h1>
            <p className="mt-2 max-w-[68ch] text-[14px] text-[var(--dim)]">Même corpus que le cabinet actuel. Recherche instantanée, sommaire au filet, lecture au long cours.</p>
            <div className="mt-4 flex max-w-[720px] flex-col gap-2 sm:flex-row">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher titre, fichier, dossier… (ex. LLC, 09-08, CGV)" className="input flex-1" aria-label="Rechercher dans le Vault" />
              <select value={folder} onChange={(e) => setFolder(e.target.value)} className="input sm:max-w-[240px]" aria-label="Filtrer par classeur">
                <option value="">Tous classeurs ({vault.length})</option>
                {folders.map((f) => <option key={f} value={f}>{f.replace(/^\d+_/, '').replace(/_/g, ' ')} ({vault.filter((d) => d.folder === f).length})</option>)}
              </select>
            </div>
            {(q.trim() || folder) && <p className="mono mt-2 text-[11px] uppercase tracking-[0.12em] text-[var(--faint)]">{filteredDocs.length} pièce(s) — {folder ? folders.find((f) => f === folder)?.replace(/^\d+_/, '').replace(/_/g, ' ') : 'tous classeurs'}</p>}
            {openDoc ? (
              <div className="mt-6 bg-white px-2 py-2 md:px-8">
                <button onClick={() => setOpenDoc(null)} className="btn-line btn-sm">← Sommaire</button>
                <div className="mono mt-4 text-[11px] uppercase tracking-[0.14em] text-[var(--faint)]">{esc(openDoc.folder)} · {esc(openDoc.file)} · {openDoc.words} mots</div>
                <div className="doc-body mt-2" dangerouslySetInnerHTML={{ __html: mdLite(openDoc.content.slice(0, 60000)) }} />
              </div>
            ) : (
              <div className="mt-6 bg-white">
                {filteredDocs.map((d, i) => (
                  <button key={d.id} onClick={() => setOpenDoc(d)} className="index-row flex items-baseline gap-3 px-2">
                    <span className="index-no">{String(i + 1).padStart(2, '0')}</span>
                    <span className="min-w-0"><span className="index-title serif block truncate text-[20px] font-bold leading-snug text-[var(--petrol-ink)]">{esc(d.title)}</span>
                      <span className="mono block text-[11px] text-[var(--faint)]">{esc(d.folder)} / {esc(d.file)}</span></span>
                    <span className="ml-auto shrink-0 text-[13px] font-semibold text-[var(--accent)]">Lire →</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : view === 'today' ? (
          <div>
            <div className="kicker">Cabinet — {frenchDate}</div>
            <h1 className="serif mt-2 text-[42px] font-bold leading-[1.05] text-[var(--petrol-ink)]">L'ordre du jour.</h1>
            <p className="mt-2 max-w-[68ch] text-[14px] text-[var(--dim)]">Retards, sept jours, butoirs de change, cartes de séjour. Une seule audience à la fois.</p>
            <div className="stats-band mt-6 grid grid-cols-2 lg:grid-cols-4">
              {[[overdue.length, 'En retard'], [soon.length, 'Échéances · 7 jours'], [regAlert.length, 'Butoirs 90j'], [dossiers.filter((d) => !d.provisionEncaissee && d.statut !== 'Prospect').length, 'Provisions dues']].map(([n, l]) => (
                <div key={l} className="stat px-6 py-5"><div className="stat-num">{n}</div><div className="stat-lbl">{l}</div></div>
              ))}
            </div>
            <div className="mt-6 bg-white">
              {[...overdue.map((e) => ({ ...e, late: true })), ...soon, ...regAlert.map((r) => ({ date: r.butoir, intitule: `Butoir ${(r.facture || '')} — rapprocher le SWIFT`, late: true })), ...sejAlert.map((r) => ({ date: r.expiry, intitule: `Carte de séjour : ${r.titre || ''}`, late: true }))].slice(0, 14).map((a, i) => (
                <div key={i} className="flex items-baseline gap-4 border-b border-[var(--line)] px-2 py-3">
                  <span className={`mono text-[12px] ${a.late ? 'font-bold text-[var(--bordeaux)]' : 'text-[var(--dim)]'}`}>{a.date || '—'}</span>
                  <span className="min-w-0 flex-1 text-[14px] text-[var(--ink)]">{esc(a.intitule || a.type)}</span>
                  {a.late && <span className="pill pill-bordeaux">À traiter</span>}
                </div>
              ))}
            </div>
          </div>
        ) : view === 'dashboard' ? (
          <div>
            <div className="kicker">Étude — vue d'ensemble</div>
            <h1 className="serif mt-2 text-[42px] font-bold leading-[1.05] text-[var(--petrol-ink)]">L'état de l'étude.</h1>
            <div className="stats-band mt-6 grid grid-cols-2 lg:grid-cols-4">
              <div className="stat px-6 py-5"><div className="stat-num">{fmtDH(caHT)}</div><div className="stat-lbl">Honoraires · CA HT</div></div>
              <div className="stat px-6 py-5"><div className="stat-num">{dossiers.filter((d) => !['Clôturé', 'Abandonné'].includes(d.statut)).length}</div><div className="stat-lbl">Dossiers vivants</div></div>
              <div className="stat px-6 py-5"><div className="stat-num">{registres.length}</div><div className="stat-lbl">Lignes 90j / 150j</div></div>
              <div className="stat px-6 py-5"><div className="stat-num">{vault.length}</div><div className="stat-lbl">Sources au Vault</div></div>
            </div>
            <h2 className="serif mt-8 text-[26px] font-bold text-[var(--petrol-ink)]">Le flux des affaires</h2>
            <div className="mt-2 bg-white">
              {funnel.map((f) => (
                <div key={f.p} className="flex items-baseline gap-4 border-b border-[var(--line)] px-2 py-3">
                  <span className="w-[190px] shrink-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--dim)]">{f.p}</span>
                  <span className="h-[10px] flex-1 overflow-hidden rounded-full bg-[#efece3]"><span className="block h-full rounded-full" style={{ width: `${Math.round(100 * f.n / fmax)}%`, background: 'linear-gradient(90deg, var(--petrol), var(--accent))' }} /></span>
                  <span className="mono w-10 text-right text-[13px]">{f.n}</span>
                </div>
              ))}
            </div>
          </div>
        ) : view === 'pipeline' ? (
          <div>
            <div className="kicker">Flux de signature</div>
            <h1 className="serif mt-2 text-[42px] font-bold leading-[1.05] text-[var(--petrol-ink)]">Le pipeline.</h1>
            <p className="mt-2 max-w-[68ch] text-[14px] text-[var(--dim)]">Glisser vers la droite fait avancer l'affaire. Tout passage avancé sans provision exige confirmation — verrou de l'art. 30.</p>
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {PIPES.map((p) => (
                <div key={p} onDragOver={(e) => e.preventDefault()} onDrop={() => dragId && moveStatut(dragId, p)} className="pipe-col min-h-[170px] p-2">
                  <div className="px-1 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--dim)]">{p} · {dossiers.filter((d) => (d.statut || 'Prospect') === p).length}</div>
                  {dossiers.filter((d) => (d.statut || 'Prospect') === p).map((d) => (
                    <div key={d.id} draggable onDragStart={() => setDragId(d.id)} onClick={() => { setShowDossier(d) }} className="pipe-card mb-1.5">
                      <div className="serif text-[16px] font-bold leading-tight text-[var(--petrol-ink)]">{esc(d.client)}</div>
                      <div className="mono mt-1 text-[11px] text-[var(--dim)]">{fmtDH(d.honoraires)}{!d.provisionEncaissee ? ' · verrou' : ''}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : view === 'dossiers' ? (
          <DossiersView dossiers={dossiers} setShowDossier={setShowDossier} />
        ) : view === 'echeances' ? (
          <EchView echeances={echeances} setEcheances={setEcheances} dossiers={dossiers} toast={toast} />
        ) : view === 'registres' ? (
          <RegView registres={registres} setRegistres={setRegistres} echeances={echeances} setEcheances={setEcheances} dossiers={dossiers} toast={toast} t={t} />
        ) : view === 'dividendes' ? (
          <DivView dividendes={dividendes} setDividendes={setDividendes} echeances={echeances} setEcheances={setEcheances} dossiers={dossiers} toast={toast} />
        ) : view === 'sejours' ? (
          <SejView sejours={sejours} setSejours={setSejours} echeances={echeances} setEcheances={setEcheances} dossiers={dossiers} toast={toast} />
        ) : view === 'biblio' ? (
          <div>
            <div className="kicker">Bank des modèles — 01 à 16</div>
            <h1 className="serif mt-2 text-[42px] font-bold leading-[1.05] text-[var(--petrol-ink)]">La bibliothèque.</h1>
            <p className="mt-2 max-w-[68ch] text-[14px] text-[var(--dim)]">Chaque modèle ouvre sa source au Vault. Seize pièces, une seule doctrine.</p>
            <div className="mt-6 bg-white">
              {BIBLIO.map(([f, title, desc], i) => (
                <button key={f} onClick={() => { const d = vault.find((x) => x.file.endsWith(f)); if (d) { setMode('vault'); setOpenDoc(d) } else toast('Rebuild Vault requis pour ' + f) }} className="index-row flex items-baseline gap-3 px-2 text-left">
                  <span className="index-no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0"><span className="index-title serif block truncate text-[20px] font-bold text-[var(--petrol-ink)]">{title}</span>
                    <span className="block text-[12.5px] text-[var(--dim)]">{desc} · <span className="mono text-[11px]">{f}</span></span></span>
                  <span className="ml-auto shrink-0 text-[13px] font-semibold text-[var(--accent)]">Ouvrir →</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

      {/* Colophon */}
      <footer className="mx-auto mt-10 max-w-[1240px] border-t border-[var(--line)] px-5 py-5">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="serif text-[19px] font-bold text-[var(--petrol-ink)]">Avocato <em className="font-medium text-[var(--brass)]">Cabinet</em></span>
          <span className="mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--faint)]">essai isolé · avocato2:* · {vault.length || '…'} docs · échanges au registre latéral</span>
        </div>
      </footer>
      </main>

      {showDossier && <DossierDialog d={showDossier} onClose={() => setShowDossier(null)} onSave={saveDossier} />}

      {pal && (
        <div className="fixed inset-0 z-50 grid place-items-start justify-center bg-[rgba(18,38,43,0.5)] p-4 pt-[10vh]" onClick={() => setPal(false)}>
          <div className="w-full max-w-[560px] border border-[var(--line-strong)] bg-white p-2" onClick={(e) => e.stopPropagation()}>
            <input autoFocus value={palQ} onChange={(e) => setPalQ(e.target.value)} placeholder="Aller à… (dossier, action, doc)" className="input" />
            <div className="mt-2 max-h-[50vh] overflow-y-auto scroll-thin">
              {palItems.map((it, i) => (
                <button key={i} onClick={() => { it.run(); setPal(false) }} className="flex w-full items-center gap-2 p-2.5 text-left text-[13px] hover:bg-[#f6f3ea]">
                  <span className="flex-1 truncate font-medium text-[var(--ink)]">{esc(it.label)}</span><span className="text-[10.5px] uppercase tracking-[0.08em] text-[var(--faint)]">{esc(it.hint)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-4">
        {toasts.map((x) => <div key={x.id} className="toast">{esc(x.msg)}</div>)}
      </div>

      {/* Barre d'onglets téléphone : le pouce atteint tout */}
      <nav className="bottombar" aria-label="Navigation principale">
        <div className="bottombar-inner">
          {[['today', '✦', 'Jour'], ['dossiers', '▤', 'Dossiers']].map(([v, g, l]) => (
            <button key={v} onClick={() => go(v)} className={`bottomtab ${cur === v ? 'active' : ''}`}><span className="glyph">{g}</span>{l}</button>
          ))}
          <button onClick={() => { go('dossiers'); setShowDossier({}) }} className="bottomtab bottomtab-fab" aria-label="Nouveau dossier"><span className="fab">+</span>Dossier</button>
          {[['registres', '◐', '90j'], ['vault', '◍', 'Vault']].map(([v, g, l]) => (
            <button key={v} onClick={() => { if (v === 'vault') setMode('vault'); else go(v) }} className={`bottomtab ${cur === v ? 'active' : ''}`}><span className="glyph">{g}</span>{l}</button>
          ))}
        </div>
      </nav>
    </div>
  )
}

function Kicker({ children }) {
  return <div className="kicker">{children}</div>
}
void Kicker

function ThemeSwitch({ theme, setTheme, themes }) {
  return (
    <div className="theme-seg" role="group" aria-label="Thème visuel">
      {themes.map(([v, l]) => (
        <button key={v} onClick={() => setTheme(v)} className={theme === v ? 'on' : ''} aria-pressed={theme === v}>{l}</button>
      ))}
    </div>
  )
}

function Field({ label, children }) {
  return <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--dim)]">{label}{children}</label>
}

function DossierDialog({ d, onClose, onSave }) {
  const [f, setF] = useState({ client: d.client || '', type: d.type || 'Freelance / Agence offshore', mission: d.mission || 'Diagnostic', honoraires: d.honoraires || 900, tva: d.tva ?? 20, provisionPct: d.provisionPct ?? 50, provisionEncaissee: !!d.provisionEncaissee, statut: d.statut || 'Prospect', niche: d.niche || '', pack: d.pack || '', residence: d.residence || '', dateCle: d.dateCle || '', contact: d.contact || '', notes: d.notes || '' })
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }))
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[rgba(18,38,43,0.5)] p-4" onClick={onClose}>
      <div className="w-full max-w-[660px] border border-[var(--line-strong)] bg-white p-6" onClick={(e) => e.stopPropagation()}>
        <div className="kicker">{d.id ? 'Registre — modification' : "Registre — nouvelle affaire"}</div>
        <div className="serif mt-1 text-[30px] font-bold text-[var(--petrol-ink)]">{d.id ? "L'affaire" : 'Ouvrir un dossier'} <span className="pill ml-2">avocato2:*</span></div>
        <div className="mt-4 grid grid-cols-1 gap-2.5 md:grid-cols-2">
          <Field label="Client *"><input value={f.client} onChange={(e) => set('client', e.target.value)} className="input" placeholder="SARL Atlas — M. Benali" /></Field>
          <Field label="Contact"><input value={f.contact} onChange={(e) => set('contact', e.target.value)} className="input" placeholder="06 XX XX XX XX" /></Field>
          <Field label="Type"><select value={f.type} onChange={(e) => set('type', e.target.value)} className="input">{['Freelance / Agence offshore', 'E-commerce / YouCan', 'Loi 09-08 / PME', 'Créateur', 'MRE / Investisseur', 'AE → SARL', 'IP OMPIC', 'Fiscalité internationale', 'Change IGOC', 'MRE entrepreneur', 'Nomade', 'Autre'].map((o) => <option key={o}>{o}</option>)}</select></Field>
          <Field label="Mission"><select value={f.mission} onChange={(e) => set('mission', e.target.value)} className="input">{['Diagnostic', 'Contrat offshore', 'CGV e-commerce', '09-08 PME', 'Bascule AE→SARL', 'Marque OMPIC', 'MRE distance', 'Nomade légal', 'Optimisation fiscale', 'Change/rapatriement'].map((o) => <option key={o}>{o}</option>)}</select></Field>
          <Field label="Honoraires HT"><input type="number" value={f.honoraires} onChange={(e) => set('honoraires', Number(e.target.value))} className="input" /></Field>
          <Field label="Provision %"><input type="number" min={0} max={100} value={f.provisionPct} onChange={(e) => set('provisionPct', Math.min(100, Math.max(0, Number(e.target.value) || 0)))} className="input" /></Field>
          <Field label="TVA"><select value={f.tva} onChange={(e) => set('tva', Number(e.target.value))} className="input"><option value={20}>20 %</option><option value={0}>0 %</option></select></Field>
          <Field label="Niche"><select value={f.niche} onChange={(e) => set('niche', e.target.value)} className="input"><option value="">—</option>{['01 Freelance offshore', '02 E-commerce', '03 Loi 09-08', '04 Créateurs', '05 MRE investisseur', '06 AE → SARL', '07 IP OMPIC', '08 Fiscalité internationale', '09 Change IGOC', '10 MRE entrepreneur', '11 Nomade'].map((o) => <option key={o}>{o}</option>)}</select></Field>
          <Field label="Pack"><select value={f.pack} onChange={(e) => set('pack', e.target.value)} className="input"><option value="">—</option>{['Diagnostic 900', 'Contrat offshore', 'CGV e-commerce', '09-08 PME', 'Bascule AE→SARL', 'Marque OMPIC', 'MRE distance', 'Nomade légal', 'Optimisation fiscale', 'Change/rapatriement'].map((o) => <option key={o}>{o}</option>)}</select></Field>
          <Field label="Résidence"><select value={f.residence} onChange={(e) => set('residence', e.target.value)} className="input"><option value="">—</option><option>Résident MA</option><option>MRE / non-résident</option><option>Mixte / bascule</option></select></Field>
          <Field label="Date clé (AG/carte)"><input type="date" value={f.dateCle} onChange={(e) => set('dateCle', e.target.value)} className="input" /></Field>
          <Field label="Stade"><select value={f.statut} onChange={(e) => set('statut', e.target.value)} className="input">{PIPES.map((o) => <option key={o}>{o}</option>)}</select></Field>
          <label className="flex items-center gap-2 border border-[var(--line)] bg-[var(--surface-2)] p-2.5 text-[13px] font-normal normal-case tracking-normal text-[var(--ink)]"><input type="checkbox" checked={f.provisionEncaissee} onChange={(e) => set('provisionEncaissee', e.target.checked)} className="h-4 w-4 accent-[#0d535f]" /> Provision 50 % encaissée — verrou de l'art. 30</label>
        </div>
        <Field label="Notes"><textarea value={f.notes} onChange={(e) => set('notes', e.target.value)} className="input" rows={2} /></Field>
        <div className="mt-4 flex justify-end gap-2 border-t border-[var(--line)] pt-4"><button onClick={onClose} className="btn-line">Annuler</button><button disabled={!f.client.trim()} onClick={() => onSave(f)} className="btn-ink disabled:opacity-40">Inscrire au registre</button></div>
      </div>
    </div>
  )
}

function DossiersView({ dossiers, setShowDossier }) {
  const [rq, setRq] = useState('')
  const rows = dossiers.filter((d) => !rq.trim() || `${d.client} ${d.pack || ''} ${d.niche || ''} ${d.statut || ''}`.toLowerCase().includes(rq.trim().toLowerCase()))
  return (
    <div>
      <div className="kicker">Registre des affaires — {dossiers.length} dossiers</div>
      <div className="mt-2 flex flex-wrap items-end gap-3">
        <h1 className="serif text-[42px] font-bold leading-[1.05] text-[var(--petrol-ink)]">Les dossiers.</h1>
        <button onClick={() => setShowDossier({})} className="btn-ink ml-auto">+ Ouvrir un dossier</button>
      </div>
      <input value={rq} onChange={(e) => setRq(e.target.value)} placeholder="Filtrer : client, pack, niche, stade…" className="input mt-4 max-w-[420px]" aria-label="Filtrer les dossiers" />
      <div className="mt-3 bg-white overflow-x-auto">
        <table className="tbl"><thead><tr><th>Affaire</th><th>Pack</th><th className="num">Honoraires</th><th>Stade</th><th></th></tr></thead>
          <tbody>{rows.map((d) => (
            <tr key={d.id}>
              <td><b className="serif text-[16px] text-[var(--petrol-ink)]">{esc(d.client)}</b><div className="mono text-[11px] text-[var(--faint)]">{esc(d.niche || '')} · {esc(d.residence || '')}</div></td>
              <td>{esc(d.pack || '—')}</td>
              <td className="mono num">{fmtDH(d.honoraires)}</td>
              <td><span className="pill pill-petrol">{esc(d.statut || 'Prospect')}</span></td>
              <td className="text-right"><button onClick={() => setShowDossier(d)} className="btn-line btn-sm">Ouvrir</button></td>
            </tr>))}</tbody></table>
        {rows.length === 0 && (
          <div className="px-2 py-10 text-center">
            <p className="serif text-[22px] font-bold text-[var(--petrol-ink)]">{dossiers.length === 0 ? "Le registre est vierge." : 'Aucune affaire ne correspond.'}</p>
            <p className="mx-auto mt-1 max-w-[52ch] text-[13px] text-[var(--dim)]">{dossiers.length === 0 ? "Inscrivez la première affaire : la provision encaissée y joint son rythme J0–J7." : 'Élargissez le filtre ou inscrivez une nouvelle affaire.'}</p>
            {dossiers.length === 0 && <button onClick={() => setShowDossier({})} className="btn-ink btn-sm mt-3">+ Ouvrir un dossier</button>}
          </div>
        )}
      </div>
    </div>
  )
}

function EchView({ echeances, setEcheances, dossiers, toast }) {
  const [filtre, setFiltre] = useState('faire')
  const t = todayISO()
  const rows = echeances.slice().sort((a, b) => (a.date || '').localeCompare(b.date || ''))
    .filter((e) => filtre === 'toutes' ? true : filtre === 'faites' ? e.done : !e.done)
  const name = (id) => dossiers.find((d) => d.id === id)?.client || '—'
  const toggle = (id) => setEcheances((a) => a.map((e) => (e.id === id ? { ...e, done: !e.done } : e)))
  const del = (id) => { if (!window.confirm('Retirer cette échéance du registre ?')) return; setEcheances((a) => a.filter((e) => e.id !== id)); toast('Échéance retirée.') }
  return (
    <div>
      <div className="kicker">Rythmes J0–J7 · rappels PACK</div>
      <h1 className="serif mt-2 text-[42px] font-bold leading-[1.05] text-[var(--petrol-ink)]">Les échéances.</h1>
      <p className="mt-2 max-w-[68ch] text-[14px] text-[var(--dim)]">Chaque provision encaissée y inscrit son rythme ; chaque registre, son butoir. Pointer, c'est clore.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {[['faire', 'À faire'], ['retard', 'En retard'], ['faites', 'Pointées'], ['toutes', 'Toutes']].map(([v, l]) => (
          <button key={v} onClick={() => setFiltre(v)} className={filtre === v ? 'btn-ink btn-sm' : 'btn-line btn-sm'}>{l}</button>
        ))}
        <span className="mono ml-auto self-center text-[11px] uppercase tracking-[0.12em] text-[var(--faint)]">{rows.length} ligne(s)</span>
      </div>
      <div className="mt-3 bg-white">
        {(filtre === 'retard' ? rows.filter((e) => !e.done && e.date && e.date < t) : rows).map((e) => {
          const late = !e.done && e.date && e.date < t
          return (
            <div key={e.id} className="flex items-center gap-3 border-b border-[var(--line)] px-2 py-2.5">
              <input type="checkbox" checked={!!e.done} onChange={() => toggle(e.id)} className="h-[18px] w-[18px] shrink-0 accent-[#0d535f]" aria-label={`Pointer : ${e.intitule || e.type}`} />
              <span className={`mono shrink-0 text-[12px] ${late ? 'font-bold text-[var(--bordeaux)]' : 'text-[var(--dim)]'}`}>{e.date || '—'}</span>
              <span className="min-w-0 flex-1"><span className={`block truncate text-[13.5px] ${e.done ? 'text-[var(--faint)] line-through' : 'text-[var(--ink)]'}`}>{esc(e.intitule || e.type)}</span>
                <span className="mono block text-[11px] text-[var(--faint)]">{esc(e.type || '')} · {esc(name(e.dossierId))}</span></span>
              {late && <span className="pill pill-bordeaux hidden sm:inline-flex">Retard</span>}
              <button onClick={() => del(e.id)} className="btn-line btn-sm shrink-0" aria-label="Retirer">×</button>
            </div>
          )
        })}
        {rows.length === 0 && (
          <div className="px-2 py-10 text-center">
            <p className="serif text-[22px] font-bold text-[var(--petrol-ink)]">Rien à pointer.</p>
            <p className="mx-auto mt-1 max-w-[52ch] text-[13px] text-[var(--dim)]">Les échéances naissent des provisions encaissées et des registres. Ouvrez un dossier pour lancer le premier rythme.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function RegView({ registres, setRegistres, setEcheances, dossiers, toast, t }) {
  const [f, setF] = useState({ dossierId: dossiers[0]?.id || '', facture: '', exig: t, kind: 'Services', montant: '' })
  const butoir = (exig, kind) => (exig ? addDays(exig, kind === 'Biens' ? 150 : 90) : '')
  const add = () => {
    if (!f.exig || !f.dossierId) return toast('Dossier + exigibilité requis.')
    const b = butoir(f.exig, f.kind)
    setRegistres((a) => [...a, { id: uid(), ...f, butoir: b, creditDate: '', createdAt: t }])
    setEcheances((e) => [...e, { id: uid(), dossierId: f.dossierId, date: b, type: 'Change 90j', intitule: `Butoir ${(f.facture || '')} — rapprocher SWIFT`, done: false, auto: 'PACK' }])
    toast(`Ligne inscrite — butoir ${b} (${f.kind === 'Biens' ? '150j' : '90j'}).`)
  }
  return (
    <div>
      <div className="kicker">Change · IGOC 2026</div>
      <h1 className="serif mt-2 text-[42px] font-bold leading-[1.05] text-[var(--petrol-ink)]">Registres 90j / 150j.</h1>
      <p className="mt-2 max-w-[68ch] text-[14px] text-[var(--dim)]">L'exigibilité ouvre le délai, le SWIFT le clôt. Le butoir se calcule seul ; l'alerte précède de quinze jours. Référence : modèle 05/09.</p>
      <div className="mt-4 grid grid-cols-1 gap-2 border border-[var(--line)] bg-white p-3 sm:grid-cols-2 lg:grid-cols-6">
        <select value={f.dossierId} onChange={(e) => setF({ ...f, dossierId: e.target.value })} className="input">{dossiers.map((d) => <option key={d.id} value={d.id}>{d.client}</option>)}</select>
        <input value={f.facture} onChange={(e) => setF({ ...f, facture: e.target.value })} placeholder="F-2026-001" className="input" />
        <input type="date" value={f.exig} onChange={(e) => setF({ ...f, exig: e.target.value })} className="input" />
        <select value={f.kind} onChange={(e) => setF({ ...f, kind: e.target.value })} className="input"><option>Services</option><option>Biens</option></select>
        <input value={f.montant} onChange={(e) => setF({ ...f, montant: e.target.value })} placeholder="8 000 EUR" className="input" />
        <button onClick={add} className="btn-ink">Inscrire — {butoir(f.exig, f.kind) || '—'}</button>
      </div>
      <div className="mt-4 bg-white overflow-x-auto">
        <table className="tbl"><thead><tr><th>Affaire</th><th>Facture</th><th>Exigibilité</th><th>Butoir</th><th>SWIFT</th><th>État</th><th></th></tr></thead>
          <tbody>{registres.map((r) => {
            const late = !r.creditDate && r.butoir && (r.butoir < t || addDays(t, 15) >= r.butoir)
            return <tr key={r.id}><td><b className="serif text-[15px]">{dossiers.find((d) => d.id === r.dossierId)?.client}</b></td><td className="mono">{r.facture}</td><td className="mono">{r.exig}</td><td className="mono">{r.butoir}</td><td className="mono">{r.creditDate || '—'}</td><td>{r.creditDate ? <span className="pill pill-green">Soldé</span> : late ? <span className="pill pill-ochre">J-15 / dépassé</span> : <span className="pill">En cours</span>}</td><td className="text-right"><button onClick={() => { setRegistres((a) => a.map((x) => (x.id === r.id ? { ...x, creditDate: todayISO() } : x))); toast(`SWIFT pointé — ${r.facture || 'ligne'} soldée.`); }} className="btn-line btn-sm">Crédité</button> <button onClick={() => { if (!window.confirm(`Retirer la ligne ${r.facture || ''} du registre ?`)) return; setRegistres((a) => a.filter((x) => x.id !== r.id)); toast('Ligne retirée du registre.'); }} className="btn-line btn-sm">×</button></td></tr>
          })}</tbody></table></div>
    </div>
  )
}

function DivView({ dividendes, setDividendes, setEcheances, dossiers, toast }) {
  const [f, setF] = useState({ dossierId: dossiers[0]?.id || '', exo: '2026', agDate: '', montant: '' })
  return (
    <div>
      <div className="kicker">Calendrier annuel</div>
      <h1 className="serif mt-2 text-[42px] font-bold leading-[1.05] text-[var(--petrol-ink)]">Dividendes.</h1>
      <p className="mt-2 max-w-[68ch] text-[14px] text-[var(--dim)]">Octobre simule, janvier constate : le procès-verbal daté fixe la retenue. Référence : modèle 05/10.</p>
      <div className="mt-4 grid grid-cols-1 gap-2 border border-[var(--line)] bg-white p-3 sm:grid-cols-2 lg:grid-cols-5">
        <select value={f.dossierId} onChange={(e) => setF({ ...f, dossierId: e.target.value })} className="input">{dossiers.map((d) => <option key={d.id} value={d.id}>{d.client}</option>)}</select>
        <input value={f.exo} onChange={(e) => setF({ ...f, exo: e.target.value })} className="input" placeholder="2026" />
        <input type="date" value={f.agDate} onChange={(e) => setF({ ...f, agDate: e.target.value })} className="input" />
        <input value={f.montant} onChange={(e) => setF({ ...f, montant: e.target.value })} className="input" placeholder="200 000 DH" />
        <button onClick={() => { if (!f.dossierId || !f.agDate) return toast('Dossier + AG requis.'); const id = uid(); setDividendes((a) => [...a, { id, ...f, rasPayee: false, transfere: false }]); setEcheances((e) => [...e, { id: uid(), dossierId: f.dossierId, date: f.agDate, type: 'AG / Formalité', intitule: `AG distribution ${f.exo} — PV + RAS`, done: false, auto: 'PACK' }]); toast('Distribution inscrite + échéance AG.') }} className="btn-ink">Inscrire</button>
      </div>
      <div className="mt-4 bg-white overflow-x-auto">
        <table className="tbl"><thead><tr><th>Affaire</th><th>Exercice</th><th>Assemblée</th><th>Montant</th><th>Retenue</th><th>Transfert</th><th></th></tr></thead>
          <tbody>{dividendes.map((r) => <tr key={r.id}><td><b className="serif text-[15px]">{dossiers.find((d) => d.id === r.dossierId)?.client}</b></td><td className="mono">{r.exo}</td><td className="mono">{r.agDate}</td><td className="mono">{r.montant}</td><td>{r.rasPayee ? <span className="pill pill-green">Acquittée</span> : <span className="pill">Due</span>}</td><td>{r.transfere ? <span className="pill pill-petrol">Transféré</span> : '—'}</td><td className="text-right"><button onClick={() => { setDividendes((a) => a.map((x) => (x.id === r.id ? { ...x, rasPayee: true } : x))); toast('Retenue pointée comme acquittée.'); }} className="btn-line btn-sm">RAS ✓</button> <button onClick={() => { setDividendes((a) => a.map((x) => (x.id === r.id ? { ...x, transfere: true } : x))); toast('Transfert pointé. Joignez le SWIFT au dossier.'); }} className="btn-line btn-sm">Transfert ✓</button></td></tr>)}</tbody></table></div>
    </div>
  )
}

function SejView({ sejours, setSejours, setEcheances, dossiers, toast }) {
  const [f, setF] = useState({ dossierId: dossiers[0]?.id || '', titre: '', expiry: '' })
  return (
    <div>
      <div className="kicker">Loi 02-03 — séjour des étrangers</div>
      <h1 className="serif mt-2 text-[42px] font-bold leading-[1.05] text-[var(--petrol-ink)]">Séjour & veille.</h1>
      <p className="mt-2 max-w-[68ch] text-[14px] text-[var(--dim)]">Chaque titre s'éteint un jour ; le rappel précède de quinze. La veille mensuelle IGOC/CNDP/LF/OMPIC tient le reste à jour.</p>
      <div className="mt-4 grid grid-cols-1 gap-2 border border-[var(--line)] bg-white p-3 sm:grid-cols-2 lg:grid-cols-4">
        <select value={f.dossierId} onChange={(e) => setF({ ...f, dossierId: e.target.value })} className="input">{dossiers.map((d) => <option key={d.id} value={d.id}>{d.client}</option>)}</select>
        <input value={f.titre} onChange={(e) => setF({ ...f, titre: e.target.value })} className="input" placeholder="Carte d'immatriculation, un an" />
        <input type="date" value={f.expiry} onChange={(e) => setF({ ...f, expiry: e.target.value })} className="input" />
        <button onClick={() => { if (!f.dossierId || !f.expiry) return toast('Dossier + échéance requis.'); setSejours((a) => [...a, { id: uid(), ...f }]); setEcheances((e) => [...e, { id: uid(), dossierId: f.dossierId, date: addDays(f.expiry, -15), type: 'Séjour', intitule: 'Renouvellement carte J-15', done: false, auto: 'PACK' }]); toast('Titre inscrit + rappel J-15.') }} className="btn-ink">Inscrire</button>
      </div>
      <div className="mt-4 bg-white overflow-x-auto">
        <table className="tbl"><thead><tr><th>Affaire</th><th>Titre</th><th>Échéance</th><th>État</th><th></th></tr></thead>
          <tbody>{sejours.map((r) => { const t = todayISO(); const alert = r.expiry && (r.expiry < t || addDays(t, 15) >= r.expiry); return <tr key={r.id}><td><b className="serif text-[15px]">{dossiers.find((d) => d.id === r.dossierId)?.client}</b></td><td>{r.titre}</td><td className="mono">{r.expiry}</td><td>{alert ? <span className="pill pill-ochre">J-15</span> : <span className="pill pill-green">En règle</span>}</td><td className="text-right"><button onClick={() => { if (!window.confirm(`Retirer le titre « ${r.titre || ''} » du suivi ?`)) return; setSejours((a) => a.filter((x) => x.id !== r.id)); toast('Titre retiré du suivi.'); }} className="btn-line btn-sm">×</button></td></tr> })}</tbody></table></div>
    </div>
  )
}
