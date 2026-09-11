import { redirect } from 'next/navigation';
import { getCurrentUserProfile } from '@/lib/auth/session';
import BusinessSetupForm from './BusinessSetupForm';

/**
 * Business setup wizard — Super Admin only.
 *
 * Access rules (server-side, defense in depth alongside RLS):
 *   - not logged in          -> /login (middleware also covers this)
 *   - not a Super Admin      -> /dashboard
 *   - already has a business -> /dashboard
 */
export default async function NewBusinessPage() {
  const profile = await getCurrentUserProfile();

  // redirect() throws, so execution never continues past these guards.
  if (!profile) {
    redirect('/login');
  }

  if (!profile?.isSuperAdmin || !profile?.needsBusinessSetup) {
    redirect('/dashboard');
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 border border-gray-100 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Business Setup
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-8">
          Welcome! Create the dealership business profile for this workspace.
          This is a one-time setup performed by the Super Admin.
        </p>
        <BusinessSetupForm />
      </div>
    </div>
  );
}
