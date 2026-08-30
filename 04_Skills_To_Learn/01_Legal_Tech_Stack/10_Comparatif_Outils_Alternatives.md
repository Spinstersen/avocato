# 10 — Comparatif Outils & Alternatives (dont souveraines/UE)

> **Comparer pour choisir, pas pour hésiter.** Chaque ligne : le recommandé, les alternatives, le déclencheur de switch, et le prix « ≈ août 2026, à vérifier ». La colonne UE n'est pas un luxe marketing : c'est ce qui te évite une autorisation de transfert CNDP (loi 09-08, art. 31) sur les données identifiables.

## POURQUOI une matrice et pas un classement

Un outil se juge sur trois axes seulement : (1) le job qu'il remplace en heures ; (2) où vivent les données qu'il touche (UE/local vs hors Maroc) ; (3) la friction de sortie (tes données sont-elles extractibles ?). Le reste — beauté du dashboard, intégrations « illimitées » — est du marketing.

## COMMENT — la matrice

| Besoin | Recommandé | Alternative UE/souveraine | Alternative autre | Déclencheur de switch |
|---|---|---|---|---|
| Second brain / CRM | Notion Plus ≈10-12 $ | **Nextcloud + tables locales** ; Obsidian (gratuit, markdown) | Anytype (local-first) | Besoin 100 % offline ou données non pseudonymisables |
| Suite email/office | Google Workspace ≈6 $ | **OVH Email Pro** (FR) ; Infomaniak kSuite (CH) | Zoho ≈1-4 $ | Barreau/clients exigeant hébergement UE strict |
| Drive de pièces sensibles | Coffre Cryptomator sur Drive | **Nextcloud (OVH ≈5-25 €/mois)** ; **Proton Drive (≈10 €/mois)** | Tresorit | Tout ce qui doit rester chiffré quitte le cloud US |
| Prise de RDV | Cal.com gratuit/self-host | **Cal.com auto-hébergé (VPS ≈5-10 €/mois)** | Calendly ≈10 $ | Volume ou exigence UE → self-host |
| Formulaire | Tally gratuit / Plus ≈24 $ | **Fillout (UE)** | Jotform, Google Forms | CNDP stricte ou besoin de champs conditionnels lourds |
| Signature électronique | Yousign ≈19-25 €/mois (FR) | **Docuseal (open source FR, auto-hébergeable ≈0 + VPS)** | Docusign (US, cher), Dropbox Sign | Souveraineté assumée ou volume → Docuseal self-host |
| Analytics | Plausible ≈9-14 $ (UE) | **Matomo auto-hébergé (gratuit + VPS)** | Umami | >50-100k vues ou besoin e-commerce → Matomo |
| Vidéo client | Loom Business ≈12-15 $/user | OBS + lien Drive non public (gratuit) | Tella | Budget serré → OBS ; édition pro → Screen Studio (Mac) |
| Design | Canva Pro ≈12-15 $ | **Penpot (open source)** pour les maquettes | Figma | >20 exports/mois et équipe → Figma ; 0 budget → Penpot |
| Automatisation | Make ≈9 $ (UE) | **n8n auto-hébergé (gratuit + VPS)** | Zapier ≈20-30 $ (US) | >5 scénarios ou données qui transitent → n8n |
| Emailing | Brevo ≈0-25 €/mois (FR) | Brevo ( déjà UE) | Mailchimp (US) | Besoin d'envoyer des newsletters sobre → Brevo, pas Mailchimp |
| Mots de passe | Bitwarden ≈10 $/an | **KeePassXC (gratuit, local)** | 1Password ≈3-5 $/mois | Le gestionnaire local si tu n'externalises même les mots de passe |

## Les trois familles d'arbitrage

### 1. Le tout-managé (démarrer vite)

Notion + Workspace + Calendly + Tally + Yousign + Plausible + Zapier. ≈70-100 $/mois, 0 maintenance, données majoritairement hors Maroc → pseudonymisation systématique (fiche 09) et registre à jour. C'est la stack de la fiche 01.

### 2. La stack sobre UE (le cabinet qui assume le temps contre la souveraineté)

Nextcloud OVH (email+drive+cal) + Cal.com self-host + Fillout + **Docuseal** + **Matomo** + Make/n8n. ≈30-60 €/mois mais 2-3 sames de setup et une maintenance réelle (certificats, mises à jour). Choix rationnel à partir de ~25 clients ou si un client institutionnel te pose la question de l'hébergement.

### 3. L'hybride (recommandé à M6+)

Managé sur ce qui est pseudonymisé (Notion, Calendly, Loom) ; UE/local sur ce qui est identifiable (Docuseal/Yousign pour les conventions, Nextcloud/Proton pour les pièces, Matomo pour l'audience). Le critère n'est pas le prix : c'est **la sensibilité de la donnée qui traverse l'outil**.

## COMMENT switcher sans tout casser (protocole)

1. **Extractibilité d'abord** : avant d'adopter un outil, vérifier l'export (Notion → Markdown/CSV existe ; Tally → CSV existe). Un outil sans export = otage.
2. **Migration par flux, pas par outil** : ne pas « migrer Notion vers Obsidian », mais « le flux mission ne dépend plus de Notion » — un flux à la fois, les deux outils coexistent 30 jours.
3. **Tester l'aller-retour** : export complet + restauration sur une machine propre avant de désabonner l'ancien.
4. Mettre à jour le **registre** (nouveau destinataire = nouvelle ligne).

## Ce que les prix « à vérifier » veulent dire

Les chiffres de ce dossier sont des ordres de grandeur constatés en août 2026, marqués « ≈ ». Avant tout achat ou toute promesse client : vérifier la page pricing de l'éditeur. Une facture client ne se construit jamais sur un tarif de mémoire.

## Les pas-à-pas de switch (3 migrations types)

### Notion → Obsidian (si le cloud US devient insupportable)

1. Export complet Notion (Markdown & CSV) → importer dans un vault Obsidian local.
2. Recréer les 3 vues vitales (Kanban missions via plugin, dashboard MITs, recherche) — accepter la perte du partage client un clic : le client reçoit des PDF, plus rien de live.
3. Trier : ce qui partait dans Notion par habitude vs par nécessité ; l'export Notion reste en archive consultable 12 mois.
4. Décision à J+30 : si tu rouvres Notion pour partager un doc, le switch n'était pas mûr — c'est une information, pas un échec.

### Yousign → Docuseal (souveraineté assumée)

1. VPS UE (≈5-10 €/mois) + instance Docker Docuseal ; domaine propre + SMTP (OVH/Brevo) pour les envois.
2. Recréer les 3 templates (convention, lettre de mission, PV) — les champs « lu et approuvé » et OTP se reparamètrent à l'identique.
3. Faire signer 2 conventions blanches de test (toi + un compte de test) et vérifier le certificat/piste d'audit avant le premier client.
4. Yousign reste actif 1 mois (un seul dossier sensible en parallèle le temps de la confiance).

### Google Analytics → Plausible (le switch qui n'attend pas)

1. Retirer le tag GA4 (le risque court à chaque page vue).
2. Coller Plausible (fiche 07), vérifier temps réel.
3. Registre : remplacer la ligne GA par la ligne Plausible ; si un client ou l'admin te demande pourquoi : la fiche 07 est la réponse.

## Le vrai coût de possession (TCO) — ce que le prix mensuel cache

| Outil | Abonnement | + Maintenance estimée/mois | Coût réel en temps |
|---|---|---|---|
| Notion managé | ≈10-12 $ | 15 min (exports, permissions) | Négligeable |
| Suite Google | ≈6 $ | 5 min | Négligeable |
| Self-host (Matomo, n8n, Docuseal, Cal.com) | ≈5-10 € de VPS | 1-3 h (mises à jour, sauvegardes, certificats) | **C'est le vrai prix** |
| Yousign | ≈19-25 € | 10 min (templates, archivage) | Négligeable |

Le self-host n'est « gratuit » qu'en cash : il se paie en soirées. La règle du vault : l'auto-hébergement se déclenche par une contrainte (souveraineté, volume, refus client), jamais par économie espérée.

## Procédure de test avant switch (2 semaines, réversible)

1. **Périmètre** : un seul flux testé (ex : signature) sur des dossiers fictifs ou non sensibles.
2. **Jumeau** : l'ancien outil reste actif 14 jours — pas de big bang.
3. **Critères écrits avant** : ce qui doit être égal ou meilleur (temps d'archivage, coût, extraction).
4. **Jour 15** : go/no-go écrit dans la fiche KPI ; si go, l'ancien outil meurt après export vérifié (le fichier d'export s'appelle `export_yousign_2026-09-15.zip`, pas « export »).
5. **Registre** : destinataires mis à jour le jour du go.

## Ce qu'il ne faut jamais comparer

- **Notion vs Obsidian sans contexte d'équipe** : si un seul utilisateur, le partage ne compte pas ; à deux, la friction de sync compte double.
- **Docusign vs Yousign au prix seul** : Docusign facture le volume, Yousign l'abonnement ; à 5 signatures/mois, la comparaison s'inverse chaque année — calcule sur ton rythme réel.
- **Outils que tu n'utiliserais pas** : comparer « pour l'article » est du contenu, pas une décision ; ne l'écris jamais comme une recommandation de cabinet.

## Erreurs classiques

1. Payer 3 alternative-tool « au cas où » — un switch se déclenche (colonne 5), il ne se spécule pas.
2. Confondre « UE » et « conforme » : Docuseal auto-hébergé est conforme si le registre, l'information des personnes et les durées suivent — l'outil ne fait pas la conformité.
3. Migrer par snobisme technique (n8n le week-end, mission bâclée le lundi) : la stack sert les missions, jamais l'inverse.

> **Lecture pro :** la colonne qui compte vraiment dans ce tableau est « déclencheur de switch » — c'est elle qui transforme un collectionneur d'outils en éditeur de système. Si aucun déclencheur n'est atteint, la réponse est : garde l'outil actuel et recommence à facturer.
