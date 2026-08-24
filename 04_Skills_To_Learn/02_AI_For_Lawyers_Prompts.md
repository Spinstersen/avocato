# Compétence #2 : IA pour avocats — prompts & automatisation (votre superpouvoir)

> Vous ne remplacez pas l'avocat par l'IA. Vous faites des brouillons 3× plus vite, puis vous ajoutez la validation juridique.

## Règles d'or
1. Ne collez jamais de données client confidentielles dans une IA publique (anonymiser).
2. L'IA bourrine → VOUS vérifiez loi 66.23, 31-08, 09-08, Code des obligations. L'IA hallucine les articles.
3. Utilisez l'IA pour 70 % du brouillon, vos 30 % d'expertise humaine font la valeur.

## Top 5 cas d'usage

### 1. Rédiger une clause de contrat
Prompt :
> « Agis comme avocat marocain en droit des entreprises. Rédige une clause de [propriété intellectuelle / pénalité de retard / confidentialité] pour un contrat de prestation freelance Maroc-France, en FR et EN, conforme au DOC et loi 09-08, ton clair, avec sanctions en cas de non-paiement. Propose 2 variantes : stricte et équilibrée. »

Puis vous éditez.

### 2. Article SEO
Prompt :
> « Rédige un article de 900 mots SEO pour des gérants de PME marocaines : "Loi 09-08 : registre de traitement modèle". Structure : intro avec douleur, cadre légal Maroc (loi 09-08, CNDP), 5 étapes pour créer un registre, tableau exemple, erreurs, FAQ. Ton pédagogique, pas de pub. Ajoute 3 sources CNDP à vérifier. »

### 3. Post LinkedIn
Prompt :
> « Tu es ghostwriter LinkedIn pour un avocat d'affaires marocain, niche freelances. Rédige un post de 150 mots avec hook fort sur "l'erreur de contrat freelance qui coûte un impayé". Style : direct, 1 exemple concret, 1 phrase actionnable, CTA doux "checklist en commentaire", sans auto-promotion agressive. Ajoute 3 hashtags. »

### 4. Email client / explication de devis
Prompt :
> « Rédige un email professionnel FR pour envoyer un devis Mission Contrats 2 900 DH HT à un client freelance qui a eu un impayé. Explique ce que contient le pack en 5 bullets, la valeur, le délai 3 jours, le paiement 50/50, ton rassurant et clair. Termine par une question pour caler le paiement. »

### 5. Cartographie de données pour la 09-08
Prompt :
> « Je suis avocat, j'audite une clinique à [ville] qui collecte : noms, CIN, téléphones patients, dossiers médicaux. Liste les traitements de données probables et génère un tableau registre 09-08 : Nom traitement, Finalité, Base légale, Données, Durée, Destinataires, Sécurité. Format Excel. »

## Votre bibliothèque de prompts
Créez `prompt_library.md` dans ce dossier et sauvegardez 10 prompts que vous réutilisez.

## Workflow anti-TDAH

**La machine à contenu de 15 min :**
1. Note vocale 2 min : « Aujourd'hui je veux parler de... » (sur le téléphone)
2. Transcription Whisper → coller dans ChatGPT avec le prompt #3
3. Obtenir le brouillon → l'éditer 5 min (ajouter votre exactitude juridique + histoire perso)
4. Coller dans Canva carrousel → exporter PDF
5. Terminé. Pas 2 heures.

## Outils

- **ChatGPT Plus (200 DH HT/mo) :** le meilleur pour le brouillon FR/EN.
- **Claude :** meilleur pour les longs documents (registre 20 pages).
- **Perplexity :** pour la recherche sourcée (vérifier les mises à jour légales).
- **Loom + IA :** Loom transcrit automatiquement votre vidéo, l'IA résume pour le client.
- **Notion AI :** résumer les notes client.

## Idées d'automatisation (mois 2-3)

- **Intake client :** formulaire Tally → Make → ChatGPT résume → CRM Notion.
- **Livraison du lead magnet :** Tally → email auto via Gmail avec le PDF + message WhatsApp.
- **Astuce hebdo :** planifier 7 statuts WhatsApp via le planificateur de contenu Canva.

## Tâche pratique (2 heures)

Choisissez UN contrat que vous vendez (ex : contrat freelance), demandez à l'IA un brouillon v1, puis corrigez et sauvegardez comme template dans `05_Document_Bank/templates/`. Maintenant, vous avez un produit.

## Limites à ne jamais franchir

- Ne laissez pas l'IA donner un conseil juridique directement au client (c'est vous qui validez).
- N'utilisez pas l'IA pour générer de la fausse jurisprudence.
- Gardez la signature humaine et la note déontologique : « Document relu et validé par Me [Nom], avocat. »

---

> قاموس سريع / Mini-glossaire AR : ذكاء اصطناعي (intelligence artificielle) · بذرة/مسودة (brouillon) · تحقق (validation) · بيانات سرية (données confidentielles)
