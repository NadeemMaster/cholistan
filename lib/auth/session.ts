import { createClient } from '@/lib/supabase/server';

/**
 * Server-side session context for the logged-in user.
 * Reads the profile row (role + business link) from public.users.
 */
export type SessionProfile = {
  userId: string;
  email: string | null;
  fullName: string | null;
  role: string | null;
  businessProfileId: string | null;
  isSuperAdmin: boolean;
  /** True when the user has no business linked yet (pre-setup state). */
  needsBusinessSetup: boolean;
};

/**
 * Returns the current user's session profile, or null when not authenticated.
 *
 * Use this in Server Components / Route Handlers (never in Client Components).
 * Role and business lookups go through RLS-protected tables, so the
 * result is safe to use for page-level access decisions (defense in depth
 * alongside database RLS policies).
 */
export async function getCurrentUserProfile(): Promise<SessionProfile | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from('users')
    .select('full_name, business_profile_id, roles(name)')
    .eq('id', user.id)
    .single();

  // A missing profile row (e.g. migration not applied yet) must not crash
  // pages — treat it as "authenticated but unassigned".
  if (error || !profile) {
    return {
      userId: user.id,
      email: user.email ?? null,
      fullName: null,
      role: null,
      businessProfileId: null,
      isSuperAdmin: false,
      needsBusinessSetup: true,
    };
  }

  // supabase-js types embedded relations as arrays, but PostgREST returns
  // a single object for many-to-one embeds (users.role_id -> roles.id).
  // Handle both shapes defensively.
  const roles = profile.roles as { name?: string }[] | { name?: string } | null | undefined;
  const role = Array.isArray(roles)
    ? roles[0]?.name ?? null
    : roles?.name ?? null;
  const businessProfileId = profile.business_profile_id ?? null;

  return {
    userId: user.id,
    email: user.email ?? null,
    fullName: profile.full_name ?? null,
    role,
    businessProfileId,
    isSuperAdmin: role === 'Super Admin',
    needsBusinessSetup: businessProfileId === null,
  };
}
