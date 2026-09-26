-- MBT Academy — réservations de séances d'essai
-- Le planning reste dans src/data/club.ts pour l'instant : on stocke l'id du créneau
-- + un instantané (nom du cours, jour, heure) pour que l'historique reste lisible si le planning change.

create extension if not exists moddatetime schema extensions;

-- ---------- Admins (club) ----------
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'coach' check (role in ('owner', 'coach')),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------- Réservations d'essai ----------
create table public.trial_bookings (
  id uuid primary key default gen_random_uuid(),

  session_id text not null,                 -- ex. "mer-1900-deb" (src/data/club.ts)
  session_date date not null,
  class_name text not null,                 -- instantané
  session_start time not null,              -- instantané

  first_name text not null check (char_length(first_name) between 1 and 60),
  last_name text not null check (char_length(last_name) between 1 and 60),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone text not null check (char_length(regexp_replace(phone, '\D', '', 'g')) >= 10),
  age smallint not null check (age between 5 and 99),
  parent_name text check (char_length(parent_name) <= 120),
  message text check (char_length(message) <= 1000),

  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'no_show', 'attended', 'converted')),
  source text,                              -- utm_source / referrer (analyse de conversion)
  ip_hash text,                             -- sha256(ip + sel) : rate limit sans stocker l'IP
  consent_at timestamptz not null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Mineur => parent obligatoire
  constraint minor_needs_parent check (age >= 18 or parent_name is not null),
  -- Pas deux réservations de la même personne sur le même créneau
  constraint unique_booking unique (email, session_id, session_date)
);

create index trial_bookings_upcoming_idx on public.trial_bookings (session_date, session_id)
  where status in ('pending', 'confirmed');
create index trial_bookings_created_idx on public.trial_bookings (created_at desc);
create index trial_bookings_ip_recent_idx on public.trial_bookings (ip_hash, created_at);

create trigger handle_updated_at before update on public.trial_bookings
  for each row execute procedure extensions.moddatetime (updated_at);

-- ---------- RLS ----------
-- Aucune policy pour anon : le site insère côté serveur avec la clé service_role (qui contourne la RLS).
-- Le public ne peut donc ni lire ni écrire directement la table via l'API.
alter table public.admins enable row level security;
alter table public.trial_bookings enable row level security;

create policy "Admins read admins" on public.admins
  for select to authenticated using (public.is_admin());

create policy "Admins read bookings" on public.trial_bookings
  for select to authenticated using (public.is_admin());

create policy "Admins update bookings" on public.trial_bookings
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- RGPD : suppression des essais non convertis après 12 mois (à planifier avec pg_cron si activé)
-- select cron.schedule('purge-trials', '0 3 * * *',
--   $$delete from public.trial_bookings where status <> 'converted' and created_at < now() - interval '12 months'$$);
