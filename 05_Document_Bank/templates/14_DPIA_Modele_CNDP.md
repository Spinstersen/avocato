# 14 — Analyse d'impact (DPIA) — modèle CNDP

> **Base :** Loi 09-08 art.12 (traitements à risque) · Dernière vérif : 23/08/2026
> Requis avant tout traitement de données sensibles ou à grande échelle.

## 1. Description du traitement

| Champ | Réponse |
|---|---|
| Nom du traitement | [ex: gestion patients clinique] |
| Finalité | [pourquoi les données sont traitées] |
| Données collectées | [identité, santé, biométrie, localisation…] |
| Catégories de personnes | [patients, clients, employés…] |
| Destinataires | [internes + sous-traitants] |
| Transfert hors Maroc | [oui/non + pays + garantie] |
| Durée conservation | [durée] |

## 2. Nécessité et proportionnalité

- Le traitement est-il nécessaire à la finalité ? Oui/Non — justifier.
- Les données minimales sont-elles collectées ? Oui/Non.
- La durée de conservation est-elle proportionnée ? Oui/Non.

## 3. Évaluation des risques

| Risque | Gravité (1-4) | Probabilité (1-4) | Mesure de mitigation |
|---|---|---|---|
| Accès non autorisé | 4 | 2 | HTTPS, chiffrement, accès restreint |
| Perte de données | 3 | 1 | Sauvegarde quotidienne chiffrée |
| Transfert sans garantie | 4 | 1 | CCT art.43-44 signée |
| Prospection sans consentement | 3 | 2 | Case opt-in non pré-cochée |

## 4. Conclusion

Risque résiduel après mitigation : [faible/modéré]. Traitement autorisé sous réserve du respect des mesures ci-dessus.

## 5. Validation

Responsable de traitement : ____________ Date ________
DPO / conseil : ____________ Date ________
