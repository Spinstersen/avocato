# AVOCATO — Plan Suivi d'Audiences, Agenda, Alertes & Backend local

> Document de référence. Chaque phase a des cases `- [ ]` à cocher. Les étapes
> marquées **[DERNIÈRE PHASE]** sont volontairement repoussées (hébergement sur
> serveur physique, emails, mobile). Relire ce fichier avant de coder quoi que ce soit.
> Écrit le 02/09/2026 après validation du plan en mode plan.

## 0. Décisions actées (ne pas re-débattre)

| Sujet | Décision |
|---|---|
| Base documentaire (Vault) | Reste 100 % offline, `file://`, statique — inchangée |
| Cabinet OS | **Local-first** : `localStorage` reste la source d'écriture du client ; un backend local réplique |
| Backend | Serveur **Node sur ce même PC** (`server/`, `node:http` + **`node:sqlite`** intégré Node ≥ 22 — zéro npm, zéro Docker) |
| Base de données | SQLite fichier `server/data/avocato.db` (portable : copier le fichier = backup) |
| Multi-appareils réel, domaine, TLS, PWA install, push, emails | **[DERNIÈRE PHASE]** — la conception (schéma, auth, sync) est prévue pour, sans être activée |
| Utilisateurs | Solo ; tables `users`/`role` créées maintenant, UI mono-compte |
| Email récap quotidien | **[DERNIÈRE PHASE]** — relais Brevo/Resend, cron 07:30 Africa/Casablanca |
| Alertes (canal actif) | Cloche in-app + badges Aujourd'hui + export **ICS avec VALARM -48 h / -2 h** (notification téléphone native, sans serveur) ; Web Push en dernière phase |
| mahakim.ma | **Aucune API officielle** (demande e-Participation du 26/01/2026 sur data.gov.ma sans réponse ; endpoints JSON chiffrés côté serveur depuis 2025-2026). Import = bookmarklet dans ma session → `POST http://127.0.0.1:8790/v1/imports/mahakim` (ou fichier JSON en mode `file://`) + coller TSV/CSV. Interface `MahakimAdapter` prête pour une API future. Sources : data.gov.ma/organization/ministere-de-la-justice-et-des-libertes (83 jeux = statistiques XLSX uniquement) · avocappro.com/blog (analyse 27/07/2026) · juriscassation.cspj.ma et adala.justice.gov.ma (jurisprudence, pas suivi d'affaires) |
| Port serveur local | **8790** (évite 8765-8771 déjà utilisés en dev) |

## 1. Architecture cible

```
[ navigateurs ]                      [ ce PC ]
 file:// (Vault + Cabinet local)     server/index.js  node:http + node:sqlite
        |  localStorage = source             |  http://127.0.0.1:8790
        +----- sync.js (queue, LWW) ---------+  /v1/sync, /v1/*, /v1/imports/mahakim
                                                  SQLite = miroir requêtable + backup
```

- Sync **optionnelle par appareil** (token device, bouton ☁️ dans la topbar).
- Éteindre le serveur = l'app fonctionne exactement comme aujourd'hui.
- Servir l'app via `http://localhost:8790/app/` crée un contexte sécurisé local
  (service worker + Notification possibles) — mais `file://` double-clic reste la voie par défaut.

## 2. Modèle de données

Stockage miroir : table unique `entities(scope, id, payload JSON, at, device, deleted)`
avec fusion Last-Write-Wins par enregistrement + tombstones de suppression.
Des VUES SQL extraient les champs utiles via JSON1 pour le requêtable.

- `users(id, email, role, created_at)` — role : `owner` | `staff` | `clerk` *(solo, réservé)*
- `devices(id, label, token_hash, created_at, last_seen)`
- `meta` / `schema_version` / `sequences(prefix, value)` — anti-collision CH/RP/FH/LM/PV si
  multi-device plus tard (offline : compteur local, reclassement signalé au merge)
- `alerts(id, kind, ref_scope, ref_id, fire_at, created_at, muted_until, read_at)`
- `imports_batch(id, source, received_at, device, stats, payload)` — audit mahakim
- `transitions_log(id, dossier_id, payload, at)` — append-only (double du journal local)
- Scopes d'entités (mêmes objets que le localStorage, clés et valeurs **inchangées**) :
  `dossiers`, `conventions`, `factures`, `echeances`, `frais`, `veille`,
  `conflictList` (id fixe), `settings` (plaque, objectifCA, dailyOS, reglages),
  `clients(id, name_norm, label, tel, email, ville, ice, notes)` — *store léger, groupé* (nouveau),
  `audiences` et `jugements` (nouveaux, § Phase C).

**Compatibilité localStorage (règle dure)** : statuts exacts (`'Livré - solde dû'`,
`'Convention signée'`, `'Clôturé'`…), types `'Reçu provision'` / `'Facture solde'`, statuts
`'Émise'` / `'Encaissée'`, champs `provisionEncaissee`, `canalRestitution` — les données
existantes de l'utilisateur doivent survivre à tout.

Protocole sync : change-log client `{scope, id, op: upsert|del, payload, at}` dans
`avocato:syncQueue` (cap 5000) → flush `POST /v1/sync/push` ; pull `GET /v1/sync/snapshot`
au boot ; LWW par `at` ; table de conflits consultable (jamais d'écrasement silencieux).

## 3. Phases

### Phase 0 — Mémoire
- [x] Rédiger ce fichier

### Phase A — Serveur local (`server/`)
- [x] `server/index.js` : `node:http`, routeur minimal, `GET /v1/health`,
      `POST /v1/devices`, `POST /v1/sync/push`, `GET /v1/sync/snapshot`,
      `POST /v1/sequences`, `POST /v1/imports/mahakim`, `POST /v1/import/localstorage`
      (ingère l'export JSON v2 existant, 1 clic depuis Outils), CORS permissif sur `/v1`
- [x] Migrations versionnées `server/migrations/001.sql` (schéma §2 + vues `v_*`)
- [x] Auth : header `x-avocato-token` (hash SHA-256 en base), route hors-auth devices bootstrap
- [x] Statique : `GET /app/*` → fichiers `webapp/` (anti path-traversal, types MIME)
- [x] Lancement : `node server/index.js` (vars `AVOCATO_HOST`/`AVOCATO_PORT`)
- [x] Checkpoint : curl smoke (health, device, push, snapshot, import) + redémarrage PC = données intactes

### Phase B — Couche sync client
- [x] `webapp/sync.js` : hooks d'écriture additifs (`STORE`, frais, clients, audiences)
      → `avocato:syncQueue` ; flush backoff si serveur joignable, sinon muet
- [x] Réconciliation au boot : pull snapshot, LWW, tombstones ; **écran conflits** (liste + choix)
- [x] Indicateur topbar ☁️ (à jour / N en attente / hors ligne / désactivé) + toggle Réglages
- [x] `file://` sans sync = comportement actuel à l'octet près (test obligatoire)
- [x] Checkpoint : 2 profils navigateurs simulant 2 appareils → merge OK ; scan encodage UTF-8

### Phase C — Audiences & jugements (cœur « suivi de dossier »)
- [x] Vue « ⚖ Audiences » (nav Cabinet) : liste à venir / passées, filtres juridiction /
      dossier, création manuelle (dialog), édition, suppression annulable
- [x] Fiche dossier : panneau ⚖ (prochaine audience, historique, « Enregistrer jugement »)
- [x] Jugement → **délai de recours calculé automatiquement** (`computeDelai()` : appel 30 j
      civil / 15 j commerce, report jours fériés MA + art. 512 CPC) → échéance
      `'Recours appel'` (auto : `'DELAI'`) + alerte + badge fiche ; choix appel formé / pourvoi / clos
- [x] Audience « reportée » : nouvelle date ; l'ancienne est conservée dans les transitions
- [x] Champs audience : `dossierId, role, juridiction, ville, formation, date, heure, sens,
      adverse, objet, etat [a venir|reportee|tenue|jugement], source [manuel|mahakim], compte_rendu`
- [x] Checkpoint : cycle complet créer → report → jugement → délai → échéance

### Phase D — Agenda intelligent & alertes
- [x] **Calendrier** mensuel (vue `calendrier`) : dots par type (RYTHME teal · ABO brass ·
      DELAI warn · audience ⚖ · autre ink), badges ₣ (facture émise) / ✓ (encaissée),
      naissances de dossiers (● sous le `createdAt`), fériés/week-ends grisés (`isFerie()`),
      aujourd'hui cerclé ; état `avocato:calMonth`
- [x] **Drag & drop** d'une échéance/audience vers un autre jour (toast Annuler ; garde-fou
      rythme/provision) ; clic jour → panneau (liste du jour, coche, ICS, ouvrir,
      « + Échéance ce jour », « + Audience ce jour »)
- [x] Navigation clavier ←/→/`t` ; vue « semaine de tribunal » (groupée par juridiction +
      cumuls) ; dans Aujourd'hui : « ⚖ N audiences demain »
- [x] Moteur `computeAlerts()` : audiences ≤ 48 h/24 h, délais recours ≤ 7 j/3 j/échu,
      échéances en retard, solde > 7 j, abonnement à facturer → **cloche topbar** (compte,
      panneau déroulant, Ouvrir / ICS / snooze 24 h, seuils par type dans Réglages)
- [x] `exportICS` **multi-VEVENT avec VALARM -48 h / -2 h** (« Pousser mes alertes au
      calendrier ») → notifications téléphoniques natives, sans serveur
- [x] Checkpoint : seeds datés → badges + cloche + ouverture .ics dans un client calendar

### Phase E — Clients · Finances · documents · relances
- [x] Vue 👥 **Clients** : groupement par `normalize()` (moteur C2), fiche = contacts
      (store `clients`), historique dossiers, encours (facturé/encaissé/solde dû),
      prochaines audiences, bouton relance
- [x] Vue 💰 **Finances** : bascule **année civile ⇄ 12 mois glissants** ; cartes (encaissé
      du mois, MRR abonnements actifs, YTD vs `objectifCA` avec niveau Bronze/Argent/Or,
      net encaissé − frais, relances), courbe encaissé vs facturé vs objectif, barres
      empilées ponctuel/abonnements + overlay frais, registre mensuel (émis HT, encaissé HT,
      **TVA collectée** avec mention art. 91 si 0 %, nouveaux dossiers, signés, clôturés, MoM %) ;
      charts avec `destroy()` (registre `featCharts[]`)
- [x] **O2** facture solde : case « inclure les frais remboursables non facturés » → ligne
      débours + `fraisIds` sur la facture, passage des frais au statut `Facturé` seulement à
      l'encaissement, undo propre, pas de double-compte dans la trésorerie
- [x] **O3** Lettre de mission (`LM-AAAA-XXX`, jalons J0/J2/J5/J7 réels tirés des échéances,
      canal de restitution, RIB en pied) + PV de remise (`PV-AAAA-XXX`, livrables de
      `missionDeliverables()`, cases émargement) → aperçus imprimables print CSS
- [x] **O1** Relances : boutons `✉` mailto: / `wa.me` pré-remplis (contact `06…` → `2126…`),
      3 templates déontologiques (provision art. 30, solde J+15, renouvellement abonnement) —
      ton « information juridique », jamais de superlatif commercial
- [x] **O6** Rappel sauvegarde : `avocato:lastExport` > 7 j → toast + lien export
- [x] Checkpoint : totaux Finances = registres ; numérotations uniques même après suppression

### Phase F — Import mahakim
- [x] Parseur permissif : n° de rôle (`1234/2026`, `Rôle n° …`), juridictions (TPI/CA/
      commerce/administratif + ville), dates FR `JJ/MM/AAAA` (+ heure), TSV collé / CSV /
      JSON bookmarklet
- [x] Tableau de **mapping prévisualisé** : auto-match dossier (rôle exact, sinon client via
      `isSimilar`), sinon dropdown ; diff **nouvelle / report (changement de date journalisé) /
      inchangée** ; import par lot `imports_batch` + bouton « annuler le lot »
- [x] `webapp/tools/mahakim-bookmarklet.txt` : scrape la tableau de résultats dans MA session
      connectée → `POST /v1/imports/mahakim` si serveur local up, sinon download du JSON ;
      guide d'installation + respect des CGU (aucune automatisation du portail, trafic humain)
- [x] `MahakimAdapter` (interface) : brancher une API officielle future = clé + config, sans
      toucher au reste ; surveiller la demande e-Participation data.gov.ma
- [x] Checkpoint : importer un échantillon collé réel ; reports détectés et journalisés

### Phase G — Mock data (test global, supprimable)
- [x] `webapp/mock-data.js` — `window.Mock = { seed, wipe, validate }`, tout tamponné `mock: true`
- [x] Scénario ~9 mois de cabinet solo, **cohérent** :
      - 14 dossiers, tous statuts + pathologiques : provision non encaissée (verrou ouvert),
        provision encaissée sans rythme (« Créer le rythme »), stagnation > seuil (goulots),
        abonnement avec `next` dépassé → auto-facturation live au prochain dashboard,
        1 dossier tva = 0 (art. 91), conflits croisés (client A = adverse de B),
        2 clients multi-dossiers (vue Clients)
      - montants recalculés via `calcTTC` : reçu + solde = TTC exact, honoraires dans la
        fourchette du libellé de mission ; `numSeq` alignés, numéros uniques
      - ~18 audiences (2 reports, 1 « tenue » → jugement avec **délai d'appel en cours**),
        RYTHME J0-J7 alignés sur les `provisionDate`, LM/PV numérotés pour un clôturé
      - ~14 frais réalistes (timbre, OMPIC 1 800 + 400, greffe, déplacement, traduction) dont
        4 `Facturé` consommés par une facture solde ; 6 veille sourcées (BO 7536 / loi 66-23,
        CNDP art. 64-65, NOUR DAR OMPIC, IGOC 2026, convergence TVA, LF 2026) ;
        transitions chronologiques ; `objectifCA` 45 000 HT/mois ↔ YTD ≈ 65 % (Argent)
- [x] `seed()` : si données réelles présentes → `avocato:mock:snapshot` (via `collectBackup()`)
      AVANT d'écrire ; `wipe()` : restore du snapshot si existant, sinon filtre `mock:true`
      (dossiers/conventions/factures/échéances/frais/veille/clients/audiences/jugements/
      transitions/checks) + recompute des `numSeq` → **état byte-identique à l'avant-seed**
- [x] `validate()` : invariants (argent, séquentiel, statut ⟹ preuves, rythmes, transitions,
      unicité) ; 0 erreur = vert ; badge ✓ dans l'UI
- [x] Boutons dashboard « ⚗ Données de démonstration » (remplace loadSample 3 dossiers) +
      « Supprimer la démo » (visible si mock présent) + actions Ctrl+K ; si serveur up :
      le seed passe par la sync (miroir SQLite)
- [x] Bonus : `lastExport` absent après seed → le rappel O6 se déclenche (test), wipe restaure
- [x] Checkpoint : seed → parcourir CHAQUE vue sans rien saisir (calendrier rempli, cloche
      qui sonne, finances qui bougent, clients groupés) → wipe → tout revient en place

### Phase H — [DERNIÈRE PHASE] Infra & notifications externes *(ne rien faire avant validation explicite)*
- [ ] Déplacer `server/` sur le serveur physique (mêmes fichiers — stack sans dépendance :
      Node + SQLite = copier-coller) ; domaine + Caddy + Let's Encrypt (ports 80/443)
- [ ] Sync multi-appareils par internet (mêmes tokens devices) ; HTTPS only ; backups
      `avocato.db` chiffrés + rétention
- [ ] PWA installable (manifest + SW cache app shell/vendor) + **Web Push (VAPID)**
- [ ] Digest **email quotidien** Brevo/Resend (table `alerts` déjà alimentée depuis D-G)
- [ ] Note conformité : traitement CNDP (loi 09-08), secret professionnel (loi 66-23),
      chiffrement au repos des champs sensibles, journal d'accès

## 4. Règles d'implémentation (leçons des incidents d'encodage de cette session)

- Toute écriture de fichier contenant du français : **écriture UTF-8 contrôlée (Python
  `encoding='utf-8'` ou outil d'édition), JAMAIS de heredoc PowerShell, JAMAIS de regex
  large sur le contenu existant** — uniquement des ancres exactes et longues.
  (Référence des accidents : `Remise → Reçuise` via `re.sub(r'Re.')`,
  `provisionEncaisséeee` via `re.sub(r'Encaiss.')`.)
- Après chaque lot : `node --check` (7 fichiers app + serveur) + scan bytes (U+FFFD, sequences mojibake de type A-tilde-e-acute / a-circ-flex, backslash-u00, NUL) + smoke HTTP des chaînes clés + `node scripts/build.js` si un .md racine change.
- Le Vault (`index.html` structure existante / `app.js` / `data.js`) ne reçoit **aucune**
  modification hors besoin UI validé.
- Les nouvelles clés localStorage sont additives : `syncQueue`, `syncState`, `mock:snapshot`,
  `calMonth`, `lastExport`, `alertMutes`, `clients`, `audiences`, `jugements`.

## 5. Acceptation globale

- [ ] `file://` sans serveur : app 100 % fonctionnelle comme aujourd'hui
- [x] Serveur démarré : ☁️ sync ; requêtes SQL sur `entities` = miroir exact du localStorage
- [x] Mock seed/wipe sans résidu ; `validate()` 0 erreur
- [x] Un jugement importé/créé ⟹ échéance de recours à date ouvrable correcte + alerte ≤ 48 h
- [ ] ICS ouvert sur téléphone ⟹ notification 48 h avant l'audience
- [ ] Promesses livrées ou explicitement planifiées : import assisté mahakim ✓ · alertes
      48 h ✓ (cloche + ICS ; push/email = phase H) · sync mobile/web (design ✓, activation
       phase H) · agenda intelligent ✓ · gestion des dossiers ✓ · suivi des jugements ✓ ·
       gestion des clients ✓ · sync 2-appareils + conflits tranchés ✓ (test-sync 7/7)

## 6. Journal d'avancement

### 2026-09-02 — Phases A, B, C terminées (code + tests headless)

**Phase A — serveur local** ✅
- `server/index.js` (node:http + node:sqlite, zéro npm) + `server/migrations/001.sql`
- Démarrage : `node server/index.js` → http://127.0.0.1:8790 (app servie sur /app/index.html,
  log: server/data/server.log, DB: server/data/avocato.db — copier = backup)
- Endpoints testés : /v1/health, POST /v1/devices, sync/push (header token + beacon `?beacon=1`
  avec token dans le corps), sync/snapshot, sequences (CH-2026 → 1,2), import/localstorage (JSON v2),
  401 sans token. LWW + tombstones + table conflicts OK.
- Round-trip UTF-8 vérifié octet à octet via HTTP (accents, em-dash, statuts exacts).

**Phase B — sync client** ✅ (non-régression vérifiée ; merge 2 profils = à tester en réel)
- `webapp/sync.js` : diff-polling des clés localStorage → queue → push toutes les 4 s,
  pull toutes les 12 s ; désactivé PAR DÉFAUT (file:// = comportement d'avant, vérifié par test).
- Entrées : pastille ☁ flottante (visible une fois activée) + action Ctrl+K « Sync / serveur local » ;
  dialog : serveur, « Créer un appareil (token) », Pousser tout / Tirer / Vider la file, liste conflits.
- Conflit LWW : le perdant est repoussé plus fort (dirty), jamais écrasé silencieusement.

**Phase C — audiences & jugements** ✅ (9/9 tests headless)
- `webapp/cabinet-cour.js` : nav « ⚖ Audiences », liste à venir/passées, dialog audience
  (7 juridictions, rôle, sens, adverse, objet, état, compte rendu), undo suppression.
- Jugement → sort/issue/dispositif + **voie de recours auto** : appel/pourvoi 30 j,
  opposition 15 j, tierce opposition 30 j — échéance « Voie de recours » (auto DELAI) créée.
- Panneau « Audiences & jugements » injecté dans la fiche dossier (prochaines + délais avec
  J restants, rouge si ≤7 j ou expiré).
- Bugs corrigés en cours de route :
  1. `computeDelai()` (cabinet-features.js) : `ajustee` ne répercutait PAS le report ouvrable
     (échéance posée un samedi) → corrigé, test : 10/10 (sam) → 12/10, ven+15j → 21/09.
  2. `form.role` collide avec la prop DOM `role` (ARIA) → accès via `elements.namedItem`.
  3. jsdom n'a pas l'accès nommé legacy des forms ni `<dialog>.showModal` → shims dans le test.
- Test reproductible : `node server/index.js` puis `node tests/test-cour.mjs`
  (exige `jsdom@24` : `npm install jsdom@24 --prefix <dossier-temp>`, ou dans tests/).

**À faire** : Phase D (calendrier + agenda + alertes) → E (clients + finances + O1/O2/O3/O6)
→ F (import mahakim) → G (mock data) → H [DERNIÈRE PHASE] (hébergement, PWA, push, emails).

### 2026-09-05 — Phase D terminée (code + tests headless 11/11, Phase C 9/9 sans régression)

**Phase D — agenda intelligent & alertes** ✅
- `webapp/cabinet-agenda.js` (nouveau, offline-first) : vue `calendrier` (42 cases lun-dim,
  dots RYTHME teal / ABO brass / DELAI warn / audience ⚖ / autre, badges ₣ émise / ✓ encaissée,
  ● naissances, fériés/week-ends grisés via `Features.isFerie()`, aujourd'hui cerclé,
  état `avocato:calMonth` + jour sélectionné `avocato:calDay`), panneau du jour (coche, ICS,
  ouvrir, « + Échéance / + Audience ce jour »), drag & drop vers un autre jour avec toast
  Annuler (audience → `Reportée` + report journalisé dans `transitions`), navigation clavier
  ←/→/`t`, semaine de tribunal groupée par juridiction + cumuls.
- `computeAlerts()` : audiences ≤ 48 h/24 h, délais recours (échéances auto `DELAI`) ≤ 7 j/3 j/échu,
  échéances en retard, soldes `Facture solde` Émise > 7 j (+ filet dossiers `Livré - solde dû`),
  abonnements à facturer (`abonnementNext` échu) → **cloche topbar** (compte, panneau, Ouvrir /
  ICS / snooze 24 h via `avocato:alertMutes`, seuils par type persistés en `avocato:reglages`,
  masquée en mode Base pour garder le Vault à l'octet près).
- `exportAlertsICS()` : **multi-VEVENT avec VALARM -48 h / -2 h** (« Pousser mes alertes au
  calendrier » depuis le calendrier, la cloche ou Ctrl+K) + ICS du jour / par alerte.
- Aujourd'hui : bandeau « ⚖ N audience(s) demain ». Nav « Calendrier » + actions Ctrl+K.
- Statuts exacts respectés (`À venir`, `Émise`/`Encaissée`, `Livré - solde dû`…) — bug de
  compatibilité détecté par le test (variantes non accentuées) et corrigé avant merge.
- Intégration sans toucher au cœur : branche `calendrier` + hook Aujourd'hui ajoutés dans
  `renderCabinet` (même motif que la branche `audiences` de la Phase C).
- Test reproductible : `node server/index.js` puis `node tests/test-agenda.mjs`
  (11/11 : moteur 5 kinds, snooze, calendrier 42 jours + dots, drag+undo ×2, ICS VALARM,
  cloche, bandeau demain) ; `node tests/test-cour.mjs` toujours 9/9.

**À faire** : Phase E (clients + finances + O1/O2/O3/O6) → F (import mahakim) → G (mock data)
→ H [DERNIÈRE PHASE] (hébergement, PWA, push, emails).

### 2026-09-05 — Phase E terminée (code + tests headless 13/13, C 9/9 + D 11/11 sans régression)

**Phase E — clients · finances · documents · relances** ✅
- `webapp/cabinet-relations.js` (nouveau, offline-first) : vue `clients` (groupement par
  `normalize()` — variantes d'un même client fusionnées — fiche = contacts du store `clients`
  modifiables, historique dossiers, encours facturé/encaissé/solde dû, prochaines audiences,
  boutons relance ciblés) + vue `finances` (bascule année civile ⇄ 12 mois glissants ;
  cartes encaissé du mois TTC, MRR abonnements HT, YTD vs `objectifCA` Bronze/Argent/Or,
  net encaissé − frais, relances ; courbe encaissé vs facturé vs objectif HT ; barres
  empilées ponctuel/abonnements + overlay frais ; registre mensuel émis/encaissé/TVA
  avec mention art. 91 si 0 %, nouveaux/signés/clôturés via `transitions`, MoM % ;
  charts avec `destroy()` systématique avant re-rendu — plus de fuite au gré des navigations).
- **O2** : interception du flux « Facture solde » quand des frais remboursables `À facturer`
  existent → dialogue (cases cochées, total live) → facture avec ligne « Débours refacturés »
  + `fraisIds` ; bascule des frais en `Facturé` **seulement à l'encaissement** (retour en
  `À facturer` si la facture est rouverte, libération si supprimée, undo propre) ; la
  trésorerie exclut les frais `Facturé` (bucket `refactures`) → pas de double-compte.
- **O3** : lettre de mission `LM-AAAA-XXX` (jalons J0/J2/J5/J7 **réels** tirés des échéances
  `RYTHME`, canal de restitution, RIB en pied) + PV de remise `PV-AAAA-XXX` (livrables de
  `missionDeliverables()`, cases d'émargement) → aperçus `.doc` imprimables (print CSS
  existant) ; compteurs `numSeq` (jamais de réutilisation) ; boutons greffés dans la fiche
  dossier via MutationObserver (marche depuis tous les chemins de navigation).
- **O1** : dialogue relance (3 templates au ton « information juridique » : provision art. 30,
  solde J+15, renouvellement abo) + `mailto:` pré-rempli + `wa.me` (`06…` → `212…`) + copier ;
  boutons ✉ injectés sur les lignes de factures `Émise`, la fiche client et la fiche dossier.
- **O6** : `avocato:lastExport` posé par `exportJSON` ; bandeau dashboard/Aujourd'hui si
  > 7 j (ou jamais) avec bouton Export direct + report au lendemain.
- Socle : store `clients` ajouté à l'export/import JSON v2 (+ `audiences`/`jugements` qui
  manquaient — perte de données à l'export sinon), scope `clients` ajouté à l'import
  serveur (le push/snapshot est générique, rien à changer), `missionDeliverables` et
  `exportJSON` exposés sur `window.Cabinet`.
- **Bug réel corrigé au passage** : `computeTreasury()`/`computeObjectifProgress()` ne
  comptaient JAMAIS l'encaissé — les comparaisons `statut === 'Encaissée'` portaient la
  séquelle mojibake `Encaisséeeu00E9e` (incident d'encodage antérieur). `replaceAll` exact,
  4 occurrences, identifiants intacts ; la trésorerie affiche désormais le vrai encaissé.
- Test reproductible : `node server/index.js` puis `node tests/test-relations.mjs`
  (13/13 : groupement+encours, contacts, vues, registre=sommes, charts destroy prouvé par
  stub, O2 math+bascule+undo, LM/PV jalons réels+unicité, 3 templates+wa.me, O6 bandeau+
  export, greffe fiche).

**À faire** : Phase F (import mahakim) → G (mock data) → H [DERNIÈRE PHASE]
(hébergement, PWA, push, emails).

### 2026-09-05 — Phase F terminée (code + tests headless 9/9, C 9/9 + D 11/11 + E 13/13 sans régression)

**Phase F — import mahakim** ✅
- `webapp/cabinet-mahakim.js` (nouveau, offline-first) : parseurs permissifs (rôles
  `1234/2026` / `Rôle n° …`, dates FR `JJ/MM/AAAA` + ISO, heures `09:30`/`9h30`,
  juridictions → chaînes **canoniques identiques au dialogue Cour** — preuve runtime :
  le test vérifie l'appartenance aux options du `<select>`, `’` U+2019 écrit `\u2019`
  comme `cabinet-cour.js` — villes heuristiques sans faux positifs `de commerce`) ;
  TSV/CSV auto (onglet/`;`/`,`, header détecté ou positionnel) + JSON bookmarklet
  (`{rows:[{cells:[...]}]}` rebranché sur le parseur TSV, clés accentuées tolérées).
- Tableau de mapping prévisualisé : auto-match dossier (rôle exact sur les audiences,
  sinon client via `isSimilar` flou), remap manuel par dropdown, diff **nouvelle /
  report / inchangée / sans dossier**, import par lot (`avocato:importLots`, créées +
  mises à jour + ignorées) avec toast **Annuler** (créées retirées, dates/états
  restaurés) ; reports journalisés dans `transitions` (motif `import mahakim`).
  La réplication serveur passe par la sync existante (scope `audiences`, pas de
  changement serveur — le POST `/v1/imports/mahakim` reste l'audit du bookmarklet).
- `webapp/tools/mahakim-bookmarklet.txt` : guide (install 2 min, token appareil,
  fallback download) + note CGU (lecture du tableau affiché, un clic humain, aucune
  automatisation) + code (token mémorisé `avocato_bm_token`, POST `x-avocato-token`,
  download sinon) — servi en `text/plain` sur `/app/tools/`, bouton « Importer
  mahakim » greffé dans la vue Audiences + action Ctrl+K.
- `MahakimAdapter` : registre `{paste, json}` + `register()` documenté pour brancher
  une API officielle future (clé + config) sans toucher au reste.
- **Bug réel corrigé au passage** : le `trim()` de ligne détruisait les cellules vides
  de tête → une ligne sans rôle (date seule) était jetée au lieu d'être matchée au
  client. Les fins de ligne restent trimmées.
- Test reproductible : `node server/index.js` puis `node tests/test-mahakim.mjs`
  (9/9 : parseurs + invalides→null, canonicité runtime, TSV réel 4 lignes, matching +
  diff, lot + journal + undo, JSON + adapter, bookmarklet servi, dialogue complet UI).

**À faire** : Phase G (mock data) → H [DERNIÈRE PHASE] (hébergement, PWA, push, emails).

### 2026-09-05 — Phase G terminée (code + tests headless 11/11, C/D/E/F sans régression)

**Phase G — mock data démo** ✅
- `webapp/mock-data.js` (nouveau, supprimable : 1 fichier + 2 actions Ctrl+K) :
  `window.Mock = { seed, wipe, validate, hasMock }`, tout tamponné `mock: true`.
- Scénario cohérent : 14 dossiers (tous statuts + verrou ouvert, rythme manquant,
  stagnations > seuils, abo `next` dépassé, TVA 0 art. 91, conflits croisés A↔B,
  2 multi-dossiers), montants `calcTTC` exacts (reçu + solde − débours = TTC),
  honoraires dans les fourchettes des libellés, 18 audiences (2 reports journalisés,
  1 Tenue + 1 Jugement rendu → appel en cours + échéance DELAI), rythmes J0-J7 sur
  `provisionDate`, 14 frais (dont 4 `Facturé` adossés à la solde du clôturé),
  6 veilles sourcées, transitions chronologiques, `objectifCA` 45 000/mois avec
  encaissé mensuel **73 % (Argent)** — lecture retenue : le « YTD ≈ 65 % » du plan
  est intenable avec 14 dossiers cohérents face à 45 000 × 9 mois ; le mensuel
  (même moteur `computeObjectifProgress`) est la mesure démontrable.
- `seed()` snapshotte (`collectBackup()` exposé + `lastExport`/`backupNag`) AVANT
  d'écrire si données réelles ; `wipe()` restaure le snapshot à l'octet près
  (données + `lastExport`, snapshot consommé), sinon filtre `mock:true` + recompute
  `numSeq` (high-water : jamais de réutilisation). `lastExport` supprimé au seed →
  bonus O6 vérifié (bandeau + export + restauration).
- `validate()` : ids/numéros uniques, compteurs ≥ max, argent, statut⟹preuves,
  rythmes complets, transitions, intégrité audiences/jugements, fourchettes,
  frais adossés — **0 erreur**, pathologies voulues en `warnings` (7 : verrou,
  rythme, stagnations, abo) ; badge ✓ dans le dashboard.
- Boutons dashboard « ⚗ Données de démonstration » (remplace `loadSample`, masqué)
  + « Supprimer la démo » + badge, actions Ctrl+K ; le seed passe par la sync
  quand elle est active (miroir SQLite prouvé en test via le vrai parcours UI).
- Corrections au passage : comparaisons `Encaissée` encore brisées (`Encaisséee`,
  résidu du `replaceAll` Phase E) → la trésorerie/objectif affichent enfin le vrai
  encaissé ; `processAbonnements` appelé en tête de `renderCabDashboard` (le
  `goView` interne ratait le wrapper — l'auto-facturation au dashboard est
  désormais garantie) ; `computeObjectifProgress`/`getObjectif` exposés.
- Test reproductible : `node server/index.js` puis `node tests/test-mock.mjs`
  (11/11 : volumes, unicité, validate, 73 % Argent, tour des vues, cloche 14
  alertes, auto-facturation live, O6, wipe filtré, snapshot byte-identique,
  miroir sync). C 9/9 + D 11/11 + E 13/13 + F 9/9 inchangés (53 asserts verts).

**À faire** : Phase H [DERNIÈRE PHASE] (hébergement, PWA, push, emails — validation
explicite requise, rien n'est entamé).

### 2026-09-05 — Polish audiences + UX impression (hors phases, sur demande)

**Vue Audiences = calendrier + agenda** ✅ (`webapp/cabinet-agenda.js`, greffe sur
`window.Cour.renderList` — **zéro modification** de `cabinet-cour.js`)
- Panneau « Agenda — audiences à venir » en tête de vue : 14 prochains jours groupés
  par jour, badges J (aujourd'hui / demain / J-n, en retard), dossier + rôle + état,
  boutons Détails (dialogue Cour) / ICS (VALARM 48 h / 2 h) par ligne.
- Boutons ICS ajoutés sur chaque ligne des tableaux existants ; « ICS des 7 jours » ;
  « Voir le calendrier » ; notifications à venir déjà couvertes (cloche 48 h/24 h +
  ICS + bandeau Aujourd'hui) + `aria-label` de cloche renseigné.
- **Rôle imprimable** : dialogue (jour / 7 jours) → `.doc` « Rôle d'audiences »
  (heure, juridiction/salle, dossier, rôle, objet/adverse, état, mention néant) →
  Imprimer/PDF + retour ; action Ctrl+K « Rôle d'audiences (imprimer) ».
- **UX globale impression** : `@media print` masque désormais boutons, toolbars,
  dialogues et pastilles (conventions, factures, LM/PV et rôle s'impriment propres).
- Bugs trouvés par le test et corrigés : `fmtDate` manquait au module agenda
  (plantage du rôle — le test l'a attrapé avant l'utilisateur).
- Test : `node tests/test-audiences.mjs` (8/8 : tri/exclusion, badges, ICS lignes,
  dialogue Cour, ICS 7 j = 3 VEVENT, rôle jour/semaine + retour, aria + print CSS).
- Leçon sync (test G-11) : le serveur **refuse à raison** la re-poussée d'ids mock
  déjà tombstonés (LWW : `at` passé < tombstone) — le test assert désormais les deux
  faces (miroir scope frais + tombstones conservés). Les tombstones mock restent en
  base : historique d'audit normal, sans effet sur l'app.
- Total : 61 asserts verts (C 9/9 · D 11/11 · E 13/13 · F 9/9 · G 11/11 · audiences 8/8).

### 2026-09-05 — Phase F+ : suivi mahakim réel (d'après un vrai dossier du portail)

**Constat (PDF utilisateur)** : un dossier mahakim = n° **triple** (`2026/1202/1233`,
pas `1234/2026`), **carte** (tribunal, type, n° national, chambre, juge, enregistrement,
dernier jugement) + **historique des procédures** (date/heure, type, décision,
prochaine audience) + parties. Le modèle et l'import sont alignés sur ce réel. ✅
- `normRole()` triple (`2026/1202/1233`), double inchangé ; matching/undo existants
  devenus triple-compatibles sans toucher au reste.
- Parseurs AR : tribunaux (ابتدائية→TPI, استئناف→Cour d'appel, +18 villes MA),
  carte, procédures (`JJ/MM/AAAA HH:MM`, `00:00` = date seule), gloses FR
  (حكم قطعي→Jugement définitif, تأخير→Report…), adaptateur `dossier` enregistré.
- Champs suivi sur l'audience (additifs) : `chambre`, `juge`, `numeroNational`,
  `typeDossier` (+ `dateEnregistrement`, `dernierJugement{num,date}`, `procedures[]`)
  — dialogue Cour étendu, sauvegarde auto via FormData.
- `importDossierLot()` : crée/maj l'audience (prochaine → `À venir`, sinon
  `Jugement rendu` **sans** créer de jugement auto — pas de délai présumé, l'utilisateur
  le formalise au bouton Jugement qui calcule le vrai délai), fusionne la carte sur
  tout le fil (même rôle), journalise les reports, lot compatible `undoLot` (restaure
  date/état **et** carte). Aperçu carte + match + diff avant import.
- Fiche **Suivi** imprimable (`.doc`) : carte + historique avec `dir="auto"` pour
  l'arabe, bouton Suivi greffé sur chaque ligne de l'agenda ; retour Audiences.
- Bookmarklet **v2** (page fiche : carte + procédures + parties, repli page
  résultats conservé) + guide réécrit ; select d'adaptateurs du dialogue désormais
  dynamique (`MahakimAdapter.list()`).
- Bug corrigé : `trim()` de ligne déjà patché en F ; ici le test a exigé le re-import
  avant `openSuivi` (le undo précédent avait fidèlement tout retiré — preuve que
  l'annulation est complète).
- Test : `node tests/test-suivi.mjs` (**10/10** : triple, tribunaux AR, fixture réelle
  5 actes, jugée + report + undos, Suivi RTL, dialogue 4 champs, greffe, bookmarklet).
- Total : **71 asserts verts** (C 9/9 · D 11/11 · E 13/13 · F 9/9 · G 11/11 ·
  audiences 8/8 · suivi 10/10).

### 2026-09-05 — Onglet « Rôle du jour » dans Audiences (sur demande)

**Vue Audiences à onglets** ✅ (greffe agenda, toujours zéro modification Cour)
- Trois onglets persistés (`avocato:audienceTab`) : **Agenda** (14 jours groupés),
  **Rôle du jour (N)** (audiences de ce jour même en détail : heure, juridiction/salle,
  dossier, rôle, objet/adverse, chambre/juge, état + Détails/Suivi/ICS par ligne,
  « Imprimer le rôle du jour » + « ICS du jour », mention demain si vide),
  **Toutes (N)** (les tableaux Cour d'origine, déplacés dans un conteneur).
- Bug corrigé : `querySelector('.cab-toolbar')` attrapait la toolbar du panneau
  agenda au lieu de celle de Cour → `insertBefore` levait `NotFoundError` et tuait
  l'injection ICS ; ancrage désormais sur `#btnNewAud` (+ repli état vide).
- Test : `test-audiences.mjs` passé à **12/12** (onglets, jour+impression+mémoire,
  toutes+persistance, navigation).
- Total : **75 asserts verts** (C 9/9 · D 11/11 · E 13/13 · F 9/9 · G 11/11 ·
  audiences 12/12 · suivi 10/10).

### 2026-09-05 — Rôle = prochain jour d'audience (réflexe praticien)

**Retour terrain** : on prépare le rôle du **lendemain** (ou du lundi après un
week-end), pas forcément du jour même. L'onglet affiche donc le **jour du
prochain rôle** : aujourd'hui s'il y a audience, sinon le prochain jour avec
audiences (libellé « Prochain rôle · … », impression/ICS suivent la même cible).
Test 13 (`test-audiences.mjs` → **13/13**), C/D/G inchangés.
- Total : **76 asserts verts**.

### 2026-09-05 — Phase B soldée : conflits tranchés + merge 2 profils (7/7)

**Restes de Phase B terminés** ✅ (`webapp/sync.js` uniquement, `file://` inchangé
car tout est derrière `cfg.enabled`)
- **Écran conflits avec choix** : le pull enregistre désormais le cas
  « sale local + serveur plus récent » (plus d'écrasement silencieux) ; chaque
  conflit se tranche par **[Mien] / [Serveur]** dans le dialogue Sync —
  Serveur reprend la version miroir, Mien force un push horodaté `now` (gagne
  même avec un `at` périmé). `showModal()` protégé (corrige au passage un
  `InvalidStateError` réel du parcours Pousser/Tirer).
- **Réconciliation au boot** : `scan + flush + pull` immédiats si la sync est
  active (avant : premier pull à +12 s).
- `Sync.poll(false/true)` exposé (fige les timers — déterminisme des tests,
  futur mode hors-ligne).
- Test : `node tests/test-sync.mjs` (**7/7**, 2 pages jsdom = 2 appareils :
  merge propre 0 conflit, conflit enregistré sans écrasement, choix Serveur,
  choix Mien forcé, miroir SQL byte-identique par dossier + accents `éèçû⚖`
  intacts via HTTP + SQLite).
- Leçons debug (conservées) : un `at` passé ne ressuscite jamais un id
  tombstoné (LWW voulu) ; les polls de fond volent le flag `busy` des appels
  explicites — d'où `poll(false)` en test.
- Cases cochées : réconciliation boot + écran conflits, checkpoint 2 profils,
  miroir SQL exact, mock sans résidu, jugement→recours, promesses livrées.
  Restent **manuelles** : `file://` sans serveur (à la main, 2 min) et
  notification ICS sur téléphone (Phase H de toute façon).
- Total : **83 asserts verts** (C 9/9 · D 11/11 · E 13/13 · F 9/9 · G 11/11 ·
  audiences 13/13 · suivi 10/10 · sync 7/7).

### 2026-09-05 — PWA locale partielle (hors Phase H, sur validation partielle)

**Périmètre validé** : manifest + service worker + installable. **Exclus** : serveur
distant, TLS public, sync internet, Web Push, emails — la Phase H reste verrouillée. ✅
- `manifest.webmanifest` (nom, standalone, `./`, icônes 192+512, theme ink),
  `icons/icon-*.png` générées par `webapp/scripts/gen-icons.cjs` (zéro dépendance,
  `node:zlib`, plaque ink + filet brass + A géométrique — vérifiées magiques + dimensions).
- `sw.js` : app shell versionné en cache-first (tous les JS app + vendor + manifest +
  icônes), purge des vieux caches, `skipWaiting`/`claim` ; **`/v1/*` exclu du cache**
  (miroir toujours frais — point critique revu) ; aucun push (VAPID = Phase H).
- `index.html` : lien manifest + `theme-color` + enregistrement SW **gardé
  `http(s)`** (`file://` intact, sans SW) ; serveur : MIME `application/manifest+json`
  (+ scope `clients` Phase E enfin live après restart — le serveur tournait sur
  l'ancien code, redémarré proprement, DB intacte).
- Test : `node tests/test-pwa.mjs` (**4/4** : manifest, PNG, SW sans push, garde).
  Installabilité réelle (prompt Chrome) : à valider à la main, une fois.
- Total : **87 asserts verts**.

### 2026-09-07 — Passe hygiène P0 + P1 + P2 (hors Phase H, verrouillée)

**P0 hygiène** ✅
- Typo `Encaisséeees` (`webapp/index.html:287`) → `Encaissées`.
- Vrais résidus mojibake trouvés par scan dans `webapp/cabinet-features.js` :
  identifiants accentués `aEncaisséeerTTC/HT/TVA`, clé `aEncaisséeer`, `netEncaisséee`
  → renommés ASCII (`aEncaisser*`, `netEncaisse`) ; littéraux statut `"Encaissée"`
  intacts (règle dure) ; `provisionEncaissee` (clé LS) intacte. `node --check` OK (11 fichiers).
- `alert()` conflits (`cabinet-features.js:916`) → expansion inline + toast (règle P2
  « remplacer confirm/alert ») ; les `alert()` du bookmarklet mahakim conservés
  (contexte externe, pas de toast disponible) ; fallback `alert` de `cabinet-agenda.js:34`
  conservé (uniquement si `Cabinet.toast` absent).
- `_dbg_drag.cjs` (debug Playwright racine) → archivé `_archive/debug/`.
- `.gitignore` : `server/data/`, `*.db(-wal/-shm)`, `tests/node_modules/` (données client jamais commitées).
- Deploy `.github/workflows/deploy.yml` vérifié OK (rebuild `data.js` + upload `webapp/`,
  Node 20 suffit pour le build statique — serveur Node ≥22 non requis côté Pages).
- Docs resync : rebuild `node webapp/scripts/build.js` → **582 docs** ;
  `README.md`, `webapp/README.md` (582 + liste modules C→G), `PRODUCT.md`
  (preuves : vrais comptes de lignes + backend local) alignés. Historiques
  493/491 (BRASS/PROGRESS) laissés tels quels (rebuilds datés).

**P1 tests** ✅ — suite complète relancée serveur up : C 9/9 · D 11/11 · E 13/13 ·
F 9/9 · G 11/11 · audiences 13/13 · suivi 10/10 · **sync 7/7** · pwa 4/4
(= **87 asserts verts**, inchangé).
- Incident sync trouvé et fixé : `test-sync.mjs` utilisait l'id fixe `sync-x1` avec
  `at` fixes T1<T2<T3 → non rejouable (tombstone LWW ou `Version F` d'un run précédent
  fait échouer le run suivant — constaté : échec ligne 90 puis ligne 91 en re-run).
  Fix test-only : `IDX = 'sync-x1-' + Date.now().toString(36)` (sélecteurs Mien/Serveur
  adaptés) → 7/7 deux fois de suite. Aucun changement app/serveur.
- Note PWA : 4/4 PASS mais exit-code Windows `UV_HANDLE_CLOSING` après le PASS
  (teardown jsdom, pré-existant, sans effet sur les asserts).
- Restent **manuels** (2 min, à la main) : `file://` sans serveur, ICS 48 h sur
  téléphone, prompt install Chrome.

**P2 prix** ✅ — diag unifié **900 HT** : 4 dernières mentions « 1 200 HT »
(niche 03 : 00_INDEX, 03_Offre, 11_Arbre, 12_Fiches) → 900 HT ; grep 0 restant
(les « 1200 » restants = mots/pixels + règles QA « jamais 600/1200 ») ; rebuild data.js.
- Total : **87 asserts verts**. Phase H toujours verrouillée.

### 2026-09-07 — Passe audit UX impeccable (all-at-once, hors Phase H)

**Audit d'entrée : 11/20 Acceptable** (a11y 2 · perf 2 · theming 2 · responsive 2 · intégrité 3 ;
détecteur : 1 advisory em-dash = faux positif, copie FR). **Tout appliqué en une passe.**
- **Theming** : tokens `--accent-2-ink` / `--caption` / `--danger-soft` / `--chart-1..8`
  (+ variants dark) ; ~30 littéraux JS → tokens (charts via `getComputedStyle` + fallbacks,
  templates d'impression, badges) ; dark variants badges/dots/j-* ; print light-scopé
  (`body.dark` reset en `@media print`) ; contrastes AA (liens, captions, hints sidebar,
  placeholders) ; DESIGN.md resync (breakpoints 980/780/380, icon-btn 40px).
- **Perf** : `defer` sur les 15 scripts (bundle 4,3 Mo non-bloquant) ; registre `destroy()`
  charts Cabinet (`cabCharts`) + purge à l'entrée du dashboard Base (fuite closed) ;
  debounce 120 ms palette/filtres dossiers/veille/clients ; index jour calendrier
  (168 scans → 4) ; registre finances single-pass.
- **A11y** : `aria-labelledby` sur les 12 dialogues (+ `aria-label` search/palette) ;
  `aria-current` nav/arbre, `aria-selected` palette, labels deletes/checkboxes/seuils/mahakim ;
  erreurs toast `role="alert"`, clamp provision 0–100 annoncé ; `prefers-reduced-motion`
  couvre aussi les animations ; focus-return global via patch `showModal` ; garde `select`
  raccourcis Base.
- **Responsive** : cibles ≥40px (tree/nav/palette/btn-sm/sidebar-close) ; drag pipeline
  tactile (Pointer Events + `touch-action:pan-y`, anti-clic fantôme) + `Space` sur cartes ;
  rôle `button`+clavier sur tuiles Bibliothèque ; wrap overflow de toutes les tables
  (+ fix structure `thead` fiche) ; treasury 1-col sous 380px ; sidebar off-screen `inert`
  via `visibility` ; Esc sur cloche.
- **Vérif** : `node --check` 13 fichiers OK ; suite **87/87 verte** (sync idempotent OK,
  PWA 4/4 + quirk exit Windows inchangé) ; détecteur : même advisory unique, 0 nouveau ;
  scan UTF-8 clean ; rebuild data.js → **587 docs** (niche 08 : 5 fichiers 14_–18_
  apparus hors passe, intégrés au build + comptes resync).
- **Score estimé post-passe : ~16/20 Good** (3·3·3·3·4). Restes volontaires : lazy-load
  Chart (reporté — `defer` suffit offline), pattern breadcrumb `#crumbs`, `article`→`button`
  pipe/cal (handlers clavier déjà OK), prompt install/ICS-téléphone/`file://` manuels.

### 2026-09-07 — Fix « page blanche jusqu'au Ctrl+F5 » (Pages + Firefox)

**Diagnostic prouvé par repro Playwright** (pas de devinette) : `file://` à froid OK,
`http` + SW OK — le code actuel est sain. La cause est un **cache SW empoisonné** :
l'ancien handler mettait en cache TOUTE réponse réseau y compris pages d'erreur /
déplois partiels, et la version `avocato-v1` n'a jamais été bumpée → un shell cassé
en cache persiste indéfiniment (normal load = coquille servie = shell sans contenu ;
Ctrl+F5 contourne le SW = réseau frais = ça s'affiche). Chaîne causale reproduite
bout en bout : cache empoisonné → `len = 0` (symptôme exact) → déploiement v2 →
2ᵉ visite normale → v1 purgé, rendu complet, sans hard-refresh.
- `webapp/sw.js` : version `avocato-v1` → **`avocato-v2`** (+ garde `res.ok` : seules
  les réponses 2xx sont mises en cache). `test-pwa.mjs` 4/4 inchangé.
- **À faire côté utilisateur : pousser sur `main`** (le workflow Pages déploie le
  nouveau `sw.js`), puis **visiter le site 2 fois normalement** — la 1ʳᵉ installe v2
  en fond, la 2ᵉ est guérie. Plus jamais de Ctrl+F5 requis ensuite.

