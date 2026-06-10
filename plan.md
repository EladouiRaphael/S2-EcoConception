Contexte:
Sur la base de l'audit initial (EcoIndex A — 89,64), plusieurs mauvaises pratiques ont été
identifiées malgré un bon score de départ. Ce plan liste les user stories retenues, les
modifications prévues, leur ordre de réalisation et les résultats attendus.

User stories:
    Story 1 — Chargement initial plus rapide
        Priorité : Haute
        ChampDétailProblème sourceAbsence de cache HTTP, HTTP/1 exclusif, CSS/JS non minifiésObjectifLCP < 1 500 msKPIScore Performance Lighthouse, LCPModifications prévuesVoir Sprint 1 et Sprint 2 ci-dessous

    Story 2 — Réduction du poids des images
        Priorité : Haute
        ChampDétailProblème source1 image retaillée dans le navigateurObjectif80 % des images converties en WebP, poids dossier /assets < 2 MoKPIPoids total des images, nombre d'images redimensionnées = 0Modifications prévuesVoir Sprint 3 ci-dessous

    Story 3 — Accessibilité améliorée
        Priorité : Moyenne
        ChampDétailProblème sourceNon couvert directement par GreenIT mais requis par le backlog (RGESN 6.3)ObjectifConformité AA WCAG, score accessibilité Lighthouse > 90KPIScore Accessibilité LighthouseModifications prévuesVoir Sprint 4 ci-dessous

    Story 4 — Réduction des ressources inline et print CSS
        Priorité : Basse
        ChampDétailProblème source2 blocs inline CSS/JS détectés, absence de print CSSObjectif0 bloc inline, présence d'une feuille print.cssKPIRésultat GreenIT "Externaliser CSS/JS" = ✅, "Fournir une print CSS" = ✅



Sprint 1 — Minification CSS et JS
Modifications prévues

    Intégrer un outil de minification dans le pipeline de build :

    CSS → cssnano ou clean-css
    JS → terser ou option minify du bundler (Vite, Webpack, Parcel…)

Vérifier le bon fonctionnement de l'application après minification


Sprint 2 — Cache HTTP et HTTP/2
Modifications prévues
    
    Cache-Control / Expires

        Ajouter des en-têtes Cache-Control sur les ressources statiques (images, CSS, JS, fonts) :

        Ressources versionnées (hash dans le nom) → Cache-Control: public, max-age=31536000, immutable
        HTML → Cache-Control: no-cache (revalidation à chaque visite)


        Configuration selon le serveur utilisé :

            Apache → directives dans .htaccess
            Nginx → bloc location dans la config
            Node/Express → middleware serve-static ou express.static avec option maxAge


    HTTP/2

        Activer HTTP/2 sur le serveur (nécessite TLS/HTTPS)
        Vérifier la compatibilité de l'hébergement
        Contrôler via DevTools Network que le protocole passe de h1 à h2


Sprint 3 — Optimisation des images
Modifications prévues

    Identifier l'image retaillée dans le navigateur (via GreenIT ou DevTools)
    Recalibrer ses dimensions à la source pour correspondre exactement à l'affichage CSS
    (ou utiliser l'attribut srcset pour le responsive)
    Convertir les images PNG/JPEG en WebP :


    Vérifier que le poids total du dossier /assets est inférieur à 2 Mo

    Revoir le fonctionnement de l'animation 3d en bas de page pour la rendre activable avec un bouton


Sprint 4 — Ressources inline, print CSS et accessibilité
Modifications prévues

    Externalisation des ressources inline

        Identifier les 2 blocs <style> ou <script> inline dans le HTML
        Les déplacer dans des fichiers .css / .js externes référencés via <link> et <script src>
        Bénéfice : mise en cache navigateur, séparation des préoccupations, CSP simplifiée

    Print CSS

        Créer un fichier print.css (ou un media query @media print dans le CSS principal)
        Masquer les éléments non imprimables : navigation, sidebar, boutons, bannières
        Référencer via <link rel="stylesheet" media="print" href="print.css">

    Accessibilité (WCAG AA)

        Auditer les contrastes texte/fond avec un outil dédié (Colour Contrast Analyser, axe DevTools)
        Corriger les ratios inférieurs à 4,5:1 (texte normal) ou 3:1 (grand texte)
        Vérifier la présence d'attributs alt sur toutes les images
        Vérifier la navigation clavier (focus visible, ordre logique)


Critères de validation globaux
Pour chaque modification, avant de clore le sprint :

 L'application fonctionne correctement (navigation, données, interactions)
 Le besoin utilisateur reste satisfait
 La bonne pratique GreenIT correspondante passe en ✅
 Un indicateur mesurable montre un gain (poids, temps, score Lighthouse)