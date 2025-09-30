
# Backlog du projet "FinMastery"

## USER STORIES

---

### Story 1 : Design plus sombre et mode base consommation

**En tant que** utilisateur web,  
**je veux** que l’écran de prise de rendez-vous soit sobre et propose un mode base consommation (DarkMode)  
**afin de** réduir l'éblouissement, diminuer de la lumière bleue, amélioerer le contraste
et réduire la fatigue occulaire.

- 🎯 Objectif : Mode basse consommation
- 🧱 BP associée : RGESN - UX & sobriété numérique
- 🛠️ KPI : LCP sur web (Lighthouse)
- 📅 Tag roadmap : M1

---

### Story 2 : Simplification du Parcours de Réservation

**En tant que** nouvel utilisateur,
**je veux** pouvoir finaliser ma prise de rendez-vous en un minimum d'étapes et de pages
**afin de** ne pas perdre de temps et d'aller directement à l'essentiel.

- 🎯 Objectif : Réduire le parcours utilisateur à 3 étapes maximum
- 🧱 BP associée : Éconception Web 5.0.0 0005 - Optimiser le parcours utilisateur
- 🛠️ KPI : Nombre de requêtes serveur divisé par 2 pour l'UF "Prendre un rendez-vous"
- 📅 Tag roadmap : M2

---

### Story 3 : Réduction poids images

**En tant que** utilisateur récurrent,  
**je veux** que les visuels de la page prise de rendez-vous soient plus légers  
**afin de** économiser de la data sur mon forfait.

- 🎯 Objectif : 90% des images converties en WebP
- 🧱 BP associée : Compression d’images / formats modernes
- 🛠️ KPI : Poids total dossier `/assets` < 2.5 Mo
- 📅 Tag roadmap : M3

---

### Story 4 : Optimisation des échanges de données (API)

**En tant que** développeur back-end,
**je veux** que l'API ne renvoie que les champs de données strictement nécessaires à l'affichage du calendrier et des disponibilités
**afin de** minimiser le poids des données transférées et d'accélérer l'affichage côté client.

- 🎯 Objectif : Réduire de 50% le poids des réponses de l'API
- 🧱 BP associée : Éconception Web 5.0.0 0009 - Limiter le nombre de requêtes & le poids des données
- 🛠️ KPI : Poids moyen d'une réponse JSON de l'API < 15 Ko
- 📅 Tag roadmap : M3

---

### Story 5 : Optimisation Back-End & Infra

**En tant que** administrateur systeme
**je veux** que les données des rendez-vous passés soient automatiquement purgées après une période définie.
**afin de** maintenir une base de données légère, optimiser les performances
et respecter les principes du RGPD.

- 🎯 Objectif : Aléger la base de données et améliorer les temps de réponses
- 🧱 BP associée : Éconception Web 5.0.0 017 Choisir un format de données adapté pour la base de données
- 🛠️ KPI : Réduire de 30% le temps de réponse moyen des requêtes API
- 📅 Tag roadmap : M3

---

### Story 6 : Chargement initial plus rapide

**En tant que** nouvel utilisateur web,  
**je veux** que l’écran de prise de rendez-vous charge en moins de 1,5 s  
**afin de** ne pas décrocher lors d’un pic de réseau lent.

- 🎯 Objectif : temps de chargement < 1500 ms
- 🧱 BP associée : Éconception Web 5.0.0 0037 - Utiliser le chargement paresseux & Favoriser un design simple
- 🛠️ KPI : LCP sur web (Lighthouse)
- 📅 Tag roadmap : M4

---

### Story 7 : Hébergement Mutualisé

**En tant que** responsable Technique (CTO)
**je veux** héberger l'application sur une plateforme mutualisée (PaaS).
**afin de** réduire nos coûts d'exploitation et avoir une meilleure utilisation des ressources serveur.

- 🎯 Objectif : Diminuer l'empreinte financière et environnementale de l'infrastructure
- 🧱 BP associée : RGESN - Gestion infrastructure
- 🛠️ KPI : Réduction de 40% du coût mensuel d'hébergement
- 📅 Tag roadmap : M4

---

### Story 8 : Maîtrise de l'impact de la Visioconférence

**En tant qu'** utilisateur soucieux de mon impact,
**je veux** pouvoir choisir un mode "audio seul" pour mon rendez-vous ou être prévenu de l'impact de la vidéo
**afin de** maîtriser ma consommation de données et mon empreinte carbone.

- 🎯 Objectif : Donner le choix à l'utilisateur et le sensibiliser
- 🧱 BP associée : RGESN - Sobriété fonctionnelle & Information de l'utilisateur
- 🛠️ KPI : Taux d'adoption du mode "audio seul" > 20%
- 📅 Tag roadmap : M4


### Story 9 : Rationalisation des emails de notification et remplacement des email de rappel par des SMS
<!-- Source de l'information (https://youmartter.world) -->
**En tant qu'** utilisateur,
**je veux** recevoir un seul email récapitulatif pour la confirmation et le lien de la visio et le/les rappel(s) sera envoyé par SMS 
**afin de** ne pas surcharger ma boîte mail, de limiter le stockage de données inutiles, reduire l'empreinte carbonne 
(un email environ 3 à 50gCO2e => un SMS environ 0.00215 à 0.014gCO2e)

- 🎯 Objectif : Diminuer le volume d'emails transactionnels
- 🧱 BP associée : RGESN - Stratégie de contenu & Sobriété
- 🛠️ KPI : Réduction de 40% du nombre total d'emails envoyés par rendez-vous
- 📅 Tag roadmap : M5