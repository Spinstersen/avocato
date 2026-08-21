# 11 — Arbre Décision (03_Loi_09-08_GDPR_Compliance)

> Réf : `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §01-§12 — arbre 09-08 pur : collecte → registre → transfert → régime → DPO.

## Ordre procédural : on qualifie avant de déclarer

Déclarer à la CNDP sans registre 5 colonnes = dossier incomplet. Transférer vers AWS US sans art.43 = infraction. D'où : **Collecte → Registre → Transfert → Déclaration/Autorisation → DPO**.

```
[Q1] Collectez-vous 1 donnée perso (email/tel/IP) ? §06 Loi 09-08 art.2
 ├─ NON → Pas de 09-08 (rare) → tracer preuve absence collecte + §05 si logo avec visage
 └─ OUI → [Q2] Registre 5 colonnes art.14 tenu ? §06
           ├─ NON → Créer registre (traitement/finalité/base/durée/destinataires) §06 avant toute démarche
           └─ OUI → [Q3] Transfert hors Maroc (AWS US / Shopify / Mailchimp) ? §06 art.43-44
                     ├─ OUI → Clauses CNDP + info clients + autorisation transfert §06
                     └─ NON (hébergement MA/UE adéquat) → [Q4] Régime ?
                          ├─ Donnée sensible/géoloc/biométrie → Autorisation CNDP (dossier lourd) §06
                          └─ Prospection/RH/clients → Déclaration simple 30j §06 → [Q5] DPO ?
                               ├─ >250 salariés ou sensible → DPO obligatoire §06
                               └─ Sinon → référent 09-08 + convention §10 clause données
```

## Tableau décision — 5 branches max

| Branche | Condition | Base légale | Procédure (renvoi Glossaire) | Sortie |
|---------|-----------|-------------|------------------------------|--------|
| A — Collecte | 1 email/tel = traitement | Loi 09-08 art.2 §06 | Inventorier tous formulaires YouCan/WordPress/Notion → lister finalités | Oui → suite, Non → stop |
| B — Registre | 5 colonnes obligatoires | Art.14 §06 | Remplir tableau §06 (ex: prospection / devis WhatsApp / consentement / 3 ans / Mailchimp art.24) | Registre prêt |
| C — Transfert | Hébergement hors MA | Art.43-44 §06 | Si AWS US : signer clauses contractuelles types CNDP + mention politique confidentialité + information | Autorisation requise |
| D — Régime | Sensible vs courant | Art.12 §06 | Déclaration en ligne cndp.ma 30j (courant) vs autorisation (sensible, délai 60-90j) | Récépissé |
| E — DPO | Volume/sensibilité | Délib. CNDP 40-22 §06 | Désigner DPO/référent → registre + formation → convention honoraires §10 clause 09-08 | Conformité continue |

## Cas chiffrés

* **SaaS Casa, 2 000 users, hébergé AWS us-east-1, pas de registre** : Collecte OUI → registre NON → amende 10k-300k art.52 §06 ; régularisation : registre 5 col (4h) + clauses CNDP art.43 (1 500 DH) + déclaration 30j ; transfert sans clause = mise en demeure 45j (08_Jurisprudence/01:5-10).
* **E-commerce 50 cmd/j Shopify (Canada) + Mailchimp US** : Transfert OUI §06 → 2 transferts à déclarer ; base consentement case non pré-cochée §06 ; conservation 3 ans après dernier contact §06 ; coût DPO externe 8k/an vs amende 45k moyenne.
* **Clinique dentaire Casa, données santé** : Donnée sensible → autorisation (pas déclaration) §06 → dossier CNDP + DPO obligatoire → délai 90j → ne pas collecter avant autorisation.

## Erreurs / pièges

* **Piège 1 email** : Croire que 5 contacts = pas de registre → faux, 1 suffit §06 → sanction 10k minimum.
* **Piège transfert** : Shopify = hébergement Canada (adéquat ?) mais backup US → transfert art.43 oublié §06 → infraction.
* **Piège consentement** : Case pré-cochée "j'accepte newsletter" → consentement invalide §06 → base légale tombe.
* **Piège sous-traitant** : Mailchimp sans contrat art.24 §06 (durée, sécurité) → responsable = vous, pas Mailchimp.
* **Piège facture** : Facture sans ICE mais avec données perso → banque refuse rapatriement §03 + CNDP non conforme §06.
* **Piège DPO** : Désigner DPO sans registre 5 col §06 → DPO sans outil → contrôle CNDP échec 45j.
* **Piège convention** : Audit 09-08 sans convention §10 50% + DOC art.443 §11 → audit non payé + preuve manquante.

---

## L'arbre comme outil d'entretien, pas comme automate

Pour Loi 09-08, l'arbre force à d'abord prouver le registre avant de parler déclaration — l'inverse est l'erreur qui coûte 45j de mise en demeure. Chaque branche renvoie à une mission avec convention provision 50% §10 + DOC art.443 preuve §11 + compte §12 si transfert. Vérifiez cndp.ma et délibération 40-22 à J-0, et 01_Résidence §01 si DPO étranger 210j → carte §08.

> Diagnostic 45 min + audit registre 5 col + co-traitance DPO : chiffrage CNDP exact.
