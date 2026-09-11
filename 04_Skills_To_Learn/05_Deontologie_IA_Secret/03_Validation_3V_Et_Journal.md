# 03 — Validation 3V & journal de prompts

> L'IA propose ; le texte officiel décide. Aucun chiffre, article ou décision ne sort sans ouverture de la source.

## Les 3 V
1. **Version** : quel texte est en vigueur à la date de la mission ? (BO, loi de finances de l'année, IGOC en cours.)
2. **Vérification** : ouvrir la source primaire (`sgg.gov.ma`, `tax.gov.ma`, `cndp.ma`, `ompic.ma`, `oc.gov.ma`, `courdecassation.ma`) et confronter chaque affirmation.
3. **Visa** : l'avocat signe et date ; la mention « à vérifier » ne disparaît qu'après visa.

## Journal (par prompt significatif)
```
Date : __/__
Outil + version : ______________
Objet : [rédaction / synthèse / traduction / idée]
Anonymisation : [règles 02 appliquées ? oui/non]
Sorties retenues : [1 ligne]
Vérification : [source ouverte + date]
Visa avocat : [initiales + date]
```

## Mentions client (quand l'IA a aidé à préparer un livrable)
- « Document préparé avec assistance technologique ; l'analyse juridique et la validation ont été faites par Me [Nom]. »
- Ne jamais facturer un « temps IA » : le prix est celui du livrable et de la responsabilité.

## Erreurs qui coûtent
- Citer une décision hallucinée (voir `04_Skills_To_Learn/15_Recherche_Juridique_Veille/04_Protocole_3V_Avant_Citation.md`).
- Livrer un taux fiscal périmé parce que le prompt ne contenait pas l'année.
- Traduire une clause sans vérifier les faux amis (`04_Skills_To_Learn/13_Legal_Drafting_FR_EN/08_Faux_Amis_FR_EN_Legal.md`).
