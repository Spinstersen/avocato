/* AVOCATO — Cabinet Ops : moteur de processus (verrous art. 30, journal des
   transitions, rythmes J0-J2-J5-J7, checklist de mission, Today renforcé).
   Se greffe sur window.Cabinet. Offline, localStorage uniquement. */
(function () {
  'use strict';

  var LS = window.AvocatoStore.LS;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const { esc, uid, todayISO, toISODate } = window.AvocatoCore;
  function fmtDate(iso) { if (!iso) return ''; try { return new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }); } catch { return iso; } }
  const CAB = () => window.Cabinet;
  function STORE() { return CAB() ? CAB().STORE : null; }

  /* ---------- Règles métier ---------- */
  const FORWARD = ['Convention signée', 'En cours', 'Livré - solde dû', 'Clôturé'];

  function shortCanal(canal) {
    const c = (canal || '').toLowerCase();
    if (c.includes('loom')) return 'Loom';
    if (c.includes('zoom')) return 'Zoom';
    if (c.includes('cabinet') || c.includes('présentiel')) return 'cabinet';
    return 'à convenir';
  }

  function verrouOk(d) { return !!d.provisionEncaissee; }
  function needsGuard(d, next) {
    return FORWARD.includes(next) && !verrouOk(d);
  }

  /* ---------- Journal des transitions (append-only, cap 400) ---------- */
  function getTransitions() { return LS.get('transitions', []); }
  function journal(dossierId, client, from, to, info) {
    info = info || {};
    const list = getTransitions();
    const entry = { id: uid(), dossierId, client, from, to, at: new Date().toISOString(), force: !!info.force, motif: info.motif || '' };
    list.push(entry);
    while (list.length > 400) list.shift();
    LS.set('transitions', list);
    return entry;
  }
  function unjournal(entryId) {
    LS.set('transitions', getTransitions().filter(x => x.id !== entryId));
  }
  function purgeDossier(dossierId) {
    LS.set('transitions', getTransitions().filter(x => x.dossierId !== dossierId));
    const all = getChecks();
    if (all[dossierId]) { delete all[dossierId]; LS.set('dossierChecks', all); }
  }
  function lastForceFor(dossierId) {
    const t = getTransitions().filter(x => x.dossierId === dossierId && x.force);
    return t.length ? t[t.length - 1] : null;
  }
  function dossierTransitions(dossierId) {
    return getTransitions().filter(x => x.dossierId === dossierId).slice(-12).reverse();
  }

  /* ---------- Dialog Forcer le verrou ---------- */
  let forceCb = null;
  function askForce(d, prev, next, cb) {
    const dlg = $('#dlgForce');
    if (!dlg) { cb(true, null); return; }
    const ctx = $('#forceCtx');
    ctx.innerHTML = `<strong>${esc(d.client)}</strong> — passage « ${esc(prev || 'Prospect')} — ${esc(next)} » alors que la <strong>provision n'est pas encaissée</strong> (art. 30 : 50 % exigible avant démarrage).` +
      `<br><span class="force-sub">Le forçage est autorisé mais journalisé — il apparaîtra à l'audit mensuel.</span>`;
    const form = $('#formForce');
    form.motif.value = '';
    forceCb = cb;
    dlg.showModal();
    form.motif.focus();
  }
  if (document.readyState !== 'loading') wireForce();
  function wireForce() {
    const form = $('#formForce');
    if (!form || form._wired) return;
    form._wired = true;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const motif = form.motif.value.trim();
      if (!motif) { form.motif.focus(); return; }
      $('#dlgForce').close();
      const cb = forceCb; forceCb = null;
      if (cb) cb(true, { force: true, motif });
    });
    $('#btnCancelForce').addEventListener('click', () => {
      $('#dlgForce').close();
      const cb = forceCb; forceCb = null;
      if (cb) cb(false);
    });
    $('#dlgForce').addEventListener('close', () => {
      if (forceCb) { const cb = forceCb; forceCb = null; cb(false); }
    });
  }

  /* ---------- Rythme J0-J2-J5-J7 (16_Client_Ops/03) ---------- */
  const RYTHME = [
    { j: 0, type: 'Rythme J0', intitule: 'Kickoff — périmètre, calendrier annoncé, canal + mot « URGENT » (email J0)' },
    { j: 2, type: 'Rythme J2', intitule: 'Checkpoint « en mouvement » — une brique faite, la prochaine nommée, la pièce manquante (email court)' },
    { j: 4, type: 'Garde-fou', intitule: 'Préparer le checkpoint J5 (question ouverte unique + date de livraison)', kind: 'GardeFou' },
    { j: 5, type: 'Rythme J5', intitule: 'Checkpoint « presque fini » — la question ouverte unique + date de livraison re-confirmée' },
    { j: 6, type: 'Garde-fou', intitule: 'Préparer le paquet de quatre J7 : livrables + note de risques + mode d\'emploi + créneau de restitution', kind: 'GardeFou' },
    { j: 7, type: 'Rythme J7', intitule: 'Paquet de quatre : livrables + note de risques + restitution + mode d\'emploi — avant facture solde' }
  ];
  function hasRythme(dossierId) {
    const st = STORE(); if (!st) return false;
    return st.echeances.some(e => e.dossierId === dossierId && e.auto === 'RYTHME');
  }
  function createRythme(d) {
    if (!d || hasRythme(d.id)) return 0;
    const canal = shortCanal(d.canalRestitution);
    const base = d.provisionDate || todayISO();
    const baseMs = new Date(base + 'T12:00:00').getTime();
    const eches = RYTHME.map(r => ({
      id: uid(), dossierId: d.id,
      date: toISODate(new Date(baseMs + r.j * 86400000)),
      type: r.type,
      intitule: r.j === 7 ? r.intitule.replace('restitution', 'restitution (' + canal + ')') : r.intitule,
      done: false, auto: 'RYTHME', kind: r.kind || 'Reporting'
    }));
    const st = STORE();
    st.echeances = [...st.echeances, ...eches];
    return eches.length;
  }
  function onProvisionEncaissee(d) {
    if (!d || d.provisionEncaissee === undefined) return;
    const st = STORE();
    const a = st.dossiers;
    const i = a.findIndex(x => x.id === d.id);
    if (i >= 0 && !a[i].provisionDate) { a[i] = Object.assign({}, a[i], { provisionEncaissee: true, provisionDate: todayISO() }); st.dossiers = a; }
    const n = createRythme(a[i] || d);
    let np = 0;
    try { if (window.Packs1814 && window.Packs1814.createPackRappels) np = window.Packs1814.createPackRappels(a[i] || d) || 0; } catch (e) { console.warn('avocato', e); }
    CAB().toast('Provision encaissée — verrou art. 30 levé' + (n ? ' + rythme J0→J7 et garde-fous créés (' + n + ' échéances)' : '') + (np ? ' + rappels packs 14-18 (' + np + ').' : '.'));
  }

  /* ---------- Checklist de processus par dossier (flux canonique) ---------- */
  const PROCESS = [
    { id: 'kyc', label: 'Pouvoirs du signataire + ICE vérifiés', hint: '16/01',
      exp: 'Avant toute ouverture de fichier de travail — ces deux vérifs se font au diagnostic, pas à la signature.' },
    { id: 'conflit', label: 'Conflits d\'intérêts vérifiés (3 min)', hint: '16/02',
      exp: 'Les 5 questions avant acceptation : 3 minutes avant la convention. Après signature, il est trop tard.' },
    { id: 'conv', label: 'Convention d\'honoraires émise', auto: 'conv', hint: 'art. 30',
      exp: 'Émise le jour du diagnostic converti ; provision exigible à la signature, solde verrouillé à la remise.' },
    { id: 'prov', label: 'Provision 50 % encaissée', auto: 'prov', hint: 'verrou J0',
      exp: 'Aucun travail de fond avant encaissement (16/01). Cocher ou encaisser le reçu ouvre le rythme J0→J7 et pose les dates.' },
    { id: 'j0', label: 'Email J0 kickoff envoyé', hint: '16/03', ech: 'Rythme J0',
      exp: 'Le jour de l\'encaissement : périmètre, calendrier annoncé, canal, mot « URGENT » défini. La date annonce la date — le client n\'attend jamais une nouvelle qu\'on ne lui a pas annoncée.' },
    { id: 'lettre', label: 'Lettre de mission jointe', hint: 'modèle 07',
      exp: 'Jointe à la signature : jalons J0 / J2 / J5 / J7 écrits noir sur blanc, délais prévisionnels 3-10 jours ouvrés après provision + pièces complètes.' },
    { id: 'j2', label: 'Checkpoint J2 passé', hint: '16/03', ech: 'Rythme J2',
      exp: '2 jours après J0 : une brique faite, la prochaine nommée, la pièce manquante avec sa date de grâce. « Rien de neuf mais ça avance » EST un checkpoint réussi.' },
    { id: 'j5', label: 'Checkpoint J5 passé', hint: '16/03', ech: 'Rythme J5',
      exp: '5 jours (ou J-2 avant livraison) : ce qui est prêt, UNE question ouverte unique, date de livraison re-confirmée. Le garde-fou J4 prépare ce message.' },
    { id: 'j7', label: 'Paquet de quatre + restitution', hint: '16/05', ech: 'Rythme J7',
      exp: 'Jour 7 : livrables + note de risques + restitution (Loom 15 min / visio Zoom 30 min / cabinet) + mode d\'emploi. Jamais un livrable sans son mode d\'emploi, jamais la facture solde avant la remise.' },
    { id: 'solde', label: 'Facture solde encaissée', auto: 'solde', hint: '16/08',
      exp: 'Émise le jour du PV signé, payable à réception. Sinon escalade par calendrier, jamais par émotion : rappel J+0, mise en demeure J+15, suspension J+30, injonction J+60.' },
    { id: 'pv', label: 'PV de remise signé', hint: 'modèle 08',
      exp: 'Signé AVANT l\'envoi final — c\'est la preuve que le solde est exigible. Le PV déclenche l\'horloge de la facture.' },
    { id: 'cloture', label: 'Dossier clôturé', auto: 'cloture', hint: '16/06',
      exp: 'Après encaissement du solde : archivage (durées à fixer dans votre politique) + purge des brouillons.' },
    { id: 'ref', label: 'Referral demandé', hint: '16/07',
      exp: 'Restitution + 48 h — pendant que le client est satisfait, jamais pendant une négociation ou un incident.' },
    { id: 'nps', label: 'NPS envoyé (J+7 après clôture)', hint: '16/10',
      exp: 'Une seule question, 7 jours après la clôture — assez tôt pour sentir, assez tard pour avoir utilisé les livrables.' },
    { id: 'retainer', label: 'Fenêtre retainer ouverte (J+30)', hint: '12/06',
      exp: '30 jours après clôture : le client a re-creusé son sujet, c\'est la fenêtre où l\'abonnement (2 500-4 500 DH HT/mois) se propose sobrement. J+90 : bilan, pas de relance avant.' }
  ];
  function getChecks() { return LS.get('dossierChecks', {}); }
  function setCheck(dossierId, itemId, done) {
    const all = getChecks();
    all[dossierId] = all[dossierId] || {};
    all[dossierId][itemId] = done;
    LS.set('dossierChecks', all);
  }
  function derivedState(d) {
    const st = STORE(); if (!st) return {};
    const convs = st.conventions.filter(c => c.dossierId === d.id);
    const facts = st.factures.filter(f => f.dossierId === d.id);
    return {
      conv: convs.length > 0,
      prov: !!d.provisionEncaissee,
      solde: facts.some(f => f.type === 'Facture solde' && f.statut === 'Encaissée'),
      cloture: d.statut === 'Clôturé'
    };
  }
  function processProgress(d) {
    const manual = getChecks()[d.id] || {};
    const auto = derivedState(d);
    const done = PROCESS.filter(it => (it.auto ? auto[it.auto] : manual[it.id])).length;
    return { done, total: PROCESS.length };
  }

  /* ---------- Panneaux injectés ---------- */
  function panel(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }

  function bannerHtml(d) {
    if (!needsGuard(d, d.statut)) return '';
    const lastForce = lastForceFor(d.id);
    return `<div class="verrou-banner">
      <span class="vb-ico"></span>
      <div class="vb-body"><strong>Verrou art. 30 — provision non encaissée</strong>
      <span class="vb-sub">Statut « ${esc(d.statut)} » atteint sans provision${lastForce ? ' (forçage du ' + esc((lastForce.at || '').slice(0, 10)) + ' — motif : ' + esc(lastForce.motif) + ')' : ''}.</span></div>
      <button class="btn btn-sm" data-act="mark-prov">Marquer la provision encaissée</button>
    </div>`;
  }

  function processPanelHtml(d) {
    const manual = getChecks()[d.id] || {};
    const auto = derivedState(d);
    const { done, total } = processProgress(d);
    const pct = Math.round(100 * done / total);
    // dates réelles du rythme pour illustrer les délais J0/J2/J5/J7
    const st = STORE();
    const echByType = {};
    if (st) st.echeances.filter(e => e.dossierId === d.id && e.auto === 'RYTHME').forEach(e => { echByType[e.type] = e; });
    const today = todayISO();
    const rows = PROCESS.map(it => {
      let due = '';
      if (it.ech && echByType[it.ech]) {
        const e = echByType[it.ech];
        const late = !e.done && e.date && e.date < today;
        due = `<span class="proc-due mono${late ? ' late' : ''}" title="Échéance ${esc(e.type)} — ${esc(e.date)}">${e.done ? '✓ ' : late ? '⚠' : ''}${fmtDate(e.date)}</span>`;
      } else if (it.ech) {
        due = '<span class="proc-due mono dim">pas planifié</span>';
      }
      const exp = it.exp ? `<span class="proc-exp">${esc(it.exp)}${it.hint ? ' <span class="proc-hint mono">' + esc(it.hint) + '</span>' : ''}</span>` : '';
      if (it.auto) {
        const ok = auto[it.auto];
        return `<div class="proc-item auto ${ok ? 'done' : ''}"><span class="proc-dot">${ok ? '' : ''}</span><span class="proc-col"><span class="proc-lbl">${esc(it.label)} ${due}</span>${exp}</span></div>`;
      }
      const ck = !!manual[it.id];
      return `<label class="proc-item ${ck ? 'done' : ''}"><input type="checkbox" data-proc="${esc(it.id)}" ${ck ? 'checked' : ''}><span class="proc-col"><span class="proc-lbl">${esc(it.label)} ${due}</span>${exp}</span></label>`;
    }).join('');
    return `<div class="dash-panel ops-panel" style="margin-top:16px"><h3>Processus de la mission (${done}/${total})</h3>
      <p class="ops-sub">Le métronome : <span class="mono">J0 kickoff → J2 → J5 → J7 remise</span> — « la date annonce la date », et un checkpoint annoncé a lieu, vide ou plein (16/03).</p>
      <div class="daily-progress"><span class="bar"><span class="fill" style="width:${pct}%"></span></span><span class="mono dp-num">${pct}%</span></div>
      ${rows}</div>`;
  }

  function journalPanelHtml(d) {
    const rows = dossierTransitions(d.id);
    if (!rows.length) return '';
    return `<div class="dash-panel ops-panel" style="margin-top:16px"><h3>Journal des transitions</h3>
      <ol class="journal-list">${rows.map(e => `<li><span class="mono jd">${esc((e.at || '').slice(0, 10))}</span><span>${esc(e.from || '')} — <strong>${esc(e.to)}</strong></span>${e.force ? '<span class="j-force" title="' + esc(e.motif) + '">forcé — ' + esc(e.motif) + '</span>' : ''}</li>`).join('')}</ol></div>`;
  }

  function augmentDossier(d) {
    const host = $('#content .cab');
    if (!host) return;
    const banner = bannerHtml(d);
    if (banner) {
      const b = panel(banner);
      host.insertBefore(b, host.querySelector('.dash-cards') ? host.querySelector('.dash-cards').nextSibling : host.children[1]);
      const mb = b.querySelector('[data-act="mark-prov"]');
      mb.addEventListener('click', () => {
        const st = STORE();
        const a = st.dossiers;
        const i = a.findIndex(x => x.id === d.id);
        if (i >= 0) {
          a[i] = Object.assign({}, a[i], { provisionEncaissee: true, provisionDate: todayISO() });
          st.dossiers = a;
          onProvisionEncaissee(a[i]);
          CAB().viewDossier(d.id);
        }
      });
    }
    // Panneau processus inséré juste après la grille infos/échéances (visible sans scroller jusqu'au fil)
    const pp = panel(processPanelHtml(d));
    const grid = host.querySelector('.dash-grid');
    if (grid) host.insertBefore(pp, grid.nextSibling);
    else host.appendChild(pp);
    const jp = journalPanelHtml(d);
    if (jp) host.appendChild(panel(jp));
    $$('[data-proc]', host).forEach(cb => cb.addEventListener('change', () => {
      setCheck(d.id, cb.dataset.proc, cb.checked);
      CAB().viewDossier(d.id);
    }));
  }

  /* ---------- Today renforcé ---------- */
  function todayHook(host) {
    if (!host) return;
    const st = STORE(); if (!st) return;
    const dossiers = st.dossiers;
    const blocked = dossiers.filter(d => FORWARD.includes(d.statut) && !d.provisionEncaissee);
    const noRythme = dossiers.filter(d => d.provisionEncaissee && !hasRythme(d.id) && !['Clôturé', 'Abandonné'].includes(d.statut));
    if (!blocked.length && !noRythme.length) return;
    const el = panel(`<div class="dash-panel ops-panel" style="margin-top:14px"><h3>Verrous ouverts</h3>
      ${blocked.map(d => `<div class="today-action late"><span class="ta-ico">${window.ico('flag')}</span><span class="ta-date mono">${esc(d.statut)}</span><span class="ta-body"><strong>${esc(d.client)}</strong> — provision non encaissée (forçage journalisé)</span><button class="btn btn-sm" data-blocked="${esc(d.id)}">Ouvrir</button></div>`).join('')}
      ${noRythme.map(d => `<div class="today-action"><span class="ta-ico">${window.ico('calendar')}</span><span class="ta-date mono">rythme</span><span class="ta-body"><strong>${esc(d.client)}</strong> — provision encaissée mais J0-J2-J5-J7 absent</span><button class="btn btn-sm" data-rythme="${esc(d.id)}">Créer le rythme</button></div>`).join('')}
    </div>`);
    host.appendChild(el);
    $$('[data-blocked]', el).forEach(b => b.addEventListener('click', () => CAB().viewDossier(b.dataset.blocked)));
    $$('[data-rythme]', el).forEach(b => b.addEventListener('click', () => {
      const d = st.dossiers.find(x => x.id === b.dataset.rythme);
      if (d) { createRythme(d); CAB().toast('Rythme J0-J2-J5-J7 créé pour ' + d.client + '.'); CAB().renderCabinet(); }
    }));
  }

  /* ---------- Pipeline : puce verrou ---------- */
  function pipeBadge(d) {
    if (!needsGuard(d, d.statut)) return '';
    return ' <b class="pc-late">verrou</b>';
  }

  window.Ops = {
    FORWARD, needsGuard, verrouOk, shortCanal,
    askForce, journal, unjournal, purgeDossier, getTransitions,
    onProvisionEncaissee: onProvisionEncaissee, createRythme, hasRythme,
    augmentDossier, todayHook, pipeBadge, processProgress
  };
})();
