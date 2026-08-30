# 01 — Legal Tech Stack : Dossier Maître

> **Dossier maître — Skills n°1.** Stack technique sobre, conforme loi 09-08/CNDP, déontologiquement défendable, coût <150 USD/mois. 12 fichiers actifs (1 a été fusionné dans le catalogue et archivé). S'appuie sur `01_Strategy/01_Rules_Of_The_Game_No_Ads_Morocco/04_Site_Web_Conforme_Specifications.md`.

## TL;DR

Stack minimale viable : Notion + Google Workspace + Cal.com/Calendly + Tally + Yousign + Loom + Canva + Plausible + Make/Zapier. ≈35-45 $/mois au bootstrap, ≈90-125 $/mois en phase scale. Pas de Stripe marchant au Maroc (voir fiche 06 les voies réelles d'encaissement). Pas d'outil avant besoin client : la règle d'achat, c'est 2 heures perdues en manuel.

## Table des fichiers : quand consulter

| # | Fichier | Quand le consulter |
|---|---------|--------------------|
| 00 | `00_INDEX.md` | Tu y es — vue d'ensemble + matrice |
| 01 | `01_Stack_Complete_Catalogue.md` | Choisir un outil, configurer, voir le workflow de mission complet |
| 02 | `02_Notion_Cabinet_OS_Detaille.md` | Configurer Notion (cœur du système) |
| 03 | `03_Google_Workspace_Calendly_Tally.md` | Email pro, deliverability, RDV, intake |
| 04 | `04_Yousign_Signature_Conforme.md` | Convention dématérialisée, loi 53-05, faisceau de preuves |
| 05 | `05_Loom_Video_Client.md` | 3 types de vidéos client |
| 06 | `06_Stripe_Paiement_RIO.md` | Payer et encaisser depuis le Maroc (Stripe indisponible : les voies réelles) |
| 07 | `07_Plausible_Analytics_CNDP.md` | Analytics conforme, pourquoi pas Google Analytics |
| 08 | `08_Workflow_Integration_Zapier_Make.md` | Automatiser intake → Notion → signature |
| 09 | `09_Securite_Backup_09-08.md` | Backup 3-2-1, chiffrement, registre, transferts CNDP |
| 10 | `10_Comparatif_Outils_Alternatives.md` | Comparer + alternatives souveraines/UE |
| 11 | `11_Arbre_Decision_Choix_Outil.md` | Quel outil ajouter ensuite selon ton CA |
| 12 | `12_Fiches_Pratiques_Checklists.md` | Checklists setup J1, hebdo, preuve électronique |

## Matrice coût / risque (août 2026)

| Outil | Coût/mois | Risque 09-08 | Risque déontologie | Verdict |
|---|---|---|---|---|
| Notion (US) | ≈10-12 $ | Moyen : données hors Maroc → pseudonymes + chiffrement des pièces | Nul si pas de dossiers sensibles bruts | Oui avec protocole 09 |
| Google Workspace (US) | ≈6 $ | Moyen : transfert → formalité CNDP pour un usage régulier de données clients | Nul | Oui email/RDV, prudence sur les pièces |
| Cal.com (UE/self-host) | Gratuit | Faible | Nul | Oui premier choix |
| Calendly (US) | ≈10 $ | Moyen | Nul | Oui si simple d'usage prime |
| Tally (US, DPA) | Gratuit-≈24 $ | Moyen → champs minimaux, lien politique | Nul | Oui intake |
| Yousign (FR) | ≈19-25 €/mois | Faible (UE) | Faible → valeur probante marocaine = faisceau, pas automatisation (loi 53-05) | Oui |
| Docuseal (FR, open source) | Gratuit self-host | Très faible | Idem Yousign | Oui alternative souveraine |
| Loom (US) | ≈12-15 $/user | Faible si vidéos non identifiantes | Nul | Oui avec script sobre |
| Plausible (UE) | ≈9-14 $ | Nul (0 cookie, IP hashée) | Nul | Oui |
| Google Analytics | Gratuit | Élevé : transfert US + collecteur IP/identifiants → autorisation CNDP quasi impossible à justifier | Friction bandeau | Non |
| Make (UE) / Zapier (US) | ≈9 $ / ≈20-30 $ | Make faible, Zapier moyen | Nul | Oui Make si données |
| Stripe (marocain) | — | — | — | Non indisponible : voir fiche 06 |

## Philosophie

> Un outil = 1 job, 1 workflow, 1 template. La stack évolue avec le CA (fiche 11). Deux lignes rouges : aucune donnée client identifiante hors Maroc sans protocole (fiche 09), aucune page de paiement promotionnelle visible d'un client marocain (fiche 06).

## Liens croisés

- Détail juridique 09-08/CNDP (sanctions, transferts, registre) : `02_Niches_Deep_Dive\03_Loi_09-08_GDPR_Compliance\`
- Cadre signature électronique loi 53-05 et preuves : `08_Jurisprudence\`
- Script diagnostic (l'outil ne remplace pas la méthode) : `03_Sales_Without_Selling\02_Script_Diagnostic_40min.md`

## Les 6 questions que cette stack doit savoir encaisser (audit express)

| Question d'un client ou d'un confrère | Réponse du dossier | Fiche |
|---|---|---|
| « Vos dossiers sont-ils sur des serveurs américains ? » | Triptyque : index pseudonymisés côté US, pièces sensibles chiffrées ou UE, registre à jour | 09 |
| « Une signature électronique, ça vaut quoi devant un juge à Casa ? » | Faisceau de preuves loi 53-05 ; présomption pleine via prestataire agréé ANRT ; jamais « automatique » | 04 |
| « Pourquoi pas Stripe, tout le monde l'a ? » | Indisponible comme marchand au Maroc ; virement/SWIFT/devises/structure = mission | 06 |
| « Vous utilisez Google Analytics ? » | Non : transfert hors Maroc sans autorisation + bandeau = double risque ; Plausible ou Matomo | 07 |
| « Votre site est conforme 09-08 ? » | Registre, mentions, durées, rights contact `contact@cabinet.ma` — documenté, pas promis | 09 |
| « C'est quoi votre différenciation ? » | Le Loom de clôture sur 100 % des missions + la réponse sous 24 h — la stack ne vend pas, elle tient la promesse | 03, 05 |

## Les 4 parcours de lecture selon ta situation

| Situation | Parcours | Durée |
|---|---|---|
| Ouverture / premier mois | 01 (catalogue) → 02 (Notion) → 03 (email+RDV) → 12 (checklist J1) | 1 semaine |
| Premier client marocain à signer | 04 (53-05 + faisceau) → 06 (provision virement) → 12 (fiche preuve) | 1 journée |
| Prospectif et mesure | 03 (Tally) → 07 (Plausible) → 08 (Make) → 12 (rituels) | 1 week-end |
| Audit de conformité de l'existant | 09 (registre + transferts) → 07 (analytics) → 10 (alternatives UE) | 1 soirée |

## Corrections apportées à ce dossier (août 2026) — mémoire des erreurs à ne pas reproduire

| Affirmation supprimée | Vérité écrite à la place |
|---|---|
| « QES eIDAS reconnue automatiquement par le tribunal marocain » | Loi 53-05 : fiabilité si rattachement + intégrité ; présomption via prestataire agréé ANRT ; force probante appréciée par le juge (fiche 04) |
| « Stripe 1,4 % + 2 DH, page de paiement tolérée » | Stripe ne fournit pas de compte marchand au Maroc ; voies réelles : RIB, SWIFT, devises, structure étrangère = mission (fiche 06) |
| « Google Analytics sanctionné par délibération 40-22 » | Référence inexistante ; le risque réel = transfert hors Maroc → autorisation CNDP (loi 09-08), sanctions art. 64-65 (fiche 07) |
| « art. 30 loi 28-08 » seul | Convention d'honoraires ex-art. 30 loi 28-08 ; loi 66-23 promulguée 18/08/2026 (dahir 1-26-75, BO 7536), numéros en transposition |
| « Diagnostic 600 DH » | 900 DH HT — standard du vault, aligné sur les packs 2 900 / 5 500 DH HT et retainer 2 500-4 500 |
| « DOC art. 419 » pour la preuve | DOC art. 443 — preuve écrite au-delà de 10 000 DH |

## Budget type du cabinet (ordre de grandeur, août 2026)

| Poste | Mensuel |
|---|---|
| Couche cœur (Notion + Workspace + RDV + intake) | ≈25-30 $ |
| Production (signature + vidéo + design + analytics) | ≈50-65 $ |
| Optimisation (automatisation + gestionnaire de mots de passe) | ≈15-35 $ |
| Total de référence | ≈90-130 $ — sous le plafond 150 $ du dossier |

Un diagnostic à 900 DH HT finance à peu près la moitié du mois de stack : la stack doit rester un centre de coût maîtrisé, pas une justification de production.

## Ce que ce dossier ne couvre pas (et où chercher)

- La rédaction des actes et clauses : `05_Document_Bank\` (templates) et `07_Sharp_Legal_Mind\` (méthode).
- L'argumentaire de vente des packs et le prix du diagnostic : `03_Sales_Without_Selling\` et `12_Finance_Cabinet_OS\`.
- Les obligations 09-08 détaillées (formalités, sanctions, transferts, e-commerce) : `02_Niches_Deep_Dive\03_Loi_09-08_GDPR_Compliance\`.
- L'usage de l'IA sur les données : `02_AI_For_Lawyers_Prompts\` (anonymisation et registre en commun avec la fiche 09).

> **Lecture pro :** ce dossier est celui qui touche le plus directement la conformité du cabinet — chaque fiche se termine par un garde-fou juridique ; si tu ne lis que les paragraphes « POURQUOI », tu auras déjà la colonne vertébrale : minimiser, pseudonymiser, vérifier, documenter.
