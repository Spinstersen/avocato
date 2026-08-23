# 10 — 3 Cas Pratiques MRE Chiffrés

> Trois missions types de la niche MRE, du diagnostic à la livraison. Chiffres vérifiés au 23/08/2026 (LF 2026 : IS 20 % ; retenue dividende conventionnelle FR 10 % avec formulaire 5000-F).

## Cas 1 — Karim, 38 ans, MRE à Paris : créer une SARL à Casablanca à distance

**Situation.** Karim veut une SARL de textile à Casablanca (capital 100 000 MAD) mais ne peut pas se déplacer. Il a 3 semaines de vacances par an seulement.

**Mission pack création à distance — 7 500 DH HT, 14 jours :**

| Étape | Détail | Délai |
|---|---|---|
| Diagnostic | Note de risques non-résident (fiscalité, change, représentation) | 40 jours avant |
| Procuration apostillée | Modèle signé devant notaire à Paris + apostille cour d'appel + DHL (template `05_Document_Bank/templates/18_Procuration_Apostille_MRE_Modele.md`) | 3-5 j |
| Statuts + formalités | OMPIC, RC, JAL, compte capital bloqué 100k | J+10 |
| Compte devise MRE | Ouverture compte convertible en dirhams | 72 h après RC |
| Livraison | Kit PDF + Loom explicatif 10 min | **J+14** |

**Ensuite — le dividende annuel :** bénéfice distribué 50 000 MAD. Sans convention : retenue à la source 15 % (7 500). Avec formulaire **5000-F** déposé à la banque AVANT virement : retenue **10 %** (5 000) — économie 2 500 DH/an, crédit d'impôt art.27 côté France. Guide complet : `templates/19_Guide_Formulaire_5000-F_Dividende.md`.

## Cas 2 — Entrepreneure à Casa, 32 ans : succursale Dubaï

**Situation.** Sa SARL marocaine (CA 50M MAD) veut ouvrir une succursale à Dubaï pour facturer le Golfe.

**Points clés mission — 3 500 DH HT :**
- La succursale n'est pas une filiale : mêmes obligations que la maison mère, pas de personnalité séparée (`../12_Ingenierie_Fiscale_Internationale_Shell/03_Holding_Filiale_Succursale_Comparatif.md`).
- Transfert pour investissement à l'étranger : sous la **dotation investissement jusqu'à 100M MAD/an** → autorisation Office RC1, délai ~30 j (`../09_Office_Changes_Dotation_IGOC2024/04_Dotation_Investissement_100M.md`).
- ⚠️ Substance exigée dès le premier dirham : bureau réel + décisions locales documentées, sinon requalification résidence effective Maroc (`../12_Ingenierie.../02_Residence_Substance_Criteres.md`).

## Cas 3 — Famille MRE, 4 adultes : rapatrier des fonds pour un achat immobilier

**Situation.** Une famille MRE veut transférer 400 000 MAD pour un achat immobilier au Maroc, et gérer ses voyages annuels.

**Points clés mission — diagnostic 900 DH :**
- Compte en dirhams convertibles MRE : alimentation libre depuis l'étranger, utilisation libre au Maroc — c'est l'outil standard, pas besoin d'autorisation Office.
- Achat immobilier via ce compte = réexportation du produit possible en cas de revente (droit acquis si justifié par les apports).
- Dotation voyage : **100 000 MAD/an/adulte** → famille 4 adultes = 400k MAD/an de dotation voyage légale (`../09_Office_Changes_Dotation_IGOC2024/02_Dotation_Voyage_100k.md`).

## Synthèse comparative

| Cas | Honoraires HT | Débours client | Gain mesurable |
|---|---|---|---|
| Karim création SARL | 7 500 DH | ~2 750 (OMPIC) + ~600 (DHL/apostille) | Zéro déplacement ; dividende : −2 500 DH/an de retenue |
| Succursale Dubaï | 3 500 DH | Frais Office nuls (<100M) | Expansion légale jusqu'à 100M/an |
| Famille immobilier | 900 DH (diagnostic) | 0 (compte convertible) | Droit de réexportation sécurisé |

---

> ⚖️ Information doctrinale sobre. Sources primaires : `oc.gov.ma` (IGOC 2026), `tax.gov.ma` (LF 2026), `sgg.gov.ma`. Re-vérification trimestrielle : `00_START_HERE/12_VEILLE_LEGALE_2025_2026.md`.
