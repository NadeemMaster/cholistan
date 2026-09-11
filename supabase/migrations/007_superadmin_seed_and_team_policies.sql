-- Phase 7: Super Admin seed + team management RLS
-- Depends on: 005_user_trigger_and_business_rls.sql, 006_create_business_profile_rpc.sql
-- Apply via: Supabase Dashboard -> SQL Editor (project convention, see docs/06)

-- =============================================================
-- 1. Designate the owner account as Super Admin
--    (trigger only auto-assigns the FIRST user on a clean database)
-- =============================================================
UPDATE public.users
SET role_id = (SELECT id FROM public.roles WHERE name = 'Super Admin')
WHERE id IN (
    SELECT id FROM auth.users WHERE email = 'nadeem954@gmail.com'
);

-- =============================================================
-- 2. RLS: let team members see each other (same business)
--    Required by the Team page — Super Admin assigns roles, and
--    business users see their colleagues.
-- =============================================================

-- Users can see profiles of users in their own business
DROP POLICY IF EXISTS "Users can view their team" ON public.users;
CREATE POLICY "Users can view their team"
    ON public.users
    FOR SELECT
    USING (
        business_profile_id = public.get_my_business_profile_id()
    );

-- Super Admin can see all user profiles (system-level management)
DROP POLICY IF EXISTS "Super Admin can view all users" ON public.users;
CREATE POLICY "Super Admin can view all users"
    ON public.users
    FOR SELECT
    USING (public.is_super_admin());

-- =============================================================
-- 3. Guardrail: a Super Admin must keep a business link after
--    the setup flow, so policies relying on the link stay sound.
--    (005's "Users can view their own profile" already covers
--    self-SELECT; here we only ensure self-UPDATE stays possible
--    for basic info without touching role/business.)
-- =============================================================
DROP POLICY IF EXISTS "Users can update own basic info" ON public.users;
CREATE POLICY "Users can update own basic info"
    ON public.users
    FOR UPDATE
    USING (id = auth.uid())
    WITH CHECK (
        -- role_id and business_profile_id must not be self-escalated
        role_id = (SELECT role_id FROM public.users WHERE id = auth.uid())
        AND business_profile_id = (SELECT business_profile_id FROM public.users WHERE id = auth.uid())
    );
