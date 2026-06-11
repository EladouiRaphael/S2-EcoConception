# Audit initial —

## 1. Résultats GreenIT / EcoIndex

| Indicateur | Valeur |
|---|---:|
| **Score EcoIndex** | **89,64 / 100 — Classe A** |
| Eau | 1,81 cl |
| GES | 1,21 gCO2e |
| Nombre de requêtes HTTP | 9 |
| Taille de la page (transférée) | 7 Ko (9 465 Ko non compressé) |
| Taille du DOM | 140 nœuds |

---

## 2. Analyse des bonnes pratiques GreenIT

### ✅ Points conformes

| Bonne pratique | Résultat |
|---|---|
| Compresser les ressources (≥ 95 %) | 100 % des ressources compressées |
| Limiter le nombre de domaines (< 6) | 1 domaine trouvé |
| Éviter les requêtes en erreur | 0 erreur HTTP |
| Limiter le nombre de requêtes HTTP (≤ 40) | 9 requêtes HTTP |
| Ne pas télécharger des images inutilement | 0 image téléchargée mais non affichée |
| Pas de cookie pour les ressources statiques | Aucun cookie |
| Éviter les redirections | 0 redirection |
| Optimiser les images bitmap | Pas d'images bitmap à optimiser |
| Optimiser les images SVG | Pas de SVG à optimiser |
| Pas de boutons standards réseaux sociaux | Aucun bouton trouvé |
| Limiter le nombre de fichiers CSS (≤ 10) | 7 fichiers CSS (conforme) |

### ❌ Points non conformes (problèmes identifiés)

| # | Bonne pratique | Constat | Priorité |
|---|---|---|---|
| 1 | **Ajouter des headers `Expires` / `Cache-Control`** | Absents — les ressources ne sont pas mises en cache côté client | Haute |
| 2 | **Ne pas retailler les images dans le navigateur** | 1 image retaillée côté navigateur (attributs `width`/`height` CSS différents des dimensions réelles) | Haute |
| 3 | **Externaliser les CSS et les JS** | 2 feuilles de style et/ou scripts inline détectés | Moyenne |
| 4 | **Minifier les CSS et JS** | 1 461 / 1 463 fichiers CSS ou JS non minifiés | Haute |
| 5 | **Fournir une print CSS** | Absente — une feuille d'impression permettrait de ne pas imprimer les éléments inutiles | Basse |
| 6 | **Privilégier HTTP/2 à HTTP/1** | 9/9 ressources chargées en HTTP/1 — aucune multiplexation | Haute |
| 7 | **Utiliser des polices de caractères standards** | Aucune police spécifique détectée (conforme), mais à surveiller si de nouvelles ressources sont ajoutées | Info |

---

## 3. Principaux problèmes identifiés

### 🔴 Critique

- **Absence de cache HTTP** : sans `Cache-Control` ni `Expires`, chaque visite rechargera l'ensemble des ressources depuis le serveur, générant des requêtes inutiles et une consommation réseau répétée.
- **CSS et JS non minifiés** : 1 461 fichiers sur 1 463 ne sont pas minifiés. C'est la principale source de poids superflu ; la minification peut réduire la taille des fichiers de 20 à 60 %.
- **HTTP/1 exclusif** : l'absence de HTTP/2 empêche le multiplexage des requêtes. Avec HTTP/2, les 9 requêtes actuelles seraient toutes servies sur une seule connexion TCP, réduisant la latence.

### 🟠 Modéré

- **Image retaillée dans le navigateur** : servir une image plus grande que sa taille d'affichage consomme de la bande passante et des cycles CPU côté client pour le redimensionnement. L'image doit être exportée aux dimensions exactes d'affichage (ou en `srcset` pour le responsive).
- **Styles / scripts inline** : 2 blocs inline empêchent la mise en cache de ces ressources et complexifient la politique CSP.

### 🟡 Mineur

- **Absence de print CSS** : sans feuille d'impression, l'utilisateur qui imprime une page inclura navigations, publicités et éléments décoratifs, générant du papier et de l'encre inutiles.

---

## 4. Correspondance avec le backlog

| Story | Problème couvert |
|---|---|
| Story 1 — Chargement initial rapide | Cache HTTP absent, HTTP/1, CSS/JS non minifiés |
| Story 2 — Réduction poids images | Image retaillée dans le navigateur |
| Story 3 — Accessibilité améliorée | Non directement couvert par cet audit GreenIT (voir audit Lighthouse) |

---

## 6. Synthèse

Le site présente un profil EcoIndex **A (89,64)**, ce qui est déjà très satisfaisant en termes de volume de données transférées et de nombre de requêtes. Cependant, plusieurs axes d'amélioration techniques subsistent :

1. La **mise en cache** est absente, ce qui nuit aux visites répétées.
2. Les **fichiers CSS/JS quasi-universellement non minifiés** constituent le levier d'optimisation le plus impactant.
3. Le **passage à HTTP/2** est une amélioration structurelle majeure à faible coût.
4. Une **image est mal dimensionnée** et doit être recadrée à la source.
5. Les **ressources inline** freinent la mise en cache et la séparation des préoccupations.

Ces corrections forment la base du plan d'action (`plan.md`).
