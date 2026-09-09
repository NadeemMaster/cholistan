import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
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

  let cacheHeaders: Record<string, string> = {};
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[],
          headers: Record<string, string>
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if middleware refreshing
            // user sessions.
          }
          // Collect cache headers so they can be applied to the final
          // redirect response — auth responses must never be CDN-cached.
          if (headers && Object.keys(headers).length > 0) {
            cacheHeaders = headers;
          }
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
  Object.entries(cacheHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}
