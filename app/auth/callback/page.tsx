'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { EmailOtpType } from '@supabase/supabase-js';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const handleCallback = async () => {
      const supabase = createClient();

      // 1. Supabase API returned an error parameter
      const errorParam = searchParams.get('error');
      if (errorParam) {
        if (!cancelled) setErrorMsg(errorParam.replace(/_/g, ' '));
        return;
      }

      // 2. OTP / PKCE verification (invite, recovery, magiclink, signup, email)
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type') as EmailOtpType | null;
      const code = searchParams.get('code');

      if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({ type, token_hash });
        if (cancelled) return;
        if (error) {
          setErrorMsg(error.message);
          return;
        }
        // @supabase/ssr browser client has already synced the session to cookies,
        // so the middleware will recognize the user on the next navigation.
        if (type === 'invite' || type === 'recovery') {
          router.replace('/set-password');
        } else {
          router.replace('/dashboard');
        }
        return;
      }

      // 3. PKCE authorization code (OAuth / email code exchange flow)
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (cancelled) return;
        if (error) {
          setErrorMsg(error.message);
          return;
        }
        router.replace('/dashboard');
        return;
      }

      // 4. No params — check whether a session already exists (implicit flow fallback)
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (cancelled) return;
      if (session) {
        router.replace('/dashboard');
        return;
      }

      setErrorMsg('Invalid or expired verification link. Please request a new link.');
    };

    handleCallback();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams]);

  return (
    <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 shadow rounded-lg text-center">
      {errorMsg ? (
        <div>
          <h2 className="text-xl font-bold text-red-600 mb-4">Verification Error</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{errorMsg}</p>
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Back to Login
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4 inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Verifying...</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Please wait while we securely authenticate your invitation.
          </p>
        </div>
      )}
    </div>
  );
}

export default function CallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Suspense
        fallback={
          <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 shadow rounded-lg text-center">
            <div className="mb-4 inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Loading...</h2>
          </div>
        }
      >
        <CallbackContent />
      </Suspense>
    </div>
  );
}
