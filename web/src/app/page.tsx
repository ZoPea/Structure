'use client';

import Link from 'next/link';

/**
 * หน้าหลัก (Home Page)
 * 
 * หน้าที่:
 * - แสดงปุ่มสำหรับ navigation ไปยัง functions ต่างๆ
 * - เป็น landing page ของแอปพลิเคชัน
 * - ใช้ client-side routing (SPA)
 * - รองรับ i18n (th/en)
 */
export default function HomePage() {

  return (
    <div className="flex flex-col items-center py-8 px-4 sm:px-8 bg-blue-50 dark:bg-gray-900" suppressHydrationWarning>
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8" suppressHydrationWarning>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4" suppressHydrationWarning>
            Home Page
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300" suppressHydrationWarning>
            This is the home page of the application
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Authentication Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              🔐 Authentication
            </h2>
            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-center font-medium"
              >
                Register
              </Link>
              <Link
                href="/dashboard"
                className="block w-full px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-center font-medium"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              ⚡ Features
            </h2>
            <div className="space-y-3">
              <Link
                href="/examples/toast-example"
                className="block w-full px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-center font-medium"
              >
                Toast Examples
              </Link>
              {/* เพิ่มปุ่มสำหรับ features อื่นๆ ที่จะเพิ่มในอนาคต */}
              <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-center text-gray-500 dark:text-gray-400 text-sm">
                Coming Soon
              </div>
            </div>
          </div>

          {/* API Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              🔌 API
            </h2>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <code className="text-xs">POST /api/auth/login</code>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <code className="text-xs">POST /api/auth/register</code>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <code className="text-xs">GET /api/auth/me</code>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <code className="text-xs">POST /api/auth/logout</code>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            Built with Next.js and Tailwind CSS
          </p>
          <p className="text-sm">
            Ready to use
          </p>
        </div>
      </div>
    </div>
  );
}
