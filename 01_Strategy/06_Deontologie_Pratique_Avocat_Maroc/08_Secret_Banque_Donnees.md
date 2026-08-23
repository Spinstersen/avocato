# 08 — Secret, banque et données : la conservation sécurisée

> ⚠️ **MISE À JOUR 23/08/2026 — Loi n° 66.23 en vigueur (BO n°7536 du 20/08/2026) : la loi 28-08 est ABROGÉE.** Les articles cités ci-dessous (art. 30, 32, 33-35, 59…) renvoient à l'ancien texte ; **re-mapping des équivalences vers la loi 66.23 en cours** (traçabilité honoraires, stage 2 ans, discipline réformée). Détail : `00_START_HERE/12_VEILLE_LEGALE_2025_2026.md` §A2.


La conservation des données client implique des obligations de sécurité (Loi 09-08, secret professionnel, RIO). Ce fichier détaille les exigences et les pratiques.

## 1. Le cadre applicable

- **Loi 28-08** (art. 33-35) : secret professionnel.
- **Loi 09-08** : protection des données personnelles.
- **RIO** : obligation de sécurité des dossiers.

## 2. Les principes de conservation

### 2.1 Sécurité

- Données chiffrées (disque, sauvegardes).
- Accès restreint (avocat + collaborateurs autorisés).
- Mots de passe forts et uniques.
- 2FA sur tous les comptes.

### 2.2 Confidentialité

- Pas d'accès à des tiers non autorisés.
- Pas de stockage sur Dropbox non configuré.
- Pas d'IA externe avec données client identifiées.

### 2.3 Conservation

- Durée légale : 10 ans minimum (sauf plus pour certains contentieux).
- Conservation dans un lieu sécurisé (coffre, armoire, disque chiffré).

### 2.4 Réversibilité

- Restitution du dossier au client à sa demande.
- Format lisible (PDF, Word, Notion exportable).
- Délai de 15 jours indicatif.

## 3. Les supports de conservation

### 3.1 Disque dur local chiffré

- Recommandé pour les données sensibles.
- BitLocker (Windows), FileVault (Mac), LUKS (Linux).
- Sauvegardes chiffrées sur disque externe ou NAS.

### 3.2 Cloud maîtrisé

- Hébergement UE ou Maroc.
- Chiffrement bout-en-bout.
- Pas de Dropbox / Google Drive non configurés pour la sécurité.

### 3.3 Notion (sous-traitant US)

- Notion est un sous-traitant américain.
- Pour les dossiers sensibles : préférer le local.
- Pour les brouillons et modèles : Notion acceptable (sans données identifiantes).

### 3.4 Cloud public (AWS, GCP, Azure)

- Configuration de sécurité avancée nécessaire.
- Chiffrement des données au repos et en transit.
- Localisation UE de préférence.
- Politique de confidentialité conforme 09-08.

## 4. La destruction sécurisée

À la fin du délai de conservation :

- **Broyage** des documents papier.
- **Effacement définitif** des fichiers (pas simple suppression).
- **Certificat de destruction** si destruction par un tiers.

## 5. Les mesures techniques obligatoires

| Mesure | Outil |
| :--- | :--- |
| Chiffrement disque | BitLocker / FileVault |
| Mots de passe uniques | 1Password / Bitwarden |
| 2FA | Authy / Google Authenticator |
| Sauvegardes chiffrées | Restic / Borg / Backblaze |
| VPN (en mobilité) | Mullvad / ProtonVPN |
| Anti-malware | Malwarebytes / Windows Defender |

## 6. Le plan de continuité

En cas d'incident (vol, panne, sinistre) :

- **Sauvegardes externalisées** (au moins 2 lieux distincts).
- **Restauration testée** 1x/an.
- **Inventaire** des dossiers à jour.
- **Procédure de notification CNDP** en cas de fuite de données (art. 65 Loi 09-08).

## 7. FAQ

**Q : Le Cloud est-il conforme à la Loi 09-08 ?**
R : Oui, sous conditions (chiffrement, hébergement UE ou Maroc, contrat de sous-traitance conforme).

**Q : Puis-je utiliser Notion pour les dossiers client ?**
R : Risqué (sous-traitant US). Préférer local pour les données identifiantes.

**Q : Combien de temps conserver les dossiers ?**
R : 10 ans minimum pour la plupart. Plus pour certains contentieux (15-30 ans).

**Q : Que faire en cas de vol d'ordinateur avec des données client ?**
R : (1) Dépôt de plainte. (2) Notification CNDP si données identifiables. (3) Information aux clients concernés. (4) Audit de sécurité.

---

**Suivant :** `09_Fiches_Pratiques.md` — Outils prêts à l'emploi.
