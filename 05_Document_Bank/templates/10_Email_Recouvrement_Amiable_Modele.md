# Recouvrement à l'amiable — Séquence 3 emails + LR type

**Logique :** chaque touch monte d'un cran de formalisme, sans agressivité prématurée. Objectif double : être payé en gardant le client si possible, et préparer le dossier comme si l'injonction de payer était certaine (elle le devient à J+45).

**Calendrier de la séquence :**

| Jour | Action | Support | Ton |
|---|---|---|---|
| Échéance +7 | Email 1 — rappel cordial | Email + WhatsApp | Amical, chiffre posé |
| Échéance +15 | Email 2 — rappel formalisé | Email | Ferme, clause pénale citée |
| Échéance +30 | LR — mise en demeure 15 jours | Recommandé avec accusé | Juridique |
| Échéance +45 | Sans règlement : injonction de payer (tribunal de commerce) | Voir renvoi ci-dessous | Procédure |

**Placeholders utilisés partout :** [CLIENT] · [FACTURE N°] · [MONTANT] · [DATE ÉCHÉANCE] · [CONVENTION N°] · [JJ/MM/AAAA].

**Règle probatoire :** chaque envoi (email ou WhatsApp) = capture horodatée archivée au dossier. Le dossier se construit dès l'email 1, pas à la LR.

---

## Email 1 — Rappel cordial (J+7)

**Objet :** Facture [FACTURE N°] — petit rappel amical

> Bonjour [CLIENT],
>
> Sauf erreur de notre part, la facture [FACTURE N°] de **[MONTANT] DH TTC**, échue le [DATE ÉCHÉANCE], semble ne pas encore avoir été traitée.
>
> Pour mémoire, l'article 230 du DOC prévoit que toute obligation non exécutée se résout en dommages-intérêts — autant éviter ce vocabulaire entre partenaires.
>
> Un simple virement clôt ce point, ou un mot pour nous indiquer votre date de règlement.
>
> Bien cordialement,
> [Signature]

**Miroir EN (court) :**

> Subject: Invoice [FACTURE N°] – friendly reminder
> Hi [CLIENT], invoice [FACTURE N°] for **[MONTANT] MAD**, due on [DATE ÉCHÉANCE], appears unpaid. Under Article 230 of the Moroccan Code of Obligations and Contracts (DOC), an unmet obligation converts into damages — let's avoid that vocabulary between partners. A simple transfer settles this, or just tell us your expected payment date.

**Script AR (WhatsApp, court) :**

السلام عليكم أستاذ [CLIENT]. الفاتورة رقم [FACTURE N°] ديال [MONTANT] درهم سالات ميعادها من [DATE ÉCHÉANCE]. إلى كانت نسيت، هاهي مرة أخرى. وإلا كان شي مشكل قولها ليا ونحلوها بيناتنا بلا تعقيد.

---

## Email 2 — Rappel formalisé (J+15)

**Objet :** Impayé facture [FACTURE N°] — régularisation demandée sous 7 jours

> Bonjour [CLIENT],
>
> Malgré notre rappel du [JJ/MM/AAAA], la facture [FACTURE N°] de **[MONTANT] DH TTC** demeure intégralement impayée.
>
> Nous vous rappelons que la convention [CONVENTION N°] prévoit une clause pénale de retard plafonnée à **10 % du montant dû**, sur le fondement de l'article 264 du DOC — clause que nous préférerions ne jamais activer.
>
> Deux options, au choix :
> 1. Règlement intégral sous 7 jours ;
> 2. Échéancier écrit en deux fois maximum, confirmé par retour de mail avant le [JJ/MM/AAAA].
>
> À défaut, nous transmettrons le dossier à notre conseil.
>
> Cordialement,
> [Signature]

**Miroir EN (court) :**

> Subject: Overdue invoice [FACTURE N°] – payment required within 7 days
> Dear [CLIENT], despite our reminder of [date], invoice [FACTURE N°] for **[MONTANT] MAD** remains unpaid. Contract [CONVENTION N°] provides for a late-payment penalty capped at **10 %** of the amount due (Article 264 DOC), which we would rather not trigger. Two options: full settlement within 7 days, or a written two-instalment schedule confirmed by email before [date]. Failing this, the file will be handed to counsel.

**Script AR (court) :**

أستاذ [CLIENT]، الرسالة الأولى ما وصلاتش للاستجابة. الفاتورة [FACTURE N°] ديال [MONTANT] درهم مازال ما تخلصاتش. الاتفاقية فيها غرامة تأخير حتى لـ 10% (المادة 264 DOC) — ما بغيناش نوصّل ليها. إما الخلاص خلال 7 أيام، أو جدولة مكتوبة فجوج دفعات.

---

## LR — Mise en demeure (J+30, délai 15 jours)

```
Recommandé avec accusé de réception

[Émetteur : Nom, Qualité, Société, Adresse]

Destinataire : [CLIENT] — [Société du débiteur], [Adresse]

Objet : MISE EN DEMEURE — Facture [FACTURE N°] — [MONTANT] DH TTC

Madame, Monsieur,

Malgré deux rappels (courriels des [JJ/MM/AAAA] et [JJ/MM/AAAA]), la
facture [FACTURE N°], d'un montant de [MONTANT] DH TTC, échue le
[DATE ÉCHÉANCE], demeure intégralement impayée.

En conséquence, nous vous METTIONS EN DEMEURE de régler la somme de
[MONTANT] DH TTC, augmentée des intérêts moratoires courant à compter
de la présente (article 78 du DOC), dans un délai de QUINZE (15) jours
à compter de sa réception.

À défaut de règlement dans ce délai :
1. La clause pénale contractuelle de 10 % sera appliquée (art. 264 DOC) ;
2. Une demande d'astreinte pourra être sollicitée auprès du tribunal de
   commerce, la condamnation pouvant être assortie d'une astreinte
   pécuniaire par jour de retard (article 258 du DOC) ;
3. Une procédure d'injonction de payer sera engagée devant le tribunal
   de commerce, tous frais et intérêts à votre charge.

La présente vaut mise en demeure définitive, sans nouvelle notification.

Fait à [Ville], le [JJ/MM/AAAA]
[Signature], [Qualité]
```

**Miroir EN (condensé) :** Formal notice served by registered letter: invoice [FACTURE N°] for [MONTANT] MAD unpaid since [DATE ÉCHÉANCE]. You have FIFTEEN (15) days to settle, plus late interest (Art. 78 DOC). Failing this: 10 % contractual penalty (Art. 264 DOC), application for a daily penalty payment before the Commercial Court (Art. 258 DOC), and payment-order proceedings at your cost.

**Script AR (appel après réception de la LR) :**

أستاذ [CLIENT]، توصلك دابا رسالة مقيّدّة. عندك 15 يوم باش تخلص [MONTANT] درهم. من بعد كاينة الغرامة ديال 10%، الأسترينت غرامة يومية، والمحكمة التجارية. الله يخليها للتفاهم.

---

## Après la LR : escalade

Sans règlement sous les 15 jours, le dossier est prêt par construction (emails horodatés + accusé de réception + convention + factures). Poursuite :

**Renvoi direct : `../../04_Skills_To_Learn/14_Litigation/06_Injonction_De_Payer_TribCom.md`**

## Pièges du recouvrement

| Piège | Antidote |
|---|---|
| Ton agressif dès l'email 1 | Fermeté croissante : cordial J+7, ferme J+15, juridique J+30. |
| Menacer d'assignation avant la LR | La LR est le socle probatoire ; sans elle, le discours est fragile. |
| Promettre une remise orale pour accélérer | Toute remise = avenant écrit, sinon nouveau conflit sur le solde. |
| Chèque sans date ou montant raturé | Date, ordre, montant lisibles, sinon effet de commerce inutilisable. |
| Relancer «à feeling» sans calendrier | Le tableau J+7 / J+15 / J+30 / J+45 s'affiche dans le suivi du dossier. |

## EN - Key takeaways

- Amicable recovery sequence: friendly reminder J+7 → formal e-mail J+15 (mention the ~10% penalty, DOC art.264) → formal notice (mise en demeure) with 15-day deadline → injunction to pay as last resort.
- Every message carries a figure with its legal basis; no empty threats. Any discount agreed must be written (avenant), never oral.
- The three templates (FR + short EN + Darija lines) are ready to adapt: client name, invoice number, amount, dates.

## AR - ملخص ومصطلحات

| FR | EN | AR |
|----|----|----|
| recouvrement amiable | amicable recovery | التحصيل الودي |
| mise en demeure | formal notice | إنذار رسمي |
| clause pénale | penalty clause | شرط جزائي |
| relance | follow-up | تذكير |
| avenant écrit | written amendment | ملحق كتابي |
| injonction de payer | payment order | أمر بالأداء |

**Darija :** التسلسل: تذكير J+7، رسالة رسمية J+15، إنذار 15 يوم، و من بعد الأمر بالأداء. كل رسالة فيها رقم مع أساسه القانوني، والخصومات دائمًا بالكتابة.

---
**Sources primaires :** sgg.gov.ma (Loi 28-08, DOC, CGI) · cndp.ma · oc.gov.ma (IGOC 2024). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Mission = diagnostic + convention écrite + provision (art.30/32). Secret professionnel art.36.
