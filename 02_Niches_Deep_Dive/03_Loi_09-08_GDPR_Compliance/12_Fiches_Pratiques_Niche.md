# 12 — Fiches Pratiques + Checklist (03_Loi_09-08_GDPR_Compliance)

## Checklist 15 points conformité data (mémoire externe de mission)

*   [ ] Cartographie 5 questions complétée — quelles données, chez qui, où, pourquoi, combien de temps ? (`02_Douleurs_Juridiques.md` §Lecture pro)
*   [ ] Régime correct identifié : déclaration vs AUTORISATION (données sensibles, art. 12-14) — vérifié traitement par traitement
*   [ ] Registre 5+ colonnes rempli et daté (traitement, finalité, base légale, catégories données/personnes, durée, destinataires, transfert) → `05_Document_Bank/templates/05_Registre_09-08_Modele.md`
*   [ ] Dossier de déclaration CNDP déposé (récépissé archivé) — barème et formulaires sur `cndp.ma`
*   [ ] Politique de confidentialité sur mesure FR (+ AR/EN si audience) — PAS un générateur en ligne ; mentions art. 9-10 + durée + droit d'opposition
*   [ ] Bannière cookies : refus aussi accessible que l'acceptation, aucune case pré-cochée (Planet49) + configuration GTM livrée au dev
*   [ ] Contrats sous-traitants signés avec clauses art. 24-25 / GDPR art. 28 (sécurité, breach 24-48h, réversibilité, pas de sous-traitance en cascade sans accord)
*   [ ] Transferts hors Maroc encadrés : clauses types CNDP + SCC 2021/914 si volet UE + mention dans la politique (art. 43-44 ; Schrems II)
*   [ ] Prospection : preuve de consentement par contact (case non pré-cochée + horodatage) ; « STOP » fonctionnel testé ; base achetée purgée ou gelée
*   [ ] Procédure droits des personnes écrite : qui reçoit (adresse dédiée), sous quel délai (15j Maroc / 1 mois UE), quel registre des demandes
*   [ ] Procédure breach : détection → qualification → notification 72h si UE (art. 33) + registre interne des incidents
*   [ ] DPA client UE : analysés clause par clause (audit rights, liability cap, durée, sous-traitance ultérieure), contre-proposition écrite, version signée archivée
*   [ ] Plan d'action 90 jours avec responsables nommés côté client (les chantiers techniques ne sont pas à l'avocat)
*   [ ] Abonnement : prochaine revue trimestrielle calendée + nouveaux traitements déclarés dans le cycle
*   [ ] Livraison design : registre + politiques en PDF, sources éditables Notion, Loom 20 min vu par le dirigeant (preuve d'appropriation en datas room)

## Scripts express (FR fait foi)

*   **DM entrant LinkedIn :** `Bonjour [Prénom], votre DPA bloque ? Le socle c'est registre + contrats sous-traitants + politique. Diagnostic 45 min, 900 HT, déduit si mission sous 14j — un créneau : [Calendly]. — [Nom], avocat barreau [Ville]`
*   **Relance J+7 après devis :** objet `Votre conformité 09-08 — devis du [date]` ; corps sobre, une phrase de réalité (le calendrier du client UE, lui, court), pas de pression.
*   **Réponse atelier (WhatsApp) :** les 3 lignes utiles (registre, opt-in prouvé, mentions durée) + lien diagnostic. Scripts complets : `06_Scripts_DM_WhatsApp.md`.
*   **EN léger (prescripteur UE) :** `Your Moroccan vendor needs 09-08 filings AND GDPR-grade docs (Art.30 register, transfer clauses). We deliver both — French text prevails for the mandate.`

## Modèles `05_Document_Bank`

*   `05_Registre_09-08_Modele.md` — registre 5 colonnes (le livrable signature)
*   `01_Convention_Honoraires_Modele.md` — périmètre missions 2-4, hors périmètre technique explicite
*   `06_Recu_Provision_Facture.md` — provision 50% art. 32, débours CNDP en sus
*   `07_Lettre_Mission_Planning.md` — atelier J+3, pré-registre J+7, livraison J+14

## Plan 7 premiers jours d'une mission type

*   **J1 :** convention Yousign + provision + questionnaire intake 30 questions (Tally).
*   **J3 :** atelier cartographie avec les métiers (RH, marketing, dev) — 2h, treatment par treatment.
*   **J5 :** pré-registre envoyé au client pour commentaires (48h) + liste des sous-traitants à contractualiser.
*   **J7 :** devis missions complémentaires (transferts, GDPR) remis avec le rapport de cartographie — décision éclairée, pas vente surprise.

## Notion du client (livré en fin de mission)

*   Base `Traitements` (vue registre exportable), base `Sous-traitants` (clause + expiry), base `Demandes droits` (entrée, délai, réponse), base `Incidents` (breach log), dashboard plan 90j avec owners.

---

**Fin du dossier `02_Niches_Deep_Dive/03_Loi_09-08_GDPR_Compliance/`.**

**Suite logique :** `02_Niches_Deep_Dive/04_Content_Creators_Infopreneurs/` — La niche 4.

---

## Fiche comme mémoire externe, pas comme script de vente

La checklist 15 points n'est pas à cocher devant le client. Elle est une mémoire externe (art. 59 devoir de conseil) pour ne rien oublier : régime sensible vs déclaratif, registre, opt-in prouvé, contrats sous-traitants, transferts art. 43-44 + SCC, breach 72h, DPA analysé, plan 90j. Chaque case renvoie à une fiche détaillée du dossier, pas à un chiffre jeté. Dans cette niche plus qu'une autre, l'oublié se découvre des mois après — au contrôle ou au DPA — et l'art. 59 protège aussi l'avocat : ce qui est coché, daté et livré ne se discute pas.

> Sources : `cndp.ma`, `sgg.gov.ma` (Loi 09-08, décret 2-10-450), `eur-lex.europa.eu` (GDPR, SCC), `curia.europa.eu` — vérifier annuellement, les pratiques de contrôle évoluent plus vite que les textes.
