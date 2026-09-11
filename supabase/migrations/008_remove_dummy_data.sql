-- Remove the temporary seed rows created by 999_seed_dummy_data.sql.
--
-- IMPORTANT (industry standard): an ALREADY-APPLIED migration (999) is never
-- edited or deleted — that breaks migration history. Instead we write a NEW
-- migration that undoes its effect. This keeps the history consistent for
-- every environment that already ran 999.
--
-- Depends on: 001..003 (tables), 999 (the seed rows being removed)
-- Run AFTER: 004, 005, 006, 007
--
-- Note: FKs on business_profile_id use ON DELETE CASCADE, so deleting the
-- business row alone would cascade — but we delete children explicitly first
-- so the intent is clear and nothing unexpected is removed.

DELETE FROM public.bookings
WHERE id = '33333333-3333-3333-3333-333333333333';

DELETE FROM public.customers
WHERE id = '22222222-2222-2222-2222-222222222222';

DELETE FROM public.tractor_models
WHERE id = '11111111-1111-1111-1111-111111111111';

DELETE FROM public.business_profiles
WHERE id = '00000000-0000-0000-0000-000000000000';

-- Verification (run in SQL Editor afterwards, expect 0 rows each):
-- SELECT * FROM public.business_profiles WHERE id = '00000000-0000-0000-0000-000000000000';
-- SELECT * FROM public.tractor_models WHERE business_profile_id = '00000000-0000-0000-0000-000000000000';
-- SELECT * FROM public.customers WHERE business_profile_id = '00000000-0000-0000-0000-000000000000';
-- SELECT * FROM public.bookings WHERE business_profile_id = '00000000-0000-0000-0000-000000000000';
