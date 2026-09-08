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
      if (event === 'SIGNED_IN' && session) {
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
        }
        // If success, onAuthStateChange fires SIGNED_IN
        return;
      }

      // 3. If there is no code, and NO hash fragment containing an access_token, it's an invalid link.
      // (If there IS a hash, we just wait for onAuthStateChange to do its job!)
      if (!window.location.hash.includes('access_token')) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.push('/set-password');
        } else {
          router.push('/login?error=Invalid_invite_link');
        }
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
