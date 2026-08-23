# 01 — Paysage Fintech Maroc : Cartographie des Acteurs

> Skills n°19 Sector Deep Dives — Fintech & Paiements (Maroc)

**Temps de lecture : ~11 min** · **Niveau : fondations** · **Prérequis : [00_INDEX_Fintech](00_INDEX_Fintech.md)**

**Liens croisés :** [Glossaire](../../../00_START_HERE/03_Glossaire_12_Concepts_Cles.md) · [Cadre juridique EDP](02_Cadre_Juridique_Etablissements_Paiement.md) · [Numbers Sheet](../../07_Sharp_Legal_Mind/03_Numbers_Sheet.md)

## Objectifs

- Nommer chaque acteur de la chaîne de paiement marocaine et son rôle exact.
- Savoir qui appeler pour quel problème : régulateur, infrastructure, banque acquéreur, agrégateur.
- Positionner votre client fintech sur cette carte pour en déduire ses obligations.

## Prérequis

- Lecture du fichier 00 du module.
- Vocabulaire : acquéreur, émetteur, PSP, agrégateur, interconnexion monétique.

## TL;DR

Au Maroc, **Bank Al-Maghrib** régule et agrée les établissements de paiement (Loi 103-12) ; la liste des agréés est publiée par BAM `[à vérifier bkam.ma]`. Le **CMI** est l'infrastructure d'interconnexion monétique et e-paiement : pas d'acceptation de cartes sans adhésion marchand. Les **banques** sont acquéreurs et tiennent les comptes professionnels. Les **PSP/agrégateurs** simplifient l'intégration pour les e-commerçants. Votre travail d'avocat : placer le client sur cette carte, puis dérouler ses obligations (licence, LBCFT, données).

## Base légale

| Règle | Base | Source + date vérif |
|-------|------|---------------------|
| BAM agrée et supervise les établissements de paiement ; liste publiée | Loi 103-12 | bkam.ma + sgg.gov.ma, vérifié 23/08/2026 |
| Adhésion marchand requise pour accepter les cartes | Conventions CMI/banques acquéreurs | cmi.co.ma, vérifié 23/08/2026 |
| Vigilance anti-blanchiment des acteurs financiers | Loi 43-05 modifiée (ANRF) | sgg.gov.ma + anrf.ma, 23/08/2026 |

## Contenu principal : la chaîne de valeur du paiement

```
[Acheteur]
   | carte / wallet / virement
[Banque émettrice du porteur]
   |
[CMI — Centre Monétique Interbancaire]   <- interconnexion monétique & e-paiement
   |
[Banque acquéreur du marchand]           <- contrat marchand + reversement
   |
[PSP / Agrégateur (facultatif)]          <- un seul contrat, plusieurs moyens
   |
[E-commerçant / Plateforme / Marketplace = votre client]
```

### Table des acteurs

| Acteur | Rôle | Quand vous l'appelez |
|--------|------|----------------------|
| Bank Al-Maghrib | Régulateur : agrément EDP, supervision, liste publique des agréés | Question de licence, statut d'un prestataire |
| CMI | Interconnexion monétique/e-paiement ; adhésion marchand obligatoire pour accepter cartes | Accepter Visa/Mastercard localement |
| Banque acquéreur | Signe l'adhésion marchand, reverse les fonds, tient le compte pro | Négocier commissions, plafonds, réserves |
| Banque émettrice | Banque du porteur de carte (côté acheteur) | Litiges/chargebacks côté consommateur |
| Agrégateurs/PSP internationaux | Intégration unique multi-moyens ; statut local à vérifier | « On veut un checkout moderne » |
| PSP agréés locaux | Services de paiement sous agrément BAM | Partenariat ou structuration du modèle |
| ANRF | Renseignement financier LBCFT | Déclaration de soupçon |
| CNDP | Données personnelles (Loi 09-08) | Registre, autorisation de transfert |
| Fintechs (wallets, BNPL…) | Innovent sur un segment, souvent adossées à un agréé | Structuration juridique |

### Trois questions de positionnement

1. **Mon client détient-il des fonds de tiers ?** Collecter puis reverser (marketplace) rapproche du régime EDP — fichiers 02 et 10.
2. **Qui détient l'adhésion marchand dans sa chaîne ?** Sans elle, aucune acceptation de cartes n'est possible.
3. **Ses prestataires sont-ils agréés ?** Vérifier chaque intermédiaire sur la liste BAM `[à vérifier bkam.ma]` : « PSP » sur un pitch deck ne signifie pas « agréé ».

## Cas pratique chiffré

Salma, e-commerce high volume (~3M MAD/an encaissés, cartes + COD), veut brancher un agrégateur international. Analyse en rendez-vous :

- L'agrégateur pressenti n'apparaît pas sur la liste des agréés BAM → risque de contournement de l'adhésion locale `[à vérifier bkam.ma]`.
- Montage sécurisé : conserver l'adhésion marchand via sa banque acquéreur (interconnexion CMI), le PSP comme simple interface technique, clause de sortie si le prestataire change de statut.
- Facturation : diagnostic express 600–1.200 HT ; refonte contractuelle complète → pack conformité 12.000–28.000 HT selon périmètre.

## Erreurs coûteuses — Top 5 (DH)

1. ❌ Intégrer un prestataire non retrouvé sur la liste BAM : flux bloqués en pleine saison `[à vérifier bkam.ma]` — coût = chiffre d'affaires perdu pendant l'interruption.
2. ⚠️ Confondre CMI et banque : l'adhésion marchand se conclut auprès d'une banque acquéreur ; viser le mauvais interlocuteur = semaines perdues.
3. ⚠️ Empiler plusieurs contrats d'acquisition sans clause de sortie : frais récurrents cumulés et plafonds incohérents entre canaux.
4. ❌ Choisir un partenaire de paiement sans diligence LBCFT : un acteur non vigilant vous expose (Loi 43-05 modifiée).
5. ⚠️ Sous-dimensionner la mission : vendre un diagnostic 600 HT sur un dossier marketplace qui exigeait un pack à 24.000 HT.

## Comparatif : agrégateur vs contrat direct

| Critère | Via agrégateur/PSP | Contrat direct (banque + CMI) |
|---------|--------------------|-------------------------------|
| Mise en place | Rapide (jours) | Plus longue (semaines) `[délais indicatifs]` |
| Contrats à gérer | 1 | Banque + adhésion marchand |
| Conditions tarifaires | Imposées (CGU prestataire) | Négociables avec volume (Salma) |
| Défense chargeback | Outils du prestataire | Directement avec l'acquéreur |
| Risque principal | Statut du prestataire `[vérifier liste BAM]` | Clauses réserve/plafonds |
| Profil adapté | Démarrage (Hicham) | Volume installé (Salma) |

## Checklist

- [ ] Placer le client précisément sur la carte des acteurs.
- [ ] Lister tous les intermédiaires de paiement de sa chaîne.
- [ ] Vérifier chacun sur la liste BAM `[à vérifier bkam.ma]`.
- [ ] Identifier qui détient l'adhésion marchand et chez quelle banque.
- [ ] Cartographier les flux : qui paie qui, quand, vers quel compte.

## QCM (3 questions)

**Q1.** Qui publie la liste officielle des établissements de paiement agréés ?
A. Le CMI · B. Bank Al-Maghrib · C. La CGEM
> **Réponse : B —** la Loi 103-12 confie l'agrément à Bank Al-Maghrib, qui publie la liste des agréés ; re-vérification systématique sur bkam.ma avant toute conclusion.

**Q2.** Pour accepter Visa/Mastercard au Maroc, un commerçant doit :
A. Obtenir une « licence CMI » · B. Avoir une adhésion marchand via une banque acquéreur (interconnexion CMI) · C. Rien, c'est automatique
> **Réponse : B —** le CMI est une infrastructure d'interconnexion ; l'acceptation passe par l'adhésion marchand conclue avec une banque acquéreur.

**Q3.** Un fondateur se présente comme « PSP » : votre premier réflexe ?
A. Signer le contrat · B. Contrôler sa présence sur la liste des agréés BAM · C. Exiger un logo officiel
> **Réponse : B —** seul le contrôle de la liste publique fait foi `[à vérifier bkam.ma]` ; une appellation commerciale ne vaut pas agrément.

## Fiches révision (3 cartes)

- **Carte 1 — Régulation :** BAM agrée (Loi 103-12), liste publique ; CNDP pour les données ; ANRF pour le renseignement financier.
- **Carte 2 — Infrastructure :** CMI = interconnexion monétique/e-paiement ; acceptation de cartes impossible sans adhésion marchand via banque acquéreur.
- **Carte 3 — Réflexe avocat :** positionnement client → obligations (licence ? LBCFT ? 09-08 ?) → mission chiffrée (600–28.000 HT).

## EN - Key takeaways

Morocco's payment landscape has four layers. First, Bank Al-Maghrib regulates and licenses payment institutions under Law 103-12 and publishes the list of licensed entities, which must be rechecked on bkam.ma before any advice. Second, CMI is the national card interconnection infrastructure: accepting Visa or Mastercard always requires a merchant agreement signed through an acquiring bank. Third, banks act as acquirers, settlement agents and providers of professional accounts. Fourth, aggregators and PSPs simplify integration but their licensing status must be verified against the official BAM list. The lawyer's method is positioning: identify where the client sits, who holds merchant acquiring rights, whether third-party funds are held, then derive licensing, AML and data obligations. This mapping directly feeds priced engagements from a 600–1,200 MAD diagnostic to full compliance packs.

## AR - ملخص ومصطلحات

| FR | AR |
|----|----|
| Bank Al-Maghrib | بنك المغرب |
| Centre Monétique Interbancaire (CMI) | المركز النقدي بين البنوك |
| Banque acquéreur | البنك المستحوذ |
| Établissement de paiement agréé | مؤسسة أداء معتمدة |
| Chaîne de valeur du paiement | سلسلة قيمة الأداء |
| Liste des agréés | لائحة المعتمدين |

**Darija :**
- Bla "adhésion marchand" m3a banka, ma imkench tqbel les cartes — CMI ghir l'interconnexion.
- Qbel tekhdem m3a chi PSP, choufo f lista dyal bkam.ma wach howa agréé wla la.

---
**Sources primaires :** bkam.ma (Bank Al-Maghrib) · cmi.co.ma · sgg.gov.ma (Loi 103-12, Loi 43-05, Loi 09-08) · cndp.ma · oc.gov.ma (IGOC 2024). Dernière vérification : 23/08/2026 — re-vérifier liste PSP agréés sur bkam.ma.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Secteur régulé : valider toujours avec l'autorité (BAM/CNDP) et un confrère spécialisé. QCM pédagogique — aucun certificat.
