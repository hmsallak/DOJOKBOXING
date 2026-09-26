# MBT Academy — Conversion (méthode CRE)

Objectif unique du site : **réservation d'une séance d'essai** (`/essai`).
Micro-conversions : clic WhatsApp, clic téléphone, clic itinéraire.

Score actuel de la page d'accueil : **6/10**.
Pour atteindre 10/10, il manque surtout des **preuves réelles** : photos du club, avis Google, diplômes des coachs, chiffres. Et, une fois le site en ligne, de la **recherche visiteurs** : les objections ci-dessous sont des hypothèses tant qu'elles ne sont pas validées.

---

## 1. Tableau O/CO (objection → contre-objection → emplacement)

| # | Type | Objection (hypothèse à valider) | Contre-objection | Où sur le site |
|---|------|------|------|------|
| 1 | Adéquation | « Je n'ai jamais boxé, je vais être ridicule » | Groupes séparés par niveau, le débutant part de la garde | Sous-titre hero, carte « Tu n'as jamais boxé », FAQ n°1 |
| 2 | Peur | « Je vais prendre des coups » | Pas de sparring à l'essai ni imposé ensuite ; sac et pattes d'ours | Réassurance sous le CTA hero, FAQ n°2 |
| 3 | Adéquation | « Je ne suis pas en forme » | Rythme individuel, la forme vient en boxant | FAQ n°3 |
| 4 | Effort | « Il faut du matériel / c'est compliqué » | Gants prêtés, 3 étapes, 1 minute | Réassurance hero, en-tête `/essai` |
| 5 | Confiance (parent) | « Est-ce sûr pour mon enfant ? » | Pas de coups au visage chez les Kids, coach diplômé | Carte « Pour ton enfant », FAQ n°5 — **manque : diplôme réel** |
| 6 | Prix | « Ça va coûter cher / je vais être engagé » | Essai offert, sans CB, formule choisie après | Page Tarifs (réassurance), FAQ n°6, encart `/essai` |
| 7 | Timing | « Je commencerai à la rentrée / plus tard » | Débutants accueillis toute l'année + prochain cours réel affiché | `NextSession` dans le hero, FAQ n°7 |
| 8 | Confiance | « Ce club est-il sérieux ? » | Coachs diplômés, avis Google, photos réelles | **Manquant : à fournir** |
| 9 | Adéquation | « Est-ce adapté aux femmes ? » | [À confirmer : cours mixtes / non-mixtes, proportion de femmes] | À ajouter si pertinent |

Règle : ne jamais énoncer une objection implicite (« Tu as peur d'être nul ? »). On répond directement (« Le cours débutant part de zéro »).

## 2. Preuves (persuasion assets) — liste à collecter

| Catégorie | Élément | Statut |
|---|---|---|
| Autorité | Diplômes des coachs (BPJEPS, DE, DES), palmarès vérifiable | À fournir |
| Preuve sociale | Note et nombre d'avis Google → `club.googleRating` | À fournir |
| Preuve sociale | 3 avis écrits avec prénom et type de pratiquant (débutant, parent, compétiteur) | À demander aux membres |
| Données | Nombre de membres, années d'existence, nombre de licenciés, combattants | À fournir |
| Visuel | 6–10 photos réelles N&B : cours débutant, kids, coach qui corrige, salle vide | À shooter |
| Réassurance | Politique d'annulation de l'essai, conditions de résiliation | À confirmer |

Les chiffres doivent être précis (« 137 membres » plutôt que « plus de 100 ») et vrais.

## 3. Recherche à mettre en place dès la mise en ligne

1. **Question post-réservation** (dans l'email de confirmation ou le formulaire, facultative) :
   « Qu'est-ce qui a failli t'empêcher de réserver ? »
2. **Question aux nouveaux inscrits** (à l'accueil, à l'oral ou par SMS) :
   « Comment décrirais-tu MBT Academy à un ami ? » → reprendre leurs mots dans les titres.
3. **Analytics** : événements `trial_booking_submitted`, `whatsapp_click`, `phone_click`, `directions_click` + entonnoir `/` → `/essai` → réservation.
4. **Avis Google** des clubs concurrents : les avis négatifs révèlent des objections non traitées.

## 4. Hypothèses priorisées (ICE)

| Hypothèse | I | C | E | Score |
|---|---|---|---|---|
| Si on remplace l'emplacement photo du hero par une vraie photo d'un cours débutant, les réservations augmentent, car le visiteur se projette et la peur baisse | 8 | 7 | 8 | 7.7 |
| Si on affiche la note Google + 1 avis de débutant sous le CTA, les réservations augmentent, car l'objection de confiance est levée au point de décision | 7 | 7 | 9 | 7.7 |
| Si on propose « Réserver via WhatsApp » comme alternative au formulaire, les conversions totales augmentent, car une partie du public local préfère écrire | 7 | 6 | 9 | 7.3 |
| Si on crée une page dédiée « Boxe enfants [ville] » pour les parents (SEO + objections sécurité), les inscriptions Kids augmentent | 8 | 6 | 6 | 6.7 |

Trafic d'un club local = faible : pas d'A/B test statistiquement fiable avant longtemps. On applique donc les changements à fort score ICE, puis on compare les réservations mensuelles avant et après, en notant la saisonnalité (rentrée, janvier).
