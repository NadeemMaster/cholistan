-- 1. Create a dummy business profile with the hardcoded ID we are using in the UI
INSERT INTO public.business_profiles (id, name, dealer_code)
VALUES ('00000000-0000-0000-0000-000000000000', 'Cholistan Tractors', '411')
ON CONFLICT (id) DO NOTHING;

-- 2. Create a dummy Tractor Model
INSERT INTO public.tractor_models (id, business_profile_id, model_name, horsepower, price, current_commission_rate)
VALUES ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'NH Ghazi', '65 HP', 2500000, 50000)
ON CONFLICT (id) DO NOTHING;

-- 3. Create a dummy Customer
INSERT INTO public.customers (id, business_profile_id, name, phone, cnic)
VALUES ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'Muhammad Afaq Haider', '0300-1234567', '31302-1141392-5')
ON CONFLICT (id) DO NOTHING;

-- 4. Create a dummy Booking (APB)
INSERT INTO public.bookings (id, business_profile_id, customer_id, model_id, apb_number, booking_type, amount_paid_to_company, dealership_commission_snapshot, status)
VALUES ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'APB-1001', 'Cash', 2500000, 50000, 'Sent to Company')
ON CONFLICT (id) DO NOTHING;
