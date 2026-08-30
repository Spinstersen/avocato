# 01 — Style guide : legal English vs français juridique

> **À quoi ça sert :** fixer la discipline d'écriture du module — la différence de style entre deux traditions (français juridique empilé vs plain legal English), le système shall/must/may, les defined terms, les devises et les dates. **Pour qui :** l'avocat qui reçoit des contrats EN de clients offshore et doit produire un contre-projet dans l'idiome de l'adversaire, ancrage marocain maintenu. Temps de lecture : 15 minutes.

**Liens :** [Trilinguisme avec les clients](../06_French_Communication_With_Clients/06_Trilinguisme.md) · [Clause library 01](02_Clause_Library_01_Definitions_Interpretation.md) · [Faux amis](08_Faux_Amis_FR_EN_Legal.md) · [Numbers sheet](../07_Sharp_Legal_Mind/03_Numbers_Sheet.md)

## 1. POURQUOI : une clause EN n'est jamais une traduction

Le produit du cabinet est le contrat. Quand une LLC américaine envoie SON Master Services Agreement, elle envoie le texte de son counsel, orienté ses intérêts. Répondre par une traduction mot à mot d'un modèle français produit deux dégâts : un anglais archaïque qui décrédibilise, et des concepts de droit civil qui n'ont pas d'équivalent en common law (la cession de droits marocaine, l'exception d'inexécution, la modération judiciaire de la clause pénale).

La règle d'or du module : **reconstruction, pas traduction** — intention juridique française, idiome contractuel anglo-saxon, ancrage légal marocain maintenu même en anglais.

| Dimension | Français juridique | Plain legal English |
|---|---|---|
| Longueur | 40-60 mots, subordonnées empilées | 15-25 mots, une idée par phrase |
| Voix | impersonnelle (« il est stipulé que ») | active (« the Provider shall deliver ») |
| Connecteurs | « nonobstant », « aux fins de » | despite / for the purpose of |
| Structure | incises entre virgules | listes verticales (a), (b), (c) |
| Répétition | pronominalisation (« ladite partie ») | répétition volontaire du defined term |

Même contenu, deux corps :

> **FR :** « Il est stipulé, nonobstant toute disposition contraire du présent contrat, que le Prestataire procédera, dans les meilleurs délais, à la livraison des livrables objets dudit contrat. »

> **EN :** "Despite any contrary provision, the Provider shall promptly deliver the Deliverables under this Agreement."

Un counsel américain lit des centaines de contrats par mois : la brièveté y est perçue comme compétence. La clarté est aussi un devoir de conseil — sur le front francophone comme francophone-arabe (voir [06_Trilinguisme.md](../06_French_Communication_With_Clients/06_Trilinguisme.md)).

## 2. COMMENT : la discipline en quatre verrous

### 2.1 shall / must / may / will

| Verbe | Portée en drafting EN | Exemple correct | Erreur classique |
|---|---|---|---|
| **shall** | obligation contractuelle de la partie nommée | "the Client shall pay within thirty (30) days" | shall descriptif : "the Services shall consist of" |
| **must** | exigence légale ou condition de validité | "the assignment must be in writing per right under Law 2-00" | must pour une simple obligation réciproque |
| **may** | faculté discrétionnaire | "either Party may terminate upon thirty (30) days' notice" | confondre may et shall : l'optionnel devient obligatoire |
| **will** | constat futur neutre | "the pilot will start on 1 March" | l'utiliser pour une obligation — réservez shall |

Un seul système d'obligations par contrat. Un texte où shall, must et will se mélangent au même niveau sera relu mot par mot par l'adversaire pour y trouver la faille.

### 2.2 Defined terms : les 5 règles

1. Première occurrence entre guillemets avec majuscule : « **Bon de Commande** » / "**Statement of Work**".
2. Majuscule ensuite PARTOUT ; la minuscule signale le sens courant ("the agreement is silent").
3. Définir une seule fois, en tête (clause 1, fichier 02). Jamais de re-définition en cours d'article.
4. Cohérence lexicale : "Agreement" OU "Contract", "Provider" OU "Supplier", jamais les deux.
5. Dans un MSA long, définitions par ordre alphabétique — standard attendu en common law.

### 2.3 Chiffres, devises, dates

- Première mention en toutes lettres puis code ISO : "Moroccan Dirhams (MAD)", "Euros (EUR)", "United States Dollars (USD)" → ensuite "MAD 600,000".
- Séparateurs EN : virgule des milliers, point décimal (10,500.75). Séparateurs FR : espace et virgule (10 500,75). Ne jamais mélanger dans un document.
- Montant sensible : toutes lettres + chiffres : "ten thousand Euros (EUR 10,000)".
- Dates : "23 August 2026" — jamais 08/23/2026 ni 23/08/2026 (ambiguïté US/UE).
- Taxes : "exclusive of VAT" = HT ; "inclusive of all taxes" = TTC.

### 2.4 Formules à remplacer

| Formule FR | Fausse traduction littérale | EN moderne recommandé |
|---|---|---|
| il est stipulé que | it is stipulated that | the Parties agree that |
| de plein droit | as of right | automatically |
| dans les meilleurs délais | in the best delays | promptly / within X days |
| prendre acte de | take note of | acknowledge |
| aux frais du Client | at the Client's expenses | at the Client's cost |
| nonobstant | notwithstanding (gardé en EN) | despite / notwithstanding |

## 3. EXEMPLE : Yassine réécrit sa proposition

Client US demande un devis. Version traduite à la lettre :

> "Following our discussion, we take the present to propose you our best delays and prices for the realization of your application."

Version polie selon ce guide :

> "Further to our call yesterday, please find our proposal below: scope, timeline and fees for Phase 1 of the mobile application. All amounts are in Moroccan Dirhams (MAD), exclusive of VAT. Payment terms: net thirty (30) days from invoice receipt."

La première version coûte le deal ; la seconde se signe à J+5, marge préservée. Chiffrage du bilinguisme dans l'offre (diagnostic 900 DH HT, Pack Freelance Contrat Offshore 2 900 DH HT) : [Numbers sheet](../07_Sharp_Legal_Mind/03_Numbers_Sheet.md).

## 4. Erreurs d'application (Top 5)

| # | Erreur | Conséquence |
|---|---|---|
| 1 | shall quarante fois par page | obligations illisibles, crédibilité entamée |
| 2 | defined terms sans majuscule constante | ambiguïté exploitable en litige |
| 3 | devise sans toutes lettres ni ISO | dispute sur le change |
| 4 | dates numériques ambiguës | deadline contestée, pénalités indues |
| 5 | mélange FR/EN dans une même clause | image amateur, renégociation coûteuse |

## 5. Checklist avant envoi

- [ ] Un shall par obligation ; aucun mélange must/may
- [ ] Tous les defined terms capitalisés, définis une seule fois
- [ ] Devises : premières mentions en toutes lettres + code ISO
- [ ] Séparateurs numériques cohérents (tout EN ou tout FR)
- [ ] Dates en toutes lettres
- [ ] Phrases ≤ 30 mots en moyenne ; zéro herein/hereunder/whatsoever
- [ ] Passage anti-faux-amis du fichier 08 effectué
- [ ] Miroir FR/EN vérifié clause par clause (aucun sens divergent)

## 6. QCM express

**Q1.** Dans un contrat EN bien rédigé, "including" seul signifie :
A. liste strictement limitative · B. y compris sans limitation, mais attaquable · C. cela dépend du juge

> **Réponse : B.** Sans la clause Interpretation qui pose "including without limitation" (fichier 02), l'adversaire plaide la liste exhaustive (ejusdem generis).

**Q2.** Quelle phrase impose une obligation au Client ?
A. "The Client may pay within 30 days." · B. "Payment is expected." · C. "The Client shall pay within thirty (30) days of invoice."

> **Réponse : C.** shall + sujet nommé + délai chiffré : la discipline complète. May rendrait le paiement facultatif.

**Q3.** "The Services shall consist of web design." Que reproche-t-on à ce shall ?
A. rien · B. shall descriptif : il décrit au lieu d'obliger · C. il faudrait must

> **Réponse : B.** Style moderne : "The Services consist of web design."

> **Lecture pro :** le legal English de qualité ne se reconnaît pas à sa solennité mais à son austérité : phrases courtes, modaux tenus, montants chiffrés deux façons. C'est exactement le standard que le fichier 06 du module Communication applique au français — la langue change, la rigueur non.
