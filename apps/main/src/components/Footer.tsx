'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');

  const footerLinks = {
    competition: [
      { label: t('links.about'), href: '/about' },
      { label: t('links.events'), href: '/events' },
      { label: t('links.schedule'), href: '/schedule' },
      { label: t('links.rules'), href: '/rules' },
    ],
    resources: [
      { label: t('links.gallery'), href: '/gallery' },
      { label: t('links.news'), href: '/news' },
      { label: t('links.faq'), href: '/faq' },
      { label: t('links.support'), href: '/support' },
    ],
    contact: [
      { label: t('links.contact'), href: '/contact' },
      { label: t('links.sponsors'), href: '/sponsors' },
      { label: t('links.press'), href: '/press' },
      { label: t('links.careers'), href: '/careers' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: '𝕏' },
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'YouTube', href: '#', icon: '▶' },
    { name: 'Discord', href: '#', icon: '💬' },
  ];

  return (
    <footer className="bg-gray-900 pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="inline-flex items-center gap-3 mb-4">
                <Image
                  src="/images/logo.png"
                  alt="APSTPM"
                  width={48}
                  height={49}
                  className="h-12 w-auto"
                />
                <span className="text-white text-3xl font-bold font-display">
                  APSTPM
                </span>
              </Link>
              <p className="text-gray-400 text-sm mb-6 max-w-sm">
                {t('description')}
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg bg-gray-800 text-gray-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Competition Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                {t('sections.competition')}
              </h3>
              <ul className="space-y-3">
                {footerLinks.competition.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Resources Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                {t('sections.resources')}
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                {t('sections.contact')}
              </h3>
              <ul className="space-y-3">
                {footerLinks.contact.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-800 rounded-2xl p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white text-lg font-semibold mb-1">
                {t('newsletter.title')}
              </h3>
              <p className="text-gray-400 text-sm">
                {t('newsletter.description')}
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 md:w-64 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-brand-500 focus:outline-none"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-brand-700 hover:bg-brand-800 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                {t('newsletter.button')}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} APSTPM. {t('copyright')}
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {t('legal.privacy')}
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {t('legal.terms')}
              </Link>
              <Link
                href="/cookies"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {t('legal.cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
