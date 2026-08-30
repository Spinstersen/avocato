# 08 — Note de recherche interne : modèle complet, daté et sourcé

> **À quoi ça sert :** un modèle INTÉGRALEMENT rédigé d'une note de recherche interne — celle qui reste au dossier, pas celle qui part chez le client. Le modèle montre les trois disciplines du vault : sourcer chaque brique, dater chaque vérification, écrire le bloc « ce que je n'ai pas pu vérifier ». Temps de lecture : 9 minutes.

## 1. POURQUOI : la note interne est l'assurance de la note client

Une consultation envoyée sans note interne, c'est une décision sans motifs : six mois plus tard, personne — y compris vous — ne sait d'où vient le chiffre, si la source était à jour, ni ce qui restait douteux. L'audit du vault (`PROGRESS_AUDIT_NICHES.md`) a précisément été une cure de notes de recherche rétroactives : reprendre chaque citation et écrire sa source ou l'effacer. La note interne est ce qui rend une position **défendable** (devant l'Ordre, devant un contrôle, devant soi-même) et **transmissible** (stagiaire, confrère, liquidation de mission).

## 2. COMMENT : la structure en sept blocs

```
1. En-tête : référence dossier, date, auteur, objet en une phrase, urgence.
2. Question posée : reformulée en question fermée décidable par du droit.
3. Faits utiles : ce qui est établi (pièces), ce qui est déclaré (à vérifier).
4. Sources analysées : table — source / référence exacte / URL / date de
   consultation / ce qu'elle apporte.
5. Analyse : la chaîne de raisonnement, une brique par paragraphe, chaque
   brique adossée à une ligne de la table 4.
6. Réponse / conclusion : ce qui est acquis + ce qui NE L'EST PAS.
7. Bloc « ce que je n'ai pas pu vérifier » + prochains pas (qui, quoi, quand).
```

## 3. MODÈLE RÉDIGÉ (exemple fictif mais conforme aux standards du vault)

---

**NOTE DE RECHERCHE INTERNE — dossier CH-2026-041 — 30 août 2026**
**Rédacteur :** Me [cabinet] — **Objet :** retenue à la source sur dividendes versés par une SARL marocaine à son associé personne physique résidente fiscale en France — mission Karim B. (SARL-AU de détention, honoraires 5 500 DH HT + débours). **Statut :** confidentielle — ne pas transmettre en l'état.

### 1. Question

Une SARL marocaine distribuant 100 000 DH de dividendes à son gérant associé résident fiscal français : à quel taux interne la RAS doit-elle être opérée, et la convention fiscale la plafonne-t-elle ?

### 2. Faits

Établis (pièces au dossier) : SARL constituée sous loi 5-96 (la « loi 20-19 » citée un temps dans nos documents = référence erronée, retirée par l'audit du 28/08) ; exercice clos au 31/12/2025 ; AG du 15/06/2026 mettant les dividendes en distribution ; justificatif de résidence fiscale française : certificat d'imposition 2025 délivré par l'administration française (à obtenir — pièce manquante à ce jour).

### 3. Sources analysées

| # | Source | Référence exacte | Où / quand consulté | Apport |
|---|---|---|---|---|
| S1 | CGI (taux RAS produits des placements à revenu variable) | Art. du CGI applicable aux distributions de 2026 — **numéro relevé au consolidé, non recopié de mémoire** | tax.gov.ma, 30/08/2026 | Taux interne **11,25 %** (2026 ; **10 %** à compter de 2027 — LF 2026) |
| S2 | Convention fiscale France-Maroc | Convention du **29/05/1970**, avenant du **18/08/1989** ; art. 2 (résidence), art. 13 (dividendes), art. 25 (élimination) | Liste DGI + texte publié — **ouverture au Journal de l'Enregistrement : en attente** | Plafond RAS à la source **15 %** ; crédit d'impôt FR forfaitaire **25 %** |
| S3 | Loi 66-23 (prof. d'avocat) | Promulguée par dahir 1-26-75 du 18/08/2026, **BO 7536** | sgg.gov.ma, 30/08/2026 | Remplace la loi 28-08 ; convention d'honoraires = ex-art. 30 (28-08), **renumérotation en transposition [flag]** |
| S4 | IGOC édition 2026 | En vigueur au 01/01/2026 ; transfert des revenus par l'associé non-résident | oc.gov.ma, 30/08/2026 | Formalités de transfert du net distribué au résident étranger — dossier banque |

### 4. Analyse

Brique 1 — la RAS interne de 11,25 % (S1) s'applique à la **date de mise en distribution** (AG du 15/06/2026 → régime 2026), conformément à la mécanique rappelée dans le cas Karim de la niche 08 du vault.
Brique 2 — la convention de 1970 (S2) plafonne cette retenue à **15 %** : l'interne (11,25 %) restant inférieur, **le taux interne s'applique sans réduction conventionnelle** ; l'intérêt de la convention se déplace côté français : crédit d'impôt de 25 % imputable sur l'IR français de Karim, dans les conditions de l'art. 25.
Brique 3 — la preuve de la qualité de résident (certificat d'imposition) conditionne l'application de la convention ; sans elle, seule la voie interne documente la retenue [flag : exigence formelle à confirmer au texte de la convention et à la doctrine DGI].
Brique 4 — transfert des fonds vers la France : dossier de transfert bancaire sur la base de l'IGOC 2026 (S4) ; les durées de traitement bancaire sont une pratique, non un texte — cf. `09_Zones_Grises_Sources.md`.
Brique 5 — honoraires de la mission : convention signée sous le régime 66-23 entrée en vigueur (S3) ; notre template cite « loi 66-23 » sans numéro d'article tant que la transposition n'est pas consolidée.

### 5. Réponse

1. RAS applicable : **11,25 %** sur 100 000 DH, soit 11 250 DH, pour une distribution mise en paiement en 2026 ; à compter de 2027 : 10 %.
2. La convention FR ne baisse pas ce taux (plafond 15 %) mais ouvre un crédit d'impôt français — à chiffrer par le conseil fiscal français de Karim (la présente note ne couvre PAS l'IR français).
3. Pièce clé à obtenir avant paiement : certificat d'imposition français 2026.

### 6. Ce que je n'ai pas pu vérifier

- Le texte intégral de l'art. 13 et de l'art. 25 de la convention (consultation au Journal de l'Enregistrement programmée — je n'ai à ce jour QUE la liste DGI et les relevés de l'audit du 29/08 : **ne pas chiffrer un autre taux pour un autre pays sur cette base**).
- La doctrine DGI conditionnant le crédit de l'art. 25 au-delà de l'imputation (formalisme de réclamation côté FR non traité).
- Les nouveaux numéros d'articles de la loi 66-23 (consolidation SGG non parue à la date de cette note).
- La pratique de la banque de Karim sur le dossier de transfert (délais : source du jour à appeler).

### 7. Prochains pas

| Quoi | Qui | Quand |
|---|---|---|
| Obtenir certificat d'imposition FR 2026 | Karim | avant la 1ʳᵉ quittance de dividende |
| Ouvrir les art. 13/25 au texte (JET/BO) | Cabinet | séance mensuelle de septembre (07/) |
| Note client finale (1 page, chiffres + réserve du § 6) | Cabinet | J+7 après ouverture des textes |

**Rappel de méthode :** chaque ligne du § 5 est traçable à une ligne du § 3 ; chaque incertitude est écrite, pas tue. Cette note précède la note client — elle ne la remplace pas.

---

## 4. Règles de fabrique observées sur ce modèle

1. **Un chiffre = une ligne de table de sources.** Le 11,25 % n'existe pas sans S1 datée du 30/08/2026.
2. **Le § 6 n'est jamais vide.** Si tout semble vérifié, la note n'est pas finie —
   c'est une propriété de la discipline, pas une paranoïa (retour d'expérience de l'audit :
   100 % des anciennes « certitudes » non tracées cachaient soit une source secondaire, soit une invention).
3. **La frontière de mission s'écrit** (« ne couvre pas l'IR français ») :
   c'est ce qui protège le cabinet quand le client rebondit chez un confrère
   (cf. `16_Client_Ops_Experience/05_Livrable_Qualite` — la note de risques côté client).
4. **Prix et délais ne s'invitent pas dans le raisonnement juridique**, mais le bloc 1 les rappelle :
   la note s'inscrit dans une convention (ex-art. 30 28-08 → 66-23 [flag]).
5. **La note interne n'est pas la note client** : elle se transfère en cas de reprise de dossier,
   elle ne se publie pas, elle ne se « résume » pas non plus — le client ne reçoit que la conclusion
   filtrée par le verdict citable du protocole 3V (`[[04_Protocole_3V_Avant_Citation]]` § 3).

## 5. Les cinq dérives qui vident la note de son usage (auto-diagnostic)

| Dérive | Symptôme | Remède |
|---|---|---|
| La note-essay | trois pages de doctrine, aucune table de sources | imposer la table § 3 du modèle avant d'écrire un paragraphe |
| La note-à-peu-près | « IS : autour de 20 % » | un chiffre = une ligne sourcée, sinon le bloc § 6 l'enregistre |
| La note-tunnel | tout vérifié SAUF la question du client | reformuler la question en une ligne fermée (§ 1 du modèle) |
| La note-sans-flag | le bloc « non vérifié » est vide | règle : vide = incomplète ; rendre la note avec au moins une réserve |
| La note orpheline | personne ne sait où elle est | nommage `NR-[dossier]-[date].md` + pièce jointe à la ligne Notion de la mission |

> **Lecture pro :** la note interne est le seul document du cabinet qui n'intéresse personne — jusqu'au jour où tout le monde la demande : le client qui doute, le confrère qui reprend le dossier, le juge qui vérifie votre citation. Une note de recherche honnête se reconnaît à son avant-dernier paragraphe : celui qui dit ce qu'elle n'a pas pu savoir.
