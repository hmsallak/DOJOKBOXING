# MBT Academy — Workflow de création du site (9 prompts pré-remplis)

## Mode d'emploi

1. Complète **une seule fois** la FICHE MBT ci-dessous (tous les `[À COMPLÉTER]`).
2. Chaque prompt commence par `{FICHE MBT}` : colle la fiche à cet endroit.
3. Chaque prompt réutilise le résultat des étapes précédentes (`{SORTIE ÉTAPE X}`). Enregistre chaque réponse dans `docs/etape-X.md` avant de passer à la suivante.
4. Ordre : 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9. Les étapes 2 et 3 peuvent tourner en parallèle.

Règle commune à ajouter si l'IA devient vague :
> Si une information manque, fais une hypothèse réaliste, écris-la dans une section « Hypothèses » et continue. Ne me pose pas de question.

---

## FICHE MBT (source unique de vérité)

```
MARQUE : MBT Academy
TYPE DE SITE : site vitrine + réservation de séance d'essai pour un club de boxe
ACTIVITÉ : club / académie de boxe — [boxe anglaise ? + boxe thaï / kick ? À COMPLÉTER]
VILLE / ZONE : [ville, quartier, rayon de 10–15 min — À COMPLÉTER]
ADRESSE : [À COMPLÉTER] — accès transports : [À COMPLÉTER] — parking : [oui/non]

AUDIENCES (par priorité) :
  1. Adultes débutants 20–40 ans (forme, défoulement, confiance en soi)
  2. Parents cherchant un cours enfants / ados (6–15 ans)
  3. Femmes cherchant un cours adapté ou non-mixte [si proposé]
  4. Pratiquants confirmés / compétiteurs (sparring, prépa combat)

COURS PROPOSÉS : [liste : Boxe débutant, Boxe confirmé, Kids, Ados, Cardio boxe, Cours privé… — À COMPLÉTER]
PLANNING : [jours / horaires / niveau de chaque cours — À COMPLÉTER]
TARIFS : [séance d'essai (gratuite ?), carte 10 séances, mensuel, annuel, tarif enfant, frais d'inscription — À COMPLÉTER]
COACHS : [nom, rôle, palmarès / diplômes (BPJEPS, DE…), spécialité, photo dispo ? — À COMPLÉTER]
PREUVES : [nb de membres, années d'existence, combattants, avis Google (note + nb), photos/vidéos réelles — À COMPLÉTER]

OBJECTIF PRINCIPAL : réservations de séance d'essai
OBJECTIF SECONDAIRE : inscriptions / demandes enfants + prises de contact (WhatsApp, téléphone)
CTA PRINCIPAL : « Réserver ma séance d'essai »
CTA SECONDAIRES : « Voir le planning », « Voir les tarifs », « Nous écrire sur WhatsApp »

IDENTITÉ VISUELLE : [logo existant ? couleurs ? — À COMPLÉTER]
DIRECTION ARTISTIQUE : sport / brut / premium, inspiration Jab Boxing Club : fond sombre,
  typographie condensée très grasse en majuscules, photos réelles contrastées (grain, noir & blanc
  + une couleur d'accent), peu d'éléments décoratifs, énergie et discipline plutôt que « fitness lisse ».
TON : direct, motivant, tutoiement ou vouvoiement [À CHOISIR], jamais agressif, rassurant pour débutants.
LANGUE : français

STACK : Next.js (App Router) + TypeScript + Tailwind CSS + Supabase, déploiement Vercel
FONCTIONNALITÉS :
  - Planning des cours filtrable (niveau, âge, jour)
  - Réservation de séance d'essai (choix du cours + créneau + coordonnées)
  - Page tarifs
  - Pages coachs
  - Formulaire de contact + bouton WhatsApp
  - Galerie photos / vidéos
  - Avis clients (Google)
  - Back-office simple : gérer planning, voir les réservations
```

---

## 1 — Architecture produit & site

```
Tu es un architecte produit senior spécialisé dans les sites de clubs sportifs, orientés conversion locale.

{FICHE MBT}

Construis l'architecture complète du site MBT Academy.

Contraintes de départ (à respecter, pas à rediscuter) :
- Pages minimum : Accueil, Cours (+ une page par discipline/public si pertinent), Planning, Tarifs,
  Coachs, Séance d'essai (réservation), Contact, Mentions légales, Politique de confidentialité.
- Le CTA « Réserver ma séance d'essai » doit être accessible en 1 clic depuis n'importe quelle page
  (header + barre fixe en bas sur mobile).
- 70 % du trafic sera mobile, arrivant depuis Google Maps, Instagram et la recherche « boxe [ville] ».

Je veux :
- l'arborescence exacte (URL de chaque page)
- la fonction de chaque page
- la hiérarchie H1/H2/H3
- CTA principaux et secondaires par page
- 4 parcours utilisateurs : adulte débutant, parent pour un enfant, compétiteur, visiteur venant d'Instagram
- les points de conversion et les micro-conversions (clic WhatsApp, clic téléphone, clic itinéraire)
- les composants réutilisables
- les données nécessaires (cours, créneaux, coachs, tarifs, avis…)
- les formulaires et leurs champs exacts
- la stratégie SEO locale par page (mots-clés « boxe [ville] », « cours de boxe enfant [ville] », etc.)
- les données structurées Schema.org (SportsActivityLocation / LocalBusiness, Event ou Course pour les cours, FAQPage, Person pour les coachs)
- objectifs Core Web Vitals (LCP < 2,5 s, CLS < 0,1, INP < 200 ms sur 4G)
- contraintes mobile

Pour chaque page : objectif → sections → composants → contenu → CTA → données → interactions.
Fais des choix concrets. Termine par une section « Hypothèses ».
```

## 2 — Design system

```
Tu es Lead Product Designer spécialisé dans les marques sportives.

{FICHE MBT}

Construis le design system complet de MBT Academy.

Direction imposée :
- Mode sombre par défaut (fond quasi noir, pas #000 pur), sections claires ponctuelles pour rythmer.
- UNE couleur d'accent forte [couleur du logo MBT si elle existe, sinon propose 3 options argumentées : rouge sang, jaune néon, orange] utilisée uniquement pour les CTA, les états actifs et les accents graphiques.
- Titres : police condensée très grasse en majuscules (propose 2 options Google Fonts, ex. Anton, Bebas Neue, Oswald). Texte : sans-serif lisible (ex. Inter, Manrope).
- Photos réelles du club, traitement noir & blanc contrasté + grain, jamais de banque d'images.
- Contraste WCAG AA minimum sur tous les textes, y compris texte sur accent.

Définis précisément : palettes (primaire, accent, fonds, textes, bordures), états success/error/warning/info,
typographies, tailles H1→H6 desktop et mobile (utilise clamp()), body, caption, labels, boutons,
line-height, letter-spacing, espacement base 8 px, rayons (peu arrondis : style brut), bordures, ombres,
grille 12/8/4 colonnes, breakpoints (375 / 768 / 1024 / 1440), containers max.

Spécifications composants, états default / hover / active / focus / disabled / loading / error pour :
boutons, inputs, textarea, selects, cards cours, cards coach, cards tarif (avec « le plus choisi »),
créneau de planning, filtres (chips), navigation desktop + menu mobile, barre CTA fixe mobile,
accordéons FAQ, tabs, badges niveau (Débutant / Intermédiaire / Confirmé / Kids), modals,
toasts, formulaire de réservation, footer, hero.

Termine par les design tokens nommés (ex. color.bg.base, color.accent.default, font.display, space.4),
fournis en JSON (Figma Tokens) ET en variables CSS / config Tailwind.
```

## 3 — Contenu, conversion & SEO

```
Tu es UX writer, copywriter conversion et consultant SEO local.

{FICHE MBT}
Architecture : {SORTIE ÉTAPE 1}

Rédige tout le contenu du site MBT Academy, page par page :
SEO title (≤ 60 car.), meta description (≤ 155 car.), slug, H1, sous-titre, H2/H3, textes de sections,
CTA principaux et secondaires, microcopy des formulaires (labels, placeholders, aides, confirmation),
messages d'erreur, preuves sociales, FAQ, footer.

Règles :
- Chaque bloc a un rôle noté entre crochets : [informer] [rassurer] [convaincre] [convertir].
- Lever les freins réels d'un débutant : « je n'ai jamais boxé », « je ne suis pas en forme »,
  « je vais prendre des coups », « quel matériel apporter », « je suis une femme, est-ce adapté ».
- Lever les freins d'un parent : sécurité, encadrement diplômé, pas de contact dur chez les petits, horaires après l'école.
- Interdit : « passionnés », « qualité exceptionnelle », « innovant », « dépassez vos limites » sans preuve concrète.
  Remplace chaque promesse par un fait (diplôme, nombre, horaire, déroulé précis d'une séance).
- Décris le déroulé exact d'une séance d'essai (arrivée, échauffement, technique, sac, retour au calme, durée).
- Mots-clés locaux intégrés naturellement, sans bourrage.
- Là où une donnée manque (palmarès, nombre de membres, avis), écris [DONNÉE À FOURNIR : …] au lieu d'inventer.
```

## 4 — Composants & logique frontend

```
Tu es architecte frontend senior Next.js (App Router) + TypeScript + Tailwind.

{FICHE MBT}
Architecture : {SORTIE ÉTAPE 1}

Définis la logique des fonctionnalités interactives :
1. Planning filtrable (niveau, public, jour) — URL synchronisée avec les filtres (?niveau=debutant&jour=lundi)
2. Réservation de séance d'essai en 3 étapes : choisir un cours → choisir une date/créneau disponible → coordonnées + confirmation
3. Formulaire de contact
4. Bouton WhatsApp / appel / itinéraire (tracking des clics)
5. Menu mobile + barre CTA fixe
6. FAQ en accordéon
7. Galerie avec lightbox

Pour chacune : composants, Server vs Client Components, état local/URL/global, machine à états
si utile (surtout la réservation), données entrantes/sortantes, événements, validation (Zod partagé client/serveur),
Server Actions ou routes API, loading / empty (« aucun cours ce jour ») / success / error / retry,
erreurs réseau, cas limites (créneau complet entre-temps, double soumission, date passée, mineur → coordonnées du parent),
comportement mobile, clavier, ARIA.

Pour la réservation, décris précisément ce qui se passe de la première saisie jusqu'à l'email de confirmation.

Propose la structure : app/ components/ features/ hooks/ lib/ types/ — sans surarchitecture
(pas de Redux, pas de state global si l'URL ou un useState suffit).
```

## 5 — Master prompt Figma Make

```
Tu es directeur artistique digital, spécialiste Figma Make.

Voici le cahier des charges de MBT Academy :
Architecture : {SORTIE ÉTAPE 1}
Design system : {SORTIE ÉTAPE 2}
Contenu : {SORTIE ÉTAPE 3}

Construis le site section par section, en commençant par : Accueil, Planning, Tarifs, Séance d'essai.

Pour chaque section : largeur, hauteur approximative, grid, colonnes, alignement, padding, gap,
typographie (token), images + ratio (hero 16:9 desktop / 4:5 mobile, coachs 3:4, galerie 1:1),
boutons, composants, interactions, animations.

Intentions visuelles :
- Hero plein écran : photo de boxeur à l'entraînement en N&B, titre énorme en condensé majuscules,
  1 CTA accent + 1 CTA secondaire, preuve sociale courte sous le CTA (note Google).
- Rythme : alternance sections sombres / une section claire, grandes typographies, beaucoup d'air.
- Accent couleur rare → il doit attirer l'œil uniquement vers l'action.
- Aucun élément décoratif gratuit (pas de blobs, pas de dégradés violets, pas d'icônes 3D).

Auto Layout partout, composants du design system uniquement, textes et images éditables.
Versions 1440 / 768 / 375 avec vraies contraintes responsive (réorganisation, pas réduction).
Le rendu doit ressembler au site d'un vrai club premium, pas à un template IA.
```

## 6 — Motion & micro-interactions

```
Tu es motion designer senior pour interfaces web sportives.

Interface : {SORTIE ÉTAPE 5 ou captures}
Design system : {SORTIE ÉTAPE 2}

Crée un système d'animation « punchy mais sobre » pour MBT Academy : rapide, sec, comme un jab —
jamais flottant ni lent.

Pour chaque animation : déclencheur → propriété → valeur initiale → valeur finale → durée → easing → délai.

Couvre : arrivée de page, header au scroll (réduction + fond), hero (titre par lignes, image léger zoom-out),
textes, images, cards cours/coachs (stagger), scroll reveal, boutons (hover/press), chips de filtre,
changement de filtre du planning, étapes de réservation, validation de formulaire (erreur = léger shake ≤ 200 ms),
menu mobile, barre CTA fixe, transitions entre pages, toasts.

Contraintes : transform + opacity uniquement, durées 150–400 ms (600 ms max pour le hero),
un seul easing principal + un pour les sorties, rien ne bloque un clic ni ne retarde un CTA,
prefers-reduced-motion → fondu simple ou aucun mouvement.

Donne ensuite : (a) les instructions courtes pour Figma Make, (b) les tokens motion (duration.*, easing.*)
et leur équivalent Framer Motion / CSS.
```

## 7 — Responsive avancé

```
Tu es spécialiste responsive UI/UX.

Site : MBT Academy — {SORTIE ÉTAPE 5}

Breakpoints : 375 mobile / 768 tablette / 1440 desktop. Vérifie spécialement 320–390 px.

Pour CHAQUE section : colonnes, ordre des blocs, largeurs, padding, gap, alignement, tailles de texte,
comportement des images (recadrage, focal point), position des CTA, éléments supprimés ou simplifiés,
navigation, interactions tactiles.

Points critiques à traiter explicitement :
- Planning : tableau semaine sur desktop → quel format sur mobile ? (liste par jour avec onglets jours scrollables, justifie)
- Tarifs : 3–4 cards côte à côte → carrousel ou pile ? laquelle est mise en avant en premier sur mobile ?
- Titres display énormes : taille minimale lisible à 320 px sans casser les mots.
- Barre CTA fixe mobile : hauteur, safe-area iOS, ne masque pas le footer ni les champs de formulaire.
- Réservation : une étape par écran sur mobile, clavier adapté (tel, email), date picker natif ou custom.

Jamais « empiler sur mobile » : dis quoi s'empile, dans quel ordre, avec quel espacement et quelle taille.
Zones tactiles ≥ 44×44 px. Zéro scroll horizontal (sauf carrousels volontaires, signalés).
```

## 8 — Backend Supabase

```
Tu es architecte full-stack senior Next.js + Supabase.

{FICHE MBT}
Architecture : {SORTIE ÉTAPE 1}
Logique frontend : {SORTIE ÉTAPE 4}

Identifie d'abord ce qui a VRAIMENT besoin d'un backend (vs contenu statique en fichiers).

Tables attendues au minimum (ajuste si besoin, justifie) :
- disciplines, levels, coaches
- classes (cours type : discipline, niveau, public, coach, durée, capacité)
- class_sessions (créneaux récurrents : jour, heure) + exceptions (vacances, annulations)
- trial_bookings (séance d'essai : créneau, date, prénom, nom, email, tél, âge, mineur → parent, source, statut pending/confirmed/cancelled/no_show/converted)
- contact_messages
- pricing_plans
- admin profiles (rôle admin / coach)

Pour chaque table : colonnes, types, PK, FK, index, contraintes (CHECK, UNIQUE : pas 2 essais avec le même email sur le même créneau),
timestamps, statuts.

Puis : Supabase Auth (admin et coachs uniquement, pas de compte client), rôles, RLS
(public = lecture seule du planning et des tarifs, insertion seule dans trial_bookings et contact_messages, jamais lecture),
Storage (photos coachs, galerie), Edge Functions ou Server Actions (email de confirmation via Resend, notification au club),
validation serveur, capacité des créneaux (gestion de la concurrence), anti-spam (honeypot + rate limit par IP), RGPD
(consentement, durée de conservation, suppression).

Pour chaque formulaire du site : table de destination + qui est notifié.

Fournis le SQL complet (tables, index, RLS, seed de démo) et explique le branchement Next.js
(client serveur, types générés avec supabase gen types).
```

## 9 — QA & audit avant mise en ligne

```
Tu es ingénieur QA senior (frontend, performance, SEO, accessibilité).

Audite : [URL de preview Vercel / dépôt / version] — site MBT Academy.

Vérifie : responsive 320 → 2560 px ; Chrome, Safari, Firefox, Edge, Android, iOS ; formulaires ;
navigation ; liens ; 404 ; loading / empty states ; validation ; clavier ; WCAG 2.2 AA ; contraste
(notamment texte sur couleur d'accent et texte sur photos) ; focus visible ; alt des images ;
Core Web Vitals (LCP, CLS, INP) ; poids et format des images (AVIF/WebP) ; lazy loading ;
SEO (title, meta, canonical, robots.txt, sitemap.xml, Schema.org LocalBusiness/SportsActivityLocation, Open Graph) ;
fiche Google Business cohérente avec le site (nom, adresse, téléphone identiques) ; HTTPS ; headers de sécurité ;
RGPD (bannière cookies si analytics non exempté, mentions légales) ; analytics + événements de conversion
(trial_booking_submitted, whatsapp_click, phone_click, directions_click).

Scénarios métier obligatoires :
1. Adulte débutant réserve un essai depuis un iPhone SE (375 px) en moins de 60 s.
2. Parent réserve pour un enfant de 8 ans → coordonnées parent exigées.
3. Deux personnes réservent la dernière place du même créneau en même temps.
4. Réservation sur un jour férié / pendant les vacances du club.
5. Soumission du formulaire en perdant le réseau.
6. Navigation complète au clavier uniquement.

Pour chaque problème :
Sévérité (Critical / High / Medium / Low) · Page · Composant · Problème · Reproduction ·
Cause probable · Correction recommandée · Vérification de la correction.

Classe par priorité technique, puis checklist finale :
Bloquant avant lancement / À corriger rapidement / Amélioration future.
```
