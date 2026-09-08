import { CustomerService } from '@/services/customer.service';
import { Customer } from '@/types';

// Temporarily hardcode business profile ID for the UI scaffold until Auth context is built
const DUMMY_BUSINESS_PROFILE_ID = '00000000-0000-0000-0000-000000000000';

export default async function CustomersPage() {
  // Fetch from the service layer directly in Server Components
  // Note: This will fail until the DB is populated with the matching UUID
  let customers: Customer[] = [];
  try {
    customers = await CustomerService.getCustomers(DUMMY_BUSINESS_PROFILE_ID);
  } catch (err) {
    console.error('Database not ready or missing dummy ID');
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Customers</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">
          Add Customer
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">CNIC</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">No customers found.</td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{customer.cnic || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{customer.phone || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
