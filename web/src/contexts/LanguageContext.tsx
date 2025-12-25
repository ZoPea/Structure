'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  mounted: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  th: {
    // Navbar
    'nav.logo': 'เว็บไซต์',
    'nav.home': 'หน้าแรก',
    'nav.about': 'เกี่ยวกับ',
    'nav.services': 'บริการ',
    'nav.contact': 'ติดต่อ',
    // Theme
    'theme.light': 'โหมดสว่าง',
    'theme.dark': 'โหมดมืด',
    // Language
    'lang.th': 'ไทย',
    'lang.en': 'English',
    // Page content
    'page.welcome': 'ยินดีต้อนรับ',
    'page.description': 'นี่คือหน้าหลักของเว็บไซต์',
    'page.getStarted': 'เริ่มต้นใช้งาน',
    'page.learnMore': 'เรียนรู้เพิ่มเติมเกี่ยวกับเราและสิ่งที่เราทำ',
    'page.contact': 'ติดต่อเราหากคุณมีคำถาม',
    'page.contactDescription': 'ติดต่อเราหากคุณมีคำถาม',
    'page.contactButton': 'ติดต่อเรา',
    'page.contactButtonDescription': 'ติดต่อเราหากคุณมีคำถาม',
  },
  en: {
    // Navbar
    'nav.logo': 'Website',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    // Theme
    'theme.light': 'Light Mode',
    'theme.dark': 'Dark Mode',
    // Language
    'lang.th': 'ไทย',
    'lang.en': 'English',
    // Page content
    'page.welcome': 'Welcome',
    'page.description': 'This is the main page of the website',
    'page.getStarted': 'Get Started',
    'page.learnMore': 'Learn more about us and what we do',
    'page.contact': 'Contact us if you have any questions',
    'page.contactDescription': 'Contact us if you have any questions',
    'page.contactButton': 'Contact us',
    'page.contactButtonDescription': 'Contact us if you have any questions',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ฟังก์ชันสำหรับอ่าน language จาก localStorage (sync)
function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'th';
  
  try {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage === 'th' || savedLanguage === 'en') {
      return savedLanguage;
    }
  } catch (e) {
    // localStorage อาจไม่สามารถเข้าถึงได้
  }
  
  // ตรวจสอบ browser language
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language.startsWith('th') ? 'th' : 'en';
  }
  
  return 'th';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // ใช้ค่า default 'th' เพื่อให้ server และ client render เหมือนกันก่อน
  const [language, setLanguageState] = useState<Language>('th');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // หลังจาก mount แล้ว อ่านค่าจาก data attribute ที่ script ตั้งค่าไว้
    let initialLanguage: Language = 'th';
    
    if (typeof document !== 'undefined') {
      // อ่านจาก data attribute ที่ script ตั้งค่าไว้
      const dataLang = document.documentElement.getAttribute('data-language');
      if (dataLang === 'th' || dataLang === 'en') {
        initialLanguage = dataLang;
      } else {
        // fallback: อ่านจาก lang attribute หรือ localStorage
        const htmlLang = document.documentElement.getAttribute('lang');
        if (htmlLang === 'th' || htmlLang === 'en') {
          initialLanguage = htmlLang;
        } else {
          initialLanguage = getInitialLanguage();
          document.documentElement.setAttribute('lang', initialLanguage);
          document.documentElement.setAttribute('data-language', initialLanguage);
        }
      }
    }
    
    setLanguageState(initialLanguage);
    setMounted(true);
  }, []);

  useEffect(() => {
    // อัปเดต lang attribute เมื่อ language เปลี่ยน
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', language);
      document.documentElement.setAttribute('data-language', language);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('language', lang);
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('data-language', lang);
      } catch (e) {
        // localStorage อาจไม่สามารถเข้าถึงได้
      }
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

