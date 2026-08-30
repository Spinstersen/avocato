# 08 — Comparatif Canva vs Figma (vs le reste) : que choisir pour un cabinet solo

> La question n'est pas « quel outil est le meilleur » mais « quel outil tient une production juridique régulière sans employé design ». Ce comparatif tranche pour le cabinet solo d'aujourd'hui, et dit à quel signal précis il faudra migrer — car la bonne réponse change avec le volume, pas avec le goût.

## POURQUOI trancher tôt

L'ADHD du fondateur adore changer d'outil (le nouvel outil est toujours plus productif… pendant deux semaines). Une décision écrite, chiffrée et conditionnée (« on migre QUAND X, pas quand Y ») ferme la question pour dix-huit mois. Les deux candidats sérieux sont Canva (production rapide, gabarits, Brand Kit, PDF natif pour Yousign) et Figma (système vectoriel, composants, collaboration). S'ajoutent les outsiders cités pour honnêteté : Adobe Express, PowerPoint « avancé », et le graphiste freelance.

## COMMENT — le tableau honnête

| Critère | Canva | Figma |
|---------|-------|-------|
| Courbe de prise en main | 1-2 jours ; interface « glisser » | 1-2 semaines ; concepts frames/composants/auto-layout |
| Brand Kit officiel (couleurs + polices verrouillées) | Oui — le cœur du fichier 02 | Pas « kit » natif équivalent : il faut un fichier de style + plugins |
| Format PDF multi-pages (carrousel LinkedIn) | Natif, en deux clics | Export page par page ou plugin |
| Édition de gabarit par un non-designer (toi, pressé) | Oui, sans risque de casser le système | Oui, mais l'auto-layout punit la manipulation pressée |
| Typo FR/AR (IBM Plex Arabic, chaînes bilingues) | Polices google dispo, gestion basique | Meilleure gestion des styles de texte complexes |
| Collaboration future (recruter une assistante design) | Licences simples, rôles clairs | Meilleur pour un vrai flux design |
| Coût (2026, indicatif) | Pro ~12 USD/mois ou ~120/an par siège | Gratuit en solo ; payant dès collaboration |
| Hors-sujet pour toi | — | maquettes web/app (à laisser à la webapp) |

## COMMENT — la règle de décision en trois questions

1. **Production < 20 visuels/mois, solo, gabarits stables ?** → Canva, sans débat. C'est le cas du cabinet jusqu'à l'ouverture d'une vraie charge de contenu.
2. **Deux personnes qui éditent, un design system à faire évoluer, interfaces produit (webapp du cabinet) ?** → Figma pour le produit, Canva garde la production courante — les deux coexistent très bien : le design system vit dans Figma, ses exports « gabarisés » vivent dans le Brand Kit Canva.
3. **Un client demande un livre blanc de 40 pages premium ?** → externaliser au graphiste (devis) ; un avocat qui compose 40 pages perd une mission.

## COMMENT — le setup Canva réaliste d'un cabinet 2026

- Canva Pro (email pro), 1 workspace, 1 Brand Kit (fichier 02), dossiers par type : `T1-templates`, `T7-carrousels`, `Clients-[ref]`, `Assets-photos-licences`.
- Polices marque chargées : EB Garamond, Public Sans (Google Fonts dispo Canva) ; le mono (Cascadia n'y est pas) se remplace par **JetBrains Mono ou Space Mono** — l'essentiel est la tabularité des chiffres, pas le nom de la police ; noter la substitution dans le fichier 02 pour que tout l'écosystème reste aligné.
- Rituels : dupliquer le template, ne jamais repartir de zéro ; exporter en PDF « qualité d'impression » pour signer ; version PNG compressée pour poster.

## COMMENT — le signal de migration (à écrire maintenant, pour ne pas décider à chaud)

Migrer vers Figma (ou déléguer Canva à un freelance) dès que DEUX de ces faits sont vrais pendant deux mois : (a) > 20 livrables visuels par mois ; (b) une seconde personne édite les supports ; (c) des demandes clients de design system (marque, charte complète) apparaissent dans le pipeline ; (d) le Brand Kit Canva ne suffit plus à tenir la cohérence entre supports. Tant que trois des quatre sont faux : Canva, et on arrête d'y toucher.

## EXEMPLE — une semaine de production type (Canva seul)

- Lundi : T7 dupliqué → carrousel « 5 clauses » (20 min, fichier 04).
- Mardi : T3 → note de risques Yassine (8 min).
- Jeudi : T1/T4 dupliqués → convention + devis Fatima, export PDF → Yousign (10 min).
- Vendredi : T8 → miniature de l'article SEO hebdo (7 min).
Total : 45 minutes de design pour la semaine — le reste est de la rédaction juridique, qui, elle, est facturée.

## Erreurs d'application

1. **Le « juste pour essayer Figma » du dimanche soir** : il coûte une semaine de production et un Brand Kit à refaire — la règle de décision ci-dessus existe pour ce dimanche-là.
2. **Croire que Figma fera le design** : l'outil ne dessine pas ; la palette parchemin/encrier/laiton et le trio typo viennent de DESIGN.md, pas du logiciel.
3. **Surcharger le Brand Kit Canva** (30 couleurs « au cas où ») : chaque option supplémentaire est une incohérence future ; le kit des 8 hex du quotidien est assez bon pour le quotidien.
4. **Négliger les licences** : éléments « Pro » dans un design exporté pour un client, ou photo non libre de droits republiée → risque juridique chez un avocat, donc doublement ridicule ; le dossier `Assets-photos-licences` est là pour la preuve.

## COMMENT — les outsiders, traités vite et bien

- **Adobe Express** : l'équivalent direct de Canva (marques, gabarits) ; il ne se justifie QUE si l'abonnement Adobe existe déjà (Photoshop/InDesign pour les 40 pages externalisables) ; pour le pipeline T1-T8, aucun gain.
- **PowerPoint « avancé »** (masques, thèmes) : tentant pour un juriste qui le connaît ; piégeux pour l'export PDF multi-pages et la cohérence des gabarits — acceptable en dépannage, jamais en système.
- **Google Docs / Docs + modules** : la source de vérité du TEXTE (éditable, versionnable, signable) ; le design n'y vit pas — c'est justement la frontière du workflow fichier 09 (le fond dans le doc de texte, la forme dans Canva).
- **InDesign** : l'outil du livre blanc 40 pages, donc du prestataire. Pas du solo-cabinet.
- **Le graphiste freelance à l'acte** : un devis pour ce que Canva ne sait pas faire (maquette imprimeur premium, identité complexe) ; le brief = notre Brand Kit (fichier 02) — un designer qui reçoit une charte tokens produit juste ; un designer qui reçoit « du bleu pro » produit du générique.

## COMMENT — le budget design annuel (ordre de grandeur, à ajuster chez toi)

| Poste | Estimation | Commentaire |
|-------|-----------|-------------|
| Canva Pro | ~1 440 DH/an (12 USD/mois) | un siège, rien de plus tant que le cabinet est solo |
| Banque d'images (Unsplash/Pexels gratuit) | 0 | licences documentées (règle fichier 09) |
| Graphiste, 2 interventions/an (plaquette premium, livre blanc) | 1 500-4 000 DH HT par intervention | hors période de test : 0 |
| Temps interne | 45 min/semaine | la ligne la plus coûteuse — celle que le kit protège |

L'arbitrage se lit ici, pas dans les débats d'outil : chaque dirham ou minute de design doit se justifier par une surface qui touche un client. Le reste est du loisir d'auteur — licite le samedi, interdit dans le pipeline.

## COMMENT — les « quand même » (les cas où Figma devance Canva même en solo)

1. **La webapp du cabinet existe déjà** (le dossier `webapp/` du vault vit avec les tokens de DESIGN.md) : si un jour il faut dessiner des écrans (nouvelles vues du cabinet OS), c'est Figma — mais ce travail-là est du PRODUIT, pas du livrable client, et il ne doit jamais contaminer la production T1-T8.
2. **Un partenaire (comptable, plateforme e-commerce) co-brande un support** : là où deux marques se rencontrent, les composants et les bibliothèques de styles de Figma évitent les dérives d'alignement — avec un export final qui repasse par Canva pour la diffusion courante.

## Erreurs d'application

5. **Attendre l'outil parfait pour publier** : le premier carrousel moche de l'histoire du cabinet a été publié sur Canva gratuit par un concurrent qui est devenu une référence — la régularité bat l'outillage ; le bon outil est celui qui ne bloque pas la cadence.
6. **Vouloir « design system » Figma pour huit templates** : un design system se justifie par la VARIATION (centaines d'écrans) ; une identité par la RÉPÉTITION — ici, la répétition de huit gabarits Canva est déjà un système, et elle tient dans un fichier 02.

## COMMENT — les coûts cachés (ce que les tableaux comparatifs oublient)

| Coût réel | Canva | Figma |
|-----------|-------|-------|
| Le temps de RETROUVER un fichier | dossiers simples + templates marque | il faut construire une arborescence (et la maintenir) |
| Le coût d'une faute de licence image | elements Pro inclus ; banque externe à tracer | TOUT vient de la banque externe : la licence est à ta charge |
| Le temps du non-designer qui réutilise | une assistante remplit un template Canva le jour même | une assistante ouvre Figma et casse l'auto-layout |
| Le coût de la migration future | modeste (les Brand Kits s'exportent mal, les designs se refont) | les bibliothèques de styles survivent mieux au changement d'outil |

Lecture honnête : Canva n'est pas « moins professionnel » — il est moins exigeant pour la DEUXIÈME personne, celle qui n'est pas toi ; et dans un cabinet solo, la deuxième personne n'existe pas avant des années. C'est ce point, plus que les pixels, qui tranche le débat.

## COMMENT — la note de décision (à recopier dans Notion et à ne plus rouvrir)

> **Décision 2026-XX :** production de supports = Canva Pro + Brand Kit (fichier 02) + 8 templates (fichier 03). Figma : réservé aux écrans de la webapp, pilotés par DESIGN.md, jamais par les templates clients. Revoir la décision si deux des quatre signaux (volume > 20 visuels/mois × 2 mois, seconde personne, demandes client de design system, rupture de cohérence malgré le kit) sont vrais simultanément — ou dans 18 mois, ce qui arrive avant.

Une décision écrite avec sa condition d'annulation EST la fin du débat : c'est le principe du fichier 01 de ce dossier appliqué à l'outil — décider une fois, appliquer mille.

## COMMENT — les cinq questions de choix d'outil (checklist avant tout changement)

1. Qui, À PART MOI, posera la main sur le fichier ? (zéro → Canva ; deux designers → Figma)
2. Quel est le volume hebdo ? (< 3 visuels → Canva ; > 10 avec variantes systématiques → Figma + export)
3. Le livrable est-il un DOCUMENT (imprimable, signable) ou une INTERFACE (écran, interactif) ? (le premier → Canva/Yousign ; la seconde → Figma/webapp)
4. Le Brand Kit suffit-il à tenir la cohérence entre les deux outils ? (si oui : cohabitation sans drame)
5. Combien de jours de production perdus le mois du changement ? (la réponse est TOUJOURS plus que prévu — c'est le coût unique et réel de « essayer l'outil parfait »)

> **Lecture pro :** si tu ne produis que pour toi, choisis Canva et ne rouvre pas ce fichier avant six mois. Si tu hésites encore, c'est que le signal (a) ou (b) est déjà là : mesure-le deux semaines avant de décider.
