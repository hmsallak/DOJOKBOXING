# MBT Academy — Audit QA (26/09/2026)

Outils : axe-core (WCAG 2.2 AA), Lighthouse (mobile, build de production), balayage responsive automatisé
(320 → 2560 px, 9 pages), test de bout en bout du formulaire d'essai dans Edge.

## Résultats

| Contrôle | Résultat |
|---|---|
| Accessibilité axe WCAG 2.2 AA (10 pages × 375/1440 px) | 0 violation |
| Lighthouse Accessibilité / Bonnes pratiques / SEO | 100 / 100 / 100 |
| Lighthouse Performance mobile | Accueil 94 (LCP 2,5 s, CLS 0,006) · Essai 89–91 (LCP 2,6–2,7 s) |
| Scroll horizontal (320, 375, 390, 768, 1024, 1440, 2560 px) | Aucun |
| Zones tactiles ≥ 44 px (mobile) / ≥ 24 px (desktop) | OK |
| En-têtes de sécurité (HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy) | OK |
| Formulaire d'essai : erreurs, mineur → parent, 15 ans minimum, re-soumission après erreur | OK |

## Bugs trouvés et corrigés pendant l'audit

| Sévérité | Composant | Problème | Correction |
|---|---|---|---|
| High | Formulaire d'essai | Après une soumission en erreur, React 19 réinitialise le formulaire : le créneau et l'âge étaient vidés alors qu'ils paraissaient sélectionnés → réservation refusée | Champs non contrôlés (`defaultChecked` / `defaultValue`) |
| Medium | Formulaire d'essai | Aucun créneau choisi → message technique en anglais | Message « Choisis un créneau. » |
| Medium | Bandeau CTA | Contraste 4,06:1 (< 4,5) | Opacité retirée → 4,68:1 |
| Medium | Bandeau défilant | Contraste 1,41:1 | Texte à 40 % → > 3:1 (grand texte) |
| Low | Barre CTA mobile | Hors landmark | `<aside aria-label>` |
| Low | Tarifs / Coachs | Saut de niveau de titre h1 → h3 | h2 |
| Low | Header / Footer | Liens de 16–20 px de haut | Zones de 44 px |

## Checklist de lancement

**Bloquant avant lancement**
- [ ] Clés Supabase dans `.env.local` / Vercel + migration appliquée (sinon les réservations ne sont pas enregistrées)
- [ ] Téléphone / WhatsApp / email du club (`src/data/club.ts`)
- [ ] Confirmer : essai gratuit ? sparring non réservable en essai ? contenu exact du cours
- [ ] Mentions légales (forme juridique, n° BCE, responsable) et politique de confidentialité validées
- [ ] Domaine définitif (remplacer `mbt-academy.fr` dans layout, sitemap, robots)

**À corriger rapidement**
- [ ] Email de confirmation + notification au club (Resend)
- [ ] Vraies photos (hero, coachs) via `next/image`
- [ ] Note et avis Google, diplômes des coachs (preuves, voir `cro-oco.md`)
- [ ] Analytics + événements de conversion (`trial_booking_submitted`, `whatsapp_click`…)
- [ ] Tests réels sur iPhone Safari et Android Chrome

**Amélioration future**
- [ ] Page « Boxe jeunes » + liste d'attente quand le cours ouvre
- [ ] Back-office coach (liste des essais, statut présent / inscrit)
- [ ] Planning et fermetures gérés en base plutôt que dans le code
