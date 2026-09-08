import { NextResponse } from 'next/server';
import { TractorService } from '@/services/tractor.service';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const createTractorSchema = z.object({
  business_profile_id: z.string().uuid(),
  model_id: z.string().uuid(),
  booking_id: z.string().uuid().optional(),
  chassis_number: z.string().min(1, 'Chassis number is required'),
  engine_number: z.string().min(1, 'Engine number is required'),
  factory_delivery_no: z.string().optional(),
  factory_invoice_no: z.string().optional(),
  warranty_book_no: z.string().optional(),
  battery_supplier: z.string().optional(),
  status: z.enum(['Available', 'Booked', 'Delivered']).default('Available'),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessProfileId = searchParams.get('businessProfileId');

    if (!businessProfileId) {
      return NextResponse.json({ success: false, error: 'businessProfileId is required' }, { status: 400 });
    }

    const tractors = await TractorService.getTractors(businessProfileId);
    return NextResponse.json({ success: true, data: tractors });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createTractorSchema.parse(body);

    const tractor = await TractorService.createTractor(validatedData);
    return NextResponse.json({ success: true, data: tractor }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
