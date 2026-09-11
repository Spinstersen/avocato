# 01 — Interdits absolus (ce qui ne se colle jamais)

> La question n'est pas « est-ce que l'outil est sûr ? » mais « est-ce que cette donnée peut sortir du cabinet ? ».

## Liste rouge (jamais en clair dans un LLM public)
- Nom, prénom, CIN, passeport, adresse, téléphone, email personnels.
- ICE, RC, IF, coordonnées bancaires (RIB/IBAN), références de factures nominatives.
- Contrats signés, pièces de dossier, correspondances client, mises en demeure réelles.
- Données sensibles 09-08 : santé, biométrie, origine, religion, opinions, géolocalisation.
- Stratégie de défense, montants négociés, évaluation du risque client.
- Mots de passe, clés API, tokens.

## Zones à traiter avec précaution
- Nom du cabinet ou d'un confrère dans un scénario : anonymiser même les tiers.
- Captures d'écran : les métadonnées et l'arrière-plan fuient plus que le texte.
- « Donne-moi un exemple similaire à l'affaire X » : reformuler en faits d'école, jamais en dossier réel.

## Le test des 3 secondes (avant chaque collage)
1. Si ce texte fuit, est-ce un préjudice ou une violation du secret ? Si oui : ne pas coller.
2. Puis-je reformuler sans aucune donnée identifiante ? Si non : ne pas utiliser l'IA.
3. La sortie contiendra-t-elle une donnée réelle ? Si oui : rester en local / compte pro.

## Conséquence
Une violation du secret professionnel n'est pas un bug technique : c'est une faute déontologique (loi 66-23, ex art. 36) et un incident 09-08. Le dossier de l'incident se prépare AVANT, pas après.
