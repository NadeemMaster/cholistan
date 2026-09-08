import { createClient } from '@/lib/supabase/server';
import type { Customer } from '@/types';

export class CustomerService {
  static async getCustomers(businessProfileId: string): Promise<Customer[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('business_profile_id', businessProfileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Customer[];
  }

  static async createCustomer(customer: Omit<Customer, 'id' | 'created_at' | 'updated_at'>): Promise<Customer> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('customers')
      .insert([customer])
      .select()
      .single();

    if (error) throw error;
    return data as Customer;
  }
}
