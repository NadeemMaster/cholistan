-- Create Business Profiles table (Multi-tenancy anchor)
CREATE TABLE public.business_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT,
    address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Roles table
CREATE TABLE public.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE
);

-- Insert default roles
INSERT INTO public.roles (name) VALUES 
('Super Admin'),
('Business Admin'),
('Sales Officer'),
('Accountant'),
('Inspector'),
('Delivery Officer'),
('Auditor');

-- Extend Users table (linking to auth.users)
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    business_profile_id UUID REFERENCES public.business_profiles(id) ON DELETE CASCADE,
    role_id UUID REFERENCES public.roles(id) ON DELETE SET NULL,
    full_name TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Initial Policies (To be expanded in CRM/Admin modules)
CREATE POLICY "Users can view their own profile"
    ON public.users
    FOR SELECT
    USING (id = auth.uid());

CREATE POLICY "Anyone can read roles"
    ON public.roles
    FOR SELECT
    USING (true);
