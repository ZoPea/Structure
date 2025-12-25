'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const { t, language, mounted } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900" suppressHydrationWarning>
      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20 sm:py-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6" suppressHydrationWarning>
              {t('page.welcome')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto" suppressHydrationWarning>
              {t('page.description')}
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg" suppressHydrationWarning>
              {t('page.getStarted')}
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4" suppressHydrationWarning>
              {t('nav.about')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" suppressHydrationWarning>
              {t('page.learnMore')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{item}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2" suppressHydrationWarning>
                  {mounted ? (language === 'th' ? `คุณสมบัติ ${item}` : `Feature ${item}`) : `คุณสมบัติ ${item}`}
                </h3>
                <p className="text-gray-600 dark:text-gray-300" suppressHydrationWarning>
                  {t('page.featureDescription')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4" suppressHydrationWarning>
              {mounted ? t('nav.services') : 'บริการ'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" suppressHydrationWarning>
              {t('page.servicesDescription')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="p-6 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2" suppressHydrationWarning>
                  {mounted ? (language === 'th' ? `บริการ ${item}` : `Service ${item}`) : `บริการ ${item}`}
                </h3>
                <p className="text-gray-600 dark:text-gray-300" suppressHydrationWarning>
                  {t('page.serviceDescription')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-white dark:bg-gray-900"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4" suppressHydrationWarning>
              {t('nav.contact')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300" suppressHydrationWarning>
              {t('page.contactDescription')}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  suppressHydrationWarning
                >
                  {t('page.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('page.namePlaceholder')}
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  suppressHydrationWarning
                >
                  {t('page.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('page.emailPlaceholder')}
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  suppressHydrationWarning
                >
                  {t('page.message')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('page.messagePlaceholder')}
                  suppressHydrationWarning
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                suppressHydrationWarning
              >
                {t('page.contactButton')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

