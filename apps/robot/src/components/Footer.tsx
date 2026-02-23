'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bot, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');
  const tHome = useTranslations('Home');

  return (
    <footer className="bg-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <div className="p-2 bg-robot-600 rounded-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-2xl font-bold font-display">
                  Macau Robot
                </span>
              </Link>
              <p className="text-gray-400 text-sm mb-6 max-w-md">
                {tHome('subtitle')}
              </p>

              <div className="flex gap-4">
                <a
                  href="mailto:info@macau-robot.org"
                  className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@macau-robot.org
                </a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                {t('quickLinks')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/competition"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {t('competition')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rules"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {t('rules')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/announcements"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {t('announcements')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/history"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {t('history')}
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                {t('contact')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{t('venue')}</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>info@macau-robot.org</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+853 1234 5678</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Macau Robot Competition. {t('copyright')}
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {t('privacy')}
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
