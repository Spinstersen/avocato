# 07 — Plausible Analytics & Conformité CNDP

## Pourquoi pas Google Analytics

- GA4 = transfert US → CNDP sanction possible (délib 40-22)
- Bandeau cookie obligatoire + consent → friction, déonto lourde
- GA4 sur-collecte (IP, device) → registre 09-08 complexe

## Plausible (recommandé)

- Hébergement UE (Allemagne), 0 cookie, IP hashée, conforme 09-08 par défaut
- Script 1kb, pas de bandeau si 0 cookie (avis CNDP)
- Dashboard: vues, sources, pages, pays — suffisant pour avocat
- Coût $9/mois, 10k vues.

## Setup 15 min

1. Créer compte Plausible → ajouter domaine `cabinet.ma` → coller script `<script defer data-domain="cabinet.ma" src="https://plausible.io/js/script.js">`
2. Vérifier dans Plausible dashboard (temps réel)
3. Alternative on-prem: Matomo self-host OVH (si 50k vues)

## Registre 09-08

Même avec Plausible, tenir registre simplifié `05_Document_Bank/templates/05_Registre_09-08_Modele.md`:
- Finalité: mesure audience
- Base légale: intérêt légitime
- Durée: 13 mois
- Droits: contact@cabinet.ma

## KPI à suivre (hebdo 10 min)

- Vues article top 3
- Source top (LinkedIn vs Google)
- Taux rebond >70% → article trop court
- Objectif: 1000 vues/mois à M6 → 1 diagnostic/sem

---

## À retenir + checklist + suite — Plausible & CNDP

**3 points clés de ce fichier :**
- GA4 = transfert US → sanction CNDP possible (délib 40-22) + bandeau cookie friction → bannir.
- Plausible UE (Allemagne) : 0 cookie, IP hashée, script 1kb, $9/10k vues, pas de bandeau si 0 cookie.
- Même avec Plausible, registre 09-08 simplifié obligatoire (finalité audience, base légitime, durée 13 mois, contact@cabinet.ma).

**Checklist 6 points — analytics conforme :**
- [ ] Compte Plausible créé + domaine `cabinet.ma` + script `plausible.io/js/script.js` posé
- [ ] Dashboard temps réel vérifié (vues / sources / pages / pays)
- [ ] Registre 09-08 créé (`05_Document_Bank/templates/05_Registre_09-08_Modele.md`) — 5 colonnes
- [ ] Politique confidentialité mentionne Plausible + transfert UE (pas US) + durée 13 mois
- [ ] KPI hebdo 10 min : top 3 articles, source top, rebond >70% → article trop court
- [ ] Alternative Matomo on-prem OVH évaluée si >50k vues

**Renvoi glossaire :** `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §06 Loi 09-08 registre 5 colonnes + transfert art.43-44 (hébergement UE vs US).

**Interaction dossier :** Données Plausible alimentent `03_Sales_Without_Selling/07_Metriques_Taux_Conversion.md` (funnel 1000 vues → 1 diag/sem) et `06_French_Communication/03_Structure_SCQA.md` (contenu qui convertit).

**Sources spécifiques :** plausible.io/docs (EU hosting), cndp.ma guide registre + délib 40-22, cnil.fr/cookies (référence UE) — vérif 20/08/2026.