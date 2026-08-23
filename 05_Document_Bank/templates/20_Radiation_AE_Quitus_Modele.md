# 20 — Radiation AE & quitus DGI : procedure type

> **Base :** Loi 114-13 art.8 (radiation), CGI obligations fin d'activite - Verif : 23/08/2026
> A executer AVANT la creation de la societe pour eviter tout chevauchement fiscal.

## Ordre strict (ne jamais inverser)

| Etape | Action | Delai | Document |
|---|---|---|---|
| 1 | Derniere declaration CA trimestrielle (zero si nul) | Echeance normale | Recu SIMPL |
| 2 | Paiement IR liberatoire du sur le total encaisse | Idem | Quittus DGI |
| 3 | Declaration cessation d'activite sur ae.gov.ma | J0 radiation | Accuse radiation |
| 4 | Verification quitus DGI (aucune dette) | J+15 | Attestation quitus |
| 5 | Cloture compte bancaire AE ou conversion en compte perso | J+20 | Releve banque |

## Erreurs qui coutent

1. Creer la SARL AVANT de radier l'AE -> double imposition sur la periode de chevauchement.
2. Oublier la derniere declaration trimestrielle -> amende + blocage quitus.
3. Ne pas demander l'attestation de quitus DGI -> redressement futur sans preuve de regularisation.
4. Laisser un solde debiteur CNSS/AMO -> recouvrement force.

## Chiffrage type (cas Yassine, dev service 350k)

- IR liberatoire services : 350k x 1 % = 3 500 DH
- CNSS/AMO deja payee : [montant]
- Quitus DGI : 0 DH si declarations a jour
- Total regularisation : ~3 500 DH
- vs rester AE 2 ans de plus : radiation + IS resultat reel + majoration 30 % = **50 000+ DH de casse**

---

> Co-traitance comptable agree obligatoire. Ne jamais creer la societe avant le quitus.
