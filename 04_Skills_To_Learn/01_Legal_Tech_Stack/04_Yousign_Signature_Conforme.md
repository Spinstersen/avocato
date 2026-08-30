# 04 — Yousign & Signature Électronique : le Réel Juridique Marocain (loi 53-05)

> **Attention, idée fausse à déloger :** la signature électronique « QES eIDAS reconnue automatiquement par le tribunal marocain » n'existe pas. Au Maroc, la signature électronique vit sous la **loi 53-05 relative à l'échange électronique de données juridiques**, et sa valeur dépend d'un faisceau de preuves, pas d'un tampon européen. Cette fiche dit le droit réel et la pratique qui va avec.

## POURQUOI commencer par la loi 53-05

La convention d'honoraires est la première preuve que tu produisais si un client conteste. Au Maroc :

1. **Loi 53-05** : la signature électronique est **fiable** si elle est rattachée à son signataire et qu'elle détecte toute altération du document. La **présomption de fiabilité** (renversement de la charge de la preuve) est attachée aux signatures créées avec un **prestataire de services de confiance marocain agréé par l'ANRT**.
2. **Les QES européennes (eIDAS)** : Yousign délivre des signatures simple/avancée/qualifiée au sens européen. Face à un juge marocain, une QES = **preuve forte** (horodatage, certificateur, piste d'audit), mais sa reconnaissance est **appréciée par le juge** — jamais « automatique ». Le raisonnement est le même que pour tout écrit électronique : le tribunal vérifie le rattachement au signataire et l'intégrité.
3. **DOC art. 443** : la preuve écrite (commencement de preuve par écrit au sens large) est exigée au-delà de **10 000 DH** entre commerçants/commerçant-particulier selon les cas — une convention de mission à 2 900 DH passe sous ce seuil, mais rien n'interdit l'écrit ; au contraire : **l'écrit électronique + email + conservations = faisceau**, et le faisceau gagne toujours contre la parole.
4. La convention d'honoraires elle-même : **ex-art. 30 de la loi 28-08** organisant la profession d'avocat ; la **loi 66-23** promulguée le 18/08/2026 (dahir 1-26-75, BO n° 7536) remplace la 28-08 avec de nouveaux numéros d'articles **en cours de transposition** — dans tes templates, écris « convention d'honoraires (art. 30, loi 28-08 ; cf. loi 66-23) » et mets à jour les renvois quand la table de correspondance sera stabilisée.

## COMMENT : pourquoi Yousign reste le bon choix

| Critère | Yousign |
|---|---|
| Hébergement | France (UE) → rien à déclarer au titre du transfert hors Maroc pour les documents signés |
| Prix | ≈19-25 €/mois (offre Pro, à vérifier — les grilles bougent) |
| Templates | Illimités sur l'offre Pro |
| Types de signature | Simple, avancée, qualifiée (QES avec certificat à l'unité) |
| Piste d'audit | PDF + certificate de signature (horodatage, IP, OTP) — c'est ça qui nourrit le faisceau |

**Alternative souveraine :** Docuseal — open source, français, auto-hébergeable sur un VPS (≈5-10 €/mois). Moins de « marque connue », plus de contrôle. Valeur probante identique : ce qui compte est le faisceau, pas le logo.

## La règle des deux clientèles

### Client UE (Yassine facture via sa structure française, ou client SARL à Paris)

La loi applicable au contrat est souvent européenne → Yousign standard suffit, et la QES eIDAS a une valeur probante pleine devant un juge européen. Envoie en **simple ou avancée** pour les conventions courantes, réserve la **QES** aux actes à fort enjeu (transaction, procuration ad litem).

### Client marocain

Écris dans la convention une **clause d'acceptation de la signature électronique** (voir plus bas) et constitue le faisceau :

1. signature électronique sur Yousign/Docuseal (rattachement : email + OTP + IP) ;
2. mention « lu et approuvé » tapée par le client dans un champ dédié ;
3. email de transmission depuis l'adresse du client que tu connais, avec le PDF signé en pièce jointe ;
4. conservations : PDF + certificate d'audit dans `00_CLIENTS/[CodeClient]/` (Drive + export Notion) pendant la durée de prescription.

Aucun de ces éléments seul ne « vaut signature légale » ; ensemble, ils forment la preuve que le juge retiendra.

### Le cas « je veux être blindé »

Litige naissant, transaction à plusieurs dizaines de milliers de dirhams, client new : **double signature** — électronique pour la circulation rapide, original papier contresigné (ou légalisé) lors du prochain passage. Coût : un rendez-vous. Cela reste la solution la plus sûre tant que l'agrément ANRT des prestataires européens n'est pas établi.

## Setup Yousign (1 h, pas à pas)

1. Compte Pro, domaine `cabinet.ma`, authentification à deux facteurs.
2. Créer les 3 templates :
   - **Convention d'honoraires** — parties, objet, honoraires HT + TVA, provision, délais en jours ouvrés, résiliation, juridiction (barreau du cabinet), clause signature électronique. Modèle : `05_Document_Bank/templates/01_Convention_Honoraires_Modele.md`.
   - **Lettre de mission + planning** (le « qui fait quoi »).
   - **PV de remise de livrables / clôture** (le document qui coupe la contestation de livraison).
3. Champs signataires : Avocat, Client, **Date**, case texte libre « Lu et approuvé », OTP activé sur les dossiers sensibles.
4. Workflow : import PDF (export depuis Notion/Canva) → champs → envoi → signature mobile du client → PDF + certificate archivés auto dans Drive (Make/Zapier, fiche 08) + lien dans la page Notion de la mission.
5. Notification au client à la fin : « La convention signée est archivée, en voici copie. »

## Extrait de convention (verbatim FR)

```
Article 3 — Honoraires. Les présentes sont souscrites pour un montant de
2 900 DH HT, TVA en sus au taux applicable. Une provision de 50 % est
exigible à la signature ; le solde est facturé à livraison.
Délai d'exécution : 7 jours ouvrés à compter de l'encaissement de la provision.
La convention d'honoraires est établie conformément aux règles de la
profession d'avocat (art. 30, loi 28-08 ; cf. loi 66-23 du 18 août 2026).

Article 9 — Signature électronique. Les parties acceptent que la présente
convention soit signée électroniquement par un service de confiance
fournissant un procédé fiable au sens de la loi n° 53-05 relative à
l'échange électronique de données juridiques, et conviennent que les
données d'identification, l'horodatage et le certificat de signature
établis par le prestataire valent preuve de l'origine et de l'intégrité
du document, sans préjudice de l'appréciation souveraine du juge.
```

## Les 4 voies de signature comparées

| Voie | Coût | Véhicule la preuve comment | Quand la choisir |
|---|---|---|---|
| Papier + légalisation de signature | Déplacements + files d'attente | La plus forte culturellement au Maroc ; date certaine facile | Transaction sensible, client méfiant, litige naissant |
| Yousign / Docuseal (électronique) | ≈19-25 €/mois ou VPS | **Faisceau** : OTP, IP, horodatage, piste d'audit + clause 53-05 | Quotidien des conventions, PV, lettres de mission |
| Scan PDF + « Bon pour accord » par email | 0 | Commencement de preuve : l'email lie l'auteur, le scan non | Dépannage, documents non litigieux |
| WhatsApp / SMS seul | 0 | Quasi nulle pour un acte structuré (identité du compte, conservation) | Jamais pour une convention |

## FAQ signature électronique (ce que les clients demandent)

**« Est-ce que ça a la même valeur qu'un papier ? »** — Réponse juste : « c'est une preuve électronique solide au sens de la loi 53-05 si on réunit le faisceau (rattachement au signataire, intégrité, horodatage) ; le juge l'apprécie comme tout élément de preuve. Pour les actes très sensibles, j'ajoute un original papier. »

**« Le tribunal marocain reconnaît-il la signature européenne ? »** — « Aucune reconnaissance automatique n'existe : le juge examine la fiabilité du procédé. Notre prestataire UE fournit une piste d'audit complète qui sert la preuve ; la présomption de fiabilité pleine suppose un prestataire agréé ANRT. »

**« Le client refuse de signer en ligne ? »** — Deux options : signature papier en main propre ou légalisée — ce n'est jamais un motif pour travailler sans convention.

**« Et la TVA / facturation ? »** — La convention dit HT + TVA ; l'envoi électronique vaut remise : le PDF signé + l'email de transmission constituent la preuve de livraison (PV de remise si acte final).

**« Peut-on modifier le PDF après signature ? »** — Toute altération casse l'intégrité détectée par le procédé (c'est précisément ce que la loi 53-05 exige de détecter) : signature nouvelle version, jamais édition de l'originale.

## Checklist avant envoi

- [ ] Honoraires en DH HT + mention TVA
- [ ] Provision % et mode d'encaissement (virement RIB — pas Stripe, fiche 06)
- [ ] Délais en jours ouvrés
- [ ] Zéro promesse de résultat
- [ ] Clause signature électronique (art. 9 ci-dessus) présente
- [ ] Case « Lu et approuvé » + OTP activés
- [ ] Archivage Drive + Notion programmé

## Ce qu'il ne faut JAMAIS écrire

| Interdit | Pourquoi |
|---|---|
| « Signature conforme au tribunal marocain » | Faux en l'état — la force probante est appréciée par le juge |
| « DOC art. 419 » | Référence erronée ; le seuil de preuve écrite est l'art. 443 |
| « QES = présomption de fiabilité au Maroc » | La présomption suppose un prestataire agréé ANRT |
| « eIDAS reconnu automatiquement » | Aucun texte marocain ne le prévoit |

> **Lecture pro :** considère la signature électronique comme une très bonne photo de la volonté du client, pas comme un acte notarié. Le jour où tu détiens un original papier légalisé d'une transaction sensible, tu dors mieux — et le jour où un juge marocain te demande de prouver le rattachement, c'est le faisceau (OTP + email + IP + conservations) qui parle, pas le logo sur le PDF.
