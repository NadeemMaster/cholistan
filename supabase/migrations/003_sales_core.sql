-- Phase 4: Sales Core, Bookings, and Tractor Models Configuration

-- 1. Modify Business Profiles to include dealer_code
ALTER TABLE public.business_profiles 
ADD COLUMN dealer_code TEXT;

-- 2. Create Tractor Models table (Configurable Master Data)
CREATE TABLE public.tractor_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_profile_id UUID NOT NULL REFERENCES public.business_profiles(id) ON DELETE CASCADE,
    model_name TEXT NOT NULL,
    color TEXT,
    horsepower TEXT,
    edition TEXT,
    price NUMERIC(15, 2) NOT NULL DEFAULT 0,
    current_commission_rate NUMERIC(15, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Modify existing Tractors table for the Gate Pass workflow
-- We drop the redundant fields now that they live in tractor_models, 
-- and add the new fields from the Gate Pass.
ALTER TABLE public.tractors DROP COLUMN make;
ALTER TABLE public.tractors DROP COLUMN model;
ALTER TABLE public.tractors DROP COLUMN color;
ALTER TABLE public.tractors DROP COLUMN price;

ALTER TABLE public.tractors ADD COLUMN model_id UUID REFERENCES public.tractor_models(id) ON DELETE SET NULL;
ALTER TABLE public.tractors ADD COLUMN booking_id UUID; -- (Foreign key added below after bookings table is created)
ALTER TABLE public.tractors ADD COLUMN factory_delivery_no TEXT;
ALTER TABLE public.tractors ADD COLUMN factory_invoice_no TEXT;
ALTER TABLE public.tractors ADD COLUMN warranty_book_no TEXT;
ALTER TABLE public.tractors ADD COLUMN battery_supplier TEXT;

-- 4. Create Bookings (Application for Provisional Booking)
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_profile_id UUID NOT NULL REFERENCES public.business_profiles(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    model_id UUID NOT NULL REFERENCES public.tractor_models(id),
    assigned_tractor_id UUID REFERENCES public.tractors(id) ON DELETE SET NULL,
    
    -- APB Form Fields
    apb_number TEXT UNIQUE,
    dealer_code TEXT,
    order_number TEXT,
    order_date DATE,
    booking_type TEXT CHECK (booking_type IN ('Cash', 'Bank/Leasing Co.', 'ZTBL')),
    ztbl_lc_number TEXT,
    payment_mode TEXT CHECK (payment_mode IN ('Bank Draft', 'Pay Order', 'ZTBL Supply Order', 'Other')),
    payment_mode_other TEXT,
    payment_particular_number TEXT,
    payment_particular_date DATE,
    issuing_bank TEXT,
    
    -- Snapshots and Internal Tracking
    amount_paid_to_company NUMERIC(15, 2) NOT NULL DEFAULT 0,
    dealership_commission_snapshot NUMERIC(15, 2) NOT NULL DEFAULT 0,
    delivery_charges_payer TEXT CHECK (delivery_charges_payer IN ('Customer', 'Factory')),
    
    status TEXT NOT NULL CHECK (status IN ('Form Filled', 'Sent to Company', 'Company Confirmed', 'Gate Pass Issued', 'Delivered to Customer')) DEFAULT 'Form Filled',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Now that bookings exists, add the FK to tractors
ALTER TABLE public.tractors 
ADD CONSTRAINT fk_tractor_booking 
FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE SET NULL;


-- 5. Enable RLS and setup policies
ALTER TABLE public.tractor_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage models in their profile"
    ON public.tractor_models
    FOR ALL
    USING (business_profile_id IN (SELECT business_profile_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can manage bookings in their profile"
    ON public.bookings
    FOR ALL
    USING (business_profile_id IN (SELECT business_profile_id FROM public.users WHERE id = auth.uid()));
