'use client';

import { Toaster as SonnerToaster } from 'sonner';

/**
 * Toast Provider Component
 * 
 * ใช้สำหรับแสดง toast notifications ทั่วทั้งแอปพลิเคชัน
 * ต้องเพิ่ม component นี้ใน root layout
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      closeButton
      expand={false}
      duration={4000}
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
    />
  );
}

