import LogoutButton from '@/components/ui/LogoutButton';
import { getCurrentUserProfile } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary">DMS</h2>
          {profile.businessProfileId && profile.fullName ? (
            <p className="text-xs text-gray-400 mt-1 truncate">{profile.fullName}</p>
          ) : null}
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="/dashboard" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
            Overview
          </a>
          <a href="/dashboard/bookings" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
            Bookings
          </a>
          <a href="/dashboard/customers" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
            Customers
          </a>
          <a href="/dashboard/tractors" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
            Inventory
          </a>
          {profile.isSuperAdmin ? (
            <a href="/dashboard/team" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
              Team
            </a>
          ) : null}
        </nav>

        {/* Bottom actions */}
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-2">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
