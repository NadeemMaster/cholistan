import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

const inviteSchema = z.object({
  email: z.string().email('A valid email is required'),
  fullName: z.string().min(1, 'Full name is required'),
  roleId: z.string().uuid('A valid role must be selected'),
});

/**
 * POST /api/v1/admin/invite
 *
 * Invites a user to the caller's business and links them immediately:
 *   1. caller must be authenticated + a Super Admin with a business
 *   2. auth user created via the admin API (invite email sent by Supabase)
 *   3. handle_new_user trigger creates the public.users profile row
 *   4. profile is linked to the caller's business + the chosen role
 *
 * The invite link flow (set-password) was fixed earlier — see
 * docs/13_INVITE_EMAIL_SETUP.md.
 */
export async function POST(request: Request) {
  // 1. Authenticate + authorize the caller
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { data: callerProfile, error: profileError } = await supabase
    .from('users')
    .select('business_profile_id, roles(name)')
    .eq('id', user.id)
    .single();

  if (profileError || !callerProfile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 403 });
  }

  const roles: any = callerProfile.roles;
  const callerRole = Array.isArray(roles)
    ? roles[0]?.name
    : roles?.name;

  if (callerRole !== 'Super Admin' || !callerProfile.business_profile_id) {
    return NextResponse.json(
      { error: 'Only a Super Admin with a business can invite users' },
      { status: 403 }
    );
  }

  // 2. Validate the request body
  const body = await request.json().catch(() => null);
  const parsed = inviteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid request' },
      { status: 400 }
    );
  }

  const { email, fullName, roleId } = parsed.data;

  // 3. Invite via the service role client
  const admin = createAdminClient();

  const { data: inviteData, error: inviteError } = await admin.auth.admin.inviteUserByEmail(
    email,
    {
      redirectTo: `${new URL(request.url).origin}/auth/callback`,
      data: { full_name: fullName },
    }
  );

  if (inviteError) {
    return NextResponse.json({ error: inviteError.message }, { status: 400 });
  }

  // 4. Link the new profile to the caller's business + chosen role.
  //    (The handle_new_user trigger has already created the profile row,
  //    but in a race we upsert defensively.)
  const { error: linkError } = await admin.from('users').upsert(
    {
      id: inviteData.user.id,
      full_name: fullName,
      role_id: roleId,
      business_profile_id: callerProfile.business_profile_id,
    },
    { onConflict: 'id' }
  );

  if (linkError) {
    // The auth user was created but linking failed — surface a clear error
    // so the admin can retry; do not silently half-invite.
    return NextResponse.json(
      { error: `User invited but linking failed: ${linkError.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, userId: inviteData.user.id }, { status: 201 });
}
