import { NextResponse } from 'next/server';
import { CustomerService } from '@/services/customer.service';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const createCustomerSchema = z.object({
  business_profile_id: z.string().uuid(),
  name: z.string().min(1, 'Name is required'),
  cnic: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessProfileId = searchParams.get('businessProfileId');

    if (!businessProfileId) {
      return NextResponse.json({ success: false, error: 'businessProfileId is required' }, { status: 400 });
    }

    const customers = await CustomerService.getCustomers(businessProfileId);
    return NextResponse.json({ success: true, data: customers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createCustomerSchema.parse(body);

    const customer = await CustomerService.createCustomer(validatedData);
    return NextResponse.json({ success: true, data: customer }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
