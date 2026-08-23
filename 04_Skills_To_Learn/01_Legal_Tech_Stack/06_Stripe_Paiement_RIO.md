# 06 — Stripe Paiement (Zone Grise Déontologique)

> **Avertissement:** `01_Strategy/01_Rules/03_Actes_Permis_Cadre_Legal.md` — le paiement en ligne n'est pas interdit mais l'affichage "Acheter maintenant" peut être vu comme sollicitation. Vérifier RIO local.

## Position par barreau (2024-2025)

- **Casablanca, Marrakech:** tolérance si page sobre, prix HT, pas de promo.
- **Rabat, Fès:** plus strict, préférer virement + reçu provision manuel.
- **Règle:** saisir commission déontologie avant Stripe public (modèle `01_Strategy/01_Rules/12_Fiches_Pratiques.md:292`).

## Setup sobre si autorisé

- Produit Stripe: "Diagnostic 600 DH HT" (pas "Promo -50%")
- Page paiement: logo wordmark Navy, pas d'image stock criarde, mention "Convention art 30 requise"
- Pas de upsell, pas de timer "Offre limitée 5 min"
- Succès → Zapier crée Notion Mission + email "Provision reçue, planning 7 jours"

## Alternative conforme 100%

- Virement RIB + reçu provision manuel (`05_Document_Bank/templates/06_Recu_Provision_Facture.md`)
- Wafacash/MoPay pour clients sans RIB
- Délai: provision reçue = J0

## Décision tree

```
Veux-tu encaisser offshore/US?
 ├─ OUI → Stripe obligatoire → saisir Ordre avant
 └─ NON → Virement suffit → pas de risque déonto
```

## Tarif

Stripe: 1.4% + 2 DH Europe, 2.9% hors Europe. Répercuter ou absorber? Absorber si <3% et ticket >2000 DH (friction -).

---

## Approfondissement Encyclopédique (Bonus)


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