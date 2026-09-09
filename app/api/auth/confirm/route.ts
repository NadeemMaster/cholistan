import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { EmailOtpType } from '@supabase/supabase-js';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard';
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              cookieStore.set(name, value, options);
            } catch {
              // Server Component context — cookies will be attached to the
              // final redirect response below so the session survives.
            }
          });
        },
      },
    }
  );

  let redirectUrl: string;

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (error) {
      redirectUrl = `${origin}/login?error=${encodeURIComponent(error.message)}`;
    } else if (type === 'invite' || type === 'recovery') {
      redirectUrl = `${origin}/set-password`;
    } else {
      redirectUrl = `${origin}${next}`;
    }
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      redirectUrl = `${origin}/login?error=${encodeURIComponent(error.message)}`;
    } else {
      redirectUrl = `${origin}${next}`;
    }
  } else {
    redirectUrl = `${origin}/login?error=Invalid_Request`;
  }

  // Build the redirect AFTER auth calls so any session cookies written by
  // setAll (when in a mutable context) are carried onto the response.
  const response = NextResponse.redirect(redirectUrl);
  const responseCookies = cookieStore.getAll();
  responseCookies.forEach(({ name, value }) => {
    response.cookies.set(name, value);
  });

  return response;
}
