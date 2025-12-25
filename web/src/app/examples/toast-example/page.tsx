'use client';

import { useToast, toastUtils } from '@/hooks/useToast';
import Link from 'next/link';

/**
 * หน้าแสดงตัวอย่างการใช้งาน Toast Notifications
 * 
 * หน้าที่:
 * - แสดงตัวอย่างการใช้งาน toast แบบต่างๆ
 * - แสดงวิธีการใช้งาน useToast hook
 * - แสดงวิธีการใช้งาน toastUtils โดยตรง
 */
export default function ToastExamplePage() {
  const { showSuccess, showError, showInfo, showWarning, showPromise, showCustom, showHeadless } = useToast();

  // ตัวอย่าง async function สำหรับ promise toast
  const simulateAsyncOperation = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve({ data: 'สำเร็จ!' });
        } else {
          reject(new Error('เกิดข้อผิดพลาด'));
        }
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block mb-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← กลับหน้าหลัก
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🍞 Toast Examples
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            ตัวอย่างการใช้งาน Toast Notifications ด้วย Sonner
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Toasts */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Basic Toasts
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => showSuccess('บันทึกข้อมูลสำเร็จ!', 'ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว')}
                className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Success Toast
              </button>
              <button
                onClick={() => showError('เกิดข้อผิดพลาด!', 'กรุณาลองใหม่อีกครั้ง')}
                className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Error Toast
              </button>
              <button
                onClick={() => showInfo('ข้อมูลใหม่', 'มีข้อมูลใหม่ที่คุณอาจสนใจ')}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Info Toast
              </button>
              <button
                onClick={() => showWarning('คำเตือน', 'กรุณาตรวจสอบข้อมูลก่อนดำเนินการ')}
                className="w-full px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
              >
                Warning Toast
              </button>
            </div>
          </div>

          {/* Promise Toast */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Promise Toast
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => {
                  showPromise(simulateAsyncOperation(), {
                    loading: 'กำลังประมวลผล...',
                    success: () => 'สำเร็จ! ข้อมูลถูกประมวลผลเรียบร้อย',
                    error: (error) => `เกิดข้อผิดพลาด: ${error instanceof Error ? error.message : 'Unknown error'}`,
                  });
                }}
                className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
              >
                Simulate Async Operation
              </button>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Toast นี้จะแสดงสถานะ loading, success หรือ error อัตโนมัติ
              </p>
            </div>
          </div>

          {/* Custom Toast with Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Custom Toast with Actions
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => {
                  showCustom('คุณต้องการลบข้อมูลนี้หรือไม่?', {
                    description: 'การกระทำนี้ไม่สามารถยกเลิกได้',
                    action: {
                      label: 'ลบ',
                      onClick: () => {
                        showSuccess('ลบข้อมูลสำเร็จ');
                      },
                    },
                    cancel: {
                      label: 'ยกเลิก',
                      onClick: () => {
                        showInfo('ยกเลิกการลบ');
                      },
                    },
                  });
                }}
                className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Show Custom Toast with Actions
              </button>
            </div>
          </div>

          {/* Direct Usage (toastUtils) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Direct Usage
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => toastUtils.success('ใช้ toastUtils โดยตรง')}
                className="w-full px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium"
              >
                Using toastUtils
              </button>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                สามารถใช้ toastUtils โดยตรงได้โดยไม่ต้องใช้ hook
              </p>
            </div>
          </div>

          {/* Headless Toast */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Headless Toast
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => showHeadless('Headless Success Toast', { 
                  description: 'ปุ่มปิดอยู่มุมขวาบน',
                  type: 'success' 
                })}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Headless Success
              </button>
              <button
                onClick={() => showHeadless('Headless Error Toast', { 
                  description: 'สร้างปุ่มปิดเอง',
                  type: 'error' 
                })}
                className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Headless Error
              </button>
              <button
                onClick={() => showHeadless('Headless Info Toast', { 
                  description: 'ปุ่มปิดแบบ custom',
                  type: 'info' 
                })}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Headless Info
              </button>
              <button
                onClick={() => showHeadless('Headless Warning Toast', { 
                  description: 'ควบคุมการแสดงผลเองทั้งหมด',
                  type: 'warning' 
                })}
                className="w-full px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
              >
                Headless Warning
              </button>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Headless toast ให้คุณสร้างปุ่มปิดเองได้ ปุ่มปิดจะอยู่มุมขวาบน
              </p>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            📝 ตัวอย่างโค้ด
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                การใช้งาน useToast Hook:
              </h3>
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { useToast } from '@/hooks/useToast';

function MyComponent() {
  const { showSuccess, showError } = useToast();
  
  const handleSave = () => {
    showSuccess('บันทึกสำเร็จ');
  };
  
  return <button onClick={handleSave}>Save</button>;
}`}</code>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                การใช้งาน toastUtils โดยตรง:
              </h3>
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { toastUtils } from '@/hooks/useToast';

// ใช้ได้ทุกที่ (client component)
toastUtils.success('สำเร็จ');
toastUtils.error('เกิดข้อผิดพลาด');
toastUtils.info('ข้อมูล');
toastUtils.warning('คำเตือน');`}</code>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Promise Toast:
              </h3>
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`const { showPromise } = useToast();

showPromise(
  fetch('/api/data').then(res => res.json()),
  {
    loading: 'กำลังโหลด...',
    success: 'โหลดสำเร็จ',
    error: 'เกิดข้อผิดพลาด'
  }
);`}</code>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Headless Toast (ปุ่มปิดแบบ custom):
              </h3>
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`const { showHeadless } = useToast();

showHeadless('ข้อความ', {
  description: 'คำอธิบาย',
  type: 'success' // 'success' | 'error' | 'info' | 'warning'
});

// ปุ่มปิดจะอยู่มุมขวาบน และคุณสามารถปรับแต่งได้เอง`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

