# 03 — Lire un texte consolidé : version BO, version consolidée, articles modifiés ou abrogés

> **À quoi ça sert :** la compétence technique qui manque le plus — ouvrir une loi marocaine et en extraire
> LA version en vigueur, article par article, sans se faire piéger par une abrogation récente.
> Les trois exemples sont ceux que le vault a réellement vécus pendant l'audit du 28-29/08/2026.
> Temps de lecture : 10 minutes.

## 1. POURQUOI : une loi n'est pas un texte, c'est un état

Un texte législatif marocain vit : promulgué (BO), modifié article par article (lois de finances annuelles,
lois sectorielles), parfois abrogé et remplacé sous un nouveau numéro.
Citer « l'article 30 de la loi 28-08 » en septembre 2026 sans vérifier l'état de la loi,
c'est citer un texte **mort** — exactement l'erreur que l'audit a corrigée dans tout le vault
(`PROGRESS_AUDIT_NICHES.md` §1). Lire un consolidé est une méthode, pas un coup d'œil.

## 2. COMMENT : les deux gisements et leur différence de nature

### 2.1 Version BO vs version consolidée

| | **Version BO (Journal officiel)** | **Version consolidée (sgg.gov.ma)** |
|---|---|---|
| Nature | Photo figée à la date de publication : texte ORIGINAL tel que promulgué | Reconstruction : texte initial + modifications intégrées, datées |
| Force | Prouve ce qui a été publié, quand, par quel dahir/arrêté | Prouve l'état du droit À UNE DATE (« version consolidée au… ») |
| Piège | Ne montre PAS les modifications ultérieures | La date de consolidation peut être périmée face à une loi récente |
| Usage pro | Citer la promulgation : « dahir 1-26-75, BO 7536 » | Citer l'article en vigueur : « art. X (version consolidée au JJ/MM/AAAA) » |

**Réflexe n° 1 — lire la date de consolidation.** Sur toute citation, noter la mention
« version consolidée au… » affichée par le SGG en tête du document :
une consolidation antérieure à la dernière loi modificatrice est une fausse à jour.

**Réflexe n° 2 — ouvrir aussi le modificateur.** Quand la modification est récente (quelques semaines),
chercher AUSSI le texte modificatif lui-même (BO de la LF, dahir de promulgation) pour vérifier
que la consolidation a bien intégré la bonne version des bons articles.

### 2.2 Anatomie d'une lecture d'article : les cinq questions

1. **L'article existe-t-il sous CE numéro dans la version consolidée ?**
   Les renumérotations existent : suppressions, insertions « art. X-1 », regroupements.
2. **Porte-t-il une mention « modifié par… » / « abrogé par… » ?**
   Les PDF officiels signalent les abrogations dans les notes ; un PDF repris d'un site privé
   peut les avoir perdues — la source du fichier prime sur sa copie.
3. **Quelle version s'applique À MA situation ?**
   Dispositions transitoires et d'application : une LF s'applique aux exercices ouverts ;
   une règle pénale à la date des faits — jamais à « aujourd'hui » sec.
4. **Le numéro cité est-il celui du texte de base ou d'une loi modificative ?**
   Erreur type relevée par l'audit : « loi 20-19 SARL » — la base réelle est la **loi 5-96**
   (les SAS sont venues ensuite, via la loi 19-20). On ne cite pas une loi rectificative
   comme si elle était la loi de matière.
5. **La date de consultation est-elle notée ?**
   Toute note de recherche porte la date où la source a été ouverte :
   c'est ce qui la rend ré-vérifiable six mois plus tard (`[[08_Note_de_Recherche_Modele]]`).

## 3. LES TROIS EXEMPLES DU VAULT (matière première de ce fichier)

### 3.1 Exemple central — la loi 28-08 remplacée par la loi 66-23 : détecter une abrogation totale

Chronologie réelle de la détection (audit 28-29/08/2026) :

```
Signal     : des sources récentes parlent d'une « loi 66-23 » de profession d'avocat ;
             le vault, lui, citait les art. 21-23 / 30 / 32 de la 28-08.
Vérif. 1   : sgg.gov.ma → dahir n° 1-26-75 du 18 août 2026 promulguant la loi n° 66-23
             relative à l'organisation de la profession d'avocat, publié au BO n° 7536
             → la 28-08 est REMPLACÉE.
Vérif. 2   : comparaison de contenu : les PRINCIPES (convention d'honoraires, provision,
             secret professionnel) sont repris — mais sous de NOUVEAUX numéros,
             non encore consolidés à la date de l'audit.
Décision   : aucune citation sèche de l'ancien numéro ; aucun numéro neuf inventé.
             Formule adoptée partout dans le vault :
             « ex-art. 30 de la loi 28-08, repris par la loi 66-23
              (numérotation en transposition — vérifier le consolidé) ».
```

**Leçon n° 1 :** une abrogation totale ne fait pas disparaître le contenu — elle déplace les numéros.
**Leçon n° 2 :** les deux réflexes vont ensemble : chercher le texte abrogeant ET écrire la référence
en forme « ex-art. » + flag de transposition. L'un sans l'autre produit la faute.

### 3.2 Exemple — « loi 19-06 Office des Changes » : l'introuvable est une information

Pendant des mois, le vault a cité une « loi 19-06 » comme base de l'Office des Changes.
L'audit a fait le test simple : **rechercher le numéro à la source**. Résultat :
aucune loi 19-06 correspondante au SGG ; rien dans les bases documentées.
Verdict : référence fictive, retirée partout et remplacée par les bases RÉELLES
(dahirs 1939/1949 ; IGOC édition 2026 ; art. 4 ter loi 110-13 ; art. 8 lois 70-19 et 55-23).

**Leçon :** un numéro de loi introuvable n'est jamais « quelque part » — c'est le signe
d'une référence recopiée sans vérification. La bonne question n'est pas
« où est-ce qu'elle est », mais « qui me l'a donnée sans la source ? ».

### 3.3 Exemple — CGI : « art. 144 facture » vs l'article 145

Le vault citait l'article 144 du CGI pour les obligations de facturation ; l'audit (29/08) a vérifié
au consolidé DGI : la base de citation est **l'article 145**, et l'actualité du sujet est le déploiement
de la **facturation électronique** (LF 2025-2026, calendrier par taille d'entreprise publié par la DGI —
`[[07_Veille_Mensuelle_Protocole]]`). Erreur typique de **décalage d'un article** :
ancienne numérotation, ou voisin de l'article cherché.

**Leçon :** à l'ère des LF annuelles, le CGI bouge au moins une fois par an ;
un numéro d'article du CGI sans date de consultation n'a pas de valeur.
Le contrôle croisé est simple : lire l'**intitulé** de l'article et la section où il vit,
pas seulement son numéro.

## 4. Le protocole d'ouverture en six gestes (10-20 minutes par texte)

1. **Identifier** : numéro + date + auteur (loi/dahir/arrêté) + n° de BO de publication d'origine.
2. **Consolidé** : ouvrir la version consolidée SGG ; recopier la mention « consolidée au… ».
3. **Chasser** : parcourir l'article et ses voisins à la recherche de « modifié par / abrogé par ».
4. **Croiser** : si un modificateur est récent (LF, loi de l'année), ouvrir son BO à lui.
5. **Dater** : lire l'article final (date d'application) et les dispositions transitoires.
6. **Noter** : URL + date de consultation + initiales dans la note interne — puis décider du verdict
   citable / réserve / non citable (`[[04_Protocole_3V_Avant_Citation]]` § 3).

## 5. mini-cas [illustratif] : la note de Yassine passe entre les mailles

Yassine demande si son contrat de prestation doit viser la « loi 5-96 » (sa future SARL).
Le stagiaire, rapide, cite un article de la 5-96 pris sur un blog de vulgarisation.
Le protocol § 4 rattrape l'erreur en quatre minutes : le consolidé affiche une version
antérieure à la dernière modification sectorielle ; la citation du blog correspond à l'ancienne
rédaction. Issue : l'article est recopié depuis le consolidé, daté — et la note client porte
« version consolidée au [date] ». Le blog n'a jamais été cité nulle part : il n'était qu'une piste.

> **Lecture pro :** savoir lire un consolidé, c'est accepter une discipline : le numéro d'un article
> ne prouve rien, la version le prouve. Les trois histoires ci-dessus — la 28-08 abrogée, la 19-06
> fantôme, le 144 voisin du 145 — résument les trois façons dont une citation meurt :
> par en haut (abrogation), par la base (invention), de côté (décalage).
