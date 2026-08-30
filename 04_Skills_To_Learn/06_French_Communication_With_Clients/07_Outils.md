# 07 — Les outils de l'écriture propre : relecture, correction, assistance

> **À quoi ça sert :** la pile d'outils réellement disponibles pour écrire sans faute et vite — correcteurs (LanguageTool, Antidote, Grammalecte), traduction (DeepL), dictée (Whisper), modèles réutilisables — et le workflow de deux minutes avant chaque envoi. **Pour qui :** l'avocat qui produit 30 à 80 écrits par semaine et ne peut pas tout relire à l'œil nu. Temps de lecture : 8 minutes.

## 1. POURQUOI : l'œil du rédacteur est aveugle par construction

Relire son propre texte ne le corrige pas : le cerveau reprojette l'intention au lieu de lire la réalisation. D'où deux compensations complémentaires : la **machine** (qui attrape la grammaire, l'orthographe, la typographie) et la **procédure** (lecture à voix haute, délais, gabarits qui limitent la rédaction libre). Les fautes de terminologie juridique (les fautes 4, 5, 11, 18 de `02_Grammaire_20_Fautes.md`) restent hors de portée de toute machine : la relecture sémantique est humaine et obligatoire.

## 2. COMMENT : la pile d'outils du cabinet

### 2.1 Les correcteurs

| Outil | Coût | Point fort | Usage au cabinet |
|---|---|---|---|
| **LanguageTool** | Gratuit (version premium payante) | Extension navigateur + add-on LibreOffice ; détecte grammaire, orthographe, typographie, répétitions | Activé en permanence dans Gmail/Outlook et dans l'éditeur du vault ; filtre principal avant envoi |
| **Antidote** | Payant (licence) | Analyse stylistique la plus fine du marché français ; dictionnaires de synonymes et de cooccurrences | Passer les actes et notes de sortie de mission dans Antidote avant signature |
| **Grammalecte** | Gratuit, open source | Excellent sur la grammaire française pure ; conjugeur | Alternative de dépannage si LanguageTool est indisponible |
| **BonPatron / d'autres correcteurs web** | Gratuit | Rapide | Uniquement pour un brouillon isolé, jamais pour un document couvert par le secret professionnel |

Règle de sécurité : **aucun texte client identifiant ne quitte le poste vers un service web non contractuel.** La saisie manuelle dans un correcteur en ligne pose la même question de confidentialité qu'un outil IA (les protocoles d'anonymisation du dossier `02_AI_For_Lawyers_Prompts/` s'appliquent par analogie). LanguageTool en extension locale sur le poste de rédaction est le réglage par défaut.

### 2.2 La traduction

- **DeepL** : référence FR↔EN pour la première passe ; le résultat doit rester un brouillon (voir le workflow § 5 de `06_Trilinguisme.md`).
- **DeepL Write** : reformulation « native » d'un paragraphe anglais déjà écrit — utile pour lisser l'anglais offshore.
- L'arabe : la traduction automatique juridique reste peu fiable sur les termes outils (فسخ، إعذار، اختصاص) ; ne jamais l'utiliser en sortie sur un acte, seulement en compréhension d'un document reçu.

### 2.3 La dictée

Dictée vocale (Whisper, dictée intégrée du système) pour les brouillons de notes : on parle plus vite qu'on n'écrit, et le premier jet n'a pas à être beau. Le flux : dicter 10 minutes → LanguageTool → restructurer en SCQA → polir. La dictée désengorge aussi le blocage de la page blanche du lundi matin.

### 2.4 Les modèles réutilisables

- **Gabarits du vault** : ce dossier (`04_Modeles_5_Emails.md`, `05_Modeles_Notes.md`) est la source unique ; copier-coller, ne jamais réécrire depuis zéro.
- **Réponses automatiques Gmail/Outlook** : charger les cinq modèles en « snippets » avec mot-clé d'appel (diag, relance, livr, part, ordre).
- **Clausetags** : dans l'éditeur de documents, des blocs nommés pour les clauses types (clause pénale DOC 263-264, élection de for, cession de droits 2-00 mod. 34-05) — une seule version correcte de chaque clause dans tout le cabinet.

## 3. Le workflow des deux minutes (avant CHAQUE envoi)

```
Rédaction (gabarit adapté)
   ↓ 30 s   LanguageTool passe 1 : corriger tout ce qui est signalé
   ↓ 30 s   Lecture À VOIX HAUTE du paragraphe de conclusion
            (là où se niche l'erreur de sens que la machine ne voit pas)
   ↓ 20 s   Contrôle des chiffres : montants, dates, numéros d'article
            (comparaison avec 07_Sharp_Legal_Mind/03_Numbers_Sheet.md)
   ↓ 20 s   Contrôle déontologique : pas de sollicitation, pas de promesse
            de résultat, pièce jointe réellement attachée
   ↓        Envoyer
```

Les 20 secondes de contrôle des chiffres attrapent les deux tiers des erreurs coûteuses : un prix erroné ou un article imaginaire envoyé à un client qui vérifie.

## 4. Mesurer, sinon cela ne s'améliore pas

- **KPI hebdomadaire :** fautes LanguageTool signalées après première passe / 500 mots produits. Cible : < 1.
- **Compteur honteux :** tout email envoyé sans workflow et repéré le lendemain → noté, analysé (cause : gabarit manquant ? pression ?), corrigé par l'ajout d'un snippet, pas par une promesse.
- **Révision mensuelle :** le premier vendredi du mois, une heure de mise à jour des gabarits (prix, références légales — notamment les numéros définitifs de la loi 66-23 quand la transposition avance).

## 5. Les faux besoins

- **Antidote premium + LanguageTool + Grammalecte en même temps :** deux correcteurs suffisent (LanguageTool au quotidien, Antidote sur les actes) ; l'avis convergent des machines crée une fausse confiance typographique.
- **Le « perfect writing app » :** la rédaction juridique de qualité se fait dans un traitement de texte sobre et des gabarits ; les outils d'écriture exotiques sont un plaisir, pas un rendement.
- **La relecture par IA non maîtrisée :** un passage par un agent conversationnel sans protocole d'anonymisation expose le secret professionnel (loi 66-23, ex-art. 21 à 23 ; numéros 66-23 en transposition) — ce n'est pas un outil de relecture, c'est un tiers destinataire des données du client.

## 6. La typographie française du cabinet (la machine la moins chère)

Une page bien typographiée est lue comme une page sûre — avant même la première phrase. Quatre réflexes gratuits :

| Règle | Le cabinet écrit | Pas |
|---|---|---|
| Guillemets doubles et apostrophe typographique | « convention d'honoraires » | "convention d'honoraires" |
| Espace insécable avant : ; ! ? | « À noter : » | « À noter: » |
| Montants : espace + sigle officiel | « 5 500 DH HT » | « 5500Dhs ht », « 5.500 DHS » |
| Dates en toutes lettres dans les actes | « le 12 août 2026 » | « 12/08/2026 » (à lire dans deux sens selon la langue du lecteur) |

Antidote et LanguageTool signalent la plupart de ces écarts ; les régler une fois dans les gabarits du vault les fait disparaître de tous les envois futurs.

## 7. Installation du poste en dix minutes (à faire une seule fois)

1. Extension **LanguageTool** installée dans le navigateur et dans le traitement de texte ; langue réglée sur « Français (Maroc ou variante disponible) », niveau de vérification « syntaxe » ; liste noire/personnelle alimentée dès la première semaine avec les mots du métier (RNAE, CNDP, IGOC, OMPIC, DOC) pour stopper les faux signaux.
2. **Snippets d'email** : les cinq modèles de `04_Modeles_5_Emails.md` chargés dans Gmail/Outlook, mots-clés diag / relance / livr / part / ordre.
3. **Signature unique** verrouillée : nom, « avocat au barreau de Casablanca », téléphone, lien de prise de rendez-vous — ni citation, ni bannière, ni « envoyé depuis mon iPhone ».
4. Le vault ouvert en permanence dans un onglet, dossier 06 : les gabarits ne se recopient jamais d'un vieil email, ils se reprennent à la source.
5. Test d'envoi : s'écrire à soi-même un email contenant « Ci-joint les pieces » — LanguageTool doit hurler ; s'il ne dit rien, la configuration est mal réglée.

## 8. Quel outil selon le volume (paliers de décision)

| Volume hebdomadaire d'écrit | Configuration |
|---|---|
| < 10 pages | LanguageTool seul suffit + le workflow § 3 |
| 10 à 30 pages | + snippets systématiques et contrôle typographique § 6 |
| > 30 pages ou actes lourds | + Antidote sur chaque acte sortant ; une relecture à deux yeux (collaborateur) sur tout contrat > 20 000 DH de valeur engagée |
| Multilingue récurrent | + glossaire de `06_Trilinguisme.md` chargé dans la mémoire de traduction DeepL |

## 9. Ce que la machine ne corrigera jamais (et pourquoi le § 3 reste humain)

LanguageTool ne sait pas qu'un « art. 618 » n'existe pas pour la réserve de propriété, que la sanction maximale de l'article 64 de la loi 09-08 est 100 000 DH et non 300 000, ni qu'une convention d'honoraires n'est pas un « contrat de prestation ». Les erreurs de fond sont précisément celles que le contrôle des chiffres du workflow § 3 (20 secondes avec `07_Sharp_Legal_Mind/03_Numbers_Sheet.md` ouvert) est chargé d'attraper. L'outil corrige la langue ; le vault corrige le droit.

> **Lecture pro :** l'empilement d'outils ne remplace pas la compétence, il la protège de ses jours sans — le coup de fil de 11 h 47, le client relanceur, l'audience qui avale la matinée. Le jour où le workflow des deux minutes saute, le résultat est dans la boîte mail du client ; c'est précisément pour les jours où il saute que le gabarit, lui, reste juste.
