import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase côté serveur uniquement (clé service_role, contourne la RLS).
 * Retourne null si les variables d'environnement ne sont pas encore configurées.
 */
export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
