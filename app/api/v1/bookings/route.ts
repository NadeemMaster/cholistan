import { NextResponse } from 'next/server';
import { BookingService } from '@/services/booking.service';
import { z } from 'zod';

const createBookingSchema = z.object({
  business_profile_id: z.string().uuid(),
  customer_id: z.string().uuid(),
  model_id: z.string().uuid(),
  apb_number: z.string().optional(),
  dealer_code: z.string().optional(),
  order_number: z.string().optional(),
  order_date: z.string().optional(),
  booking_type: z.enum(['Cash', 'Bank/Leasing Co.', 'ZTBL']).optional(),
  payment_mode: z.enum(['Bank Draft', 'Pay Order', 'ZTBL Supply Order', 'Other']).optional(),
  issuing_bank: z.string().optional(),
  delivery_charges_payer: z.enum(['Customer', 'Factory']).optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessProfileId = searchParams.get('businessProfileId');

    if (!businessProfileId) {
      return NextResponse.json({ success: false, error: 'businessProfileId is required' }, { status: 400 });
    }

    const bookings = await BookingService.getBookings(businessProfileId);
    return NextResponse.json({ success: true, data: bookings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createBookingSchema.parse(body);

    const booking = await BookingService.createBooking(validatedData as any);
    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
