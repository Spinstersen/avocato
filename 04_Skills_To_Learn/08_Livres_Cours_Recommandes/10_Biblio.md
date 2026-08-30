# 10 — Bibliothèque Notion : schéma, conventions, lien fiche↔mission

> La base « Biblio » du Notion du cabinet : 8 colonnes, 3 vues, conventions de nommage strictes pour que chaque fiche de lecture (`07_Fiches.md`) se relie à une Mission réelle. Cette base est le compteur qui prouve que le dossier 08 produit autre chose que des bonnes résolutions.

## POURQUOI une base et pas une liste

Une liste de livres dort ; une base avec statut + mission liée + échéance d'application se lit au vendredi soir comme un tableau de production. La bibliothèque est un pipeline : même logique que PROSPECTS (`01_Strategy/`), mais pour les connaissances. Sans lien fiche↔mission, la lecture reste un hobby.

## COMMENT — le schéma de la base (8 colonnes)

| Colonne | Type | Règle |
|---------|------|-------|
| Titre | Titre de page | `Auteur — Titre (année)` exactement comme dans les fichiers 01-06 |
| Type | Select : Livre / Cours / Source officielle / Outil | 4 valeurs, pas de « autre » |
| Domaine | Multi-select : Droit · PI · Vente · Éloquence · Business · ADHD | Le fichier source du dossier (01-06) |
| Statut | Select : À lire / En cours / Fiche écrite / Appliqué / Archivé | Flux strict, voir ci-dessous |
| Coût | Number ou text | « 0 » pour tout ce qui est gratuit — ne jamais inscrire un prix non vérifié |
| 3 takeaways | Text | Collés depuis la fiche ; la fiche vit dans la page, pas l'inverse |
| Mission liée | Relation → base MISSIONS | Obligatoire pour passer en « Appliqué » |
| Échéance application | Date | Date de la « → Application » de la fiche |

**Le flux de statut** : À lire → En cours (la session de 15 min a commencé) → Fiche écrite (3 takeaways + 1 application datée) → Appliqué (case « Vérifié sur mission » cochée, Mission liée remplie) → Archivé (6 mois sans application — pas de culpabilité, c'est le rayon qui trie).

## COMMENT — les conventions de nommage

- **Page Notion** = titre du livre complet : `Voss & Raz — Ne coupez jamais la poire en deux (2016)`. Pas de majuscules tout-cap, pas d'abréviations maison.
- **Fiche markdown du vault** : elle ne duplique PAS la base — elle y pointe. Une ligne du vault = `→ base Biblio, page « … »` ; la source de vérité du statut est Notion, la source de vérité des références est le vault (les flags d'incertitude vivent dans les .md).
- **Mission liée** : format `[Niche] [Livrable] — [mois]` (ex. `[Ecom] Diagnostic Fatima — sept.`), aligné sur la base MISSIONS existante.
- **Citations** : un ouvrage non lu n'est jamais cité comme lu dans un article — la colonne Statut protège l'E-E-A-T du dossier 09 : on ne cite en « lu » que ce qui est en « Fiche écrite » minimum.

## COMMENT — les trois vues

1. **Kanban par Statut** — vue de pilotage du vendredi (5 min : déplacer, écrire les takeaways de la semaine).
2. **Table « En cours + À lire » triée par Domaine** — vue d'achat : ce qui est nécessaire vraiment avant la prochaine commande librairie.
3. **Galerie « Appliqué »** — la vitrine : chaque carte = un livre qui a changé une mission ; c'est le stock d'anecdotes pour les ateliers et les posts LinkedIn (dossier 09, repurposing).

## COMMENT — relier la fiche à la mission (le geste qui compte)

Au moment où une mission facturable démarre, ouvrir la vue « À lire/En cours » du Domaine concerné : si un livre est en cours, on en extrait LA takeaway applicable et on la colle dans la page Mission avec lien retour vers la page Biblio. Inversement, avant de passer une fiche en « Appliqué », la case « Vérifié sur mission » de `07_Fiches.md` doit pointer une page Mission datée. Le lien est dans les deux sens ou n'existe pas.

## Automatisation minimale (sans y passer ses soirées)

- Template Notion de page Biblio : le gabarit de `07_Fiches.md` collé dans une page, avec les 8 propriétés en header.
- Deux boutons seulement : « Nouvelle fiche » (template + statut En cours + date du jour) et « Revue vendredi » (vue filtrée Fiche écrite, tri par échéance).
- Rien d'autre : pas de synchronisation webinaire, pas de scraping de catalogue — `[flag : les intégrations type « importer ma liste Goodreads » existent mais leurs données d'édition sont souvent fausses ; l'import manuel reste la norme]`.

## Les 6 indicateurs de santé de la base (revue mensuelle, 10 min)

| Indicateur | Cible | Alerté si |
|------------|-------|-----------|
| Pages « En cours » | 1 (un seul livre à la fois) | > 2 |
| Fiches écrites / mois | ≥ 1 | 0 deux mois |
| Applications cochées / mois | ≥ 1 | 0 un trimestre |
| À lire stagnant > 90 j | 0 | > 3 pages |
| Coût livres / mois | ≤ 1 achat | > 2 sans mission déclencheur |
| Dossiers 01-06 vs base | 100 % des entrées du rayon ont une page | écart > 2 |

## Migration et sauvegarde

La base s'exporte en CSV le dernier dimanche de chaque mois (backup — cf. `04_Skills_To_Learn/01_Legal_Tech_Stack/09_Securite_Backup_09-08.md`) ; la version markdown de secours est ce dossier : les références et les flags d'incertitude vivent dans le vault, Notion n'est que la machine à suivre l'application.

## COMMENT — le rituel de création d'une page (en 60 secondes)

1. Nouveau nom d'ouvrage dans le rayon (01-06) = la page est créée le jour même, sinon elle n'existera jamais.
2. Coller le bloc d'annotation du fichier source dans la page (thèse/retrait/consommation) — la recopie est le premier rappel actif.
3. Statut initial À lire + échéance de première session (la date du prochain bloc lecture du parcours `08_Parcours.md`).

## EXEMPLE — cycle réel d'une entrée

`Fitzpatrick — The Mom Test (2013)` — Type Livre, Domaine Vente, Coût 0 (déjà acheté) — statut Fiche écrite depuis S2 → la fiche 6 de `07_Fiches.md` est collée dans la page → application : réécriture des questions Tally de qualification → Mission liée `[Ecom] Refonte formulaire qualification — oct.` → à la première semaine de diagnostics avec le nouveau formulaire, coche « Vérifié sur mission » et passage en Appliqué. Durée totale de présence dans la base : 5 semaines, dont 3 heures de lecture.

## COMMENT — l'exemple type d'une page Biblio (le rendu Notion attendu)

```
Voss & Raz — Ne coupez jamais la poire en deux (2016)
Type : Livre | Domaine : Vente | Coût : 0 (déjà acquis)
Statut : Fiche écrite
3 takeaways : 1) le « non » ouvre l'info — 2) miroir+étiquette > argument — 3) question de calibration reporte la contrainte
→ Application : une technique par appel, miroir en semaines paires (avant JJ/MM)
Mission liée : [Ecom] Relance packs Mars — mars
Vérifié sur mission : [ ] (à cocher avec date = passage en Appliqué)
```

## FAQ du fichier

**Q. Notion ou un tableau markdown dans le vault ?**
R. Notion : la base doit vivre là où le travail se fait (missions, deadlines) et lier fiche↔mission par Relation ; le vault garde les références et les flags.

**Q. Et si la base gonfle (« À lire » infini) ?**
R. Revue mensuelle : tout ce qui est en « À lire » depuis plus de 90 jours sans déclencheur passe en Archivé. Une base de bibliographie n'est pas un musée.

**Q. Un stagiaire peut-il tenir la base ?**
R. Oui — la revue du vendredi est conçue pour 5 minutes ; mais la case « Vérifié sur mission » se coche par la fondatrice seule (c'est la preuve d'application).

**Q. Import des anciennes données ?**
R. Oui, une passe : reprendre les 10 fiches de `07_Fiches.md` et créer 10 pages ; les « 28 titres » de l'ancienne liste sans fiche sont archivés d'office.

## Ce fichier dans le réseau du vault

- `07_Fiches.md` : format amont ; `09_Comparatif.md` : politique d'achat ; `08_Parcours.md` : calendrier d'exécution.
- `01_Strategy/` : la base PROSPECTS fournit le patron de pipeline réutilisé ici.
- `04_Skills_To_Learn/09_SEO_Content_Engine/05_Calendrier_Editorial.md` : la vue « Appliqué » alimente le stock d'anecdotes des articles.

> **Lecture pro :** le vendredi soir, la revue de la Biblio prend 5 minutes et se résume à une question : « est-ce que quelque chose, cette semaine, est passé de Fiche écrite à Appliqué ? » — deux vendredis consécutifs sans réponse oui = on ferme le rayon lectures jusqu'au prochain déclencheur de mission.
