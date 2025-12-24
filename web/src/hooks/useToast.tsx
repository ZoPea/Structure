import { toast } from 'sonner';

/**
 * Custom hook สำหรับใช้งาน toast notifications
 * 
 * ตัวอย่างการใช้งาน:
 * ```tsx
 * const { showSuccess, showError, showInfo, showWarning } = useToast();
 * 
 * showSuccess('บันทึกข้อมูลสำเร็จ');
 * showError('เกิดข้อผิดพลาด');
 * showInfo('ข้อมูลใหม่');
 * showWarning('กรุณาตรวจสอบข้อมูล');
 * ```
 */
export function useToast() {
  return {
    /**
     * แสดง toast แบบ success (สีเขียว)
     */
    showSuccess: (message: string, description?: string) => {
      return toast.success(message, {
        description,
      });
    },

    /**
     * แสดง toast แบบ error (สีแดง)
     */
    showError: (message: string, description?: string) => {
      return toast.error(message, {
        description,
      });
    },

    /**
     * แสดง toast แบบ info (สีน้ำเงิน)
     */
    showInfo: (message: string, description?: string) => {
      return toast.info(message, {
        description,
      });
    },

    /**
     * แสดง toast แบบ warning (สีเหลือง)
     */
    showWarning: (message: string, description?: string) => {
      return toast.warning(message, {
        description,
      });
    },

    /**
     * แสดง toast แบบ default
     */
    show: (message: string, description?: string) => {
      return toast(message, {
        description,
      });
    },

    /**
     * แสดง toast แบบ promise (สำหรับ async operations)
     */
    showPromise: <T,>(
      promise: Promise<T>,
      options: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: unknown) => string);
      }
    ) => {
      return toast.promise(promise, options);
    },

    /**
     * แสดง toast แบบ custom (พร้อม action button)
     */
    showCustom: (
      message: string,
      options?: {
        description?: string;
        action?: {
          label: string;
          onClick: () => void;
        };
        cancel?: {
          label: string;
          onClick: () => void;
        };
      }
    ) => {
      return toast(message, {
        description: options?.description,
        action: options?.action,
        cancel: options?.cancel,
      });
    },

    /**
     * แสดง toast แบบ headless (สร้างปุ่มปิดเอง)
     */
    showHeadless: (
      message: string,
      options?: {
        description?: string;
        type?: 'success' | 'error' | 'info' | 'warning';
      }
    ) => {
      return toast.custom((t) => {
        const bgColor = {
          success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
          error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
          info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
          warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
        }[options?.type || 'info'];

        const textColor = {
          success: 'text-green-800 dark:text-green-200',
          error: 'text-red-800 dark:text-red-200',
          info: 'text-blue-800 dark:text-blue-200',
          warning: 'text-yellow-800 dark:text-yellow-200',
        }[options?.type || 'info'];

        return (
          <div
            className={`relative flex items-start gap-3 p-4 rounded-lg border shadow-lg ${bgColor} min-w-[300px] max-w-[400px]`}
          >
            <div className="flex-1">
              <p className={`font-semibold ${textColor}`}>{message}</p>
              {options?.description && (
                <p className={`text-sm mt-1 ${textColor} opacity-80`}>
                  {options.description}
                </p>
              )}
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className={`absolute top-2 right-2 p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${textColor} opacity-70 hover:opacity-100`}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        );
      });
    },

    /**
     * ปิด toast
     */
    dismiss: (toastId?: string | number) => {
      toast.dismiss(toastId);
    },
  };
}

/**
 * Export toast functions โดยตรง (ไม่ต้องใช้ hook)
 * ใช้ได้ทั้งใน client และ server components (ถ้าเรียกจาก client)
 */
export const toastUtils = {
  success: (message: string, description?: string) => {
    return toast.success(message, { description });
  },
  error: (message: string, description?: string) => {
    return toast.error(message, { description });
  },
  info: (message: string, description?: string) => {
    return toast.info(message, { description });
  },
  warning: (message: string, description?: string) => {
    return toast.warning(message, { description });
  },
  promise: <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    }
  ) => {
    return toast.promise(promise, options);
  },
  dismiss: (toastId?: string | number) => {
    toast.dismiss(toastId);
  },
};

