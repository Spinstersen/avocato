# 10 — Arbre de Décision : Utiliser l'IA, Quel Modèle, Pour Quoi

> **Trois questions dans l'ordre, jamais dans l'autre.** 1) Cette tâche est-elle IA-compatible ? 2) Les données sont-elles anonymisables au sens du niveau 03 ? 3) Quel modèle pour quel rendu ? L'arbre se parcourt en 30 secondes ; les deux listes (IA-friendly / IA-hostile) le rendent automatique avec l'usage.

## POURQUOI cet ordre

L'erreur classique est de commencer par « quel modèle ? » — la bonne question est toujours « ai-je le droit d'utiliser un modèle ici, et ai-je quelque chose à y gagner ? ». Un outil qui pose une question juridique (base de données d'arrêts payante) est un autre métier qu'un générateur de texte : le premier **cherche**, le second **produit du vraisemblable**. Les confondre, c'est importer le risque d'hallucination dans une tâche de recherche.

## COMMENT — l'arbre

```
La tâche est-elle de la RECHERCHE juridique pure
(référence, jurisprudence, texte exact) ?
 ├─ OUI → PAS de LLM génératif → sources primaires :
 │        sgg.gov.ma (textes), jep.ma (jurisprudence),
 │        cndp.ma (délibérations), + P12 pour FORMULER ta recherche
 └─ NON (production : rédiger, structurer, résumer)
       ↓
Le matériau contient-il une donnée identifiable
(ou non anonymisable au niveau 3-4 de la fiche 03) ?
 ├─ OUI → modèle LOCAL (Ollama/Mistral self-host)
 │        ou ABSTENTION si le local dégrade trop le rendu
 └─ NON → la SORTIE sera-t-elle publiée ou signée (client, justice) ?
       ├─ OUI → cloud ok (Claude/ChatGPT/Mistral selon fiche 07)
       │        + garde-fou P25 collé + validation 4 yeux (fiche 04)
       └─ NON (interne, jetable : brainstorm, plan, tri) →
                cloud direct avec P25, sans autre formalité
       ↓
Sortie obtenue → 2 questions de contrôle (fiche 04) :
 « d'où vient chaque info ? » / « ça cloche si j'ai tort ? »
 → puis décision : j'exploite, je réécris le prompt, ou je jette.
```

## COMMENT — les listes

### IA-friendly (gain net, risque maîtrisé)

| Tâche | Prompt type | Temps typique |
|---|---|---|
| Reformuler un paragraphe obscur | P3 | 3 min |
| Résumer un texte que tu as collé | P7, P10, P29 | 5 min |
| Charpente de note / SCQA | P14 | 5 min |
| Brouillon de post LinkedIn (puis 3 V) | P1 | 15 min avec relecture |
| Idées de clauses (jamais la clause) | P15 | 10 min |
| Extraction de structure d'un contrat anonymisé | P8 | 10 min |
| Compte rendu de réunion (tes notes) | P18 | 5 min |
| Traduction FR↔EN d'un passage (validée) | P30 | 10 min |
| Scripts Loom, FAQ, cas d'école anonymisé | P19-P24 | 10-20 min |

### IA-hostile (le LLM ne réduit pas le risque, il le déplace)

| Tâche | Pourquoi | Alternative |
|---|---|---|
| Trouver une référence juridique | Hallucination de citation (fiche 01) | Sources primaires + P12 |
| Qualifier une situation client réelle | Consultation = conseil engagé | Ton analyse ; IA pour la mise en forme |
| Chiffrer un risque fiscal/douanier/changes | Réglementation mouvante, non représentée | Textes Office des changes/CGI + veille |
| Prédire une décision | Aucune base | Ton expérience, les tendances documentées dans `08_Jurisprudence\` |
| Traiter un dossier sensible identifié | Secret | Local (si qualité suffisante) ou abstention |
| Résumer « de mémoire » une loi sans texte | Le modèle n'a pas de mémoire fiable | P29 avec le texte collé |
| Rédiger une conclusion de justice | Écrit d'audience engagé | Zéro délégation |

## COMMENT — les garde-fous permanents (à coller en haut de chaque session)

```
[P25] RÈGLE PERMANENTE : ne cite QUE le texte que je fournis ;
sinon écris [À VÉRIFIER SUR SOURCE PRIMAIRE]. N'invente jamais
numéro, date, montant de sanction ou dispositif.
+ Si une information manque, pose-moi une question plutôt que de combler.
+ Réponds en français, ton sobre, sans supplément d'opinion non demandé.
```

Trois réflexes avant d'envoyer : (1) P25 est-il dans le fil ? (2) le matériau est-il de niveau ≤2 ou anonymisé niveau 3 ? (3) ai-je 15 min de relecture calendées après ? Un « non » = on ne lance pas.

## EXEMPLE : deux passages complets de l'arbre (personas)

**Yassine — « résume cet accord de confidentialité américain de 12 pages pour que je voie les pièges ».** Recherche pure ? Non, synthèse d'un texte fourni. Donnée identifiable ? Le contrat contient ses parties → anonymisation niveau 3 (lettres codes, suppression des noms — le texte reste compréhensible). Modèle : Claude (fenêtre longue). Sortie : brouillon d'alertes, pas des conseils. Validation : tu relis chaque alerte contre le texte original. Total 40 min dont 25 humaines — le résumé seul t'en a rendu 90.

**Fatima — « est-ce que ma politique de confidentialité est conforme RGPD ? ».** Arbre bloqué dès la racine : c'est une qualification juridique engageante sur un cas réel → pas de LLM, toi (et la niche GDPR du vault, `02_Niches_Deep_Dive\03_Loi_09-08_GDPR_Compliance\`). Ce que l'IA fait à la place : P16 pour la checklist de TON audit, P3 pour la reformulation de tes conclusions en langage commerçant.

## Les 4 réflexes quand l'IA est tentante mais dangereuse

| Tentation | Le vrai besoin dessous | Réponse sans risque |
|---|---|---|
| « Demande à l'IA cet arrêt sur la clause pénale » | Besoin de précédent | jep.ma + P12 (formuler la recherche), ou une décision que TU as en dossier |
| « Soumettre le dossier de X à ChatGPT, il verra ce que je rate » | Besoin d'un second avis | Anonymisation niveau 3 + P26 (autocritique) ou le confrère de confiance — l'humain reste meilleur second œil |
| « Un mail client par jour, je fais répondre l'IA » | Besoin de temps | Modèles de réponse dans Notion (fiche Legal Tech 02) — réutiliser ta prose, pas en générer une autre |
| « Le client presse, je livre le contrat sans relire » | Besoin de calme | Non : le délai est dans la convention, et l'urgence du client n'est pas ton mode de production |

## Dépannage rapide de l'usage

| Symptôme | Diagnostic | Action |
|---|---|---|
| La sortie est juste mais je ne la reconnais pas | Style par défaut du modèle | P3 avec un échantillon de TA plume comme référence |
| Je relis plus lentement que si j'écrivais | Prompt mal cadré (trop vague) | Découper en deux prompts courts plutôt qu'un seul long |
| J'ai collé un identifiant par oubli | Protocole contourné | Fiche réflexe incident (fiche 09) ; évaluer, déclarer si besoin, corriger l'habitude |
| Le modèle me « contredit » sur un point de droit marocain | Normal : il n'a pas la matière | La source collée gagne toujours ; sinon, le texte officiel gagne |
| Trop de prompts, plus de mémoire de ce qui a servi | Surconsommation | Limite : 5 prompts utiles par jour, journal mensuel (fiche 09) |

## La revue de l'arbre (trimestrielle)

Un cas nouveau non couvert par l'arbre ? Ajoute-le aux listes (friendly/hostile). Un modèle dont l'hébergement ou les CGU ont bougé ? Fiche 07 + journal fiche 05. Un prompt supprimé par la QA (fiche 09) ? Retire-le de la table friendly. L'arbre est un organisme, pas un poster.

> **Lecture pro :** si tu ne devais retenir qu'une branche : la première question de l'arbre — recherche ou production ? — élimine 80 % des accidents. Un LLM n'est jamais une bibliothèque ; c'est un rédacteur infatigable qui ment avec assurance quand on lui demande d'être autre chose.
