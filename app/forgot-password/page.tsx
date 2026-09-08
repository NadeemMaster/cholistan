'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    // First check if the email exists using our custom RPC
    const { data: emailExists, error: rpcError } = await supabase.rpc('check_email_exists', {
      check_email: email
    });

    if (rpcError) {
      setError("An error occurred while verifying the email.");
      setLoading(false);
      return;
    }

    if (!emailExists) {
      setError("No account found with this email address.");
      setLoading(false);
      return;
    }

    // Email exists, proceed with reset
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage("Success! Check your email for the password reset link.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 shadow rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Reset Password
        </h2>
        
        {error && (
          <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {message ? (
          <div className="mb-4 bg-green-50 text-green-700 p-4 rounded-md text-sm text-center">
            {message}
            <div className="mt-4">
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {loading ? 'Sending link...' : 'Send Reset Link'}
            </button>
            
            <div className="text-center mt-4">
              <Link href="/login" className="text-sm font-medium text-primary hover:text-primary-dark">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
