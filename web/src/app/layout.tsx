import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Main Website',
  description: 'Main website with multi-language and theme support',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        {/* Script สำหรับป้องกัน flash ของ theme และ language ก่อน React hydrate */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // ตั้งค่า theme และเก็บไว้ใน data attribute
                  var theme = localStorage.getItem('theme');
                  if (theme !== 'light' && theme !== 'dark') {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    theme = prefersDark ? 'dark' : 'light';
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                  
                  // ตั้งค่า language และเก็บไว้ใน data attribute เพื่อให้ React อ่านได้
                  var language = localStorage.getItem('language');
                  if (language !== 'th' && language !== 'en') {
                    // ถ้าไม่มีค่า ให้ใช้ browser language
                    language = navigator.language.startsWith('th') ? 'th' : 'en';
                  }
                  if (language) {
                    document.documentElement.setAttribute('lang', language);
                    document.documentElement.setAttribute('data-language', language);
                  } else {
                    document.documentElement.setAttribute('lang', 'th');
                    document.documentElement.setAttribute('data-language', 'th');
                  }
                } catch (e) {
                  // fallback
                  document.documentElement.setAttribute('lang', 'th');
                  document.documentElement.setAttribute('data-language', 'th');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main>
              {children}
            </main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

