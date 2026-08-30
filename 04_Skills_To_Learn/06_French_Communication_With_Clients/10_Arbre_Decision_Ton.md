# 10 — Arbre de décision : registre, formule d'appel, formule de fin

> **À quoi ça sert :** l'algorithme de décision qui tranche en dix secondes toute question de forme — à qui j'écris, sur quel canal, avec quelle ouverture et quelle conclusion de politesse. **Pour qui :** l'avocat qui perd deux minutes par email à hésiter entre « Cordialement » et « Bien à vous », entre « Cher Confrère » et « Monsieur ». Temps de lecture : 7 minutes.

## 1. POURQUOI : la politesse est un protocole, pas un sentiment

Les formules d'appel et de clôture sont des **codes de positionnement social** : elles disent en trois mots qui parle à qui, de quelle distance, dans quelle institution. Un code mal choisi est immédiatement lu — maladresse ou familiarité — alors qu'un code juste ne se remarque même pas. Comme tout protocole, il se décide une fois pour toutes : d'où l'arbre ci-dessous. Les erreurs de ton de fond (promesse, anxiété, vente) sont traitées dans `08_Erreurs_Ton.md` ; ici, uniquement la mécanique des formules.

## 2. COMMENT : l'arbre principal

```
À QUI j'écris ?
│
├─ CLIENT (actuel ou prospect)
│    Canal = email / note / WhatsApp ?
│    ├─ Email formel, client nouveau ou hiérarchie de société
│    │    Appel   : « Madame, » / « Monsieur, » (nom de famille)
│    │              ou « Bonjour [Prénom], » si le client a signé [Prénom]
│    │    Clôture : « Bien à vous, » (référence) ou « Cordialement, » (neutre)
│    ├─ Email de suivi court, client de longue date
│    │    Appel   : « Bonjour [Prénom], »
│    │    Clôture : « Bien à vous, »
│    └─ WhatsApp de suivi factuel
│         Appel   : « Bonjour [Prénom] » sans virgule protocolaire
│         Clôture : rien (la date suffit) — jamais de requête formelle sur ce canal
│
├─ CONFRÈRE (avocat)
│    Appel   : « Cher Confrère, » / « Chère Confrère, »
│    Clôture : « Confraternellement, » (usage admis sobre)
│    Si différend : passer par l'Ordre → branche BÂTONNIER, jamais le ton du conflit direct
│
├─ BÂTONNIER / ORDRE / INSTITUTION
│    Appel   : « Monsieur le Bâtonnier, »
│    Clôture : « Je vous prie d'agréer, Monsieur le Bâtonnier,
│               l'expression de ma très haute considération. »
│    Registre : pompieux classique assumé (modèle 5 de `04_Modeles_5_Emails.md`)
│
├─ JURIDICTION (mémoire, courrier au greffe, aux magistrats)
│    Mémoire : « Pour Monsieur le Président et Messieurs les Conseillers » (en-tête)
│    Courrier au juge : « Monsieur le Président, » /
│               « Je vous prie de bien vouloir agréer, Monsieur le Président,
│                l'expression de mon profond respect. »
│    Règle d'or : jamais de familiarité, jamais d'ironie, jamais de pression affectueuse
│
├─ ADMINISTRATION (conservation, OMPIC, CNDP, DGI, banque)
│    Appel   : « Madame, Monsieur, » (ou le titre exact si connu)
│    Clôture : « Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées. »
│    Registre : R2 + déférence administrative — jamais de tutoiement numérique,
│               même après trois échanges courtois
│
└─ CLIENT OFFSHORE (anglophone)
     Appel   : « Dear Mr Whitfield, » / « Hi Sam, » dès qu'il signe « Hi »
     Clôture : « Kind regards, » (par défaut) / « Best regards, » (plus tiède)
     Jamais : « Yours faithfully » (sauf contentieux britannique formel),
              « Cordialement » traduit mot à mot
```

## 3. Les tables de réglage fin

### 3.1 Clôtures françaises, du plus chaud au plus protocolaire

| Formule | Usage | Distance |
|---|---|---|
| « Bien à vous, » | Référence du cabinet, client et partenaire | Chaleureuse-pro |
| « Cordialement, » | Neutre, logistique, relance froide | Plate |
| « Sincères salutations, » | Correspondant institutionnel ou juridique | Ferme |
| « Je vous prie d'agréer… » | Bâtonnier, tribunal, administration | Protocolaire |
| « Confraternellement, » | Confrère uniquement | Corporative |

### 3.2 Règles qui n'ont pas besoin d'arbre

1. **Le vouvoiement ne se propose pas, il se constate :** on le quitte uniquement si le client le premier dit « appelez-moi Nadia ».
2. **« Madame, Monsieur, » tout court** est plus fort que n'importe quelle longue formule : dans le doute sur le destinataire, l'absence de prénom est une élégance.
3. **Relancer n'autorise rien :** la deuxième relance garde exactement la même formule que la première — la variation de politesse signe l'agacement.
4. **Le hors-sujet ne se politesse pas :** « Bonne chance pour vos examens » après une consultation, c'est R3 ; dans un mémoire, c'est interdit.
5. **Un écrit collectif commence par « nous » (le cabinet) et finit par « je » (l'avocat signataire)** : la signature engage nommément.

### 3.3 Cas limites fréquents

| Cas | Décision |
|---|---|
| Client qui écrit « Salut ! » dès le premier mail | Répondre « Bonjour [Prénom], » / « Bien à vous, » — on ne descend pas d'échelon |
| Confrère que l'on tutoie dans la vie, adverse dans un dossier | « Cher Confrère, » écrit, pas de prénom — la distance protège tout le monde |
| Réclamation client agressive, fond douteux | R2 calme + clôture « Nous vous prions d'agréer… » : le protocolaire désarme mieux que le mielleux |
| Email à un ami qui devient prospect | Premier écrit = email de cabinet complet ; la rupture de registre est le signal du passage en mission |
| Message vocal/transcription WhatsApp à archiver | Reformuler en écrit court daté et se l'envoyer par email : la trace protège |

## 4. EXEMPLE : la décision en dix secondes

« Salma » de la relance modèle 2 (`04_Modeles_5_Emails.md`) a signé son dernier email « Merci beaucoup, à bientôt, Salma ». Arbre : CLIENT → email de suivi, client de longue date → appel « Bonjour Salma, », clôture « Bien à vous, ». Décision en trois secondes, plus d'hésitation à chaque envoi.

## 5. Le protocole offshore, en une phrase de plus

Pour le client anglophone, l'équivalent fonctionnel de notre « Bien à vous » est « Kind regards » : ni « Yours sincerely » (costume cravate), ni « Cheers » (bar). Et la question que l'arbre ne tranche pas — « dois-je écrire en anglais à une Marocaine installée à Dubaï ? » — se tranche à l'oreille : **la langue du premier email reçu**.

## 6. Les trois paliers de relance d'impayé (mêmes faits, trois climats)

| Palier | Contexte | Formule de clôture |
|---|---|---|
| J+7 — rappel | Oubli probable, client de bonne foi | « Bien à vous, » — le plus froid des trois paliers est le premier : il évite d'en rajouter ensuite |
| J+30 — ferme | Silence persistant, provision contractuelle due | « Nous vous prions de régulariser sous huit jours, sans préjudice de la suite. Salutations. » |
| J+60 — préalable | Décision de mise en demeure prise | « À défaut de règlement avant le [date], la mise en demeure partira sans nouvel avis. » — factuel, daté, sans menace adjective |

Règle transversale : la politesse ne se déclina pas au fil de l'agacement ; seul le contenu durcit. Un avocat qui devient sec a déjà perdu le dossier émotionnellement avant de le perdre juridiquement.

## 7. Les objections de formule les plus reçues (et leurs réponses)

1. **« « Bien à vous », c'est trop court pour un client qui paie 5 500 DH. »** Non : c'est la longueur qui est chère. Une formule de neuf lignes ne crédibilise personne ; un chiffre exact et une date tiennent dans trois phrases.
2. **« Les clients marocains attendent du déférent. »** Ils attendent du respect — et le vouvoiement, le titre et la ponctualité en disent plus long que « haute considération » envoyée à un graphiste de 26 ans. On garde la déférence complète pour l'Ordre, le tribunal et l'administration : la branche R1 de `09_Comparatif_Registres.md`.
3. **« Le client a signé son mail "amicalement vôtre", je fais pareil ? »** Vous répondez à sa chaleur par votre constance : « Bien à vous, ». La relation se règne, elle ne se miroite pas.
4. **« Et en anglais, « Regards » suffit-il ? »** « Kind regards » est le point d'équilibre offshore ; « Regards » sec est lu comme agacé par un non-anglophone, « Warm regards » sonne affectueux hors mariage.

> **Lecture pro :** l'arbre n'est pas une contrainte, c'est un temps rendu : deux minutes d'hésitation par email × dix emails par jour × deux cent cinquante jours = un mois de veille par an perdu à chercher comment dire bonjour. La formule juste est celle qu'on n'a plus à choisir.
