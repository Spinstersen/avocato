# 10 — Sécurité, backup et continuité du cabinet automatisé

> Chaque outil ajouté est une porte d'entrée de plus. Ce fichier installe les quatre couches : comptes verrouillés (2FA + gestionnaire), données sauvegardées en 3-2-1, accès au moindre privilège, et un plan d'incident écrit AVANT l'incident.

**Temps de lecture : 10 min · Niveau : obligatoire · Piste : 04_Skills_To_Learn/18_AI_Auto**

**Liens :** Sécurité basique `../01_Legal_Tech_Stack/09_Securite_Backup_09-08.md` (basique — ici on approfondit) · Niche 09-08 `../../02_Niches_Deep_Dive/03_Loi_09-08_GDPR_Compliance/00_INDEX.md` · Structure Drive `08_GoogleDrive_Structure_Conformite_0908.md`

## Objectifs

- Verrouiller 100 % des comptes critiques avec 2FA et gestionnaire de mots de passe en moins de 2 heures.
- Mettre en place la règle 3-2-1 adaptée à un cabinet juridique marocain.
- Disposer d'un plan d'incident d'une page, testé au moins une fois par an.

## Prérequis

- Inventaire des comptes réalisé (email métier, Notion, Drive, Yousign, Stripe, orchestrateur, Loom).
- Registre 09-08 à jour — l'obligation de sécurité des traitements s'y documente.
- Une clé USB chiffrée ou disque externe dédié au cabinet.

## TL;DR

**4 couches : (1) 2FA partout + gestionnaire de mots de passe ; (2) backup 3-2-1 — 3 copies, 2 supports, 1 hors ligne ; (3) moindre privilège sur chaque partage ; (4) plan d'incident écrit : détecter → couper → évaluer → documenter → informer.** Test de restauration trimestriel obligatoire : un backup jamais restauré n'est pas un backup, c'est une croyance.

## Contenu principal

### Couche 1 — Comptes

| Mesure | Application | Détail |
|---|---|---|
| Gestionnaire de mots de passe | Tous les comptes cabinet | Coffre unique, mot de passe maître long ; interdiction absolue des mots de passe réutilisés |
| 2FA | Email métier, Stripe, Notion, Drive, orchestrateur ⚠️ prioritaire | App d'authentification préférée au SMS ; codes de récupération imprimés et rangés au coffre |
| Emails distincts | Compte admin vs compte travail | La perte du compte email = perte de tous les resets ; le compte admin ne sert qu'à ça |
| Sessions propres | Déconnexion des appareils inutilisés | Revue trimestrielle des appareils connectés sur Google/Notion/Stripe |

⚠️ Le compte email métier est la clef de voûte : il reçoit les réinitialisations de tout le reste. Sa protection (mot de passe unique + 2FA app) passe avant toute autre mesure technique de cette piste.

### Couche 2 — Backup 3-2-1

```text
3 COPIES   : (a) original dans l'outil (Drive/Notion)
             (b) copie cloud secondaire OU second espace
             (c) copie locale hors ligne (disque externe)
2 SUPPORTS : cloud + disque physique
1 HORS SITE: disque chez notaire/collègue/coffre — pas dans le même local

RYTHME     : export CSV hebdo Notion (Zap Z14) → _Backup
             synchronisation disque externe HEBDO (15 min, rituel vendredi)
             rotation mensuelle vers le lieu hors site
TEST       : restauration TRIMESTRIELLE d'un fichier choisi au hasard,
             consignée dans le journal (fichier testé, date, résultat)
```

Ce que le 3-2-1 couvre : panne d'éditeur, suppression accidentelle, rançongiciel (la copie hors ligne débranchée échappe au chiffrement), départ d'un collaborateur. Ce qu'il ne remplace pas : la purge légale (fichier 08) — on sauvegarde ce qui doit exister, pas tout ce qui a existé.

### Couche 3 — Accès au moindre privilège

Principe : chacun n'accède qu'à ce que sa mission exige. Concrètement : matrice de permissions Drive (fichier 08), rôles limités dans Notion (les prospects ne voient que leur fiche via espaces partagés), Stripe accessible aux associés seulement, orchestrateur administré par UNE personne avec journal des scénarios. Départ d'un collaborateur : procédure écrite de 20 minutes — révocation Drive, désactivation Notion, changement des mots de passe partagés, revue des Zaps personnels. Cette procédure existe par écrit AVANT le premier départ, pas après.

### Couche 4 — Plan d'incident (1 page)

```text
DÉTECTER    Signaux : alerte connexion inhabituelle, Zap en erreur massif,
            fichier manquant, client signalant un message étrange.
COUPER      Révoquer sessions + changer mots de passe du compte touché,
            suspendre les Zaps liés (éviter la propagation automatique).
ÉVALUER     Quelles données ? Quels clients ? Quelle durée ? Qui a eu accès ?
            Gravité : simple incident / atteinte données personnelles.
DOCUMENTER  Fait un rapport horodaté immédiatement (heure, constats, actions).
INFORMER    Selon gravité : personnes concernées, CNDP si traitement touché
            (cohérence avec vos engagements registre), assurance RC pro si
            contrat, barreau si devoir s'impose. En cas de doute → conseil.
REJOUER     Post-mortem 30 min : cause racine, mesure corrective, mise à jour
            du plan et de la checklist de cette piste.
```

Le plan s'imprime et vit en papier dans le coffre — l'incident peut précisément vous priver d'accès numérique.

### Continuité : quand un outil tombe

Chaque étage de la carte architecture a son mode dégradé (posé fichier 01) : convention manuscrite scannée si Yousign tombe ; virement référencé si Stripe indisponible ; carnet + exports CSV si Notion inaccessible ; envoi manuel depuis templates si l'orchestrateur est en panne. Les vidéos SOP internes (fichier 07) permettent à un collègue de reprendre vos processus sans vous — c'est la définition opérationnelle de la continuité.

## Cas pratique chiffré

Scénario réaliste : ransomware sur le PC du cabinet un jeudi soir. Cabinet SANS dispositif : fichiers chiffrés, Drive sync chiffré aussi, aucun export Notion, mot de passe email identique à trois autres services (un compromis = tout compromis). Reconstruction : semaines d'arrêt, pièces de procédure perdues, responsabilité engagée — coût estimable en centaines de milliers de DH et en réputation. Cabinet AVEC dispositif : copie hors ligne du 13 août restaurée le vendredi matin (45 min), exports CSV Notion intacts, comptes isolés non touchés, dossiers reconstruits à J+1 avec retard limité aux 10 derniers jours de courriers sortants (récupérables chez les destinataires). Coût total de l'incident : ~6 h de travail + un post-mortem. Investissement préalable qui a fait la différence : ~3 h de configuration + 15 min/semaine de rituel — le meilleur ratio risque/protection du cabinet entier.

## Erreurs Top 5 (avec coût)

| # | Erreur | Coût |
|---|---|---|
| 1 | Mot de passe réutilisé entre email perso, métier et outils | Un service piraté = cabinet entier exposé |
| 2 | 2FA par SMS seulement | Interception SIM possible ; bascule app ≈ 30 min |
| 3 | Backup sur le même disque/local que l'original | Rançongiciel chiffre les deux ; perte totale |
| 4 | Jamais tester la restauration | Découverte du backup vide AU moment de besoin — catastrophe |
| 5 | Aucun plan d'incident écrit | Improvisation sous stress, décisions contradictoires, heures perdues |

## Checklist 12 points

- [ ] Gestionnaire de mots de passe installé, 0 mot de passe réutilisé
- [ ] 2FA active sur email métier, Stripe, Notion, Drive, orchestrateur
- [ ] Codes de récupération imprimés et rangés au coffre
- [ ] Compte admin distinct du compte de travail
- [ ] Copie hors ligne hebdomadaire (rituel vendredi 15 min)
- [ ] Rotation mensuelle vers lieu hors site effective
- [ ] Export CSV Notion hebdo fonctionnel (Z14)
- [ ] Test de restauration trimestriel consigné au journal
- [ ] Matrice de permissions Drive revue trimestriellement
- [ ] Procédure de départ collaborateur écrite (20 min chrono)
- [ ] Plan d'incident imprimé dans le coffre
- [ ] Post-mortem annuel simulé une fois (exercice table-top)

## QCM

**Q1.** Que signifie 3-2-1 ?
- A. Trois outils, deux backups, un jour par mois
- B. Trois copies des données, deux supports différents, une copie hors site
- C. Trois mots de passe, deux emails, une clé USB
- D. Une règle fiscale

> **Réponse : B —** trois copies (original + cloud secondaire + disque local), sur deux supports distincts, dont une hors du local cabinet. La copie hors ligne débranchée est celle qui survit au rançongiciel.

**Q2.** Pourquoi protéger l'email métier avant tout ?
- A. Parce qu'il contient les mails des clients
- B. Parce qu'il centralise toutes les réinitialisations de mots de passe des autres comptes
- C. Pour l'image du cabinet
- D. À cause de la Loi 09-08 uniquement

> **Réponse : B —** qui contrôle votre email contrôle vos resets : Stripe, Notion, Drive, orchestrateur. Mot de passe unique + 2FA par application + codes de récupération au coffre = verrouillage de la clef de voûte.

**Q3.** À quelle fréquence teste-t-on une restauration ?
- A. Jamais si le backup tourne bien
- B. Trimestriellement, fichier au hasard, résultat consigné
- C. Une fois, lors de l'installation
- D. Seulement après un incident

> **Réponse : B —** un backup non restauré est une hypothèse, pas une protection. Le test trimestriel aléatoire transforme la croyance en preuve, consignée dans le journal — exigence minimale de diligence.

## Fiches révision

**Carte 1 — Les 4 couches.** Recto : citez-les. Verso : comptes (2FA + gestionnaire), données (3-2-1), accès (moindre privilège), incident (plan papier).

**Carte 2 — Le 3-2-1.** Recto : la règle ? Verso : 3 copies · 2 supports · 1 hors site ; rituel hebdo + rotation mensuelle + test trimestriel.

**Carte 3 — Les 5 temps de l'incident.** Recto : la séquence ? Verso : Détecter → Couper → Évaluer → Documenter → Informer (+ rejouer en post-mortem).

## EN - Key takeaways

Every added tool is another door; four layers close them. Accounts first: password manager everywhere with zero reused passwords, authenticator-app 2FA on the keystone accounts — business email above all, since it controls every reset — plus recovery codes printed and locked away. Data second: the 3-2-1 rule — three copies, two media, one offline and off-site — executed as a fifteen-minute Friday ritual, monthly off-site rotation, and a quarterly random restoration test logged in writing; an unrestored backup is a belief, not a safeguard. Access third: least privilege through the Drive permission matrix, restricted Notion roles, associates-only Stripe, and a written twenty-minute offboarding procedure ready before the first departure. Fourth, a one-page printed incident plan — detect, cut, evaluate, document, inform — rehearsed yearly. Worked scenario: a ransomware Friday costs an unprotected practice months; a protected one recovers by Monday morning after forty-five minutes of restoration.

## AR - ملخص ومصطلحات

| FR | AR |
|---|---|
| Authentification à deux facteurs | المصادقة الثنائية |
| Gestionnaire de mots de passe | مدير كلمات المرور |
| Sauvegarde hors ligne | نسخة احتياطية غير متصلة |
| Moindre privilège | مبدأ أقل صلاحية |
| Plan de continuité | خطة استمرارية النشاط |
| Restauration testée | استرجاع مجرَّب |

- Darija : "2FA f kol compte, w khassassan l-email — howa li kay-sift lik ga3 les-codes."
- Darija : "Dir backup kola jem3a w jarreb t-restori mera f trimestre — bla jarriba, machi backup."

---
**Sources primaires :** cndp.ma (Loi 09-08, délib. 40-22) · sgg.gov.ma · CNIL.fr (référence RGPD comparative). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Aucune donnée client dans une IA sans anonymisation préalable (secret art.36). QCM pédagogique — aucun certificat.
