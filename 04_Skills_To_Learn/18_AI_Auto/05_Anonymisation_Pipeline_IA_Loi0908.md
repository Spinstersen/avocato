# 05 — Pipeline d'anonymisation avant IA (Loi 09-08)

> Un document client entre dans une IA = un transfert de données hors du Maroc, soumis à autorisation CNDP, doublé d'un risque secret professionnel art. 36 Loi 28-08. Sauf si le document est anonymisé AVANT l'envoi. Ce fichier décrit le pipeline qui rend cette règle exécutable en moins de 4 minutes par document.

**Temps de lecture : 9 min · Niveau : obligatoire · Piste : 04_Skills_To_Learn/18_AI_Auto**

**Liens :** Protocole détaillé côté prompts `../02_AI_For_Lawyers_Prompts/03_Anonymisation_Protocole.md` · Niche conformité `../../02_Niches_Deep_Dive/03_Loi_09-08_GDPR_Compliance/00_INDEX.md` · Modèle registre `../../05_Document_Bank/templates/05_Registre_09-08_Modele.md`

## Objectifs

- Exécuter le pipeline d'anonymisation en 6 étapes, reproductible, traçable.
- Distinguer sans hésitation ce qui peut sortir vers une IA, ce qui doit rester local, ce qui ne sort jamais.
- Documenter chaque envoi pour pouvoir répondre « qu'avez-vous envoyé, où, et sous quelle forme ? » à tout moment.

## Prérequis

- Connaissance des ancrages légaux : Loi 09-08 (transfert hors Maroc soumis à autorisation CNDP ; sanctions art. 52 — amende 300 000 à 500 000 DH et emprisonnement dès 6 mois) ; secret professionnel art. 36 Loi 28-08.
- Registre des traitements ouvert ; entrée « outils IA » prévue.
- Convention de pseudo-ID adoptée par le cabinet (ci-dessous).

## TL;DR

**Règle absolue : aucune donnée identifiante ne franchit la frontière vers une IA.** Le pipeline : (1) trier le besoin, (2) attribuer un pseudo-ID, (3) retirer les identifiants directs ET indirects, (4) garder localement les pièces sensibles, (5) utiliser un prompt à placeholders, (6) journaliser. Le protocole détaillé côté formulation vit dans `../02_AI_For_Lawyers_Prompts/03_Anonymisation_Protocole.md` ; ici on outille le processus.

## Contenu principal

### Le pipeline en 6 étapes

```text
ÉTAPE 1  TRIER      Quel est le besoin IA ? (synthèse, plan, reformulation)
                    Si le besoin exige l'identité → pas d'IA, travail local.
ÉTAPE 2  PSEUDO-ID  Attribuer/réutiliser : CLI-2026-014 (client), DOS-2026-008 (dossier).
                    Table de correspondance : Notion "Notes conformité" UNIQUEMENT.
ÉTAPE 3  NETTOYER   Retirer identifiants directs + indirects (tableau ci-dessous).
ÉTAPE 4  GARDER     Pièces sensibles restent locales : CIN, relevés, données santé,
                    contrats originaux signés. Jamais copiées hors cabinet.
ÉTAPE 5  PROMPT     Template avec {{FAITS}}, {{MATIERE}}, {{QUESTION}} — zéro nom propre.
ÉTAPE 6  JOURNAL    Ligne dans le log d'anonymisation : date, pseudo-ID, outil,
                    finalité, version du document nettoyé.
```

Durée constatée après entraînement : 3 à 4 minutes par document (estimation). Sans journal, vous ne pourrez jamais prouver ce qui a été envoyé ni sous quelle forme.

### Tableau de tri : identifiants à retirer

| Catégorie | Exemples | Traitement |
|---|---|---|
| Identité directe | Nom, prénom, « Maître X » | Remplacé par pseudo-ID CLI-AAAA-NNN |
| Coordonnées | Téléphone, email, adresse postale | Supprimés intégralement |
| Identifiants publics | RC, IF, CNSS, CIN, passeport | Supprimés ; « société X » suffit |
| Références procédurales | Numéro de rôle, juridiction + date exacte + parties | Généralisées : « tribunal de commerce, affaire de 2025 » |
| Lieux rares | Petit village, immeuble précis | Région ou ville seulement |
| Dates combinées rares | Date naissance + lieu + profession | Arrondies/généralisées sauf si l'analyse l'exige |
| Montants très spécifiques | Montant exact + contexte unique identifiable | Arrondi à la tranche quand le calcul le permet |

✅ Peut sortir vers l'IA après nettoyage : trame de faits générique, qualification juridique demandée, clauses types, montants arrondis, chronologie relative (J+30, mois M). ❌ Ne sort JAMAIS : pièce d'état civil, données santé, données relatives aux infractions au-delà de la description factuelle nécessaire, contrats originaux, correspondances nominatives. ⚠️ Zone grise (petites villes, professions rares, litiges médiatisés) : en cas de doute, rester local — la règle du doute est toujours locale.

### Pourquoi « anonymisé » et pas simplement « masqué »

Remplacer « Ahmed Benali » par « [NOM] » dans un texte qui raconte qu'un pharmacien de Chefchaouen a licencié son gérant en mars laisse ré-identifier possible par croisement. L'anonymisation opérationnelle exige que le document sortant soit **non ré-identifiable par combinaison** : pseudo-ID cohérent, lieux généralisés, détails uniques neutralisés. Test final avant envoi : « un lecteur externe pourrait-il retrouver la personne avec Google ? » Si oui, recommencer l'étape 3.

### Le prompt à placeholders (squelette)

```text
Rôle : juriste marocain spécialiste [MATIERE].
Contexte anonymisé : {{FAITS}} (client référencé CLI-{{ID}}).
Question : {{QUESTION}}.
Contraintes : citer uniquement les textes applicables au Maroc ;
ne pas inventer de référence ; signaler les incertitudes.
```

Le squelette complet et ses variantes vivent dans `../02_AI_For_Lawyers_Prompts/00_INDEX.md`. Notez la ligne « ne pas inventer » : elle prépare le contrôle hallucination du fichier 06.

### Journal d'anonymisation (format)

| Date | Pseudo-ID | Outil IA | Finalité | Doc source conservé ? | Opérateur |
|---|---|---|---|---|---|
| 2026-08-23 | CLI-2026-014 | [outil] | Synthèse faits pour plan de procédure | Oui, local | A.B. |

Ce journal est votre preuve de diligence. En cas de question CNDP, barreau ou client, il répond en 10 secondes : quoi, où, pourquoi, sous quelle forme. Il alimente aussi la revue mensuelle (Zap Z15) et l'entrée « outils IA » du registre.

## Cas pratique chiffré

Dossier prud'homal, 12 pages de pièces. Sans pipeline : l'avocat colle les 12 pages brutes dans une IA pour obtenir un plan → transfert non autorisé potentiel + secret professionnel exposé ; risque théorique jusqu'à 300 000–500 000 DH d'amende et emprisonnement dès 6 mois (art. 52), plus responsabilité disciplinaire. Avec pipeline : tri 1 min (besoin = plan de plaidoirie), pseudo-ID 20 s, nettoyage 2 min (7 noms, 2 adresses, 1 numéro RC, dates précises généralisées), prompt template 30 s, journal 30 s. Total ≈ 4 min 20 s (estimation). Résultat : synthèse exploitable immédiate, dossier intègre, preuve documentée. Sur 8 documents IA/mois, coût process ≈ 35 min/mois — le prix de la tranquillité le plus bas de toute la piste.

## Erreurs Top 5 (avec coût)

| # | Erreur | Coût |
|---|---|---|
| 1 | Envoyer le PDF brut « juste pour un résumé rapide » | Transfert non conforme + secret violé ; risque art. 52 : 300 000–500 000 DH + prison dès 6 mois |
| 2 | Masquer les noms mais garder lieu + profession + dates | Ré-identification par croisement ; violation effective malgré la bonne intention |
| 3 | Pas de table de pseudo-ID centralisée | Deux ID pour un même client, analyses incohérentes ; reprise ≈ 1 h |
| 4 | Pas de journal d'envoi | Impossibilité de prouver la diligence ; réponse improvisée sous pression |
| 5 | Coller la convention d'honoraires signée comme « exemple de clause » | Document contractuel nominatif sorti du cabinet — erreur type n° 1 constatée |

## Checklist 12 points

- [ ] Convention de pseudo-ID écrite et appliquée (CLI/DOS-AAAA-NNN)
- [ ] Table de correspondance stockée uniquement en interne (Notion Notes conformité)
- [ ] Tableau de tri imprimé près du poste de travail
- [ ] Prompt template à placeholders prêt dans la bibliothèque
- [ ] Test de ré-identification (« Google test ») passé sur le premier document réel
- [ ] Journal d'anonymisation créé et rempli dès le premier envoi
- [ ] Entrée « outils IA » ajoutée au registre 09-08
- [ ] Pièces sensibles listées et verrouillées en local
- [ ] Règle du doute = rester local, affichée
- [ ] Aucun Zap direct CRM → IA (contrôle fichier 01)
- [ ] Revue mensuelle du journal intégrée au Zap Z15
- [ ] Collaborateurs/formateurs formés au pipeline avant tout accès

## QCM

**Q1.** Un client vous confie un contrat. Vous voulez vérifier une clause avec une IA. Que faites-vous ?
- A. Vous téléversez le contrat tel quel, c'est standard
- B. Vous extraitez la clause, remplacez les identifiants par des pseudo-ID, généralisez les détails uniques, puis envoyez
- C. Vous demandez l'autorisation écrite du client et envoyez
- D. Vous attendez l'autorisation CNDP et envoyez le contrat brut

> **Réponse : B —** le pipeline rend l'envoi praticable au quotidien : extraction ciblée, pseudo-ID, neutralisation des combinaisons ré-identifiantes. L'accord du client (C) ne lève ni le régime du transfert hors Maroc ni pleinement le secret professionnel ; l'attente CNDP (D) est irréaliste au quotidien et n'autorise pas le brut.

**Q2.** Quel est le rôle du journal d'anonymisation ?
- A. Décoratif, pour faire sérieux
- B. Prouver en tout temps ce qui a été envoyé, où, sous quelle forme — preuve de diligence
- C. Facturer le temps IA au client
- D. Remplacer le registre 09-08

> **Réponse : B —** le journal transforme une pratique en système défendable : date, pseudo-ID, outil, finalité. Il complète le registre (D), il ne le remplace pas.

**Q3.** « Pharmacie de Chefchaouen, gérant licencié en mars » — pourquoi c'est insuffisant ?
- A. La phrase est trop courte pour une IA
- B. La combinaison lieu rare + fait unique permet une ré-identification par croisement
- C. Mars n'est pas un mois juridique
- D. Il faut toujours citer le numéro RC

> **Réponse : B —** l'anonymisation opère sur les COMBINAISONS, pas seulement sur les noms. Lieu rare + fait singulier ≈ personne retrouvable. On généralise : « commerce de détail, région du Nord ».

## Fiches révision

**Carte 1 — Les 6 étapes.** Recto : citez le pipeline. Verso : Trier → Pseudo-ID → Nettoyer → Garder local → Prompt placeholders → Journaliser.

**Carte 2 — Sortie / non-sortie.** Recto : que peut-on envoyer après nettoyage ? Verso ✅ : faits génériques, montants arrondis, clauses types. Verso ❌ : CIN, santé, contrats originaux, correspondances nominatives.

**Carte 3 — Les deux fondations légales.** Recto : quelles bases rendent l'anonymisation obligatoire ? Verso : transfert hors Maroc soumis à autorisation CNDP (Loi 09-08 ; sanctions art. 52) + secret professionnel art. 36 Loi 28-08.

## EN - Key takeaways

Sending identified client data to an AI tool is a cross-border transfer requiring CNDP authorization under Loi 09-08, and it exposes the professional secrecy duty of article 36 of Loi 28-08 — sanctions reach 300,000–500,000 DH plus at least six months imprisonment. The six-step pipeline makes compliance practical: define the need, assign a pseudo-ID (CLI-2026-014), strip direct and combination identifiers (RC numbers, rare places, precise dates), keep sensitive documents strictly local, use a placeholder prompt, and log every dispatch in the anonymization journal. Anonymization means non-re-identifiability by combination, not just hiding names: run the Google test before sending. Four minutes per document buys a defensible system: the journal answers who sent what, where, and in which form, feeds the monthly review, and completes your processing register. When in doubt, stay local — always.

## AR - ملخص ومصطلحات

| FR | AR |
|---|---|
| Anonymisation | إخفاء الهوية |
| Ré-identification croisée | إعادة التعريف بالتقاطع |
| Pseudo-identifiant | مُعرِّف مستعار |
| Transfert hors Maroc | نقل المعطيات خارج المغرب |
| Autorisation CNDP | ترخيص اللجنة الوطنية لمراقبة حماية المعطيات |
| Journal d'anonymisation | سجل إخفاء الهوية |

- Darija : "Ma-tsiftch l-document kamel l IA — ghir les-faits b pseudo-ID, w dir Google test qbel."
- Darija : "Ila chk f chi ma'louma, khelliha locale — l-chek dima kayrja3 l local."

---
**Sources primaires :** cndp.ma (Loi 09-08, délib. 40-22) · sgg.gov.ma · CNIL.fr (référence RGPD comparative). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Aucune donnée client dans une IA sans anonymisation préalable (secret art.36). QCM pédagogique — aucun certificat.
