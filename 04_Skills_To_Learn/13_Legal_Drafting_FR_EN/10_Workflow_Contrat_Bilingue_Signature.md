# 10 — Workflow contrat bilingue & signature électronique

> **À quoi ça sert :** industrialiser la production et la signature d'un contrat bilingue FR/EN — de la clause de langue à l'archivage, plus trois scripts vidéo Loom en anglais pour onboarder un client offshore. **Pour qui :** l'avocat qui signe en ligne avec des clients à trois fuseaux horaires et veut une chaîne client-proof, juridiquement propre côté loi 53-05 comme côté 09-08. Temps de lecture : 15 minutes.

**Liens :** [Yousign & signature électronique (loi 53-05)](../01_Legal_Tech_Stack/04_Yousign_Signature_Conforme.md) · [Loom client](../01_Legal_Tech_Stack/05_Loom_Video_Client.md) · [Templates EN](09_Templates_EN_Pack_Freelance_NDA_CGV.md) · [Stripe & encaissement](../01_Legal_Tech_Stack/06_Stripe_Paiement_RIO.md)

## 1. POURQUOI : la langue qui oblige se décide avant la signature

Un contrat bilingue sans clause de langue est deux contrats qui se contredisent. La chaîne complète — rédaction miroir, clause « version française fait foi », signature électronique, archivage horodaté — transforme un document en preuve. Côté cabinet, le préalable est déontologique : avant toute mission, convention d'honoraires (loi 66-23 portant organisation de la profession, ex-art. 30 de la loi 28-08 ; numérotation 66-23 en transposition) et provision consignée d'avance (ex-art. 32, usage environ 50 %) ; le contrat rédigé pour le client est engagement de moyens, jamais promesse de résultat.

## 2. COMMENT : le workflow en 6 étapes

### Étape 1 — Assembler les deux versions depuis la clause library

Produire le FR et l'EN clause par clause (fichiers 02-06). La version FR porte la clause de langue ; la version EN est la copie de courtoisie du même texte — jamais une paraphrase.

> **FR :** Les Parties conviennent que la version française du présent contrat fait foi. La version anglaise n'est fournie qu'à titre de courtoisie et ne crée pas d'obligation supplémentaire.

> **EN :** The Parties agree that the French version of this Agreement shall prevail. The English version is provided for courtesy purposes only and creates no additional obligation.

Variante négociée avec un client US qui refuse le FR seul : « each language version prevails on its own terms for local filings; in case of conflict, the French version prevails » — à n'utiliser que si le dossier s'y prête.

### Étape 2 — Vérifier les conditions de fond avant la mise en signature

- Defined terms remplis, renvois internes cohérents (4 ↔ 22, 7 ↔ 8 ↔ 11, 10 ↔ 20)
- Pièce d'identité et dénomination exacte des parties (registre de commerce / good standing US)
- Compte bancaire d'encaissement : virement SWIFT vers un compte en dirhams ou un compte en devises ouvert au Maroc — Stripe ne fournit pas de compte marchand à un résident marocain ; une structure étrangère qui aurait son propre Stripe est une mission de structuration à part (voir [Stripe & paiement](../01_Legal_Tech_Stack/06_Stripe_Paiement_RIO.md))

### Étape 3 — Structurer le workflow de signature électronique

Deux fichiers dans un seul dossier de signature (FR déposé en premier, EN en secondaire), signataires nom + date, verrouillage après envoi. Base légale : **loi n° 53-05 relative à l'échange électronique de données juridiques** — le contrat électronique et la signature électronique valent écrit au sens juridique quand le procédé est fiable (rattachement au signataire, détection d'altération). Une QES eIDAS (Yousign, Docuseal) constitue une **preuve forte** dont la valeur au Maroc est **appréciée par le juge** : il n'existe aucune « reconnaissance automatique » de l'eIDAS par les tribunaux marocains — ne jamais l'écrire à un client.

Mentions utiles au pied du dossier de signature :

> « Signature électronique conforme à la loi n° 53-05. Les deux versions signées sont horodatées et conservées avec piste d'audit. »

### Étape 4 — Envoyer et suivre

Relances automatiques à J+2 et J+5 si non signé. À réception : archiver les deux versions signées dans le dossier client. Un préavis ou une mise en demeure se notifie ensuite par le canal « notifications » du contrat (cl. 24 : courriel avec accusé de réception).

### Étape 5 — Archiver conforme

- Nom de fichier : `AAAA-MMJJ_Client_Mission_FR_signed.pdf` + `..._EN_signed.pdf`
- Copie remise au client ; registre des traitements mis à jour (le dossier de signature contient des données personnelles — loi 09-08)
- Conservation alignée sur les délais de preuve : au-delà de 10 000 DH, l'écrit est la preuve (DOC art. 443) — l'archivage EST la constitution du dossier de preuve

### Étape 6 — Onboarding vidéo (scripts Loom EN verbatim)

**Script 1 — Intro 30 secondes (premier contact après signature) :**

> "Hi [Client], this is [Your Name], your attorney in Casablanca. We just signed the engagement letter — welcome aboard. This two-minute video gives you the three things you need to know about your file, and what happens next. Let's get into it."

**Script 2 — Walkthrough 2 minutes (état d'avancement) :**

> "Here's where your file stands. First, [status of task 1] — [date/result]. Second, [status of task 2] — one thing to flag: [issue + impact]. Third, [next step] — you'll receive [deliverable] by [date]. Any question, just reply to this email. One note: nothing in this video is legal advice on its own — our written opinion remains the reference."

**Script 3 — Closing 30 secondes (clôture de mission) :**

> "Great news — the deliverables are ready and attached. Please review, and if it all matches, we'll close the file. If anything needs adjusting, tell me within [X] days and I'll handle it at no extra cost. Thank you for trusting the firm. Talk soon."

Préalable absolu : anonymiser avant enregistrement (secret professionnel, ex-art. 36 de la loi 28-08 repris par la 66-23 ; loi 09-08 pour les données visibles à l'écran).

## 3. EXEMPLE : la signature J+1 de Salma

Salma signe sa MSA bilingue avec son partenaire UE : FR + EN préparés en 2 h depuis la bibliothèque, workflow Yousign configuré en 15 min, envoyé à 14 h. Signature des deux parties le lendemain 10 h. Le walkthrough EN (script 2) est enregistré en une prise de 2 min 20, noms et chiffres du dossier anonymisés. Valeur perçue : onboarding « international-ready » ; effet mesuré côté cabinet : renouvellement du retainer (fourchette 2 500-4 500 DH HT/mois) sécurisé sans relance commerciale.

## 4. Erreurs d'application (Top 5)

| # | Erreur | Conséquence |
|---|---|---|
| 1 | Oublier la clause « version française fait foi » | deux versions qui se contredisent, litige d'interprétation |
| 2 | Promettre au client « eIDAS automatiquement reconnu au Maroc » | affirmation fausse ; valeur probante = appréciation du juge |
| 3 | Enregistrer une vidéo sans anonymiser | manquement secret professionnel + 09-08 (sanctions art. 64-65) |
| 4 | Signer avant d'avoir rempli les defined terms | contrat vide de sens, nullités partielles |
| 5 | Vouloir encaisser via Stripe depuis le Maroc | impasse ; canal = SWIFT/compte en devises (fichier 06 du stack) |

## 5. Checklist express

- [ ] Convention d'honoraires + provision avant mission (loi 66-23, ex-art. 30/32)
- [ ] Clause de langue FR fait foi présente
- [ ] Yousign/Docuseal : FR déposé en premier, EN courtoisie, faisceau 53-05 complet
- [ ] Relances automatiques configurées (J+2/J+5)
- [ ] Anonymisation avant tout enregistrement Loom
- [ ] Archivage `AAAA-MMJJ_Client_Mission_FR/EN_signed`
- [ ] Registre des traitements mis à jour
- [ ] Canal d'encaissement SWIFT vérifié avec le client

## 6. QCM express

**Q1.** Quelle langue fait foi dans un contrat bilingue signé sans clause de langue ?
A. le français d'office · B. aucune réponse automatique : la question est livrée au juge · C. la dernière version signée

> **Réponse : B.** Sans clause expresse, le risque d'interprétation est entier — d'où l'étape 1 du workflow.

**Q2.** Un client demande « votre signature Yousign a-t-elle la même valeur qu'un papier ? » :
A. « oui, c'est reconnu automatiquement par eIDAS » · B. « c'est une preuve électronique solide au sens de la loi 53-05 si le faisceau (OTP, IP, horodatage, piste d'audit) est réuni ; le juge l'apprécie » · C. « non, il faut du papier »

> **Réponse : B.** C'est la réponse exacte de la fiche Yousign du stack ; la réponse A est une faute de conseil.

**Q3.** Avant d'enregistrer une vidéo de walkthrough d'un dossier client :
A. rien, c'est interne · B. anonymiser noms, chiffres, identifiants · C. demander un consentement écrit à chaque vidéo

> **Réponse : B.** L'anonymisation est le préalable ; pour une vidéo destinée au client concerné, son accord de principe pris dans la convention suffit généralement.

> **Lecture pro :** la signature électronique n'est pas un bouton, c'est une chaîne : fiabilité du procédé (53-05), faisceau de preuve conservé, clause de langue qui tranche d'avance, archivage qui retrouve tout. Un client offshore ne juge pas votre cabinet à la beauté du PDF — il le juge à la fluidité de cette chaîne, et facture cette fluidité.
