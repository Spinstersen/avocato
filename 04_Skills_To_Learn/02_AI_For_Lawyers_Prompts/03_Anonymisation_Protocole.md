# 03 — Protocole d'Anonymisation Avant Envoi IA

> **L'anonymisation n'est pas un réflexe, c'est un protocole.** Un LLM grand public (Claude, ChatGPT, Gemini) reçoit, traite et parfois conserve ce qu'on lui confie ; y envoyer « Yassine, AE à Casablanca, 600 kDH, litige Stripe » revient à exposer le dossier d'un client à un sous-traitant hors Maroc. Cette fiche donne les 5 règles concrètes, la table de substitution, le contrôle final et les cas où il ne faut pas anonymiser mais s'abstenir.

## POURQUOI avant tout envoi

Trois raisons se cumulent : (1) le **secret professionnel** de l'avocat (ex-art. 21-23 de la loi 28-08 ; **la loi 66-23 promulguée le 18/08/2026, dahir 1-26-75, BO 7536, transpose et renumérote ces dispositions — nouveaux numéros en cours de transposition, à flaguer dans tes notes**) couvre tout ce qui est venu au cabinet à raison de la profession ; (2) la loi 09-08 : un envoi à un service cloud = **transfert de données personnelles hors Maroc** (formalité CNDP) dès lors que la personne est identifiable ; (3) la pratique : même anonymisé, un dossier très spécifique reste ré-identifiable par recoupement — le protocole inclut donc un test de recoupement.

## COMMENT — la table de substitution

| Élément réel | Substitution | Exemple |
|---|---|---|
| Nom / raison sociale | Lettre code | « Yassine B. » → « [CLIENT A] » ; « Studio X SARL » → « [SOCÉTIÉ A] » |
| Prénom du contact | Initiale ou fonction | « Samira » → « la directrice juridique » |
| Montant exact | **Fourchette** | « 487 300 DH » → « entre 400 et 500 kDH » |
| Ville / juridiction | Générique | « barreau de Casablanca » → « un barreau » ; « TC Casa » → « une juridiction commerciale » |
| Dates précises | Mois ou trimestres | « 12/03/2026 » → « début T1 2026 » |
| Identifiants (ICE, RC, CNSS, CIN) | Supprimés | jamais de substitut — supprimer |
| Nom du client du client | Lettre code | « client à San Francisco » → « un client [PAYS] » |
| Contrat/plateforme cités | Terme générique | « leur contrat Stripe » → « le prestataire de paiement » |
| Donnée d'audience (dates d'audience, nom de juge, salle) | **Suppression totale** | ne jamais envoyer, même codée |
| Pièce jointe (CIN, RIB, passeport) | Ne pas joindre | 99 % des prompts n'en ont pas besoin |

## COMMENT — les 6 étapes (2 min, une fois par dossier)

1. **Copier** le texte source dans une note locale « A DONNER A L'IA » (jamais l'original).
2. **Substituer** avec la table ci-dessus — remplace systématiquement, même ce qui « ne se voit pas » (le nom du quartier du siège, le secteur rare, la devise inhabituelle).
3. **Supprimer** toute pièce d'identité, tout identifiant registral, toute référence à une audience ou un magistrat.
4. **Contrôle par recherche** : Ctrl+F (ou script ci-dessous) sur la liste noire → **0 résultat**.
5. **Test de recoupement** : « et si un confrère lisait ce texte, devinerait-il le client ? » — niche ultra-spécifique (seul importateur marocain d'un produit rare) = le genericiser davantage ou **ne pas envoyer**.
6. **Journaliser** : une ligne dans le registre : date, outil, nature des données (anonymisées), finalité.

**Script de contrôle (PowerShell, avant envoi) :**
```powershell
$texte = Get-Content "draft_a_envoyer.txt" -Raw
$noire = @("Yassine","Fatima","Casablanca","Rabat","Marrakech","ICE","RC ","CNSS"," CIN")
$hits = $noire | Where-Object { $texte -match [regex]::Escape($_) }
if ($hits) { "STOP — résidus : $($hits -join ', ')" } else { "OK — aucun résidu connu" }
```
(Adapte la liste noire aux noms des clients du mois — c'est un filet de sécurité, pas le remplacement de l'étape 2.)

## Exemple avant/après (persona Yassine)

**AVANT :** « Yassine Benali, auto-entrepreneur à Casablanca, CA 600 000 DH, client SaaS PayFlow Inc. à Denver, litige de 12 000 € sur compte gelé par Stripe, audience prévue le 8 avril. »

**APRÈS :** « [CLIENT A], auto-entrepreneur dans un barreau, CA entre 500 et 700 kDH, prestataire unique [SOCIÉTÉ B] dans un pays d'Amérique du Nord, litige d'environ 10-15 k€ avec un prestataire de paiement, procédure en cours (sans date ni juridiction). »

Le prompt reste aussi efficace — l'IA n'a pas besoin des noms pour analyser une structure de litige ; **toi** tu as besoin de ne jamais avoir exposé les noms.

## Les 4 niveaux de sensibilité (et l'outil autorisé)

| Niveau | Exemple | Envoi cloud grand public ? |
|---|---|---|
| 1 — Public | texte de loi, article déjà publié | Oui |
| 2 — Interne non client | template, brouillon d'atelier | Oui |
| 3 — Client, anonymisable | structure d'un contrat type, problème juridique générique | Oui **après protocole complet** |
| 4 — Sensible ou non anonymisable | contentieux en cours, données d'audience, recoupement évident, dossier pénal, M&A | **Non.** Local (Ollama + modèle open source) ou abstinence |

**Le test du niveau 4 :** si l'anonymisation demanderait de retirer l'information qui rend l'analyse utile, il ne faut pas envoyer. Un LLM local (fiche 07) garde alors sa place : même qualité moyenne, zero fuite.

## Ce que le consentement client ne règle pas

Un client qui dit « vas-y, utilise ChatGPT » ne purifie rien : le secret professionnel est d'ordre public (et la formalité 09-08 ne se sous-traite pas à un oui). Refuse poliment, anonymise, ou passe en local. L'accord écrit du client protège ta relation, pas ton dossier disciplinaire.

## Table de codes pseudo-anonymes réutilisable (à tenir à jour)

Un dossier local **hors cloud**, chiffré, une ligne par client :

```
CL-012 = [CLIENT A] (Studio ... SARL, Casa)   secteur : dev offshore
CL-017 = [CLIENT B]                           secteur : e-commerce, mode
CL-023 = [CLIENT C]                           secteur : agri-export
```

La correspondance est stockée comme les pièces sensibles : coffre local (fiche 09 du dossier Legal Tech Stack). Avantage : tes prompts parlent en codes, et toi seul rebranches le code sur la réalité — sans jamais écrire le nom réel dans un outil cloud.

## Anonymiser un PDF ou un email (les angles morts)

- **Métadonnées du PDF** : auteur, société, chemin d'enregistrement — passer par « imprimer en PDF » ou un outil de nettoyage, jamais le fichier original.
- **En-tête de l'email copié** : les lignes « De : », « Cc : », message-id et adresses en signature sont les premières fuites — ne coller que le corps, après relecture visuelle.
- **Captures d'écran** : nom de l'onglet, photo de profil du compte, horodatage du téléphone — la capture anonymisée est un montage, pas un copier-coller.
- **Pieds de page de contrat** : « rédigé par Me X » + coordonnées : à retirer, sinon tu exposes aussi ta propre méthode de travail.
- **Le fichier nommé** : `Convention_Yassine_Benali_signee.pdf` envoyé tel quel = l'anonymisation du contenu est annulée par le nom du fichier. Renommer `conv_A_signee.pdf`.

## Protocole à deux (collaborateur qui prépare le prompt)

1. Le collaborateur anonymise (étapes 1-5) et **ne voit pas le client** pendant ce travail — il n'a aucune raison de le connaître.
2. Un second contrôle à l'œil par quelqu'un qui n'a pas fait la substitution (les angles morts du premier sont invisibles pour lui).
3. La table de codes reste sur toi ou au coffre partagé chiffré — pas dans le fil de discussion interne.
4. Le prompt + la sortie sont journalisés (fiche 05) avec le code, pas le nom.

## Erreurs classiques

1. Anonymiser la sortie plutôt que l'entrée (« je retirerai les noms après ») — l'entrée a déjà fuité.
2. Oublier que **le prompt compte autant que le document** : « le gérant de [SOC A], M. Alaoui, associé de [SOC B] » a recréé l'identité.
3. Coller le PDF avec ses métadonnées (auteur, société) au lieu du texte nettoyé.
4. Croire l'option « ne pas entraîner mes données » suffisante : elle encadre l'entraînement, pas la confidentialité de la session ni le secret professionnel.
5. Ne pas journaliser — le registre est ta preuve de méthode (fiche 05).

> **Lecture pro :** minute ce protocole une fois sur un vrai dossier : tu verras qu'il prend 90 secondes. Puis souviens-toi de la règle des niveaux — plus rien ne sort en cloud au-delà du niveau 3, jamais « pour cette fois seulement ».
