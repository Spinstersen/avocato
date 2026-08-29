# 01 — Fondamentaux LLM & Risques Avocat

## Comment marche un LLM (en 5 lignes)

Prédit le mot suivant sur base statistique, pas de compréhension juridique. Hallucine références (arrêts inventés 15-30% selon étude Stanford 2024). Ne connaît pas Loi 28-08 par cœur.

## 3 Risques majeurs

1. **Hallucination:** cite "Cass. com. 12/03/2024 n°123" qui n'existe pas. → Vérifier sur `jep.ma` ou `sgg.gov.ma` avant citation.
2. **Fuite secret:** prompt "Yassine, 600k DH AE" → stocké US, violation secret art 36 Loi 28-08. → Anonymiser.
3. **Responsabilité:** art 59 Loi 28-08: l'avocat répond de ses écrits même si draft IA. IA ≠ excuse.

## Test hallucination

Demande "Donne arrêt marocain sur clause pénale DOC" → 3 fois sur 5, LLM invente numéro. Toujours croiser.

## Règle d'or

> IA draft 70% → humain 30% relecture + vérification source primaire.

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