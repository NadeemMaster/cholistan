'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleAuth = async () => {
      // 1. The Supabase browser client automatically parses the #access_token fragment
      // from the URL (Implicit Grant Flow) and establishes the session.
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Successfully logged in via the hash fragment
        router.push('/set-password');
        return;
      }

      // 2. Fallback: If Supabase sent a ?code= parameter instead (PKCE Flow)
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          router.push('/set-password');
          return;
        }
      }

      // 3. If neither worked, redirect to login
      router.push('/login?error=Verification_failed');
    };

    handleAuth();
  }, [router, supabase]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300 font-medium">Verifying your secure invitation...</p>
    </div>
  );
}
