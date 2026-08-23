# 03 — Données de Paiement : Loi 09-08 et Transferts hors Maroc

> Skills n°19 Sector Deep Dives — Fintech & Paiements (Maroc)

**Temps de lecture : ~12 min** · **Niveau : cœur de spécialité** · **Prérequis : notions 09-08**

**Liens croisés :** [Niche Loi 09-08 GDPR](../../../02_Niches_Deep_Dive/03_Loi_09-08_GDPR_Compliance/00_INDEX.md) · [Pipeline anonymisation IA](../../18_AI_Auto/05_Anonymisation_Pipeline_IA_Loi0908.md) · [Glossaire](../../../00_START_HERE/03_Glossaire_12_Concepts_Cles.md)

## Objectifs

- Qualifier les données de paiement comme données personnelles (Loi 09-08).
- Maîtriser les formalités CNDP : déclaration/registre et autorisation de transfert hors Maroc.
- Chiffrer le risque art. 52 pour convaincre un fondateur en cinq minutes.

## Prérequis

- Bases de la [niche Loi 09-08](../../../02_Niches_Deep_Dive/03_Loi_09-08_GDPR_Compliance/00_INDEX.md).
- Architecture sommaire d'une plateforme e-commerce (site + outils SaaS).

## TL;DR

Toute donnée identifiant un payeur (nom, email, référence de carte, historique) est une **donnée personnelle** soumise à la **Loi 09-08** : déclaration préalable et registre des traitements auprès de la CNDP, information des personnes, et surtout **autorisation CNDP pour tout transfert hors Maroc**. Sanctions art. 52 : **amende 300.000–500.000 DH + emprisonnement jusqu'à 6 mois**. Piège n°1 du secteur : les outils cloud étrangers (CRM, analytics, support, IA) qui exportent les données clients sans autorisation.

## Base légale

| Règle | Base | Source + date vérif |
|-------|------|---------------------|
| Données de paiement = données personnelles | Loi 09-08 | cndp.ma + sgg.gov.ma, vérifié 23/08/2026 |
| Déclaration préalable / registre des traitements | Loi 09-08 | cndp.ma, 23/08/2026 |
| Transfert vers l'étranger = autorisation CNDP | Loi 09-08 | cndp.ma, 23/08/2026 |
| Sanctions art. 52 : amende 300.000–500.000 DH + 6 mois prison | Loi 09-08 art. 52 | sgg.gov.ma, 23/08/2026 |

## Contenu principal

### Formalités par type de traitement

| Traitement plateforme paiement | Formalité CNDP | Document produit |
|--------------------------------|----------------|------------------|
| Compte client (identité + moyen de paiement) | Déclaration préalable avant mise en service | Récépissé + fiche de traitement |
| Historique transactions (service client) | Déclaration, finalité distincte | Registre interne à jour |
| Marketing sur base achats | Déclaration marketing + consentement | Preuve d'opt-in |
| Cloud hébergé hors Maroc (CRM/analytics) | **Autorisation de transfert** | Autorisation + clauses contractuelles |
| Support client via SaaS étranger | Autorisation de transfert si accès depuis l'étranger | Contrat de sous-traitance |
| IA entraînée sur données clients | Analyse spécifique ; anonymisation recommandée | Pipeline d'anonymisation documenté |

Modalités pratiques des demandes `[à vérifier cndp.ma]` — les formulaires et délais évoluent.

### Le piège cloud/SaaS

Schéma type constaté chez Hicham (plateforme d'abonnements) : site hébergé au Maroc mais CRM, emailing, support et analytics chez des fournisseurs étrangers, synchronisés automatiquement avec emails, montants et références de transactions. Résultat : transferts répétés hors Maroc sans autorisation = exposition pénale directe art. 52.

Réponse d'avocat en trois temps :

1. **Cartographier** chaque flux sortant : outil, donnée, destination.
2. **Deux leviers cumulables** : autorisation de transfert pour les outils indispensables `[modalités cndp.ma]`, et réduction/agrégation des données envoyées aux autres.
3. **Contractualiser** (sous-traitance, confidentialité, localisation) et tenir le registre.

### Minimisation et anonymisation

Pour l'analytics ou l'IA : identifiants pseudonymisés, aucune coordonnée bancaire complète côté plateforme (gérées par le PSP agréé), agrégats plutôt que lignes brutes. Voir le [pipeline d'anonymisation](../../18_AI_Auto/05_Anonymisation_Pipeline_IA_Loi0908.md).

## Cas pratique chiffré

Hicham, SaaS d'abonnements, 4.200 abonnés actifs, facturation mensuelle via PSP partenaire :

- Inventaire : 6 outils synchronisent vers l'étranger (CRM US, emailing EU, analytics US, support EU, backup billing, test IA).
- Plan 8 semaines : registre complet, purge des champs inutiles (S1–S3), autorisations de transfert déposées pour CRM/support (S3–S6), clauses fournisseurs signées (S6–S7), formation équipe (S8).
- Facturation : diagnostic data 600–1.200 HT inclus dans le pack conformité 12.000–28.000 HT selon périmètre ; retainer 2.500–3.500 HT/mois pour tenue du registre.
- Argument massue client : « un seul contrôle CNDP sur ton CRM US = jusqu'à 500.000 DH + 6 mois ».

## Erreurs coûteuses — Top 5 (DH)

1. ❌ Brancher un CRM cloud étranger sans autorisation de transfert : amende 300.000–500.000 DH + prison (art. 52).
2. ⚠️ Un seul registre « fourre-tout » sans finalités distinctes : irrégularité de tous les traitements en cas de contrôle.
3. ❌ Stocker localement des données complètes de cartes alors que le PSP doit les porter `[responsabilité selon contrat PSP]`.
4. ⚠️ Envoyer la base clients complète à un outil d'IA sans anonymisation préalable : transfert non autorisé + fuite potentielle.
5. ❌ Oublier les sous-traitants locaux (agence web) : responsabilité du responsable de traitement reste engagée.

## Checklist conformité data paiement

- [ ] Cartographie des traitements et des flux sortants datée.
- [ ] Déclarations CNDP déposées ; récépissés archivés.
- [ ] Autorisations de transfert obtenues pour chaque outil hors Maroc.
- [ ] Clauses de sous-traitance signées avec chaque fournisseur.
- [ ] Registre tenu à jour (revu trimestriellement via retainer).

## QCM (3 questions)

**Q1.** Les données de paiement de vos clients sont :
A. Hors champ juridique · B. Des données personnelles soumises à la Loi 09-08 · C. Propriété du PSP
> **Réponse : B —** dès qu'une donnée identifie ou rend identifiable le payeur, elle relève de la Loi 09-08 : déclaration, registre, information des personnes.

**Q2.** Pour utiliser un CRM hébergé aux États-Unis contenant vos clients :
A. Rien à faire · B. Obtenir une autorisation CNDP de transfert hors Maroc · C. Prévenir la banque
> **Réponse : B —** tout transfert hors Maroc requiert une autorisation de la CNDP `[modalités à vérifier cndp.ma]` ; sinon exposition directe art. 52.

**Q3.** Sanctions encourues pour transfert illégal de données (art. 52 Loi 09-08) ?
A. Amende 300.000–500.000 DH + emprisonnement jusqu'à 6 mois · B. Amende de 1.000 DH · C. Aucune
> **Réponse : A —** c'est le chiffre à retenir pour faire signer un pack de conformité en un rendez-vous.

## Fiches révision (3 cartes)

- **Carte 1 — Qualification :** donnée paiement identifiable = donnée personnelle → Loi 09-08, formalités CNDP obligatoires.
- **Carte 2 — Transfert :** cloud/SaaS étranger = transfert → autorisation CNDP ; alternative = minimisation/anonymisation documentée.
- **Carte 3 — Chiffre choc :** art. 52 = 300.000–500.000 DH + 6 mois ; argument de closing n°1 du module.

## EN - Key takeaways

Payment data identifying a payer qualifies as personal data under Moroccan Law 09-08, triggering prior declaration to the CNDP, an up-to-date processing register, proper information notices, and — critically — CNDP authorization for any transfer outside Morocco. The sector's most expensive trap is the invisible cloud stack: foreign CRMs, emailing tools, support desks, analytics and AI experiments silently exporting customer records. Article 52 sanctions are severe: fines of 300,000 to 500,000 dirhams plus up to six months' imprisonment. The lawyer's workflow is threefold: map every outgoing flow, combine transfer authorizations for indispensable tools with minimization or documented anonymization for the rest, then contractually bind each processor. Delivered inside a compliance pack (12,000–28,000 MAD HT), this audit converts abstract privacy law into a concrete, sellable engagement with a quarterly retainer for register maintenance.

## AR - ملخص ومصطلحات

| FR | AR |
|----|----|
| Loi 09-08 | القانون 09.08 |
| CNDP | اللجنة الوطنية لمراقبة حماية المعطيات |
| Données personnelles | المعطيات ذات الطابع الشخصي |
| Autorisation de transfert | رخصة النقل إلى الخارج |
| Registre des traitements | سجل عمليات المعالجة |
| Anonymisation | إخفاء الهوية |

**Darija :**
- Ma tsiftch data dyal kliantek l CRM khareji bla autorisation men CNDP — rsk 500 alf drhm o 6 chhor.
- Dir dima registre dyal les traitements o khebbi li makhassekch, sedd li zayd.

---
**Sources primaires :** bkam.ma (Bank Al-Maghrib) · cmi.co.ma · sgg.gov.ma (Loi 103-12, Loi 43-05, Loi 09-08) · cndp.ma · oc.gov.ma (IGOC 2024). Dernière vérification : 23/08/2026 — re-vérifier liste PSP agréés sur bkam.ma.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Secteur régulé : valider toujours avec l'autorité (BAM/CNDP) et un confrère spécialisé. QCM pédagogique — aucun certificat.
