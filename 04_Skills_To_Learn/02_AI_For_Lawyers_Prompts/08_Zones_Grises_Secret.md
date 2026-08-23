# 08 — Zones Grises Secret Professionnel & Cloud

## Questions grises

**Q: Puis-je mettre un contrat client anonymisé dans Claude pour "vérifier cohérence"?**
R: Toléré si anonymisation parfaite + validation. Risque: si 1 identifiant reste → violation secret. Mieux: Mistral local.

**Q: L'IA peut-elle rédiger une consultation?**
R: Non. Consultation = acte juridique engageant responsabilité. IA peut structurer SCQA, toi valides fond + signe.

**Q: Client consent à envoyer son dossier à ChatGPT?**
R: Consentement ne purge pas violation déonto (secret est d'ordre public). Refuser même avec accord.

## Arbre décision

```
Donnée identifiable?
 ├─ OUI → Local only (Mistral/Ollama) ou ne pas utiliser IA
 └─ NON → Anonymisé? → OUI → Claude/ChatGPT OK
```


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