# 02 — Brand Kit : palette, typographie et configuration Canva (fichier fusionné)

> **Fusion de l'ancien `01_Brand_Kit_Canva.md` (archivé) et de ce fichier.** Le Brand Kit est le seul endroit où la palette et la typo du cabinet sont définies une fois pour toutes — et elles viennent de `DESIGN.md` (v3.3 « Ink & Parchment Bureau »), pas d'une palette d'à-côté : les hex exacts sont ci-dessous, et « Navy #0F2A44 / Beige #F5F1E8 / Teal #1FA89E » est une v1 périmée à remplacer partout (supports publiés inclus).

## POURQUOI un Brand Kit verrouillé

Chaque minute passée à choisir « quelle couleur pour ce carrousel » est une minute perdue et une incohérence gagnée. Le Brand Kit Canva transforme l'identité en réglages : le gabarit applique, l'avocat rédige. Pour un solo-cabinet ADHD, c'est aussi un garde-fou : la contrainte du kit remplace la décision du jour. Et comme l'identité est « law firm encrier/parchemin/laiton » (DESIGN.md), le kit doit refléter le contrat de marque réel : autorité sobre, clarté de lecture, un seul accent.

## COMMENT — 1. La palette exacte (à recopier telle quelle dans Canva)

| Rôle (token DESIGN.md) | Hex | Usage |
|------------------------|-----|-------|
| **Encrier** (`encrier`) | `#070e1c` | Fonds d'autorité : couverture plaquette, slide d'ouverture, footer sombre |
| **Encrier accent** (`encrier-accent`) | `#0f2a44` | Titres sur clair, barres, boutons imprimés, h3 |
| **Encrier light** (`encrier-light`) | `#9fc2e8` | Texte secondaire sur encrier (mode sombre uniquement) |
| **Parchemin** (`parchment`) | `#f6f0e3` | Fond de page/visuel — le sol du bureau |
| **Parchemin alt** (`parchment-alt`) | `#ece6d5` | Fond alterne : bandes, zebra de tableaux |
| **Surface** (`surface`) | `#fffcf5` | Cartes, encarts, pages de document posées sur parchemin |
| **Encre texte** (`ink`) | `#1a2332` | Texte principal (contraste 4.5:1 garanti sur parchemin) |
| **Encre dim** (`ink-dim`) | `#6b6a63` | Texte secondaire, footers, légendes |
| **Laiton** (`brass`) | `#c5a46a` | Le filet signature : separators, cadre fin, numéros de section |
| **Laiton light** (`brass-light`) | `#e8d9b0` | Filets atténués, fonds de badges dorés discrets |
| **Laiton deep** (`brass-deep`) | `#8a6d3a` | Laiton sur parchemin quand `#c5a46a` manque de contraste |
| **Teal outil** (`teal`) | `#1a8a7f` | ≤10 % : lien, soulignement, point d'état, chiffre-clé |
| **Terracotta** (`terracotta`) | `#9c3a1a` | Alerte uniquement (risque H dans une note, date dépassée) |

Ratio de surface conseillé : ~70 % parchemin/surface, ~25 % encrier/ink, **≤5 % teal**, laiton en filets fins seulement. Un grand aplat laiton ou teal = contresens total (DESIGN.md : « sa rareté est le signal »).

## COMMENT — 2. La typographie exacte

| Rôle (token DESIGN.md) | Police | Réglage Canva type |
|------------------------|--------|--------------------|
| Display / titres | **EB Garamond** (700) | 32-40 pt A4 ; 60-72 pt carrousel ; letter-spacing serré (-2 %) |
| Corps / UI / labels | **Public Sans** | 11 pt A4 / 16 px écran ; interligne 1,65 ; 400 corps, 600-700 labels |
| Mono (chiffres, dates, ICE, RIO) | **Cascadia Code** (fallback : JetBrains Mono si absente de ton plan Canva) | 13 px, chiffres tabulaires ; TOUS les montants |
| Arabe | **IBM Plex Sans Arabic** (défaut arabe de Canva si non dispo) | corps only ; ne jamais forcer EB Garamond en arabe |

Hiérarchie à trois étages max (display Garamond / corps Public Sans / data mono), filet laiton entre les étages. Le surlignement jaune, le gras-italique-souligné cumulés et le Times New Roman sont des hors-la-loi du kit.

## COMMENT — 3. Configuration pas à pas dans Canva (2026)

1. **Compte** : Canva Pro (~12 USD/mois ou ~120 USD/an) sur l'email du cabinet `prenom@domaine.ma` — pas le compte perso de 2019.
2. **Brand > Brand Kit** : télécharger le wordmark PNG transparent (2 000 px de large minimum, version claire sur parchemin ET version sombre sur encrier) ; ajouter les 13 hex du tableau (les 8 du quotidien d'abord, les 5 de secours ensuite) ; déclarer EB Garamond + Public Sans (+ mono) comme polices de marque.
3. **Dossier « Photos & fonds »** : textures parchemin plates, photos abstractes (formes, papier, typographie) — uniquement banques libres de droits vérifiées **Unsplash/Pexels** (licences notées dans Canva), jamais la banque générique Canva par défaut (clichés vus 10 000 fois), jamais une capture d'écran d'un client.
4. **Dossier « Éléments »** : filet laiton horizontal (forme ligne, 1 px, `#c5a46a`), pastille teal 8 px, cadre carte surface + bord line. C'est tout.
5. **Templates marque** : créer les 8 gabarits du fichier `03_Templates_8_Types_Spec.md` et les épingler au kit pour que l'équipe (toi) ne parte jamais d'une page blanche.
6. **Nommage des fichiers** (règle du kit) : `CH-2026-012_Convention_Prospect.pdf`, `Carousel_09-08_2026-05.pdf`, `Miniature_loi6623_2026-08.png` — année en cours, type, sujet, date.

## COMMENT — 4. Le wordmark et ses contre-types

Le logo est un **wordmark texte** : « CABINET [NOM] » en EB Garamond, encrier `#0f2a44` sur clair ou laiton `#c5a46a` sur sombre, filet laiton optionnel sous le trait d'union. Pas d'icône balance, pas de marteau, pas de toge, pas de monogramme héraldique. Favicon : la lettre initiale, Garamond, encrier sur parchemin. **Contre-type n° 1 : ne jamais reproduire, même en miniature, le logo d'une entreprise cliente** (dans un cas client, un portfolio, une « preuve sociale ») — c'est une violation de confidentialité et un risque de marque, pas un style. Les logos tiers cités dans un post (Stripe, YouCan, OMPIC…) s'écrivent en texte, entre guillemets d'usage, sans logo.

## EXEMPLE — l'en-tête standard (à réutiliser tel quel)

> Slide/page claire : fond parchemin `#f6f0e3` ; à gauche « Note de risques » EB Garamond 700 `#0f2a44` 28 pt ; à droite date + référence mono `#6b6a63` ; filet laiton 1 px `#c5a46a` pleine largeur sous l'ensemble ; 12 mm de respiration avant le premier mot du corps. Pied : « Me [Nom] — Avocat barreau de [Ville] — RIO [n°] » Public Sans 13 `#6b6a63`.

Cet en-tête, c'est la moitié de l'identité : chaque document qui l'ouvre est reconnaissable avant d'être lu.

## Erreurs d'application

1. **Ré-importer la vieille palette** depuis un vieux carrousel : vérifier chaque hex contre le tableau ci-dessus (qui vient de DESIGN.md) avant tout nouveau template.
2. **Multiplier les couleurs « juste pour une infographie »** : les couleurs de données (violet `#7a5aa8`, bleu `#3a7ca5`, ambre `#c98f2e`, vert `#5f8a52`, berry `#a34d77`) n'existent que pour les graphiques, jamais pour l'UI ou les titres.
3. **Élastique typographique** : importer Inter/Poppins/Playfair « parce qu'elles sont dans Canva » — le kit dit une famille de titres, une de corps, une de chiffres ; c'est non négociable, sinon la signature de marque se dissout.
4. **Oublier la version sombre du wordmark** : un fond encrier `#070e1c` avec un logo encrier = logo invisible. Toujours les deux versions dans le kit.

## COMMENT — 5. Les tokens de forme (arrondis, ombres, filets — DESIGN.md)

Ces réglages vivent dans les templates, pas dans le kit Canva — d'où cette fiche, pour qu'ils ne soient jamais « réinventés » un jeudi soir :

| Élément | Token DESIGN.md | Traduction Canva |
|---------|-----------------|-------------------|
| Coins de cartes/cadres | `lg` = 10 px | rectangle arrondi, rayon 10 px (écrans) — 3 mm sur A4 |
| Boutons/pastilles | `md` = 8 px | même logique, cohérence absolue |
| Pills (badges méta) | `pill` = 999 px | capsules réservées aux étiquettes (« H / M / B », « brouillon »), jamais aux blocs |
| Séparateurs | ligne 1 px `rgba(197,164,106,0,26)` | le laiton à 26 % d'opacité — le filet signature |
| Ombre des cartes | `0 1px 3px rgba(15,42,68,.08)` | « Ombre » Canva, réglage bas ; JAMAIS d'ombres empilées ni de halos colorés (règle No-Halo) |
| Zebra de tableau | parchemin-alt `#ece6d5` sur surface | lignes alternes, sans bordures épaisses |

Le principe à retenir : le système est FLAT — la profondeur vient des couches tonales (parchemin → surface → encrier), pas des ombres. Un document du cabinet qui « flotte » avec trois niveaux d'ombres est un document qui a compris le mot « design » sans comprendre la phrase.

## COMMENT — 6. Checklist d'installation (une après-midi, dans l'ordre)

- [ ] 1. Canva Pro sur l'email du cabinet, workspace unique.
- [ ] 2. Brand Kit : 8 hex du quotidien (encrier, parchemin, surface, encre, laiton, teal, terracotta, encre-dim) ; les 5 hex de secours en second groupe étiqueté « data-viz only ».
- [ ] 3. Polices : EB Garamond + Public Sans (Google Fonts dans Canva) ; le mono Cascadia n'existant pas dans Canva → JetBrains Mono, substitution NOTÉE ici même et nulle part ailleurs.
- [ ] 4. Wordmark : version claire + version sombre, PNG 2 000 px et SVG ; favicon lettre.
- [ ] 5. Dossier « échantillons » : une page test par template (T1-T8) appliquant le kit — elle sert d'étalon : tout nouveau design qui ne jure pas avec l'étalon est rejeté.
- [ ] 6. Nommage des fichiers et arborescence de production (règles fichier 09).
- [ ] 7. Une page Notion « Kit de marque » qui pointe vers ce fichier — DESIGN.md reste la source, Canva n'est qu'une de ses incarnations.

## COMMENT — 7. Ce que le kit protège quand la charge monte

Dans six mois, quand un atelier, un webinaire ou un associé viendra ajouter des supports, la seule question qui tiendra la cohérence sera « est-ce dans le kit ? » — pas « est-ce joli ? ». Le kit est le mécanisme qui permet à UN cerveau ADHD de produire CENT surfaces sans dérive : les décisions sont prises une fois, appliquées mille.

## COMMENT — 8. Les règles d'usage par type de support (la grille de rappel)

| Support | Fond dominant | Texte | Accent autorisé | Interdits du kit |
|---------|---------------|-------|-----------------|------------------|
| Document client (T1-T4) | parchemin + surface | encre `#1a2332` | laiton filet ; terracotta sur risque H | aplat teal, surligne, 3e couleur |
| Note de risques (T3) | parchemin | encre | terracotta H only ; teal 0 | tout décoratif (zéro image) |
| Carrousel (T7) | parchemin ↔ encrier | encre / brass-light | teal un mot par carrousel | couleurs data hors graphiques |
| Plaquette (T5) | parchemin, couverture encrier | idem | laiton light sur sombre | prix catalogue, photos stock « business » |
| Miniature (T8) | les deux, jamais mélangés | titre seul | laiton | rouge criard, flèches, visages hurlants |

## COMMENT — 9. Les substitutions acceptées (quand Canva n'a pas la police)

| Token DESIGN.md | Dispo Canva | Substitution acceptable |
|-----------------|-------------|--------------------------|
| EB Garamond | oui | aucune — c'est LA police |
| Public Sans | oui | system-ui stack (sur Word) |
| Cascadia Code | non | JetBrains Mono ou Space Mono (tabulaire, même rôle) |
| IBM Plex Sans Arabic | vérifier selon plan | police arabe système (iOS/Android par défaut) |

Une substitution est notée ICI et nulle part ailleurs ; le jour où le plan Canva change, c'est cette table qu'on met à jour, pas chaque template un par un — principe : un seul cerveau pour la règle, les templates appliquent.

## COMMENT — 10. L'hygiène du kit (mensuelle, 10 minutes)

- Vérifier que TOUS les exports du mois sont reconnaissables (test des trois documents mêlés, fichier 01).
- Chasser les hex « sauvages » : tout élément de tout design du mois qui n'a pas un des 13 tokens est soit corrigé, soit ajouté à la table avec une raison écrite.
- Vérifier les licences des photos du mois (dossier assets, fichier 09).
- Sauvegarder une copie du kit (export PNG des swatches + liens) : un Brand Kit est un actif du cabinet, il s'archive comme les statuts.

> **Lecture pro :** l'après-midi du Brand Kit (2 h max) : les 8 hex, 3 polices, wordmark double version, 8 templates épinglés. Ensuite, tu n'ouvres plus jamais Canva sans que l'identité soit déjà décidée — c'est tout l'objet du fichier.
