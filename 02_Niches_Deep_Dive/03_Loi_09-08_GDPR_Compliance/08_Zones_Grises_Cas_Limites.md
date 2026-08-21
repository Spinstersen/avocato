# 08 — Zones Grises & Cas Limites (03_Loi_09-08_GDPR_Compliance)

> Niche-specifique Loi 09-08 / GDPR Compliance — complement de `00_START_HERE/03_Glossaire_12_Concepts_Cles.md`. Le gris ici est procedural : 45j de mise en demeure masquent la sanction.

## 5 Zones grises VRAIMENT pertinentes — Loi 09-08

| Zone | Gris (tolere) | Rouge (sanction) | Procedure sortie | Base legale | Renvoi glossaire §X |
|---|---|---|---|---|---|
| 1. Transfert AWS US sans CTT | Hebergement OVH Casa tolere sans CTT | AWS US / Google Cloud / Shopify sans clauses types CNDP art.43-44 → 10k-300k | CTT CNDP signees + info clients + autorisation si sensibles | Loi 09-08 art.43-44, delib 40-22 | §6 Loi 09-08 |
| 2. Registre 5 colonnes incomplet | Registre Excel 3 col. tolere <45j apres creation | Registre sans finalite/base/duree/destinataires art.14 → MED 45j puis sanction | Registre 5 col. art.14 : traitement/finalite/base/duree/destinataires + MAJ trimestrielle | Loi 09-08 art.14/23 | §6 Loi 09-08 |
| 3. Banniere cookies pre-cochee | Bandeau "en continuant vous acceptez" tolere si pas plainte | Case pre-cochee + depot avant consentement = non-conformite delib 40-22 | CMP consentement prealable non pre-coche, log 3 ans, retrait 1 clic | Loi 09-08 art.23, delib CNDP 40-22 | §6 Loi 09-08 |
| 4. Sous-traitant sans contrat art.24 | Mailchimp sans contrat tolere <30j | Sous-traitant sans art.24 (securite) → responsable = vous, 10k-300k | Contrat art.24 : finalite, securite, interdiction sous-traitance sans accord, audit | Loi 09-08 art.24/52 | §6 + §11 DOC |
| 5. Prospection WhatsApp sans opt-in | 5 messages manuels toleres, spam non signale | Prospection WhatsApp/SMS sans consentement prealable art.23 = plainte + amende | Double opt-in horodate + preuve + STOP 1 clic, duree 3 ans post-contact | Loi 09-08 art.23, Loi 31-08 art.27 | §6 Loi 09-08 |

## Cas limite detaille — chiffre niche 03

### Faits
- SaaS RH Casa, 12 000 contacts (CV + mails), heberge AWS us-east-1 sans CTT.
- Registre art.14 avec 2 colonnes ("donnees / usage"), banniere pre-cochee "tout accepter".
- Sous-traitant Mailchimp sans contrat art.24, campagne WhatsApp 4 000 messages sans opt-in (base scrapee LinkedIn).

### Qualification
- Transfert US sans art.43-44 → illicite des 1er octet, meme chiffre (CNDP 2023-045 sanction 45j).
- Registre incomplet art.14 → MED CNDP 45j, passe delai amende 10k-300k art.52 + 6 mois prison possible.
- Banniere pre-cochee → consentement invalide delib 40-22.
- Sous-traitant sans art.24 → vous responsable fuite Mailchimp.
- Prospection sans opt-in → art.23 viole, plainte + injonction cesser.

### Solution
- Migration AWS eu-west-3 Paris ou CTT CNDP signees + politique transfert + info clients.
- Registre 5 col. complet + declaration cndp.ma recepisse 30j.
- CMP refonte consent prealable non pre-coche, log 3 ans.
- Contrat art.24 Mailchimp + registre sous-traitant.
- Purge base non opt-in + campagne double opt-in.

### Cout
- Diag 900 HT → Pack 09-08 complet 6 900 HT (registre+declaration+CTT+contrats art.24+CMP).
- Amende evitee 10k-300k x5 manquements = cumul. Delai purge : registre 48h, declaration 30j, CTT 7j.

## Methode qualification en 3 temps (09-08)

1. **Qualification** : collectez-vous 1 donnee perso ? (mail/tel/IP) → Oui → art.14 registre obligatoire. Transfert hors Maroc ? → art.43-44.
2. **Risque chiffre** : 45j tolerance ≠ conformite ; J46 amende 10k-300k + injonction + perte contrat B2B (due diligence).
3. **Parade purgeante** : registre 5 col. avant collecte, CTT avant hebergement US, CMP avant pixel, contrat art.24 avant envoi, opt-in avant prospection.

## Interactions (chaine 09-08)

- `Collecte 1 mail` → `§6 Registre 5 col. art.14` → `§6 Transfert art.43-44 AWS` → `§6 Sous-traitant art.24` ↔ `§4 TVA facturation`.
- `§10 Convention honoraires` (clause 09-08 obligatoire) → `§5 OMPIC` si logo avec visage = donnee. Sans registre, CTT meme signees restent inopposables.
- Ordre diag : registre → declaration 30j → transfert → sous-traitant → banniere → prospection.

## Checklist 5 zones grises

- [ ] Registre 5 col. art.14 complet + MAJ trimestrielle ?
- [ ] Transfert hors Maroc CTT art.43-44 signees ou hebergement MA ?
- [ ] Banniere consent prealable non pre-cochee + log 3 ans ?
- [ ] Contrat sous-traitant art.24 signe avant envoi ?
- [ ] Opt-in horodate + STOP pour WhatsApp/SMS ?

---

## Pourquoi la zone grise est opportunite pedagogique

Le gris 09-08 nait de l'ecart entre pratique (Excel 3 col., AWS US par defaut) et texte (5 col., CTT). Tolere 45j apres MED CNDP 2023-045, mais sanctionne au-dela. L'avocat chiffre les deux branches et propose la convention qui couvre la branche prudente, renvoi `11_Arbre_Decision_Avant_Action.md`.

> Sources : Loi 09-08 art.12/14/23/24/43-44/52, delib CNDP 40-22, cndp.ma guide registre, Glossaire `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §6. Verif cndp.ma + sgg.gov.ma.
