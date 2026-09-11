import { createClient as createSupabaseAdminClient } from '@supabase/supabase-js';

/**
 * Server-only admin client using the service role key.
 *
 * SECURITY RULES:
 *   - NEVER import this from a Client Component (the key would be bundled
 *     into the browser). Only use it in Route Handlers / Server Components.
 *   - The service role key bypasses RLS — every caller must perform its own
 *     authorization checks before using the returned client.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY. Add it to the environment (Vercel project settings).'
    );
  }

  return createSupabaseAdminClient(url, serviceRoleKey, {
    auth: {
      // We only use admin APIs (invite, list users) here; no session refresh
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
