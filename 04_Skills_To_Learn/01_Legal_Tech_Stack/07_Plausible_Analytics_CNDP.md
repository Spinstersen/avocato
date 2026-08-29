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

## Approfondissement Encyclopédique (Bonus)

### Cas pratique détaillé
**Contexte Maroc 2025:** appliqué à Yassine (freelance 600k DH offshore) et Fatima (ecom 30k/mois). 7 catégories + chiffrage.

### Erreurs fréquentes (Top 5)
1. Vouloir tout faire J1 -> overwhelm
2. Négliger 09-08/CNDP -> sanction 300k
3. Omettre provision art30 -> impayé
4. Publier sans relecture -> faute FR + hallucination
5. Pas de métrique -> 0 amélioration

### Checklist encyclopédique (12 points)
- [ ] Anonymisation / 09-08 OK
- [ ] Déontologie RIO vérifiée
- [ ] Template prêt veille
- [ ] Loom 3 min si livrable
- [ ] LanguageTool 0 faute
- [ ] Plausible/Yousign si besoin
- [ ] Notion archivé
- [ ] Feedback humain obtenu
- [ ] Repurposing 1->5 fait
- [ ] KPI mis à jour
- [ ] Spaced J3/J7 planifié
- [ ] Prochain sprint choisi

### Ressources Maroc
- sgg.gov.ma, cndp.ma, ompic.ma, jep.ma, rbm.ma
- YouTube: OMPIC, CNDP webinars, SPIN 15m, Canva School

### Plan 7 jours ultra-concret
J1 30m input, J2 output, J3 test Feynman, J4 feedback, J5 publish, J6 spaced J3, J7 review.

> Philosophie: Sobre, chiffré, vendable en 7j. Mieux vaut 70% publié que 95% parfait jamais livré.