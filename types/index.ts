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

export type Customer = {
  id: string;
  business_profile_id: string;
  name: string;
  cnic?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
};

export type Tractor = {
  id: string;
  business_profile_id: string;
  make: string;
  model: string;
  chassis_number: string;
  engine_number: string;
  color?: string;
  price: number;
  status: 'Available' | 'Booked' | 'Delivered';
  created_at: string;
  updated_at: string;
};

