# 14 — Registre et audit 09-08 encyclopédique (PME/SaaS/e-commerce)

> Le registre qui fait signer les clients UE. Pas à pas : cartographie, registre 5 colonnes, formalités CNDP, contrats, sécurité. Vérifié 07/09/2026 — loi 09-08 (dahir 1-09-15) + décret 2-10-450 : déclaration vs autorisation (sensibles), registre, information, sécurité, transferts ; pénal art. 52-65 dont 64 (10k-100k défaut formalités) ; GDPR 2016/679 art. 3(2), 27, 28, 44-49 pour le volet UE. Textes à ouvrir sur sgg.gov.ma / cndp.ma avant citation publique.

## 1. Cartographie — d'où viennent les données ?

Ateliers par service : site (formulaires, cookies, comptes), CRM/HubSpot (où hébergé ? UE/US ?), paiement (CMI/Stripe : qui voit la carte ?), SAV/WhatsApp, RH, prospects (fichiers achetés ? — à bannir), sous-traitants (hébergeur, livreur, agence ads). Pour chaque flux : finalité, base (consentement/contrat/intérêt), catégories, destinataires, durée, lieu d'hébergement, transfert hors MA ? C'est cette carte qui remplit le registre, pas l'inverse.

## 2. Registre 5 colonnes — modèle tenu

Traitement | Finalité/base | Données + personnes | Destinataires + transferts | Durée + sécurité. Exemples : commandes e-commerce (contrat, 3 ans + compta 10 ans), newsletter (consentement opt-in prouvé, désinscription 1 clic), SAV WhatsApp (intérêt + information, purge 1 an), RH (obligation légale). Registre daté, signé dirigeant, revu à chaque nouvel outil. Sans registre, le diagnostic s'arrête : mise en demeure + amende art. 64 + DPA UE bloqué.

## 3. Formalités CNDP — déclaration vs autorisation

Déclaration préalable pour traitements courants ; autorisation préalable pour sensibles (santé, biométrie, infractions — périmètre exact au texte). Dépôt via CNDP avec récépissé conservé. Transfert hors Maroc : encadré (pays adéquat ? garanties ? autorisation ?) — AWS/GCP/HubSpot UE/US = clauses + DPA + information. Le Maroc n'a pas d'adéquation UE : double conformité 09-08 + GDPR via clauses types, pas d'option.

## 4. Contrats et mentions — ce qui se signe

DPA client UE (art. 28 GDPR : objet, durée, nature, instructions documentées, sécurité, sous-traitants autorisés, audit, sortie), contrats sous-traitants 09-08 (art. 24/25 à ouvrir), mentions site/app + bannière cookies (refus aussi simple qu'accepter, preuve du consentement), politique interne + habilitations + chiffrement/sauvegarde. Pack : audit + registre + politique FR/EN + mentions + DPA type + plan 90j (8 000-12 000 HT) + alignement GDPR (5 000-8 000) + veille mensuelle.

---
> Template : `05_Document_Bank/templates/05_Registre_09-08_Modele.md`. Sécurité cabinet : `04_Skills/01_Legal_Tech_Stack/09_Securite_Backup_09-08.md`.
