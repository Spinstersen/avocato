# 04 — Spécifications du site web conforme (déontologie + UX + SEO)

> ⚠️ **MISE À JOUR 23/08/2026 — Loi n° 66.23 promulguée (dahir 1-26-75 du 18/08/2026) et publiée au BO n° 7536 du 20/08/2026 : la loi 28-08 est ABROGÉE.** Les numéros d'articles ci-dessous (art. 30, 32, 36…) renvoient à l'ancien texte ; **re-vérifier les équivalences dans la loi 66.23** (traçabilité honoraires, stage 2 ans, mandats limités, discipline réformée) avant tout usage en pratique. Détail : `00_START_HERE/12_VEILLE_LEGALE_2025_2026.md` §A2.


Le site web est l'acte permis le plus stratégiquement rentable. Ce fichier donne les spécifications complètes : obligations déontologiques, structure d'arborescence, contenu-type de chaque page, sobriété du design, conformité Loi 09-08, et bonifications SEO.

## 1. Obligations déontologiques applicables au site

### 1.1 Identification de l'avocat

Le site doit afficher de manière claire et accessible :

- Nom et prénom d'exercice.
- Titre : « Avocat au barreau de [Ville] ».
- Numéro d'inscription au tableau (ou mention « inscrit au tableau de l'Ordre des Avocats de [Ville] »).
- Adresse professionnelle.
- Numéro de téléphone professionnel.
- Adresse email professionnelle.
- Domaines d'intervention (sans mention de spécialisation non reconnue).
- Parcours académique et professionnel (diplômes, formations, expériences).
- Mention de la convention d'honoraires (art. 30 Loi 28-08) comme mode de tarification.

### 1.2 Contenu obligatoire

- Mentions légales (éditeur, hébergeur, propriété intellectuelle, contact).
- Politique de confidentialité (Loi 09-08 — voir section 6).
- Conditions générales d'utilisation si le site a une fonction interactive (formulaire, espace client, téléchargement).
- Mention du RIO applicable et du barreau de rattachement.

### 1.3 Contenu interdit

- Slogans promotionnels (« Le cabinet d'avocats le plus réactif de [Ville] »).
- Témoignages clients comparatifs ou valorisants excessivement.
- Promesses de résultat.
- Tarifs détaillés avec mentions « promo » ou « pas cher ».
- Boutons d'appel à l'action agressifs (« Appelez maintenant », « Réservez votre consultation gratuite en 1 clic »).
- Vidéos d'auto-promotion animées en lecture forcée.
- Pop-ups d'incitation.
- Liens sponsorisés vers des sites commerciaux.
- Affichage de logos de clients (sans autorisation écrite, et même avec, à éviter).

### 1.4 Design attendu

- Sobriété : palette sobre (max 3 couleurs, dont une dominante neutre), typographie lisible, blanc dominant.
- Pas de couleurs criardes, pas de néons, pas d'effets d'animation agressifs.
- Photos de qualité professionnelle (pas de stock cliché « justice à Paris »).
- Hiérarchie visuelle claire (titres, sous-titres, paragraphes courts).
- Responsive (mobile-first, la majorité des prospects arrivent par mobile).
- Temps de chargement < 3 secondes.

## 2. Arborescence-type du site d'un avocat d'affaires

```
Accueil
├── À propos
│   ├── Parcours
│   └── Approche
├── Domaines d'intervention
│   ├── Droit des sociétés (création, vie sociale, transmission)
│   ├── Droit commercial (contrats, distribution, concurrence)
│   ├── Droit du numérique (09-08, e-commerce, contrats IT)
│   ├── Propriété intellectuelle
│   └── Contentieux commercial
├── Ressources
│   ├── Blog / Articles
│   ├── Guides PDF téléchargeables
│   ├── FAQ
│   └── Newsletter
├── Missions & Approche
│   ├── Missions ponctuelles
│   ├── Forfaits thématiques
│   └── Abonnement mensuel
├── Actualités
└── Contact
    ├── Coordonnées
    ├── Formulaire sobre
    ├── Plaque & plan d'accès
    └── Mentions légales / Politique de confidentialité
```

## 3. Spécifications page par page

### 3.1 Page d'accueil

**Objectif.** En 3 secondes, le visiteur doit comprendre : qui vous êtes, ce que vous faites, pour qui.

**Structure-type :**

```
[Header]
- Logo sobre : « [Nom] — Avocat d'Affaires »
- Menu : Domaines | Ressources | Missions | Contact

[Hero — sans slogan, sans bouton agressif]
- Titre H1 : « [Nom] [Prénom], Avocat au barreau de [Ville] »
- Sous-titre : « Droit des sociétés, droit commercial et conformité numérique
  pour entreprises, freelances et e-commerçants marocains. »
- Bouton sobre : « En savoir plus » ou « Prendre contact »

[Bloc domaines]
- 4 à 6 cartes : titre + 1 ligne descriptive
- Lien vers la page dédiée

[Bloc ressources mises en avant]
- 3 derniers articles
- Lien « Voir toutes les ressources »

[Bloc présentation courte]
- 1 paragraphe + photo sobre
- Lien vers « À propos »

[Bloc contact]
- Coordonnées
- Lien vers formulaire

[Footer]
- Mentions légales
- Politique de confidentialité
- Barreau
- Plan du site
```

### 3.2 Page « À propos »

**Objectif.** Construire la confiance par le parcours, pas par le slogan.

Structure :
- Photo sobre (pas de mise en scène).
- Paragraphe d'introduction : qui vous êtes, ce qui vous anime, votre angle professionnel.
- Parcours académique (diplômes, formations).
- Parcours professionnel (expériences, cabinets précédents, missions notables anonymisées).
- Approche (votre méthode, votre rapport au client).
- Engagement déontologique (rappel du respect de la loi 28-08 et du RIO).
- Domaines d'intervention détaillés.

### 3.3 Pages « Domaines d'intervention »

Une page par domaine, structurée ainsi :

- Titre H1 : intitulé du domaine (ex : « Création et vie des sociétés »).
- Sous-titre : « Comment j'accompagne les entreprises sur ce sujet. »
- Section 1 : le domaine en 200 mots (cadre juridique, enjeux).
- Section 2 : typologie de missions (création SARL, transformation, cession de parts, assemblées, etc.).
- Section 3 : exemple de mission type (anonymisé, étude de cas pédagogique).
- Section 4 : ressources associées (articles, guides).
- Section 5 : prise de contact sobre.

### 3.4 Pages « Articles »

Format article long :
- Titre H1 précis (long-tail).
- Date et auteur.
- Sommaire.
- Introduction.
- Développement structuré (H2, H3).
- Exemples concrets, schémas, tableaux.
- Synthèse en fin d'article.
- Liens internes vers ressources connexes.
- Signature + bio courte.

### 3.5 Page « Contact »

La plus délicate : elle doit permettre le contact sans le solliciter.

Structure :
- Coordonnées professionnelles (adresse, téléphone, email).
- Plan d'accès (carte Google Maps intégrée).
- Formulaire sobre : nom, email, message. Pas de champ « type de besoin » avec liste de missions à cocher (trop sollicitant). Pas de bouton « réservez maintenant ».
- Texte : « Pour toute question relative à une mission, vous pouvez me contacter aux coordonnées ci-dessous. »
- Réponse indiquée dans un délai raisonnable (48h à 72h).

## 4. La sobriété du formulaire de contact

Le formulaire est la frontière entre l'inbound permis et la sollicitation interdite. Spécifications :

- Champs minimum : nom, email, message. Optionnel : téléphone.
- Pas de champ « budget », « urgence », « type de problème » à cocher.
- Pas de case à cocher « Je souhaite être recontacté pour une consultation ».
- Bouton : « Envoyer le message » (pas « Réservez », pas « Demandez un devis »).
- Texte d'accompagnement : « Pour me contacter, remplissez ce formulaire. Je vous réponds dans un délai de 48h à 72h. »

## 5. SEO : le levier no-ads le plus puissant

Le SEO est l'art d'être trouvé quand un prospect cherche à résoudre un problème. C'est l'antidote naturel à la publicité.

### 5.1 Principes SEO pour avocat

- **Long-tail.** Ciblez des requêtes très spécifiques (« modèle CGV e-commerce Maroc », « création SARL-AU au Maroc étapes », « conformité loi 09-08 PME »). Ces requêtes ont peu de volume mais une intention claire et une concurrence faible.
- **Contenu de fond.** Un article de 2 000 mots bien structuré rapportera plus qu'une page promotionnelle.
- **Maillage interne.** reliez vos articles entre eux et vers vos pages missions.
- **Mises à jour.** Google valorise les contenus actualisés.
- **Local SEO.** Google Business Profile complète, avis clients spontanés (ne pas solliciter), photos du cabinet, articles publiés.

### 5.2 Calendrier éditorial-type (12 semaines)

| Semaine | Article | Requête cible |
| :--- | :--- | :--- |
| 1 | Créer une SARL-AU au Maroc : 8 étapes | « créer SARL-AU Maroc » |
| 2 | Loi 09-08 : qui doit déclarer à la CNDP ? | « loi 09-08 CNDP obligatoire » |
| 3 | Contrat prestation freelance : 7 clauses essentielles | « contrat prestation Maroc » |
| 4 | CGV e-commerce Maroc : mentions obligatoires | « CGV e-commerce Maroc » |
| 5 | Auto-entrepreneur vs SARL : que choisir ? | « autoentrepreneur SARL comparatif » |
| 6 | TVA sur prestations offshore : ce que dit la loi | « TVA offshore Maroc » |
| 7 | Facture conforme Maroc : 10 mentions obligatoires | « facture conforme Maroc » |
| 8 | Résiliation contrat commercial : mode d'emploi | « résiliation contrat Maroc » |
| 9 | Levée de fonds startup : aspects juridiques | « levée de fonds Maroc juridique » |
| 10 | Cession de parts sociales : démarches | « cession parts SARL Maroc » |
| 11 | Registre 09-08 : tenue et conservation | « registre loi 09-08 Maroc » |
| 12 | Bilan déontologique avocat sur les réseaux | « avocat réseaux sociaux Maroc » |

Chaque article : 1 500 à 3 000 mots, structuré, illustré, référencé. Voir `03_Acquisition_Without_Ads/02_SEO_Google_Business_Educational_Content.md`.

## 6. Conformité Loi 09-08 du site web

Tout site qui collecte des données (formulaire, cookies analytics, logs serveur) est un **traitement de données à caractère personnel** au sens de la loi 09-08.

### 6.1 Obligations

- **Déclaration CNDP** : si le traitement est automatisé, structuré, et permet d'identifier des personnes. En pratique, déclarer le site si formulaire de contact + cookies analytics.
- **Politique de confidentialité** : page dédiée, accessible depuis le footer.
- **Bannière de cookies** : consentement explicite pour les cookies non essentiels.
- **Droit d'accès, rectification, opposition** : mentionner et traiter les demandes.
- **Sécurité** : HTTPS obligatoire, sauvegardes, hébergement maîtrisé.

### 6.2 Politique de confidentialité-type (structure)

1. Qui sommes-nous (identification, coordonnées, barreau).
2. Quelles données nous collectons (formulaire : nom, email, message ; cookies : analytique).
3. Pourquoi (répondre à la demande de contact, mesurer l'audience).
4. Base légale (consentement, intérêt légitime).
5. Combien de temps nous conservons (durée raisonnable — 3 ans pour un contact sans suite).
6. Avec qui nous partageons (hébergeur, outil d'email, pas de tiers commerciaux).
7. Vos droits (accès, rectification, opposition, portabilité, limitation).
8. Comment les exercer (email dédié).
9. Réclamations CNDP (coordonnées).

### 6.3 Cookies analytics

- Préférer un outil « privacy-first » (Plausible, Fathom, Matomo on-premise) à Google Analytics.
- Si Google Analytics : bannière de consentement + anonymisation IP + pas de partage avec Google Ads.
- Pas de pixel Facebook, pas de tracking publicitaire.

## 7. Hébergement et nom de domaine

### 7.1 Nom de domaine

Format recommandé : `votrenom-avocat.ma` ou `cabinet-votrenom.ma`. Le `.ma` est local et crédible. Le `.com` est acceptable pour une audience internationale.

À éviter : noms trop commerciaux (`avocat-affaires-casablanca.ma`), diminutifs suspects, extensions peu crédibles.

### 7.2 Hébergement

- Hébergeur sérieux (éviter l'hébergement gratuit).
- Localisation : Maroc ou UE. Si UE, s'assurer que la politique de confidentialité le mentionne (transfert hors Maroc).
- HTTPS obligatoire (Let's Encrypt gratuit).
- Sauvegardes automatiques.
- Certificat DMARC/SPF pour l'email.

## 8. Stack technique recommandée

Pour un avocat pas technicien, mais voulant un site rapide, sobre, maîtrisé :

| Option | Stack | Avantages | Inconvénients |
| :--- | :--- | :--- | :--- |
| **Site statique (recommandé)** | Hugo / Eleventy + Markdown + Netlify/Vercel | Rapide, sécurisé, gratuit, maîtrise totale | Demande un peu de technique |
| **Notion / Carrd en page simple** | Notion + Carrd + custom domain | Ultra-simple, rapide à lancer | Limites SEO, customisation |
| **WordPress** | WP + thème sobre + plugins minimum | Flexible, écosystème, pas de code | Maintenance, sécurité, lenteur |
| **Webflow** | Webflow + custom domain | Design pro sans code | Coût mensuel, dépendance |

Voir `04_Skills_To_Learn/01_Legal_Tech_Stack.md`.

## 9. Accessibilité et qualité

- Sémantique HTML correcte (H1, H2, H3, alt sur images, labels sur formulaires).
- Contraste suffisant (WCAG AA).
- Taille de police lisible (16px minimum sur mobile).
- Pas de texte en image.
- Sitemap XML soumis à Google Search Console.
- Robots.txt propre.

## 10. Mesure et KPI

Sans tracking publicitaire, on peut mesurer :

- Trafic organique (Search Console — impressions, clics, positions).
- Pages vues (analytics privacy-first).
- Demandes de contact via formulaire (comptage manuel).
- Demandes par téléphone (demande « comment m'avez-vous trouvé ? »).
- Demandes par email (même question).

Objectif indicatif : un site qui fonctionne produit 5 à 15 demandes de contact par mois après 6 à 12 mois d'effort SEO.

## 11. Checklist de mise en service

Avant de mettre le site en ligne :

- [ ] Identification complète de l'avocat (nom, barreau, adresse, contact).
- [ ] Parcours académique et professionnel.
- [ ] Domaines d'intervention sans spécialisation non reconnue.
- [ ] Mentions légales (éditeur, hébergeur, propriété intellectuelle).
- [ ] Politique de confidentialité conforme Loi 09-08.
- [ ] Bannière de cookies si analytics.
- [ ] Déclaration CNDP si nécessaire.
- [ ] Formulaire sobre (sans incitation).
- [ ] Design sobre (palette, typographie, responsive).
- [ ] HTTPS actif.
- [ ] Sitemap et robots.txt.
- [ ] Google Search Console configuré.
- [ ] Google Business Profile complète.
- [ ] Premiers 5 articles de fond publiés (le site ne sort pas vide).
- [ ] Avis RIO de votre barreau si nécessaire.

## 12. FAQ

**Q : Puis-je avoir un site en plusieurs langues (AR/FR/EN) ?**
R : Oui, recommandé pour le positionnement trilingue. Implémentation : soit un sous-dossier par langue (`/en/`, `/ar/`), soit un sous-domaine (`en.site.ma`).

**Q : Puis-je afficher mes tarifs ?**
R : Zone grise tolérée par la plupart des barreaux sous forme de gammes indicatives. À éviter sous forme de catalogue détaillé promotionnel.

**Q : Puis-je intégrer un chatbot ?**
R : À éviter. Un chatbot qui pousse au contact est sollicitant. Un chatbot qui répond à des questions juridiques factuelles est plus défendable mais soulève le risque de conseil juridique en ligne (interdit en l'absence de convention d'honoraires).

**Q : Puis-je diffuser des avis clients notés ?**
R : Risqué. Ne sollicitez pas. Si des avis spontanés apparaissent (Google Business), laissez-les mais ne les mettez pas en avant sur votre site.

**Q : Le site doit-il être déclaré formellement à mon Ordre ?**
R : Selon le RIO de votre barreau. En pratique, signaler le site à la commission déontologie est une protection utile. Vérifiez.

---

**Suivant :** `05_Reseaux_Sociaux_LinkedIn_Cadre.md` — Cadre d'utilisation des réseaux sociaux.
