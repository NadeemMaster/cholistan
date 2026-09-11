-- Phase 6: Atomic business profile creation RPC for the Super Admin setup flow
-- Depends on: 005_user_trigger_and_business_rls.sql (is_super_admin, users policies)
-- Apply via: Supabase Dashboard -> SQL Editor (project convention, see docs/06)

-- =============================================================
-- create_business_profile
-- Creates a business profile AND links the calling Super Admin to it
-- in a single atomic transaction. Returns the new business profile id.
--
-- Why an RPC instead of a plain INSERT + UPDATE from the client:
--   * atomicity — business creation and user linking cannot be left
--     half-done if something fails in between
--   * the Super Admin may not have a business_profile_id yet, so RLS
--     on public.users would not allow a self-UPDATE through the REST
--     API; SECURITY DEFINER bypasses that safely after explicit checks
-- =============================================================
CREATE OR REPLACE FUNCTION public.create_business_profile(
    p_name text,
    p_dealer_code text DEFAULT NULL,
    p_address text DEFAULT NULL,
    p_logo_url text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id uuid;
    v_is_super_admin boolean;
    v_existing_business uuid;
    v_new_business_id uuid;
BEGIN
    -- 1. Caller must be authenticated
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- 2. Caller must be a Super Admin
    SELECT public.is_super_admin() INTO v_is_super_admin;
    IF NOT v_is_super_admin THEN
        RAISE EXCEPTION 'Only a Super Admin can create a business profile';
    END IF;

    -- 3. Super Admin must not already be linked to a business
    SELECT business_profile_id INTO v_existing_business
    FROM public.users
    WHERE id = v_user_id;

    IF v_existing_business IS NOT NULL THEN
        RAISE EXCEPTION 'You are already linked to a business profile';
    END IF;

    -- 4. Validate input
    IF p_name IS NULL OR btrim(p_name) = '' THEN
        RAISE EXCEPTION 'Business name is required';
    END IF;

    -- 5. Create the business profile
    INSERT INTO public.business_profiles (name, dealer_code, address, logo_url)
    VALUES (btrim(p_name), NULLIF(btrim(p_dealer_code), ''), NULLIF(btrim(p_address), ''), NULLIF(btrim(p_logo_url), ''))
    RETURNING id INTO v_new_business_id;

    -- 6. Link the calling Super Admin to the new business
    UPDATE public.users
    SET business_profile_id = v_new_business_id
    WHERE id = v_user_id;

    RETURN v_new_business_id;
END;
$$;

-- Grant execute to authenticated users only (the function itself
-- enforces the Super Admin requirement).
REVOKE ALL ON FUNCTION public.create_business_profile(text, text, text, text) FROM PUBLIC, ANONYMOUS;
GRANT EXECUTE ON FUNCTION public.create_business_profile(text, text, text, text) TO authenticated;
