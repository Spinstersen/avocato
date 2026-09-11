# 05 — Livrable et qualité : le workflow de livraison en quatre pièces

> **À quoi ça sert :** un livrable que le client ne comprend pas est une mission à moitié vendue — et une facture solde à moitié payée. Ce fichier pose le workflow complet : **note de risques + livrables + restitution (Loom / visio Zoom / cabinet) + mode d'emploi**, la checklist qualité avant envoi, et la discipline de versioning qui rend la « dernière version » évidente. Temps de lecture : 9 minutes.

## 1. POURQUOI : on ne livre pas un document, on livre un usage

Le pack freelance (2 900 DH HT) contient un contrat de prestation et des CGV ; le pack e-commerce (5 900 DH HT) ajoute la cartographie des traitements et le registre 09-08. Mais ce que le client utilise réellement, c'est ce qu'il a compris : un PDF sans mode d'emploi retourne dans un dossier et le client revient dans trois mois « pour la mise à jour » — revente déguisée en cadeau, ou pire : le client applique mal, subit, et le cabinet porte la faute. La pièce maîtresse du workflow n'est donc pas le document : c'est **le paquet de quatre** — chaque pièce tuant un malentendu précis.

## 2. COMMENT : le paquet de quatre, pièce par pièce

### Pièce 1 — Les livrables proprement dits

- Format **Word + PDF** : le Word pour vivre (le client doit pouvoir remplir les crochets prévus, pas réécrire), le PDF pour signer/archiver.
- Mention sur chaque page utile : référence mission (CH-2026-XXX), version, date.
- Crochets assumés : un modèle avec `[à compléter : raison sociale]` est HONNÊTE ; un modèle qui a l'air fini mais que le cabinet n'a pas personnalisé est un piège — distinguer « livré prêt à signer » et « livré prêt à personnaliser », et l'écrire dans le nom même du fichier (cf. § 4).

### Pièce 2 — La note de risques (1 page, jamais 10)

Une page, quatre sections, ton dépouillé — c'est la signature « sharp » du cabinet (méthode : `07_Sharp_Legal_Mind/02_Cas_Grades`) :

```
NOTE DE RISQUES — [client] — [mission] — [date]
1. Ce qui est réglé par les livrables livrés  : [3-6 puces, concret]
2. Ce qui reste à votre main                 : [les décisions que seul le client prend —
   ex. : taux de pénalité de retard à fixer dans les CGV ; modération admise en
   pratique sur clause pénale — base DOC art. 263-264, jamais de numéro d'arrêt]
3. Les trois risques qui survivent           : [triés par probabilité × gravité —
   ex. : requalification du lien avec votre premier prestataire]
4. Ce que ce paquet ne couvre PAS            : [frontière de mission — cf. 15/08 § 4]
```

La section 4 est la plus rentable du document : elle transforme un trou perçu en frontière vendue (et prépare l'avenant ou le retainer sans aucune pression).

### Pièce 3 — La restitution : Loom de 3 min, visio Zoom ou cabinet (cf. `01_Legal_Tech_Stack/05_Loom_Video_Client`)

> **Choisir le canal selon le client :** Loom si le client est autonome et le sujet simple ;
> visio Zoom si des questions sont attendues (les réponses sortent de la session) ;
> cabinet si la remise doit rassurer (dossier sensible, valeur élevée, dirigeant inquiet).
> Le contenu ci-dessous est identique dans les trois cas — seul le porteur change.

Structure en 4 temps, jamais improvisée :

1. **30 s** : « voilà ce que vous avez reçu » (écran du dossier Drive, les fichiers se succèdent — le client voit le paquet).
2. **90 s** : « voilà comment on s'en sert » — ouvrir LE fichier critique, montrer les trois zones à remplir/personnaliser.
3. **30 s** : « voilà les deux choses à ne pas faire » (ex. ne pas toucher à l'article limitation de responsabilité ; ne pas publier les CGV sans remplacer les coordonnées ICE).
4. **30 s** : « voilà ce qui se passe ensuite » — vos questions avant vendredi, point de clôture, solde à réception.

Règle technique : un seul enregistrement, pas de montage ; la qualité qui rassure est la fluidité de la préparation, pas le polish. Trois minutes = 200 mots environ — ce qui ne rentre pas dans 200 mots appartient à la note de risques.

### Pièce 4 — Le mode d'emploi du document (README d'une page)

Un fichier `LISEZ-MOI.txt` ou une première page dans le PDF maître : qui fait quoi du livrable (le gérant signe, la comptable archive, le développeur intègre les CGV au checkout), où est la version qui fait foi, et la date du prochain rendez-vous de mise à jour. Le mode d'emploi est ce qui rend la livraison **autosuffisante** — donc ce qui autorise la clôture sereine (`06_Clôture_Offboarding.md`).

## 3. La checklist qualité avant envoi (relier `04_Design_Canva_For_Legal/10_Checklist_Qualite`)

```
QUALITE-LIVRAISON — dossier [réf] — date [du jour]
[ ] 3V appliqué à CHAQUE référence légale citée (protocole 15/04 — aucune
    exception « je le sais par cœur » : c'est le chemin exact des trois fictions 2026)
[ ] Mentions à jour : ICE 15 chiffres, dénomination exacte (conforme extrait RC),
    adresses, version applicable (CGI art. 145 pour les factures des livrables facturés)
[ ] Zéro référence interdite (liste 15/04 § 4) — recherche texte : « loi 20-19 »,
    « 19-06 », « CGI 144 », « 300k », « 14 jours », « art. 618 », « Cass. com »
[ ] Coherence prix : ce qui est facturé = ce qui est livré = ce qui est écrit (12/01)
[ ] Design sobre conforme DESIGN.md (04/) — un livrable moche est lu deux fois moins
[ ] Versioning aux noms (fichier 04) + LISEZ-MOI dans le dossier
[ ] Note de risques jointe (jamais livrée sans elle — même bonne nouvelle)
[ ] Si canal Loom : lien testé en navigation privée depuis un autre compte (le lien n'est PAS
    « accessible à moi seulement ») ; si canal Zoom/cabinet : créneau confirmé par écrit (date + heure)
[ ] Envoi à DEUX destinés client si société (gérant + contact opérationnel)
[ ] Relecture française : tutoiement/vouvoiement constant, dates au format français
    (06_French_Communication/02)
```

## 4. L'email d'envoi du paquet de quatre (modèle entier)

> Objet — Vos livrables + 3 minutes de vidéo — dossier terminé (CH-2026-047)
> Bonjour Fatima,
> Votre mission est livrée dans le dossier Drive [lien] — quatre pièces, un mode d'emploi :
> 1. Les livrables finaux (CGV, charte de données, registre 09-08) — fichiers Word pour vivre,
>    PDF pour signer ; la version qui fait foi porte la mention « FINAL-signer ».
> 2. La note de risques d'une page : ce que le paquet règle, ce qui reste à votre main,
>    les trois risques qui survivent, et ce que la mission ne couvre pas.
> 3. La vidéo de 3 minutes : où cliquer, quoi remplir, les deux erreurs à ne pas commettre.
>    [lien Loom ou date de la session Zoom / au cabinet]
> 4. Le LISEZ-MOI : qui fait quoi dans votre équipe de ces documents, et la date du prochain point utile.
> Le solde de 2 950 DH HT est facturé (FH-2026-XXX, joints) — payable à la réception,
> comme prévu à la convention. Je vous propose un point de 15 minutes vendredi ou lundi
> pour vos premières questions d'usage.

## 5. Versioning : la guerre de la « dernière version »

Convention de nommage — elle décide toute la logistique :

```
CGV_Fatima_v3_2026-09-08_FINAL-signer.pdf
   │      │      │        │        └─ usage UNIQUEMENT du fichier portant cette
   │      │      │        └─ date de fabrication (jamais « final v2 (2).final »)
   │      │      └─ itération de travail
   │      └─ client
   └─ type
```

Trois lois :

1. **Une seule version a le droit de s'appeler « FINAL-signer »** — celle que le client signe ; tout le reste s'appelle « vN ». Le versioning n'est pas un rangement, c'est une preuve : en cas de contestation, la question « quelle version a été livrée le [date] ? » a une réponse en une seconde (cf. PV de remise — `05_Document_Bank/templates/08_PV_Remise_Cloture`).
2. **Le Drive remplace, l'envoi archive** : la version « en cours » vit dans `02_travail/` ; les versions envoyées vivent dans `03_livrables/` et ne bougent plus jamais — une version envoyée modifiée rétroactivement est une falsification, même innocente (cf. `09_Incident_Plainte_Client.md`).
3. **Le client qui renvoie son Word modifié** : le fichier reçu est archivé EN ENTRÉE (`01_entree/`), les modifications sont reportées en mode suivi de modifications dans la version maître — jamais l'inverse. Le maître garde la main sur l'historique.

## 6. Cas chiffrés [illustratif]

[cas illustratif] **Karim (SARL-AU 5 500 DH HT + débours) reçoit le pack statuts.** Sans workflow : trois emails de questions, un appel de 25 minutes, un doute sur la clause d'agrément (« c'est quoi la différence avec ce que mon comptable allemand a dit ? » — rappel utile : pour l'Allemagne, c'est la légalisation consulaire qui s'applique, pas l'apostille — objection documentée, `15/06`). Avec le paquet de quatre : la note de risques § 2 répond à la question avant qu'elle soit posée, le Loom montre où est l'agrément en 20 secondes, le solde est réglé à J+4 au lieu de J+18. Coût du workflow : ~50 minutes de plus par mission ; bénéfice observable : le délai de paiement du solde divisé par deux [hypothèse à valider sur vos chiffres réels — cf. 12/03 KPI].

> **Lecture pro :** la dernière heure de la mission — assembler les quatre pièces, préparer la restitution (Loom tourné ou session calée), nommer les fichiers — est la mieux payée du catalogue : c'est elle qui transforme un document juridique en expérience, et une facture solde en automatisme. Les clients ne reviennent pas pour l'article qu'ils n'ont pas lu ; ils reviennent pour la restitution qui les a fait comprendre.
