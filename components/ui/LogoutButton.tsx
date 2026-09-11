'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LogoutButton() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    // Hard navigation so server components re-evaluate the session
    window.location.href = '/login';
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md disabled:opacity-50 transition-colors"
    >
      <svg
        className="w-4 h-4 mr-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      {loading ? 'Signing out...' : 'Logout'}
    </button>
  );
}
