import { createClient } from '@/lib/supabase/server';
import type { Tractor } from '@/types';

export class TractorService {
  static async getTractors(businessProfileId: string): Promise<any[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('tractors')
      .select('*, tractor_models(model_name), bookings(apb_number)')
      .eq('business_profile_id', businessProfileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async createTractor(tractor: Omit<Tractor, 'id' | 'created_at' | 'updated_at'>): Promise<Tractor> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('tractors')
      .insert([tractor])
      .select()
      .single();

    if (error) throw error;
    return data as Tractor;
  }
}
