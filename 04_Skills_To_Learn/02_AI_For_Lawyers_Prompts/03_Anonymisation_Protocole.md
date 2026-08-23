# 03 — Protocole Anonymisation Avant Envoi IA

## Étapes (2 min)

1. **Copier** texte source dans note temporaire
2. **Remplacer:** noms→[CLIENT A], montants→[MONTANT X], dates→[DATE], ville→[VILLE], RC/ICE→[ID]
3. **Supprimer:** pièces identité, contrats signés
5. **Envoyer** à IA

## Exemple

AVANT: "Yassine, AE 600k DH Casablanca, clients US, litige Stripe 12k€"
APRÈS: "[CLIENT], AE [MONTANT] [VILLE], clients [PAYS], litige [PRESTATAIRE] [MONTANT]"

## Outils

- Manuel + checklist (fiable)
- Prompt P5 (auto mais revérifier)
- Local LLM (Mistral via Ollama) = 0 envoi US si très sensible → préférer.

## Registre

Noter dans registre 09-08: "IA externe utilisée, données anonymisées, pas de transfert identifiant".

---

## Approfondissement Encyclopédique (Bonus)

### Erreurs fréquentes (Top 5)
1. Vouloir tout faire J1 -> overwhelm
2. Négliger 09-08/CNDP -> sanction 300k
3. Omettre provision art30 -> impayé
4. Publier sans relecture -> faute FR + hallucination
5. Pas de métrique -> 0 amélioration

### Checklist encyclopédique (12 points)
- [ ] Anonymisation / 09-08 OK
- [ ] Déontologie RIO vérifiée
- [ ] Template prêt veille
- [ ] Loom 3 min si livrable
- [ ] LanguageTool 0 faute
- [ ] Plausible/Yousign si besoin
- [ ] Notion archivé
- [ ] Feedback humain obtenu
- [ ] Repurposing 1->5 fait
- [ ] KPI mis à jour
- [ ] Spaced J3/J7 planifié
- [ ] Prochain sprint choisi

### Ressources Maroc
- sgg.gov.ma, cndp.ma, ompic.ma, jep.ma, rbm.ma
- YouTube: OMPIC, CNDP webinars, SPIN 15m, Canva School

### Plan 7 jours ultra-concret
J1 30m input, J2 output, J3 test Feynman, J4 feedback, J5 publish, J6 spaced J3, J7 review.

> Philosophie: Sobre, chiffré, vendable en 7j. Mieux vaut 70% publié que 95% parfait jamais livré.