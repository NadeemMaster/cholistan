-- Create Customers table
CREATE TABLE public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_profile_id UUID NOT NULL REFERENCES public.business_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    cnic TEXT,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Tractors (Inventory) table
CREATE TABLE public.tractors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_profile_id UUID NOT NULL REFERENCES public.business_profiles(id) ON DELETE CASCADE,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    chassis_number TEXT UNIQUE NOT NULL,
    engine_number TEXT UNIQUE NOT NULL,
    color TEXT,
    price NUMERIC(15, 2) NOT NULL DEFAULT 0,
    status TEXT NOT NULL CHECK (status IN ('Available', 'Booked', 'Delivered')) DEFAULT 'Available',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tractors ENABLE ROW LEVEL SECURITY;

-- Initial Policies
-- Assumption: Users can interact with records matching their assigned business_profile_id.
-- We verify the user's business_profile_id by looking up the `public.users` table for the authenticated user.

CREATE POLICY "Users can manage customers in their business profile"
    ON public.customers
    FOR ALL
    USING (
        business_profile_id IN (
            SELECT business_profile_id FROM public.users WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can manage tractors in their business profile"
    ON public.tractors
    FOR ALL
    USING (
        business_profile_id IN (
            SELECT business_profile_id FROM public.users WHERE id = auth.uid()
        )
    );
