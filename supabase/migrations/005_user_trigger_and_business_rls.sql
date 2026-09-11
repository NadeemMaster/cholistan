-- Phase 5: Auth user trigger, Super Admin helpers, Business Profile RLS
-- Depends on: 001_initial_schema.sql (users, roles, business_profiles)
-- Apply via: Supabase Dashboard -> SQL Editor (project convention, see docs/06)

-- =============================================================
-- 1. handle_new_user: auto-create a public.users row for every new auth user
--    (without this, invited users never get a profile/role/business link)
-- =============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_role_id UUID;
BEGIN
    -- On a fresh deployment, the first user ever created becomes Super Admin
    -- (docs/09: a new client setup starts from a clean database).
    IF NOT EXISTS (SELECT 1 FROM public.users) THEN
        SELECT id INTO v_role_id FROM public.roles WHERE name = 'Super Admin';
    END IF;

    INSERT INTO public.users (id, full_name, role_id)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        v_role_id
    );

    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill: create profile rows for auth users that already exist
-- (the trigger above only fires for NEW signups/invites)
INSERT INTO public.users (id, full_name)
SELECT id, COALESCE(raw_user_meta_data->>'full_name', email)
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users);

-- ONE-TIME MANUAL STEP for existing deployments:
-- Designate your own account as Super Admin (find your UUID in
-- Authentication -> Users, then run in the SQL Editor):
--
-- UPDATE public.users
-- SET role_id = (SELECT id FROM public.roles WHERE name = 'Super Admin')
-- WHERE id = '<your-auth-user-uuid>';

-- =============================================================
-- 2. SECURITY DEFINER helpers used inside RLS policies.
--    Keeping the role check in a function avoids recursive policy
--    evaluation on public.users and centralises the RBAC logic.
-- =============================================================
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.users u
        JOIN public.roles r ON r.id = u.role_id
        WHERE u.id = auth.uid()
          AND r.name = 'Super Admin'
    );
$$;

CREATE OR REPLACE FUNCTION public.get_my_business_profile_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT business_profile_id
    FROM public.users
    WHERE id = auth.uid();
$$;

-- =============================================================
-- 3. RLS: business_profiles
--    (RLS was enabled in 001 but had NO policies = deny-all)
-- =============================================================

-- Regular users can see the business they belong to
DROP POLICY IF EXISTS "Users can view their business profile" ON public.business_profiles;
CREATE POLICY "Users can view their business profile"
    ON public.business_profiles
    FOR SELECT
    USING (id = public.get_my_business_profile_id());

-- Super Admin can see every business profile (system-level management)
DROP POLICY IF EXISTS "Super Admin can view all business profiles" ON public.business_profiles;
CREATE POLICY "Super Admin can view all business profiles"
    ON public.business_profiles
    FOR SELECT
    USING (public.is_super_admin());

-- Only Super Admin can create a business (initial setup)
DROP POLICY IF EXISTS "Super Admin can create business profiles" ON public.business_profiles;
CREATE POLICY "Super Admin can create business profiles"
    ON public.business_profiles
    FOR INSERT
    WITH CHECK (public.is_super_admin());

-- Only Super Admin can edit a business
DROP POLICY IF EXISTS "Super Admin can update business profiles" ON public.business_profiles;
CREATE POLICY "Super Admin can update business profiles"
    ON public.business_profiles
    FOR UPDATE
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

-- =============================================================
-- 4. RLS: public.users — Super Admin can update users
--    (link them to a business, assign roles, activate/deactivate)
-- =============================================================
DROP POLICY IF EXISTS "Super Admin can update users" ON public.users;
CREATE POLICY "Super Admin can update users"
    ON public.users
    FOR UPDATE
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());
