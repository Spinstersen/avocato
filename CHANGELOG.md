# CHANGELOG — AVOCATO Vault

Format : [version] — date · type de changement

## [v3.3] — 2026-08-23 · Refonte visuelle globale « law firm »

### Cabinet OS (corporate)
- Palette **encrier `#1f2a44` / parchemin `#f2efe8` / or `#a8894e`** (clair + sombre)
- Monogramme AV serif, nav en petites capitales par sections + filet or sur l'actif
- Boutons carrés sobres (surlignage or au survol), zéro emoji
- KPI serif tabulaires avec filet or, panneaux papier, kanban « réglé » (lettrage espacé, compteurs or)
- Badges monogramme (statuts en petites capitales), timeline en registre avec médaillons C/F/S/E

### AVOCATO Learn (harmonisé)
- Mêmes tokens encrier/parchemin/or — light & dark
- Domaines en **monogrammes serif** (ST, NT, JU, NC, AC, CP, DB, 90) dans des médaillons or
- Arbre : filets d'encre, item actif à filet or, pastilles de lu dorées
- Hero dashboard : dégradé encrier avec accroche or, chiffres serif
- Document : titres serif Palatino, citations à filet or, tables lettrage espacé
- QCM sobre (options réglées, R comprenant la réponse en médaillon serif)
- Barre de progression lecture en dégradé or, surlignage recherche encre dorée
- Boutons/focus : surlignage or 2px, plus d'emoji (PDF / ◐ pour le thème)

## [v3.2] — 2026-08-23 · Cabinet OS — refonte UI/UX

### Design system dédié (principes high-end + UX enterprise)
- Palette « éditoriale » chaude : ivory `#f5f3ee` en clair, hairlines translucides au lieu de bordures grises
- **Cartes double-bezel** (coquille + cœur), KPI en chiffres tabulaires display tracking serré
- Boutons **pilules** avec physique de pression (scale .97, ombres douces, bezier `.32,.72,0,1`)
- **Dashboard bento asymétrique** : carte héro « Encaissé » en gradient bleu
- **Cascade d'entrée** sur chaque vue : fade-up + blur staggeré
- Kanban verre : cartes lift hover, rotation -2° pendant le drag, colonnes accentuées au drop
- Badges à pastille · tables hairline avec hover accent · focus rings 4px
- Titres de vue en police display système, sous-titres espacés
- Papeterie des documents générés : double filet bleu, papier ivory, blocs signature propres

## [v3.1] — 2026-08-23 · Cabinet OS refondu

### C1 — Conformité loi 66.23 + identité cabinet
- **Vue Paramètres** : fiche cabinet (nom, barreau, ICE, IF, RC, adresse, tél, email, RIB) persistée et injectée dans tous les documents
- Conventions/reçus/factures au **format loi 66.23** : cash interdit >10 000 DH, reçu numéroté obligatoire, plus aucune référence à l'art.30/loi 28-08 abrogée
- **Impression isolée** : seul le document part au PDF (`#printArea`), sidebar/topbar exclues
- Numérotation séquentielle persistante CH/RP/FH (fin des collisions)

### C2 — Pipeline visuel
- Vue **Kanban** 7 colonnes par statut : drag & drop desktop + boutons ◀▶ mobile
- **Timeline/journal** automatique par dossier (création, conventions, factures, statuts, échéances)

### C3 — Finance
- **Encaissements réels datés** → dashboard « encaissé vs attendu »
- Récap **TVA collectée par trimestre** avec sélecteur d'année
- **Export CSV comptable** (UTF-8 BOM, prêt Excel)

### C4 — Mobile & polish
- Tables transformées en **cartes empilées** <700px (labels intégrés)
- **Recherche globale** topbar : dossiers, conventions, factures, échéances
- Bibliothèque : les **22 templates** + carte loi 66.23

## [v3.0] — 2026-08-23

### Loi 66.23 (réforme profession avocat) — EN VIGUEUR
- Dossier maître `01_Strategy/13_Loi_66-23_Nouvelle_Loi_Avocats/` créé (5 fichiers : index 8 ruptures, accès/formation stage 24 mois, honoraires/traçabilité cash >10k interdit, gouvernance/élections décembre, checklist cabinet)
- Bannières d'abrogation loi 28-08 posées sur **16 fichiers** concernés
- Veille légale §A2 complète : promulgation (dahir 1-26-75), arts différés (12/39/§11-121), transitoire organique, CC décision 277/26

### Audit contenu complet (plan `00_START_HERE/14_PLAN_AUDIT_CONTENU.md`)
- **138 placeholders IA supprimés** dans 125 fichiers
- **2 erreurs factuelles corrigées** : IS 10 % → IS 20 % LF 2026 ; « IS 45% dotation voyage » éradiqué (4 fichiers)
- 6 FAQ canaux acquisition remplies (78 Q/R réelles)
- Fichiers télégraphiques réécrits : change nomad, cas MRE ×3, dotation investissement 100M
- START_HERE enrichi : QuickStart FR « première heure », guide langues, table maître (10 dossiers/22 tracks/22 templates)
- 90Day Overview : vue calendrier 13 semaines + jalons + rappels légaux

### Document Bank — 22 templates complets
- Nouveaux : 12 Politique confidentialité 09-08 · 13 Sous-traitance art.24 · 14 DPIA CNDP · 15 CGV formation (rétractation **7 j**) · 16 Sponsor/influenceur PI · 17 Checklist marque OMPIC · 18 Procuration apostillée MRE · 19 Guide formulaire 5000-F · 20 Radiation AE & quitus · 21 Devis pack · **22 CGV e-commerce loi 31-08**
- 0 lien interne mort (audit 1832 liens)

### Webapp
- Impression PDF propre (bouton 🖨️ + touche p + CSS print)
- Recherche avec filtre par domaine (chips 1-8)
- Badge NEW sur tracks récentes
- Fix CSS thème cabinet + anti-flash de thème au chargement
- PWA offline complète, mobile optimisé (S24)

## [v2.x] — août 2026
- Fusion V1+V2 (178 fichiers portés, jurisprudence restructurée ×8 dossiers canoniques)
- LF 2026 : barème IS unifié 20 % harmonisé (~110 remplacements)
- AE : plafonds 500k/200k, IR libératoire 0,5 %-1 %
- CPC 58-25 bannéré (en vigueur 24/08/2026) ; CPP 03.23 ; IGOC 2026
- Tracks skills 14-22 créées ; niches trilingues AR ×12 ; veille mensuelle n°002

## Suivi externe actif
- Texte consolidé 66.23 (SGG) → re-mapping articles
- Assemblée ABM 05/09/2026 · élections barreaux décembre 2026
- Textes réglementaires CPC 58-25 · décret facturation électronique · crypto projet 42-25
