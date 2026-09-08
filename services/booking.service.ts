import { createClient } from '@/lib/supabase/server';
import type { Booking, TractorModel } from '@/types';

export class BookingService {
  static async getBookings(businessProfileId: string): Promise<Booking[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('bookings')
      .select('*, tractor_models(model_name, price), customers(name, cnic)')
      .eq('business_profile_id', businessProfileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Booking[];
  }

  static async createBooking(
    bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'amount_paid_to_company' | 'dealership_commission_snapshot'>
  ): Promise<Booking> {
    const supabase = await createClient();
    
    // 1. Fetch the selected Tractor Model to get the snapshot data
    const { data: modelData, error: modelError } = await supabase
      .from('tractor_models')
      .select('*')
      .eq('id', bookingData.model_id)
      .single();

    if (modelError) throw new Error('Tractor model not found.');
    
    const tractorModel = modelData as TractorModel;

    // 2. Prepare booking with snapshot values
    const newBooking = {
      ...bookingData,
      amount_paid_to_company: tractorModel.price, // Defaulting to full price, UI can override
      dealership_commission_snapshot: tractorModel.current_commission_rate,
      status: 'Form Filled'
    };

    // 3. Insert Booking
    const { data, error } = await supabase
      .from('bookings')
      .insert([newBooking])
      .select()
      .single();

    if (error) throw error;
    return data as Booking;
  }
}
