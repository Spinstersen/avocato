# 01 — Fondamentaux LLM & Risques Avocat

## Comment marche un LLM (en 5 lignes)

Prédit le mot suivant sur base statistique, pas de compréhension juridique. Hallucine références (arrêts inventés 15-30% selon étude Stanford 2024). Ne connaît pas Loi 28-08 par cœur.

## 3 Risques majeurs

1. **Hallucination:** cite "Cass. com. 12/03/2024 n°123" qui n'existe pas. → Vérifier sur `jep.ma` ou `sgg.gov.ma` avant citation.
2. **Fuite secret:** prompt "Yassine, 600k DH AE" → stocké US, violation secret art 36 Loi 28-08. → Anonymiser.
3. **Responsabilité:** art 59 Loi 28-08: l'avocat répond de ses écrits même si draft IA. IA ≠ excuse.

## Test hallucination

Demande "Donne arrêt marocain sur clause pénale DOC" → 3 fois sur 5, LLM invente numéro. Toujours croiser.

## Règle d'or

> IA draft 70% → humain 30% relecture + vérification source primaire.

---

## À retenir + checklist + suite — LLM & Risques Avocat

**3 points clés de ce fichier :**
- LLM = prédiction mot suivant, pas de compréhension juridique → 15–30% arrêts inventés (Stanford HAI 2024).
- 3 risques : hallucination (Cass. inventée), fuite secret art.36 Loi 28-08 (prompt US), responsabilité art.59 (l'avocat répond même si draft IA).
- Règle d'or : IA 70% draft → humain 30% relecture + vérif source primaire `sgg.gov.ma`/`jep.ma`.

**Checklist 6 points — usage IA sans sanction :**
- [ ] Prompt anonymisé : [Client A] au lieu de "Yassine 600k DH offshore"
- [ ] Test hallucination fait : demander 1 arrêt DOC → vérifier sur jep.ma/cndp.ma
- [ ] Aucune donnée perso (art.36 secret) dans ChatGPT/Muse non-EU
- [ ] Vérif systématique base légale exacte (CGI art.92, Loi 09-08 art.52) avant citation
- [ ] Temps gagné noté (IA 70% vs humain 30%) + Loom 3 min de relecture
- [ ] Charte interne IA signée : qui anonymise, qui vérifie, où archiver

**Renvoi glossaire :** `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §06 Loi 09-08 (anonymisation) + §11 DOC art.443 preuve + §04 TVA art.92 (exemple hallucination).

**Interaction dossier :** Se connecte à `06_French_Communication_With_Clients/02_Grammaire_20_Fautes.md` (LanguageTool avant publish) et `01_Legal_Tech_Stack/09_Securite_Backup_09-08.md` (registre).

**Sources spécifiques :** Stanford HAI hallucination study 2024, Loi 28-08 art.36/59 sgg.gov.ma, openai.com/enterprise-privacy, cndp.ma guide IA — vérif 20/08/2026.