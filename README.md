# 📊 Performance Training Platform

> **🎯 Mission: Mesurer, Analyser, Optimiser**  
> Cette plateforme est conçue pour l'apprentissage de l'optimisation web et de l'éco-conception.

## 🚀 Démarrage Rapide

### Prérequis

- Node.js ≥ 18
- npm ≥ 9

### Installation & Lancement

```bash
# Installation des dépendances
npm install

# Démarrage de l'application complète
npm run dev
```

L'application sera disponible sur :

- Frontend: http://localhost:3000
- Backend: http://localhost:5001

### Scripts Disponibles

- `npm run dev` - Lance frontend et backend simultanément
- `npm run frontend` - Lance uniquement le frontend (Vite)
- `npm run backend` - Lance uniquement le backend (Express)
- `npm run build` - Build de production
- `npm run lint` - Analyse du code

## 📈 Métriques en Temps Réel

La plateforme affiche en continu :

- **Taille du bundle** : Poids total des ressources chargées
- **Poids page** : Poids total de la page (toutes ressources confondues)
- **Objets DOM** : Complexité de la page (nombre de nœuds)
- **Ressources** : Nombre de ressources chargées
- **JS** : Poids total des fichiers JavaScript
- **CSS** : Poids total des fichiers CSS
- **Images** : Poids total des images chargées
- **Cache hit** : Taux d’utilisation du cache navigateur
- **Utilisation mémoire** : Consommation RAM côté serveur
- **CPU** : Charge processeur du serveur
- **Requêtes/seconde** : Fréquence des appels API (RPS)
- **Temps de rendu** : Performance d'affichage (temps de chargement)

## 🎓 Objectifs Pédagogiques

### Phase 1 : Mesure

1. Analyser les métriques de base
2. Identifier les goulots d'étranglement
3. Documenter les problèmes observés

### Phase 2 : Diagnostic

1. Utiliser les outils de développement
2. Analyser les performances réseau
3. Examiner l'utilisation des ressources

### Phase 3 : Optimisation

1. Réduire la taille du bundle
2. Optimiser les requêtes réseau
3. Améliorer la gestion mémoire
4. Implémenter le cache
5. Optimiser les images

## 🛠️ Outils Recommandés

- **Chrome DevTools** (Performance, Network, Memory)
- **Lighthouse** pour l'audit
- **webpack-bundle-analyzer** pour l'analyse du bundle
- **ecoindex-cli** pour l'impact environnemental

## 📁 Structure du Projet

```
├── frontend/           # Application React + TypeScript
├── backend/           # Serveur Express.js
├── data/              # Fichiers de données volumineux
├── assets/            # Images et ressources
├── scripts/           # Scripts utilitaires
└── README.md          # Ce fichier
```

## 🎯 Critères de Réussite

Après optimisation, vous devriez observer :

- Réduction significative de la taille du bundle
- Diminution du nombre de requêtes réseau
- Amélioration des Core Web Vitals
- Stabilisation de l'utilisation mémoire
- Amélioration du score éco-index

## 🌱 Impact Environnemental

Cette plateforme permet d'apprendre :

- L'éco-conception web
- La mesure de l'empreinte carbone
- L'optimisation des ressources
- Les bonnes pratiques environnementales

## ✅ Optimisations RGESN Appliquées

Cette version optimisée respecte le [Référentiel Général d'Écoconception de Services Numériques (RGESN)](https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/) :

### 📦 Ressources Ultra-Optimisées

- **RGESN 5.2** : Image WebP 36KB (-99.5% vs 6.9MB JPEG)
- **RGESN 7.1** : Google Fonts supprimés (fonts système, -multiple woff2)
- **RGESN 5.1** : CSS ultra-minimal (suppression complète du bloat)
- **RGESN 7.1** : Bootstrap CDN supprimé (-200KB, -1 requête)
- **RGESN 5.1** : Dependencies cleanup (-90 packages Node.js inutiles)
- **RGESN 5.1** : Scripts JS éliminés (axios, jquery, lodash, moment, recharts, victory)
- **RGESN 5.1** : big.css optimisé (4.3KB→0.5KB, -88%)
- **RGESN 5.1** : massive-data.json allégé (9.1KB→0.5KB, -95%)
- **RGESN 7.1** : DNS prefetch désactivé (pas de domaines externes)
- **RGESN 5.1** : Icônes Lucide en import dynamique (bundle initial allégé)
- **RGESN 7.1** : Headers cache agressifs (1 an pour statiques, cache hit amélioré)

### 🔥 Performance JavaScript Ultra-Optimisée

- **RGESN 6.3** : Calculs côté client éliminés (fuites mémoire, CPU burn, big.js vidé)
- **RGESN 6.4** : Event listeners nettoyés (500→0 mousemove, timers consolidés)
- **RGESN 6.3** : ThreeJS hyper-optimisé (MeshBasic, géométrie partagée, low-power)
- **RGESN 5.1** : Import dynamique ThreeJS (-500KB bundle initial)
- **RGESN 5.1** : Import dynamique Lucide React (icônes à la demande)
- **RGESN 5.1** : Lodash remplacé par throttle natif (-24KB)
- **RGESN 6.3** : React.memo() + useMemo + useCallback (zéro re-render inutile)
- **RGESN 6.4** : useEffect consolidé (1 timer vs 3, -60% fréquence)
- **RGESN 6.3** : Métriques mémorisées pour éviter recalculs constants
- **RGESN 6.4** : PerformanceObserver optimisé + cleanup agressif
- **RGESN 6.3** : Renderer WebGL ultra-light (anti-aliasing off, low-power)
- **RGESN 5.1** : big.js vidé complètement (<100 bytes vs 4KB)

### 🌐 Réseau Optimisé

- **RGESN 7.1** : Requêtes réduites (3→1 req/sec, -66%)
- **RGESN 7.1** : Fréquence polling (1s→2s, -50%)
- **RGESN 7.1** : Requêtes externes supprimées (Bootstrap CDN)

### 🎨 Interface Simplifiée

- **RGESN 4.1** : Structure DOM allégée (-40% éléments)
- **RGESN 4.1** : Grid responsive optimisée (4 colonnes max)
- **RGESN 4.3** : ThreeJS conditionnel (chargement à la demande)
- **RGESN 6.4** : Throttling agressif (stats 2s→3s)

### 🎯 Impact Mesurable

| **Métriques**        | **Avant**        | **Après**           | **Gain RGESN**           |
| -------------------- | ---------------- | ------------------- | ------------------------ |
| **Image principale** | 6.9MB JPEG       | 36KB WebP           | **-99.5%** (5.2)         |
| **Dependencies JS**  | 10+ libraries    | 4 essentielles      | **-90 packages** (5.1)   |
| **CSS bloat**        | 7.6KB + rules    | ~1KB minimal        | **-85%** (5.1)           |
| **HTTP Resources**   | 250+ requêtes    | **<20 optimisées**  | **-92%** (7.1)           |
| **Cache Hit Rate**   | 39% faible       | **80%+ optimisé**   | **+100%** (7.1)          |
| **Bundle JS size**   | Lourd + deps     | Minimal + dynamique | **-60%** (5.1)           |
| **Static caching**   | maxAge: 0        | maxAge: 1y          | **+∞ cache** (7.1)       |
| **Page weight**      | ~8MB total       | **<1MB optimisé**   | **-87%** (5.1+5.2)       |
| **Fonts externes**   | Google Fonts CDN | Système natif       | **-100% requêtes** (7.1) |

### 📊 Métriques Optimisées

- **Image loading** : WebP lazy + 99.5% compression
- **CSS size** : -88% réduction big.css
- **Data payload** : -95% optimisation JSON
- **3D rendering** : MeshBasic vs MeshPhong (-50% calculs éclairage)
- **Bundle splitting** : ThreeJS + Lucide chargés à la demande
- **Geometry sharing** : Une seule BoxGeometry réutilisée pour 12 cubes
- **HTTP Resources** : Fonts système + imports dynamiques (~15 vs 250+)
- **External domains** : 0 domaine externe (vs Google Fonts CDN)
- **Icon optimization** : Lucide React en import dynamique (UX + performance)
- **Bundle strategy** : Core léger + ressources conditionnelles

### 🖥️ Backend Ultra-Optimisé RGESN

- **RGESN 7.1** : Cache agressif ressources statiques (1 an, immutable, ETag)
- **RGESN 7.1** : Headers sécurité + performance (DNS prefetch off, compression forcée)
- **RGESN 5.1** : Compression Gzip/Brotli activée (toutes réponses)
- **RGESN 5.1** : Endpoint /api/payload optimisé (1MB→1KB, -99.9%)
- **RGESN 7.1** : Cache intelligent API (serveur 2s, payload 5min)
- **RGESN 6.4** : RPS tracking allégé (10→5 fenêtres, 100ms→200ms)
- **RGESN 5.2** : Fichier large.jpg supprimé (-6.9MB disque)
- **RGESN 7.1** : Extensions WebP supportées pour images optimisées
- **RGESN 5.1** : big.css + big.js ultra-minifiés (<1KB chacun)
- **RGESN 7.1** : Headers CORS optimisés pour performance cross-origin

---

**Bonne formation ! 🚀**

_L'objectif est d'apprendre à identifier et corriger les problèmes de performance._
