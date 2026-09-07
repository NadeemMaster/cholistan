export type BusinessProfile = {
  id: string;
  name: string;
  logo_url?: string;
  created_at: string;
};

export type UserProfile = {
  id: string;
  business_profile_id: string;
  role_id: string;
  full_name: string;
  is_active: boolean;
};
