export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-primary tracking-tight">Cholistan Tractors</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
