import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // Optional: If there's a specific 'next' param, we can use it. Otherwise, default to /set-password
  const next = searchParams.get('next') ?? '/set-password';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // User is successfully verified and logged in. Redirect them to set their password.
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If there's no code or an error occurred, redirect to login so they can try again.
  return NextResponse.redirect(`${origin}/login?error=Invalid_invite_link`);
}
