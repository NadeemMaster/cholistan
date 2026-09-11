import { redirect } from 'next/navigation';
import { getCurrentUserProfile } from '@/lib/auth/session';

/**
 * Dashboard overview with role/business-aware routing.
 *
 *   Super Admin + no business  -> redirect to the business setup wizard
 *   Regular user + no business -> "pending assignment" screen
 *   User with a business       -> normal overview cards
 */
export default async function DashboardOverviewPage() {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect('/login');
  }

  // Super Admin without a business: one-time setup wizard
  if (profile?.isSuperAdmin && profile?.needsBusinessSetup) {
    redirect('/dashboard/business/new');
  }

  // Regular user without a business: do not show an empty dashboard
  if (profile && !profile.isSuperAdmin && profile.needsBusinessSetup) {
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-10 border border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            Account Pending Setup
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Welcome{profile.fullName ? `, ${profile.fullName}` : ''}! Your account
            has been created but it is not linked to a business profile yet.
            Please contact your administrator to complete the setup.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Overview</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Bookings card */}
        <a
          href="/dashboard/bookings"
          className="block bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Bookings</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Manage customer tractor bookings and delivery schedules.
          </p>
        </a>

        {/* Customers card */}
        <a
          href="/dashboard/customers"
          className="block bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Customers</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            View and manage your dealership customer records.
          </p>
        </a>

        {/* Inventory card */}
        <a
          href="/dashboard/tractors"
          className="block bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Inventory</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Track available tractors, engine numbers and delivery status.
          </p>
        </a>
      </div>
    </div>
  );
}
