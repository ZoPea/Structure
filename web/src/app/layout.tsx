import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/Toaster';

// ? add toastify for toast messages notification
// todo: add analytics for tracking user behavior
// todo: add SEO optimization for better search engine visibility
// todo: add social media sharing for better social media visibility
// todo: add contact form for user to contact the website owner
// todo: add privacy policy for user to know how the website collects and uses their data
// todo: add terms of service for user to know how the website works
// todo: add cookie policy for user to know how the website uses cookies
// todo: add theme toggle for user to switch between light and dark mode
// todo: add 2 languages: thai and english

export const metadata: Metadata = {
  title: 'Template App',
  description: 'Template application with authentication and toast notifications',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
