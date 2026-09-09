'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // 1. Listen for the implicit grant hash parsing
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // The event type can sometimes be unpredictable (USER_UPDATED, etc.)
        // If there's a valid session, we redirect.
        router.push('/set-password');
      }
    });

    const handleAuth = async () => {
      // 2. Check for PKCE code fallback
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          router.push('/login?error=Verification_failed');
          return;
        }
      }

      // 3. Actively check the session. 
      // Supabase parses the hash automatically on load, so getSession() will return the authenticated user if the link was valid.
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        router.push('/set-password');
      } else if (!window.location.hash.includes('access_token')) {
        // If there's no session AND no hash to be parsed, the link is definitely invalid
        router.push('/login?error=Invalid_invite_link');
      }
    };

    handleAuth();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300 font-medium">Verifying your secure invitation...</p>
    </div>
  );
}
