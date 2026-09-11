'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function BusinessSetupForm() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState('');
  const [dealerCode, setDealerCode] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Business name is required.');
      return;
    }

    setLoading(true);

    const { error: rpcError } = await supabase.rpc('create_business_profile', {
      p_name: name.trim(),
      p_dealer_code: dealerCode.trim() || null,
      p_address: address.trim() || null,
    });

    if (rpcError) {
      setError(rpcError.message);
      setLoading(false);
      return;
    }

    // Business created and linked — hard navigation so server components
    // re-read the fresh session profile on the dashboard.
    router.refresh();
    window.location.href = '/dashboard';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>
      )}

      <div>
        <label
          htmlFor="business-name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Business Name
        </label>
        <input
          id="business-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Cholistan Tractors"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div>
        <label
          htmlFor="dealer-code"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Dealer Code <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="dealer-code"
          type="text"
          value={dealerCode}
          onChange={(e) => setDealerCode(e.target.value)}
          placeholder="e.g. AG-1145"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Address <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Business address"
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
      >
        {loading ? 'Creating Business...' : 'Create Business'}
      </button>
    </form>
  );
}
