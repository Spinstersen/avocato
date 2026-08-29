# 02 — Douleurs juridiques Loi 09-08 et GDPR

## 1. Absence de registre des traitements

### Cadre

- Loi 09-08 : tenue d'un registre des traitements — obligation du régime des formalités préalables (numérotation interne du vault « art. 23 » non vérifiée au texte consolidé : transposer depuis `sgg.gov.ma` ; cf. `08_Jurisprudence/01_Loi_09-08_CNDP_Sanctions.md` — grille sanctions).
- Contenu : finalité, catégories de données, catégories de personnes, durées de conservation, destinataires, mesures de sécurité, transferts.
- Côté GDPR : l'équivalent est le registre art. 30, plus détaillé (base légale par traitement, responsable vs sous-traitant, DSR metrics).

### Sanction

- Mise en demeure puis amende — première pièce demandée en contrôle CNDP. Sans registre, le contrôle est perdu d'avance.

### Le reflet pratique

- Hicham a 8-15 traitements (CRM, analytics, emailing, RH, logs, backups) et n'en a cartographié aucun. La douleur n'est pas « je n'ai pas de document », c'est « je ne sais pas où sont mes données ».

## 2. Traitements non déclarés / données sensibles sans autorisation

### Cadre

- Loi 09-08 art. 12-14 : déclaration préalable à la CNDP pour les traitements courants ; **autorisation préalable** pour les données sensibles (santé, biométrie, géolocalisation, opinions, données bancaires selon nature).
- GDPR art. 6 : base légale pour chaque traitement (consentement, contrat, intérêt légitime...) — l'absence de base identifiée est l'erreur n°1 des DPA remplis au hasard.

### Sanction

- Volet pénal loi 09-08 (chap. art. 52-65) : **art. 64 — traitement sans formalités préalables : amende 10 000 à 100 000 DH** ; art. 65 — collecte frauduleuse/déloyale/illicite : emprisonnement jusqu'à 3 ans + amende. Grille complète et cas d'espèce : liste officielle « infractions et sanctions » publiée sur `cndp.ma`. Le réflexe administratif réel est la mise en demeure avec délai, l'injonction de cesser suivant les cas (cf. cas type « clinique » `08_Jurisprudence/01_...` §2 — illustration, pas un précédent publié).

### Le reflet pratique

- La healthtech qui « déclare » un traitement de dossiers patients : la déclaration ne suffit pas, il faut autorisation. Confondre les deux = 6 mois de procédure perdus.

## 3. Mentions et information des personnes absentes

### Cadre

- Loi 09-08 art. 9-10 : obligation d'information (identité du responsable, finalité, destinataires, droits, comment les exercer).
- GDPR art. 13-14 : politique de confidentialité structurée, couche par couche.

### Sanction

- Amende + injonction ; surtout : le client UE qui lit le site et ne trouve pas de politique de confidentialité = red flag immédiat en legal review.

### Le reflet pratique

- Site vitrine sans mentions, pas de page « Confidentialité », formulaire de contact qui collecting des emails sans mention de durée de conservation.

## 4. Cookies et bannière consentement non conformes

### Cadre

- Décret 2-10-450 pris pour l'application de la Loi 09-08 + doctrine CNDP : consentement explicite pour les cookies non essentiels.
- GDPR : jurisprudence CJUE Planet49 (C-673/17) — les cases pré-cochées ne sont pas un consentement ; bannière « Continuer = accepter » non conforme.

### Sanction

- CNIL (France) : sanctions records sur cookies (Amazon 35 M€ 2020, Google 150 M€). CNDP : le sujet monte, les contrôles sur plainte existent.

### Le reflet pratique

- Le pixel Meta + Google Analytics taggés plein pot sur le site e-commerce sans banner wall. La douleur naît quand le client UE ou l'agence média en parle.

## 5. Sécurité des données non assurée

### Cadre

- Loi 09-08 art. 14 : obligation de sécurité et de confidentialité (mesures techniques : chiffrement, contrôle d'accès ; organisationnelles : procédures, habilitations, formation).
- GDPR art. 32 : « mesures techniques et organisationnelles appropriées » — c'est exactement ce que le DPA du client UE va auditer.

### Sanction

- En cas de fuite : responsabilité civile + amende + perte du client. La question du DPA « avez-vous un mécanisme de notification de breach ? » reste sans réponse.

### Le reflet pratique

- Données client en clair dans HubSpot accessibles à tout le monde, export CSV sur le laptop d'un stagiaire, backups non chiffrés.

## 6. Transferts internationaux non encadrés

### Cadre

- Loi 09-08 art. 43-44 : transfert hors Maroc soumis à autorisation CNDP, sauf pays adéquats ou garanties contractuelles (clauses types).
- GDPR art. 44-49 : pas d'adéquation pour le Maroc → transferts UE↔Maroc encadrés par SCC (clauses contractuelles types 2021) + analyse d'impact du transfert (TRA).
- AWS/Google/HubSpot = transfert. « Nos serveurs sont en Europe » ne suffit pas si le groupe peut y accéder depuis les US (Schrems II, CJUE C-311/18).

### Sanction

- Cas type « SaaS hébergé AWS sans garanties » (illustration `08_Jurisprudence/01_Loi_09-08_CNDP_Sanctions.md` §3 — pas une décision publiée) : la régularisation passe par clauses + information des personnes.

### Le reflet pratique

- Toute la stack de Hicham est hébergée hors Maroc sans un seul contrat de transfert signé. C'est la douleur n°1 silencieuse du SaaS marocain.

## 7. Sous-traitance non contractualisée

### Cadre

- Loi 09-08 art. 24-25 : contrat de sous-traitance obligatoire avec clauses de sécurité, confidentialité, durée, réversibilité, interdiction de sous-traiter à nouveau sans accord.
- GDPR art. 28 : le DPA (Data Processing Agreement) est LA clause que tout client UE exige — et que tout sous-traitant (HubSpot, Mailchimp, Zendesk) a déjà rédigée... en ligne, à cliquer-accepter sans lire.

### Sanction

- En cascade : la fuite chez le sous-traitant retombe sur le responsable de traitement (Hicham), sans recours si le contrat n'existe pas.

### Le reflet pratique

- 3-10 sous-traitants sans contrat : SaaS, agence d'appels, société de recouvrement, freelance dev avec accès prod.

## 8. Droits des personnes non traités (accès, rectification, opposition)

### Cadre

- Loi 09-08 art. 7-9 + art. 15-17 : droit d'accès, rectification, opposition — réponse sous 15 jours (pratique CNDP) après demande.
- GDPR art. 15-22 : + effacement, portabilité, limitation — réponse sous 1 mois (art. 12).

### Sanction

- Une plainte d'accès non répondu = porte d'entrée du contrôle CNDP complet, registre compris.

### Le reflet pratique

- Personne ne sait qui traite la demande « supprimez mes données » reçue via contact@ — elle dort 3 semaines dans une boîte partagée.

## 9. Prospection commerciale SMS/WhatsApp sans consentement

### Cadre

- Loi 09-08 + Loi 53-05 (circulation électronique) : prospection directe exige le consentement préalable (opt-in), case non pré-cochée, mention « STOP » fonctionnelle, preuve de consentement conservée.
- GDPR art. 21 : droit d'opposition renforcé en marketing.

### Sanction

- Cas type « SMS promo base achetée » (illustration `08_Jurisprudence/01_Loi_09-08_CNDP_Sanctions.md` §4) : amende + purge de base — et la prospection/télémarketing est structurellement le premier motif de plainte CNDP (500+ plaintes/an depuis 2016, chiffres CNDP publiés).

### Le reflet pratique

- La base de numéros « achetée à un prestataire » ou scrapée d'un salon — Hicham pense que le problème appartient au vendeur. Non : celui qui utilise répond.

## 10. Non-alignment GDPR (le double régime)

### Cadre

- GDPR art. 3(2) : le règlement s'applique au SaaS marocain qui cible des clients UE (offre de biens/services, monitoring) — même sans établissement en UE.
- Au-delà de 250 personnes ou traitement non occasionnel : registre art. 30, analyses d'impact art. 35 (DPIA), notification de violation art. 33 (72h).
- Représentant UE obligatoire dans certains cas (art. 27).

### Sanction

- Pas la CNIL qui vient à Casa — mais le client UE qui bloque le contrat, l'amende chez le client qui se retourne contre le fournisseur, et la clause de résiliation immédiate du DPA.

### Le reflet pratique

- « On est conformes 09-08 » ≠ « on peut signer un client UE ». Les deux régimes se cumulent : 09-08 pour le Maroc, GDPR pour les personnes UE.

## 11. La due diligence de levée de fonds

### Cadre

- Tout investisseur (seed ou série A) demande en datas room : registre des traitements, déclarations CNDP, politique de confidentialité, DPA signatures clients, documentation sécurité.
- Absence = décote, clause de garantie, ou deal mort.

### Le reflet pratique

- La conformité data n'est pas qu'un risque : c'est une condition de liquidité de la société. Hicham le découvre quand la term sheet demande un « data compliance memo ».

## 12. Synthèse

| Douleur | Référence | Coût si non résolu |
| :--- | :--- | :--- |
| Registre absent | Loi 09-08 art. 23 | Mise en demeure + amende, contrôle perdu |
| Données sensibles sans autorisation | Formalités préalables (autorisation) + volet pénal | Amende (art. 64 s.) + injonction + pénal |
| Mentions/politiques absentes | Art. 9-10 ; GDPR art. 13-14 | Perte de confiance client UE |
| Cookies non conformes | Décret 2-10-450 ; CJUE Planet49 | Amende CNDP/CNIL, plaintes |
| Sécurité absente | Art. 14 ; GDPR art. 32 | Responsabilité en cas de fuite |
| Transferts non encadrés | Art. 43-44 ; GDPR art. 44-49 | Régularisation forcée, DPA refusé |
| Sous-traitants sans contrat | Art. 24-25 ; GDPR art. 28 | Cascade de responsabilité |
| Droits non traités | Art. 7-9 ; GDPR art. 12-22 | Plainte = porte du contrôle |
| Prospection sans opt-in | Art. 7-9 + Loi 53-05 ; GDPR art. 21 | Amende + purge base |
| Non-alignment GDPR | GDPR art. 3(2) | Pipeline UE bloqué |
| Due diligence levée | Pratique M&A | Décote ou deal mort |

## 13. FAQ

**Q : La conformité 09-08 suffit-elle pour servir des clients UE ?**
R : Non. 09-08 couvre le Maroc ; le GDPR s'applique aux personnes UE (art. 3(2)). Les deux se cumulent via un registre enrichi + clauses de transfert + DPA.

**Q : Le SaaS marocain sans client UE est-il concerné par le GDPR ?**
R : Non, tant qu'il ne cible pas le marché UE (pas de prix en EUR, pas de langue UE par défaut, pas de monitoring). Au premier client/prospect UE actif, l'analyse d'applicabilité se déclenche.

**Q : Quelles références l'avocat doit-il maîtriser pour cette niche ?**
R : Loi 09-08 complète + décret 2-10-450 + délibérations CNDP (`cndp.ma`), GDPR (art. 3, 5-11, 12-23, 25-40, 44-49), SCC 2021/914, CJUE C-311/18 (Schrems II), C-673/17 (Planet49). Voir `04_Skills_To_Learn/07_Sharp_Legal_Mind/01_Issue_Spotting.md`.

**Q : Combien de temps pour maîtriser la niche ?**
R : 3-6 mois avec 5-10 dossiers — c'est une niche montée en gamme, recommandée après les niches 1-2 (flux de dossiers régulier + références client UE).

---

## Lecture professionnelle — d'où viennent ces douleurs et comment les qualifier

**Fondement** : Les douleurs 09-08/GDPR ne sont pas des cas isolés ; elles découlent d'une structure : toute société qui collecte traite, tout traitement doit être cartographié (registre), cartographié donc déclaré/autorisé, déclaré donc securisé, securisé donc encadré vers l'extérieur (sous-traitants, transferts). La douleur naît quand le client découvre le chaînon manquant au pire moment — signature UE bloquée, plainte, contrôle, levée de fonds.

**Méthode de qualification (art. 59 Loi 28-08 — devoir de conseil)** :
1.  **Écoute 10 min** : laisser le dirigeant exposer son business model, noter où sont ses données (verbatim : « tout est sur HubSpot »).
2.  **Cartographie 5 questions** : quelles données ? chez qui (sous-traitants) ? où (pays = transferts) ? pourquoi (finalités = bases légales) ? combien de temps (durées) ?
3.  **Hiérarchisation** : gravité × probabilité × coût chiffré mais **expliqué** (ex: « données patients sans autorisation » = régime autorisation → injonction + amende art. 64 s., pas « amende 300k » jetée).
4.  **Restitution** : note 2 pages avec 3 priorités (registre → contrats sous-traitants → politique), références exactes (`cndp.ma`, `sgg.gov.ma`), et proposition de mission avec convention.

**Exemple** : SaaS 10 employés qui dit « on est RGPD-compatibles » après avoir cliqué les ToS HubSpot — la douleur n'est pas le registre manquant, c'est la double exposition : le client UE qui demande un DPA et la CNDP qui demande une déclaration. Le diagnostic commence par la liste des traitements, pas par la peur de l'amende.
