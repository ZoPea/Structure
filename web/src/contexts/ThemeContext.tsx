'use client';

import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ฟังก์ชันสำหรับอ่าน theme จาก localStorage (sync)
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  
  try {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
  } catch (e) {
    // localStorage อาจไม่สามารถเข้าถึงได้
  }
  
  // ตรวจสอบ system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  return 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // ใช้ค่า default 'light' เพื่อให้ server และ client render เหมือนกันก่อน
  // จะอัปเดตหลังจาก mount แล้ว (script ใน head จะตั้งค่าไว้ก่อนแล้ว)
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((newTheme: Theme) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      // ลบ class 'dark' ออกก่อนเสมอ เพื่อป้องกันการมี class ซ้ำ
      root.classList.remove('dark');
      if (newTheme === 'dark') {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
      } else {
        root.setAttribute('data-theme', 'light');
      }
    }
  }, []);

  useEffect(() => {
    // หลังจาก mount แล้ว อ่านค่าจาก data-theme attribute ที่ script ตั้งค่าไว้
    const dataTheme = document.documentElement.getAttribute('data-theme');
    const hasDarkClass = document.documentElement.classList.contains('dark');
    
    let initialTheme: Theme = 'light';
    if (dataTheme === 'dark' || dataTheme === 'light') {
      initialTheme = dataTheme;
    } else if (hasDarkClass) {
      initialTheme = 'dark';
    } else {
      // fallback: อ่านจาก localStorage
      initialTheme = getInitialTheme();
      applyTheme(initialTheme);
    }
    
    setThemeState(initialTheme);
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    // อัปเดต theme class เมื่อ theme เปลี่ยน (หลังจาก mount แล้ว)
    // ใช้ useLayoutEffect เพื่อให้ DOM update ก่อนที่ browser จะ paint
    if (mounted) {
      applyTheme(theme);
    }
  }, [theme, mounted, applyTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', newTheme);
      } catch (e) {
        // localStorage อาจไม่สามารถเข้าถึงได้
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

