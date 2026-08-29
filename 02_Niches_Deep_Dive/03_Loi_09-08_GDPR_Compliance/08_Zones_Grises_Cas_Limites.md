# 08 — Zones Grises & Cas Limites (03_Loi_09-08_GDPR_Compliance)

> Complément encyclopédique — réplique `01_Strategy/01_Rules_Of_The_Game_No_Ads_Morocco/07_Zones_Grises_Cas_Pratiques.md`, appliquée à la data.

## 5 Zones grises 09-08 / GDPR

| # | Situation | Vert | Orange | Rouge | Réf |
|---|---|---|---|---|---|
| 1 | Formulaires & traitements simples (site vitrine, recrutement) | Finalité précise + info + durée définie | Collecte sans mention de durée | Base de CV conservée 5 ans sans tri ni info | 09-08 art. 3, 9-10 |
| 2 | Cookies analytics | Auto-hébergés exemptés (Plausible/Matomo configuré) + bannière cohérente | GA4 avec consentement « tout accepter par défaut » | Pixels pub pré-cochés avant action utilisateur | Décret 2-10-450 ; CJUE C-673/17 Planet49 |
| 3 | Hébergement hors Maroc | Pays reconnu adéquat CNDP + contrat transfert | UE (GDPR-friendly) mais accès support depuis US | AWS/GCP US sans clause ni autorisation, données clients marocains | 09-08 art. 43-44 ; CJUE C-311/18 Schrems II |
| 4 | Prospection B2B | Appels ciblés relation d'affaires + droit d'opposition respecté | Emails pro sans opt-in mais désabonnement fonctionnel | SMS/WhatsApp sur base achetée sans consentement prouvé | 09-08 droits + opt-in ; cas type prospection (§4 banque) |
| 5 | SaaS servant des clients UE | DPA signé + registre art. 30 + SCC si données rapatriées | DPA signé sans analyse, registre 09-08 seul | Vente active UE (prix EUR, team FR) sans aucune base GDPR ni représentant | GDPR art. 3(2), 27, 28, 44-49 |

## Cas limite détaillé (à raconter en diagnostic)

*   **Faits :** SaaS B2B casablancais, 10 employés. 200 clients Maroc, 30 clients UE signés en self-service (site en FR+EN, prix en EUR, paiement Stripe EU). Hébergement AWS Irlande, CRM HubSpot US, support Zendesk US. Aucune déclaration CNDP, aucun DPA signé, politique de confidentialité copiée d'un générateur en ligne. Un client français demande un « audit data » après un incident chez un autre fournisseur.
*   **Analyse en 3 temps :**
    1.  **Qualification** : le site cible activement l'UE (langue, devise, vente) → GDPR applicable de plein droit au vendeur marocain (art. 3(2)), pas seulement « par ricochet via le client ». Et les données des 200 clients marocains relèvent de la 09-08 (registre + déclaration art. 12-23).
    2.  **Risque chiffré** : côté CNDP — défaut de formalités préalables : amende **10 000-100 000 DH (art. 64)**, la collecte déloyale est pénale (art. 65), mise en demeure fréquente + transferts US sans garanties. Côté UE — le client français peut résilier pour défaut art. 28 + se retourner contre le SaaS en cas de breach ; la due diligence levée bloque. Double régime, double exposition, zéro document.
    3.  **Parade** : registre commun 09-08/GDPR art. 30 (une seule cartographie, deux formats), pack sous-traitants + clauses de transfert (CNDP + SCC 2021), politique FR/EN régénérée, réponse DPA négociée, avis sur représentant UE (art. 27 — selon volumes, éviter ou mandater).
*   **Solution livrée :** Pack 09-08 (12 000 HT) + Sous-traitants/transferts (5 000 HT) + Alignment GDPR (8 000 HT) = 25 000 HT sur 5 semaines ; abonnement 4 500 HT/mois ensuite. Le client UE a signé ; l'incident du fournisseur voisin est devenu l'argument interne de bouclage du budget.

## Checklist 5 zones grises (auto-diagnostic dirigeant)

*   [ ] Sauriez-vous lister vos 8 traitements en 10 minutes ? (registre)
*   [ ] Vos données sensibles (santé, biométrie, géolocalisation) ont-elles une AUTORISATION, pas juste une déclaration ? (art. 12-14)
*   [ ] Un tiers hors Maroc (AWS, HubSpot, Zendesk) a-t-il un contrat transfert signé ? (art. 43-44)
*   [ ] Votre base SMS/WhatsApp a-t-elle une preuve de consentement par contact ? (cas type prospection §4)
*   [ ] Signez-vous des contrats UE sans DPA analysé ? (GDPR art. 3(2), 28)

---

## Lecture professionnelle — pourquoi ces zones sont grises

**Conformité data** illustre la tension entre texte et pratique. La Loi 09-08 date de 2009, son décret de 2010 : le régulateur rattrape les usages numériques avec les outils du droit administratif (mise en demeure, injonction, amende) — d'où une exécution plus progressive qu'annoncée. Le GDPR, lui, est directement applicable aux opérateurs marocains qui ciblent l'UE, mais ses sanctions ne tombent sur Casa que par ricochet contractuel (le DPA du client). La zone grise naît de ce double décalage : obligation marocaine peu contrôlée jusqu'à la plainte, obligation européenne non contrôlée mais contractuellement imposée.

**Raisonnement en 3 temps** :
1.  **Qualification** : la donnée est-elle personnelle ? sensible ? la personne est-elle au Maroc, dans l'UE, les deux ? (→ régime applicable, pas au client de choisir son camp).
2.  **Risque** : quelle branche est active aujourd'hui — le régulateur marocain, le contractant UE, la plainte d'un individu ? Et quel coût concret (mise en demeure vs résiliation vs purge de base) ?
3.  **Parade** : quel document purge quel risque — registre (CNDP), DPA analysé (UE), clause de transfert (les deux), consentement archivé (prospection).

**Exemple pédagogique** : un dirigeant dit « nos données sont sur des serveurs européens, donc on est GDPR ». Faux deux fois : (a) l'hébergement UE n'empêche pas l'accès US du support (Schrems II), (b) le GDPR protège des personnes, pas des serveurs — et ses clients marocains à lui relèvent de la 09-08, que l'UE n'a jamais couverte. La zone grise se purge par la cartographie, pas par la géographie.

> Références : `cndp.ma` (délibérations, formulaires, pays reconnus), `sgg.gov.ma` (Loi 09-08 + décret 2-10-450), EUR-Lex (GDPR, SCC 2021/914), CJUE C-311/18 et C-673/17. Dernière vérification : 20/08/2026.

---

## Pourquoi la zone grise est une opportunité pédagogique

La zone grise n'est pas une faille à exploiter, mais un espace où la doctrine réglementaire et la pratique contractuelle n'ont pas tranché (pays « adéquats » CNDP, seuils de ciblage UE, sorts des B2B emails). L'avocat n'y répond pas par `oui/non` mais par `si ... alors ... sinon ...` : si vous vendez en EUR à des résidents UE, alors le DPA vous atteindra avant la CNIL ; si vos données clients dorment sur un SaaS US, alors la clause de transfert est le minimum, pas l'option. Chiffrage des deux branches, puis convention qui couvre la branche prudente (`01_Strategy/01_Rules_Of_The_Game_No_Ads_Morocco/11_Arbre_Decision_Avant_Action.md`).

**Exemple** : prospection B2B par email — tolérée comme relation d'affaires en dessous d'un optin formalisé, rouge dès que le volume passe par achat de base. L'explication porte sur la source des adresses et la preuve d'opposition, pas sur l'outil utilisé.
