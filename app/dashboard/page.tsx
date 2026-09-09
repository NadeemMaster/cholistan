export default function DashboardOverviewPage() {
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
