export type BusinessProfile = {
  id: string;
  name: string;
  dealer_code?: string;
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

export type TractorModel = {
  id: string;
  business_profile_id: string;
  model_name: string;
  color?: string;
  horsepower?: string;
  edition?: string;
  price: number;
  current_commission_rate: number;
  created_at: string;
  updated_at: string;
};

export type Tractor = {
  id: string;
  business_profile_id: string;
  model_id: string;
  booking_id?: string;
  chassis_number: string;
  engine_number: string;
  factory_delivery_no?: string;
  factory_invoice_no?: string;
  warranty_book_no?: string;
  battery_supplier?: string;
  status: 'Available' | 'Booked' | 'Delivered';
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: string;
  business_profile_id: string;
  customer_id: string;
  model_id: string;
  assigned_tractor_id?: string;
  apb_number?: string;
  dealer_code?: string;
  order_number?: string;
  order_date?: string;
  booking_type?: 'Cash' | 'Bank/Leasing Co.' | 'ZTBL';
  ztbl_lc_number?: string;
  payment_mode?: 'Bank Draft' | 'Pay Order' | 'ZTBL Supply Order' | 'Other';
  payment_mode_other?: string;
  payment_particular_number?: string;
  payment_particular_date?: string;
  issuing_bank?: string;
  amount_paid_to_company: number;
  dealership_commission_snapshot: number;
  delivery_charges_payer?: 'Customer' | 'Factory';
  status: 'Form Filled' | 'Sent to Company' | 'Company Confirmed' | 'Gate Pass Issued' | 'Delivered to Customer';
  created_at: string;
  updated_at: string;
};

