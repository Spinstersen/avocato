# 10 — Comparatif International : 09-08 vs GDPR vs pratiques CNIL/EDPB (03_Loi_09-08_GDPR_Compliance)

> Réplique `01_Strategy/01_Rules/10_Comparatif_International_France_Belgique.md`, version data. Le comparatif sert au dirigeant marocain à comprendre ce que son client UE attend vraiment — et au client UE à comprendre ce que son fournisseur marocain doit déjà faire chez lui.

## Tableau des régimes

| Critère | Maroc — Loi 09-08 (+ décret 2-10-450) | UE — GDPR 2016/679 | Pratique CNIL (France) | Pratique EDPB/Schrems II |
|---|---|---|---|---|
| Philosophie | Déclaratif : l'administration est informée | Responsabilisation : vous prouvez que vous maîtrisez | Mixte : contrôles sur plainte + sanctions records | Le transfert est un traitement à justifier |
| Registre | Obligatoire (art. 23) mais peu contrôlé avant réclamation | Art. 30, exigé d'office en audit | — | — |
| Données sensibles | Autorisation préalable CNDP (art. 12-14) | Art. 9 : interdiction + exceptions (consentement explicite, intérêt public...) | Sanctionnée systématiquement (healthtech) | — |
| Transfert hors pays | Autorisation sauf adéquation/garanties (art. 43-44) | Art. 44-49 : adéquation ou SCC + TRA | Eclaire les transferts US post-Schrems | SCC seules insuffisantes si droit d'accès local |
| Représentant local | Non exigé | Art. 27 si ciblage UE sans établissement | — | — |
| Breach notification | Non systématique (obligation de sécurité art. 14 ; en évolution) | Art. 33 : 72h à l'autorité, art. 34 aux personnes | Enforce les 72h | — |
| DPO | Non obligatoire en PME (délégué CNDP dans certains cas) | Art. 37-39 selon traitements | Recommandé, souvent exigé par les DPA | — |
| Sanction max | 10 000-100 000 DH défaut de formalités (art. 64) ; pénal jusqu'à 3 ans (art. 65) — mise en demeure d'abord ; grille complète sur cndp.ma | 4% CA mondial ou 20 M€ (art. 83) | ~500 k€ cookies ; 150 M€ Google (2021) | Le DPA du client UE est la « CNIL » du fournisseur |
| Droits personnes | Accès, rectification, opposition (art. 7-9) | + effacement, portabilité, limitation (art. 15-22) | Droits opposés en pratique | — |

## Verdict pour la niche

*   **Le Maroc est en-dessous, l'UE est au-dessus, et le client vit entre les deux.** Une PME marocaine conforme 09-08 seulement est « dans la moyenne locale » et « hors-normes UE » : le DPA qu'elle reçoit est écrit pour le niveau GDPR, pas pour le niveau 09-08.
*   **L'écart se comble par des documents, pas par des promesses** : registre art. 30 (au-delà du registre 09-08), clause de transfert (SCC + modèles CNDP), procédure breach 72h, politique par couches. C'est exactement le périmètre des Missions 2-4 (`03_Offre_Productisee.md`).
*   **Le Maroc n'a pas d'adéquation UE** (liste `eur-lex.europa.eu`) : chaque flux de données UE↔Maroc est un transfert à encadrer — un argument de vente factuel, pas une opinion.

## Check-list comparative (à remplir en diagnostic)

*   [ ] Les 9 critères ci-dessus : où se situe le client sur chacun (09-08 fait / GDPR fait / les deux / aucun) ?
*   [ ] Le DPA reçu est-il calibré GDPR (art. 28) ou 09-08 (il ne peut pas l'être) ?
*   [ ] Les transferts existent-ils dans les deux sens (données UE collectées + données marocains hébergées US) ?
*   [ ] Quel régime sanctionne quoi en premier — la CNDP (délai long, mise en demeure) ou le client UE (résiliation immédiate) ?
*   [ ] Lequel des 4 canaux de risque est ouvert : contrôle, plainte individuelle, contractant UE, datas room ?

---

## Lecture comparative — pourquoi comparer sans copier

Comparer 09-08 et GDPR n'est pas plaquer le second sur la première ni rassurer avec « on est européens de toute façon ». Les assiettes diffèrent : la 09-08 protège les personnes présentes au Maroc via un régime déclaratif ; le GDPR protège les personnes dans l'UE via un régime de preuve, et s'applique extraterritorialement dès qu'on les cible. Le dirigeant qui a « cliqué HubSpot » n'est pas conforme GDPR ; celui qui a « un serveur en Europe » n'est pas conforme 09-08.

**Exemple Conformité 09-08** : un client UE envoie un questionnaire fournisseur de 60 questions (DPIA, breach, sous-traitants en cascade). Hicham y répond « conforme » sans document — son auditeur UE convertit la réponse en clause de réserve au contrat, parfois en exclusion. Le comparatif sert à expliquer pourquoi le questionnaire se répond avec des livrables (registre, procédure 72h, liste des sous-traitants avec clauses), pas avec des cases cochées.

---

## Comparer pour expliquer, pas pour copier

Le comparatif n'a d'intérêt que s'il explique la logique de chaque régime : déclaratif marocain (l'État veut savoir), responsabilisation européenne (le client veut prouver), enforcement par la sanction financière records (CNIL) ou par la chaîne contractuelle (DPA). Dire « le GDPR est plus sévère » sans expliquer que la sévérité, pour le fournisseur marocain, est d'abord commerciale — pipeline bloqué, audit imposé, résiliation —, c'est une tromperie pédagogique. La bonne phrase de vente : « Vous ne serez pas sanctionné par Bruxelles ; vous serez décalé par votre client de Bruxelles si vous ne parlez pas sa langue documentaire. »

> Références : `sgg.gov.ma` (Loi 09-08, décret 2-10-450), `cndp.ma`, `eur-lex.europa.eu` (GDPR, SCC 2021/914, liste d'adéquation), `edpb.europa.eu`. Dernière vérification : 20/08/2026.
