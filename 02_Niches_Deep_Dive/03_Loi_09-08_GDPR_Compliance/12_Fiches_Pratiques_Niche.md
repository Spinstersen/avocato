# 12 — Fiches Pratiques + Checklist (03_Loi_09-08_GDPR_Compliance)

> **Niche :** PME/startup SaaS/e-commerce qui collecte emails, cookies, héberge sur AWS US. Dès 1 donnée = registre obligatoire. Amende 10k-300k art.52.

## Checklist 12 points — Mise en conformité Loi 09-08 / CNDP

*   [ ] Registre traitement 5 colonnes art.14 Loi 09-08 — lister chaque traitement : nom/finalité/base légale/durée 3 ans/destinataires, 1 ligne = 1 traitement (prospection, RH, vidéosurveillance), mise à jour à chaque nouveau pixel → voir Glossaire §06
*   [ ] Déclaration vs Autorisation art.12 CNDP — déclaration en ligne cndp.ma 30j récépissé pour prospection/RH/clients, autorisation lourde pour données sensibles (santé, biométrie, géolocalisation) réponse 45j → voir Glossaire §06
*   [ ] Base légale consentement (art.4 Loi 09-08) — case NON pré-cochée + preuve log horodatée + retrait aussi simple que consentement, sinon base = contrat/intérêt légitime documentée → voir Glossaire §06
*   [ ] Bannière cookies & traceurs délib. CNDP 40-22 — bandeau avec Accepter/Refuser/Paramétrer, blocage dépôt avant clic, durée cookies 13 mois max, registre preuve consentement → voir Glossaire §06
*   [ ] Transfert hors Maroc art.43-44 Loi 09-08 (AWS US / Shopify / GCP) — hébergement hors Maroc = transfert → clauses contractuelles types CNDP + info préalable personnes + autorisation CNDP si pays non adéquat → voir Glossaire §06
*   [ ] Contrat sous-traitant art.24 Loi 09-08 (hébergeur, agence, Mailchimp) — contrat écrit : instructions documentées + sécurité + confidentialité + sous-traitant n'engage pas de sous-sous-traitant sans accord, audit annuel → voir Glossaire §06
*   [ ] DPO / Correspondant (désignation CNDP) — désigner DPO interne/externe, notifier CNDP, missions : registre + DPIA + formation + point contact réclamations 30j → voir Glossaire §06
*   [ ] DPIA — Analyse d'impact art.20 Loi 09-08 — obligatoire si traitement à risque (profilage, données sensibles, surveillance) : décrire + nécessité + risques + mesures, valider avant lancement → voir Glossaire §06
*   [ ] Durées conservation & purge — 3 ans après dernier contact prospection, 10 ans factures CGI art.144, RH 5 ans après départ, purge automatique + preuve suppression → voir Glossaire §06 + §04
*   [ ] Droits des personnes art.7-11 Loi 09-08 — procédure interne : accès/rectification/opposition/effacement réponse 30j, formulaire type + vérif identité CIN, registre des demandes → voir Glossaire §06
*   [ ] Politique confidentialité & mentions 09-08 — site/app : identité responsable + finalités + bases + durées + droits + transfert art.43 + contact DPO, MAJ à chaque nouveau traitement → voir Glossaire §06
*   [ ] Sanctions & provision art.30 Loi 28-08 — amende 10k-300k art.52 + 6 mois prison, mise en demeure CNDP 45j, convention honoraires provision 50% avant audit, co-traitance RSSI → voir Glossaire §10 + §06

> **Légende :** Chaque case = Concept (base légale) — procédure 1 ligne + chiffre 2025 + renvoi Glossaire. Ne cochez pas sans avoir lu le §.

## Scripts (FR fait foi)

*   **DM conformité :** `Bonjour [Prénom], vu ton site collecte emails/tél : dès 1 contact tu dois registre 09-08 5 colonnes + déclaration CNDP 30j + bannière non pré-cochée, sinon amende 10k-300k art.52. Je fais audit flash 1 200 HT (registre+transfert AWS art.43+bannière) + pack conformité 5 900 HT 7j (registre+politique+contrat art.24+DPIA si besoin). Checklist 1p ? — [Nom], avocat [Ville]`
*   **Objection "on a 5 contacts" :** `La loi s'applique dès 1 donnée (art.14) — contrôle CNDP 2023-045 : 50 cmd/j sans registre = mise en demeure 45j. On régularise en 7j après provision 50% art.30.`
*   **Objection "on est hébergé au Maroc" :** `Même hébergé Maroc, Mailchimp/AWS backup US = transfert art.43 → CTT + info. On cartographie en diag 45 min.`

## Modèles `05_Document_Bank` à joindre

*   `templates/12_Politique_Confidentialite_09-08_Modele.md` — politique + registre 5 colonnes + durées 3 ans + droits 30j + transfert art.43
*   `templates/13_Contrat_Sous_Traitant_09-08_art24.md` — clauses art.24 + CTT transfert + sécurité + audit
*   `templates/14_DPIA_Modele_CNDP.md` — DPIA art.20 : description/risques/mesures + avis DPO
*   `templates/01_Convention_Honoraires_Modele.md` — provision 50% + planning 7j + co-traitance RSSI
*   `templates/07_Lettre_Mission_Planning.md` — planning 7j, dépendance inventaire traitements

## Plan 7j — Conformité 09-08

*   **J1 :** Audit 1 200 HT — cartographie traitements + registre 5 colonnes + test transfert AWS/Shopify art.43
*   **J2 :** Provision 50% + désignation DPO + collecte contrats sous-traitants → convention Yousign 48h
*   **J3-J4 :** Rédaction registre + politique confidentialité + bannière + contrat art.24
*   **J5 :** Dépôt déclaration CNDP en ligne (récépissé 30j) + DPIA si profilage/données sensibles
*   **J6 :** Relecture client + déploiement bannière + test preuve consentement loguée
*   **J7 :** Pack 5 900 HT livré (7 500 si DPIA+transfert) → J30 récépissé CNDP + formation équipe 45 min
*   **J45 :** Suivi mise en demeure évitée, MAJ registre à chaque nouveau traitement/pixel

## Erreurs qui coûtent cher — Loi 09-08

*   Bannière pré-cochée "Accepter" → consentement invalide → amende 45k CNDP
*   Héberger sur Shopify US sans CTT art.43 → transfert illicite → mise en demeure 45j
*   Pas de contrat art.24 avec agence → responsable + sous-traitant co-sanctionnés

## Chiffres 2025 à vérifier à chaque diag (CNDP + PLF)

*   Registre 5 colonnes art.14 dès 1 donnée, déclaration CNDP 30j, autorisation 45j
*   Consentement non pré-coché + log, bannière Accepter/Refuser 13 mois max
*   Transfert art.43-44 = CTT CNDP + info, sous-traitant art.24 écrit + audit
*   DPO 30j point contact, DPIA art.20 avant profilage, durées 3 ans /10 ans factures
*   Droits réponse 30j, sanction 10k-300k + 6 mois prison, mise en demeure 45j

---

## Fiche comme mémoire externe, pas comme script de vente

Cette fiche n'est pas un argumentaire "RGPD Maroc". C'est une mémoire pour ne rien oublier en audit 09-08 : registre 5 colonnes dès 1 email (art.14), déclaration 30j vs autorisation 45j, consentement non pré-coché logué, bannière Accepter/Refuser, transfert AWS = art.43-44 + CTT, contrat art.24 écrit obligatoire, DPO point contact 30j, DPIA avant profilage, durées 3 ans prospection / 10 ans factures, droits réponse 30j, sanction 10k-300k + prison. Ne commencez jamais par la bannière avant le registre — l'ordre est traitement → base légale → registre → bannière → transfert → CNDP. Le registre est le pivot, pas la bannière.

> Sources : `sgg.gov.ma` Loi 09-08 art.7/12/14/20/24/43/52, `cndp.ma` guide registre + délib.40-22, `oc.gov.ma` si transfert financier — vérifier annuellement. Glossaire : `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §06 (central) + §04 §10 §11.
> Contexte niche 03 : SaaS/e-commerce avec données Maroc + cloud US = cumul registre + transfert + DPIA. Sans registre, bannière = décor.

**Fin Fiches 03_Loi_09-08_GDPR_Compliance — profondeur max.**
