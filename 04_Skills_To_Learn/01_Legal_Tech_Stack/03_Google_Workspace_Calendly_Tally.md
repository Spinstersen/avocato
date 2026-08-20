# 03 — Google Workspace + Calendly/Cal.com + Tally

## Google Workspace Setup (30 min)

1. Acheter domaine `cabinet.ma` (Namecheap/OVH) → MX vers Google.
2. Créer `prenom@cabinet.ma` + alias `contact@`.
3. Config SPF/DKIM/DMARC (critique deliverability). Vérifier sur mail-tester.com >8/10.
4. Signature sobre (voir `01_Strategy/01_Rules/12_Fiches_Pratiques.md:185`): nom, barreau, adresse, tél, site — pas de slogan.
5. Drive: arborescence `00_CLIENTS/ [Client]/ [Mission]/` + `01_TEMPLATES/` + `02_COMPTA/`.

## Calendly / Cal.com (recommandé Cal.com pour UE)

### 3 Types d'événements

| Type | Durée | Quand | Paiement | Buffer |
|---|---|---|---|---|
| Diagnostic 45 | 45m | Lun-Jeu 10-12 /14-17 | 600 DH HT via Stripe (si RIO ok) sinon gratuit | 15m avant/après |
| Suivi mission 30 | 30m | Mar/Jeu 14-16 | Inclus | 15m |
| Atelier 60 | 60m | Mer 18h 1x/mois | Gratuit | — |

### Config

- Lieu: Google Meet (lien auto)
- Questions intake: Statut? CA? Problème principal? (sync Tally)
- Confirmation email sobre: "Merci, vous recevrez le lien Meet. Préparez 3 questions."
- Rappel 24h + 1h.

## Tally (intake 12 questions)

```
1. Prénom/Nom
2. Email/tél
3. Activité (dev/ecom/créateur/MRE)
4. Statut juridique (AE/SARL/aucun)
5. CA mensuel/annuel
6. Problème principal (texte libre)
7. Depuis quand?
8. Avez-vous déjà un comptable/avocat?
9. Budget envisagé (range)
10. Comment nous avez-vous trouvé? (LinkedIn/bouche/partenaire)
11. Disponibilités (texte)
12. RGPD consent (checkbox 09-08)
```

- Logique: si CA >400k AE → tag "urgent SARL"
- Après submit → page merci: "Vous recevrez un email sous 24h + lien Calendly"
- Zapier: Tally → Notion PROSPECTS + email notif Slack/Email.

## Workflow RGPD

- Tally hébergé UE? Tally est US mais DPA signé. Alternative Fillout EU si barreau strict.
- Mention 09-08 sous form + lien politique confidentialité.
- Registre 09-08 à jour (voir `09_Securite_Backup_09-08.md`).

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